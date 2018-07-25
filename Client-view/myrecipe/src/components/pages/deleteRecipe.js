import React, { Component } from 'react'
import axios from 'axios'

export default class dashboard extends Component {
constructor(){
    super()
    this.state ={
      image:''
    }
//this.handleName=this.handleName.bind(this)
this.handleDel = this.handleDelete.bind(this)
}
componentDidMount() {
    this.handleDelete(this.props.match.params.id)
}
handleDelete(id){
    axios.delete(`/recipe/delete/${id}`)
    .then(res => console.log(res))
}
    
  render() {

    return (
      <div>
          <h2>You have delete the selected recipe successfully</h2>
          {/* <h2>Proceed to delete recipe here...</h2>
          <button className="btn btn-large" onClick={this.handleDelete}>delete</button> */}
      </div>
    )
  }
}
