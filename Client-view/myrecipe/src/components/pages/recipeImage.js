import React, { Component } from 'react'
import axios from 'axios'

export default class recipeImage extends Component {
        constructor(){
          super();
          this.state = {
            photo:'',
            msg:'',
          }
          this.handleView = this.handleView.bind(this)
          this.handleChange = this.handleChange.bind(this)
          //this.handleName = this.handleName.bind(this)

        }
        handleView(e){
          e.preventDefault()
          const data = new FormData();
          data.append('photo', this.state.photo, this.state.photo.name)
          const id = JSON.parse(localStorage.getItem('recipeId'))
          
          axios.put(`/recipeimage/${id}`,data,{
            headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }
          })
          .then(res => {
            console.log(res)
              //this.setState({msg:res.data.secure_url})
          })
          .catch(err => console.log(err))
          
        }
        handleChange(e){
          
          this.setState({photo:e.target.files[0]})
        }
        handleName(e){
            this.setState({name:e.target.value})
        }
        render() {
          const {msg} = this.state
          return (
            <div>
              
              <img src={msg}/>
                  <label>
                      choose a file
                          <input type="file" onChange={this.handleChange} />
                  </label>
                  <button onClick={this.handleView} >Submit</button>
              
              
            </div>
          )
        }
      }
