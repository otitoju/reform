import React, { Component } from 'react'
//import '../css/materialize.min.css'
//import '../css/MaterialDesign-Webfont-master/css/materialdesignicons.min.css'
import axios from 'axios'

export default class  extends Component {
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
        
        <img src={msg} alt="Preview"/>
            <input type="text" value={this.state.name} onChange={this.handleName}/>
            <label>
                
                    <input type="file" onChange={this.handleChange} />
            </label>
            <button onClick={this.handleView} >Upload</button>
        
        
      </div>
    )
  }
}
