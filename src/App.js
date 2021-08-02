import React, { Component } from 'react';
import './App.css';
import LookupForm from './LookupForm';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: ["4", "7", "6", "1", "3", "2", "5"],
      finished: false,
      width: 1,
      leftIndex: 0,
      rightIndex: 1
    }

    this.setGames = this.setGames.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  setGames(games) {
    this.setState({
      games
    });
  }

  handleButtonClick(e) {
    let finished = this.state.finished;
    let width = this.state.width;
    let [leftIndex, rightIndex] = [this.state.leftIndex, this.state.rightIndex];
    const length = this.state.games.length;

    leftIndex = leftIndex + width * 2;
    rightIndex = rightIndex + width * 2;

    if (rightIndex >= length) {
      width = width * 2;
      leftIndex = 0;
      rightIndex = Math.min(leftIndex + width, length);
    }

    if (width >= length) {
      finished = true;
    }

    this.setState({
      finished,
      width,
      leftIndex,
      rightIndex
    });
  }

  render() {
    return (
      <div className="w-full h-screen p-4 lg:p-16 flex flex-col space-y-16">
        <h1 className="text-3xl font-extrabold text-center">Board Game Ranker</h1>
        <LookupForm
          setGames={this.setGames}
          buttonText="Get my played games"
        />
        {!this.state.finished &&
          <div>
            <h2 className="text-xl font-bold text-center mb-8">Which one is better?</h2>
            <p>games: {this.state.games}</p>
            <div className="flex space-x-8">
              <button
                className="w-1/2 p-4 bg-yellow-600 rounded-md"
                value="left"
                onClick={this.handleButtonClick}
              >
                {this.state.games[this.state.leftIndex]}
              </button>
              <button
                className="w-1/2 p-4 bg-yellow-600 rounded-md"
                value="right"
                onClick={this.handleButtonClick}
              >
                {this.state.games[this.state.rightIndex]}
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
