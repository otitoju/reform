import React, { Component } from 'react'
import '../css/userprofile.css'
import { Link } from 'react-router-dom'

export default class userprofile extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            email:'',
            id:''
        }

    }
    componentDidMount = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (!token){
            this.props.history.push('/')
        }
      fetch('/user', {
          headers:{
              'Accept':'application/json',
              'Content-Type':'application',
              'Authorization':`Bearer ${token}`
          }
      })
      .then(res => res.json())
      .then(result => {
        this.setState({
            username:result.name,
            email:result.email,
            id:result._id
        })
      })
      .catch(err => console.log(err))
    }
    
  render() {
      const {username, email, id } = this.state

    return (
      <div>
        <div className="card" key={id} id="profile">
                <center><h1>User profile</h1></center>
                <hr/>
                <div className="card-panel" id="pic">
                    <h2>Profile pic to be mounted</h2>
                </div>
                <hr/>
                <h3>Username: {username}</h3>
                <h3>Email: {email}</h3>
                <div id="Pbtn">
                <Link to="/chgpassword"><input type="button" className="btn btn-default red" value="Change password"/></Link><br/>
               <Link to="/update"><input type="button" className="btn btn-small gray" value="Edit profile"/></Link>
               </div>
        </div>
      </div>
    )
  }
}
