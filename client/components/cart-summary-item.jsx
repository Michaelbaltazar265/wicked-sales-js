import React from 'react';

function CartSummaryItem(items) {

  const item = items.item;
  return (

    <>
      <div className='row product-detail body-section p-2'>
        <div className='col-5 align-items-center p-8'>
          <img className="my-card-img-top img-cart" src={item.image}/>
        </div>
        <div className=" d-flex flex-column product-info col p-4 align-items-center">
          <h3 className='name p-5'> {item.name} </h3>
          <h4 className='price text-secondary'>{`$${item.price / 100}`}</h4>
          <p className="short-des">{item.shortDescription}</p>
        </div>
      </div>
    </>
  );
}
export default CartSummaryItem;
