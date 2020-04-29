//wouter
import React, { Component } from 'react';
// import { Tabs, Tab, Grid, Cell,  } from 'react-mdl';
import {reqWithAuth} from '../utils/functions';
import ProjectCard from '../components/projects/projectCard';

//Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton

class Projects extends Component {
 

  state = { 
    activeTab: 0,
    projects: [], 
  
  };

  toggleCategories() {

  

    if(this.state.activeTab === 0){
      return(
        <div><h1>Scrumbord1</h1></div>
      )
    } else if(this.state.activeTab === 1) {
      return (
        <div><h1>Scrumbord2</h1></div>
      )
    } else if(this.state.activeTab === 2) {
      return (
        <div><h1>Scrumbord3</h1></div>
      )
    } else if(this.state.activeTab === 3) {
      return (
        <div><h1>Scrumbord4</h1></div>
      )
    }

  }

  gotoProject = (e) =>{
    let id = e.currentTarget.dataset.id;
    id = parseInt(id);
    this.props.history.push(`/project/${id}`);
  }

  updateTab = (tabId) =>{
    this.setState({activeTab: tabId});
    this.props.history.push(`/projects/${tabId}`);
  }

  componentDidMount(){
    reqWithAuth('project/projects', null, "GET").then(res=>{
      if(res.status !== 200){
        throw new Error("no rights");
      }
      res.json().then(data=>{
        console.log(data.projects);
        this.setState({
          projects: data.projects
        });
      });

    }).catch(err=>{
      console.log(err);
    })

  }

  render(){

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 height-50"></div>
          {this.state.projects.length !== undefined ? 
            this.state.projects.map((project, index)=>{
              return (
                <div className="col-md-2" key={index}>
                  <ProjectCard project={project} clickHandler={this.gotoProject}/>
                </div>
                )
            })
          
          : null}
        </div>
      </div>
    )

  }

  
}

export default Projects;

/*


render() {

    
   
    

    return(
      <div>
        <Tabs activeTab={this.state.activeTab} onChange={(tabId)=>{this.updateTab(tabId)}} ripple>
          <Tab>Scrumbord1</Tab>
          <Tab>Scrumbord2</Tab>
          <Tab>Scrumbord3</Tab>
          <Tab>Scrumbord4</Tab>
        </Tabs>


          <Grid>
            <Cell col={12}>
              <div className="content">{this.toggleCategories()}</div>
            </Cell>
          </Grid>


      </div>
    )
  }


*/