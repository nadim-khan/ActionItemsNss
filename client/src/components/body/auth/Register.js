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
// import Notification from '../utilities/Notification';
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
        background:'#2a8ef1',
        '&:hover':{
            background:'#2a8ef1',
        }
    },
    heading:{
        color:'#2a8ef1',
        textAlign:"center",
        textTransform:'uppercase'
    }
}))
const InputField = withStyles({
    root:{
        '& label.Mui-focused':{
            color:'#2a8ef1',
        },
        '& label':{
            color:"#fff"
        },
        '& .MuiOutlinedInput-root':{
            '& fieldset':{
                borderColor:'#2a8ef1'
            },
            '&:hover fieldset':{
                borderColor:'#2a8ef1'
            },
            '&.Mui-focused fieldset':{
                color:'#2a8ef1'
            },
            '& .MuiOutlinedInput-notchedOutline':{
                borderColor:'#2a8ef1'
            }
        }
    }
})(TextField)
const initialState = {
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    err:'',
    success:''
}
const notificationData = {
    type:'',
    msg:''
}

const Register = () => {
    const classes = useStyles();
    
    const [user, setUser] = useState(initialState);
    const [notification, setNotification] = useState(notificationData);

    const { name, email, password, confirmPassword, err, success} = user;

    const changeHandler = async(e) => {
       const {name,value}=e.target;
       setUser({...user, [name]:value, err:'', success:''});
       setNotification({
            ...notification,
            type:'',
            msg:''
        })
    }

    const registerAuth = async(e) => {
        e.preventDefault();
        
        if(isEmpty(name) || isEmpty(password) || isEmpty(email)) {
            setUser({...user, err: "Please fill in all fields.", success: ''})
            setNotification({...notification, type:'error', msg:'Please fill in all fields.'})
            return
        }
               
               
        if(!isEmail(email)) {
            setUser({...user, err: "Invalid emails.", success: ''})
            setNotification({...notification, type:'error', msg:'Invalid emails.'})
            return
        }
             
        if(isLength(password)) {
            setUser({...user, err: "Password must be at least 6 characters.", success: ''})
            setNotification({...notification, type:'error', msg:'Password must be at least 6 characters.'})
            return
        }
             
        
        if(!isMatch(password, confirmPassword)) {
            setUser({...user, err: "Password did not match.", success: ''})
            setNotification({...notification, type:'error', msg:'Password did not match.'})
            return
        }
             
        try{
            
            const response= await axios.post('/user/register',{name, email, password});
            setUser({...user, err:'', success:response.data.msg});
            if(response) {
                setNotification({
                    ...notification,
                    type:'success',
                    msg:response.data.msg
                })
            }
        } catch(err) {
            err.response.data.msg && setUser({...user, err:err.response.data.msg, success:''});
            setNotification({
                ...notification,
                type:'error',
                msg:err.response.data.msg
            })
        }
    }


    return (
        <Box component="div" style={{background:'#222',height:'90vh'}}>
            <Grid container justify="center">
            {/* {(notification.type !== '') ? <div><Notification type={notification.type} msg={notification.msg} /><br/></div> : <></>} */}
                <Box component="form" onSubmit={registerAuth} className={classes.form}>
                    <Typography className={classes.heading} variant="h5">
                        Register
                    </Typography>
                    <InputField 
                        fullWidth={true}
                        label="Name"
                        name="name"
                        InputProps={{style:{color:"#fff"}}}
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
                        InputProps={{style:{color:"#fff"}}}
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
                        InputProps={{style:{color:"#fff"}}}
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
                            InputProps={{style:{color:"#fff"}}}
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
                    <Typography align="center" style={{color:'#fff',padding:'1rem'}}> 
                        Already have an account ?  
                            <Link  to="/login" style={{textDecoration:'none',color:'#2a8ef1',marginLeft:'0.5rem'}}>Login</Link>
                    </Typography>
                </Box>
            </Grid>
        </Box>
    )
}

export default Register
