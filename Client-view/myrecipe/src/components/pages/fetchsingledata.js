import React, { Component } from 'react'
import axios from 'axios'

export default class fetchsingledata extends Component {
    constructor() {
        super();
        this.state = {
            recipe:null,
            photo:'',
            ingredients:'',
            procedure:''
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
            procedure:res.data.recipe.procedure
            })
        } )
        .catch(err => console.log(err))
    }
    componentDidMount = () => {
      const recipe = this.getSingleRecipe(this.props.match.params.id)
      this.setState({recipe})
    }
    
    
  render() {
      const {recipe, photo, ingredients, procedure} = this.state
    return (
        <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src={photo}/>
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>
    )
  }
}
