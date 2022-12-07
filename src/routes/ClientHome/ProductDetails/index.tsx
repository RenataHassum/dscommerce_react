import './styles.css';
import ButtonInverse from '../../../components/ButtonInverse';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ProductDetailsCard from '../../../components/ProductDetailsCard';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';
import * as productService from '../../../services/product-service';

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState<ProductDTO>();
  const navigate = useNavigate();

  useEffect(() => {
    productService
      .findById(Number(params.productId))
      .then((response) => {
        console.log(response);
        setProduct(response.data);
      })
      .catch((error) => {
        navigate('/');
      });
  }, []);

  return (
    <>
      <main>
        <section id="product-details-section" className="dsc-container">
          {product && (
            <ProductDetailsCard product={product} /> // só vai renderizar se der verdadeiro o product (se ele existe, se ele não for undefined renderiza)
          )}
          <div className="dsc-btn-page-container">
            <ButtonPrimary text="Comprar" />
            <Link to={'/'}>
              <ButtonInverse text="Início" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}