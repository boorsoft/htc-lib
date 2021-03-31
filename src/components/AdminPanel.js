import React from 'react'
import '../App.css'
import './AdminPanel.css'
import Login from './Login'
import { apiURL } from '../utils'

class AdminPanel extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        books: [],
        redirect: false
      }
    }

    componentDidMount() {
      // Загрузить книги после загрузки страницы
      fetch(`${apiURL}/api/books`)
        .then((res) => res.json())
        .then((books) => {
          this.setState({books: books})
        })

     
    }

    getToken = () => {
        const tokenString = localStorage.getItem('token')
        return tokenString
    }

    logout = () => {
      localStorage.clear()
      this.setState({redirect: false})
    }

    render() {
        const token = this.getToken()

        if (!token) {
            return <Login token={token} />
        }

        if (this.state.redirect) return <Login />

        return (
            <div className="App">
              <div className="dashboard-container flex-column">
                <div className="header-container flex-row">
                  <h1 className="header-text">Dashboard</h1>
                    <i className="fa fa-power-off icon" id="logoutButton" onClick={this.logout} />
                </div>

                <div className="container books-list flex-column">
                  {this.state.books.map((book) =>
                    <div className="book-element flex-row">
                      <p className="title-text">{book.title}</p>
                      <p className="title-text">{book.author}</p>
                      <p className="title-text">{book.subject}</p>
                      <p className="title-text">{book.teacher}</p>
                      <p className="title-text">{book.filename}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
        )
    }
}

export default AdminPanel