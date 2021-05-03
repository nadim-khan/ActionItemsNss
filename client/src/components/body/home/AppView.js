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
  Tooltip,
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
import Filter from "../../utils/Filter/Filter";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  mainView: {
    height: "auto",
    maxHeight: "90vh",
  },
  filterBox: {
    maxHeight: "10vh",
    height: "auto",
  },
  appListItems: {
    maxHeight: "75vh",
    margin: " 0.5rem 0.2rem",
    height: "auto",
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
  paper: {
    [theme.breakpoints.down('sm')]: {
      maxHeight: '20vh',
      height: 'auto',
      overflow: 'auto'
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: '30vh',
      height: 'auto',
      overflow: 'auto'
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: '60vh',
      height: 'auto',
      overflow: 'auto'
    },
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
  control: {
    padding: theme.spacing(1),
  },
  updateView:{
    maxHeight:'60vh',
    overflow: 'auto',
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
  ////////////////////////////
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
  taskStatus: {
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
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const projects = useSelector((state) => state.projects);
  const { user, isLogged } = auth;

  const [notification, setNotification] = useState(notificationData);
  const [expanded, setExpanded] = useState(false);
  const [isUpdate, setUpdate] = useState({
    value: false,
    id: null,
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
    setLoading(true);
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
        //dispatch(dispatchDeleteProject(res));
        getAllProjects();
      });
    } else {
      setLoading(false);
    }
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setUpdate({ value: false, id: null });
  };

  const updateProject = (event, id) => {
    setUpdate({ ...isUpdate, value: !isUpdate.value, id: id });
  };

  const colors = [
    "#00AA55",
    "#009FD4",
    "#B381B3",
    "#939393",
    "#E3BC00",
    "#D47500",
    "#DC2A2A",
  ];

  function numberFromText(text) {
    // numberFromText("AA");
    const charCodes = text
      .split("") // => ["A", "A"]
      .map((char) => char.charCodeAt(0)) // => [65, 65]
      .join(""); // => "6565"
    return parseInt(charCodes, 10);
  }

  const avatars = document.querySelectorAll(".multiAvatar");

  avatars.forEach((avatar) => {
    const text = avatar.innerText; // => "AA"
    avatar.style.backgroundColor = colors[numberFromText(text) % colors.length]; // => "#DC2A2A"
  });
  return (
    <>
      {notification.type === "error" && showErrMsg(notification.msg)}
      {notification.type === "success" && showSuccessMsg(notification.msg)}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {isLogged ? (
            <Box component="div" className={classes.mainView}>
              <Box component="div" className={classes.filterBox}>
                <Filter />
              </Box>
              <Box component="div" className={classes.appListItems}>
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
                          <AvatarGroup max={2}>
                            {project.assignedMembers.map((user, uid) => (
                              <Tooltip
                                key={uid}
                                title={user}
                                placement="top"
                                arrow
                              >
                                <Avatar
                                  alt={user}
                                  src={user}
                                  className="multiAvatar"
                                />
                              </Tooltip>
                            ))}
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
                        <Grid container className={classes.root} spacing={1}>
                           { isUpdate.value && isUpdate.id === project._id ? 
                           <Grid item xs={12} className={classes.updateView}>
                             <CreateNewApp projectData={project} />
                           </Grid> :
                          <Grid item xs={12}>
                            <Grid container justify="center" spacing={1}>
                              <Grid item xs={12} sm={12} md={3} lg={3}>
                                <Box component="div" className={classes.paper} >
                                  projectName: {project.projectName}
                                  <br />
                                    projectCreatedBy : {project.projectCreatedBy}
                                  <br />
                                    projectCreatedDate : {changeDateFormat(project.projectCreatedDate)}
                                  <br />
                                    projectStartDate : {changeDateFormat(project.projectStartDate)}
                                  <br />
                                    projectExpectedEndDate :{changeDateFormat(project.projectExpectedEndDate)}
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={12} md={9} lg={6}>
                                <Box component="div" className={classes.paper} >
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
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={3}>
                                <Box component="div" className={classes.paper} >
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
                              </Grid>
                            </Grid>
                          </Grid>
                      }
                        </Grid>
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
                        onClick={(e) => updateProject(e, project._id)}
                        value={
                          isUpdate.id === project._id ? "Cancel" : "Update"
                        }
                      >
                        {isUpdate.value && isUpdate.id === project._id
                          ? "Cancel Update"
                          : "Update Details"}
                      </Button>
                    </AccordionActions>
                  </Accordion>
                ))}
              </Box>
            </Box>
          ) : (
            "Loading..."
          )}
        </>
      )}
    </>
  );
}

export default AppView;
