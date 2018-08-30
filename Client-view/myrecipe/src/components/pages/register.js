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
            info:'',
            phone:'',
            gender:''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSecret = this.handleSecret.bind(this)
        this.handleGender = this.handleGender.bind(this)
        this.handlePhone = this.handlePhone.bind(this)
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
                secret:this.state.secret,
                phone:this.state.phone,
                gender:this.state.gender
            })
        })
        .then(res => res.json())
        .then(res => {
           // alert(res.message)
            this.setState({info:res.message})
            if(res.message === `Registration successful`){
                
                this.props.history.push('/login')
            }
            document.getElementById('in').style.display='block'
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
    handleGender(e){
        this.setState({gender:e.target.value})
    }
    handlePhone(e){
        this.setState({phone:e.target.value})
    }
  render() {
      const {info} = this.state
      const aler = {
          display:'none'
      }

    return (
      <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                        <h1 style={{fontStyle:'italic', fontFamily: 'Brush Script MT',fontWeight: 'bolder',fontSize: '30px'}}> Nice Recipe</h1>
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
            
              <div class="container">
                    <div class="row">
                    <div class="col-md-12">
                        <h1 class="text-center"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Create Account Here</h1>
                    </div>
                    </div>
                </div>
                <section id="main">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
          <div id="in" style={{display:'none'}} class="alert alert-danger" role="alert">{info}</div>
            <form id="login"  class="well">
            <div class="form-group">
                    <label><i class="glyphicon glyphicon-user"></i> Name</label>
                    <input type="text" className="form-control" placeholder="Enter Name" value={this.state.name} onChange={this.handleName} required/>
                  </div>
                  <div class="form-group">
                    <label><i class="glyphicon glyphicon-envelope"></i> Email Address(*Mongodb@gmail.com)</label>
                    <input type="email" className="form-control" placeholder="Enter Email" value={this.state.email} onChange={this.handleEmail} required/>
                  </div>
                  <div class="form-group">
                    <label><i class="glyphicon glyphicon-lock"></i> Password(*Atleast 8 characters)</label>
                    <input type="password" className="form-control" placeholder="Password"  value={this.state.password} onChange={this.handlePassword} required/>
                  </div>
                  <div class="form-group">
                    <label><i class="glyphicon glyphicon-qrcode"></i> Secret</label>
                    <input type="text" className="form-control" placeholder="Enter any safe word" value={this.state.secret} onChange={this.handleSecret} required/>
                  </div>
                  <div class="form-group">
                    <label><i class="glyphicon glyphicon-children"></i> Gender</label>
                    <select  className="form-control" value={this.state.gender} onChange={this.handleGender}>
                        <option>--select gender--</option>
                        <option>male</option>
                        <option>female</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label><i class="glyphicon glyphicon-phone"></i> Phone number</label>
                    <input type="phone" className="form-control" placeholder="Enter phone number" required value={this.state.phone} onChange={this.handlePhone}/>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block" onClick={this.handleSubmit} id="send"><i class="glyphicon glyphicon-send"></i> Signup</button>
              </form>
          </div>
        </div>
      </div>
    </section>

      </div>
    )
  }
}
