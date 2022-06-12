import React, { Component } from "react";
import client from "../../apollo/client";
import { GET_CURRENCIES } from "../../GraphQL/Queries";
import { connect } from "react-redux";
import { changeCurrency } from "../../store/currencySlice";
import classes from "./Currency.module.scss"

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = { currencies: [], selectedValue: undefined };
    this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
  }
  componentDidMount() {
    this.fetchCurrencies();
  }
  currencyChangeHandler(event) {
    this.props.dispatch(changeCurrency(event.target.selectedIndex));
    console.log(this.props.cure);
  }

  async fetchCurrencies() {
    const result = await client.query({ query: GET_CURRENCIES });
    if (result.data) {
      this.setState({ currencies: result.data.currencies });
    }
  }
  render() {
    if (this.state.currencies.length > 0) {
      let currencies = this.state.currencies.map((item) => (
        <option key={item.label} value={item.label}>
          {item.symbol} {item.label}
        </option>
      ));
      return (
        <select className={classes.select}
          value={this.state.currencies[this.props.currency].label}
          onChange={this.currencyChangeHandler}
        >
          {currencies}
        </select>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.selectedCurrency,
});

export default connect(mapStateToProps)(Currency);
