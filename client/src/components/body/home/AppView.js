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
} from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
    maxHeight: `calc(90vh - 1rem)`,
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

  const speedDialActions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <FavoriteIcon />, name: 'Like' },
  ];

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
                        <AvatarGroup max={4}>
                          <Avatar alt={user.name} src={user.avatar} />
                          <Avatar alt={user.name} src={user.avatar} />
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
                            ))}</Grid>
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
