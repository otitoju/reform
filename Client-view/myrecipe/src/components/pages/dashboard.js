import React, { Component } from 'react'
import axios from 'axios'

export default class dashboard extends Component {
constructor(){
    super()
    this.state ={
      image:''
    }
//this.handleName=this.handleName.bind(this)
this.handleDel = this.handleDel.bind(this)
}
componentDidMount() {
    this.handleDel(this.props.match.params.id)
    // axios.get('/imga',{
    //   headers:{
    //     'Accept':'application/json',
    //     'Content-Type':'application/json'
    //   }
    // })
    // .then( res => res.json())
    // .then(res => {
    //   this.setState({image:res.image})
    // })
}
handleDel(_id){
  axios.delete(`/user/${_id}`)
  .then(res => console.log(res))
  .catch(err => console.log(err))
}
    
  render() {

    return (
      <div>
          <button onClick={this.handleDel}>DEL</button>
      </div>
    )
  }
}
