import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography, Box, Grid, Button, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
// import Notification from "../utilities/Notification";
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
      color: "#2a8ef1",
    },
    "& label": {
      color: "#fff",
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
  password: "",
  cf_password: "",
};
const initialNotification = {
  type: "",
  msg: "",
};

const ResetPassword=()=> {
    const classes = useStyles();
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const [notification, setNotification] = useState(initialNotification);

  const { password, cf_password } = data;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value});
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setNotification({...notification,type:'error',msg:'Password must be at least 6 characters.'});

    if (!isMatch(password, cf_password))
      return setNotification({...notification,type:'error',msg:'Password did not match.'});

    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      if(res) {
        setNotification({...notification,type:'success',msg:res.data.msg});
        setData({ ...data });
        return 
      }
      
    } catch (err) {
        setNotification({...notification,type:'error',msg: err.response.data.msg});
      err.response.data.msg &&
        setData({ ...data});
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
          onSubmit={handleResetPass}
          className={classes.form}
        >
          <Typography className={classes.heading} variant="h5">
            Reset your Password
          </Typography>

          <InputField
            fullWidth={true}
            label="Password"
            name="password"
            type="password"
            InputProps={{ style: { color: "#0747a6" } }}
            variant="outlined"
            margin="dense"
            size="medium"
            value={password}
            onChange={changeHandler}
          />
          <br />
          <InputField
            fullWidth={true}
            label="Confirm Password"
            name="cf_password"
            type="password"
            InputProps={{ style: { color: "#0747a6" } }}
            variant="outlined"
            margin="dense"
            size="medium"
            value={cf_password}
            onChange={changeHandler}
          />
          <br />
          <br />
          <Button
            disabled={!password || !cf_password}
            className={classes.button}
            variant="outlined"
            type="submit"
            fullWidth={true}
            endIcon={<SendIcon />}
          >
            Reset
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}

export default ResetPassword;
