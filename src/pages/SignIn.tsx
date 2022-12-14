import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export function SignIn({ setUser }: Props) {
  const navigate = useNavigate();

  function signIn(user: User) {
    console.log("User signed in");
    localStorage.id = user.id;
    setUser(user);
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    const form = event.target;
    let email = form.email.value;
    let password = form.password.value;

    fetch(`http://localhost:3005/users?email=${email}`)
      .then((response) => response.json())
      .then((user) => {
        if (user[0].password === password) {
          signIn(user[0]);
          navigate("/home");
        } else {
          alert("User not found!");
        }
      });
  }

  return (
    <div className="sign-in-page-container">
      <div className="form-container">
        <h1>Swinder</h1>
        <form
          className="form-section"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button className="sign-in-btn" type="submit">Sign In</button>
        </form>

        <div className="or-div">
          <hr />
          OR
          <hr />
        </div>
        <div>
          <button className="signup-btn" onClick={() => navigate("/sign-up")}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
