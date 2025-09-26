import requests
from dotenv import load_dotenv
import os

load_dotenv()
PEXELS_KEY = os.getenv("PEXELS_ACCESS_KEY")

def fetch_image(query, save_path="E:/MCP/webcoder_workspace/workspace"):
    url = "https://api.pexels.com/v1/search"
    headers = {"Authorization": PEXELS_KEY}
    params = {"query": query, "per_page": 1}

    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    image_url = data["photos"][0]["src"]["original"]

    img_data = requests.get(image_url).content
    file_path = os.path.join(save_path, f"{query.replace(' ', '_')}.jpg")
    with open(file_path, "wb") as f:
        f.write(img_data)
    return file_path

print(fetch_image("mountains"))
