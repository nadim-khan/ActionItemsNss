import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  AppBar,
  Toolbar,
  List,
  Drawer,
  Typography,
  CssBaseline,
  Divider,
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import PowerSettingsNewTwoToneIcon from '@material-ui/icons/PowerSettingsNewTwoTone';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AddToQueueOutlinedIcon from '@material-ui/icons/AddToQueueOutlined';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import {  Home } from "@material-ui/icons";
import { useSelector } from "react-redux";
import logo from '../../../logo.png'

import axios from "axios";
import Body from "../Body";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    background: "#0747a6",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#0747a6",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    maxWidth: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
  listItem: {
    color: "#fff",
    fontWeight: "900",
    fontSize: ".9rem",
    textTransform: "uppercase",
  },
}));

const menuItems = [
  {
    listIcon: <Home />,
    listText: "Home",
    listPath: "/",
  },
  {
    listIcon: <LineStyleIcon />,
    listText: "Projects",
    listPath: "/projects"
  },
  {
    listIcon: <AddToQueueOutlinedIcon />,
    listText: "Create Project",
    listPath: "/createApp",
  },
  {
    listIcon: <AccountCircleOutlinedIcon />,
    listText: "Profile",
    listPath: "/profile",
  },
  {
    listIcon: <PowerSettingsNewTwoToneIcon />,
    listText: "Logout",
    listPath: "/",
  },
  
];
const signInItems = [
  {
    listIcon: <Home />,
    listText: "Home",
    listPath: "/"
  },
  {
    listIcon: <PersonOutlinedIcon />,
    listText: "Login",
    listPath: "/login",
  },
  {
    listIcon: <PersonAddOutlinedIcon />,
    listText: "Register",
    listPath: "/register",
  },
];

const MainView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  console.log('user 1',user)
  const links = isLogged && user ? menuItems : signInItems;
  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box component="div" className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ background: "#0747a6" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Avatar src={logo} alt="Logo"/>
          <Typography variant="h6" noWrap>
            Action Items
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Box component="div">
          <Box display="flex" p={1} className={classes.toolbar} >
            <Box p={1} width="25%">
              {auth.user && auth.isLogged ? (
                <Avatar src={auth.user.avatar} alt={auth.user.name} />
              ) : (
                <Avatar />
              )}
            </Box>
            <Box p={1} width="50%" style={{color:'#fff'}}>
              <Typography align="center">
                {auth.user && auth.isLogged ? auth.user.name : "Please Log In"}
              </Typography>
            </Box>
            <Box p={1} flexShrink={0}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon style={{color:'#fff'}}/>
                ) : (
                  <ChevronLeftIcon style={{color:'#fff'}}/>
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Divider />
        <List>
          {links.map((listItem, key) => (
            <Tooltip title={listItem.listText} placement="right" arrow key={key}>
            <ListItem
              button
              
              component={Link}
              to={listItem.listPath}
              onClick={listItem.listText === "Logout" ? handleLogout : null}
            >
              <ListItemIcon className={classes.listItem}>
                {listItem.listIcon}
              </ListItemIcon>
              <ListItemText
                className={classes.listItem}
                primary={listItem.listText}
              />
            </ListItem>
            </Tooltip>
            
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <Box component="div" className={classes.toolbar} />
        <Body />
      </main>
    </Box>
  );
};

export default MainView;
