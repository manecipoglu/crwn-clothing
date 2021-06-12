import "./CollectionItem.scss";
import CustomButton from "./CustomButton";
import { addItem } from "../redux/cart/cartActions";
import { connect } from "react-redux";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to Cart
      </CustomButton>
    </div>
  );
};

const mapDispatch = {
  addItem,
};

export default connect(null, mapDispatch)(CollectionItem);
