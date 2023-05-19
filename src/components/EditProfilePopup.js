import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    onUpdateUser({
      name,
      about: description,
    }).then(() => {
      setIsLoading(false)
    })
  }

  return(
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="popup__field">
        <input className="popup__input popup__input_type_name"
          value={name} onChange={handleNameChange}
          type="text" id="name" name="name" placeholder="Имя"
          minLength="2" maxLength="40" required />
        <span className="popup__input-error name-error"></span>
      </label>
      <label className="popup__field">
        <input className="popup__input popup__input_type_job"
          value={description} onChange={handleDescriptionChange}
          type="text" id="job" name="job" placeholder="О себе"
          minLength="2" maxLength="200" required />
        <span className="popup__input-error job-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup
