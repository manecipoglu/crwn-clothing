import { useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CollectionsOverview from "../components/CollectionsOverview";
import CollectionPage from "./CollectionPage";
import { firestore, convertCollectionsToMap } from "../firebase/utils";

const ShopPage = () => {
  const unsubscribeFromSnapshot = useRef(null);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");

    collectionRef.onSnapshot(async snapshot => {
      convertCollectionsToMap(snapshot);
    });
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
