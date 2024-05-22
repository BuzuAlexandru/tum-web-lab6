import React, {useEffect, useReducer} from 'react';
import Container from '@mui/material/Container';
import TaskCard from "./TaskCard.jsx";
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {addTaskData} from "../redux-toolkit/slices/taskSlice.js";

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

export default function ContentBoard(props) {
    // let initialCardData = [
    //     {
    //         id: 0,
    //         title: 'PW Lab 6',
    //         favourite: false,
    //         archived: false,
    //         tasks: [
    //             {
    //                 id: 0,
    //                 description: 'Dark mode',
    //                 completed: true,
    //             },
    //             {
    //                 id: 1,
    //                 description: 'Entities that can be manipulated',
    //                 completed: false,
    //             },
    //             {
    //                 id: 2,
    //                 description: 'Store some of the state in localStorage',
    //                 completed: false,
    //             }
    //         ]
    //     },
    //     {
    //         id: 1,
    //         title: 'PW Lab 7',
    //         favourite: false,
    //         archived: false,
    //         tasks: [
    //             {
    //                 id: 3,
    //                 description: 'Implement CRUD operations with JWT token',
    //                 completed: false,
    //             },
    //             {
    //                 id: 4,
    //                 description: 'Swagger documentation',
    //                 completed: false,
    //             },
    //             {
    //                 id: 5,
    //                 description: 'Implement queries to handle large data',
    //                 completed: false,
    //             }
    //         ]
    //     },
    // ]
    // const [taskCardData, setTaskCardData] = React.useState(initialCardData)
    const taskCardData = useSelector((state) => state.task)
    const dispatch = useDispatch()
    function addTaskCard() {
        let newCard ={
            id: taskCardData[taskCardData.length-1].id + 1,
            title: 'New Task Card',
            favourite: false,
            archived: false,
            tasks: [],
        }
        // taskCardData.push(newCard)
        // setTaskCardData(taskCardData => [...taskCardData, newCard])
        dispatch(addTaskData(newCard))
        console.log(taskCardData)
    }

    return(
        <Container sx={{
            minHeight:'89vh',
            height: 'fit-content',
            width: '100%',
            padding: '25px',
            boxSizing: 'border-box',
            display: 'flex',
            alignContent: 'flex-top',
            justifyContent:'space-evenly',
            flexWrap: 'wrap'
        }} maxWidth="lg">
            {taskCardData && taskCardData.length > 0 ? (
                [...taskCardData].sort(function(a,b){return b.favourite-a.favourite}).map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))):(<></>)}
            <Box sx={{
                height:'50vh',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Button
                    variant='outlined'
                    sx={{height:'100px', width:'100px'}}
                    onClick={addTaskCard}
                >
                    <Add/>
                </Button>
            </Box>

        </Container>
    )
}