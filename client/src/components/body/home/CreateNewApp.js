import React, {useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {dispatchLogin} from '../../../redux/actions/authAction'
import { useSelector, useDispatch } from "react-redux";
import {makeStyles,withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {
    Typography,
    Box,
    Grid,
    Button,
    TextField,
    Divider
} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
const useStyles=makeStyles(theme=>({
    form:{
        top:'30%',
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

const CreateNewApp = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useSelector((state) => state.auth);
    const { user }= auth;
    console.log('-------------------------------------------->',user)
    const today = new Date();
    const dd = (today.getDate() < 10 ? '0' : '') + today.getDate();
    const mm = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
    const currDate = `${today.getUTCFullYear()}-${mm}-${dd}`;
    const initialState = {
        projectName:'',
        projectStartDate:currDate,
        projectExpectedEndDate:currDate,
        projectCreatedBy:user.name,
        projectCreatedDate:currDate,
        taskDetails:[{
            taskName:'',
            taskDetails:'',
            taskAssignedTo:'',
            taskCreatedDate:currDate,
            taskStartDate:currDate,
            taskExpectedEndDate:currDate,
        }],
        success:'',
        err:''

    }
    const notificationData = {
        type:'',
        msg:''
    }
    const [projectData, setProjectData] = useState(initialState);
    const [notification, setNotification] = useState(notificationData);

    const { 
        projectName,
        projectStartDate,
        projectCreatedBy,
        projectExpectedEndDate,
        projectCreatedDate,
        taskDetails,
        err,
        success
    } = projectData;

    const changeHandler = async(e) => {
        console.log(e.target.value)
       const {name,value}=e.target;
       setProjectData({...projectData, [name]:value, err:'', success:''});
       setNotification({
            ...notification,
            type:'',
            msg:''
        })
    }

   const handleTaskChange = () => {
        // this.setState({
        //   shareholders: this.state.shareholders.concat([{ name: "" }])
        // });
      };
    
    const handleRemoveTaskChange = idx => () => {
        // this.setState({
        //   shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
        // });
      };

    const createAppSubmit = async(e) => {
        e.preventDefault();
        setNotification({
            ...notification,
            type:'',
            msg:''
        })
        try{
            setProjectData({...projectData,projectCreatedBy:user.name, err:'', success:''});
            console.log('CreateApp : ',projectData)
            // const response= await axios.post('/user/login',{email,password});

            // setProjectData({...projectData, err:'', success:response.data.msg});
            // setNotification({...notification,type:'success',msg:'Successfully Logged In'})

            // localStorage.setItem('firstLogin', true);

            // dispatch(dispatchLogin())
            // history.push('/')

        } catch(err) {
            // err.response.data.msg && setProjectData({...projectData, err:err.response.data.msg, success:''});
            // setNotification({ ...notification,type:'error', msg:err.response.data.msg})
        }
    }

    return (
        <Box component="div" style={{height:'90vh'}}>
        <Grid container justify="center">
        {/* {(notification.type !== '') ? <div><Notification type={notification.type} msg={notification.msg} /><br/></div> : <></>} */}
            <Box component="form" onSubmit={createAppSubmit} className={classes.form} noValidate autoComplete="off">
                
                <Typography className={classes.heading} variant="h5">
                    Create New Project
                </Typography>
                
                    <InputField 
                        fullWidth={true}
                        label="Project Name"
                        name="projectName"
                        type="text"
                        InputProps={{style:{color:"#0747a6"}}}
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        defaultValue={projectName}
                        onChange={changeHandler}
                    />
                    <InputField
                        fullWidth={true}
                        label="Project Start Date"
                        name="projectStartDate"
                        type="date"
                        InputProps={{style:{color:"#0747a6"}}}
                        defaultValue={projectStartDate}
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        onChange={changeHandler}
                    />
                    <InputField
                        fullWidth={true}
                        label="Expected End Date"
                        name="projectExpectedEndDate"
                        type="date"
                        InputProps={{style:{color:"#0747a6"}}}
                        defaultValue={projectExpectedEndDate}
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        onChange={changeHandler}
                    />
                    <InputField 
                        fullWidth={true}
                        name="projectCreatedBy"
                        type="text"
                        InputProps={{style:{display:"none"}}}
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        defaultValue={projectCreatedBy}
                        onChange={changeHandler}
                    />
                    <InputField
                        fullWidth={true}
                        name="projectCreatedDate"
                        type="date"
                        InputProps={{style:{display:"none"}}}
                        defaultValue={projectCreatedDate}
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        onChange={changeHandler}
                    />
                    
                    <Divider/>
                    {projectData.taskDetails.map((task, idx) => (
                        <div className="shareholder">
                            <InputField
                                type="text"
                                placeholder={`Task #${idx + 1} name`}
                                value={task.taskName}
                                onChange={handleTaskChange(idx)}
                            />
                            <button
                                type="button"
                                onClick={handleRemoveTaskChange(idx)}
                                className="small"
                            >
                            -
                            </button>
                        </div>
                        ))}
                <br/>
                <Button disabled={!projectName && !user.name} className={classes.button} variant="outlined" type="submit" fullWidth={true} endIcon={<SendIcon/>}>Create App</Button>
               
            </Box>
        </Grid>
        
    </Box>
    )
}

export default CreateNewApp
