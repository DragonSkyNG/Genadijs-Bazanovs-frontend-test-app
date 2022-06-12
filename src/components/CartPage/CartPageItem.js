import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import client from "../../apollo/client";
import { getProductDetails } from "../../GraphQL/Queries";
import Attribute from "../UI/Attribute";
import classes from "./CartPageItem.module.scss";
import { increaseAmount, removeItem } from "../../store/cartSlice";

class CartPageItem extends Component {
  constructor(props) {
    super(props);
    this.state = { productDetails: {} };
  }
  componentDidMount() {
    this.fetchProductDetails();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.amount !== this.props.amount) {
  //     let price = this.state.productDetails.prices[this.props.currency].amount;
  //     this.props.addToTotalAmount(
  //       price,
  //       this.state.productDetails.id,
  //     );
  //   }
  // }

  async fetchProductDetails() {
    const result = await client.query({
      query: getProductDetails(this.props.id),
      fetchPolicy: "no-cache",
    });
    if (result.data) {
      this.setState({ productDetails: result.data.product });
      this.props.addToTotalAmount(
        result.data.product.prices[this.props.currency].amount,
        result.data.product.id
      );
    }
  }

  increaseAmountHandler() {
    this.props.dispatch(increaseAmount({ id: this.state.productDetails.id }));
  }

  removeItemHandler() {
    this.props.dispatch(removeItem({ id: this.state.productDetails.id }));
  }

  render() {
    let product;
    if (Object.keys(this.state.productDetails).length > 0) {
      const productDetails = this.state.productDetails;

      product = (
        <Fragment>
          <div className={classes["item-details"]}>
            <div className={classes["item-name"]}>
              <p>{productDetails.brand}</p>
              <p>{productDetails.name}</p>
            </div>
            <p className={classes.price}>
              {productDetails.prices[this.props.currency].currency.symbol +
                productDetails.prices[this.props.currency].amount}
            </p>
            {productDetails.attributes.map((item) => {
              return (
                <Attribute
                  key={item.id + this.props.id + "cart"}
                  additionalKey={"cart"}
                  attribute={item}
                  productId={this.props.id}
                  selectedAttribute={this.props.selectedAttributes[item.id]}
                />
              );
            })}
          </div>
          <div className={classes["item-amount"]}>
            <button onClick={this.increaseAmountHandler.bind(this)}>+</button>
            <p>{this.props.amount}</p>
            <button onClick={this.removeItemHandler.bind(this)}>-</button>
          </div>
          <div className={classes["item-image"]}>
            <img src={productDetails.gallery[0]} alt={productDetails.id} />
          </div>
        </Fragment>
      );
    }

    return <div className={classes["cart-item"]}>{product}</div>;
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.selectedCurrency,
});

export default connect(mapStateToProps)(CartPageItem);
