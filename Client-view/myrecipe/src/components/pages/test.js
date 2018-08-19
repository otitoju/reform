import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class test extends Component {
  constructor(){
    super();
    this.state = {
      pic:'',
      msg:'',
      name:''
    }
    this.handleView = this.handleView.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleName = this.handleName.bind(this)

  }
  handleView(e){
    e.preventDefault()
    const data = new FormData();
    data.append('pic', this.state.pic, this.state.pic.name)
    const id = JSON.parse(localStorage.getItem('userId'))
    
    axios.put(`/img/${id}`,data,{
      headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          }
          //body:JSON.stringify({name:this.state.name})
    })
    // .then(res => res.json())
    .then(res => {
      console.log(res)
        //this.setState({msg:res.data.secure_url})
    })
    .catch(err => console.log(err))
    
  }
  handleChange(e){
    //console.log(e.target.files[0])
    this.setState({pic:e.target.files[0]})
  }
  handleName(e){
      this.setState({name:e.target.value})
  }
  render() {
    const {msg} = this.state
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                    <Link className="navbar-brand" to="/">
                            Online Recipe
                        </Link>
                        <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
        
                                <li className="nav-item">
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
        </nav>
        <h1>Hello</h1>
        <div className="col-md-4 col-md-offset-4">
        <div class="card">
              <div className="panel-heading  bg-dark" style={{color:'white'}}>
                <h3 class="panel-title">Upload image here</h3>
              </div>
              <div  className="card-image">
                <img src={msg} alt="Preview"  className="card-img-top"/>
                </div>
                <div className="card-content">
                {/* <input type="text" value={this.state.name} onChange={this.handleName}/> */}
            
                    <input type="file" onChange={this.handleChange} /><br/>
            <button onClick={this.handleView} className="btn btn-primary">Upload</button>
                </div>
            
        </div>  
        </div>
      </div>
    )
  }
}
