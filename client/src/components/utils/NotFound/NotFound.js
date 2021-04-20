import React from 'react'
import { Typography, Box, Grid, Button, TextField } from "@material-ui/core";
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
const useStyles = makeStyles((theme) => ({
    main: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      position: "absolute",
      display:'inline-block'
    },
    icon:{
        fontSize:'4rem',
    },
    button: {
      marginTop: "1rem",
      color: "#fff",
      borderColor: "#61dafb",
      background: "#2a8ef1",
      "&:hover": {
        background: "#2a8ef1",
      },
    },
    heading: {
      color: "#fff",
      textAlign: "center",
      textTransform: "uppercase",
      fontSize:'5rem'
    },
  }));
  
const NotFound = () => {
    const classes = useStyles();
    return (
        <Box  component="div" style={{background:'#222',height:'90vh'}}>
            <Grid container justify="center" className={classes.main}>
            <Typography className={classes.heading} variant="h3" align="center">
                        4<HelpOutlineIcon className={classes.icon}/>4
            </Typography>
            <br/>
            <Typography style={{color:'#fff',padding:'1rem 0 0.5rem 0'}} align="center">
                Maybe this page moved? Got deleted? 
            </Typography>
            <Typography style={{color:'#fff'}} align="center">
                Let's go <Link to='/' style={{textDecoration:'none',color:'#2a8ef1'}}>Home</Link> and try from there.
            </Typography>
            </Grid>
            
        </Box>
    )
}

export default NotFound
