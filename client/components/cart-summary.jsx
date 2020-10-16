import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(items) {

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
        <div className='footer'>
          <p >Item Total  </p>
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
