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

  handleTouchStart = (e) => {
    this.setState({
      touchPosition: e.touches[0].clientX,
    });
  };

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

  handleMouseDown = (e) => {
    e.persist();
    this.setState({
      mousePosition: e.clientX,
    });
  };

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

  next = () => {
    if (this.state.currentIndex < this.state.length - 1) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
      }));
    }
  };

  prev = () => {
    if (this.state.currentIndex > 0) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex - 1,
      }));
    }
  };

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
