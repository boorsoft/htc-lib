import React from 'react'
import '../App.css'
import './Login.css'
import { apiURL } from '../utils'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      redirect: false
    }
  }

  setToken = (token) => {
    localStorage.setItem('token', token)
  }

  onInputChange = () => {
    const usernameInput = document.querySelector('#username')
    const passwordInput = document.querySelector('#password')

    this.setState({
      username: usernameInput.value,
      password: passwordInput.value
    })
  }


  // Отправляем POST запрос на сервер
  submitUser = async () => {
    const response = await fetch(`${apiURL}/user/login`, 
      {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      })

    // Если сервер ответил 401 или 404
    if (response.status === 401 || response.status === 404) {
      console.error('Authorization failed')
    }
    
    return response.json()
  }

  // При отправке формы
  onSubmit = async (e) => {
    e.preventDefault()
    console.log('submiting')

    this.submitUser().then(data => {
      this.setToken(data.token)
      console.log('Token: ', data.token)
      this.setState({redirect: true})
    })
  }

  render() {
    const redirect = this.state.redirect
    if (redirect) return <Redirect to="/admin" />

    return(

      <div className="App">
        
        <div className="LoginFormContainer">
          <form className="loginForm" onSubmit={this.onSubmit}>
            <div className="input-container">
              <input id="username" className="username text-input" type="text" placeholder="Enter your username..." onChange={this.onInputChange}/>
            </div>

            <div className="input-container">
              <input id="password" className="password text-input" type="password" placeholder="Enter your password..." onChange={this.onInputChange} />
            </div>

            <div className="input-container">
              <input type="submit" className="submitButton" value="Login" />
            </div>
            
          </form>
        </div>

      </div>
    )
  }
}

export default Login