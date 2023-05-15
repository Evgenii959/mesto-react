import { useEffect, useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api.js";
import { UserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        const newCardsArray = cards.filter((c) =>
          c._id === card._id ? "" : res
        );
        setCards(newCardsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getUser()
      .then((res) => setCurrentUser(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  function handleUpdateUser(user) {
    api
      .editUser(user)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar.url)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((res) => {
        setCards([res, ...cards]); 
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  return (
    <>
      <UserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfile}
          onAddPlace={handleAddCard}
          onEditAvatar={handleEditAvatar}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name="profile-popup"
          title="Редактировать профиль"
          form="profile-form"
          buttonText="Сохранить"
          onUpdateUser={handleUpdateUser}
        />
        {
          <AddPlacePopup
            name="element-popup"
            title="Редактировать профиль"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            form="element-form"
            buttonText="Сохранить"
            button="element-submit"
            onAddPlace={handleAddPlaceSubmit}
          />
        }
        <PopupWithForm
          name="confirm-popup"
          title="Вы уверены?"
          onClose={closeAllPopups}
          form="confirm-form"
          buttonText="Да"
        />
        <EditAvatarPopup
          name="update-popup"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
          button="avatar-submit"
          onUpdateUserAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
      </UserContext.Provider>
    </>
  );
}

export default App;
