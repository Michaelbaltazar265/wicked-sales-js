import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      cart: [],
      view: { name: 'catalog', params: {} }
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);

  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        this.setState({ cart: data });
      })
      .catch(err => console.error(err));
  }

  addToCart(product) {
    const getPostReq = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', getPostReq)
      .then(res => res.json())
      .then(data => {
        this.setState({
          cart: this.state.cart.concat(data)
        });
      })
      .catch(err => console.error(err));

  }

  render() {
    let renderProducts = null;

    if (this.state.view.name === 'catalog') {
      renderProducts = < ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'cart') {
      renderProducts = < CartSummary items={this.state.cart} setView={this.setView}/>;
    } else {
      renderProducts = <ProductDetails addToCart={this.addToCart} viewParams={this.state.view.params} setView={this.setView} />;

    }

    return (
      <>
        <Header cartItemCount={this.state.cart.length} setView={this.setView} />
        <div className=" container col-sm-12 ">
          <div className=" row justify-content-center ">
            {renderProducts}
          </div>
        </div>
      </>
    );
  }
}
