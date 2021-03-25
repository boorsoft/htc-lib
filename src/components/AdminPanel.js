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
            <input id="username" className="username" type="text" placeholder="Enter your username..." onChange={this.onInputChange}/>
            <input id="password" className="password" type="password" placeholder="Enter your password..." onChange={this.onInputChange} />
            <input type="submit" className="submitButton" value="Login" />
          </form>
        </div>

      </div>
    )
  }
}

export default AdminPanel