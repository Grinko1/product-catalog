import { memo } from 'react';
import ProductItem from '../list-item/ListItem';
import { Product } from 'types';
import style from './ProductList.module.scss';

interface ProductListProps {
  products: Product[] ;
}
const ProductList = (props: ProductListProps) => {
  const { products } = props;

  return (
    <div className={style.List}>
      {products && products.map((item) => <ProductItem key={item.id} product={item} />)}
    </div>
  );
};

export default memo(ProductList);
