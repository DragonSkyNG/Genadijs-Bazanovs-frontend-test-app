import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../../UI/Modal";
import { hideCart } from "../../../store/showCartSlice";
import CartItem from "./CartItem";
import classes from "./Cart.module.scss";
import { Link } from "react-router-dom";
import client from "../../../apollo/client";
import { GET_CURRENCIES } from "../../../GraphQL/Queries";

class Cart extends Component {
  state = { totalAmount: {} };
  closeCartHandler() {
    this.props.dispatch(hideCart());
  }

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
    this.setState((state) => {
      return {
        ...state,
        totalAmount: { ...state.totalAmount, [id]: { price: price } },
      };
    });
  }

  render() {
    if (this.state.currency) {
      let totalPrice = 0;
      if (
        Object.keys(this.state.totalAmount).length >=
        Object.keys(this.props.cartItems).length
      ) {
        this.props.cartItems.forEach((item) => {
          totalPrice =
            totalPrice + this.state.totalAmount[item.id].price * item.amount;
        });
      }
      let products = this.props.cartItems.map((item, index) => {
        return (
          <CartItem
            key={item.id + index}
            id={item.id}
            selectedAttributes={item.selectedAttributes}
            amount={item.amount}
            addToTotalAmount={this.addToTotalAmount.bind(this)}
          />
        );
      });
      return (
        <Modal onClose={this.closeCartHandler.bind(this)}>
          <h1>My cart, {this.props.totalItemAmount} items </h1>
          <div className={classes["cart-items"]}>{products}</div>
          <p>
            Total amount: {this.state.currency.symbol} {totalPrice.toFixed(2)}
          </p>
          <Link to={"/cart"} onClick={this.closeCartHandler.bind(this)}>
            <button className={classes.button}>Open Cart</button>
          </Link>
        </Modal>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
  totalItemAmount: state.cart.totalItemAmount,
  currency: state.currency.selectedCurrency,
});

export default connect(mapStateToProps)(Cart);
