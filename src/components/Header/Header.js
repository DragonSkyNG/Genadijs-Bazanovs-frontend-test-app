import React, { Component } from "react";
import Currency from "./Currency";
import Categories from "./Categories";
import Cart from "./Cart/Cart";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { showCart, hideCart } from "../../store/showCartSlice";
import logo from "../../assets/logo.png";
import { ReactComponent as CartIcon } from "../../assets/cartIcon.svg";

class Header extends Component {
  showCartHandler() {
    this.props.showCart
      ? this.props.dispatch(hideCart())
      : this.props.dispatch(showCart());
  }
  closeCartHandle() {
    this.props.dispatch(hideCart());
  }
  render() {
    return (
      <header className={classes.navHeader}>
        <Categories closeCart={this.closeCartHandle.bind(this)} />
        <div className={classes.logo}>
          <Link to={"/products/all"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <span className={classes["currency-cart"]}>
          <Currency />
          <button
            className={classes["cart-button"]}
            onClick={this.showCartHandler.bind(this)}
          >
            <span className={classes["cart-icon"]}>
              <CartIcon />
            </span>
            <span className={classes["cart-badge"]}>{this.props.totalItemAmount}</span>
          </button>
        </span>
        {this.props.showCart && <Cart />}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  showCart: state.showCart.isShown,
  totalItemAmount: state.cart.totalItemAmount,
});

export default connect(mapStateToProps)(Header);
