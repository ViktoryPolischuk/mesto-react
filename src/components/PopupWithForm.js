import React from "react";

function PopupWithForm({name, title, buttonTitle, children, isOpen, onClose}) {
  return(
   <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <form className={`popup__form popup__form_${name}`} noValidate>
          {children}
          <button className="popup__save-button" type="submit">{buttonTitle || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
