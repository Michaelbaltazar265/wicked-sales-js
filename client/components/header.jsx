import React from 'react';

function Header(props) {
  return (
    <header className="header">
      <div className='container'>
        <div className='d-flex header-row align-items-center'>
          <div className=' mr-auto p-2'>
            <img src="/images/logo.png" alt="" className="ml-4 mb-0 logo pointer" onClick={() => props.setView('catalog', {})}/>
          </div>
          <div className=' p-2 align-items-center'>
            <p className="items click-1 pointer" onClick={() => props.setView('cart', {})} >{`${props.cartItemCount} items`}<i className="fas fa-cart-plus align-items-center"></i></p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
