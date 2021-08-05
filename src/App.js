import React, { Component } from 'react';
import './App.css';
import LookupForm from './LookupForm';
import GameList from './GameList';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      finished: false,
      width: 1,
      leftStartIndex: 0,
      rightStartIndex: 1,
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
    let [leftStartIndex, rightStartIndex] = [this.state.leftStartIndex, this.state.rightStartIndex];
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
    if (currentLeftIndex >= rightStartIndex) {
      currentMerge = [...currentMerge, ...games.slice(currentRightIndex, Math.min(rightStartIndex + width, length))];
    } else if (currentRightIndex >= Math.min(rightStartIndex + width, length)) {
      currentMerge = [...currentMerge, ...games.slice(currentLeftIndex, rightStartIndex)];
    }

    /**
     * If either the left or right half reached its end, then the current merge is complete.
     */
    if (currentLeftIndex >= rightStartIndex || currentRightIndex >= Math.min(rightStartIndex + width, length)) {
      /**
       * Overwrite the appropriate section of games with the current merge.
       */
      currentMerge.forEach((game, index) => {
        games[index + leftStartIndex] = game;
      });

      currentMerge = [];

      /**
       * Move along to the next two halves to merge.
       */
      leftStartIndex = leftStartIndex + width * 2;
      rightStartIndex = rightStartIndex + width * 2;

      /**
       * If the next halves go beyond the length of the whole games list, then increase the width
       * by a factor of 2, and reset the halves back to the beginning of the games array. Now this
       * lap through the games will be with halves twice as large as before.
       */
      if (rightStartIndex >= length) {
        width = width * 2;
        leftStartIndex = 0;
        rightStartIndex = Math.min(leftStartIndex + width, length);
      }

      [currentLeftIndex, currentRightIndex] = [leftStartIndex, rightStartIndex];

      if (width >= length) {
        finished = true;
      }
    }

    this.setState({
      finished,
      width,
      leftStartIndex,
      rightStartIndex,
      currentLeftIndex,
      currentRightIndex,
      currentMerge
    });
  }

  render() {
    const showButtons = !this.state.finished && (this.state.games.length > 0);
    return (
      <div className="w-full h-screen p-4 lg:p-16 flex flex-col space-y-16">
        <h1 className="text-3xl font-extrabold text-center">Board Game Ranker</h1>
        <LookupForm
          setGames={this.setGames}
          buttonText="Get my played games"
        />
        {showButtons &&
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
        <GameList games={this.state.games} />
      </div>
    );
  }
}

export default App;
