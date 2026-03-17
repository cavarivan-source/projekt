import { useEffect, useState } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.4;
const ZOOM_STEP = 0.2;

const ImagePreviewModal = ({ imageSrc, imageAlt, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(MIN_ZOOM);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setZoom(MIN_ZOOM);
    }
  }, [isOpen, imageSrc]);

  if (!isOpen || !imageSrc) {
    return null;
  }

  const increaseZoom = () => {
    setZoom((currentZoom) => Math.min(MAX_ZOOM, Number((currentZoom + ZOOM_STEP).toFixed(2))));
  };

  const decreaseZoom = () => {
    setZoom((currentZoom) => Math.max(MIN_ZOOM, Number((currentZoom - ZOOM_STEP).toFixed(2))));
  };

  return (
    <div className="shop-image-modal-backdrop" onClick={onClose}>
      <div className="shop-image-modal" onClick={(event) => event.stopPropagation()}>
        <div className="shop-image-modal-header">
          <div className="shop-image-modal-tools">
            <button
              type="button"
              className="shop-image-modal-tool"
              onClick={decreaseZoom}
              disabled={zoom <= MIN_ZOOM}
            >
              -
            </button>
            <span className="shop-image-modal-zoom-label">Zoom {Math.round(zoom * 100)}%</span>
            <button
              type="button"
              className="shop-image-modal-tool"
              onClick={increaseZoom}
              disabled={zoom >= MAX_ZOOM}
            >
              +
            </button>
          </div>

          <button type="button" className="shop-image-modal-close" onClick={onClose} aria-label="Zatvori sliku">
            X
          </button>
        </div>

        <div className="shop-image-modal-body">
          <div className="shop-image-modal-image-shell">
            <img
              src={imageSrc}
              alt={imageAlt}
              className={`shop-image-modal-image${zoom > 1 ? " shop-image-modal-image-zoomed" : ""}`}
              style={zoom > 1 ? { width: `${zoom * 100}%` } : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;