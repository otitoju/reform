import React, { Component } from 'react'
import '../css/allusers.css'

export default class allUsers extends Component {
    constructor(){
        super()
        this.state = {
            allUsers:[]
        }
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
          console.log(users.allUser)
           this.setState({allUsers:users.allUser})
      })
      .catch(err => console.log(err))
    }
    
  render() {
      const {allUsers} = this.state
    return (
      <div>
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
                            </thead>
                            
                            <tbody>
                {allUsers.map(res => {
                    const {_id,name,email} = res
                    return <tr key={_id}>
                                    <td></td>
                                    <td><b>{_id}</b></td>
                                    <td><b>{name}</b></td>
                                    <td><b>{email}</b></td>
                                </tr>       
                })}
                </tbody>
                
            </table>
            </fragment>
      </div>
    )
  }
}
