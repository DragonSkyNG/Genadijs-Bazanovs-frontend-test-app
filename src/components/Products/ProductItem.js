import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addItem } from "../../store/cartSlice";
import classes from "./ProductItem.module.scss";
import addToCartIcon from "../../assets/addToCartIcon.png";

class ProductItem extends Component {
  addToCartHandler() {
    let attributes;

    this.props.attributes.forEach((item) => {
      attributes = {
        ...attributes,
        [item.name]: item.items[0].id,
      };
    });
    let payload = {
      id: this.props.id,
      initialAttributes: true,
      selectedAttributes: attributes,
    };
    this.props.dispatch(addItem(payload));
  }

  render() {
    return (
      <div className={classes.product}>
        <Link to={"/products/" + this.props.id}>
          <img
            src={this.props.image}
            alt={this.props.name + " image"}
            className={
              !this.props.inStock
                ? classes["product-img"] + " " + classes["no-stock-img"]
                : classes["product-img"]
            }
          />
          {!this.props.inStock && (
            <div className={classes["no-stock"]}>OUT OF STOCK</div>
          )}
        </Link>
        <div className={classes["product-details"]}>
          <Link to={"/products/" + this.props.id}>
            <p className={classes.name}>{this.props.name}</p>
          </Link>
          <p className={classes.price}>{this.props.price}</p>
        </div>
        <img
          onClick={
            this.props.inStock ? this.addToCartHandler.bind(this) : undefined
          }
          className={
            !this.props.inStock
              ? classes["icon-img"] + " " + classes["no-stock-cart"]
              : classes["icon-img"]
          }
          src={addToCartIcon}
          alt="Add To Cart icon"
        />
      </div>
    );
  }
}

export default connect()(ProductItem);
