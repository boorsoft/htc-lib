import React from 'react'
import '../App.css'
import './AdminPanel.css'
import Login from './Login'

class AdminPanel extends React.Component {
    constructor() {
      this.state = {
        books: []
      }
    }

    getToken = () => {
        const tokenString = localStorage.getItem('token')
        return tokenString
    }

    render() {
        const token = this.getToken()

        if (!token) {
            return <Login token={token} />
        }

        return (
            <div className="App">
              <div className="dashboard-container flex-column">

              </div>
            </div>
        )
    }
}

export default AdminPanel