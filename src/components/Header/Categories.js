import React, { Component } from "react";
import client from "../../apollo/client";
import { NavLink } from "react-router-dom";
import { GET_CATEGORIES } from "../../GraphQL/Queries";
import classes from "./Categories.module.scss";

class Categories extends Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }
  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const result = await client.query({ query: GET_CATEGORIES });
    if (result.data) {
      this.setState({ categories: result.data.categories });
    }
  }
  render() {
    let categories;
    if (this.state.categories.length > 0) {
      categories = this.state.categories.map((item) => {
        return (
          <NavLink
            onClick={this.props.closeCart}
            className={({ isActive }) =>
              isActive ? classes["active-link"] : undefined
            }
            key={item.name}
            to={"/products/" + item.name}
          >
            {item.name.toUpperCase()}
          </NavLink>
        );
      });
    }
    return (
      <div className={classes.categories}>
        {categories ? categories : "loading"}
      </div>
    );
  }
}

export default Categories;
