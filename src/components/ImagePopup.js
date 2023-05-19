import React from "react";

function ImagePopup({name, link, onClose}) {
  return(
    <div className={`popup popup_gallery-card ${name ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img className="popup__image" src={link} alt={name} />
          <figcaption className="popup__image-caption">{name}</figcaption>
        </figure>
        <button className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup
