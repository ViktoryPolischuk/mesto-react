import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletingCardId, setDeletingCardId] = useState('');
  const [isDeleteCardLoading, setIsDeleteCardLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  function handleCardLike(cardId, isLiked) {
    api.toggleLike(cardId, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === cardId ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    setDeletingCardId(cardId);
  }

  function handleCardDeleteConfirm(cardId) {
    setIsDeleteCardLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDeleteCardLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setDeletingCardId('');
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({name, about}) {
    setIsEditProfileLoading(true);
    api.editUserInfo({name, about})
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsEditProfileLoading(false);
      });
  }

  function handleUpdateAvatar({avatar}) {
    setIsEditAvatarLoading(true);
    api.editUserAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsEditAvatarLoading(false);
      });
  }

  function handleAddPlaceSubmit({title, source}) {
    setIsAddPlaceLoading(true);
    api.addCard({name: title, link: source})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsAddPlaceLoading(false);
      });
  }

  return (
    <div className="root">
      <div className="root__content">
        <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isLoading={isEditProfileLoading}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
         />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isAddPlaceLoading}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoading={isEditAvatarLoading}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeleteCardPopup
          cardId={deletingCardId}
          isLoading={isDeleteCardLoading}
          onClose={closeAllPopups}
          onCardDelete={handleCardDeleteConfirm}
        />

        <ImagePopup {...selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
