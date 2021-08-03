import React, { Component } from 'react';
import './App.css';
import LookupForm from './LookupForm';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: ['4', '7', '6', '1', '3', '2', '5'],
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

    /**
     * Add the user-selected choice to the currentMerge. Advance the index for the half where that choice came from.
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
      currentMerge = [...currentMerge, ...games.slice(currentLeftIndex, rightIndex)];
    }

    /**
     * If either the left or right half reached its end, then the current merge is complete.
     */
    if (currentLeftIndex >= rightIndex || currentRightIndex >= Math.min(rightIndex + width, length)) {
      /**
       * Overwrite the appropriate section of games with the current merge.
       */
      currentMerge.forEach((game, index) => {
        games[index + leftIndex] = game;
      });

      currentMerge = [];

      /**
       * Move along to the next two halves to merge.
       */
      leftIndex = leftIndex + width * 2;
      rightIndex = rightIndex + width * 2;

      /**
       * If the next halves go beyond the length of the whole games list, then increase the width
       * by a factor of 2, and reset the halves back to the beginning of the games array. Now this
       * lap through the games will be with halves twice as large as before.
       */
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
