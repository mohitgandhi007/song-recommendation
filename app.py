from flask import Flask, render_template, request, jsonify
from services.gemini_service import generate_recommendations

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    print("📥 Incoming data:", data)

    genre = data.get("genre", "")
    mood = data.get("mood", "")
    artists = data.get("artists", "")

    songs = generate_recommendations(genre, mood, artists)
    print("🎵 Songs returned:", songs)

    return jsonify({"songs": songs})

# 🔥🔥🔥 THIS WAS MISSING 🔥🔥🔥
if __name__ == "__main__":
    print("🔥 Flask server starting...")
    app.run(debug=True)