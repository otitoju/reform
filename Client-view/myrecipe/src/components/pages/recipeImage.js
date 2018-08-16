import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

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
            alert(res.message)
              //this.setState({msg:res.data.secure_url})
          })
          .catch(err => console.log(err))
          
        }
        handleChange(e){
          this.setState({photo:e.target.files[0]})
        }
        
        render() {
          const {msg} = this.state
          return (
            <div>
             
              <div class="col-md-9">

            <div class="panel panel-default">
              <div class="panel-heading main-color-bg">
                <h3 class="panel-title">Upload recipe image here</h3>
              </div>
              <div class="panel-body">
              <img src={msg}/>
              <div class="form-group">
                    <input type="file" class="form-control" onChange={this.handleChange}/>
              </div>
              <button onClick={this.handleView} className="btn btn-primary" >Upload</button>
              </div>
              </div>
              </div>
            </div>
          )
        }
      }
