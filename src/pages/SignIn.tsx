import { useState } from "react";
import { User } from "../types";

export function SignIn() {
  const [user, setUser] = useState<null | User>(null);

  function signIn(user: User) {
    console.log("User signed in");
    localStorage.id = user.id;
    setUser(user);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    let email = form.email.value;
    let password = form.password.value;

    fetch(`http://localhost:3005/users?email=${email}`)
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        console.log(password);
        if (user[0].password === password) {
          signIn(user[0]);
        } else {
          alert("User not found!");
        }
      });
  }

  return (
    <div>
      <form
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
