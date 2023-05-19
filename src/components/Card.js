import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({id, name, link, owner, likes, onClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName =
    `gallery-card__like-button ${isLiked && 'gallery-card__like-button_active'}`;

  function handleClick() {
    onClick({name, link})
  }

  function handleLikeClick() {
    onCardLike(id, isLiked);
  }

  function handleDeleteClick() {
    onCardDelete(id);
  }

  return(
    <div className="gallery-card">
      <img className="gallery-card__image" alt={name} src={link} onClick={handleClick}/>
      <div className="gallery-card__caption">
        <p className="gallery-card__text">{name}</p>
        <div className="gallery-card__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className="gallery-card__like-count">{likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="gallery-card__delete-button" onClick={handleDeleteClick} />}
    </div>
  )
}

export default Card
