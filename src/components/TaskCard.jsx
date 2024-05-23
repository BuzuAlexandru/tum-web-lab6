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
// import {editing} from "../redux-toolkit/slices/editorSlice.js";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function TaskCard({task}) {
    const [editingTitle, setEditingTitle] = React.useState(false)

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

    const handleTitleChange = (title) => {
        if (title!==task.title){
            let newTask = {...task}
            newTask.title = title
            dispatch(updateTaskData(newTask))
        }
    }

    const handleEdit = () => {
        setEditingTitle(true)
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
                title={editingTitle?(
                    <TextField
                        size="small"
                        defaultValue={task.title}
                        onKeyDown={(e)=>{if(e.keyCode == 13){
                            handleTitleChange(e.target.value)
                            setEditingTitle(false)
                        }}}
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
                        <MenuItem disabled={editingTitle} onClick={handleEdit}>Edit</MenuItem>
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
                                secondaryAction={editingTitle?
                                    (<IconButton onMouseDown={(e)=>{
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
                                    <ListItemText sx={
                                        {
                                            textDecoration: value.completed?
                                                "line-through" : "none"
                                        }} id={labelId} primary={value.description} />
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
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon sx={{color: '#ffc107'}} />}
                    onChange={handleFavorite}

                />
                {editingTitle?(<Button
                    sx={{
                        float: 'right'
                    }}
                    onClick={() => {
                        setEditingTitle(false)
                    }}
                    variant={'contained'}
                >
                    Done
                </Button>):(<></>)}
            </CardActions>
        </Card></div>
    );
}