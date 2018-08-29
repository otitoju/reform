import React, { Component } from 'react'
import '../css/userprofile.css'
import { Link } from 'react-router-dom'

export default class userprofile extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            email:'',
            id:'',
            pic:''
        }

    }
    componentDidMount = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        const id = JSON.parse(localStorage.getItem('userId'))
        this.setState({id:id})
        //console.log(id)
        if (!token){
            this.props.history.push('/')
        }
      fetch('/userprofile', {
          headers:{
              'Accept':'application/json',
              'Content-Type':'application',
              'Authorization':`Bearer ${token}`
          }
      })
      .then(res => res.json())
      .then(result => {
          //console.log(result.id)
        this.setState({
            username:result.name,
            email:result.email,
            pic:result.pic
        })
      })
      .catch(err => console.log(err))
    }
    
  render() {
      const {username, email, id ,pic} = this.state

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
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
                </nav>
            
                <div  className="col-md-4 col-md-offset-2" id="row">
                <div className="card" key={id}>
                                <img src={pic} className="card-img-top"/>
                                <div className="caption">
                            <h3 id="uses">Username: {username}</h3>
                            <h3 id="uses">Email: {email}</h3>
                                <ul>
                                   
                                   <li> <Link to="/chgpassword"><input type="button" className="btn btn-danger" value="Change password"  data-toggle="modal" data-target="#Photo"/></Link></li>
                                   <li> <Link to={`/update/${id}`}><input type="button" className="btn btn-default" value="Edit profile"/></Link></li><br/><br/>
                                  <li> <Link to={`/profilepicture/${id}`}><input type="button" className="btn btn-primary" value="Upload image"/></Link></li>
                                   
                                </ul>
                                    
                                   </div> 
                </div> 
            </div>

      </div>
    )
  }
}
