import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class admindashboard extends Component {
    componentDidMount = () => {
      const admin = JSON.parse(localStorage.getItem('AdminToken'))
      if(!admin){
          this.props.history.push('/')
      }
    }
    logout(){
      localStorage.removeItem('AdminToken')
    }
    
  render() {
    return (
      <div>
          <center><h1>Welcome Admin</h1></center>
          <div className="form-field">
                <Link to="/create">
                <input type="submit" className="btn-small waves-effect" value="Create recipe"/>
                </Link>
          </div><br/>
          <div className="form-field">
                <Link to="/users">
                <input type="submit" className="btn-small waves-effect" value="View users"/>
                </Link>
          </div>
          <div className="form-field">
                <Link to="/">
                <input type="submit" className="btn-small waves-effect" value="Logout" onClick={this.logout}/>
                </Link>
          </div>
      </div>
    )
  }
}
