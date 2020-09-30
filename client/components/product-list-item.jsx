import React from 'react';

function ProductListItem(props) {
  return (
    <div className="my-card card col-lg-3 mr-md-5 click" onClick={() => props.setView('details', { productId: props.products.productId })} >
      <img className="my-card-img-top" src={props.products.image} alt="Image of product" />
      <div>
        <h5 className="my-card-title card-title">{props.products.name}</h5>
        <p className="text-secondary">{`$${props.products.price}`}</p>
        <p className="pb-5">{props.products.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
