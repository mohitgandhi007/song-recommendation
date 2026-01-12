import os
import requests

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set")

ENDPOINT = (
    "https://generativelanguage.googleapis.com/v1/"
    "models/gemini-1.0-pro:generateContent"
)

def generate_recommendations(genre: str, mood: str, artists: str):
    prompt = f"""
    You are a music recommendation engine.

    Genre: {genre}
    Mood: {mood}
    Preferred Artist: {artists}

    Rules:
    - Recommend 10 REAL songs
    - Prefer songs by the given artist
    - Format strictly as: Song – Artist
    - No explanations
    """

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    try:
        response = requests.post(
            f"{ENDPOINT}?key={API_KEY}",
            json=payload,
            timeout=20
        )

        if response.status_code != 200:
            print("❌ Gemini REST Error:", response.text)
            return []

        data = response.json()
        text = data["candidates"][0]["content"]["parts"][0]["text"]

        return [line.strip() for line in text.split("\n") if line.strip()]

    except Exception as e:
        print("❌ Gemini Exception:", e)
        return []