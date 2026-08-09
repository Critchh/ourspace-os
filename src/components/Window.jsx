import { FiX } from "react-icons/fi";

function Window({ title, children, onClose }) {
  return (
    <div className="window">
      <div className="window-header">
        <span className="window-title">
          {title}
        </span>

        <button
          className="window-close"
          onClick={onClose}
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