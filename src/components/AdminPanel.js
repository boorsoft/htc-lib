import React from 'react'
import '../App.css'
import './AdminPanel.css'

class AdminPanel extends React.Component {

  onInputChange() {
    console.log('change')
  }

  render() {
    return(
      <div className="App">
        
        <div className="LoginFormContainer">
          <form>
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