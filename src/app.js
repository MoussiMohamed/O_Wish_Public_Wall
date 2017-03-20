import React from 'react';
import ReactDOM from 'react-dom';
import WishBox from './components/wish-box';

// Render when document is ready
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <WishBox />,
    document.getElementById('wish-box')
  );
});
