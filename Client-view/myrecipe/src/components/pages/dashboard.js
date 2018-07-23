import React, { Component } from 'react'
import axios from 'axios'

export default class dashboard extends Component {
constructor(){
    super()
    this.state ={
      image:''
    }
this.handleName=this.handleName.bind(this)
}
componentDidMount() {
    //this.handleName()
    axios.get('/imga',{
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then( res => res.json())
    .then(res => {
      this.setState({image:res.image})
    })
}
    
  render() {

    return (
      <div>
      image
      </div>
    )
  }
}
