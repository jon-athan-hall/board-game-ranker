import React, { Component } from "react";

class LookupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'username'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
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
