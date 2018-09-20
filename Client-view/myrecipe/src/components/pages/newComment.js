import React, { Component } from 'react'
import axios from 'axios'

export default class newComment extends Component {
    constructor(){
        super();
        this.state = {
            text:''
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
        const id = JSON.parse(localStorage.getItem('recipeId'))
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
        .then(res =>{
            console.log(res)
            alert(res.message)
        })
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
         <div class="container">
         <div class="row">
             <div style={{width:'30%', margin:'25px auto'}}>
             <h1 style={{textAlign:'center'}}>Add a new comment to post</h1>
                     <div class="form-group">
                         <input  type="text" class="form-control"  value={this.state.text} onChange={this.handleText} placeholder="Type your here"/>
                     </div>
                     <div class="form-group">
                         <button class="btn btn-lg btn-primary btn-block" onClick={this.handleClick}>Submit</button>
                     </div>
                 <a href="/recipe">Go back to recipes</a>   
             </div>
                      
         </div>
         
     </div>
      </div>
    )
  }
}
