import React, {Component} from 'react';



class ProjectCard extends Component{

    render(){
        

        const {projectName, project_id} = this.props.project;
        

        return (
            <div className="card" data-id={project_id} onClick={this.props.clickHandler}>
                <div className="card-body project-card">
                    <span className="">{projectName}</span>
                    
                </div>
            </div>
        );

    }

}

export default ProjectCard;