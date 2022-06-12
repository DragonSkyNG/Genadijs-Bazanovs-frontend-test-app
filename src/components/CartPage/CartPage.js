import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import CartPageItem from "./CartPageItem";
import classes from "./CartPage.module.scss";
import client from "../../apollo/client";
import { GET_CURRENCIES } from "../../GraphQL/Queries";

class CartPage extends Component {
  state = { totalAmount: {} };
  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const result = await client.query({ query: GET_CURRENCIES });
    if (result.data) {
      this.setState({
        ...this.state,
        currency: result.data.currencies[this.props.currency],
      });
    }
  }

  addToTotalAmount(price, id) {
    // console.log(price);

    this.setState((state) => {
      return {
        ...state,
        totalAmount: { ...state.totalAmount, [id]: { price: price } },
      };
    });
  }
  render() {
    let totalPrice = 0;
    if (this.state.currency) {
      // console.log(this.state.totalAmount);
      if (
        Object.keys(this.state.totalAmount).length >=
        Object.keys(this.props.cartItems).length
      ) {
        this.props.cartItems.forEach((item) => {
          totalPrice =
            totalPrice + this.state.totalAmount[item.id].price * item.amount;
          // console.log(totalPrice);
        });
        // console.log(totalPrice);
      }
    }
    // console.log(this.props.cartItems);
    return (
      <div className={classes["cart-items"]}>
        <h1>Cart</h1>
        <hr />
        {this.props.cartItems.map((item, index) => {
          //console.log(item);
          return (
            <Fragment key={"cart" + index}>
              <CartPageItem
                key={item.id + index + "cart"}
                id={item.id}
                selectedAttributes={item.selectedAttributes}
                amount={item.amount}
                addToTotalAmount={this.addToTotalAmount.bind(this)}
              />
              <hr />
            </Fragment>
          );
        })}
        {this.state.currency && (
          <div className={classes.totals}>
            <div>
              <p>Tax 21%: </p>
              <p>Quantity: </p>
              <p>Total: </p>
            </div>
            <div className={classes.amounts}>
              <p>
                {this.state.currency.symbol + (totalPrice * 0.21).toFixed(2)}{" "}
              </p>
              <p>{this.props.totalItemAmount}</p>
              <p>{this.state.currency.symbol + totalPrice.toFixed(2)}</p>
            </div>
            <button>ORDER</button>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
  totalItemAmount: state.cart.totalItemAmount,
  currency: state.currency.selectedCurrency,
});

export default connect(mapStateToProps)(CartPage);
