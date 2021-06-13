import { Routes, Route } from "react-router-dom";
import CollectionsOverview from "../components/CollectionsOverview";
import CollectionPage from "./CollectionPage";

const ShopPage = () => (
  <div className="shop-page">
    <Routes>
      <Route path="/" element={<CollectionsOverview />} />
      <Route path=":collectionId" element={<CollectionPage />} />
    </Routes>
  </div>
);

export default ShopPage;
