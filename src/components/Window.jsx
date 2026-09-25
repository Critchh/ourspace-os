import { useState } from "react";
import { FiX } from "react-icons/fi";

function Window({ title, children, onClose }) {
  const [isClosing, setIsClosing] = useState(false);


  function closeWindow() {
    if (isClosing) return;

    setIsClosing(true);

    window.setTimeout(() => {
      onClose();
    }, 210);
  }

  return (
    <div className={isClosing ? "window window-closing" : "window"}>
      <div className="window-header">
        <span className="window-title">
          {title}
        </span>

        <button
          className="window-close"
          onClick={closeWindow}
          aria-label="Close window"
        >
          <FiX />
        </button>
      </div>

      <div className="window-content">
        {children}
      </div>
    </div>
  );
}

export default Window;
