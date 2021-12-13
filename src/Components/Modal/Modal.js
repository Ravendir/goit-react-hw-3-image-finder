import React, { Component } from "react";

import styles from "./Modal.module.css";
import PropTypes from "prop-types";

class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener("keydown", this.props.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.props.closeModal);
  }

  render() {
    return (
      <div onClick={this.props.closeModal} className={styles.Overlay}>
        <div className={styles.Modal}>
          <img src={this.props.modalImage} alt="pic" />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  modalImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
