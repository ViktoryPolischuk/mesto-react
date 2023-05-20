import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({cardId, isLoading, onClose, onCardDelete}) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(cardId);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonTitle={isLoading ? 'Удаление...' : 'Да'}
      isOpen={!!cardId}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default DeleteCardPopup
