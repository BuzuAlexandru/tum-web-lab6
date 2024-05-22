import React from 'react';
import {Card, CardHeader, CardContent, CardActions, Checkbox, Button, Menu, MenuItem, Fade} from "@mui/material";
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
import {useDispatch} from "react-redux";
import {removeTaskCard, updateTaskData} from "../redux-toolkit/slices/taskSlice.js";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function TaskCard({task}) {
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch()
    const deleteCard=()=>{
        dispatch(removeTaskCard(task.id))
    }

    const handleFavorite = () => {
        let newTask = {...task}
        newTask.favourite = !newTask.favourite
        dispatch(updateTaskData(newTask))
    }

    return (
        <div style={{paddingBottom: '20px'}}>
        <Card sx={{
            width:'fit-content',
            height:'fit-content',
        }}>
            <CardHeader
                sx={{
                    paddingBottom:'5px'
                }}
                avatar={<TaskAlt/>}
                title={task.title}
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
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <Delete />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} dense disableRipple>
                                    <ListItemIcon sx={{minWidth:'30px'}}>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(value.id) !== -1}
                                            onChange={handleToggle(value.id)}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.description} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>):(<div></div>)}
                <Button
                    sx={{
                        width:'100%'
                    }}
                    variant="outlined"
                    // onClick={handleAddFruit}
                >
                    <Add/>
                </Button>
            </CardContent>
            <CardActions sx={{
                paddingTop: '5px'
            }}>
                <Checkbox
                    {...label}
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon sx={{color: '#ffc107'}} />}
                    onChange={handleFavorite}

                />
            </CardActions>
        </Card></div>
    );
}