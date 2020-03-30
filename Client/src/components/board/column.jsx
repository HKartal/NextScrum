import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Draggable, Droppable} from 'react-beautiful-dnd';



class Column extends Component{
    render(){
        const {col, index, type} = this.props;
        const COLWIDTH = "col-lg-" + col;
        const COLTYPE = type;
        
        return(
                <Draggable draggableId={`${index}`} index={index}>
                    {(provided, snapshots) =>{
                        return(
                            <div className={"boardColumn " + COLWIDTH + " " + COLTYPE}   ref={provided.innerRef}  {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                                <h1 className="colName">{this.props.name}</h1>
                                
                            </div>
                            )
                           
                        }
                        
                    }
                </Draggable>
          

        )
    }
}

export default Column;