/**
 * @author Rick van 't Ooster
 */

import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Column from '../components/board/column';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {withRouter} from 'react-router-dom';



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
            
        ]
    }

    onDragEnd = (result) =>{
        const {destination, source, type} = result;

        if(destination === null) return;


        let dataClone = [...this.state.data];
        if(type === 'ticket'){
            let colStart = dataClone.find(col => col.column_id === parseInt(source.droppableId.replace('column-ticket-list-', '')));
            
            let ticket = colStart.tickets.splice(source.index, 1);
            let colEnd = dataClone.find(col => col.column_id === parseInt(destination.droppableId.replace('column-ticket-list-', '')));
            colEnd.tickets.splice(destination.index, 0, ...ticket);
         
            this.setState({
                data: dataClone
            });
        }else{
          
            const [col] = dataClone.splice(source.index, 1);
            dataClone.splice(destination.index, 0, col);
           
            this.setState({
                data: dataClone
            });
        }



    }
    
    render(){
        let colCount = this.state.data.length;
        let widthPerCol = Math.floor(11/colCount);

        const {match, location, params} =this.props;
       

        return(
           
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="container px-0 mt-5">
                            <Droppable droppableId="column-list" type="column" direction="horizontal">
                                { (provided, snapshots)=>(
                                    
                                    <div className="row board row-board" ref={provided.innerRef} {...provided.droppableProps}>
                                        {this.state.data.map((col, index)=>{
                                            return (
                                                <Column type={col.type} name={col.naam} id={col.column_id} tickets={col.tickets} col={widthPerCol} index={index} key={index}/>
                                            );
                                            
                                        })}
                                        {provided.placeholder}
                                    </div>
                                            
                                )
                                    
                            }
                        </Droppable>
                    </div>
                </DragDropContext>
        
        );
    }
}

export default withRouter(BoardView);