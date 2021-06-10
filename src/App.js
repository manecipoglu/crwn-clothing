import { useState, useEffect } from "react";
import HomePage from "./pages/Homepage";
import Shop from "./pages/Shop";
import Header from "./components/Header";
import Register from "./pages/Register";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/utils";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribeFromAuth();
    };
  });

  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signin" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
