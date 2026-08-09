function Music() {
  return (
    <div className="music-app">
      <div className="music-header">
        <p className="app-kicker">OUR SOUNDTRACK</p>
        <h2>Songs That Feel Like Us</h2>
        <p>
          Somehow, these songs became part of our story.
        </p>
      </div>

      <div className="playlist-container">
        <iframe
          src="https://open.spotify.com/embed/playlist/4s6UBrZhmwGKFcKs3zqM7J?utm_source=generator&si=8dad5fcff4b44cb7"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Our Soundtrack"
        />
      </div>
    </div>
  );
}

export default Music;


<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4s6UBrZhmwGKFcKs3zqM7J?utm_source=generator&si=8dad5fcff4b44cb7" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>