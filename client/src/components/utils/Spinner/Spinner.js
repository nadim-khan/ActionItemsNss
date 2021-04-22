import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: '9999',
    color: '#fff',
  },
  main:{
    position: 'absolute',
    left: '50%',
    top: '50%',
    margin:'0px auto'
  },
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Backdrop className={classes.backdrop} open='true' >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Spinner