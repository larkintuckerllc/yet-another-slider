import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class YetAnotherSlider extends Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleLowMouseMove = this.handleLowMouseMove.bind(this);
    this.handleHighMouseMove = this.handleHighMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleLowTouchMove = this.handleLowTouchMove.bind(this);
    this.handleHighTouchMove = this.handleHighTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.incrementLowValue = this.incrementLowValue.bind(this);
    this.incrementHighValue = this.incrementHighValue.bind(this);
    this.decrementLowValue = this.decrementLowValue.bind(this);
    this.decrementHighValue = this.decrementHighValue.bind(this);
    this.state = {
      mouseDown: false,
      touchDown: false,
      touchIdentifier: null,
      x: null,
    };
  }
  resetThumb() {
    this.setState({
      mouseDown: false,
      touchDown: false,
      touchIdentifier: null,
      x: null,
    });
  }
  handleMouseDown({ screenX }) {
    const { touchDown } = this.state;
    if (touchDown) return;
    this.setState({
      mouseDown: true,
      touchDown: false,
      touchIdentifier: null,
      x: screenX,
    });
  }
  handleMouseUp() {
    const { touchDown } = this.state;
    if (touchDown) return;
    this.resetThumb();
  }
  handleLowMouseMove({ screenX }) {
    const { mouseDown, touchDown, x } = this.state;
    if (touchDown) return;
    if (!mouseDown) return;
    if (screenX > x) {
      this.resetThumb();
      this.incrementLowValue();
    }
    if (screenX < x) {
      this.resetThumb();
      this.decrementLowValue();
    }
  }
  handleHighMouseMove({ screenX }) {
    const { mouseDown, touchDown, x } = this.state;
    if (touchDown) return;
    if (!mouseDown) return;
    if (screenX > x) {
      this.resetThumb();
      this.incrementHighValue();
    }
    if (screenX < x) {
      this.resetThumb();
      this.decrementHighValue();
    }
  }
  handleTouchStart({ touches }) {
    const { mouseDown } = this.state;
    if (mouseDown) return;
    if (touches.length > 1) return;
    const { screenX, identifier } = touches[0];
    this.setState({
      mouseDown: false,
      touchDown: true,
      touchIdentifier: identifier,
      x: screenX,
    });
  }
  handleLowTouchMove({ changedTouches }) {
    const { mouseDown, touchDown, touchIdentifier, x } = this.state;
    if (mouseDown) return;
    if (!touchDown) return;
    for (let i = 0; i < changedTouches.length; i += 1) {
      const { identifier, screenX } = changedTouches[i];
      if (identifier === touchIdentifier) {
        if (screenX > x) {
          this.resetThumb();
          this.incrementLowValue();
        }
        if (screenX < x) {
          this.resetThumb();
          this.decrementLowValue();
        }
      }
    }
  }
  handleHighTouchMove({ changedTouches }) {
    const { mouseDown, touchDown, touchIdentifier, x } = this.state;
    if (mouseDown) return;
    if (!touchDown) return;
    for (let i = 0; i < changedTouches.length; i += 1) {
      const { identifier, screenX } = changedTouches[i];
      if (identifier === touchIdentifier) {
        if (screenX > x) {
          this.resetThumb();
          this.incrementHighValue();
        }
        if (screenX < x) {
          this.resetThumb();
          this.decrementHighValue();
        }
      }
    }
  }
  handleTouchEnd(event) {
    event.preventDefault();
    const {
      mouseDown,
      touchIdentifier,
    } = this.state;
    if (mouseDown) return;
    const { changedTouches } = event;
    for (let i = 0; i < changedTouches.length; i += 1) {
      const { identifier } = changedTouches[i];
      if (identifier === touchIdentifier) {
        this.resetThumb();
      }
    }
  }
  incrementLowValue() {
    const { high, increment, max, onChange, low } = this.props;
    if (low + increment >= high - increment) return;
    onChange({
      high,
      low: Math.min(low + increment, max),
    });
  }
  incrementHighValue() {
    const { high, increment, low, max, onChange } = this.props;
    onChange({
      high: Math.min(high + increment, max),
      low,
    });
  }
  decrementLowValue() {
    const { high, increment, min, onChange, low } = this.props;
    onChange({
      high,
      low: Math.max(low - increment, min),
    });
  }
  decrementHighValue() {
    const { increment, low, min, onChange, high } = this.props;
    if (high - increment <= low + increment) return;
    onChange({
      high: Math.max(high - increment, min),
      low,
    });
  }
  render() {
    const {
      barColor,
      barHeight,
      high,
      leftColor,
      low,
      max,
      min,
      railColor,
      railHeight,
      rangeColor,
      rightColor,
      thumbColor,
      thumbRadius,
      thumbWidth,
    } = this.props;
    const {
      decrementLowValue,
      handleMouseDown,
      handleHighMouseMove,
      handleHighTouchMove,
      handleLowMouseMove,
      handleMouseUp,
      handleTouchEnd,
      handleLowTouchMove,
      handleTouchStart,
      incrementHighValue,
    } = this;
    return (
      <div
        id={styles.root}
        style={{
          paddingLeft: `${thumbWidth / 2}px`,
          paddingRight: `${thumbWidth / 2}px`,
        }}
      >
        <div
          id={styles.rootRail}
          style={{
            height: `${railHeight}px`,
            backgroundColor: railColor,
          }}
        >
          <div
            id={styles.rootRailBar}
            style={{
              height: `${barHeight}px`,
              backgroundColor: barColor,
            }}
          />
          <div
            role="button"
            tabIndex={0}
            id={styles.rootRailLeft}
            style={{
              height: `${railHeight}px`,
              width: `${(((low - min) / (max - min)) * 100)}%`,
              backgroundColor: leftColor,
            }}
            onClick={decrementLowValue}
          />
          <div
            id={styles.rootRailRange}
            style={{
              left: `${(((low - min) / (max - min)) * 100)}%`,
              right: `${(((max - high) / (max - min)) * 100)}%`,
              height: `${railHeight}px`,
              backgroundColor: rangeColor,
            }}
          />
          <div
            role="button"
            tabIndex={0}
            id={styles.rootRailRight}
            style={{
              height: `${railHeight}px`,
              width: `${(((max - high) / (max - min)) * 100)}%`,
              backgroundColor: rightColor,
            }}
            onClick={incrementHighValue}
          />
          <div
            role="button"
            tabIndex={0}
            className={styles.rootRailThumb}
            style={{
              left: `${(((low - min) / (max - min)) * 100)}%`,
              borderRadius: `${thumbRadius}%`,
              width: `${thumbWidth}px`,
              height: `${railHeight}px`,
              backgroundColor: thumbColor,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseUp}
            onMouseMove={handleLowMouseMove}
            onTouchCancel={handleTouchEnd}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleLowTouchMove}
            onTouchStart={handleTouchStart}
          />
          <div
            role="button"
            tabIndex={0}
            className={styles.rootRailThumb}
            style={{
              left: `${(((high - min) / (max - min)) * 100)}%`,
              borderRadius: `${thumbRadius}%`,
              width: `${thumbWidth}px`,
              height: `${railHeight}px`,
              backgroundColor: thumbColor,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseUp}
            onMouseMove={handleHighMouseMove}
            onTouchCancel={handleTouchEnd}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleHighTouchMove}
            onTouchStart={handleTouchStart}
          />
        </div>
      </div>
    );
  }
}
YetAnotherSlider.propTypes = {
  barHeight: PropTypes.number,
  barColor: PropTypes.string,
  increment: PropTypes.number,
  high: PropTypes.number,
  leftColor: PropTypes.string,
  low: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  railHeight: PropTypes.number,
  railColor: PropTypes.string,
  rangeColor: PropTypes.string,
  rightColor: PropTypes.string,
  thumbColor: PropTypes.string,
  thumbRadius: PropTypes.number,
  thumbWidth: PropTypes.number,
};
YetAnotherSlider.defaultProps = {
  barHeight: 10,
  barColor: 'blue',
  increment: 1,
  high: 7,
  leftColor: 'rgba(0,0,0,0.3)',
  low: 3,
  max: 10,
  min: 0,
  onChange: () => {},
  railHeight: 40,
  railColor: 'red',
  rangeColor: 'rgba(0,255,0,0.5)',
  rightColor: 'rgba(0,0,0,0.7)',
  thumbColor: 'rgba(0,255,0,0.5)',
  thumbRadius: 30,
  thumbWidth: 30,
};
export default YetAnotherSlider;
