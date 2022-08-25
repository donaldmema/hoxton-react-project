import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/HomePage";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Survey } from "./pages/Survey";
import { User } from "./types";

function App() {
  const [user, setUser] = useState<null | User>(null);
  const navigate = useNavigate();

  return (
    <div className="App">
      <main>
        <Routes>
          <Route index element={<Navigate to="/sign-in" />} />
          <Route path="/home" element={<HomePage user={user} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up/survey" element={<Survey />} />
          <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
