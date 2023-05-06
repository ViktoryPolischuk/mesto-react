import React from "react";
import api from '../utils/Api';
import Card from "./Card";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
const [userName, setUserName] = React.useState();
const [userDescription, setUserDescription] = React.useState();
const [userAvatar, setUserAvatar] = React.useState();
const [cards, setCards] = React.useState([]);

React.useEffect(() => {
  Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
  ])
    .then(([initialUserInfo, initialCards]) => {
      setUserName(initialUserInfo.name);
      setUserDescription(initialUserInfo.about);
      setUserAvatar(initialUserInfo.avatar);
      setCards(initialCards.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
}, [])

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" alt="Фото профиля" src={userAvatar}/>
          <button className="profile__avatar-button" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__column">
            <h1 className="profile__author">{userName}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery" aria-label="Фотогалерея">
        {cards.map(card => (
          <Card {...card} key={card._id} onClick={onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main

