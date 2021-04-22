import React from 'react'
import { Box,Paper, Typography,InputBase } from '@material-ui/core';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height:'89vh',
        overflow:'auto'
      },
      heading:{
          width:'100%',
          background:'#061d94',
          color:'#fff'
      }
}));

const DetailsMenu = (props) => {
    const classes = useStyles();
    console.log('Val',props.currentDetails.details)
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.heading} variant="h6">Details</Typography>
      {props.currentDetails.details}
    </Paper>
  );
};

export default DetailsMenu;
