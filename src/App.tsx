import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import { SignIn } from "./pages/SignIn";

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route index element={<Navigate to="/sign-in" />} />
          {/* <Route path="/home" element={<HomePage />} /> */}
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
          <Route path="/sign-in" element={<SignIn />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
