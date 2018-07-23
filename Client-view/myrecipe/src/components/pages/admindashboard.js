import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../layout/adminboard.css'


export default class admindashboard extends Component {
  constructor(){
    super()
    this.state = {
      username:''
    }
    this.viewUser = this.viewUser.bind(this)
    this.createRecipe = this.createRecipe.bind(this)
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
      localStorage.removeItem('recipeId')
    }
    togglesidebar(){
      document.getElementById('side').classList.toggle('active')
    }
    viewUser(){
      this.props.history.push('/users')
    }
    createRecipe(){
      this.props.history.push('/create')
    }
    
  render() {
    const { username } = this.state
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Classic Recipe administrative site
                        </Link>
                        <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                    Visit site
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                  <li className="nav-link">Welcome Admin {username}</li>
                                  <li className="nav-item">
                                    <Link className="nav-link" to="/admin">
                                    <input type="submit" className="btn-small waves-effect red" value="Logout" onClick={this.logout} id="btl"/>
                                    </Link>
                                </li>
                            </ul>
                        
                        </div>
                    </div>
              </nav>
        <div id="side">
            <div id="toggle" onClick={this.togglesidebar}>
                <span></span>
                <span></span>
                <span></span>
            </div>
              <div id="circle"></div>
              <hr/>
              <div id="btns">
                  <Link to="">
                  <input type="button" className="btn-small waves-effect blue" value="Profile" id="btc"/>
                  </Link>
                  <Link to="">
                  <input type="button" className="btn-small waves-effect" value="Change password" id="btd"/>
                  </Link>
                  
              </div>
        </div>
          <div className="card" id="Acard">
              <div className="card-action red lighten-1 white-text">
                  <h3>Site administration</h3>
              </div>
                <div className="">
                    <h5 onClick={this.viewUser}>View registered users</h5>
                    <h5 onClick={this.createRecipe}>Create new recipe</h5>
                    <h5>View site admins</h5>
                </div>
          </div>

      </div>
    )
  }
}
