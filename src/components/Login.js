import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginEmail(event) {
    setEmail(event.target.value);
  }

  function handleLoginPassword(event) {
    setPassword(event.target.value);
  }

  return (
    <section className="login">
      <h1 className="login__title">Вход</h1>
      <form
        className="login__form"
        onSubmit={props.handleLogin({ password, email })}
      >
        <input
          className="login__email"
          placeholder="Email"
          onChange={handleLoginEmail}
        />
        <input
          className="login__password"
          placeholder="Пароль"
          type="password"
          onChange={handleLoginPassword}
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
