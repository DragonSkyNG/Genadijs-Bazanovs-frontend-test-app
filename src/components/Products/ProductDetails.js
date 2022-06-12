import React, { Component, Fragment } from "react";
import { useParams } from "react-router-dom";
import client from "../../apollo/client";
import { getProductDetails } from "../../GraphQL/Queries";
import Attribute from "../UI/Attribute";
import classes from "./ProductDetails.module.scss";
import { connect } from "react-redux";
import { addItem } from "../../store/cartSlice";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { productDetails: {} };
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }
  componentDidMount() {
    this.fetchProductDetails();
  }

  async fetchProductDetails() {
    const result = await client.query({
      query: getProductDetails(this.props.params.productId),
      fetchPolicy: "no-cache",
    });
    if (result.data) {
      this.setState({ productDetails: result.data.product });
    }
  }

  expandImageHandler(event) {
    // console.log();
    let expandedImage = document.getElementById("expandedImg");
    expandedImage.src = event.target.src;
  }

  addToCartHandler(event) {
    event.preventDefault();
    let attributes = false;
    if (this.state.productDetails.attributes.length > 0) {
      this.state.productDetails.attributes.forEach((item) => {
        attributes = {
          ...attributes,
          [item.name]:
            event.target[this.state.productDetails.id + item.name].value,
        };
      });
    }
    let payload = {
      id: event.target.productId.value,
      selectedAttributes: attributes,
    };
    this.props.dispatch(addItem(payload));
  }

  render() {
    let product;
    if (Object.keys(this.state.productDetails).length > 0) {
      const productDetails = this.state.productDetails;
      product = (
        <Fragment>
          <div className={classes.gallery}>
            <div className={classes.galleryTabs} id="galleryTabs">
              {productDetails.gallery.map((item, index) => {
                return (
                  <img
                    key={"img-" + index}
                    src={item}
                    alt={productDetails.id + "-img-" + index}
                    onClick={this.expandImageHandler}
                  />
                );
              })}
            </div>
            <div className={classes.expImg}>
              <img
                id="expandedImg"
                src={productDetails.gallery[0]}
                alt="expandedImage"
              />
            </div>
          </div>
          <div className={classes.details}>
            <h2>{productDetails.brand}</h2>
            <p className={classes["item-name"]}>{productDetails.name}</p>
            <form onSubmit={this.addToCartHandler}>
              <input type="hidden" name="productId" value={productDetails.id} />
              {productDetails.attributes.map((item) => {
                return (
                  <Attribute
                    key={item.id}
                    attribute={item}
                    productId={productDetails.id}
                  />
                );
              })}
              <div
                dangerouslySetInnerHTML={{ __html: productDetails.description }}
              />
              <p className={classes.price}>
                PRICE: <br />
                {productDetails.prices[this.props.currency].currency.symbol +
                  productDetails.prices[this.props.currency].amount}
              </p>
              <button
                className={
                  productDetails.inStock
                    ? classes.button
                    : classes.button + " " + classes["no-stock"]
                }
                disabled={!productDetails.inStock}
              >
                {productDetails.inStock ? "Add to cart!" : "Out of stock!"}
              </button>
            </form>
          </div>
        </Fragment>
      );
    }

    return <div className={classes.productDetails}>{product}</div>;
  }
}

const withRouterParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

const mapStateToProps = (state) => ({
  currency: state.currency.selectedCurrency,
});

export default connect(mapStateToProps)(withRouterParams(ProductDetails));
