import './styles.css';
import SearchBar from '../../../components/SearchBar';
import CatalogCard from '../../../components/CatalogCard';
import ButtonNextPage from '../../../components/ButtonNextPage';
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
export default function Catalog() {
  return (
    <>
      <main>
        <section id="catalog-section" className="dsc-container">
          <SearchBar />
          <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
            <CatalogCard product={product} />
            <CatalogCard product={product} />
            <CatalogCard product={product} />
            <CatalogCard product={product} />
            <CatalogCard product={product} />
            <CatalogCard product={product} />
            <CatalogCard product={product} />
            <CatalogCard product={product} />
            <CatalogCard product={product} />
            <CatalogCard product={product} />
          </div>
          <ButtonNextPage />
        </section>
      </main>
    </>
  );
}
