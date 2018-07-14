import React, { Component } from 'react'

export default class report extends Component {
    constructor(){
        super()
        this.state = {
            name:'',
            email:'',
            message:''
        }
        this.handleReport = this.handleReport.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleMessage = this.handleMessage.bind(this)
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
    handleMessage(e){
        this.setState({
            message:e.target.value
        })
    }
    handleReport(e){
        e.preventDefault()
        fetch('/report', {
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:this.state.name,
                email:this.state.email,
                message:this.state.message
            })
        })
        .then(res => res.json())
        .then(res => alert(res.message))
        .catch(err => console.log(err))
    }
  render() {
    return (
      <div>
        <div className="card hoverable" id="head">
                        <div className="card-action teal lighten-1 white-text">
                            <h3>Report problem here</h3>
                        </div>
                        <div className="card-content">
                            <div className="form-field">
                                <label for="name">Name</label>
                                <i className="mdi mdi-account"><input type="text" placeholder="Enter your name" value={this.state.name} onChange={this.handleName}/></i>
                            </div>
                            <div className="form-field">
                                <label for="email">Email</label>
                                <i className="mdi mdi-email"><input type="email" placeholder="Enter your email address" value={this.state.email} onChange={this.handleEmail}/></i>
                            </div>
                            <div className="form-field">
                                <label for="message">Message</label>
                                <i className="mdi mdi-message"><textarea id="textarea1" className="materialize-textarea" placeholder="Report your issue here" value={this.state.message} onChange={this.handleMessage}/></i>
                            </div>
                            <div className="form-field">
                                <input type="submit" className="btn-large waves-effect" value="Report" onClick={this.handleReport}/>
                            </div>
                        </div>
                    </div>
      </div>
    )
  }
}
