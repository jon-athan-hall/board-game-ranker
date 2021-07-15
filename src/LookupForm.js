import React, { Component } from "react";

class LookupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'username',
      games: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const gamesPromise = fetch(`http://www.boardgamegeek.com/xmlapi2/collection?username=${this.state.username}&played=1&excludesubtype=boardgameexpansion&brief=1`);
    gamesPromise
        .then(response => {
          if (response.status === 200)
            return response.text();
          else
            console.log(response.status);
        })
        .then(text => {
          console.log(text);
          const responseDocument = new DOMParser().parseFromString(text, 'application/xml');

          /**
           * Use spread operator to turn NodeList into Array. Then map over the nodes to pull out the game name only.
           */
          const games = [...responseDocument.getElementsByTagName('name')].map(game => game.textContent);

          console.log(games);
          this.setState({
            games
          });
        });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex flex-col p-8 space-y-4">
        <label htmlFor="username">BoardGameGeek username</label>
        <input
          type="text"
          id="username"
          value={this.state.username}
          onChange={this.handleChange}
          className="p-4 border border-gray-500 rounded-md"
        />
        <button type="submit" className="p-4 bg-yellow-300 rounded-md">
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}

export default LookupForm;
