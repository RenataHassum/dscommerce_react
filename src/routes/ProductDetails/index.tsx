import './styles.css';
import ButtonInverse from '../../components/ButtonInverse';
import ButtonPrimary from '../../components/ButtonPrimary';
import HeaderClient from '../../components/HeaderClient';
import ProductDetailsCard from '../../components/ProductDetailsCard';
import { ProductDTO } from '../../models/product';

const product: ProductDTO = {
  id: 2,
  name: 'Smart TV HD LED 32” Samsung T4300 - Wi-Fi HDR 2 HDMI 1 USB',
  description:
    'Curta seus filmes, série e programas favoritos com a máxima qualidade de imagem e som com a Smart TV Samsung T4300. Com uma tela LED de 32" e resolução HD, ela oferece uma quantidade muito maior de detalhes, mais nitidez e cores vibrantes que vão surpreender você e todos seus amigos e familiares. A conectividade Wi-Fi Direct e 2 entradas HDMI, 2 USB, 1 ethernet, 1 saída óptica, 1 entrada RF e 1 entrada de vídeo componente vão manter você sempre conectado e por dentro de tudo. Além disso, ela também conta com sistema operacional Tizen, processador Hyper Real, HDR e sistema de espelhamento de smartphone para TV.',
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
      <HeaderClient />
      <main>
        <section id="product-details-section" className="dsc-container">
          <ProductDetailsCard product={product} />
          <div className="dsc-btn-page-container">
            <ButtonPrimary />
            <ButtonInverse />
          </div>
        </section>
      </main>
    </>
  );
}
