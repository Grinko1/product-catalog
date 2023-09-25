import Products from '../pages/Products';
import '../Index.scss';
import { Route, Routes } from 'react-router-dom';
import Product from '../pages/Product';
import CreateProduct from '../pages/CreateProduct';
import Login from '../pages/Login';
import { HashRouter } from 'react-router-dom';
import UpdateProduct from '../pages/UpdateProduct';
import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/redux-hooks';
import { checkAuth } from 'features/user/authSlice';
import PrivateLayout from 'containers/private-layout/PrivateLayout';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div className='app'>
      <HashRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateLayout />}>
            <Route index element={<Products />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='create-product' element={<CreateProduct />} />
            <Route path='/update-product/:id' element={<UpdateProduct />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
