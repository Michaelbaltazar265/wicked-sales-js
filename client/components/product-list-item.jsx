import React from 'react';

function ProductListItem(props) {
  const priceProduct = props.products.price / 100;
  return (

    <div className="card mr-md-5 click my-card" onClick={() => props.setView('details', { productId: props.products.productId })} >
      <div className='row image-div'>
        <img className="my-card-img-top " src={props.products.image} alt="Image of product" />
      </div>
      <div className='card-body'>
        <h5 className="card-title">{props.products.name}</h5>
        <p className="text-secondary">{`$${priceProduct.toFixed(2)}`}</p>
        <p className="pb-5">{props.products.shortDescription}</p>
      </div>
    </div>

  );
}

export default ProductListItem;
