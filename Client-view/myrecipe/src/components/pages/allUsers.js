import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/allusers.css'

export default class allUsers extends Component {
    constructor(){
        super()
        this.state = {
            allUsers:[]
        }
        //this.handleDel = this.handleDel.bind(this)
    }
    componentDidMount = () => {
        const token = JSON.parse(localStorage.getItem('AdminToken'))
        if(!token){
            this.props.history.push('/')
        }
      fetch('/user', {
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'Authorization':`Bearer ${token}`
          }
      })
      .then(res => res.json())
      .then(users => {
         // console.log(users.allUser)
           this.setState({allUsers:users.allUser})
      })
      .catch(err => console.log(err))
    }
    // handleDel(id){
    //     axios.delete(`/user/${id}`)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    // }
  render() {
      const {allUsers} = this.state
    return (
      <div>
                  <nav className="navbar navbar-expand-sm navbar-dark bg mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Classic Recipe administrative site
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
                                    Visit site
                                    </Link>
                                </li>
                                
                                
                            </ul>
                        
                        </div>
                    </div>
                  </nav>
        <h1>All users</h1>
        <fragment>
            <table className="table table-condensed table-bordered">
                            <thead>
                                <th>
                                    sn
                                </th>
                                <th>
                                    ID
                                </th>
                                <th>
                                    NAME
                                </th>
                                <th>
                                    EMAIL
                                </th>
                                <th>
                                    SECRET
                                </th>
                                <th>
                                    GENDER
                                </th>
                                <th>
                                    PHONE
                                </th>
                                <th>
                                    Action
                                </th>
                            </thead>
                            
                            <tbody>
                {allUsers.map((res, index) => {
                    const {_id,name,email, secret, gender, phone} = res
                    return <tr key={_id}>
                                    <td>{index+1}</td>
                                    <td><b>{_id}</b></td>
                                    <td><b>{name}</b></td>
                                    <td><b>{email}</b></td>
                                    <td><b>{secret}</b></td>
                                    <td><b>{gender}</b></td>
                                    <td><b>{phone}</b></td>
                                    <td><Link to={`/dashboard/${_id}`}>Del</Link></td>
                                </tr>       
                })}
                </tbody>
                
            </table>
            </fragment>
      </div>
    )
  }
}
