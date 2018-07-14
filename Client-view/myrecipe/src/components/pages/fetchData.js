import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/fetchdata.css'
import pic from './images.jpg'

export default class fetchData extends Component {
    constructor(){
        super()
        this.state = {
            allRecipe:[],
            username:'',
            isLoading:true
        }
        this.handleView = this.handleView.bind(this)
        this.logout = this.logout.bind(this)
        this.viewProfile = this.viewProfile.bind(this)
    }
    handleView(e){
        e.preventDefault()
        const token = JSON.parse(localStorage.getItem('token'))
        fetch('/recipe/get/:id', {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
        .then(res => res.json())
        .then(result => (result))
        .catch(err => console.log(err))
    }
    
    componentDidMount(){
        const token = JSON.parse(localStorage.getItem('token'));
            if(!token){
                this.props.history.push('/')
            }
            else{
                fetch('/recipe/get', {
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    }
        
                })
                .then(res => res.json())
                .then(result => this.setState({
                    allRecipe:result.recipe,
                    isLoading:false,
                    username:result.name
                    }) )
                .catch(err => console.log(err))
            }
            
    
    }
    logout(){
        const logout = localStorage.removeItem('token')
        if(logout){
            this.props.history.push('/')
        }
    }
    viewProfile(){
       this.props.history.push('/userprofile')
    }
  render() {
      const {allRecipe, isLoading, username } = this.state
    return (
      <div>
          <p id="username">Welcome { username } </p>
            <h1>Recipes</h1>
            <p>
                <div id="buttons">
                        <button className="btn btn-default" onClick={this.viewProfile} id="view">View profile</button>
                        <Link to="/"><button className="btn btn-default" onClick={this.logout} id="logout">Logout</button></Link>
                </div>
                </p>
                <div>
            <div className="col-sm-6 col-md-4" id="row">
                    {allRecipe.map(rec => {
                        const {_id,name, ingredients, procedure} = rec
                        return <div className="card-panel" key={_id}>
                                <img src={pic}/>
                                <div className="caption">
                            <h3>{name}</h3>
                                <ul>
                                    <h4>posted by Author</h4>
                                    <li><h6>Ingredients: {ingredients}</h6></li>
                                    <li>Procedure: {procedure}</li>
                                </ul>
                                    <button className="btn-small" onClick={this.handleView}>View</button>
                                   </div> 
                            </div>
                    })}
                
                
            </div>
            </div>
      </div>
    )
  }
}