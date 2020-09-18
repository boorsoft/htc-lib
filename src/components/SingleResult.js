import React from 'react';
import './Results.css';

// Компонент одного результата
export default class SingleResult extends React.Component {

  render() {
    return(
      <div className="SingleResult">
        TITLE: {this.props.book.title} {/* Таким образом получаем название книги */}
        <br /> {/* Кстати, в реакте нет непарных элементов, все нужно закрывать */}
        AUTHOR: {this.props.book.author} {/* Можно вывести автора */}
      </div>
    );
  }
}