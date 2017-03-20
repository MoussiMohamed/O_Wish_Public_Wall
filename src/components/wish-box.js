import React from 'react';
import jQuery from 'jquery';

import WishForm from './wish-form';
import Wish from './wish';

import {API_CONFIG_URLs} from '../config/API_Urls';

export default class WishBox extends React.Component {

  constructor() {
    super();

    this.state = {
      wishesList: []
    };
  }

  componentWillMount() {
    this._fetchWishes();
  }

  render() {
    const wishesList = this._getWishes();
    return (
      <div className="row wishes-container">
        <div className="cell">
          <h2>Wish list management</h2>
          <div className="wish-box">
            <WishForm addWish={this._addWish.bind(this)}/>

            <h3 className="wish-count">{this._getWishesTitle(wishesList.length)}</h3>
            <div className="wish-list">
              {wishesList}
            </div>
          </div>
        </div>
      </div>
    );
  }

  _getWishes() {
    console.log(this.state.wishesList);
    return this.state.wishesList.map((wish) => {
      return <Wish
        {...wish}
        key={wish.wish_id}/>
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

  _addWish(wish) {

    if (!wish) {
      return;
    }

    jQuery.ajax({
      method: 'POST',
      url: this._getURL(API_CONFIG_URLs.new_wish),
      data: {wish: wish},
      success: (wishResult) => {

        const wishAdded = {
          wish_id: wishResult.wish.insertId,
          wish: wish
        };

        this.setState({
          wishesList: this.state.wishesList.concat([wishAdded])
        });
      }
    });
  }

  _getURL(serviceName) {
    return API_CONFIG_URLs.apiPathBase + serviceName;
  }

  _fetchWishes() {
    jQuery.ajax({
      method: 'GET',
      url: this._getURL(API_CONFIG_URLs.wishesList),
      success: (wishes) => {
        var wishesList = wishes.wishes;
        this.setState({wishesList});
      }
    });
  }
}
