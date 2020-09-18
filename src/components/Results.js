import React from 'react';
import SingleResult from './SingleResult';
import './Results.css';

// Компонент для вывода результатов поиска (книг)
export default class Results extends React.Component {

  render() {
    return(
      <div className="Results">
        {/* Проходимся по каждому элементу, и рендерим новый компонет, сколько книг - столько компонентов SingleResult */}
        {this.props.books.map((book) => 
          <SingleResult key={book.book_id} book={book}></SingleResult>
        )}
      </div>
    );
  }
}