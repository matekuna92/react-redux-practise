import classes from './CartButton.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { uiSliceActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartItemAmount = useSelector(state => state.cart.totalAmount);
  
  const toggleCartHandler = () => {
    dispatch(uiSliceActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemAmount}</span>
    </button>
  );
};

export default CartButton;
