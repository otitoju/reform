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

    handleReset( email){
        //e.preventDefault()
        fetch(`/reset/${email}`, {
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
        <div className="container">
                <div className="title">
                    <h1 className="text-center"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span>Reset password</h1>
                </div>
                    <div className="form-group">
                        <label for="password">New password</label>
                        <i className="mdi mdi-lock"><input type="password" placeholder="Enter your new password" value={this.state.password} onChange={this.handlePassword}  className="form-control"/></i>
                    </div>
                    <div className="form-group">
                        <label for="password">Confirm password</label>
                        <i className="mdi mdi-lock"><input type="password" placeholder="Confirm your new password" value={this.state.confirm} onChange={this.handleConfirm}  className="form-control"/></i>
                    </div>
                    <div className="form-group">
                        <label for="secret">Secret</label>
                        <i className="mdi mdi-security"><input type="text" placeholder="Enter the secret value you choose during registration" value={this.state.secret} onChange={this.handleSecret}  className="form-control"/></i>
                    </div>
                    <div className="form-field">
                        <button className="btn btn-primary" onClick={this.handleReset} btn-block>Reset</button>
                    </div>
            </div>
      </div>
    )
  }
}
