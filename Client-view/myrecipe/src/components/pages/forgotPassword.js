import React, { Component } from 'react'
import '../css/forgot.css'

export default class forgotPassword extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            secret:'',
        }
        this.handleForgot = this.handleForgot.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleSecret = this.handleSecret.bind(this)
    }
    handleEmail(e){
        this.setState({email:e.target.value})
    }
    handleSecret(e){
        this.setState({secret:e.target.value})
    }
    handleForgot(e){
        e.preventDefault()
        const token = JSON.parse(localStorage.getItem('token'))
        fetch('/forgot', {
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                email:this.state.email,
                secret:this.state.secret
            })
        })
        .then(res => res.json())
        .then(res => {
            alert(res.message)
        })
    }
  render() {
    return (
        <div>
      
            <div className="card" id="forgot">
                <div className="card-action teal lighten-1 white-text">
                    <h3>Forgot password</h3>
                </div>
                    <div className="card-content">
                            <form>
                                <div className="form-field">
                                    <label for="email">Email</label>
                                    <i className="mdi mdi-email"><input type="email" placeholder="E.g jameela@gmail.com" required value={this.state.email} onChange={this.handleEmail}/></i>
                                </div>
                                <div className="form-field">
                                    <label for="secret">secret</label>
                                    <i className="mdi mdi-security"><input type="text" placeholder="Enter the secret value you choose during registration"  required value={this.state.secret} onChange={this.handleSecret}/></i>
                                </div>
                                <div className="form-field">
                                    <button className="btn-large waves-effect" onClick={this.handleForgot}>Send</button>
                                </div>
                            </form>
                    </div>
           
      </div>
      </div>
    )
  }
}
