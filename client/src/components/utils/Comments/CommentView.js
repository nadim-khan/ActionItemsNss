import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AddCommentIcon from '@material-ui/icons/AddComment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Typography, Box, Grid, Button, TextField, Tooltip, Avatar } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import TableChartIcon from '@material-ui/icons/TableChart'
import { AddComment } from '@material-ui/icons';
import Spinner from '../Spinner/Spinner';
import Editor from '../Editor/Editor';

const useStyles = makeStyles((theme) => ({
    main: {
        [theme.breakpoints.down('sm')]: {
            width: '60vw',
            maxHeight: '100%',
            overflow: 'auto'
          },
          [theme.breakpoints.up('md')]: {
            width: '50vw',
            maxHeight: '100%',
            overflow: 'auto'
          },
          [theme.breakpoints.up('lg')]: {
            width: '40vw',
            maxHeight: '100%',
            overflow: 'auto'
          },
        "&::-webkit-scrollbar": {
            width: "0.5em",
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgb(153, 211, 238)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#77afe7",
            outline: "1px solid #2a8ef1",
            border: "2px solid #2a8ef1",
            borderRadius: "5em",
        },
    },
    fullList: {
        width: 'auto',
    },
    detailedView: {
        padding: '1rem'
    },
    commentView: {
        padding: '1rem'
    }
}));

export default function CommentView(props) {
    const classes = useStyles();
    console.log('Comment Props : ', props)
    const [isOpen, setOpen] = useState(props.data.openView);
    const [editorOpen, setEditorOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const AddNewComment = () => {
        setEditorOpen(true);
    }

    const removeComment = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setEditorOpen(false);
        }, 3000)
    }

    const mainView = (data) => (
        <div className={classes.main}>
            {isLoading ? <Spinner /> : <></>}
            <Grid container justify="center" className={classes.detailedView} >
                <Grid item xs={12}>
                    <Typography align="center" variant='h6'>{data.projectData.projectName}</Typography>

                </Grid>
                <Grid item xs={12}>
                    Task : {data.taskData.taskName}<br />
                        Task Description : {data.taskData.taskDetails}
                </Grid>
                <Grid item xs={12}>
                    <AvatarGroup max={2}>
                        <Tooltip
                            title={`Assigned By : ${data.projectData.projectCreatedBy} `}
                            placement="top"
                            arrow
                        >
                            <Avatar
                                alt={data.projectData.projectCreatedBy}
                                src={data.projectData.projectCreatedBy}
                                className="multiAvatar"
                            />
                        </Tooltip>
                        <Tooltip
                            title={`Assigned To : ${data.taskData.taskAssignedTo} `}
                            placement="top"
                            arrow
                        >
                            <Avatar
                                alt={data.taskData.taskAssignedTo}
                                src={data.taskData.taskAssignedTo}
                                className="multiAvatar"
                            />
                        </Tooltip>
                    </AvatarGroup>
                </Grid>
                <Grid item xs={6}>
                    <Tooltip title='Add Comment' placement="top" arrow >
                        <Button variant="contained" color="primary" onClick={() => AddNewComment()}><AddCommentIcon /></Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    <Tooltip title='Delete Comment' placement="top" arrow >
                        <Button variant="contained" color="secondary" onClick={() => removeComment()}><DeleteForeverIcon /></Button>
                    </Tooltip>
                </Grid>
            </Grid>
            {editorOpen ? <Grid container justify="center" className={classes.commentView}>
                <Grid item xs={12}>
                    <Editor />
                </Grid>
            </Grid> : <></>}

        </div>
    );
    const MyBlock = (props) => {
        return (
            <div style={{
                padding: 10,
                backgroundColor: "#ebebeb"
            }}>
                My Block content is:
                {props.children}
            </div>
        )
    }

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(!isOpen);
    };

    return (
        <div>

            <SwipeableDrawer
                anchor={'right'}
                open={true}
                onClose={toggleDrawer()}
                onOpen={toggleDrawer()}
            >
                {mainView(props.data)}
            </SwipeableDrawer>
        </div>
    );
}