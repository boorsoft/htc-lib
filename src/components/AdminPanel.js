import React from 'react'
import '../App.css'
import Login from './Login'

class AdminPanel extends React.Component {
    getToken = () => {
        const tokenString = localStorage.getItem('token')
        return tokenString
    }

    render() {
        const token = this.getToken()

        if (!token) {
            return <Login token={token}></Login>
        }

        return (
            <div className="App">
              <h1>ADMIN PANEL</h1>
            </div>
        )
    }
}

export default AdminPanel