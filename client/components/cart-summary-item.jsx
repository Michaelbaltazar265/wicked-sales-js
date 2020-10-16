import React from 'react';

function CartSummaryItem(items) {

  const item = items.item;
  // eslint-disable-next-line no-console
  // console.log(item.price);
  const price = [];
  price.push(item.price);
  // console.log(price);

  for (let i = 0; i < price.length; i++) {
    const add = [];
    add.push(price[i]);
    // eslint-disable-next-line no-console
    // console.log('adding ', add);

  }

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
