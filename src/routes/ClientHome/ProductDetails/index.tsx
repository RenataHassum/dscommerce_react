import './styles.css';
import ButtonInverse from '../../../components/ButtonInverse';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ProductDetailsCard from '../../../components/ProductDetailsCard';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';
import * as productService from '../../../services/product-service';
import * as cartService from '../../../services/cart-service';
import { ContextCartCount } from '../../../utils/context-cart';

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState<ProductDTO>();
  const navigate = useNavigate();
  const { contextCartCount, setContextCartCount } =
    useContext(ContextCartCount);

  useEffect(() => {
    productService
      .findById(Number(params.productId))
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        navigate('/');
      });
  }, []);

  function handleBuyClick() {
    if (product) {
      cartService.addProduct(product);
      setContextCartCount(cartService.getCart().items.length);
      navigate('/cart');
    }
  }

  return (
    <>
      <main>
        <section id="product-details-section" className="dsc-container">
          {product && (
            <ProductDetailsCard product={product} /> // só vai renderizar se der verdadeiro o product (se ele existe, se ele não for undefined renderiza)
          )}
          <div className="dsc-btn-page-container">
            <div onClick={handleBuyClick}>
              <ButtonPrimary text="Comprar" />
            </div>
            <Link to={'/'}>
              <ButtonInverse text="Início" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
