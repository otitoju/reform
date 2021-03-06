import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Rcard from './recipe.jpg'
//import '../css/Spinner.css'
import './pic.css'
import moment from 'moment'


export default class fetchsingledata extends Component {
    constructor() {
        super();
        this.state = {
            recipe:null,
            photo:'',
            ingredients:[],
            procedure:'',
            author:'',
            id:'',
            isLoading:false,
            comment:[],
            totalComment:''
        }
        this.getSingleRecipe = this.getSingleRecipe.bind(this)
    }
    getSingleRecipe(id){
        const token = JSON.parse(localStorage.getItem('token'))
          axios.get(`/recipe/get/${id}`, token)
        .then(res =>{
            console.log(res)
            this.setState({recipe:res.data.recipe.name,
            photo:res.data.recipe.photo,
            ingredients:res.data.recipe.ingredients,
            procedure:res.data.recipe.procedure,
            author:res.data.recipe.author,
            id:res.data.recipe._id,
            comment:res.data.recipe.comments,
            totalComment:res.data.comment
            })
        } )
        .catch(err => console.log(err))
    }
    componentDidMount = (id) => {
      const recipe = this.getSingleRecipe(this.props.match.params.id)
      this.setState({recipe})
      const token = JSON.parse(localStorage.getItem('token'));
            if(!token){
                this.props.history.push('/')
            }
            
    }
    
    
    
  render() {
      const {recipe, photo, ingredients, procedure, author, id, description, isLoading, comment, totalComment} = this.state
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
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/"><button className="btn btn-default red" onClick={this.logout} id="logout">Logout</button></Link>
                                </li>
                                
                            </ul>
                        
                        </div>
                    </div>
                </nav>
                {isLoading && <div className='Loader' id="load">Loading...</div>}
            <div  className="col-md-12 " id="row">
            <div>
                    <h4>{recipe} has {totalComment} comment</h4>
            </div>  
                <div className="card">
                <div  className="col-md-4 col-md-offset-4" >
                    <div className="card-image">
                        <img src={photo} className="card-img-top" id="imgtag"/>
                        <span className="card-title"><strong><h3>Description:{description}</h3></strong></span>
                    </div>
                </div>    
                        <div className="card-content">
                            <ul>
                                <h4><strong>Ingredients:</strong></h4>
                                <li>{ingredients}</li>
                            </ul>
                            
                            <h4><strong>Procedure:</strong></h4>
                            <p className="card-text">{procedure}</p>
                        </div>
                        
                        <div class="card-footer">
                                    <small class="text-muted">Created by {author}</small>
                                    </div>
                </div>
                <div className="jumbotron">
                <Link to={`/comment/${id}`}><button>Add comment</button></Link>
                {comment.map(res => {
                    const {text, _id, created_by, date}= res
                    return <div className="row">
                        <div class="col-md-12">
                        <strong>{created_by}</strong>
                        <span class="pull-right">{moment(date).format("Do MMMM YYYY, h:mm:ss a")}</span>
                        <p>
                            {text}
                        </p>
                        </div>
                    
                    </div>
                })}
            </div>
            </div>
            
  </div>

    )
  }
}
