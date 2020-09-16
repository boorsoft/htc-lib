import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
  render() {
    return(
      <div className="SearchBar">
        <div className="search-container">
          <input id="searchInput" className="search-input text-color-black" type="text" placeholder="Enter the book title..." />
          <button className="submit-button"><i className="fas fa-arrow-circle-right submit-icon" id="submitIcon"></i></button>
        </div>
      </div>
    )
  }
}