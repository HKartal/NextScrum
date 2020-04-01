import React, { Component } from 'react';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Main from './components/main';
import { Link } from 'react-router-dom';
import Logo from './nextscrumlogo.png';


class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
    <Layout>
        <Header className="header" title={<Link style={{textDecoration: 'none', color: 'white'}} to="/"><img className="logo" alt="" src={Logo}/></Link>} scroll>
            <Navigation>
                <Link to="/home">home</Link>
                <Link to="/create">Create</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/login">Log in</Link>
            </Navigation>
        </Header>
        <Drawer title={<Link style={{textDecoration: 'none', color: 'black'}} to="/">NextScrum</Link>}>
            <Navigation>
              <Link to="/home">home</Link>
              <Link to="/create">Create</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/login">Log in</Link>
            </Navigation>
        </Drawer>
        <Content>
            <div className="page-content" />
            <Main/>
        </Content>
    </Layout>
</div>

    );
  }
}

export default App;
