import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('./api/products')
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data });
      });
  }

  render() {
    return (
      <main className='row body-section'>
        <div className='details-container col'>
          <div className=' d-flex align-items-center justify-content-center '>
            <div className=' flex-wrap d-flex justify-content-center mb-5'>
              {
                this.state.products.map(product => {
                  return (
                    <ProductListItem setView={this.props.setView} key={product.productId} products={product} />
                  );
                })
              }
            </div>
          </div>
        </div>
      </main>
    );
  }

}

export default ProductList;
