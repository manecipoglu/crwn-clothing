import CustomButton from "./CustomButton";
import "./CartDropdown.scss";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import { selectCartItems } from "../redux/cart/cartSelectors";
import { useNavigate } from "react-router-dom";
import { toggleCartHidden } from "../redux/cart/cartActions";

const CartDropdown = ({ cartItems, toggleCartHidden }) => {
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} item={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          navigate("/checkout");
          toggleCartHidden();
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapState = state => ({
  cartItems: selectCartItems(state),
});

const mapDispatch = {
  toggleCartHidden,
};

export default connect(mapState, mapDispatch)(CartDropdown);
