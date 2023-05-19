import React, { useEffect, useRef } from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, isLoading, onClose, onUpdateAvatar}) {
  const avatarRef = useRef()

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
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
