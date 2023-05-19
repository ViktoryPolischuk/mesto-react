import React, { useContext, useEffect, useRef, useState } from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const [isLoading, setIsLoading] = useState(false);

  const avatarRef = useRef()

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    onUpdateAvatar({
      avatar: avatarRef.current.value
    }).then(() => {
      setIsLoading(false)
    })
  }

  return(
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="popup__field">
        <input className="popup__input popup__input_type_avatar" type="url"
          ref={avatarRef}
          id="avatar" name="avatar" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error avatar-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
