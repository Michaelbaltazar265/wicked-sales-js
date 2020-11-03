import React from 'react';

function Header(props) {
  return (
    <header className="row align-items-center mb-4 header">
      <img src="/images/logo.png" alt="" className="ml-4 mb-0 logo" onClick={() => props.setView('catalog', {})}/>
      <p className="items click-1" onClick={() => props.setView('cart', {})} >{`${props.cartItemCount} items`}<i className="fas fa-cart-plus"></i></p>
    </header>
  );
}

export default Header;
