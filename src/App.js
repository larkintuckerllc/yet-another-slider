import React, { Component } from 'react';
import logo from './logo.svg';
import YetAnotherSlider from './YetAnotherSlider';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      high: 800,
      low: 300,
    }
  }
  handleChange({ high, low }) {
    this.setState({
      high,
      low,
    });
  }
  render() {
    const { high, low } = this.state;
    const { handleChange } = this;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <YetAnotherSlider
            barHeight={10}
            barColor="blue"
            increment={100}
            leftColor="rgba(0,0,0,0.3)"
            high={high}
            low={low}
            max={1100}
            min={100}
            onChange={handleChange}
            railHeight={40}
            railColor="red"
            rangeColor="rgba(0,255,0,0.5)"
            rightColor="rgba(0,0,0,0.7)"
            thumbColor="rgba(0,255,0,0.5)"
            thumbRadius={30}
            thumbWidth={30}
          />
        </p>
      </div>
    );
  }
}

export default App;
