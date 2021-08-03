import React, { Component } from 'react';
import './App.css';
import LookupForm from './LookupForm';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: ['4', '7', '6', '1', '3', '2', '5', '8'],
      finished: false,
      width: 1,
      leftIndex: 0,
      rightIndex: 1,
      currentLeftIndex: 0,
      currentRightIndex: 1,
      currentMerge: []
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
    let games = this.state.games;
    let finished = this.state.finished;
    let width = this.state.width;
    let [leftIndex, rightIndex] = [this.state.leftIndex, this.state.rightIndex];
    let [currentLeftIndex, currentRightIndex] = [this.state.currentLeftIndex, this.state.currentRightIndex];
    let currentMerge = this.state.currentMerge;
    const length = this.state.games.length;

    console.log(games);
    console.log(finished);
    console.log(width);
    console.log(leftIndex);
    console.log(rightIndex);
    console.log(currentLeftIndex);
    console.log(currentRightIndex);
    console.log(currentMerge);

    /**
     * Add the user-selected choice to the currentMerge. Advance the index for the half where that choice is.
     */
    if (e.target.value === 'left') {
      currentMerge.push(games[currentLeftIndex]);
      currentLeftIndex = currentLeftIndex + 1;
    } else {
      currentMerge.push(games[currentRightIndex]);
      currentRightIndex = currentRightIndex + 1;
    }

    /**
     * If the left half has reached its end, concatenate the rest of the right half to currentMerge.
     * Or if the right half has reached its end, concatenate the rest of the left half instead.
     */
    if (currentLeftIndex >= rightIndex) {
      currentMerge = [...currentMerge, ...games.slice(currentRightIndex, Math.min(rightIndex + width, length))];
    } else if (currentRightIndex >= Math.min(rightIndex + width, length)) {
      console.log('slice: ', games.slice(currentLeftIndex, rightIndex));
      currentMerge = [...currentMerge, ...games.slice(currentLeftIndex, rightIndex)];
    }

    console.log('after if/else: ', currentMerge);

    /**
     * If either the left or right half reached its end, then the current merge is complete.
     */
    if (currentLeftIndex >= rightIndex || currentRightIndex >= Math.min(rightIndex + width, length)) {
      console.log('merge done: ', currentMerge);
      currentMerge = [];

      leftIndex = leftIndex + width * 2;
      rightIndex = rightIndex + width * 2;

      if (rightIndex >= length) {
        width = width * 2;
        leftIndex = 0;
        rightIndex = Math.min(leftIndex + width, length);
      }

      [currentLeftIndex, currentRightIndex] = [leftIndex, rightIndex];

      if (width >= length) {
        finished = true;
      }
    }

    console.log(games);
    console.log(finished);
    console.log(width);
    console.log(leftIndex);
    console.log(rightIndex);
    console.log(currentLeftIndex);
    console.log(currentRightIndex);
    console.log(currentMerge);

    this.setState({
      finished,
      width,
      leftIndex,
      rightIndex,
      currentLeftIndex,
      currentRightIndex,
      currentMerge
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
            <p>width: {this.state.width}</p>
            <p>currentMerge: {this.state.currentMerge}</p>
            <div className="flex space-x-8">
              <button
                className="w-1/2 p-4 bg-yellow-600 rounded-md"
                value="left"
                onClick={this.handleButtonClick}
              >
                {this.state.games[this.state.currentLeftIndex]}
              </button>
              <button
                className="w-1/2 p-4 bg-yellow-600 rounded-md"
                value="right"
                onClick={this.handleButtonClick}
              >
                {this.state.games[this.state.currentRightIndex]}
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
