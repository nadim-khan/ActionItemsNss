import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography, Box, Grid, Button, TextField } from "@material-ui/core";
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
    background: "#2a8ef1",
    "&:hover": {
      background: "#2a8ef1",
    },
  },
  heading: {
    color: "#2a8ef1",
    textAlign: "center",
    textTransform: "uppercase",
  },
}));
const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#2a8ef1",
    },
    "& label": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#2a8ef1",
      },
      "&:hover fieldset": {
        borderColor: "#2a8ef1",
      },
      "&.Mui-focused fieldset": {
        color: "#2a8ef1",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2a8ef1",
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
    <Box component="div" style={{ background: "#222", height: "90vh" }}>
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

          <InputField
            fullWidth={true}
            label="Email"
            name="email"
            type="email"
            InputProps={{ style: { color: "#fff" } }}
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
