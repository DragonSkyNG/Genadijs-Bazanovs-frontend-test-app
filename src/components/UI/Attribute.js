import React, { Component } from "react";
import classes from "./Attribute.module.scss";

class Attribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttribute: this.props.selectedAttribute
        ? this.props.selectedAttribute
        : this.props.attribute.items[0].id,
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    this.setState(() => {
      return { selectedAttribute: event.target.value };
    });
    if (this.props.setAttribute) {
      this.props.setAttribute(this.props.attribute.name, event.target.value);
    }
  }

  render() {
    return (
      <div className={classes.attribute}>
        <p>{this.props.attribute.name.toUpperCase() + ":"}</p>
        <fieldset>
          {this.props.attribute.items.map((item) => {
            return (
              <span key={item.name + item.id}>
                <input
                  type="radio"
                  value={item.id}
                  id={
                    this.props.attribute.name +
                    item.id +
                    this.props.productId +
                    (this.props.additionalKey ? this.props.additionalKey : "")
                  }
                  name={
                    this.props.productId +
                    this.props.attribute.id +
                    (this.props.additionalKey ? this.props.additionalKey : "")
                  }
                  defaultChecked={item.id === this.state.selectedAttribute}
                  onChange={this.onValueChange}
                />
                {this.props.attribute.type !== "swatch" ? (
                  <label
                    htmlFor={
                      this.props.attribute.name +
                      item.id +
                      this.props.productId +
                      (this.props.additionalKey ? this.props.additionalKey : "")
                    }
                  >
                    <span>{item.value}</span>
                  </label>
                ) : (
                  <label
                    htmlFor={
                      this.props.attribute.name +
                      item.id +
                      this.props.productId +
                      (this.props.additionalKey ? this.props.additionalKey : "")
                    }
                  >
                    <span style={{ backgroundColor: item.value }} />
                  </label>
                )}
              </span>
            );
          })}
        </fieldset>
      </div>
    );
  }
}

export default Attribute;
