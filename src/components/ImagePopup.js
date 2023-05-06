import React from "react";

function ImagePopup({card, onClose}) {
  return(
    <div className={`popup popup_gallery-card ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img className="popup__image" src={card ? card.link : '#'} alt="Увеличенная фотография" />
          <figcaption className="popup__image-caption">{card && card.name}</figcaption>
        </figure>
        <button className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup
