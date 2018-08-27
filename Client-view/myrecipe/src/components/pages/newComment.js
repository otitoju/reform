import React, { Component } from 'react'
import axios from 'axios'

export default class newComment extends Component {
    constructor(){
        super();
        this.state = {
            text:null
        }
        this.handleClick = this.handleClick.bind(this)
        // this.handleComment = this.handleComment.bind(this)
        // this.handleName = this.handleName.bind(this)
        this.handleText = this.handleText.bind(this)
    }
    componentDidMount(){
        const token = JSON.parse(localStorage.getItem('token'))
    }
    handleClick(e){
        const token = JSON.parse(localStorage.getItem('token'))
        const id = JSON.parse(localStorage.getItem('userId'))
        e.preventDefault()
        fetch(`/comment/${id}`, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
                text:this.state.text
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    // handleComment(e){
    //     this.setState({
    //         comment:e.target.value
    //     })
    // }
    // handleName(e){
    //     this.setState({
    //         name:e.target.value
    //     })
    // }
    handleText(e){
        this.setState({
            text:e.target.value
        })
    }
  render() {
    return (
      <div>
        <div>
            <h1>Add new comment here</h1>
            <input type="text" placeholder="Enter your text..." value={this.state.text} onChange={this.handleText}/>
            <button onClick={this.handleClick} data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Add</button>
        </div>
      </div>
    )
  }
}
