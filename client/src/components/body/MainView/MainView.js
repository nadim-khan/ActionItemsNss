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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";
import PermIdentityTwoToneIcon from "@material-ui/icons/PermIdentityTwoTone";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import { AssignmentInd, Home, ContactMail } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

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
    user: true,
    admin: true,
  },
  {
    listIcon: <AssignmentInd />,
    listText: "Profile",
    listPath: "/profile",
    user: true,
    admin: true,
  },
  {
    listIcon: <ContactMail />,
    listText: "Logout",
    listPath: "/",
    user: true,
    admin: true,
  },
  {
    listIcon: <AddTwoToneIcon />,
    listText: "Create Project",
    listPath: "/createApp",
    user: true,
    admin: true,
  },
];
const signInItems = [
  {
    listIcon: <PermIdentityTwoToneIcon />,
    listText: "Login",
    listPath: "/login",
  },
  {
    listIcon: <PersonAddTwoToneIcon />,
    listText: "Register",
    listPath: "/register",
  },
];

const MainView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
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
            <ListItem
              button
              key={key}
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
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Box component="div" className={classes.toolbar} />
        <Body />
      </main>
    </Box>
  );
};

export default MainView;
