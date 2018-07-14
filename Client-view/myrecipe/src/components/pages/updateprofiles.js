import React, { Component } from 'react'
import '../css/updateprofile.css'




export default class updateprofiles extends Component {
    constructor(){
        super()
        this.state ={
            name:'',
            email:'',
            secret:'',
            id:''
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleSecret = this.handleSecret.bind(this)
    }
    handleEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    handleName(e){
        this.setState({
            name:e.target.value
        })
    }
    handleSecret(e){
        this.setState({
            secret:e.target.value
        })
    }
    handleUpdate(e){
        const token = JSON.parse(localStorage.getItem('token'))
        e.preventDefault()
            fetch(`/update/${id}`, {
                method:'post',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    name:this.state.name,
                    email:this.state.email,
                    secret:this.state.secret
                })
            })
            .then(res => res.json())
            .then(res =>{
                alert(res.message)
                this.setState({
                    id:res.id
                })
            })
            .catch(err => console.log(err))
            const id = this.state.id

       
    }
    componentDidMount = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        if(!token){
            this.props.history.push('/')
        }
        const id = this.state.id
        console.log(id)
        fetch(`/update/${id}`, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                name:this.state.name,
                email:this.state.email,
                secret:this.state.secret
            })
        })
        .then(res => res.json())
        .then(res =>{
            alert(res.message)
            this.setState({
                id:res.id
            })
        })
        .catch(err => console.log(err))
    }
    
  render() {
    return (
      <div id="bodie">
          <div className="card hoverable" id="Ucard">
                  <div className="card-action teal lighten-1 white-text">
                      <h3>Change profile</h3>
                  </div>
                  <div className="card-content">
                        <div className="form-field">
                                <label Htmlfor="name">New name*</label>
                                <i className="mdi mdi-account"><input type="text" placeholder="Enter your name" value={this.state.name} onChange={this.handleName}/></i>
                        </div>
                      <div className="form-field">
                          <label Htmlfor="email">New email*</label>
                          <i className="mdi mdi-email"><input type="email" placeholder="E.g jameela@gmail.com" value={this.state.email} onChange={this.handleEmail}/></i>
                      </div>
                      <div className="form-field">
                          <label Htmlfor="secret">Secret*</label>
                          <i className="mdi mdi-security"><input type="text" placeholder="Enter a secret value" value={this.state.secret} onChange={this.handleSecret}/></i>
                      </div>
                      <div className="form-field">
                          <input type="submit" className="btn-large waves-effect" value="Update!!!" onClick={this.handleUpdate}/>
                      </div>
                  </div>
            </div>
      </div>
    )
  }
}
