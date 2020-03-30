import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Column from '../components/board/column';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

const data = [
    {
        naam: "TODO",
        type: "TODO",
        
    },
    {
        naam: "DOING",
        type: "DOING",
        
    },
    {
        naam: "DONE",
        type: "DONE",
        
    }
]



class BoardView extends Component{

    onDragEnd = (result) =>{
        const {destination, source, type, draggableId} = result;
        console.log(destination);
        console.log(source);
        console.log(type);
        console.log(draggableId);
    }
    
    render(){
        let colCount = 3;
        let widthPerCol = Math.round(11/colCount);

        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="container px-0">
                        <Droppable droppableId="1" type="column" direction="horizontal">
                            { (provided, snapshots)=>(
                                   
                                        <div className="row board" ref={provided.innerRef} {...provided.droppableProps}>
                                            {data.map((col, index)=>{
                                                return (
                                                    <Column type={col.type} name={col.naam} col={widthPerCol} index={index} key={index}/>
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

export default BoardView;