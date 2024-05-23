import React, {useEffect, useReducer} from 'react';
import Container from '@mui/material/Container';
import TaskCard from "./TaskCard.jsx";
import {Button, Fab} from "@mui/material";
import {Add} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {addTaskData} from "../redux-toolkit/slices/taskSlice.js";

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

export default function ContentBoard(props) {

    const taskCardData = useSelector((state) => state.task)


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
            </Box>

        </Container>
    )
}