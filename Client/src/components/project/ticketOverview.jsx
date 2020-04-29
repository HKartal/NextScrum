import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
// import {reqWithAuth} from '../../utils/functions';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import SingleTicket from './singleTicket';



class TicketOverview extends Component{

    state = {
        newTicket: false,
    }

    goToTicketCreate = () =>{
       this.setState({newTicket: true});
    }


    render(){
        const {tickets} = this.props;
       
        if(tickets === undefined || tickets.length === 0){
            return (
            <div className="col-lg-7 ticket-overview px-0 mt-5">
                {this.state.newTicket ? <Redirect to={`/ticket/${this.props.project_id}`} /> : null }
                <div className="ticket-overview-head">
                    <span className="ticket-overview-caption ml-2 mr-2 mt-1">Tickets</span>
            
                    <button onClick={this.goToTicketCreate} className="btn btn-primary add-ticket-btn"> + </button>
                </div>
                <hr/>
                <section className="ticket-wrapper">
                    <h4>Er bestaan nog geen tickets!</h4>
                </section>
                
            </div>
    
            );
        }
        return (
            <div className="col-lg-7 ticket-overview  px-0 mt-5">
                {this.state.newTicket ? <Redirect to={`/ticket/${this.props.project_id}`} /> : null }
                <div className="ticket-overview-head">
                    <span className="ticket-overview-caption ml-2 mr-2 mt-1">Tickets</span>
                    <button onClick={this.goToTicketCreate} className="btn btn-primary add-ticket-btn"> + </button>
                </div>
                <hr/>
                 <section className="ticket-wrapper">
                   {tickets.map((ticket, index)=>{
                       return (
                            <SingleTicket ticketKey={index} key={index} title={ticket.ticketTitle} storypoints={ticket.storypoints} priority={ticket.priority}/>

                       );
                   })}
                </section>
                
            </div>

        )
    }

}

export default withRouter(TicketOverview);