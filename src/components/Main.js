import { useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  const cardElements = cards.map(({_id, ...card}) => (
    <Card
      {...card}
      id={_id}
      key={_id}
      onClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ))

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" alt="Фото профиля" src={currentUser.avatar}/>
          <button className="profile__avatar-button" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__column">
            <h1 className="profile__author">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery" aria-label="Фотогалерея">
        {cardElements}
      </section>
    </main>
  )
}

export default Main

