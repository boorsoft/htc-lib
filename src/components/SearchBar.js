import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
  render() {
    return(
      <div className="SearchBar">
        <div className="search-container">
          <input class="search-input" type="text" />
        </div>
      </div>
    )
  }
}
