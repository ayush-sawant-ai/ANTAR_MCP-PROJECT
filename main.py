#!/usr/bin/env python3
"""
MCP Server: webcoder

This server exposes tools for scaffolding web UI projects from prompts + reference screenshots.
Ready for uv / Alpic deployment.
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

# -------------------- Load Env --------------------
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
    except subprocess.TimeoutExpired:
        raise Exception(f"Command timed out after {MAX_CMD_SECONDS}s: {' '.join(cmd)}")

def _allowlisted(cmd: List[str]) -> bool:
    if not cmd:
        return False
    bin_ = cmd[0]
    if bin_ not in ALLOWED_BINS:
        return False
    for arg in cmd[1:]:
        if arg.startswith("-"):
            continue
        return arg in ALLOWED_BINS[bin_]
    return True

# -------------------- Tools --------------------
@mcp.tool
def get_workspace(context: Context) -> str:
    """Return absolute workspace path on the host machine."""
    return str(WORKSPACE)

@mcp.tool
def list_dir(context: Context, path: str = ".", depth: int = 2) -> str:
    """List files under a path within the workspace, up to a max depth."""
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

@mcp.tool
def read_file(context: Context, path: str) -> str:
    """Read a UTF-8 text file from the workspace."""
    p = _safe_path(path)
    if not p.exists() or not p.is_file():
        raise Exception("File not found")
    return p.read_text(encoding="utf-8")

@mcp.tool
def write_file(context: Context, path: str, content: str) -> str:
    """Create/overwrite a text file with UTF-8 encoding."""
    p = _safe_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")
    return f"Wrote {p.relative_to(WORKSPACE)} ({len(content)} bytes)"

@mcp.tool
def fetch_image(context: Context, query: str, save_path: str = "workspace") -> str:
    """Fetch a royalty-free image from Pexels and save it locally."""
    save_dir = _safe_path(save_path)
    save_dir.mkdir(parents=True, exist_ok=True)

    headers = {"Authorization": PEXELS_ACCESS_KEY}
    url = f"https://api.pexels.com/v1/search?query={query}&per_page=1"
    response = requests.get(url, headers=headers)
    data = response.json()

    if not data.get("photos"):
        raise Exception("No images found for this query.")

    img_url = data["photos"][0]["src"]["original"]
    img_data = requests.get(img_url).content

    file_path = save_dir / f"{query.replace(' ', '_')}.jpg"
    file_path.write_bytes(img_data)

    return f"Saved image to {file_path}"

@mcp.tool
def append_file(context: Context, path: str, content: str) -> str:
    """Append text to a file; creates it if missing."""
    p = _safe_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.open("a", encoding="utf-8") as f:
        f.write(content)
    return f"Appended to {p.relative_to(WORKSPACE)} ({len(content)} bytes)"

@mcp.tool
def run_cmd(context: Context, cmd: str, cwd: str = ".") -> str:
    """Run an allowlisted command in the workspace."""
    parts = shlex.split(cmd)
    if not _allowlisted(parts):
        raise Exception("Command not allowed.")
    out = _run_subprocess(parts, cwd=_safe_path(cwd))
    return out

@mcp.tool
def infer_assets(context: Context, target_dir: str, palette_json: str | None = None) -> str:
    """Create starter CSS variables and font setup from a palette JSON."""
    target = _safe_path(target_dir)
    try:
        palette = json.loads(palette_json) if palette_json else {}
    except Exception:
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

@mcp.tool
def save_page(context: Context, path: str, content: str) -> str:
    """Save a full webpage (HTML, CSS, or JS) into the workspace."""
    p = _safe_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")
    return f"Saved webpage to {p.relative_to(WORKSPACE)} ({len(content)} bytes)"

# -------------------- Entrypoint --------------------


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
