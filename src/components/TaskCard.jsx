import React from 'react';
import {Card, CardHeader, CardContent, CardActions, Checkbox, Button} from "@mui/material";
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


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function TaskCard() {
    const [checked, setChecked] = React.useState([0]);

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

    return (
        <Card sx={{
            width:'fit-content'
        }}>
            <CardHeader
                sx={{
                    paddingBottom:'5px'
                }}
                avatar={<TaskAlt/>}
                title={'Lab 6 PW'}
                action={<IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>}/>
            <CardContent sx={{padding: '10px', paddingBottom:'5px'}}>
                <List sx={{ width: '100%', minWidth: 300, maxWidth: 500, bgcolor: 'background.paper' }}>
                    {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                            <ListItem
                                key={value}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <Delete />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
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

                />
            </CardActions>
        </Card>
    );
}