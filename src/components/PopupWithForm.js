import React, {useEffect} from "react";

function PopupWithForm({name, title, buttonTitle, children, isOpen, onClose, onSubmit}) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen]);

  function handleMouseDown(evt) {
    if (evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-button')) {
      onClose();
    }
  }

  return(
    <div
      className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={handleMouseDown}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close-button" type="button"></button>
        <form className={`popup__form popup__form_${name}`} noValidate onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">{buttonTitle || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
