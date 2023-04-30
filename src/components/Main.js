import { useEffect, useState } from "react";
import { api } from "../utils/Api.js";
import Card from './Card.js'

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUser()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
            <img className="profile__image" src={userAvatar} />
          </div>
          <div className="profile__block">
            <div className="profile__info">
              <h1 className="profile__title">{userName}</h1>
              <p className="profile__subtitle">{userDescription}</p>
            </div>
            <button
              className="profile__icon"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <button
            className="profile__plus"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="elements">
          <article className="list">
            {cards.map((elem) => (
              <Card
                element={elem}
                onImagePopup={props.onCardClick}
                key={elem._id}
              />
            ))}
          </article>
        </section>
      </main>
    </>
  );
}

export default Main;
