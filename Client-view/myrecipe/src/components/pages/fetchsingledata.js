import React, { Component } from 'react'

export default class fetchsingledata extends Component {
    constructor() {
        super();
        this.state = {
            single:[]
        }
    }
    componentDidMount = () => {
      fetch('', {
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'Authorization':`Bearer ${token}` 
          }
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
            single: res
        })
      })
    }
    
  render() {
      const allSingles = this.state.single
    return (
      <div>
        
      </div>
    )
  }
}
