function Card(props) {
  function handleClick() {
    props.onImagePopup(props.element);
  }  
  return (
    <>
      <article className="element">
        <img
          className="element__image"
          alt={props.element.name}
          src={props.element.link}
          onClick={handleClick}
        />
        <button className="element__trash"></button>
        <div className="element__title-heart">
          <h2 className="element__title">{props.element.name}</h2>
          <div>
            <button type="button" className="element__heart"></button>
            <div className="element__heart_count">
              {props.element.likes.length}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default Card;
