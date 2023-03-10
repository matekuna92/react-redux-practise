import { useDispatch, useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartSliceActions } from '../../store/cart-slice';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, price, description } = props;

  // using the props values from Products
  const addToCartHandler = () => {
    dispatch(cartSliceActions.addItemToCart({
      id: id,
      title: title,
      price: price,
      description: description
    }));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
