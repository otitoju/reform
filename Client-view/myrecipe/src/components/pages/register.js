import React, { Component } from 'react'
//import '../css/bootstrap.min.css'
import '../css/register.css'

export default class register extends Component {
    constructor(){
        super();
        this.state = {
            name:"",
            email:"",
            password:"",
            secret:""
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
            alert(res.message)
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
    return (
      <div id="bodi">
          <div>
          <form>
          
              <div className="card hoverable" id="cards">
                  <div className="card-action teal lighten-1 white-text" id="act">
                      <h3>Register form</h3>
                  </div>
                  <div className="card-content" id="con">
                    <div className="form-field">
                            <label for="name">Name</label>
                            <i className="mdi mdi-account"><input type="text" placeholder="Enter your name" value={this.state.name} onChange={this.handleName}/></i>
                    </div>
                      <div className="form-field">
                          <label for="email">Email</label>
                          <i className="mdi mdi-email"><input type="email" placeholder="E.g jameela@gmail.com" value={this.state.email} onChange={this.handleEmail}/></i>
                      </div>
                      <div className="form-field">
                          <label for="password">password</label>
                          <i className="mdi mdi-lock"><input type="password" placeholder="Enter your password" value={this.state.password} onChange={this.handlePassword}/></i>
                      </div>
                      <div className="form-field">
                          <label for="secret">Secret</label>
                          <i className="mdi mdi-security"><input type="text" placeholder="Enter a secret value" value={this.state.secret} onChange={this.handleSecret}/></i>
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
