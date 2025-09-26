#!/usr/bin/env python3
"""
MCP Server: webcoder

Goal: Let an LLM (e.g., Claude Desktop, VS Code Copilot Chat MCP, Cursor) take a prompt
and a reference screenshot of a website, then scaffold a runnable project and iteratively
edit files and run commands to reproduce the UI.

Tools exposed:
- write_file(path, content): create/overwrite a file (UTF-8)
- fetch_image(query): download royalty free images/videos into project folder
- append_file(path, content): append text to a file
- read_file(path): read file text
- list_dir(path): list directory tree (safe depth)
- run_cmd(cmd, cwd): execute allowed commands with streaming output capture
- infer_assets(target_dir): create basic colors/fonts file from a palette json the model provides
- save_page(context, path, content): save all files in project folder

Security:
- All file ops are restricted to a single workspace root.
- run_cmd is allowlisted and time-limited.

Usage:
1) Start this server: `uv run server.py` or `python server.py`
2) Connect from your MCP host (Claude Desktop / VS Code / Cursor) via mcp.json
3) In the chat, send an image + a prompt like: "Replicate this site using Next.js + Tailwind"
   The model will call tools to scaffold and write files, fetch images and download them and use it in web pages then `run_cmd` to start the dev server.
"""

from __future__ import annotations
import os
import json
import shlex
import subprocess
import requests
from pathlib import Path
from typing import List, Optional
from dotenv import load_dotenv
from fastmcp import FastMCP, Context
from fastmcp.tools import tool

import asyncio

#--------------Load Env---------------------------
load_dotenv()


# -------------------- Config --------------------
SERVER_NAME = "webcoder"
WORKSPACE = Path(os.environ.get("WEBCODER_WORKSPACE", Path.cwd() / "workspace")).resolve()
WORKSPACE.mkdir(parents=True, exist_ok=True)
PEXELS_ACCESS_KEY = os.getenv("PEXELS_API")

ALLOWED_BINS = {
    "git": ["init", "add", "commit", "status"],
    "python": ["-m", "uvicorn"],
}

MAX_CMD_SECONDS = 120
MAX_TREE_DEPTH = 4

mcp = FastMCP(SERVER_NAME)

# -------------------- Helpers --------------------

def _safe_path(p: str | Path) -> Path:
    pth = (WORKSPACE / p).resolve()
    if not str(pth).startswith(str(WORKSPACE)):
        raise Exception("Path escapes workspace")
    return pth


def _run_subprocess(cmd: List[str], cwd: Optional[Path] = None) -> str:
    try:
        proc = subprocess.run(
            cmd,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            timeout=MAX_CMD_SECONDS,
        )
        return proc.stdout
    except subprocess.TimeoutExpired as e:
        raise Exception(f"Command timed out after {MAX_CMD_SECONDS}s: {' '.join(cmd)}")


def _allowlisted(cmd: List[str]) -> bool:
    if not cmd:
        return False
    bin_ = cmd[0]
    if bin_ not in ALLOWED_BINS:
        return False
    # allow any subcommand word as long as first non-flag matches allowlist
    for arg in cmd[1:]:
        if arg.startswith("-"):
            continue
        return arg in ALLOWED_BINS[bin_]
    return True

# -------------------- Tools --------------------

def get_workspace(context: Context) -> str:
    """Return absolute workspace path on the host machine."""
    return str(WORKSPACE)
mcp.tool(get_workspace)


def list_dir(context: Context, path: str = ".", depth: int = 2) -> str:
    """List files under a path within the workspace, up to a max depth (default 2)."""
    depth = min(depth, MAX_TREE_DEPTH)
    root = _safe_path(path)
    lines: List[str] = []
    for p in sorted(root.rglob("*")):
        rel = p.relative_to(root)
        if len(rel.parts) > depth:
            continue
        suffix = "/" if p.is_dir() else ""
        lines.append(str(Path(path) / rel) + suffix)
    return "\n".join(lines)
