import React from 'react';

export default class WishForm extends React.Component {
  constructor() {
    super();

    this.state = {characters: 0}
  }

  render() {
    return (
      <form className="wish-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>New wish</label>
        <div className="wish-form-fields">
          <input name="wish" placeholder="Wish:" ref={c => this._wishName = c}/>
        </div>
        <div className="wish-form-actions">
          <button type="submit">
            Add wish
          </button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    this.props.addWish(this._wishName.value);

    this._wishName.value = '';

    this.setState({characters: 0});
  }
}
