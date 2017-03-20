import React from 'react';

export default class Wish extends React.Component {
  constructor() {
    super();

  }

  render() {

    return (
      <div className="wish">

        <p className="wish-header">{this.props.wish}</p>

      </div>
    );
  }
}
