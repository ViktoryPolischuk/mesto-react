import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, isLoading, onClose, onAddPlace}) {
  const titleRef = useRef();
  const sourceRef = useRef();

  useEffect(() => {
    titleRef.current.value = '';
    sourceRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      title: titleRef.current.value,
      source: sourceRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonTitle={isLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="popup__field">
        <input className="popup__input popup__input_type_title" type="text"
          ref={titleRef}
          id="title" name="title" placeholder="Название" minLength="2"
          maxLength="30" required />
        <span className="popup__input-error title-error"></span>
      </label>
      <label className="popup__field">
        <input className="popup__input popup__input_type_source" type="url"
          ref={sourceRef}
          id="source" name="source" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error source-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup
