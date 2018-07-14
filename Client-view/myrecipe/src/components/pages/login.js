import React, { Component} from 'react';
import { Link, Redirect } from 'react-router-dom'
import '../css/login.css'
//import Dashboard from './dashboard'
import '../css/MaterialDesign-Webfont-master/css/materialdesignicons.min.css'
import '../css/materialize.min.css'

class login extends Component{
    constructor(){
        super();
        this.state= {
            email:"",
            password:"",
            
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
            
            console.log(res.msg)
            localStorage.setItem('token', JSON.stringify(res.token));
            if(res.message === 'Login successful'){
                this.props.history.push('/recipe')
            } 
            else if(res.message === 'fill all') {
                alert('Please fill in all fields')
            }
            else if (res.message === 'Unable to login'){
                alert('Unable to login, please try again')
            }
            else if(res.message === 'No user with such email') {
                alert('No user with such email, check the email and try again')
            }
            else if(res.message === 'Invalid or wrong password'){
                alert('Invalid or wrong password')
            }
        })
        .catch(error => console.log(error)) 
        
             
    }
    render(){
    return(
         <div>
             <form>
                    <div className="card" id="Lcard">
                        <div className="card-action teal lighten-1 white-text">
                            <h3>Login form</h3>
                        </div>
                        <div className="card-content">
                            <div className="form-field">
                                <label htmlFor="email">Email</label>
                                <i className="mdi mdi-email"><input type="email" placeholder="E.g jameela@gmail.com" value={this.state.email} onChange={this.handleEmail}/></i>
                            </div>
                            <div className="form-field">
                                <label htmlFor="password">password</label>
                                <i className="mdi mdi-lock"><input type="password" placeholder="Enter your password" value={this.state.password} onChange={this.handlePassword}/></i>
                            </div>
                            <div className="form-field">
                                <input type="submit" className="btn-small waves-effect" value="Login" onClick={this.handleSubmit}/>
                            </div>
        
                            <div className="form-field">
                            <Link to="/forgot">
                            <label>Forgot your password?</label>
                            </Link>
                            </div><br/>
                            <div className="form-field">
                            <Link to="/register">
                            <label>Don't have an account yet?</label>
                            </Link>
                            </div>
                        </div>
                        
                    </div>
           
            </form>
            
      </div>
)}
}
export default login;