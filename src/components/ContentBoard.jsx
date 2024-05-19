import React from 'react';
import Container from '@mui/material/Container';
import TaskCard from "./TaskCard.jsx";
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import Box from "@mui/material/Box";


export default function ContentBoard(props) {

    return(
        <Container sx={{
            height: 'fit-content',
            width: '100%',
            padding: '25px',
            boxSizing: 'border-box',
            display: 'flex',
            alignContent: 'flex-start',
            justifyContent:'space-evenly',
            flexWrap: 'wrap'
        }} maxWidth="lg">
            <TaskCard/>
            <Box sx={{
                height:'50vh',
                // width:'10vw',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Button
                    variant='outlined'
                    sx={{height:'100px', width:'100px'}}
                >
                    <Add/>
                </Button>
            </Box>

        </Container>
    )
}