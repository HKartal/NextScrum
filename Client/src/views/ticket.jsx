import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {reqWithAuth} from '../utils/functions';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';


class TicketCRUDView extends Component{

    state = {
        members: [],
        ticket_id: null,
        project_id: null
    }



    storyPointsModify = (e) =>{
        console.log(e.keyCode);

        if(e.keyCode === 190 || e.keyCode === 110){
            e.preventDefault();
        }

        let val = e.currentTarget.value;
        if(parseInt(val) <= 0){
            e.currrentTarget.value = 0;
        }

    }

    updateAssignee = (e) =>{
        let membersCpy = [...this.state.members];
        console.log(e.currentTarget);

        let member = membersCpy[e.currentTarget.dataset.index];

        if(!member.assignee){
            membersCpy[e.currentTarget.dataset.index].assignee = true;
        }else{
            membersCpy[e.currentTarget.dataset.index].assignee = false;
        }

       

        this.setState({members: membersCpy});
    }

    createOrUpdateTicket = (e) =>{

        let alert = document.querySelector(".field-alert");

        let assignees = [];

        let assigneesFilteredFromMembers = this.state.members.filter(member=> member.assignee !== undefined && member.assignee);

        let title = document.getElementById("ticketNameInput").value.trim();
        let description = document.getElementById("ticketDescriptionInput").value.trim();
        let priority = document.getElementById("ticketPriorityInput");
       
        let storypoints = document.getElementById("ticketStoryPointsInput").value;

        if(title.length === 0 || description.length === 0 || storypoints.length === 0){
            alert.classList.remove("display-none");
            return;
        }else{
            alert.classList.add("display-none");
        }
        storypoints = parseInt(storypoints);

        priority = priority.options[priority.selectedIndex].value;

        for(let i = 0; i < assigneesFilteredFromMembers.length; i++){
            assignees.push(assigneesFilteredFromMembers[i].id);
        }

        let project_id = this.state.project_id;

        let data = {
            title,
            description,
            priority,
            storypoints,
            project_id
        };

        if(this.state.ticket_id === null) data.assignees = assignees;

        let requestMethod = (this.state.ticket_id === null) ? "POST" : "PUT";

        reqWithAuth('board/ticket', data, requestMethod).then((res)=>{
            console.log(res);
        });

        console.log(data);
    }

    componentDidMount(){
        this.project_id = this.props.match.params.project_id;
        this.setState({project_id: this.props.match.params.project_id});
        reqWithAuth(`project/members?project_id=${this.project_id}`, null, "GET").then((res)=>{
            this.setState({members: res.members});
        });
        if(this.props.match.params.ticket_id !== undefined){
            this.setState({ticket_id: this.props.match.params.ticket_id});
        }

        reqWithAuth(`project/members?project_id=${this.project_id}`, null, "GET").then((res)=>{
            if(res.status !== 200){
                throw new Error(res.status);
            }
            res.json().then((data)=>{
                this.setState({members: data.members});
            })

        }).catch((err)=>{
            if(err.message === "401"){
                console.log("Login required");
            }
        });

    }

    render(){
        
     
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 offset-lg-4">
                        <h3>Ticket aanmaken</h3>
                        <section className="form">
                            <div className="alert alert-danger display-none field-alert">Alle velden zijn verplicht!</div>
                            <div className="form-group">
                                <label htmlFor="ticketNameInput">Ticket naam</label>
                                <input type="text" name="" id="ticketNameInput" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ticketDescriptionInput">Ticket beschrijving</label>
                                <textarea name="" id="ticketDescriptionInput" className="w-100" cols="30" rows="10"></textarea>
                            </div>
                            <section className="row" style={{paddingLeft: '15px'}}>
                                <div className="form-group">
                                    <label htmlFor="ticketPriorityInput">Prioriteit</label>
                                
                                    <select className="custom-select w-50 ml-2" id="ticketPriorityInput">
                                        <option selected value="normal">Normaal</option>
                                        <option value="medium">Boven normaal</option>
                                        <option value="high">Hoog</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ticketStoryPointsInput">Storypoints</label>
                                    <input onKeyDown={this.storyPointsModify} type="number" className="ml-2 removeNumberSpinner" name="" id="ticketStoryPointsInput" style={{width: '15%'}}/>
                                </div>
                            </section>
                           <button onClick={this.createOrUpdateTicket} className="btn btn-primary">Ticket aanmaken</button>
                        </section>
                    </div>
                    <div className="col-lg-2">
                        <h4>Toewijzen aan</h4>
                        <ol className="list-group">

                            {this.state.members === undefined ? 
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            : this.state.members.map((member, index)=>{
                                let classText = "list-group-item cursor-pointer";
                                
                                if((member.assignee !== undefined && !member.assignee) || member.assignee === undefined){
                                    classText = "font-weight-bold list-group-item cursor-pointer";
                                }else{
                                    classText = "font-weight-bold list-group-item cursor-pointer active";
                                }
                                return (
                                    <li className={classText} onClick={this.updateAssignee} data-index={index} key={index}>{member.name}</li>
                                    
                                )
                            
                            })}

                            
                         </ol>
                    </div>
                </div>
            </div>

        )

    }



}

export default withRouter(TicketCRUDView);