import { useEffect } from "react";
import HomePage from "./pages/Homepage";
import ShopPage from "./pages/ShopPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import Header from "./components/Header";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/userActions";

function App({ currentUser, setCurrentUser }) {
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
  }, [setCurrentUser]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/*" element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/signin"
          element={currentUser ? <Navigate to="/" replace /> : <RegisterPage />}
        />
      </Routes>
    </div>
  );
}

const mapState = ({ user: { currentUser } }) => ({
  currentUser,
});

const mapDispatch = {
  setCurrentUser,
};

export default connect(mapState, mapDispatch)(App);
