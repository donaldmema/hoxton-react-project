import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();

  function handleSubmit(event: any) {
    event.preventDefault();

    const form = event.target;
    let email = form.email.value;
    let password = form.password.value;
    let name = form.name.value;

    let user = {
      email,
      password,
      name,
    };

    fetch(`http://localhost:3005/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((user) => {
        localStorage.id = user.id;
        navigate("/sign-up/survey");
      });
  }

  return (
    <div className="sign-up-page-container">
      <div className="sign-up__form-container">
        <h1>Swinder</h1>
        <form
          className="sign-up__form-section"
          onSubmit={(event) => handleSubmit(event)}
        >
          <h4>Create account:</h4>
          <input
            type="text"
            placeholder="Your Name Here"
            name="name"
            required
          />
          <input
            type="email"
            placeholder="Your Email Here"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Enter a Password"
            name="password"
            required
          />

          <button className="signup-btn" type="submit">
            Continue ➡
          </button>
        </form>
      </div>
    </div>
  );
}
