import React, {useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button';
import {makeStyles,withStyles} from '@material-ui/core/styles';
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'    
import axios from 'axios';
import {
    Typography,
    Box,
    Grid,
    Button,
    TextField
} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
const useStyles=makeStyles(theme=>({
    
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
    },
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
        }
    }
})(TextField)
const initialState = {
    email:'',
    password:'',
}
const notificationData = {
    type:'',
    msg:''
}
const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [user, setUser] = useState(initialState);
    const [notification, setNotification] = useState(notificationData);

    const { email, password} = user;

    const changeHandler = async(e) => {
       const {name,value}=e.target;
       setUser({...user, [name]:value, err:'', success:''});
       setNotification({
            ...notification,
            type:'',
            msg:''
        })
    }

    const loginAuth = async(e) => {
        e.preventDefault();
        setNotification({
            ...notification,
            type:'',
            msg:''
        })
        try{
            const response= await axios.post('/user/login',{email,password});

            setUser({...user});
            setNotification({...notification,type:'success',msg:response.data.msg})

            localStorage.setItem('firstLogin', true);

            dispatch(dispatchLogin())
            // history.push('/')

        } catch(err) {
            err.response.data.msg && setUser({...user});
            setNotification({ ...notification,type:'error', msg:err.response.data.msg})
        }
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

            setUser({...user})
            localStorage.setItem('firstLogin', true)
            if(res) {
                setNotification({
                    ...notification,
                    type:'success',
                    msg:'Successfully Logged In'
                })
                setTimeout(()=>{
                    
                       history.push('/')
                },2000)
            }
            dispatch(dispatchLogin())
            
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
            setNotification({
                ...notification,
                type:'error',
                msg:'Something went wrong'
            })
        }
    }

    return (
        <Box component="div" style={{height:'90vh'}}>
            <Grid container justify="center">
            <Grid item xs={9}>
            {/* {(notification.type !== '') ? <div><Notification type={notification.type} msg={notification.msg} /><br/></div> : <></>} */}
                <Box component="form" onSubmit={loginAuth} className={classes.form}>
                    
                    <Typography className={classes.heading} variant="h5">
                        Login
                    </Typography>
                    {notification.type ==='error' && showErrMsg(notification.msg)}
                    {notification.type ==='success' && showSuccessMsg(notification.msg)}
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
                    <br/>
                    <Button disabled={!email} className={classes.button} variant="outlined" type="submit" fullWidth={true} endIcon={<SendIcon/>}>Login</Button>
                   
                                        
                    <Typography align="center" style={{color:'#0747a6',padding:'1rem 0 0.5rem 0' }}> 
                        Don't have account ?  
                            <Link  to="/register" style={{textDecoration:'none',color:'#0747a6',marginLeft:'0.5rem',fontWeight:'700'}}>Register</Link>
                    </Typography>
                    <Typography align="center" > 
                        <Link to="/forgotPassword" style={{textDecoration:'none',color:'#0747a6',marginLeft:'0.5rem',fontWeight:'700'}}>Can't access your account?</Link>
                    </Typography>

                    <Typography align="center" style={{color:'#0747a6',padding:'1rem'}}> 
                        OR
                    </Typography>
                    
                    <GoogleLogin style={{height:'1rem',background:'#0747a6'}}
                        clientId="1071947068127-gdao61sj7ofgtf9f1hl4s7vhcsciv3ju.apps.googleusercontent.com"
                        buttonText="Login with google"
                        render={renderProps => (
                            <GoogleButton 
                            label="Google Login"
                             style={{width:'100%'}}
                             onClick={renderProps.onClick}
                             disabled={renderProps.disabled}
                             />
                          )}
                        icon="false"
                        onSuccess={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </Box>
                </Grid>
            </Grid>
            
        </Box>
    )
}

export default Login
