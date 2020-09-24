import React from 'react';
import './Results.css';

// Компонент одного результата
export default class SingleResult extends React.Component {

  render() {
    return(
      <div className="SingleResult" title={this.props.book.title}>
        <div class="TitlesBox">
          <h1 class="TitleName">TITLE: {this.props.book.title}</h1>
          <h1 class="AuthorName">AUTHOR: {this.props.book.author}</h1>
        </div>
        <div class="Buttons">
          <a title="Download this BOOK" class="ButtDownloadFile fas fa-cloud-download-alt" href="#"></a>
          <a title="Open in new TAB" class="ButtOpenNewTab fas fa-external-link-alt" href="#"></a>
        </div>
      </div>
    );
  }
}