mcp.tool(list_dir)

def read_file(context: Context, path: str) -> str:
    """Read a UTF-8 text file from the workspace."""
    p = _safe_path(path)
    if not p.exists() or not p.is_file():
        raise Exception("File not found")
    return p.read_text(encoding="utf-8")
mcp.tool(read_file)


def write_file(context: Context, path: str, content: str) -> str:
    """Create/overwrite a text file with UTF-8 encoding; creates parent dirs."""
    p = _safe_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")
    return f"Wrote {p.relative_to(WORKSPACE)} ({len(content)} bytes)"
mcp.tool(write_file)


def fetch_image(context: Context, query: str, save_path: str = "E:/MCP/webcoder_workspace/workspace") -> str:
    """Fetch a royalty-free image from Pexels and save it locally."""
    os.makedirs(save_path, exist_ok=True)
    
    headers = {"Authorization": PEXELS_ACCESS_KEY}
    url = f"https://api.pexels.com/v1/search?query={query}&per_page=1"
    response = requests.get(url, headers=headers)
    data = response.json()

    if not data.get("photos"):
        raise Exception("No images found for this query.")

    img_url = data["photos"][0]["src"]["original"]
    img_data = requests.get(img_url).content

    file_path = os.path.join(save_path, f"{query.replace(' ', '_')}.jpg")
    with open(file_path, "wb") as f:
        f.write(img_data)

    return f"Saved image to {file_path}"
mcp.tool(fetch_image)


def append_file(context: Context, path: str, content: str) -> str:
    """Append text to a file; creates it if missing."""
    p = _safe_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.open("a", encoding="utf-8") as f:
        f.write(content)
    return f"Appended to {p.relative_to(WORKSPACE)} ({len(content)} bytes)"
mcp.tool(append_file)

def run_cmd(context: Context, cmd: str, cwd: str = ".") -> str:
    """Run an allowlisted command in the workspace. Example: cmd="npm install"."""
    parts = shlex.split(cmd)
    if not _allowlisted(parts):
        raise Exception("Command not allowed. Allowed bins: " + ", ".join(ALLOWED_BINS))
    out = _run_subprocess(parts, cwd=_safe_path(cwd))
    return out
mcp.tool(run_cmd)


def infer_assets(context: Context, target_dir: str, palette_json: str | None = None) -> str:
    """Optionally create starter CSS variables and font setup from a palette JSON the model provides.
    Example palette_json: {"primary":"#3B82F6","bg":"#0B1020","text":"#E5E7EB","accent":"#22D3EE"}
    """
    target = _safe_path(target_dir)
    try:
        palette = json.loads(palette_json) if palette_json else {}
    except Exception as e:
        raise Exception("Invalid palette_json")

    styles = [":root {"]
    for k, v in palette.items():
        styles.append(f"  --{k}: {v};")
    styles.append("}")
    css = "\n".join(styles) + "\nbody{margin:0;font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Arial}"

    css_path = Path(target) / "src" / "app" / "globals.css"
    if not css_path.exists():
        css_path = Path(target) / "src" / "index.css"
    css_path.parent.mkdir(parents=True, exist_ok=True)
    css_path.write_text(css, encoding="utf-8")
    return f"Wrote base styles to {css_path.relative_to(WORKSPACE)}"
mcp.tool(infer_assets)

def save_page(context: Context, path: str, content: str) -> str:
    """Save a full webpage (HTML, CSS, or JS) into the workspace."""
    p = _safe_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")
    return f"Saved webpage to {p.relative_to(WORKSPACE)} ({len(content)} bytes)"
mcp.tool(save_page)


if __name__ == "__main__":
    # FastMCP will serve over stdio when launched under an MCP host,
    # and fall back to a local debug server when run directly.
    async def main():
        try:
            tools = await mcp.get_tools()
            print("Registered tools:", tools)
        except Exception as e:
            print("Could not list tools:", e)

    asyncio.run(main())

    mcp.run()