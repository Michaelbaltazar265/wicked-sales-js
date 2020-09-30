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
      // eslint-disable-next-line no-console
      .then(data => {
        this.setState({ products: data });
      });
  }

  render() {
    return (
      this.state.products.map(product => {
        return (
          <ProductListItem setView={this.props.setView} key={product.productId} products={product} />
        );
      })
    );
  }

}

export default ProductList;
