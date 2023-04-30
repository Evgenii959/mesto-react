import { useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddCard() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setImagePopupOpen(false);
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfile}
        onAddPlace={handleAddCard}
        onEditAvatar={handleEditAvatar}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="profile-popup"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <form className="popup__content profile-form" name="Профиль" noValidate>
          <input
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
          <button className="popup__submit" type="submit">
            Сохранить
          </button>
        </form>
      </PopupWithForm>
      <PopupWithForm
        name="element-popup"
        title="Редактировать профиль"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <form
          className="popup__content element-form"
          name="Карточка"
          noValidate
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
          />
          <span className="popup__name-error title-input-error"></span>
          <input
            className="popup__name element-src"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            id="src-input"
          />
          <span
            className="popup__name-error src-input-error"
            title="Введите адрес сайта."
          ></span>
          <button
            className="popup__submit element-submit"
            type="submit"
            disabled
          >
            Сохранить
          </button>
        </form>
      </PopupWithForm>
      <PopupWithForm
        name="confirm-popup"
        title="Вы уверены?"
        onClose={closeAllPopups}
      >
        <form className="popup__content confirm-form" noValidate>
          <button className="popup__submit" type="submit">
            Да
          </button>
        </form>
      </PopupWithForm>
      <PopupWithForm
        name="update-popup"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <form className="popup__content" name="аватар" noValidate>
          <input
            className="popup__name avatar-country"
            required
            type="url"
            name="avatar"
            placeholder="ссылка на аватар"
            minLength="2"
            maxLength="200"
            id="avatar-input"
          />
          <span className="popup__name-error avatar-input-error"></span>
          <button
            className="popup__submit avatar-submit"
            type="submit"
            disabled
          >
            Сохранить
          </button>
        </form>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
    </>
  );
}

export default App;
