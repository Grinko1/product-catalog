import { memo } from 'react';
import { Product } from 'types';
import style from './ListItem.module.scss';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';

interface ProductItemProps {
  product: Product;
}
const ProductItem = (props: ProductItemProps) => {
  const { product } = props;

  return (
    <Link to={`/product/${product.id}`} className={style.Product}>
      <img src={product.image} alt='' />
      <div className={style.ProductDesc}>
        <p className={style.Title}>{product.title}</p>
        <div>
          <Rate allowHalf disabled defaultValue={product.rating?.rate} />
          <span className={style.Price}>${product.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductItem);
