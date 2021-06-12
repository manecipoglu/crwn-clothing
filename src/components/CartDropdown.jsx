import CustomButton from "./CustomButton";
import "./CartDropdown.scss";
import CartItem from "./CartItem";
import { connect } from "react-redux";

const CartDropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapState = ({ cart: { cartItems } }) => ({
  cartItems,
});

export default connect(mapState)(CartDropdown);
