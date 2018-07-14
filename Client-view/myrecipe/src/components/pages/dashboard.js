import React, { Component } from 'react'

export default class dashboard extends Component {
constructor(){
    super()
this.handleName=this.handleName.bind(this)
}
componentDidMount() {
    this.handleName()
}
handleName(){
    var local = JSON.parse(localStorage.getItem('token'))
    console.log(local)
    var a = document.getElementsByTagName('h2')
    a.innerHTML = local
}
    
  render() {
    return (
      <div>
        <h1>Welcome to dashboard </h1>
        <h2></h2>
      </div>
    )
  }
}
