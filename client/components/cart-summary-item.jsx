import React from 'react';

function CartSummaryItem(items) {

  const item = items.item;
  return (

    <>
      <div className='row product-detail'>
        <div className='col-5'>
          <img className="my-card-img-top img-cart" src={item.image}/>
        </div>
        <div className=" d-flex flex-column product-info col-5">
          <h3 className='name'> {item.name} </h3>
          <h4 className='price text-secondary'>{`$${item.price / 100}`}</h4>
          <p className="short-des">{item.shortDescription}</p>
        </div>
      </div>
    </>
  );
}
export default CartSummaryItem;
