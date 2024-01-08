import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profilePage/Profile";
import Signup from "./pages/signup/Signup";
import { Route, BrowserRouter as Router, Routes, redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? redirect('/') : <Login />} />
        <Route path="/signup" element={user ? redirect('/') : <Signup />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
