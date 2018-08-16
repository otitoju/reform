import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class adminRegister extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:'',
            email:'',
            msg:''
        }
        this.handleUsername = this.handleUsername.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleUsername(e){
        this.setState({username:e.target.value})
    }
    handlePassword(e){
        this.setState({
            password:e.target.value
        })
    }
    handleEmail(e){
        this.setState({email:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault()
        fetch('/createsuperuser',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:this.state.username,
                email:this.state.email,
                password:this.state.password
            })
        })
        .then( res => res.json())
        .then(res => {
            if(res.message === 'registered'){
                this.setState({msg:res.message})
                this.props.history.push('/admin')
            }
            else {
                if(res.message === 'Please fill in all inputs'){
                    this.setState({msg:res.message})
                }
            }
        })
        .catch(err => console.log(err))
    }
  render() {
      const {msg} = this.state
    return (
      <div>
          <nav className="navbar navbar-expand-sm navbar-default bg mb-4">
                    <div className="container">
                        
                        <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/">
                                        Classic Recipe administrative site
                                    </Link>
                        
                    </div>
        
                <div className="collapse navbar-collapse" id="navbar">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                    Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/admin">
                                    Signin
                                </Link>
                            </li>
                                
                            </ul>
                        
                        </div>

                    </div>
              </nav>
           {/* <nav className="navbar navbar-expand-sm navbar-dark  mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Online Recipe
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
                                    Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">
                                        Signin
                                    </Link>
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
                </nav> */}
          <div id="info" class="alert alert-success" role="alert">{msg}</div>
        {/* <form>
          
          <div className="card" id="cards">
              <div className="card-action red lighten-1 white-text" id="act">
                  <h3>Createsuperuser</h3>
              </div>
              <div className="card-content" id="con">
                <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <i className="mdi mdi-account"><input type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsername} required id="name"/></i>
                </div>
                  <div className="form-field">
                      <label htmlFor="email">Email</label>
                      <i className="mdi mdi-email"><input type="email" placeholder="E.g jameela@gmail.com" value={this.state.email} onChange={this.handleEmail} required/></i>
                  </div>
                  <div className="form-field">
                      <label htmlFor="password">password</label>
                      <i className="mdi mdi-lock"><input type="password" placeholder="Enter your password" value={this.state.password} onChange={this.handlePassword} required/></i>
                  </div>
                  <div className="form-field">
                      <input type="submit" className="btn-small red" value="Register" onClick={this.handleSubmit} id="butt"/>
                  </div>
              </div>
          </div>
  </form> */}
            <div class="container">
                    <div class="row">
                    <div class="col-md-12">
                        <h1 class="text-center"> Admin <small>Account Registration</small></h1>
                    </div>
                    </div>
            </div>  
            <section id="main">
      <div class="container">
        <div class="row">
          <div className="col-md-4 col-md-offset-4">
            <form id="login"  className="well">
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter Username" required value={this.state.username} onChange={this.handleUsername}/>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter Email" required  value={this.state.email} onChange={this.handleEmail}/>
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" placeholder="Password" required  value={this.state.password} onChange={this.handlePassword}/>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block" onClick={this.handleSubmit}>Register</button>
              </form>
          </div>
        </div>
      </div>
    </section> 
      </div>
    )
  }
}
