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
        redirect: false,
        token: '',
        formOpen: false,
        updateForm: false,
        bookToUpdateID: null,
        bookToAdd: {
          title: '',
          author: '',
          teacher: '',
          subject: '',
          filename: ''
        }
      }
    }

    // метод выполняется после загрузки страницы
    componentDidMount() {

      // Загрузить книги после загрузки страницы
      fetch(`${apiURL}/api/books`)
        .then((res) => res.json())
        .then((books) => {
          this.setState({books: books})
        })
      
      const tokenKey = this.getToken()

      this.setState({token: tokenKey}) // назначить токен из localStorage браузера
      console.log('State', this.state)
    }

    getToken = () => {
        const tokenString = localStorage.getItem('token')
        return tokenString
    }

    logout = () => {
      localStorage.clear()
      this.setState({redirect: false})
    }

    // Обновлять объект книги для добавления при изменении input
    onInputChange = () => {
      const title = document.querySelector('#title')
      const author = document.querySelector('#author')
      const teacher = document.querySelector('#teacher')
      const subject = document.querySelector('#subject')
      const filename = document.querySelector('#filename')

      this.setState({
        bookToAdd: {
          title: title.value,
          author: author.value,
          teacher: teacher.value,
          subject: subject.value,
          filename: filename.value,
        }
      })

    }
    
    // Отправить запрос на добавление новой книги
    submitBook = (e) => {
      e.preventDefault()
      
      fetch(`${apiURL}/api/books`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: this.state.bookToAdd.title,
          author: this.state.bookToAdd.author,
          teacher: this.state.bookToAdd.teacher,
          subject: this.state.bookToAdd.subject,
          filename: this.state.bookToAdd.filename,
          token: this.state.token,
        })
      }).then((res) => {
        return res.status
      }).then((data) => console.log(data))
        .catch((err) => console.error(err))

      this.setState({formOpen: false, bookToAdd: {
            title: '',
            author: '',
            teacher: '',
            subject: '',
            filename: ''
          }
        })
    }

    updateBook = (id) => {
      fetch(`${apiURL}/api/books/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: this.state.bookToAdd.title,
          author: this.state.bookToAdd.author,
          teacher: this.state.bookToAdd.teacher,
          subject: this.state.bookToAdd.subject,
          filename: this.state.bookToAdd.filename,
          token: this.state.token
        })
      }).then((res) => {
        return res.status
      }).then((data) => console.log(data))
        .catch((err) => console.error(err))
    }

    deleteBook = (id) => {

      fetch(`${apiURL}/api/books/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: this.state.token
      })
      }).then((res) => {
        return res.status
      }).then((data) => console.log(data))
          .catch((err) => console.error(err))
      
    }

    openForm = (update = false, book = {}) => {
      this.setState({formOpen: true, updateForm: false})

      const title = document.querySelector('#title')
      const author = document.querySelector('#author')
      const teacher = document.querySelector('#teacher')
      const subject = document.querySelector('#subject')
      const filename = document.querySelector('#filename')

      title.value = ''
      author.value = ''
      teacher.value = ''
      subject.value = ''
      filename.value = ''

      // Если заполняем форму для обновления
      if (update) {
        title.value = book.title
        author.value = book.author
        teacher.value = book.teacher
        subject.value = book.subject
        filename.value = book.filename
        this.setState({updateForm: true, bookToUpdateID: book.book_id, bookToAdd: {
          title: title.value,
          author: author.value,
          teacher: teacher.value,
          subject: subject.value,
          filename: filename.value
        }})
      }
    }

    closeForm = () => {
      this.setState({formOpen: false})
    }

    render() {
        const token = this.getToken()
        var formOpen = this.state.formOpen
    
        if (!token) {
            return <Login token={token} />
        }

        if (this.state.redirect) return <Login />

        return (
            <div className="App">
            <div id="closer" onClick={this.closeForm} style={{display: formOpen ? 'block' : 'none'}}></div>

              <div className="dashboard-container flex-column">
                <div className="header-container flex-row">
                  <h1 className="header-text">Dashboard</h1>
                    <i className="fas fa-plus icon" id="addBooks" onClick={() => this.openForm()} />
                    <i className="fa fa-power-off icon" id="logoutButton" onClick={this.logout} />
                </div>

                <div className="container books-list flex-column">
                  <div className="books-list-header flex-row">
                    <p className="booklist-header-text">Title</p>
                    <p className="booklist-header-text">Author</p>
                    <p className="booklist-header-text">Subject</p>
                    <p className="booklist-header-text">Teacher</p>
                    <p className="booklist-header-text">Filename</p>
                  </div>
                  {this.state.books.map((book) =>
                    <div className="book-element flex-row" key={book.book_id} book={book} onClick={() => this.openForm(true, book)}>
                      <p className="title-text">{book.title}</p>
                      <p className="title-text">{book.author}</p>
                      <p className="title-text">{book.subject}</p>
                      <p className="title-text">{book.teacher}</p>
                      <p className="title-text">{book.filename}</p>
                    </div>
                  )}
                </div>

                <div className="add-book-form-container" style={{display: formOpen ? 'flex' : 'none'}}>
                  <form className="add-book-form flex-column" onSubmit={this.state.updateForm ? this.updateBook(this.state.bookToUpdateID) : this.submitBook}>

                    <input type="text" name="title" id="title" className="input" placeholder="Title" onChange={this.onInputChange}/>
                    <input type="text" name="author" id="author" className="input" placeholder="Author" onChange={this.onInputChange}/>
                    <input type="text" name="teacher" id="teacher" className="input" placeholder="Teacher" onChange={this.onInputChange}/>
                    <input type="text" name="subject" id="subject" className="input" placeholder="Subject" onChange={this.onInputChange}/>
                    <input type="text" name="filename" id="filename" className="input" placeholder="Filename" onChange={this.onInputChange}/>

                    <div className="flex-row buttons-container">
                      <input type="submit" className="submitBook" value={this.state.updateForm ? 'Update' : 'Submit'} />
                      {this.state.updateForm ? <button className="submitBook delete-book" onClick={this.deleteBook(this.state.bookToUpdateID)}>Delete</button> : null}
                    </div>

                  </form>
                </div>

              </div>
            </div>
        )
    }
}

export default AdminPanel