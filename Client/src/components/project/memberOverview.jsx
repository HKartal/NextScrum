import React, {Component} from 'react';
import {reqWithAuth} from '../../utils/functions';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
class MemberOverview extends Component{

    state ={
        showInviteInput: true,
        userNotFound: false,
        userInvited: false,
        members: []
    }

    inviteByEmail = (e) =>{
        e.preventDefault();
        let email = document.querySelector(".invite-email-field").value;

        reqWithAuth('project/invite', {
            toInvite: email,
            project_id: this.props.project_id,
        }, "POST").then(res=>{
            if(res.status === 404){
                this.setState({
                    userNotFound: true,
                });
                return;
            }
            res.json().then((data)=>{
                this.setState({
                    userInvited: true,
                });
            });
        });

    }

    

    inviteField = (
        <div>
            <input type="email" placeholder="email" className="w-75 invite-email-field"/>
            <button className="btn btn-primary" onClick={this.inviteByEmail}>Invite</button>
        </div>
    )
    
    
  

   

    render(){
        const {members} = this.props;
        console.log(this.state);
        return (
            <div className="col-lg-2">
                <section className="d-flex align-items-center">
                    <h5>Project members</h5>
                    <button style={{height: '36px'}} className="btn btn-primary ml-3">+</button>
               
                </section>
                <ol className="unstyled-list pl-0">
                {this.state.userNotFound ? 
                    <div className="alert alert-danger">Gebruiker met dit email adres niet gevonden</div>
                : null}
                {this.state.userInvited ? 
                    <div className="alert alert-success">Gebruiker geinvite.</div>
                : null}
                {this.state.showInviteInput ? this.inviteField : null}
                    { members !== undefined ? members.map((member, index)=>(
                        <MemberOverviewLI deleteInvite={this.props.inviteDelete} key={index} member={member}/>

                    )) : null }
                    
                </ol>
            </div>

        )

    }

}



const MemberOverviewLI = (props) =>{
    const member = props.member;
    return member.pending ? ( <li>{member.name} <button data-id={member.id} className="btn btn-danger" onClick={props.deleteInvite}><FontAwesomeIcon icon={faTrash} /></button></li> )
        : <li >{member.name}</li>
      
    
}

export default MemberOverview;