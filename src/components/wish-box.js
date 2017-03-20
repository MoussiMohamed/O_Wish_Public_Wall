import React from 'react';
import jQuery from 'jquery';

import WishForm from './wish-form';
import Wish from './wish';

export default class WishBox extends React.Component {

  constructor() {
    super();

    this.state = {
      wishes: []
    };
  }

  componentWillMount() {
    this._fetchWishes();
  }

  render() {
    const wishes = this._getWishes();
    return(
      <div className="row wishes-container">
        <div className="cell">
          <h2>Wish list management</h2>
          <div className="wish-box">
            <WishForm addWish={this._addWish.bind(this)} />

            <h3 className="wish-count">{this._getWishesTitle(wishes.length)}</h3>
            <div className="wish-list">
              {wishes}
            </div>
          </div>
        </div>
      </div>
    );
  }

  _getWishes() {
    return this.state.wishes.map((wish) => {
      return <Wish
               {...wish}
               key={wish.id} />
    });
  }

  _getWishesTitle(wishCount) {
    if (wishCount === 0) {
      return 'No wishes yet';
    } else if (wishCount === 1) {
      return '1 wish';
    } else {
      return `${wishCount} wishes`;
    }
  }

  _addWish(wishName) {

    if(!wishName) {
      return;
    }

    const wish = {
      id: this.state.wishes.length + 1,
      wishName: wishName
    };

    this.setState({
      wishes: this.state.wishes.concat([wish])
    });

  }

  _fetchWishes() {
    jQuery.ajax({
      method: 'GET',
      url: 'wishes.json',
      success: (wishes) => {
        this.setState({ wishes })
      }
    });
  }
}
