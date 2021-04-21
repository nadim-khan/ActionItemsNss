import React,{useEffect, useState} from 'react'
import { Box, Grid,} from '@material-ui/core';
import { makeStyles,  } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import ProjectMenu from '../app/ProjectMenu';
import DetailsMenu from '../app/DetailsMenu';
import History from '../app/History';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      
      mainGrid:{
          width:'100%'
      },
      
}));

  
function Home() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const users = useSelector((state) => state.users);
    const { user, isAdmin } = auth;
    const [loading, setLoading] = useState(false);
    const [allApps, setAllApps]=useState([]);
    useEffect(() => {
        setLoading(true)
        const getAllApps = async () => {
            const res = await axios.get('/app/getAllApps')
            if(res.data.length){
                setLoading(false)
                setAllApps(res.data)
            }
            
            //dispatch({type: 'GET_All_APPS', payload: res.data.})
          }
          getAllApps()
      },[allApps.length])

    return (
        <Box component="div">
            {/* <CircularProgress></CircularProgress> */}
             <Grid container  className={classes.mainGrid}>
                <Grid item xs={3}>
                    <ProjectMenu data={allApps}/>
                </Grid>
                <Grid item xs={6}>
                    <DetailsMenu/>
                </Grid>
                <Grid item xs={3}>
                    <History/>
                </Grid>
             </Grid>
        </Box>
    )
}

export default Home
