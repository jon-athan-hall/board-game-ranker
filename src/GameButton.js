import React, { Component } from "react";

class GameButton extends Component {
  render() {
    return (
      <button className="p-4 bg-yellow-300 rounded-md">
        {this.props.game}
      </button>
    );
  }
}

export default GameButton;
