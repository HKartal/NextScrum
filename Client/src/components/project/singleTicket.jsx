import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
// import {reqWithAuth} from '../../utils/functions';




class SingleTicket extends Component{

    render(){
        const {title, storypoints, priority, ticketKey} = this.props;

        let badgeClassname = `badge priority-${priority}`;
       
        let classList = "media-body board-ticket-body";
       
        return (
            <React.Fragment>
                <div className={classList}>
                    <section className="tickets-overview-ticket-body mb-2">
                        <span className="ticket-title">{title} </span>
                        <span className={badgeClassname}>{storypoints}</span>
                    </section>     
                </div>
                <hr/>
            </React.Fragment>
            );

    }

}

export default withRouter(SingleTicket);