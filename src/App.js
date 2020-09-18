import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Results from './components/Results';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    }
  }

  // Получаем книги в этом компоненте с помощью этого метода
  passBooks = (books) => {
    this.setState({books: books});
    console.log(this.state.books);
  }  

  render() {
    return(
      <div className="App">
        <SearchBar passBooks={this.passBooks}/> {/* Передаем метод pasBooks через props(атрибуты) */}
        <Results books={this.state.books}/>
      </div>
    )
  }
}

export default App;
