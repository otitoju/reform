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
            isLoading:true,
            search:''
        }
        this.handleView = this.handleView.bind(this)
        this.logout = this.logout.bind(this)
        this.viewProfile = this.viewProfile.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleText = this.handleText.bind(this)
    }
    handleText(e){
        this.setState({search:e.target.value})
    }
    handleSearch(e){
        e.preventDefault()
        fetch('/search', {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
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
        //let a = document.getElementById('pres').style.visibility='visible'
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
                .then(result => {
                    //let b = document.getElementById('pres').style.visibility='hidden'
                    this.setState({
                    allRecipe:result.recipe,
                    isLoading:false,
                    username:result.name
                    }) })
                .catch(err => console.log(err))
            }
            
    
    }
    logout(){
        const logout = localStorage.removeItem('token')
        localStorage.removeItem('userId')
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
                                    <button className="btn btn-default" onClick={this.viewProfile} id="view">View profile</button>
                                </li>
                                <li className="nav-item">
                                    <Link to="/"><button className="btn btn-default red" onClick={this.logout} id="logout">Logout</button></Link>
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
                </nav>
          <p id="username">Welcome { username } </p>
          <form className="form-inline" onSubmit={this.handleSearch} method="GET">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search recipe name" value={this.state.search} onChange={this.handleText}/>
                                <input type="submit" className="form-control" value="Search" />
                            </div>
                        </form>
            <h1>Recipes</h1>
           
            
            <p>
                <div id="buttons">
                        <button className="btn btn-default" onClick={this.viewProfile} id="view">View profile</button>
                        <Link to="/"><button className="btn btn-default red" onClick={this.logout} id="logout">Logout</button></Link>
                </div>
                </p>
                <div>
            <div className="col-sm-6 col-md-4" id="row">
                    {allRecipe.map(rec => {
                        const {_id,name, ingredients, procedure, photo, author, time} = rec
                        return <div className="card-panel" key={_id}>
                                <img src={photo}/>
                                <div className="caption">
                                    <h3><strong>{name}</strong></h3>
                                        <ul>
                                            <h4>posted by {author}</h4>
                                            <p id="time">time: {time}</p>
                                        </ul>
                                    <Link to={`post/${_id}`}><button className="btn-small" >View</button></Link>
                                   </div> 
                            </div>
                    })}
                
                
            </div>
            </div>
      </div>
    )
  }
}