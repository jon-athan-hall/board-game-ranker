import React, { Component } from 'react';
import './App.css';
import LookupForm from './LookupForm';
import GameButton from './GameButton';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: ["7 Wonders", "A Feast for Odin", "Wingspan", "The Castles of Burgundy", "Race for the Galaxy", "Empires of the North", "Clank!: A Deck-Building Adventure"]
    }

    this.setGames = this.setGames.bind(this);
  }

  setGames(games) {
    this.setState({
      games
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
        {this.state.games.length > 2 &&
          <div>
            <h2 className="text-xl font-bold text-center mb-8">Which one is better?</h2>
            <div className="flex space-x-8">
              <GameButton game={this.state.games[0]} />
              <GameButton game={this.state.games[1]} />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
