import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
  render() {
    return(
      <div className="SearchBar">
        <div className="search-container">
          <input id="searchInput" className="search-input text-color-black" type="text" placeholder="Enter the book title..." />
        </div>
      </div>
    )
  }
}