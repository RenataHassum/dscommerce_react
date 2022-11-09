import './styles.css';
import ButtonInverse from '../../../components/ButtonInverse';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ProductDetailsCard from '../../../components/ProductDetailsCard';
import { ProductDTO } from '../../../models/product';

const product: ProductDTO = {
  id: 2,
  name: 'Smart TV HD LED 32” Samsung T4300 - Wi-Fi HDR 2 HDMI 1 USB',
  description:
    'Curta seus filmes, série e programas favoritos com a máxima qualidade de imagem e som com a Smart TV Samsung T4300. Com uma tela LED de 32" e resolução HD, ela oferece uma quantidade muito maior de detalhes, mais nitidez e cores vibrantes que vão surpreender você e todos seus amigos e familiares',
  imgUrl:
    'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg',
  price: 2500.99,
  categories: [
    {
      id: 2,
      name: 'Eletrônicos',
    },
    {
      id: 3,
      name: 'Computadores',
    },
    {
      id: 4,
      name: 'Importados',
    },
  ],
};

export default function ProductDetails() {
  return (
    <>
      <main>
        <section id="product-details-section" className="dsc-container">
          <ProductDetailsCard product={product} />
          <div className="dsc-btn-page-container">
            <ButtonPrimary text="Comprar" />
            <ButtonInverse text="Início" />
          </div>
        </section>
      </main>
    </>
  );
}
