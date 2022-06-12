import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const portalElement = document.getElementById("overlays");

class Modal extends Component {
  render() {
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop onClose={this.props.onClose} />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay>{this.props.children}</ModalOverlay>,
          portalElement
        )}
      </Fragment>
    );
  }
}

export default Modal;
