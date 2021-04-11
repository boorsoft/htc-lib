import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import AdminPanel from './components/AdminPanel'
import { BrowserRouter as Router, Route } from 'react-router-dom'


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
      <Router>

        <Route path="/" exact render={() =>
          <div className="App">
            <SearchBar passBooks={this.passBooks}/> {/* Передаем метод pasBooks через props(атрибуты) */}
            <Results books={this.state.books}/>
          </div>
        }/>

        <Route path="/admin" component={AdminPanel} />

      </Router>
    )
  }
}

export default App;
