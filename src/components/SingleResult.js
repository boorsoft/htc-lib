import React from 'react';
import './Results.css';

// Компонент одного результата
export default class SingleResult extends React.Component {

  render() {
    return(
      <div className="SingleResult" title={this.props.book.title}>
        <div className="TitlesBox">
          <h1 className="TitleName">{this.props.book.title}</h1>
          <h1 className="AuthorName">{this.props.book.author}</h1>
        </div>
        <div className="Buttons">
          <a title="Download the book" className="ButtDownloadFile fas fa-cloud-download-alt" href={this.props.book.filename + '?export=download'}></a>
          <a title="Open in new TAB" className="ButtOpenNewTab fas fa-external-link-square-alt" href={this.props.book.filename} target="_blank"></a>
        </div>
      </div>
    );
  }
}