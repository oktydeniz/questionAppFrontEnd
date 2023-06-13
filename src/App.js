import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import User from "./companents/user/User";
import Home from "./companents/home/Home";
import Navbar from "./companents/navbar/Navbar";
import Auth from "./companents/auth/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/users/:userId" element={<User />}></Route>
          <Route exact path="/auth" element={ localStorage.getItem("currentUser") != null ? <Navigate  to="/"/> : <Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
