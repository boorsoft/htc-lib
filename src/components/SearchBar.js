import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: 'book',
      books: []
    }

  }
  
  // On select change
  onChange = () => {
    const select = document.querySelector('#filter');
    const input = document.querySelector('#searchInput');

    if (select.value === 'teacher') {
      input.placeholder = 'Enter the teacher name...';
    } else if (select.value === 'book') {
      input.placeholder = 'Enter the book title...';
    } else if (select.value === 'subject') {
      input.placeholder = 'Enter the subject name...';
    }

    this.setState({query: select.value});
  }

  onInputChange = () => {
    const input = document.querySelector('#searchInput');

    if (input.value !== '') {
      fetch(`https://htc-online-library-express.boorsoft.repl.co/api/books?${this.state.query}=${input.value.trim()}`)
      .then(res => res.json())
      .then(books => {
        this.setState({books: books});
        // console.log('Books', books);
        this.props.passBooks(books);  // Вызываем метод, который обновляет книги в компоненте App через props
      });
    } else {
      this.setState({books: []});
    }
  }

  render() {
    return(
      <div className="SearchBar">
        <div className="search-container">
          <input id="searchInput" className="search-input text-color-black" type="text" placeholder="Enter the book title..." onChange={this.onInputChange} />
          <div className="select-wrapper">
              <select name="filter" id="filter" onChange={this.onChange} defaultValue="book">
                <option value="book">Book</option>
                <option value="teacher">Teacher</option>
                <option value="subject">Subject</option>
              </select>
          </div>
        </div>
      </div>
    )
  }
}
