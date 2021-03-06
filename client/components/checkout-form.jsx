import React from 'react';

class CheckoutFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'checkout',
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  calcItems() {
    const items = this.props.items;
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price;
    }
    const totalItems = total / 100;
    const price = totalItems.toFixed(2);
    return price;
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name && this.state.creditCard && this.state.shippingAddress) {
      this.props.placeOrder(this.state);
    }
  }

  render() {
    if (this.state.view === 'checkout') {
      return (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col-12 flex-column text-center'>
                <h3 className='disclaimer'>Disclaimer</h3>
                <h4> Please do not put sensitive information in the input as this is for demonstration purposes only</h4>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row mt-3 pl-8'>
              <div className='col-3'>
                <h1>Checkout</h1>
              </div>
              <div className='col-10 flex-column mt-3'>
                <h4 className='price text-secondary'>{`Order Total: $${this.calcItems()}`}</h4>
              </div>
              <div className='col-10 form'>
                <form className='col-10' onSubmit={this.handleSubmit}>
                  <div className='form-group mt-3'>
                    <label htmlFor="name"> Name</label>
                    <input type="text" className="form-control" id='name' name='name' placeholder='Full Name' onChange={this.handleChange} value={this.state.name} required/>
                  </div>
                  <div className='form-group mt-3'>
                    <label htmlFor="creditCard">Credit Card</label>
                    <input type="number" className="form-control" id='creditCard' name='creditCard' placeholder='Credit Card Number' onChange={this.handleChange} value={this.state.creditCard} required />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="shippingAddress">Shipping Address</label>
                    <textarea className="form-control" name='shippingAddress' id="shippingAddress" rows="3" placeholder='Shipping Address' onChange={this.handleChange} value={this.state.shippingAddress} required></textarea>
                  </div>
                  <div className='form-group mt-3 d-flex justify-content-between align-items-center'>
                    <p className='click-1 pointer' onClick={() => this.props.setView('catalog', {})}> {' < Continue Shipping '} </p>
                    <button type="submit" className="btn btn-success p-2 pointer">Place Order</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

}

export default CheckoutFrom;
