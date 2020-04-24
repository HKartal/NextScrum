<<<<<<< HEAD
//atuer: jermain schifferling
/*import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Education from './education';
import Experience from './experience';
=======
//wouter
import React, { Component } from 'react';
import { Grid, Cell, List, ListItem, ListItemContent} from 'react-mdl';
>>>>>>> c5aa98b9b9be2593599c575f59a378c94a355fbe



class register extends React.Component {
  state = {
    username: '',
    password: '',
  }

  onChange = (e) => {
    if (e.target.name === 'isAdmin') {
      this.setState({
        [e.target.name]: e.target.checked,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    });
    console.log(response);
  }

  render() {
    return (
      <div>
        <Input
          name='username'
          placeholder='Username'
          onChange={e => this.onChange(e)}
          value={this.state.username} />
      
        <Input
          name='password'
          placeholder='Password'
          type='password'
          onChange={e => this.onChange(e)}
          value={this.state.password} />
    
      

        <br />
        <Button onClick={() => this.onSubmit()} type="primary">Primary</Button>
      </div>
    );
  }
}

const mutation = gql`
mutation($username: String!, $email: String!, $password: String!, $isAdmin: Boolean) {
	register(username: $username, email: $email, password: $password, isAdmin: $isAdmin) {
	  id
	} 
}
`;

export default graphql(mutation)(register); */ 