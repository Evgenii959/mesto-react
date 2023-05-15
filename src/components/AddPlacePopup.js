import { useState } from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <div
      className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          className={`popup__content ${props.form}`}
          name="Профиль"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            className="popup__name element-country"
            type="text"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            id="title-input"
            title="Вы пропустили это поле."
            onChange={handleChangeName}
          />
          <span className="popup__name-error title-input-error"></span>
          <input
            className="popup__name element-src"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            id="src-input"
            onChange={handleChangeLink}
          />
          <span
            className="popup__name-error src-input-error"
            title="Введите адрес сайта."
          ></span>
          <button className={`popup__submit ${props.button}`} type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPlacePopup;
