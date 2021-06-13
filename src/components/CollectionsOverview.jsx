import { connect } from "react-redux";
import CollectionPreview from "./CollectionPreview";
import { selectCollectionsForPreview } from "../redux/shop/shopSelectors";

import "./CollectionsOverview.scss";

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapState = state => ({
  collections: selectCollectionsForPreview(state),
});

export default connect(mapState)(CollectionsOverview);
