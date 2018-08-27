import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Rcard from './recipe.jpg'
//import '../css/Spinner.css'
import './pic.css'


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
            isLoading:false
        }
        this.getSingleRecipe = this.getSingleRecipe.bind(this)
    }
    getSingleRecipe(id){
         axios.get(`/recipe/get/${id}`)
        .then(res =>{
            console.log(res)
            this.setState({recipe:res.data.recipe.name,
            photo:res.data.recipe.photo,
            ingredients:res.data.recipe.ingredients,
            procedure:res.data.recipe.procedure,
            author:res.data.recipe.author,
            id:res.data.recipe._id
            })
        } )
        .catch(err => console.log(err))
    }
    componentDidMount = () => {
      const recipe = this.getSingleRecipe(this.props.match.params.id)
      this.setState({recipe})
    }
    
    
  render() {
      const {recipe, photo, ingredients, procedure, author, id, description, isLoading} = this.state
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
                    <h4>{recipe}</h4>
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
            </div>
            </div>
            
  </div>

    )
  }
}
