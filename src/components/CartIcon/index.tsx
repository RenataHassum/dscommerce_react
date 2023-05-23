import { useContext, useState } from 'react';
import cartIcon from '../../assets/shopping-cart.svg';
import './styles.css';
import { ContextCartCount } from '../../utils/context-cart';

export default function CartIcon() {
  const { contextCartCount, setContextCartCount } =
    useContext(ContextCartCount);

  return (
    <>
      <img src={cartIcon} alt="Carrinho de compras" />
      {contextCartCount > 0 && (
        <div className="dsc-cart-count">{contextCartCount}</div>
      )}
    </>
  );
}
