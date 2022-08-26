import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Survey } from "./pages/Survey";
import { User } from "./types";

function App() {
  const [user, setUser] = useState<null | User>(null);

  function handleSignOut() {
    localStorage.removeItem("id");
    setUser(null);
  }

  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/sign-in" />} />
        <Route
          path="/home"
          element={<HomePage user={user} setUser={setUser} />}
        />
        <Route
          path="/:userId/:username"
          element={<ProfilePage user={user} handleSignOut={handleSignOut} />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up/survey" element={<Survey />} />
        <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
