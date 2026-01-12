// --------------------------------
// Fetch Recommendations
// --------------------------------
async function getSongs() {
  const genre = document.getElementById("genre").value;
  const mood = document.getElementById("mood").value;
  const artists = document.getElementById("artists").value;

  const list = document.getElementById("list");
  const btn = document.getElementById("btn");

  list.innerHTML = "";
  btn.innerText = "Loading...";
  btn.disabled = true;

  try {
    const response = await fetch("/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ genre, mood, artists })
    });

    const data = await response.json();

    if (data.status !== "success") {
      throw new Error("Request failed");
    }

    data.songs.forEach(song => {
      const div = document.createElement("div");
      div.className = "song";
      div.innerText = song;
      list.appendChild(div);
    });

  } catch (error) {
    list.innerHTML = "<p>❌ Failed to load recommendations</p>";
    console.error(error);
  }

  btn.innerText = "Discover";
  btn.disabled = false;
}