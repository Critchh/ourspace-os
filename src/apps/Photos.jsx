import { useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);


const photos = [

  {
    src: "/photos/fave photo.jpg",
    caption: "My favorite photo of us.",
  },
  {
    src: "/photos/ravine2.jpg",
    caption: "One of the most fun memories we've made together.",
  },
  {
    src: "/photos/computer.jpg",
    caption: "Us just being us.",
  },
  {
    src: "/photos/firstmeet.jpg",
    caption: "The first time we met. Where everything started.",
  },
  {
    src: "/photos/car.jpg",
    caption: "The first car we ever bought together.",
  },
  {
    src: "/photos/drive.jpg",
    caption: "The first time I drove for you.",
  },
  {
    src: "/photos/newyear.jpg",
    caption: "To our first New Year together. ",
  },
];

  return (
    <div className="photos-app">
      <div className="photos-header">
        <div>
          <p className="app-kicker">MEMORIES</p>
          <h2>Our Photos</h2>
        </div>

        <span>{photos.length} memories</span>
      </div>

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <button
            className="photo-card"
            key={index}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img src={photo.src} alt={photo.caption} />

            <div className="photo-caption">
              {photo.caption}
            </div>
          </button>
        ))}
      </div>

      {selectedPhoto && createPortal(
        <div
          className="photo-viewer"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="photo-viewer-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="photo-viewer-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo"
              type="button"
            >
              <FiX />
            </button>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.caption}
            />

            <p>{selectedPhoto.caption}</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Photos;
