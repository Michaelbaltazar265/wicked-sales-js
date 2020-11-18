import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(items) {
  let total = 0;
  for (let i = 0; i < items.items.length; i++) {
    total += items.items[i].price;
  }
  const totalProduct = total / 100;

  if (items.items.length > 0) {
    return (
      <>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1>My Cart</h1>
            </div>
            <div className='col-3'>
              <div className="click-1 mt-1 pointer " onClick={() => items.setView('catalog', {})}> {' < Back to catalog '} </div>
            </div>
          </div>
          {
            items.items.map(item => {
              return (
                < CartSummaryItem item={item} key={item.cartItemId}/>
              );
            })
          }
        </div>
        <div className='footer '>
          <div className='container '>
            <div className='row'>
              <div className=' col-12 d-flex justify-content-between align-items-center checkout'>
                <p className='mt-3 item-total' >Items Total { `$${totalProduct}`} </p>
                <button onClick={() => items.setView('checkout', {})} type="button" className="btn btn-success pointer ">Checkout</button>
              </div>
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
