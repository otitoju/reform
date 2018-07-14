import React, { Component } from 'react'

export default class allUsers extends Component {
    constructor(){
        super()
        this.state = {
            allUsers:[]
        }
    }
    componentDidMount = () => {
        const token = JSON.parse(localStorage.getItem('token'))
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
            <div>
                {allUsers.map(res => {
                    const {_id,name,email} = res
                    return <div key={_id}>
                        <table className="table table-condensed table-bordered">
                            <thead>
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
                                <tr>
                                    <td>{_id}</td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                </tr>

                            </tbody>
                        </table>
                        </div>
                })}
            </div>
      </div>
    )
  }
}
