import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from '@material-ui/core/Drawer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import {
    AppBar,
    Toolbar,
    ListItem,
    IconButton,
    ListItemText,
    Avatar,
    Divider,
    List,
    Typography,
    Box,
    ListItemIcon
} from "@material-ui/core"
import {
    AssignmentInd,
    Home,
    Apps,
    ContactMail
} from "@material-ui/icons"
// import avatar from "../avatar.png"
import logo from "../../logo.png"
// import Footer from './Footer';

// CSS STYLES
const useStyles = makeStyles(theme=>({
    menuSliderContainer: {
        width: 250,
        background: "black",
        height: "100%",
        justifyContent:"center"
    },
    logo:{
        display: "block",
        margin: " auto 0.5rem",
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    avatar: {
        display: "block",
        margin: "0.5rem auto",
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
    listItem: {
        color: "#b5dae4"
    },
    rightSideButton:{

    }

}));

// Icons

const menuItems = [
    {
        listIcon: <Home/>,
        listText: "Home",
        listPath: "/"
    },
    {
        listIcon: <AssignmentInd/>,
        listText: "Profile",
        listPath: "/profile"
    },
    {
        listIcon: <Apps/>,
        listText: "Projects",
        listPath:'/projects'
    },
    {
        listIcon: <ContactMail/>,
        listText: "Logout",
        listPath:'/'
    }
]
const signInItems = [
    {
        listIcon: <Apps/>,
        listText: "Login",
        listPath:'/login'
    },
    {
        listIcon: <ContactMail/>,
        listText: "Register",
        listPath:'/register'
    }
]


const Navbar = () => {
    const [state, setState] = useState({
        right: false
 })
 const auth = useSelector(state => state.auth)

 const {user, isLogged} = auth
console.log(user)
const links = isLogged && user ? menuItems : signInItems;
 const handleLogout = async () => {
     try {
         await axios.get('/user/logout')
         localStorage.removeItem('firstLogin')
         window.location.href = "/";
     } catch (err) {
         window.location.href = "/";
     }
 }

const toggleSlider = (slider, open) => () => {
    setState({...state, [slider]: open});
}

    const classes = useStyles()

    const sideList = slider => (

        <Box className={classes.menuSliderContainer} component="div" onClick={toggleSlider(slider,false)}>
            {user && isLogged ?<Avatar className={classes.avatar} src={user.avatar} alt={user.name} /> : <Avatar className={classes.avatar} src={logo} alt="Action Item Logo" />}
            {user && isLogged ?<Typography  align="center" style={{color:'#fff'}}>Hello {user.name} !</Typography> : <Typography  align="center" style={{color:'#fff'}}>Please Login to use the app</Typography>}
            <Divider/>
            <List>
                {links.map((listItem, key) => (
                    <ListItem button key={key} component={Link} to={listItem.listPath} onClick={listItem.listText ==='Logout'? handleLogout:null}>
                        <ListItemIcon className={classes.listItem}>
                            {listItem.listIcon}
                        </ListItemIcon>
                        <ListItemText className={classes.listItem} primary={listItem.listText} />
                    </ListItem>
                ))} 
            </List>

        </Box> 
    )
    return (
        <>
            <Box component="nav">
                <AppBar position ="static" style={{background: "#222"}}>
                    <Toolbar>
                        <Avatar className={classes.logo} src={logo} component={Link} to="/" alt={user.name} />
                        <Typography variant="h5" style={{color:"#7fc8db",flex:1}}></Typography>
                        <MobileRightMenuSlider anchor="right" open={state.right} onClose={toggleSlider("right", false)}>
                            {sideList("right")}
                            {/* <Footer/> */}
                        </MobileRightMenuSlider>
                        <IconButton onClick={toggleSlider("right", true)} style={{color:'#fff'}}>
                        <ArrowLeftIcon  style={{color:'#fff',fontSize:'2.5rem'}}/>{user && isLogged ? <Avatar src={user.avatar} alt={user.name} style={{color:'#fff',fontSize:'2.5rem'}}/> : <AccountCircleIcon style={{color:'#fff',fontSize:'2.5rem'}}/>                    }
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </>

    )
};

export default Navbar