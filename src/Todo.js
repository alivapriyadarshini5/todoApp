import { Button, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core'
import React from 'react'
import db from './Firebase'
import { DeleteForever } from '@material-ui/icons'
import { useState } from 'react'
import './Todo.css'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
const Todo = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState(props.todo.todo)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const updateTodo = () => {
        //update the todo with the new input text
        db.collection("todos").doc(props.todo.id).set({
            todo: input
        }, { merge: true })
        setOpen(false)
    }

    return (
        <>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    <h1>i am a modal</h1>
                    <input value={input} placeholder={props.todo.todo} onChange={event => setInput(event.target.value)} />
                    <Button onClick={updateTodo}>Update Todo</Button>
                </div>
            </Modal>
            <List >
                <ListItem>
                    <ListItemAvatar>
                        {/* <Avatar><ImageIcon /></Avatar> */}
                    </ListItemAvatar>
                    <ListItemText primary={props.todo.todo} secondary="Dummy Deadline ⏰ " />
                </ListItem>
                {/* <Button onClick={setOpen(true)}>Edit</Button> */}
                <button type="button" onClick={handleOpen}>
                    EDIT
                </button>
                <DeleteForever onClick=
                    {event => db.collection('todos').doc(props.todo.id).delete()}>
                </DeleteForever>
            </List>
        </>
    )
}

export default Todo
