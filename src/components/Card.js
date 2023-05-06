import React from "react";

function Card({_id, name, link, owner, likes, onClick}) {
  function handleClick() {
    onClick({name, link})
  }

  return(
    <div className="gallery-card">
      <img className="gallery-card__image" alt="Фотография" src={link} onClick={handleClick}/>
      <div className="gallery-card__caption">
        <p className="gallery-card__text">{name}</p>
        <div className="gallery-card__like">
          <button className="gallery-card__like-button"></button>
          <p className="gallery-card__like-count">{likes.length}</p>
        </div>
      </div>
      <button className="gallery-card__delete-button"></button>
    </div>
  )
}

export default Card
