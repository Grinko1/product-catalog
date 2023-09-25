import { Button, Rate } from 'antd';
import { Product } from 'types';
import style from './ProductDetail.module.scss';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface ProductDetailProps {
  product: Product;
  onDelete:()=>void
}
const ProductDetail = (props: ProductDetailProps) => {
  const { product, onDelete } = props;

  return (
    <div className={style.ProductDetail}>
      <div className={style.ProductDetailImg}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={style.ProductDetailInfo}>
        <h1>{product.title}</h1>
        <div className={style.Description}>
          <p>{product.description}</p>
          <Rate allowHalf disabled defaultValue={product.rating?.rate} />({product.rating?.rate})
        </div>
        <div className={style.Price}>
          <h4>${product.price}</h4>
          <span>*in stock {product.rating?.count}</span>
        </div>
        <div className={style.ProductBtns}>
          <Button size={'large'} type='primary'>
            <Link to={`/update-product/${product.id}`}>Update</Link>
          </Button>
          <Button size={'large'} danger onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetail);
