import React from 'react';

export class Button extends React.Component {
  render() {
    return <button>Hello, {this.props.name}</button>;
  }
}
