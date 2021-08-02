import React, { Component } from 'react';
import './App.css';
import LookupForm from './LookupForm';
import GameButton from './GameButton';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: []
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
      <div className="w-full h-screen p-2 lg:p-16">
        <LookupForm
          setGames={this.setGames}
          buttonText="Get my played games"
        />
        {this.state.games.length > 2 &&
          <>
            <GameButton game={this.state.games[0]} />
            <GameButton game={this.state.games[1]} />
          </>
        }
      </div>
    );
  }
}

export default App;
