import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../layout/adminboard.css'


export default class admindashboard extends Component {
  constructor(){
    super()
    this.state = {
      username:''
    }

  }
    componentDidMount = () => {
      const admin = JSON.parse(localStorage.getItem('AdminToken'))
      if(!admin){
          this.props.history.push('/')
      }
      else{
        fetch('/adminusername', {
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':`Bearer ${admin}`
          }
        })
        .then(res => res.json())
        .then(result => {
          //console.log(result.username)
          this.setState({
            username:result.username
          })
        })
        .catch(err => console.log(err))
      }
    }
    logout(){
      localStorage.removeItem('AdminToken')
    }
    togglesidebar(){
document.getElementById('side').classList.toggle('active')
    }
    
  render() {
    const { username } = this.state
    return (
      <div>
        <div id="side">
        <div id="toggle" onClick={this.togglesidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
            <div id="circle"></div>
              <hr/>
        <div id="btns">
            <Link to="/create">
            <input type="button" className="btn-small waves-effect blue" value="Create recipe" id="btc"/>
            </Link>
            <Link to="/users">
            <input type="button" className="btn-small waves-effect" value="View users" id="btd"/>
            </Link>
            <Link to="/">
            <input type="submit" className="btn-small waves-effect red" value="Logout" onClick={this.logout} id="btl"/>
            </Link>
        </div>
        </div>
          <center><h1>Welcome Admin {username}</h1></center>
          <div className="card" id="Acard">
              <div className="card-action blue lighten-1 white-text">
                  <h3>Site administration</h3>
              </div>
                <div className="card-content">
                </div>
          </div>

      </div>
    )
  }
}
