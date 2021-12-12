import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second task" },
    { id: uuid(), content: "Third task" },
    { id: uuid(), content: "Fourth task" },
    { id: uuid(), content: "Fifth task" }
];

// const columnsFromBackend = {
//     {
//         name: "Requested",
//         items: itemsFromBackend
//     },
//     [uuid()]: {
//         name: "To do",
//         items: []
//     },
//     [uuid()]: {
//         name: "In Progress",
//         items: []
//     },
//     [uuid()]: {
//         name: "Done",
//         items: []
//     }
// };

const columnsFromBackend = [
    {
        id: '0',
        name: "Requested",
        items: itemsFromBackend
    },
    {
        id: '1',
        name: "To do",
        items: []
    },
    {
        id: '2',
        name: "In Progress",
        items: []
    },
    {
        id: '3',
        name: "Done",
        items: []
    }
];

export const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        // Find source column then remove drag items
        const sourceColumn = columns.find(data => data.id === source.droppableId);
        const sourceItems = [...sourceColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        // Find dest column then add item remove from soruce
        const destColumn = columns.find(data => data.id === destination.droppableId)
        const destItems = [...destColumn.items];
        destItems.splice(destination.index, 0, removed);

        const conversations = [ ...columns ]

        const indexSource = columns.findIndex((obj => source.droppableId === obj.id))
        conversations[indexSource].items = sourceItems

        const indexDest = columns.findIndex((obj => destination.droppableId === obj.id))
        conversations[indexDest].items = destItems

        setColumns(conversations)
    } else {
        const column = columns.find(data => data.id === source.droppableId)
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
    
        const indexConversation = columns.findIndex((obj => source.droppableId === obj.id))
        const conversations = [ ...columns ]
        conversations[indexConversation].items = copiedItems
        setColumns(conversations)
    }

};

function DragDropExample() {
    const [columns, setColumns] = useState(columnsFromBackend);

    console.log(columns)

    return (
        <div className='flex justify-center h-full'>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {columns.map((column, key) => (
                    <div className='flex flex-col items-center' key={key} >
                        <h2>{column.name}</h2>
                        <div className='m-2.5'>
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}
                                        style={{
                                            background: snapshot.isDraggingOver? "lightblue" : "lightgrey",
                                            padding: 4,
                                            width: 250,
                                            minHeight: 500
                                        }}
                                    >
                                        {column.items.map((item, key) => (
                                            <Draggable key={item.id} draggableId={item.id} index={key}>
                                                {(provided, snapshot) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                        style={{
                                                            userSelect: "none",
                                                            padding: 16,
                                                            margin: "0 0 8px 0",
                                                            minHeight: "50px",
                                                            backgroundColor: snapshot.isDragging? "#263B4A" : "#456C86",
                                                            color: "white",
                                                            ...provided.draggableProps.style
                                                        }}
                                                    >
                                                        {item.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
}

export default DragDropExample;
