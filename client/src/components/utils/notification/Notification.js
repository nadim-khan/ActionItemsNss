
import './notification.css'
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export const showErrMsg = (msg) => {
    // setTimeout(() => {
    //     if (document.getElementById("notification")) {
    //         document.getElementById("notification").style.display = "none";
    //     }
    // }, 3000);
    return dialogDiv(msg,'error')
}

export const showSuccessMsg = (msg) => {
    // setTimeout(() => {
    //     if (document.getElementById("notification")) {
    //         document.getElementById("notification").style.display = "none";
    //     }
    // }, 3000);
    return dialogDiv(msg,'success')
}



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const dialogDiv = (msg,type) => {
    const handleClose = () =>{
        document.getElementById("notification").style.display = "none";
    }
    return <div>
        <Dialog
            id="notification"
            onClose={handleClose}
            open={true}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className={type==='success'?'successMsg' :'errMsg'} id="alert-dialog-slide-title">
                {type==='success'? <CheckCircleOutlineIcon/>:<ErrorOutlineIcon/> }
            </DialogTitle>
            <DialogContent className={type==='success'?'successMsg' :'errMsg'}>
                <DialogContentText id="alert-dialog-slide-description">
                    <code style={{color:'#fff'}}>{type!=='success'?'Error Details : ' :''} {msg}</code>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    </div>
}



