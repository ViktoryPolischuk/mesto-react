import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="root">
      <div className="root__content">
        <Header />
        <Main
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm name="edit-profile" title="Редактировать профиль"
        buttonTitle="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <label className="popup__field">
            <input className="popup__input popup__input_type_name" type="text" id="name" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="popup__input-error name-error"></span>
          </label>
          <label className="popup__field">
            <input className="popup__input popup__input_type_job" type="text" id ="job" name="job" placeholder="О себе" minLength="2" maxLength="200" required />
            <span className="popup__input-error job-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm name="add-place" title="Новое место"
        buttonTitle="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <label className="popup__field">
            <input className="popup__input popup__input_type_title" type="text" id="title" name="title" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="popup__input-error title-error"></span>
          </label>
          <label className="popup__field">
            <input className="popup__input popup__input_type_source" type="url" id="source" name="source" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error source-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm name="edit-avatar" title="Обновить аватар"
        buttonTitle="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <label className="popup__field">
            <input className="popup__input popup__input_type_avatar" type="url" id="avatar" name="avatar" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error avatar-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm name="delete-card" title="Вы уверены?"
        buttonTitle="Да" onClose={closeAllPopups} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
