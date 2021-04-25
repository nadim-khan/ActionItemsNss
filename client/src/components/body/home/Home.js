import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Chip,
  Button,
  Box,
  Divider,
  Avatar,
  Typography,
} from "@material-ui/core";
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
  mainView:{
    margin:'0.5rem auto',
    overflow:'auto',
    maxHeight:`calc(90vh - 1rem)`,
    '&::-webkit-scrollbar': {
      width: '0.5em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgb(153, 211, 238)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#77afe7',
      outline: '1px solid #2a8ef1',
      border:'2px solid #2a8ef1',
      borderRadius:'5em'
    }

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
  details: {
    alignItems: "center",
    height:'60vh'
  },
  column1: {
    flexBasis: "5%",
  },
  column2: {
    flexBasis: "65%",
  },
  column3:{
    flexBasis: "35%",
  },
  status:{
    border:'1px solid black',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    padding: theme.spacing(1, 1),
    width:'80%',
    margin:"auto 10%",
    fontSize: theme.typography.pxToRem(12),
    borderRadius:'1rem',
    fontWeight:'900',
    color:'#fff',
    background:'#1ad41a'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
    height:'inherit'
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function Home() {
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
                          <Avatar
                            alt={user.name}
                            src={user.avatar}
                          />
                          <Avatar
                            alt={user.name}
                            src={user.avatar}
                          />
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
                      <Chip label="Barbados" onDelete={() => {}} />
                    </Box>
                    <Box component="div" className={clsx(classes.column3, classes.helper)}>
                      <Typography variant="h5" align="center">
                        History
                      </Typography>
                      <Typography variant="caption">
                        Select your destination of choice
                        <br />
                        <a
                          href="#secondary-heading-and-columns"
                          className={classes.link}
                        >
                          Learn more
                        </a>
                      </Typography>
                    </Box>
                  </AccordionDetails>
                  <Divider />
                  <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                      Save
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

export default Home;
