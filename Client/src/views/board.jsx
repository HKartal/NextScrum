/**
 * @author Rick van 't Ooster
 */

import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Column from '../components/board/column';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {withRouter} from 'react-router-dom';
import {reqWithAuth} from '../utils/functions';
import TicketModal from '../components/board/ticketModal';
import ProjectSideNav from '../components/global/projectSideNav';

class BoardView extends Component{

    state = {
        data: [
            {
                column_id: 1,
                naam: "BACKLOG",
                type: "backlog",
                tickets: [
                    
                ]
                
            },
            {   
                column_id: 2,
                naam: "TO DO",
                type: "TODO",
                tickets: [
                    {
                        title: "ticket 1",
                        storypoints: 5,
                        ticket_id: 1,
                        ticketNumber: 1
                    },
                    {
                        title: "ticket 2",
                        storypoints: 5,
                        ticket_id: 2,
                        ticketNumber: 2
                    },
                    {
                        title: "ticket 3",
                        storypoints: 5,
                        ticket_id: 3,
                        ticketNumber: 3
                    },
                    {
                        title: "ticket 4",
                        storypoints: 5,
                        ticket_id: 4,
                        ticketNumber: 4
                    }
                ]
                
            },
            {
                column_id: 3,
                naam: "IN PROGRESS",
                type: "DOING",
                tickets: [
                    {
                        title: "ticket 5",
                        storypoints: 5,
                        ticket_id: 5,
                        ticketNumber: 5
                    },
                    {
                        title: "ticket 6",
                        storypoints: 5,
                        ticket_id: 6,
                        ticketNumber: 6
                    },
                    {
                        title: "ticket 7",
                        storypoints: 5,
                        ticket_id: 7,
                        ticketNumber: 7
                    },
                    {
                        title: "ticket 8",
                        storypoints: 5,
                        ticket_id: 8,
                        ticketNumber: 8
                    }

                ]
                
            },
            {
                column_id: 4,
                naam: "DONE",
                type: "DONE",
                tickets: [
                    
                ]
                
            },
            
        ],
        project_id: -1,
        pollId: -1,
        modal: false,
        modal_ticket_id: -1,
        members: [],
        modal_ticket: null,
    }

    onDragEnd = (result) =>{
        const {destination, source, type} = result;

        if(destination === null) return;


        let dataClone = [...this.state.data];
        if(type === 'ticket'){
            let colStart = dataClone.find(col => col.column_id === parseInt(source.droppableId.replace('column-ticket-list-', '')));
            
            let ticket = colStart.tickets.splice(source.index, 1);
            let colEnd = dataClone.find(col => col.column_id === parseInt(destination.droppableId.replace('column-ticket-list-', '')));

            
        reqWithAuth(`board/move`, 
            {
                project_id: this.state.project_id,
                ticket_id: ticket[0].ticket_id,
                column_id: colEnd.column_id,
                status: colEnd.type
            }, "PUT").then((res)=>{
                if(res.status !== 200){
                    throw new Error(res.status);
                }
        }).catch((err)=>{
            if(err.message === "401"){
                console.log("Login required");
            }
        });

            colEnd.tickets.splice(destination.index, 0, ...ticket);
         
            this.setState({
                data: dataClone
            });
        }else{
          
            const [col] = dataClone.splice(source.index, 1);
            dataClone.splice(destination.index, 0, col);
            let colIdOrder = [];

            dataClone.forEach(column=>{
                colIdOrder.push(column.column_id);
            });
            console.log(colIdOrder);

            //TODO: submit new column order in request to update database.

            this.setState({
                data: dataClone
            });
        }



    }

    /**
     * To keep the board as up to date as possible we will be using polling since laravel doesn't support web sockets. 
     * We use a 1 minute timer to keep is as update as possible without doing to many requests. 
     * 
     */

    pollBoard = (initialProjId) =>{

        

        let project_id = (initialProjId === undefined || initialProjId === null) ?   this.state.project_id : initialProjId;
        
        reqWithAuth(`board/board/?project_id=${project_id}`, null, "GET").then((res)=>{
            if(res.status !== 200){
                throw new Error(res.status);
            }
            res.json().then((data)=>{
                
                this.setState({
                    data: data.board,
                
                });
              
            })
            
        }).catch((err)=>{
            if(err.message === "401"){
                console.log("Login required");
            }
        });
    }

    componentDidMount(){
        let project_id = this.props.match.params.project_id;

        let pollId = setInterval(this.pollBoard, 60*1000);

        this.setState({
            project_id: project_id,
            pollId: pollId,
        });
        
        this.pollBoard(project_id);

       
        reqWithAuth(`project/members?project_id=${project_id}`, null, "GET").then((res)=>{
            if(res.status !== 200){
                throw new Error(res.status);
            }
            res.json().then((data)=>{
                this.setState({members: data.members});
            });

            }).catch((err)=>{
                if(err.message === "401"){
                    console.log("Login required");
                }
            });
    }
    
    componentWillUnmount(){
        clearInterval(this.state.pollId);
    }

    openModal = (e) =>{
        console.log(e.currentTarget);
        let target = e.currentTarget;

        let ticket = null;

        for(let i = 0; i < this.state.data.length; i++){
            let col = this.state.data[i];
            if(col.tickets.find((ticket)=>ticket.ticket_id === parseInt(target.dataset.ticket_id)) !== undefined){
                ticket = col.tickets.find((ticket)=>ticket.ticket_id === parseInt(target.dataset.ticket_id));
                break;
            }
            
        }

        this.setState({
            modal: true,
            modal_ticket_id: parseInt(target.dataset.ticket_id),
            modal_ticket: ticket

        });

        document.querySelector("header").style.zIndex="1";
    }

   

    closeModal = (e) =>{
        this.setState({
            modal: false,
            modal_ticket_id: -1,
        });
        document.querySelector("header").style.zIndex="3";
        
        let project_id = this.props.match.params.project_id;
        this.pollBoard(project_id);

    }
    
    render(){
        let colCount = this.state.data.length;
        let widthPerCol = Math.floor(11/colCount);

       
       

        return(
            <React.Fragment>
                <div className="container-fluid pl-0">
                    <div className="row">
                        <ProjectSideNav project_id={this.props.match.params.project_id}/>

                    
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <div className="col-lg-8 px-0 mt-5">

                            {this.state.modal ? (
                                <TicketModal closeModal={this.closeModal} members={this.state.members} 
                                    ticket={this.state.modal_ticket}  ticket_id={this.state.modal_ticket_id} project_id={this.state.project_id}/>
                            ) : null}



                                    <Droppable droppableId="column-list" type="column" direction="horizontal">
                                        { (provided, snapshots)=>(
                                            
                                            <div className="row board row-board" ref={provided.innerRef} {...provided.droppableProps}>
                                                {this.state.data.map((col, index)=>{
                                                    return (
                                                        <Column project_id={this.state.project_id} type={col.type} name={col.naam} 
                                                        id={col.column_id} modal={this.openModal} tickets={col.tickets} 
                                                        col={widthPerCol} index={index} key={index}
                                                        members={this.state.members}
                                                        />
                                                    );
                                                    
                                                })}
                                                {provided.placeholder}
                                            </div>
                                                    
                                        )
                                            
                                    }
                                </Droppable>
                            </div>
                        </DragDropContext>
                    </div>
                </div>
            </React.Fragment>      
        );
    }
}

export default withRouter(BoardView);