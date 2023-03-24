import React from 'react';
import styles from './style.less';
import { h, render, Component } from 'preact';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      length: props.children.length,
      touchPosition: null,
      mousePosition: null,
    };
  }
// Function to handle the start of a touch event
  handleTouchStart = (e) => {
    this.setState({
      touchPosition: e.touches[0].clientX,
    });
  };
// Function to handle a touch event where the user moves their finger across the screen
  handleTouchMove = (e) => {
    const touchDown = this.state.touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      this.next();
    }

    if (diff < -5) {
      this.prev();
    }

    this.setState({
      touchPosition: null,
    });
  };
// Function to handle the press of a mouse button
  handleMouseDown = (e) => {
    e.persist();
    this.setState({
      mousePosition: e.clientX,
    });
  };
// Function to handle the movement of the mouse
  handleMouseMove = (e) => {
    e.persist();
    const mouseDown = this.state.mousePosition;

    if (mouseDown === null) {
      return;
    }

    const currentMouse = e.clientX;
    const diff = mouseDown - currentMouse;

    if (diff > 5) {
      this.next();
    }

    if (diff < -5) {
      this.prev();
    }

    this.setState({
      mousePosition: null,
    });
  };
// Function to move to the next slide
  next = () => {
    if (this.state.currentIndex < this.state.length - 1) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
      }));
    }
  };
// Function to move to the previous slide
  prev = () => {
    if (this.state.currentIndex > 0) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex - 1,
      }));
    }
  };
//Renders the carousel
  render() {
    const { children } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className={styles.carousel_container}>
        <div
          className={styles.carousel_wrapper}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseMove}
        >
          <div
            className={styles.carousel_content}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
