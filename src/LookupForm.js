import React, { Component } from "react";
import { shuffle } from './helpers.js'

class LookupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      disabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.tryFetch = this.tryFetch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    });
  }

 /**
   * Try to fetch the board game collection of the given BGG username. With a 200 response, convert
   * XML to JSON, shuffle up the games, update the state, and finally clear the interval. On anything
   * but 200, log the response only; the interval will continue to call tryFetch.
   */
  tryFetch() {
    const gamesPromise = fetch(`http://www.boardgamegeek.com/xmlapi2/collection?username=${this.state.username}&played=1&excludesubtype=boardgameexpansion&brief=1`);
    gamesPromise
      .then(response => {
        if (response.status === 200) {
          clearInterval(this.fetchInterval);
          return response.text();
        } else {
          throw new Error(response.status);
        }
      })
      .then(text => {
        const responseDocument = new DOMParser().parseFromString(text, 'application/xml');

        /**
         * Use spread operator to turn NodeList into Array. Then map over the nodes to pull out the game names only.
         */
        let games = [...responseDocument.getElementsByTagName('name')].map(game => game.textContent);

        this.setState({
          inputDisabled: false
        });

        games = shuffle(games);

        this.props.setGames(games);
      })
      .catch(status => {
        console.log(`Response status: ${status}`);
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      disabled: true
    });

    this.fetchInterval = setInterval(this.tryFetch, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
    console.log("Interval cleared.");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="username">BoardGameGeek username</label>
        <input
          type="text"
          id="username"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChange}
          className="p-4 border border-gray-500 rounded-md"
        />
        <button
          type="submit"
          disabled={this.state.disabled}
          className="p-4 bg-yellow-300 rounded-md">
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}

export default LookupForm;
