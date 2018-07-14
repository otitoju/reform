import React, { Component } from 'react'
import '../css/reset.css'

export default class resetpassword extends Component {
    constructor(){
        super()
        this.state = {
            password:'',
            confirm:'',
            secret:''
        }
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSecret = this.handleSecret.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    handlePassword(e){this.setState({password:e.target.value})}
    handleSecret(e){this.setState({secret:e.target.value})}
    handleConfirm(e){this.setState({confirm:e.target.value})}
    handleReset(e){
        e.preventDefault()
        fetch('/reset/:email', {
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                password:this.state.password,
                confirm:this.state.confirm,
                secret:this.state.secret
            })
        })
        .then(res => res.json())
        .then(res => alert(res.message))
        .catch(err => console.log(err))
    }
  render() {
    return (
      <div>
        <div className="card hoverable" id="reset">
                <div className="card-action teal lighten-1 white-text">
                    <h3>Reset password</h3>
                </div>
                <div className="card-content">
                    <div className="form-field">
                        <label for="password">New password</label>
                        <i className="mdi mdi-lock"><input type="password" placeholder="Enter your new password" value={this.state.password} onChange={this.handlePassword}/></i>
                    </div>
                    <div className="form-field">
                        <label for="password">Confirm password</label>
                        <i className="mdi mdi-lock"><input type="password" placeholder="Confirm your new password" value={this.state.confirm} onChange={this.handleConfirm}/></i>
                    </div>
                    <div className="form-field">
                        <label for="secret">Secret</label>
                        <i className="mdi mdi-security"><input type="text" placeholder="Enter the secret value you choose during registration" value={this.state.secret} onChange={this.handleSecret}/></i>
                    </div>
                    <div className="form-field">
                        <button className="btn-large waves-effect" onClick={this.handleReset}>Reset</button>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}
