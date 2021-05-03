import React, { useEffect, useState } from "react";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Button,
  Box,
  Divider,
  Paper,
  Grid,
  Avatar,
  Typography,
  Tooltip
} from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import Info from "./Info";
import Spinner from "../../utils/Spinner/Spinner";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  dispatchAllProject,
  fetchAllProject,
  deleteOneProject,
  dispatchDeleteProject,
} from "../../../redux/actions/projectAction";
import CreateNewApp from "./CreateNewApp";
import SpeedDial from "@material-ui/lab/SpeedDial";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  mainView: {
    margin: "0.5rem 0 0.5rem 0.5rem",
    overflow: "auto",
    height: `calc(90vh - 1rem)`,
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgb(153, 211, 238)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#77afe7",
      outline: "1px solid #2a8ef1",
      border: "2px solid #2a8ef1",
      borderRadius: "5em",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(15),
    padding: theme.spacing(1, 1),
  },
  headingTask: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeadingTask: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  taskDetails: {
    maxHeight: "55vh",
    paddingRight:"1rem",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgb(153, 211, 238)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#77afe7",
      outline: "1px solid #2a8ef1",
      border: "2px solid #2a8ef1",
      borderRadius: "5em",
    },
  },
  historyDetails: {
    maxHeight: "55vh",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgb(153, 211, 238)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#77afe7",
      outline: "1px solid #2a8ef1",
      border: "2px solid #2a8ef1",
      borderRadius: "5em",
    },
  },
  column1: {
    flexBasis: "5%",
  },
  column2: {
    flexBasis: "65%",
  },
  column3: {
    flexBasis: "35%",
  },
  status: {
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1, 1),
    width: "80%",
    margin: "auto 10%",
    fontSize: theme.typography.pxToRem(12),
    borderRadius: "1rem",
    fontWeight: "900",
    color: "#fff",
    background: "#1ad41a",
  },
  taskStatus:{
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    margin: "auto 10%",
    fontSize: theme.typography.pxToRem(12),
    borderRadius: "1rem",
    fontWeight: "900",
    color: "#fff",
    background: "#1ad41a",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
    height: "inherit",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
const changeDateFormat = (old) => {
  const date = new Date(old);
  return `${date.toLocaleString([], { hour12: true })}`;
};

const notificationData = {
  type: "",
  msg: "",
};

function AppView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const projects = useSelector((state) => state.projects);
  const { user, isLogged } = auth;
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(notificationData);
  const [expanded, setExpanded] = useState(false);
  const [isUpdate, setUpdate] = useState({
    value:false,
    id:null
  });

  useEffect(() => {
    setLoading(true);
    if (isLogged) {
      getAllProjects();
    } else {
      setLoading(false);
    }
  }, [token, dispatch, isLogged]);

  const getAllProjects = () => {
    fetchAllProject(token).then((res) => {
      setLoading(false);
      dispatch(dispatchAllProject(res));
    });
  };

  const deleteProject = (id) => {
    setLoading(true);
    if (isLogged) {
      deleteOneProject(token, id).then((res) => {
        setLoading(false);
        setUpdate(false);
        setNotification({
          type: "success",
          msg: "Project Deleted Successfully !",
        });
        dispatch(dispatchDeleteProject(res));
        getAllProjects();
      });
    } else {
      setLoading(false);
    }
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setUpdate({value:false,id:null});
  };

  const updateProject = (event,id) =>{
    setUpdate({...isUpdate,value:!isUpdate.value,id:id});
  };

const colors = ['#00AA55', '#009FD4', '#B381B3', '#939393', '#E3BC00', '#D47500', '#DC2A2A'];

function numberFromText(text) {
  // numberFromText("AA");
  const charCodes = text
    .split('') // => ["A", "A"]
    .map(char => char.charCodeAt(0)) // => [65, 65]
    .join(''); // => "6565"
  return parseInt(charCodes, 10);
}

const avatars = document.querySelectorAll('.multiAvatar');

avatars.forEach(avatar => {
  const text = avatar.innerText; // => "AA"
  avatar.style.backgroundColor = colors[numberFromText(text) % colors.length]; // => "#DC2A2A"
});
  return (
    <>
      {loading ? <Spinner /> : <></>}
      {notification.type === "error" && showErrMsg(notification.msg)}
      {notification.type === "success" && showSuccessMsg(notification.msg)}
      {isLogged ? (
        <>
          {projects.length ? (
            <Box component="div" className={classes.mainView}>
              {projects.map((project, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index + 1}`}
                  onChange={handleExpand(`panel${index + 1}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                  >
                    <Box component="div" className={classes.column1}>
                      <Box component="div" className={classes.heading}>
                        
                          <AvatarGroup max={3} extraAvatarsTooltipTitle="More">
                            {project.assignedMembers.map((user,uid)=>
                              <Tooltip key={uid} title={user} placement="top" arrow>
                                <Avatar  alt={user} src={user} className="multiAvatar"/>
                              </Tooltip>
                            )}
                            
                          </AvatarGroup>
                      </Box>
                    </Box>
                    <Box component="div" className={classes.column2}>
                      <Typography className={classes.secondaryHeading}>
                        {project.projectName}
                      </Typography>
                    </Box>
                    <Box component="div" className={classes.column3}>
                      <Typography align="center" className={classes.status}>
                        Status
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                    <Box component="div" className={classes.column2}>
                      <Typography variant="h6" align="center">
                        Task Details
                      </Typography>

                      <Box comonent="div" className={classes.taskDetails}>
                        {isUpdate.value && isUpdate.id===project._id ? (
                          <CreateNewApp projectData={project} />
                        ) : (
                          <Grid container >
                              <Grid item xs={4}>
                                projectName: {project.projectName}
                                <br />
                                projectCreatedBy : {project.projectCreatedBy}
                                <br />
                                projectCreatedDate : {changeDateFormat(project.projectCreatedDate)}
                                <br />
                                projectStartDate : {changeDateFormat(project.projectStartDate)}
                                <br />
                                projectExpectedEndDate :{changeDateFormat(project.projectExpectedEndDate)}
                            </Grid>
                            <Grid item xs={8}>
                            {project.taskDetails.map((task, id) => (
                              <Accordion
                                key={id}
                                elevation={3}
                                variant="outlined"
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                >
                                  <Typography className={classes.headingTask}>
                                    Task#{id + 1}. {task.taskName}{" "}
                                  </Typography>
                                  <Typography align="center" className={classes.taskStatus}>
                                    Task Status
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    taskName : {task.taskName}
                                    <br />
                                    taskDetails: {task.taskDetails}
                                    <br />
                                    taskAssignedTo : {task.taskAssignedTo}
                                    <br />
                                    taskCreatedDate :{changeDateFormat(task.taskCreatedDate)}
                                    <br />
                                    taskStartDate : {changeDateFormat(task.taskStartDate)}
                                    <br />
                                    taskExpectedEndDate:{changeDateFormat(task.taskExpectedEndDate)}
                                    <br />
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            ))}
                            </Grid>
                          </Grid>
                        )}
                      </Box>
                    </Box>
                    <Box
                      component="div"
                      className={clsx(classes.column3, classes.helper)}
                    >
                      <Typography variant="h6" align="center">
                        History
                      </Typography>
                      <Timeline align="left" className={classes.historyDetails}>
                        {project.history.map((item, hId) => (
                          <TimelineItem key={hId}>
                            <TimelineOppositeContent>
                              <Typography color="textSecondary">
                                {changeDateFormat(item.updatedOn)}
                              </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineDot />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography
                                dangerouslySetInnerHTML={{
                                  __html: `${item.activity}`,
                                }}
                              ></Typography>
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </Box>
                  </AccordionDetails>
                  <Divider />
                  <AccordionActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteProject(project._id)}
                    >
                      Delete Project
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      data-document={project._id}
                      onClick={(e) => updateProject(e,project._id)}
                      value={isUpdate.id === project._id ? "Cancel" :  "Update"}
                    >
                      {isUpdate.value && isUpdate.id === project._id ? "Cancel Update" :  "Update Details"}
                    </Button>
                  </AccordionActions>
                </Accordion>
              ))}
            </Box>
          ) : (
            "No Projects so far"
          )}
        </>
      ) : (
        <Info />
      )}
    </>
  );
}

export default AppView;



<Box component="div" className={classes.updateView}>
      <Grid container justify="center" >
        <Grid item xs={9} >
        {/* {(notification.type !== '') ? <div><Notification type={notification.type} msg={notification.msg} /><br/></div> : <></>} */}
        <Box
          component="form"
          onSubmit={createAppSubmit}
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          <Typography className={classes.heading} variant="h5">
            {props.projectData
              ? "Update Project Details"
              : "Create New Project"}
          </Typography>
          {notification.type === "error" && showErrMsg(notification.msg)}
          {notification.type === "success" && showSuccessMsg(notification.msg)}
          <InputField
            label="Project Name"
            fullWidth={true}
            name="projectName"
            type="text"
            variant="outlined"
            margin="dense"
            size="medium"
            defaultValue={projectName}
            InputProps={{ style: { color: "#0747a6" } }}
            onChange={changeHandler}
          />
          <InputField
            label="Project Start Date"
            fullWidth={true}
            name="projectStartDate"
            type="date"
            variant="outlined"
            margin="dense"
            size="medium"
            defaultValue={formattedDate(projectStartDate)}
            InputProps={{ style: { color: "#0747a6" } }}
            onChange={changeHandler}
          />
          <InputField
            fullWidth={true}
            label="Expected End Date"
            name="projectExpectedEndDate"
            type="date"
            InputProps={{ style: { color: "#0747a6" } }}
            defaultValue={formattedDate(projectExpectedEndDate)}
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
            defaultValue={formattedDate(projectCreatedDate)}
            variant="outlined"
            margin="dense"
            size="medium"
            onChange={changeHandler}
          />

          {currentTask.map((task, idx) => (
            <div className={classes.root} key={idx}>
              <Accordion
                expanded={expanded === `panel${idx + 1}`}
                onChange={handleExpand(`panel${idx + 1}`)}
              >
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
                    defaultValue={formattedDate(task.taskStartDate)}
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
                    defaultValue={formattedDate(task.taskExpectedEndDate)}
                    onChange={handleTaskInputChange(idx)}
                  />
                  <br />
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Button
                    size="small"
                    disabled={currentTask.length === 1}
                    variant="contained"
                    color="secondary"
                    onClick={() => removeCurrentTask(idx)}
                  >
                    Remove
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
            style={{ marginTop: "1rem" }}
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
            {saved ? "Create App" : "Save Current Data"}
          </Button>
        </Box>
        </Grid>
      </Grid>
    </Box>
