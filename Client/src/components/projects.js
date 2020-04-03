//wouter
import React, { Component } from 'react';
import { Tabs, Tab, Grid, Cell,  Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton} from 'react-mdl';


class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

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

  updateTab = (tabId) =>{
    this.setState({activeTab: tabId});
    this.props.history.push(`/projects/${tabId}`);
  }

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
}

export default Projects;
