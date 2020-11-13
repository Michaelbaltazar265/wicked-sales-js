import React from 'react';

function Header(props) {
  return (
    <header className="header">
      <div className='container'>
        <div className='row row align-items-center'>
          <img src="/images/logo.png" alt="" className="ml-4 mb-0 logo" onClick={() => props.setView('catalog', {})}/>
          <p className="items click-1" onClick={() => props.setView('cart', {})} >{`${props.cartItemCount} items`}<i className="fas fa-cart-plus"></i></p>
        </div>
      </div>
    </header>
  );
}

export default Header;
