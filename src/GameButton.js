import React, { Component } from "react";

class GameButton extends Component {
  render() {
    return (
      <button className="w-1/2 p-4 bg-yellow-600 rounded-md">
        {this.props.game}
      </button>
    );
  }
}

export default GameButton;
