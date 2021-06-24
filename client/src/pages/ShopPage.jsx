import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CollectionsOverview from "../components/CollectionsOverview";
import CollectionPage from "./CollectionPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollectionsStartAsync } from "../redux/shop/shopActions";
import {
  selectCollectionFetching,
  selectIsCollectionsLoaded,
} from "../redux/shop/shopSelectors";
import WithSpinner from "../components/WithSpinner";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = () => {
  const dispatch = useDispatch();
  const collectionFetching = useSelector(selectCollectionFetching);
  const isCollectionsLoaded = useSelector(selectIsCollectionsLoaded);

  useEffect(() => {
    dispatch(fetchCollectionsStartAsync());
  }, [dispatch]);

  return (
    <div className="shop-page">
      <Routes>
        <Route
          path="/"
          element={
            <CollectionsOverviewWithSpinner isLoading={collectionFetching} />
          }
        />
        <Route
          path=":collectionId"
          element={
            <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} />
          }
        />
      </Routes>
    </div>
  );
};

export default ShopPage;

// const unsubscribeFromSnapshot = useRef(null);
// useEffect(() => {
//   const collectionRef = firestore.collection("collections");

// FIREBASE METHOD
// unsubscribeFromSnapshot.current = collectionRef.onSnapshot(
//   async snapshot => {
//     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//     dispatch(updateCollections(collectionsMap));
//     setLoading(false);
//   }
// );

// FETCH METHOD
// fetch(
//   "https://firestore.googleapis.com/v1/projects/crwn-clothing-15ca1/databases/(default)/documents/collections"
// )
//   .then(res => res.json())
//   .then(data => console.log(data));

// PROMISE METHOD - BUT IT IS NOT LIVE UPDATING!
// collectionRef.get().then(snapshot => {
//   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//   dispatch(updateCollections(collectionsMap));
//   setLoading(false);
// });
// });
