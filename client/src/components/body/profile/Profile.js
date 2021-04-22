import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/usersAction";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  Avatar,
} from "@material-ui/core";
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
    borderColor: "#0747a6",
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
  avatar: {
    display: "block",
    margin: "0.5rem auto",
    width: theme.spacing(13),
    height: theme.spacing(13),
    "&:hover": {
      opacity: "1",
      width: theme.spacing(23),
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
    transition: ".3s ease",
    backgroundColor: "red",
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
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Profile() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } = data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfor = () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (name || avatar) updateInfor();
    if (password) updatePassword();
  };

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <Box component="div"  style={{maxHeight:'90vh'}}>
      <Box component="div" >
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
      </Box>
      <Box component="div" style={{height: "90vh" }}>
        <Grid container justify="center">
          <Box
            component="form"
            onSubmit={handleUpdate}
            className={classes.form}
          >
            <Typography className={classes.heading} variant="h5">
              Profile Type : {isAdmin ? "Admin" : "User"}
            </Typography>
            <Box component="div" onClick={handleFileClick}>
              <Avatar
                className={classes.avatar}
                src={avatar ? avatar : user.avatar}
                alt={user.name}
              />
              <CloudUploadIcon className={classes.overlay} />
            </Box>
            <InputField
              type="file"
              ref={hiddenFileInput}
              onChange={changeAvatar}
              style={{ display: "none" }}
            />
            <InputField
              fullWidth={true}
              label="Name"
              name="name"
              InputProps={{ style: { color: "#0747a6" } }}
              variant="outlined"
              margin="dense"
              size="medium"
              value={user.name}
              onChange={handleChange}
            />
            <InputField
              fullWidth={true}
              label="Email"
              name="email"
              InputProps={{ style: { color: "#0747a6" } }}
              variant="outlined"
              margin="dense"
              size="medium"
              value={user.email}
              disabled
            />
            <InputField
              fullWidth={true}
              label="New Password"
              name="password"
              InputProps={{ style: { color: "#0747a6" } }}
              variant="outlined"
              margin="dense"
              type="password"
              size="medium"
              defaultValue={password}
            />
            <InputField
              fullWidth={true}
              label="Confirm Password"
              name="cf_password"
              InputProps={{ style: { color: "#0747a6" } }}
              variant="outlined"
              margin="dense"
              type="password"
              size="medium"
              defaultValue={cf_password}
            />
            <br />
            <Typography align="center">
              <em style={{ color: "crimson" }}>
                * If you update your password here, you will not be able to
                login quickly using google and facebook.
              </em>
            </Typography>
            <Button
              disabled={loading}
              className={classes.button}
              variant="outlined"
              fullWidth={true}
              endIcon={<SendIcon />}
            >
              Update
            </Button>
          </Box>
        </Grid>
      </Box>
      </Box>
  );
}

export default Profile;
