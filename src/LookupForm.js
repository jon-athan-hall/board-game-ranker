import React, { Component } from "react";

class LookupForm extends Component {
  render() {
    return (
      <form className="flex flex-col p-8 space-y-4">
        <label for="username">BoardGameGeek username</label>
        <input type="text" className="p-4 border border-gray-500 rounded-md">
        </input>
        <button type="submit" className="p-4 bg-yellow-300 rounded-md">
          Get my played games
        </button>
      </form>
    );
  }
}

export default LookupForm;
