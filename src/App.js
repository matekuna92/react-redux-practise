import {Fragment, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiSliceActions } from './store/ui-slice';
import Notification from "./components/UI/Notification";

// initialising outside of component, so won't be changed and re-initialised when the component rerenders again
let isInitialLoad = true;

function App() {
  const show = useSelector(state => state.ui.isCartVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
      // async cannot be used inside useEffect! Requires sepereate function
      const sendCardData = async () => {
          dispatch(uiSliceActions.showNotification({
              status: 'pending',
              title: 'Sending...',
              message: 'Sending card data'
          }));

          const response = await fetch('https://react-redux-319a7-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
              method: 'PUT',
              body: JSON.stringify(cart)
          });

          if(!response.ok) {
              throw new Error('Sending card data failed.');
          }

          dispatch(uiSliceActions.showNotification({
              status: 'success',
              title: 'Success',
              message: 'Sent card data successfully'
          }))
      };

      // fix for success message that was appeared on first page load, not only while adding to cart. Block notification component on first load
      if(isInitialLoad) {
          isInitialLoad = false;
          return;
      }

      sendCardData().catch(error => {
          dispatch(uiSliceActions.showNotification({
              status: 'error',
              title: 'Error',
              message: 'Sending card data failed'
          }));
      });
  }, [cart]);

  return (
    <Fragment>
        {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        <Layout>
          {show && <Cart />}
          <Products />
        </Layout>
    </Fragment>
  );
}

export default App;
