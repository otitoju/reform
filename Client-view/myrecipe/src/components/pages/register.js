import React, { Component } from 'react'
import '../css/register.css'
import {Link} from 'react-router-dom'

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
            if(res.message === `Registration successful`){
                alert('Registration successul, you can now log in')
                this.props.history.push('/login')
            }
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
      <div>
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
           
              <div class="container">
                    <div class="row">
                    <div class="col-md-12">
                        <h1 class="text-center"> Create Account Here</h1>
                    </div>
                    </div>
                </div>
                <section id="main">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <form id="login"  class="well">
            <div class="form-group">
                    <label>Fullname</label>
                    <input type="text" class="form-control" placeholder="Enter Name" value={this.state.name} onChange={this.handleName} required/>
                  </div>
                  <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" class="form-control" placeholder="Enter Email" value={this.state.email} onChange={this.handleEmail} required/>
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" placeholder="Password"  value={this.state.password} onChange={this.handlePassword} required/>
                  </div>
                  <div class="form-group">
                    <label>Secret</label>
                    <input type="text" class="form-control" placeholder="Enter any safe word" value={this.state.secret} onChange={this.handleSecret} required/>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block" onClick={this.handleSubmit}>Login</button>
              </form>
          </div>
        </div>
      </div>
    </section>

      </div>
    )
  }
}
