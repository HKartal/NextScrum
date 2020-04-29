import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {reqWithAuth} from '../../utils/functions';


class TicketModal extends Component{

    state = {
        title: "",
        description: "",
        assignees: [], 
        members: [],
    }

   updateAssignee = (e) => {
        let index = parseInt(e.currentTarget.dataset.index);
        let member = this.state.members[index];
     
        let project_id = this.props.ticket.project_fk_id;
        let ticket_id = this.props.ticket.ticket_id;

        let membersCopy = [...this.state.members];
        membersCopy[index].assignee = !membersCopy[index].assignee;

        this.setState({
            members: membersCopy,
        });

        if(!member.assignee){
            reqWithAuth(`board/assign`, {
                assignee: member.id,
                project_id 
            }, "DELETE");
        }else{
            reqWithAuth(`board/assign`, {
                assignee: member.id,
                project_id,
                ticket_id
            }, "POST");
        }

   }

   componentDidMount(){

        let assignees = [...this.props.ticket.assignees];
        let members = [...this.props.members];

        members.forEach(member => {
            if(assignees.find(assignee => assignee.id === member.id)){

                member.assignee = true;
            }else{
                member.assignee = false;
            }
        });
    
        this.setState({
           members: this.props.members
       });

   }

    render(){
       
        const {ticketTitle, ticketDescription} = this.props.ticket;
        let members = [...this.props.members];
  
        return (
            <div className="modal display-block">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="ticket-modal-title">{ticketTitle}</span>
                            <button type="button" onClick={this.props.closeModal} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container row">
                                <div className="col-md-8">
                                    {ticketDescription}
                                </div>
                                <div className="col-md-4">
                                <ol className="unstyled-list">

                                    {members.map((member, index)=>{
                                        let classText = " cursor-pointer";
                                        
                                        if(!member.assignee){
                                            classText = "cursor-pointer";
                                        }else{
                                            classText = "font-weight-bold cursor-pointer active";
                                        }
                                        return (
                                            <li className={classText} onClick={this.updateAssignee} data-index={index} key={index}>{member.name}</li>
                                            
                                        )

                                    })}


                                </ol>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                    
                        </div>
                    </div>
                </div>
            </div>

        );


    }

}

export default TicketModal;