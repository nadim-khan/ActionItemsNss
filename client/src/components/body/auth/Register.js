import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {makeStyles,withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {
    Typography,
    Box,
    Grid,
    Button,
    TextField
} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'
const useStyles=makeStyles(theme=>({
    form:{
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
        position:'absolute'
    },
    button:{
        marginTop:'1rem',
        color:'#fff',
        borderColor:'#61dafb',
        background:'#0747a6',
        '&:hover':{
            background:'#0747a6',
        }
    },
    heading:{
        color:'#0747a6',
        textAlign:"center",
        textTransform:'uppercase'
    }
}))
const InputField = withStyles({
    root:{
        '& label.Mui-focused':{
            color:'#0747a6',
        },
        '& label':{
            color:"#0747a6"
        },
        '& .MuiOutlinedInput-root':{
            '& fieldset':{
                borderColor:'#0747a6'
            },
            '&:hover fieldset':{
                borderColor:'#0747a6'
            },
            '&.Mui-focused fieldset':{
                color:'#0747a6'
            },
            '& .MuiOutlinedInput-notchedOutline':{
                borderColor:'#0747a6'
            }
        },
        
    }
})(TextField)
const initialState = {
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
}
const notificationData = {
    type:'',
    msg:''
}

const Register = () => {
    const classes = useStyles();
    
    const [user, setUser] = useState(initialState);
    const [notification, setNotification] = useState(notificationData);

    const { name, email, password, confirmPassword} = user;

    const changeHandler = async(e) => {
       const {name,value}=e.target;
       setUser({...user, [name]:value});
       setNotification({
            ...notification,
            type:'',
            msg:''
        })
    }

    const registerAuth = async(e) => {
        e.preventDefault();
        
        if(isEmpty(name) || isEmpty(password) || isEmpty(email)) {
            setUser({...user})
            setNotification({...notification, type:'error', msg:'Please fill in all fields.'})
            return
        }
               
               
        if(!isEmail(email)) {
            setUser({...user})
            setNotification({...notification, type:'error', msg:'Invalid emails.'})
            return
        }
             
        if(isLength(password)) {
            setUser({...user})
            setNotification({...notification, type:'error', msg:'Password must be at least 6 characters.'})
            return
        }
             
        
        if(!isMatch(password, confirmPassword)) {
            setUser({...user})
            setNotification({...notification, type:'error', msg:'Password did not match.'})
            return
        }
             
        try{
            
            const response= await axios.post('/user/register',{name, email, password});
            setUser({...user});
            if(response) {
                setNotification({
                    ...notification,
                    type:'success',
                    msg:response.data.msg
                })
            }
        } catch(err) {
            err.response.data.msg && setUser({...user});
            setNotification({
                ...notification,
                type:'error',
                msg:err.response.data.msg
            })
        }
    }


    return (
        <Box component="div" style={{height:'90vh'}}>
            <Grid container justify="center">
            {/* {(notification.type !== '') ? <div><Notification type={notification.type} msg={notification.msg} /><br/></div> : <></>} */}
                <Box component="form" onSubmit={registerAuth} className={classes.form}>
                    <Typography className={classes.heading} variant="h5">
                        Register
                    </Typography>
                    {notification.type ==='error' && showErrMsg(notification.msg)}
                    {notification.type ==='success' && showSuccessMsg(notification.msg)}
                    <InputField 
                        fullWidth={true}
                        label="Name"
                        name="name"
                        InputProps={{style:{color:"#0747a6"}}}
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        value={name}
                        onChange={changeHandler}
                        />
                    <InputField 
                        fullWidth={true}
                        label="Email"
                        name="email"
                        type="email"
                        InputProps={{style:{color:"#0747a6"}}}
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        value={email}
                        onChange={changeHandler}
                        />
                    <InputField 
                        fullWidth={true}
                        label="Password"
                        name="password"
                        InputProps={{style:{color:"#0747a6"}}}
                        variant="outlined"
                        margin="dense"
                        type="password"
                        size="medium" 
                        value={password}
                        onChange={changeHandler}
                        />
                        <InputField 
                            fullWidth={true}
                            label="Confirm Password"
                            name="confirmPassword"
                            InputProps={{style:{color:"#0747a6"}}}
                            variant="outlined"
                            margin="dense"
                            type="password"
                            size="medium" 
                            value={confirmPassword}
                            onChange={changeHandler}
                        />
                    <br/>
                    <Button disabled={!email} className={classes.button} variant="outlined" type="submit" fullWidth={true} endIcon={<SendIcon/>}>Register</Button>
                    
                    <br/>
                    <br/>
                    <Typography align="center" style={{color:'#0747a6',padding:'1rem'}}> 
                        Already have an account ?  
                            <Link  to="/login" style={{textDecoration:'none',color:'#0747a6',marginLeft:'0.5rem',fontWeight:'700'}}>Login</Link>
                    </Typography>
                </Box>
            </Grid>
        </Box>
    )
}

export default Register
