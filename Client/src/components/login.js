import React, { Component } from 'react';
import { Grid, Cell, List, ListItem, ListItemContent } from 'react-mdl';



class login extends Component {
  render() {
    return(
      <div style={{width: '100%', margin: 'auto'}}>
        <Grid className="landing-grid">
          <Cell col={12}>
            <div className="banner-text">
              <h3>LOGIN</h3>

            <hr/>
            
            <p>sign in or make a account</p>


            </div>
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default login;
