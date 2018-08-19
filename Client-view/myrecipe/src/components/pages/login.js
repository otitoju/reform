import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import '../css/login.css'
//import '../css/MaterialDesign-Webfont-master/css/materialdesignicons.min.css'
//import '../css/materialize.min.css'
// import Navbar from '../layout/Navbar'

class login extends Component{
    constructor(){
        super();
        this.state= {
            email:"",
            password:"",
            isLoading:false,
            info:''
            
        }
        this.handleSubmit= this.handleSubmit.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin(){
        this.setState({loggedIn:true})
    }
    handleEmail(e){
        this.setState({
            email:e.target.value
        }) 
    }
    handlePassword(e){
        this.setState({password:e.target.value})
    }
    handleSubmit(e) {
        let a = document.getElementById('pre').style.visibility = 'visible'
        e.preventDefault()
         fetch('/login', {
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: this.state.email,
                password: this.state.password 
            })
        })
        .then(res => res.json())
        .then(res => {
            //alert(res.message)
            
            //console.log(res.msg)
            this.setState({info:res.message})
            

            if(res.message === 'Login successful'){
                localStorage.setItem('token', JSON.stringify(res.token));
                localStorage.setItem('userId', JSON.stringify(res.id))
                this.props.history.push('/recipe')

            } 
            // else if(res.message === 'fill all') {
            //     alert('Please fill in all fields')
            // }
            // else if (res.message === 'Unable to login'){
            //     alert('Unable to login, please try again')
            // }
            // else if(res.message === 'No user with such email') {
            //     alert('No user with such email, check the email and try again')
            // }
            // else if(res.message === 'Invalid or wrong password'){
            //     alert('Invalid or wrong password')
            // }
            let b = document.getElementById('pre').style.visibility = 'hidden'
        })
        .catch(error => console.log(error)) 
        
             
    }
    render(){
        const {info} = this.state
    return(
         <div>
              
              <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                        <h1 style={{fontStyle:'italic', fontFamily: 'Brush Script MT',fontSize: '30px'}}> Nice Recipe</h1>
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
                                    <Link className="nav-link" to="/register">
                                        Signup
                                    </Link>
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
              </nav>
              
              
       
            <section id="main">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
          <div className="container">
                    <div class="row">
                    <div class="col-md-12">
                        <h1 class="text-center"> User <small>Account Login</small></h1>
                    </div>
                    </div>
        </div>
                <div id="in" style={{display:'none'}} className='alert alert-danger' role="alert">*{info}</div>
            <form id="login"  className="well">
                  <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter Email"  value={this.state.email} onChange={this.handleEmail} required id="mail"/>
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePassword} required id="pass"/>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit} id="send">Login</button>
                  <div className="form-group">
                            <Link to="/forgot">
                            <label>Forgot your password?</label>
                            </Link>
                            </div><br/>
                            <div className="form-group">
                            <Link to="/register">
                            <label>Don't have an account yet?</label>
                            </Link>
                            </div>
              </form>
          </div>
        </div>
      </div>
    </section>
    

            <div class="preloader-wrapper big active" id="pre">
                <div class="spinner-layer spinner-blue-only">
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
)}
}
export default login;