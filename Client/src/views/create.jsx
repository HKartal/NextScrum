//wouter
import React, { Component } from 'react';
import {reqWithAuth} from '../utils/functions';

class create extends Component {

  createProject = (ev) =>{
    let section =  ev.currentTarget.closest("section");
    let projName = section.querySelector("#projectNameInput").value.trim();
    if(projName.length === 0){
      section.querySelector(".proj-name-alert").classList.remove("display-none");
      return;
    }
    
    section.querySelector(".proj-name-alert").classList.add("display-none");
    
    reqWithAuth("project/create", {
      name: projName
    }, "POST").then((res)=>{
      console.log(res);
    });


  }

  render() {
    return(
      <div className="container">
          <section className="col-lg-4 offset-lg-4"> 
              <h3>Project aanmaken</h3>
              <div>
                <div className="alert alert-danger proj-name-alert display-none">Geef een geldig project naam op!</div>
                <div className="form-group">
                  <label htmlFor="projectNameInput">Project naam</label>
                  <input type="text" name="" id="projectNameInput" className="form-control"/>
                </div>
              <button onClick={this.createProject} className="btn-accent btn">Project aanmaken</button>
              </div>
          </section>
        </div>
      
      


    )
  }
}

export default create;
