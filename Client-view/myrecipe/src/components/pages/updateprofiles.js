import React, { Component } from 'react'
//import '../css/updateprofile.css'
import {Link} from 'react-router-dom'
//import axios from 'axios'


export default class updateprofiles extends Component {
    constructor(){
        super()
        this.state ={
            name:'',
            email:'',
            secret:'',
            id:''
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleSecret = this.handleSecret.bind(this)
    }
    handleEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    handleName(e){
        this.setState({
            name:e.target.value
        })
    }
    handleSecret(e){
        this.setState({
            secret:e.target.value
        })
    }
    handleUpdate(e){
        e.preventDefault()
        const token = JSON.parse(localStorage.getItem('token'))
        const id = JSON.parse(localStorage.getItem('userId'))
    
            fetch(`/update/${id}`, {
                method:'PUT', 
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    name:this.state.name,
                    email:this.state.email,
                    secret:this.state.secret
                })
            })
            .then(res => console.log(res))
            // .then(res =>{
            //     alert(res.message)
            //     // this.setState({
            //     //     id:res.id
            //     // })
            // })
            .catch(err => console.log(err))
             

       
    }
    componentDidMount = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        if(!token){
            this.props.history.push('/')
        }
       
    }
    
  render() {
    return (
      <div >
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
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
                </nav>
                <div  className="col-md-4 col-md-offset-4">
          <div className="card" >
                  <div className="card-title">
                      <h3>Change profile</h3>
                  </div>
                  <div className="container">
                  <div className="form-group">
                        <div className="form-field">
                                <label>New name*</label>
                                <i className="mdi mdi-account"><input type="text" placeholder="Enter your name" value={this.state.name} onChange={this.handleName} className="form-control"/></i>
                        </div>
                      <div className="form-field">
                          <label>New email*</label>
                          <i className="mdi mdi-email"><input type="email" placeholder="E.g jameela@gmail.com" value={this.state.email} onChange={this.handleEmail} className="form-control"/></i>
                      </div>
                      <div className="form-field">
                          <label>Secret*</label>
                          <i className="mdi mdi-security"><input type="text" placeholder="Enter a secret value" value={this.state.secret} onChange={this.handleSecret} className="form-control"/></i>
                      </div><br/>
                          <input type="submit" className="btn btn-primary" value="Update" onClick={this.handleUpdate}/>
                      </div>
                  </div>
            </div>
            </div>
      </div>
    )
  }
}
