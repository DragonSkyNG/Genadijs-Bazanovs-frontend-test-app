import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
import client from "../../apollo/client";
import { getProducts } from "../../GraphQL/Queries";
import ProductItem from "./ProductItem";
import classes from "./Products.module.scss";
import { connect } from "react-redux";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.fetchProducts();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchProducts();
    }
  }

  async fetchProducts() {
    const result = await client.query({
      query: getProducts(this.props.category),
      fetchPolicy: "no-cache",
    });
    if (result.data) {
      this.setState({ products: result.data.category.products });
    }
  }

  render() {
    let products;
    if (this.state.products.length > 0) {
      products = this.state.products.map((item) => {
        return (
          <ProductItem
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.gallery[0]}
            price={
              item.prices[this.props.currency].currency.symbol +
              item.prices[this.props.currency].amount
            }
            attributes={item.attributes}
            inStock={item.inStock}
          />
        );
      });
    }
    return (
      <Fragment>
        <div>
          <h1>{this.props.category.toUpperCase()}</h1>
        </div>
        <div className={classes.products}>
          {products ? products : "loading"}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.selectedCurrency,
});

export default connect(mapStateToProps)(Products);
