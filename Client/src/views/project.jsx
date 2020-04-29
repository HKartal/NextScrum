import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {reqWithAuth} from '../utils/functions';
import TicketOverview from '../components/project/ticketOverview';
import ProjectSideNav from '../components/global/projectSideNav';
import MemberOverview from '../components/project/memberOverview';

class ProjectView extends Component{

    constructor(){
        super();
        this.project_id = null;
    }

    state = {
        members: [],
        tickets: [],
        memberOverviewList: []
    };

    componentDidMount(){
        this.project_id = this.props.match.params.id;
    
      

        reqWithAuth(`project/members?project_id=${this.project_id}`, null, "GET").then((res)=>{
            if(res.status !== 200){
                throw new Error(res.status);
            }
            res.json().then((data)=>{
                let memberOverviewList = [];
                data.members.forEach(member=>{
                    member.pending = false;
                    memberOverviewList.push(member);
                });
                
                let members = [...this.state.memberOverviewList, ...data.members];
                this.setState({
                    memberOverviewList: members,
                });
                
            })

        }).catch((err)=>{
            if(err.message === "401"){
                console.log("Login required");
            }
        });

        reqWithAuth(`project/invites?project_id=${this.project_id}`, null, "GET").then((res)=>{
            res.json().then(data=>{
                let memberOverviewList = [];
                data.pending.forEach(member=>{
                    member.pending = true;
                    memberOverviewList.push(member);
                });
               let members = [...this.state.memberOverviewList, ...memberOverviewList];
               this.setState({
                   memberOverviewList: members,
               });
            });
        })

        reqWithAuth(`board/tickets?project_id=${this.project_id}`, null, "GET").then((res)=>{
            if(res.status !== 200){
                throw new Error(res.status);
            }
            res.json().then(data=>this.setState({tickets: data.tickets}));

        }).catch((err)=>{
            if(err.message === "401"){
                console.log("Login required");
            }
        });

    }

    deleteInvite = (e) =>{
        console.log(e.currentTarget);

        let toRemove = e.currentTarget.dataset.id;



        reqWithAuth('project/invite', {
            toRemove,
            project_id: this.project_id,
        }, "DELETE").then(res=>{
            if(res.status !== 200){
                console.log("NO PERMISSION");
                return;
            }
           let members = [...this.state.memberOverviewList];
           console.log(members, toRemove);
           let memberToRemove = members.filter(member => member.id === parseInt(toRemove))[0];
           members.splice(members.indexOf(memberToRemove), 1);
           console.log(members, memberToRemove);
           this.setState({
               members,
               memberOverviewList: members
           });
        });

    }
   

    render(){
        const {match} =this.props;
        console.log(this.state.members);
        return (
            <React.Fragment>
                
                <div className="container-fluid  pl-0 vh-80">
                    <div className="row">
                        <ProjectSideNav/>
                        <MemberOverview inviteDelete={this.deleteInvite} members={this.state.memberOverviewList}  project_id={match.params.id}/>
                        <TicketOverview project_id={match.params.id} tickets={this.state.tickets}/>  
                    </div>
                </div>
            </React.Fragment>
            

        );
    }

}

export default withRouter(ProjectView);