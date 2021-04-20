import React, {useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button';
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
    },
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
    email:'',
    password:'',
    err:'',
    success:''
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

    const { email, password, err, success} = user;

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

            setUser({...user, err:'', success:response.data.msg});
            setNotification({...notification,type:'success',msg:'Successfully Logged In'})

            localStorage.setItem('firstLogin', true);

            dispatch(dispatchLogin())
            // history.push('/')

        } catch(err) {
            err.response.data.msg && setUser({...user, err:err.response.data.msg, success:''});
            setNotification({ ...notification,type:'error', msg:err.response.data.msg})
        }
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)
            if(success) {
                setNotification({
                    ...notification,
                    type:'success',
                    msg:'Successfully Logged In'
                })
               
            }
            dispatch(dispatchLogin())
            history.push('/')
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
        <Box component="div" style={{background:'#222',height:'90vh'}}>
            <Grid container justify="center">
            {/* {(notification.type !== '') ? <div><Notification type={notification.type} msg={notification.msg} /><br/></div> : <></>} */}
                <Box component="form" onSubmit={loginAuth} className={classes.form}>
                    
                    <Typography className={classes.heading} variant="h5">
                        Login
                    </Typography>
                    
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
                    <br/>
                    <Button disabled={!email}className={classes.button} variant="outlined" type="submit" fullWidth={true} endIcon={<SendIcon/>}>Login</Button>
                   
                                        
                    <Typography align="center" style={{color:'#fff',padding:'1rem 0 0.5rem 0' }}> 
                        Don't have account ?  
                            <Link  to="/register" style={{textDecoration:'none',color:'#2a8ef1',marginLeft:'0.5rem'}}>Register</Link>
                    </Typography>
                    <Typography align="center" > 
                        <Link to="/forgotPassword" style={{textDecoration:'none',color:'#2a8ef1',marginLeft:'0.5rem'}}>Can't access your account?</Link>
                    </Typography>

                    <Typography align="center" style={{color:'#fff',padding:'1rem'}}> 
                        OR
                    </Typography>
                    
                    <GoogleLogin style={{height:'1rem'}}
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
            
        </Box>
    )
}

export default Login
