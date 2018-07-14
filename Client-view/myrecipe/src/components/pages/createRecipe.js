import React, { Component } from 'react'
import '../css/bootstrap.min.css'
import '../css/recipe.css'


export default class createRecipe extends Component {
    constructor(){
        super()
        this.state = {
            name:"",
            ingredients:[],
            procedure:[]
        }
        this.handleCreate = this.handleCreate.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleProcedure = this.handleProcedure.bind(this)
        this.handleIngredients = this.handleIngredients.bind(this)
    }
    handleCreate(e){
        e.preventDefault()
        fetch('/recipe', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:this.state.name,
                ingredients:this.state.ingredients,
                procedure:this.state.procedure
            })
        })
        .then(res => res.json())
        .then(res => alert(res.message))
        .catch(err => console.log(err))
    }
    handleName(e){
        this.setState({name:e.target.value})
    }
    handleIngredients(e){
        this.setState({ingredients:e.target.value})
    }
    handleProcedure(e){
        this.setState({procedure:e.target.value})
    }
    componentDidMount = () => {
      const token = JSON.parse(localStorage.getItem('AdminToken'))
      if (!token){
          this.props.history.push('/')
      }
    }
    

  render() {
    return (
      <div>
          <div className="card hoverable" id="head">
                        <div className="card-action teal lighten-1 white-text">
                            <h3>Create Recipe here</h3>
                        </div>
                        <div className="card-content">
                            <div className="form-field">
                                <label for="name">Food name</label>
                                <i className="mdi mdi-email"><input type="text" placeholder="Enter food name" value={this.state.name} onChange={this.handleName}  required/></i>
                            </div>
                            <div className="form-field">
                                <label for="ingredients">Ingredients</label>
                                <i className="mdi mdi-lock"><textarea id="textarea1" className="materialize-textarea" value={this.state.ingredients} onChange={this.handleIngredients} placeholder="Enter food ingredients"  required/></i>
                            </div>
                            <div className="form-field">
                                <label for="procedure">Procedure</label>
                                <i className="mdi mdi-lock"><textarea id="textarea1" className="materialize-textarea" value={this.state.procedure} onChange={this.handleProcedure} placeholder="Enter food procedure"  required/></i>
                            </div>
                            <div className="form-field">
                                <input type="submit" className="btn-small waves-effect" value="Create" onClick={this.handleCreate}/>
                            </div>
                        </div>
                    </div>

                    {/* <footer className="page-footer teal" id="footer">
                        <div class="footer-copyright">
                            <div class="container">
                            © 2018 Copyright
                            </div>
                        </div>
                    </footer> */}
      </div>
    )
  }
}
