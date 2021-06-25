import { useEffect, useRef, lazy, Suspense } from "react";

import Header from "./components/Header";
import Spinner from "./components/Spinner";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/utils";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/user/userActions";
import { selectCurrentUser } from "./redux/user/userSelectors";

const HomePage = lazy(() => import("./pages/Homepage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

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
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/*" element={<ShopPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/signin"
            element={
              currentUser ? <Navigate to="/" replace /> : <RegisterPage />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
