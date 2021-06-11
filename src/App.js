import { useState, useEffect } from "react";
import HomePage from "./pages/Homepage";
import ShopPage from "./pages/ShopPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/utils";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signin" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
