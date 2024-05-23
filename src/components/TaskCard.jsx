import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Checkbox,
    Button,
    Menu,
    MenuItem,
    Fade,
    TextField
} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from "@mui/icons-material/Star";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import {Add, AddBox, Delete, TaskAlt} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {removeTaskCard, updateTaskData} from "../redux-toolkit/slices/taskSlice.js";
import {nanoid} from "@reduxjs/toolkit";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function TaskCard({task}) {
    const [editingMode, setEditingMode] = React.useState(false)

    const handleToggle = (value) => () => {
        let aux = [...task.tasks]
        let newTask=task.tasks.find(obj => {
            return obj.id === value
        })
        newTask={...newTask}
        newTask.completed = !newTask.completed
        for (let i = 0; i < task.tasks.length; i++) {
            if (aux[i].id === value) {
                aux.splice(i,1, newTask)
                break
            }
        }
        dispatch(updateTaskData({
            id:task.id,
            title:task.title,
            favourite:task.favourite,
            tasks:aux
        }))
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
    };
    // const editorState = useSelector((state) => state.editor)
    const dispatch = useDispatch()

    const deleteCard=()=>{
        dispatch(removeTaskCard(task.id))
    }

    const handleFavorite = () => {
        let newTask = {...task}
        newTask.favourite = !newTask.favourite
        dispatch(updateTaskData(newTask))
    }
    const [cardTitle, setCardTitle] = React.useState('')
    const [taskDescription, setTaskDescription] = React.useState([task.tasks])
    function addTaskDescription(val) {
        let aux = [...taskDescription]
        if(aux.find(obj => {
            return obj.id === val.id
        })){
            for (let i=0;i<taskDescription.length;i++) {
                if (taskDescription[i].id === val.id) {
                    aux.splice(i,1,val)
                    break
                }
            }
        }
        else {
            aux.push(val)
        }
        setTaskDescription(aux)
    }

    const handleFinishEditing = () => {
        let newTaskCard = {...task}
        if (cardTitle!==task.title && cardTitle!==''){
            newTaskCard.title = cardTitle
        }
        let aux = [...task.tasks]
        if (taskDescription.length>0){
            for(let i=0;i<taskDescription.length;i++){
                for (let j=0;j<task.tasks.length;j++){
                    if(task.tasks[j].id === taskDescription[i].id){
                        let newTask=task.tasks.find(obj => {
                            return obj.id === task.tasks[j].id
                        })
                        newTask={...newTask}
                        newTask.description = taskDescription[i].text
                        aux.splice(j,1, newTask)
                    }
                }
            }
        }

        dispatch(updateTaskData({
            id:task.id,
            title:newTaskCard.title,
            favourite:task.favourite,
            tasks:aux
        }))
        setTaskDescription([])
    }

    const handleEdit = () => {
        setEditingMode(true)
        setCardTitle(task.title)
        handleClose()
    }

    const addNewTask= () => {
        let aux = [...task.tasks]
        aux.push({
            id:Date.now() + Math.random(),
            description:'New Task',
            completed:false,
        })
        dispatch(updateTaskData({
            id:task.id,
            title:task.title,
            favourite:task.favourite,
            tasks:aux
        }))
    }

    const deleteTask = (value) => {
        let aux = [...task.tasks]
        for (let i = 0; i < task.tasks.length; i++) {
            if (aux[i].id === value) {
                aux.splice(i,1)
                break
            }
        }
        dispatch(updateTaskData({
            id:task.id,
            title:task.title,
            favourite:task.favourite,
            tasks:aux
        }))
    }

    return (
        <div style={{paddingBottom: '20px'}}>
        <Card sx={{
            width:'fit-content',
            height:'fit-content',
        }}>
            <CardHeader
                sx={{
                    paddingBottom:'5px',
                }}
                avatar={<TaskAlt/>}
                title={editingMode?(
                    <TextField
                        size="small"
                        defaultValue={task.title}
                        onChange={(e)=>{setCardTitle(e.target.value)}}
                    />)
            :(<b style={{fontSize:18}}>{task.title}</b>)}
                action={<><IconButton
                            aria-label="settings"
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem disabled={editingMode} onClick={handleEdit}>Edit</MenuItem>
                        <MenuItem sx={{color:'red'}} onClick={deleteCard}>Delete</MenuItem>
                    </Menu></>
            }/>

            <CardContent sx={{padding: '10px', paddingBottom:'5px', height:'fir-content', minHeight:'150px',}}>
                {task.tasks.length != 0 ? (
                <List sx={{ width: '100%', minWidth: 300, maxWidth: 400, bgcolor: 'background.paper' }}>
                    {task.tasks.map((value) => {
                        const labelId = `checkbox-list-label-${value.id}`;
                        return (
                            <ListItem
                                key={`task${value.id}`}
                                secondaryAction={editingMode?
                                    (<IconButton onMouseDown={()=>{
                                        deleteTask(value.id)}} edge="end" aria-label="delete-task">
                                        <Delete/>
                                    </IconButton>):(<></>)
                                }
                                disablePadding

                            >
                                <ListItemButton sx={{input:{cursor: 'arrow'}}} role={undefined} dense disableRipple>
                                    <ListItemIcon sx={{minWidth:'30px'}}>
                                        <Checkbox
                                            edge="start"
                                            checked={value.completed}
                                            onChange={handleToggle(value.id)}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    {editingMode?(
                                            <TextField
                                                sx={{
                                                    width:'100%',
                                                    maxWidth:400,
                                                }}
                                                inputProps={{style: {fontSize: 14}}}
                                                size="small"
                                                multiline={true}
                                                fullWidth={true}
                                                defaultValue={value.description}
                                                onChange={(e)=>{addTaskDescription({id:value.id, text:e.target.value})}}
                                            />):
                                    (<ListItemText sx={
                                        {
                                            textDecoration: value.completed?
                                                "line-through" : "none"
                                        }} id={labelId} primary={value.description} />)}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>):(<div></div>)}
                <Button
                    sx={{
                        width:'100%'
                    }}
                    onClick={addNewTask}
                    variant="outlined"
                >
                    <Add/>
                </Button>

            </CardContent>
            <CardActions sx={{
                paddingTop: '5px',
                display:'block',
                paddingRight: '10px'
            }}>
                <Checkbox
                    {...label}
                    checked={task.favourite}
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon sx={{color: '#ffc107'}} />}
                    onChange={handleFavorite}
                />
                {editingMode?(<Button
                    sx={{
                        float: 'right'
                    }}
                    onClick={() => {
                        setEditingMode(false)
                        handleFinishEditing()
                    }}
                    variant={'contained'}
                >
                    Done
                </Button>):(<></>)}
            </CardActions>
        </Card></div>
    );
}