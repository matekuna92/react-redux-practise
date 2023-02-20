import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const show = useSelector(state => state.ui.isCartVisible);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
      fetch('https://react-redux-319a7-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
          method: 'PUT',
          body: JSON.stringify(cart)
      });
  }, [cart]);

  return (
    <Layout>
      {show && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
