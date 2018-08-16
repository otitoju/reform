import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class adminLogin extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            password:''
        }
        this.handleUsername = this.handleUsername.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePin = this.handlePin.bind(this)
    }
    handlePin(e){
        this.setState({password:e.target.value})
    }
    handleUsername(e){
        this.setState({username:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault()
        let loading = document.getElementById('pred').style.visibility = 'visible'
        //alert(this.state.username)
        fetch('/admin', {
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                //'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                    username:this.state.username,
                    password:this.state.password
            })
        })
        .then(res => res.json())
        .then(result =>{
            //alert(result.message)
            localStorage.setItem('AdminToken', JSON.stringify(result.admintoken))
            if(result.message === 'welcome'){
                this.props.history.push('/adminhome')
            }
            else if(result.message === 'fill all inputs and login'){
                alert('fill all inputs and login')
            }
            else if(result.message === `Problem loging in superuser`){
                alert(`Problem logging in superuser, try again`)
            }
            else if(result.message === 'Invalid username'){
                alert('Oh snap!, Check your username and try again.')
            }
            else if(result.message === `Wrong password`){
                alert(`Wrong password, make sure you enter correct password`)
            }
            loading = document.getElementById('pred').style.visibility = 'hidden'
        })
        .catch(err => console.log(err))
    }
  render() {
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
                                    <Link className="nav-link" to="/createsuperuser">
                                        Createsuperuser
                                    </Link>
                                </li>
                                
                            </ul>
                        
                        </div>

                    </div>
              </nav>

          {/* <form>
                    <div className="card" id="Lcard">
                        <div className="card-action red lighten-1 white-text">
                            <h3> Admin Login form</h3>
                        </div>
                        <div className="card-content">
                            <div className="form-field">
                                <label htmlFor="username">Username</label>
                                <i className="mdi mdi-email"><input type="text" placeholder="Admin" value={this.state.username} onChange={this.handleUsername}/></i>
                            </div>
                            <div className="form-field">
                            <label htmlFor="password">Password</label>
                            <i className="mdi mdi-lock"> <input type="password" value={this.state.password} onChange={this.handlePin} placeholder="Admin password"/></i>
                            </div>
                            <div className="form-field">
                                <input type="submit" className="btn-small red" value="Login" onClick={this.handleSubmit}/>
                            </div>
        
                            <div className="form-field">
                            <Link to="/forgot">
                            <label>Forgot your password?</label>
                            </Link>
                            </div><br/>
                            <div className="form-field">
                            <Link to="/createsuperuser">
                            <label>Don't have an account yet?</label>
                            </Link>
                            </div>
                        </div>
                        
                    </div>
           
            </form> */}
            <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="text-center"> Admin <small>Account Login</small></h1>
          </div>
        </div>
      </div>
                <section id="main">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <form id="login" class="well">
                  <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Admin" value={this.state.username} onChange={this.handleUsername}/>
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <input type="password"  className="form-control" value={this.state.password} onChange={this.handlePin} placeholder="Admin password"/>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Login</button>
                  <div className="form-group">
                            <Link to="/forgot">
                            <label>Forgot your password?</label>
                            </Link>
                            </div><br/>
                            <div className="form-group">
                            <Link to="/createsuperuser">
                            <label>Don't have an account yet?</label>
                            </Link>
                            </div>
              </form>
          </div>
        </div>
      </div>
    </section>
            <div class="preloader-wrapper big active" id="pred">
                <div class="spinner-layer spinner-red-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>
            </div>
           
      </div>
    )
  }
}
