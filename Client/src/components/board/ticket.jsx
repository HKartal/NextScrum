/**
 * @author Rick van 't Ooster
 */

import React,{Component} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';

class BoardTicket extends Component{

    render(){
        const {title, storypoints, ticketNumber, ticket_id, number} = this.props;
        
        return (
            <Draggable draggableId={`ticket-${ticket_id}`} index={number}>
                {provided => (
                    <div className="media board-ticket" ref={provided.innerRef}   {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                        <div className="media-body board-ticket-body" onClick={this.props.modal} data-ticket_id={ticket_id}>
                            <section className="ticket-title-section mb-2">
                                <span className="ticket-title">{title} </span>
                            </section>
                            
                            <section className="board-ticket-footer mb-0">
                                    <span className="badge badge-primary">{storypoints}</span>
                                <span className="mr-2 board-ticket-number">Ticket: #{ticketNumber}</span>
                            </section>
                        
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }

}

export default BoardTicket;