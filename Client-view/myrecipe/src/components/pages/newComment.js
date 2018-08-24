import React, { Component } from 'react'
import axios from 'axios'

export default class newComment extends Component {
    constructor(){
        super();
        this.state = {
            name:'',
            comment:'',
            text:''
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleComment = this.handleComment.bind(this)
        this.handleName = this.handleName.bind(this)
    }
    handleClick(e){
        e.preventDefault()
        fetch('/comment', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:this.state.name,
                comment:this.state.comment,
                text:this.state.text
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    handleComment(e){
        this.setState({
            comment:e.target.value
        })
    }
    handleName(e){
        this.setState({
            name:e.target.value
        })
    }
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
            <input type="text" placeholder="Enter your name here" value={this.state.name} onChange={this.handleName}/>
            <input type="text" placeholder="Enter your comment..." value={this.state.comment} onChange={this.handleComment}/>
            <input type="text" placeholder="Enter your text..." value={this.state.text} onChange={this.handleText.bind(this)}/>
            <button onClick={this.handleClick}>Add</button>
        </div>
      </div>
    )
  }
}
