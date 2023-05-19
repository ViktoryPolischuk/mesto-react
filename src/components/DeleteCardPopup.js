import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({cardId, onClose, onCardDelete}) {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    onCardDelete(cardId).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonTitle={isLoading ? 'Удаление...' : 'Да'}
      isOpen={cardId}
      onClose={onClose}
      onSubmit={handleSubmit}
       />
  )
}

export default DeleteCardPopup
