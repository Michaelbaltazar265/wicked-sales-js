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
  }

  calcItems() {
    const items = this.props.items;
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price;
    }
    const totalItems = total / 100;
    return totalItems;

  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.view === 'checkout') {
      return (
        <>
          <div className='container'>
            <div className='row col-10 flex-column'>
              <h3 className='text-center disclaimer'>Disclaimer</h3>
              <h4 className='text-center'> please do not put sensitive information in the input as this is for demonstration purposes only</h4>
            </div>
          </div>
          <div className='container'>
            <div className='row mt-3 pl-8'>
              <h1>Checkout</h1>
              <div className='col-10 flex-column mt-3'>
                <h4 className='price text-secondary'>{`Order Total: $${this.calcItems()}`}</h4>
              </div>
              <div className='col-10 form'>
                <form className='col-10'>
                  <div className='form-group mt-3'>
                    <label htmlFor="name"> Name</label>
                    <input type="text" className="form-control" id='name' name='name' placeholder='Full Name' onChange={this.handleChange} value={this.state.name}/>
                  </div>
                  <div className='form-group mt-3'>
                    <label htmlFor="creditCard">Credit Card</label>
                    <input type="number" className="form-control" id='creditCard' name='creditCard' placeholder='Credit Card Number' onChange={this.handleChange} value={this.state.creditCard} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="shippingAddress">Shipping Address</label>
                    <textarea className="form-control" name='shippingAddress' id="shippingAddress" rows="3" placeholder='Shipping Address' onChange={this.handleChange} value={this.state.shippingAddress}></textarea>
                  </div>
                  <div className='form-group mt-3 d-flex'>
                    <p className='click-1' onClick={() => this.props.setView('catalog', {})}> {' < Continue Shipping '} </p>
                    <button type="submit" className="btn btn-success place-order">Place Order</button>
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
