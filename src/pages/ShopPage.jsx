import { useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CollectionsOverview from "../components/CollectionsOverview";
import CollectionPage from "./CollectionPage";
import { firestore, convertCollectionsSnapshotToMap } from "../firebase/utils";
import { useDispatch } from "react-redux";
import { updateCollections } from "../redux/shop/shopActions";

const ShopPage = () => {
  const dispatch = useDispatch();
  const unsubscribeFromSnapshot = useRef(null);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");

    unsubscribeFromSnapshot.current = collectionRef.onSnapshot(
      async snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(updateCollections(collectionsMap));
      }
    );
  });

  return (
    <div className="shop-page">
      <Routes>
        <Route path="/" element={<CollectionsOverview />} />
        <Route path=":collectionId" element={<CollectionPage />} />
      </Routes>
    </div>
  );
};

export default ShopPage;
