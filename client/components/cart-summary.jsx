import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(items) {
  let total = 0;
  for (let i = 0; i < items.items.length; i++) {
    total += items.items[i].price;
  }
  const totalProduct = total / 100;
  // setView('checkout', {})

  if (items) {
    return (
      <>
        <h1>My Cart</h1>

        <div className='container'>
          <div className="click-1 mt-1" onClick={() => items.setView('catalog', {})}> {' < Back to catalog '} </div>
          {
            items.items.map(item => {
              return (
                < CartSummaryItem item={item} key={item.cartItemId}/>
              );
            })
          }
        </div>
        <div className='footer col-md-12 col-10 my-3 d-flex justify-content-between align-items-center'>
          <div className='container '>
            <div className='row'>
              <p className='mt-3 item-total' >Item Total { `$${totalProduct}`} </p>
              <button onClick={() => items.setView('checkout', {})} type="button" className="btn btn-success checkout">Checkout</button>
            </div>
          </div>
        </div>
      </>
    );

  } else {
    return (
      <>
        <h1>There are no items in your shopping cart at this time </h1>

      </>
    );
  }
}

export default CartSummary;
