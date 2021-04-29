import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: "5vh",
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
      width: "100%",
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

  export default InputField