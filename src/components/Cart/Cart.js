import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartProducts = useSelector(state => state.cart.products);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
      {cartProducts.map(item => (
        <CartItem
          item={{
            title: item.title,
            quantity: item.amount,
            total: item.totalPrice,
            price: item.price
          }}
        />
      ))}
        
      </ul>
    </Card>
  );
};

export default Cart;
