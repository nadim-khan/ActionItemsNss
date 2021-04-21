import React from "react";
import { Box, Paper, Typography, InputBase,Drawer,List,ListItem,ListItemIcon,Divider,ListItemText,ListItemAvatar,Avatar} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "89vh",
    overflow: "auto",
  },
  heading: {
    width: "100%",
    background: "#061d94",
    color: "#fff",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    border: "1px solid blue",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
}));

const ProjectMenu = (props) => {
  const classes = useStyles();
  const {data} =props
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.heading}>
        Projects
      </Typography>
      <Box cpmponent="div" className={classes.search}>
        <Box cpmponent="div" className={classes.searchIcon}>
          <SearchIcon />
        </Box>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </Box>
      <List>
          {data.map((project, index) => (
            <ListItem button alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp"/>
            </ListItemAvatar>
            <ListItemText
              primary={project.projectName}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {project.createdBy} <ArrowRightIcon/>
                  </Typography>
                    {project.assignedTo}
                </React.Fragment>
              }
            />
          </ListItem>
          ))}
        </List>
    </Paper>
  );
};

export default ProjectMenu;
