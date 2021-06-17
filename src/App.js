import { useEffect, useRef } from "react";
import HomePage from "./pages/Homepage";
import ShopPage from "./pages/ShopPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import Header from "./components/Header";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/utils";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/user/userActions";
import { selectCurrentUser } from "./redux/user/userSelectors";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch(setCurrentUser);

  const unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          dispatch(
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
            })
          );
        });
      } else {
        dispatch(setCurrentUser(userAuth));
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [dispatch]);

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

export default App;
