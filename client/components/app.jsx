import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      cart: [],
      view: { name: 'checkout', params: {} } // { name: 'modal', modal: {} }
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);

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

  placeOrder(order) {
    const reqest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };
    fetch('/api/orders', reqest)
      .then(res => res.json())
      .then(data => this.setState({
        cart: [],
        view: {
          name: 'catalog',
          params: {}
        }
      })
      )
      .catch(err => console.error(err));
  }

  render() {
    let renderProducts = null;

    if (this.state.view.name === 'catalog') {
      renderProducts = < ProductList setView={this.setView} />;
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <div className='parallax'></div>
          <div className=" container col-sm-12 ">
            <h3 className='text-center'>Product Line </h3>
            <div className=" row justify-content-center ">
              {renderProducts}
            </div>
          </div>
        </>
      );
    } else if (this.state.view.name === 'cart') {
      renderProducts = < CartSummary items={this.state.cart} setView={this.setView} handleClick={this.setView}/>;
    } else if (this.state.view.name === 'checkout') {
      renderProducts = < CheckoutForm items={this.state.cart} setView={this.setView} />;
    } else if (this.state.view.name === 'modal') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <h1 className='text-center'>Disclaimer</h1>
              </div>
              <div className='col-12' >
                <p className='text-center'> This site is intended for demonstration purposes only. No purchases can be made on this site.</p>
              </div>
              <div className='col-12'>
                <p className='text-center'> Please click enter to proceed </p>
              </div>
              <div className='col text-center'>
                <button type="button" className='text-center btn btn-danger' onClick = {() => this.setView('catalog', {})}>Enter</button>
              </div>
            </div>
          </div>
        </>
      );
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
