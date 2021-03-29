import React from 'react'
import '../App.css'
import './AdminPanel.css'

class AdminPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
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
    const response = await fetch('https://htc-online-library-express.boorsoft.repl.co/user/login', 
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

    this.submitUser().then(data => console.log(data))
  }

  render() {
    return(
      <div className="App">
        
        <div className="LoginFormContainer">
          <form onSubmit={this.onSubmit}>
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

export default AdminPanel