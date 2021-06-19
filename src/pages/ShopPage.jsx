import { useRef, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CollectionsOverview from "../components/CollectionsOverview";
import CollectionPage from "./CollectionPage";
import { firestore, convertCollectionsSnapshotToMap } from "../firebase/utils";
import { useDispatch } from "react-redux";
import { updateCollections } from "../redux/shop/shopActions";
import Spinner from "../components/Spinner";

const CollectionsOverviewWithSpinner = Spinner(CollectionsOverview);
const CollectionPageWithSpinner = Spinner(CollectionPage);

const ShopPage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const unsubscribeFromSnapshot = useRef(null);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");

    unsubscribeFromSnapshot.current = collectionRef.onSnapshot(
      async snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(updateCollections(collectionsMap));
        setLoading(false);
      }
    );
  });

  return (
    <div className="shop-page">
      <Routes>
        <Route
          path="/"
          element={<CollectionsOverviewWithSpinner isLoading={loading} />}
        />
        <Route
          path=":collectionId"
          element={<CollectionPageWithSpinner isLoading={loading} />}
        />
      </Routes>
    </div>
  );
};

export default ShopPage;
