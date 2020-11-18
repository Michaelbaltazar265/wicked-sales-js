import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.viewParams.productId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ product: data });
      });
  }

  render() {
    const product = this.state.product;
    if (product) {
      return (
        <div className="container">
          <div className='col-3'>
            <div className="click-1 mt-1 pointer" onClick={() => this.props.setView('catalog', {})}> {' < Back to catalog '} </div>
          </div>
          <div className="row product-detail">
            <div className="col-5">
              <img className="my-card-img-top card-img-top" src={product.image} alt="Image of product" />
            </div>
            <div className="col-3 mt-5 p-2">
              <h3>{product.name}</h3>
              <p className="price text-secondary">{`$${product.price / 100}`}</p>
              <p className="card-text ">{product.shortDescription}</p>
              <button onClick={() => this.props.addToCart(this.state.product)} type="button" className="btn btn-primary pointer">Add to Cart</button>
            </div>
            <div className="row">
              <p className="paragraph-spacing"> {product.longDescription} </p>
            </div>
          </div>
        </div>
      );

    } else {
      return (
        null
      );
    }
  }

}

export default ProductDetails;
