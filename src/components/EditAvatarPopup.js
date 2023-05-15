import { useRef, useContext } from "react";
import { UserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const userAvatar = useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUserAvatar({
      url: userAvatar.current.value,
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
            className="popup__name avatar-country"
            required
            type="url"
            name="avatar"
            placeholder="ссылка на аватар"
            minLength="2"
            maxLength="200"
            id="avatar-input"
            ref={userAvatar}
          />
          <span className="popup__name-error avatar-input-error"></span>
          <button className={`popup__submit ${props.button}`} type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditAvatarPopup;
