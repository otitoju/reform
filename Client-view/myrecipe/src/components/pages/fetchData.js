import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import '../css/fetchdata.css'
import pic from './images.jpg'
import '../css/Spinner.css'
import './pic.css'

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
        //"proxy":"https://rocky-atoll-10994.herokuapp.com/"
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
                        <h1 style={{fontStyle:'italic', fontFamily: 'Brush Script MT',fontWeight: 'bolder',fontSize: '30px'}}> Nice Recipe</h1>
                    </Link>
                        <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <form className="form-inline" onSubmit={this.handleSearch} method="GET">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search recipe name" value={this.state.search} onChange={this.handleText}/>
                                <input type="submit" className="btn btn-primary" value="Search" />
                            </div>
                        </form>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                <p style={{color:'white'}}>Welcome, { username } </p>
                                </li>
                            
                    <div class="col-md-2">
                            <div class="dropdown">
                            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Profile
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                                <li className="nav-item" onClick={this.viewProfile}>
                                                    <button className="btn btn-default" onClick={this.viewProfile} id="view">profile</button>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/"><button className="btn btn-default red" onClick={this.logout} id="logout">Logout {username}</button></Link>
                                                </li>
                            </ul>
                            </div>
                </div>
                            </ul>
                        
                        </div>
                    </div>
        </nav>
       {isLoading && <div className='Loader' id="load">Loading...</div>}
            <h1 className="card-title">Recipes</h1>
           
        <div className="card-deck">
            <div  className="col-md-4 col-md-offset-4">
                    {allRecipe.map(rec => {
                        const {_id,name, ingredients, procedure, photo, author, time} = rec
                        return <div className="card" key={_id}>
                                <img src={photo} className="card-img-top"  alt="food image"/>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>{name}</strong></h5>
                                        <ul>
                                            <h4 className="card-text">posted by {author}</h4>
                                            <p className="card-text">time: {time}</p>
                                        </ul>
                                    <Link to={`post/${_id}`}><button className="btn btn-primary" >View</button></Link>
                                   </div> 
                                   <div class="card-footer">
                                    <small class="text-muted">Created by otitoju oluwapelumi</small>
                                    </div>
                            </div>
                    })}
                
                
            </div>
            </div>
      </div>
    )
  }
}