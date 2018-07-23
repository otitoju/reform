import React, { Component } from 'react'
import '../css/bootstrap.min.css'
import '../css/register.css'
import {Link} from 'react-router-dom'
// import Navbar from '../layout/Navbar'

export default class register extends Component {
    constructor(){
        super();
        this.state = {
            name:"",
            email:"",
            password:"",
            secret:"",
            info:''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSecret = this.handleSecret.bind(this)
    }
    
    handleSubmit(e){
        e.preventDefault();
        
        fetch('/reg', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:this.state.name,
                email:this.state.email,
                password:this.state.password,
                secret:this.state.secret
            })
        })
        .then(res => res.json())
        .then(res => {
           // alert(res.message)
            this.setState({info:res.message})
            //document.getElementById('info').style.visibility=true
        })
        .catch(err => console.log(err))
    }
    handleName(e){
        this.setState({name:e.target.value})
    }
    handleEmail(e){
        this.setState({email:e.target.value})
    }
    handlePassword(e){
        this.setState({password:e.target.value})
    }
    handleSecret(e){
        this.setState({secret:e.target.value})
    }
  render() {
      const {info} = this.state

    return (
      <div id="bodi">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
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
                                    <Link className="nav-link" to="/login">
                                        Signin
                                    </Link>
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
                </nav>
            <div id="info" class="alert alert-success" role="alert">{info}</div>
            {/* <Navbar /> */}
            <div class="alert alert-success" role="alert">
  <strong>Well done!</strong> You successfully read this important alert message.
</div>
<div class="alert alert-info" role="alert">
  <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
</div>
<div class="alert alert-warning" role="alert">
  <strong>Warning!</strong> Better check yourself, you're not looking too good.
</div>
<div class="alert alert-danger" role="alert">
  <strong>Oh snap!</strong> Change a few things up and try submitting again.
</div>


          <div>
          <form>
          
              <div className="card" id="cards">
                  <div className="card-action teal lighten-1 white-text" id="act">
                      <h3>Register form</h3>
                  </div>
                  <div className="card-content" id="con">
                    <div className="form-field">
                            <label htmlFor="name">Name</label>
                            <i className="mdi mdi-account"><input type="text" placeholder="Enter your name" value={this.state.name} onChange={this.handleName} required id="name"/></i>
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
                          <label htmlFor="secret">Secret</label>
                          <i className="mdi mdi-security"><input type="text" placeholder="Enter a secret value" value={this.state.secret} onChange={this.handleSecret} required/></i>
                      </div>
                      <div className="form-field">
                          <input type="submit" className="btn-small waves-effect" value="Register" onClick={this.handleSubmit} id="butt"/>
                      </div>
                  </div>
              </div>
      </form>
        </div>
      </div>
    )
  }
}
