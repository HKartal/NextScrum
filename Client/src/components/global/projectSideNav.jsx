import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, withRouter} from 'react-router-dom';
import { Layout, Navigation, Drawer, Header, Textfield } from 'react-mdl';
import '../../assets/material.min.css';
class ProjectSideNav extends Component{

    render(){
        const project_id = this.props.match.params.id;
        

        return (
        <div className="col-lg-2 vh-79">

            <Layout fixedDrawer >
                <Drawer title="" className="project-side-nav">
                    <Navigation>
                    <Link className="mdl-navigation__link project-nav-item" to={`/project/${project_id}`}>Overzicht</Link>
                    <Link className="mdl-navigation__link project-nav-item" to={`/board/${project_id}`}>Scrumboard</Link>
                    </Navigation>
                </Drawer>
            </Layout>
        </div>


        );
    }
}

export default withRouter(ProjectSideNav);