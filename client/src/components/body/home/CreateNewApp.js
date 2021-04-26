import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  Divider,
  Paper,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
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

const CreateNewApp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const today = new Date();
  const dd = (today.getDate() < 10 ? "0" : "") + today.getDate();
  const mm = (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
  const currDate = `${today.getUTCFullYear()}-${mm}-${dd}`;
  const initialState = {
    projectName: "",
    projectStartDate: currDate,
    projectExpectedEndDate: currDate,
    projectCreatedBy: user.name,
    projectCreatedDate: currDate,
    taskDetails: [
      {
        taskName: "",
        taskDetails: "",
        taskAssignedTo: "",
        taskCreatedDate: currDate,
        taskStartDate: currDate,
        taskExpectedEndDate: currDate,
      },
    ],
    success: "",
    err: "",
  };
  const notificationData = {
    type: "",
    msg: "",
  };
  const [projectData, setProjectData] = useState(initialState);
  const [currentTask, setcurrentTask] = useState(initialState.taskDetails);
  const [notification, setNotification] = useState(notificationData);
  const [disableTaskButton, setButton] = useState(true);
  const [disableSubmitButton, setSubmitButton] = useState(true);
  const [saved, setSaveStatus] = useState(false);

  const {
    projectName,
    projectStartDate,
    projectCreatedBy,
    projectExpectedEndDate,
    projectCreatedDate,
    taskDetails,
    err,
    success,
  } = projectData;

  const changeHandler = async (e) => {

    const { name, value } = e.target;
    setSaveStatus(false);
    setProjectData({ ...projectData, [name]: value, err: "", success: "" });
    setNotification({
      ...notification,
      type: "",
      msg: "",
    });
    if (projectData.projectName === "") {
      setSubmitButton(true);
    }
  };

  const handleTaskInputChange = (idx) => (evt) => {
    const newTask = currentTask.map((task, index) => {
      if (idx !== index) return task;
      return { ...task, [evt.target.name]: evt.target.value };
    });
    console.log("newTask : : ", newTask);
    setcurrentTask(newTask);
    //Validation
    const { taskAssignedTo, taskDetails, taskName } = newTask[idx];
    console.log(taskAssignedTo, taskDetails, taskName);
    if (taskAssignedTo !== "" && taskDetails !== "" && taskName !== "") {
      setButton(false);
      setSubmitButton(false);
    } else {
      setButton(true);
      setSubmitButton(true);
    }
  };

  const addCurrentTask = () => {
    setSubmitButton(true);
    setButton(true);
    setcurrentTask((oldTask) => [
      ...oldTask,
      {
        taskName: "",
        taskDetails: "",
        taskAssignedTo: "",
        taskCreatedDate: currDate,
        taskStartDate: currDate,
        taskExpectedEndDate: currDate,
      },
    ]);
  };

  const createAppSubmit = async (e) => {
    e.preventDefault();
    setNotification({
      ...notification,
      type: "",
      msg: "",
    });
    try {
        if(!saved) {
            setProjectData({
                ...projectData,
                projectCreatedBy: user.name,
                taskDetails: currentTask,
                err: "",
                success: "",
            });
            setNotification({...notification,type:'success',msg:'Data Saved Successfully '})
            setSaveStatus(true);
        } else {
            const response= await axios.post('/app/register',projectData);
            setNotification({...notification,type:'success',msg:response.data.msg})
        }
    } catch (err) {
      err.response.data.msg && setProjectData({...projectData, err:err.response.data.msg, success:''});
      setNotification({ ...notification,type:'error', msg:err.response.data.msg})
    }
  };

  return (
    <Box component="div" style={{ maxHeight: "90vh" }}>
      <Grid container justify="center">
        {/* {(notification.type !== '') ? <div><Notification type={notification.type} msg={notification.msg} /><br/></div> : <></>} */}
        <Box
          component="form"
          onSubmit={createAppSubmit}
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          <Typography className={classes.heading} variant="h5">
            Create New Project
          </Typography>
          {notification.type ==='error' && showErrMsg(notification.msg)}
        {notification.type ==='success' && showSuccessMsg(notification.msg)}
          <InputField
            fullWidth={true}
            label="Project Name"
            name="projectName"
            type="text"
            InputProps={{ style: { color: "#0747a6" } }}
            variant="outlined"
            margin="dense"
            size="medium"
            defaultValue={projectName}
            onChange={changeHandler}
          />
          <InputField
            fullWidth={true}
            label="Project Start Date"
            name="projectStartDate"
            type="date"
            InputProps={{ style: { color: "#0747a6" } }}
            defaultValue={projectStartDate}
            variant="outlined"
            margin="dense"
            size="medium"
            onChange={changeHandler}
          />
          <InputField
            fullWidth={true}
            label="Expected End Date"
            name="projectExpectedEndDate"
            type="date"
            InputProps={{ style: { color: "#0747a6" } }}
            defaultValue={projectExpectedEndDate}
            variant="outlined"
            margin="dense"
            size="medium"
            onChange={changeHandler}
          />
          <InputField
            fullWidth={true}
            name="projectCreatedBy"
            type="text"
            InputProps={{ style: { display: "none" } }}
            variant="outlined"
            margin="dense"
            size="medium"
            defaultValue={projectCreatedBy}
            onChange={changeHandler}
          />
          <InputField
            fullWidth={true}
            name="projectCreatedDate"
            type="date"
            InputProps={{ style: { display: "none" } }}
            defaultValue={projectCreatedDate}
            variant="outlined"
            margin="dense"
            size="medium"
            onChange={changeHandler}
          />

          {currentTask.map((task, idx) => (
            <div className={classes.root} key={idx}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Task #{idx + 1} {task.taskName}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> </Typography>
                  <InputField
                    label="Task Name"
                    fullWidth={true}
                    name="taskName"
                    type="text"
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    placeholder={`Task #${idx + 1} name`}
                    defaultValue={task.taskName}
                    onChange={handleTaskInputChange(idx)}
                  />
                  <br />
                  <InputField
                    label="Task Details"
                    fullWidth={true}
                    name="taskDetails"
                    type="text"
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    placeholder={`Task #${idx + 1} name`}
                    defaultValue={task.taskDetails}
                    onChange={handleTaskInputChange(idx)}
                  />
                  <br />
                  <InputField
                    label="Task Assigned to"
                    fullWidth={true}
                    name="taskAssignedTo"
                    type="text"
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    placeholder={`Task #${idx + 1} taskAssignedTo `}
                    defaultValue={task.taskAssignedTo}
                    onChange={handleTaskInputChange(idx)}
                  />
                  <br />
                  <InputField
                    label="Task Start Date"
                    fullWidth={true}
                    name="taskStartDate"
                    type="date"
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    placeholder={`Task #${idx + 1} name`}
                    defaultValue={currDate}
                    onChange={handleTaskInputChange(idx)}
                  />
                  <br />
                  <InputField
                    fullWidth={true}
                    label="Task End Date"
                    name="taskExpectedEndDate"
                    type="date"
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    placeholder={`Task #${idx + 1} name`}
                    defaultValue={currDate}
                    onChange={handleTaskInputChange(idx)}
                  />
                  <br />
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Button size="small" variant="contained" color="secondary">Remove</Button>
                  <Button size="small" variant="contained"color="primary">
                    Save
                  </Button>
                </AccordionActions>
              </Accordion>
            </div>
          ))}
          <Button
            fullWidth={true}
            color="primary"
            align="center"
            variant="contained"
            style={{marginTop:'1rem'}}
            type="button"
            onClick={() => addCurrentTask()}
            className="small"
            disabled={disableTaskButton}
          >
            <AddIcon /> Add More Task
          </Button>
          <br />
          <Button
            disabled={disableSubmitButton || (!projectName && !user.name)}
            className={classes.button}
            variant="outlined"
            type="submit"
            fullWidth={true}
            endIcon={<SendIcon />}
          >
            {saved ? 'Create App' : 'Save Current Data'}
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default CreateNewApp;
