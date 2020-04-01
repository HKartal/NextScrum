/**
 * @author Rick van 't Ooster
 */

import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Draggable, Droppable} from 'react-beautiful-dnd';
import BoardTicket from './ticket';


class Column extends Component{
    render(){
        const {col, index, type, id, tickets} = this.props;
        const COLWIDTH = "col-lg-" + col;
        const COLTYPE = type;
        
        return(
                <Draggable draggableId={`column-${index}`} index={index}>
                    {(provided, snapshots) =>{
                        return(
                            <div className={"boardColumn " + COLWIDTH + " " + COLTYPE}   ref={provided.innerRef}  {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                                <h6 className="colName">{this.props.name}</h6>
                                <Droppable droppableId={`column-ticket-list-${id}`} type="ticket">
                                    {
                                        provided =>(
                                            <div  className="column-ticket-section" ref={provided.innerRef} {...provided.droppableProps}>
                                                {tickets.map((ticket, index)=>{
                                                    
                                                    return (
                                                        <BoardTicket title={ticket.title} number={index} ticketNumber={ticket.ticketNumber}
                                                            storypoints={ticket.storypoints} ticket_id={ticket.ticket_id} key={ticket.ticket_id}/>
                                                    )

                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )

                                    }
                                </Droppable>
                            </div>
                            )
                           
                        }
                        
                    }
                </Draggable>
          

        )
    }
}

export default Column;