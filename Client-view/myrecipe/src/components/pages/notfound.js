import React, { Component } from 'react'
import '../css/error.css'

export default class notfound extends Component {
    constructor(){
        super()
    }
    // componentDidMount = () => {
    //   fetch('*',{
    //       method:'GET'
    //   })
    //   .then(res => res.json())
    //   .then(res => console.log(res.message))
    // }
    
  render() {
    return (
      <div id="bo">
        <section id="not-found">
    <div id="title">Simple Pure CSS3 &bull; 404 Error Page</div>
    <div class="circles">
      <p>404<br/>
       <small>PAGE NOT FOUND</small>
      </p>
      <span class="circle big"></span>
      <span class="circle med"></span>
      <span class="circle small"></span>
    </div>
  </section>
      </div>
    )
  }
}
