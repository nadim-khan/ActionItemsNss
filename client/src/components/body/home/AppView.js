import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Button,
  Box,
  Divider,
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
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Info from "./Info";
import Spinner from "../../utils/Spinner/Spinner";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  dispatchAllProject,
  fetchAllProject,
} from "../../../redux/actions/projectAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  mainView: {
    margin: "0.5rem auto",
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
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  taskDetails: {
    maxHeight:"55vh",
    overflow:'auto',
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
    maxHeight:"55vh",
    overflow:'auto',
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

function AppView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const projects = useSelector((state) => state.projects);
  const { user, isAdmin, isLogged } = auth;
  const [loading, setLoading] = useState(false);
  const [currentProject, setcurrentProject] = useState({});

  useEffect(() => {
    if (token) {
      fetchAllProject(token).then((res) => {
        dispatch(dispatchAllProject(res));
      });
    }
  }, [token, dispatch]);

  return (
    <>
      {loading ? <Spinner /> : <></>}
      {isLogged ? (
        <>
          {projects.length ? (
            <Box component="div" className={classes.mainView}>
              {projects.map((project, index) => (
                <Accordion key={index}>
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
                    <Box component="div" className={classes.column1} />
                    <Box component="div" className={classes.column2}>
                      <Typography variant="h6" align="center">
                        Task Details
                      </Typography>
                      <Box comonent="div" className={classes.taskDetails}>
                      projectName: {project.projectName}<br/>
                      projectCreatedBy : {project.projectCreatedBy}<br/>
                      projectCreatedDate : {project.projectCreatedDate}<br/>
                      projectStartDate : {project.projectStartDate}<br/>
                      projectExpectedEndDate : {project.projectExpectedEndDate}<br/>
                      {project.taskDetails.map((task,id)=>
                      <React.Fragment>
                        <Divider/>
                          taskName : {task.taskName}<br/>
                          taskAssignedTo : {task.taskAssignedTo}<br/>
                          taskCreatedDate :{task.taskCreatedDate}<br/>
                          taskStartDate : {task.taskStartDate}<br/>
                          taskExpectedEndDate: {task.taskExpectedEndDate}<br/>
                        <Divider/>
                      </React.Fragment>
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
                        <TimelineItem>
                          <TimelineOppositeContent>
                            <Typography color="textSecondary">
                              26/04/2021 09:30 am
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography>Created Project</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineOppositeContent>
                            <Typography color="textSecondary">
                            26/04/2021 10:00 am
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography>Updated Task endDate</Typography>
                          </TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </Box>
                  </AccordionDetails>
                  <Divider />
                  <AccordionActions>
                    <Button size="small" color="secondary">Cancel</Button>
                    <Button size="small" color="primary">
                      Save
                    </Button>
                    <Button size="small" color="primary">
                      Update
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
