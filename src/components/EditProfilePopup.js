import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(UserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
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
            value={name || ""}
            onChange={handleChangeName}
            className="popup__name profile-name"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="400"
            id="name-input"
            title="Вы пропустили это поле."
          />
          <span className="popup__name-error name-input-error"></span>
          <input
            value={description || ""}
            onChange={handleChangeDescription}
            className="popup__name profile-job"
            type="text"
            name="job"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            id="describe-input"
            title="Вы пропустили это поле."
          />
          <span className="popup__name-error describe-input-error"></span>
          <button className={`popup__submit ${props.button}`} type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePopup;
