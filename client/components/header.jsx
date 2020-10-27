import React from 'react';

function Header(props) {
  return (
    <header className="row align-items-center mb-4">
      <h2 className="ml-4 mb-0"><i className="mr-2 fas fa-dollar-sign"></i>Wicked Sales</h2>
      <p className="items click-1" onClick={() => props.setView('cart', {})} >{`${props.cartItemCount} items`}<i className="fas fa-cart-plus"></i></p>
    </header>
  );
}

export default Header;
