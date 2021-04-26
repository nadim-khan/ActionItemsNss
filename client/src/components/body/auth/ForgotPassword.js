import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography, Box, Grid, Button, TextField } from "@material-ui/core";
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import SendIcon from "@material-ui/icons/Send";
const useStyles = makeStyles((theme) => ({
  form: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
  },
  button: {
    marginTop: "1rem",
    color: "#fff",
    borderColor: "#61dafb",
    background: "#0747a6",
    "&:hover": {
      background: "#0747a6",
    },
  },
  heading: {
    color: "#0747a6",
    textAlign: "center",
    textTransform: "uppercase",
  },
}));
const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#0747a6",
    },
    "& label": {
      color: "#0747a6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#0747a6",
      },
      "&:hover fieldset": {
        borderColor: "#0747a6",
      },
      "&.Mui-focused fieldset": {
        color: "#0747a6",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#0747a6",
      },
    },
  },
})(TextField);

const initialState = {
  email: "",
  err: "",
  success: "",
};
const initialNotification = {
    type:'',
    msg:''
}

const  ForgotPassword=() =>{
  const classes = useStyles();
  const [data, setData] = useState(initialState);
  const [notification, setNotification] = useState(initialNotification)

  const { email, err, success } = data;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email)) {
        setNotification({...notification,type:'error',msg:'Invalid emails.'});
        setData({ ...data, err: "Invalid emails.", success: "" });
        return
    }
    try {
      const res = await axios.post("/user/forgot", { email });
      if(res) {
        setData({ ...data, err: "", success: res.data.msg });
        setNotification({...notification,type:'success',msg:res.data.msg});
        return 
      }
    } catch (err) {
        setNotification({...notification,type:'error',msg:err.response.data.msg});
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <Box component="div" style={{  height: "90vh" }}>
      <Grid container justify="center">
        {/* {notification.type !== "" ? (
          <div>
            <Notification type={notification.type} msg={notification.msg} />
            <br />
          </div>
        ) : (
          <></>
        )} */}
        <Box
          component="form"
          onSubmit={forgotPassword}
          className={classes.form}
        >
          <Typography className={classes.heading} variant="h5">
            Forgot Password
          </Typography>
          {notification.type ==='error' && showErrMsg(notification.msg)}
                    {notification.type ==='success' && showSuccessMsg(notification.msg)}
          <InputField
            fullWidth={true}
            label="Email"
            name="email"
            type="email"
            InputProps={{ style: { color: "#0747a6" } }}
            variant="outlined"
            margin="dense"
            size="medium"
            value={email}
            onChange={changeHandler}
          />
          <br />
          <Button
            disabled={!email}
            className={classes.button}
            variant="outlined"
            type="submit"
            fullWidth={true}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}

export default ForgotPassword;
