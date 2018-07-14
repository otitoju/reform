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
            alert(result.message)
            localStorage.setItem('AdminToken', JSON.stringify(result.admintoken))
            if(result.message == 'welcome'){
                this.props.history.push('/adminhome')
            }
        })
        .catch(err => console.log(err))
    }
  render() {
    return (
      <div>
          <form>
                    <div className="card hoverable" id="Lcard">
                        <div className="card-action teal lighten-1 white-text">
                            <h3> Admin Login form</h3>
                        </div>
                        <div className="card-content">
                            <div className="form-field">
                                <label htmlFor="username">Username</label>
                                <i className="mdi mdi-email"><input type="email" placeholder="Admin" value={this.state.username} onChange={this.handleUsername}/></i>
                            </div>
                            <div className="form-field">
                            <label htmlFor="password">Password</label>
                            <i className="mdi mdi-lock"> <input type="password" value={this.state.password} onChange={this.handlePin} placeholder="Admin password"/></i>
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
    )
  }
}
