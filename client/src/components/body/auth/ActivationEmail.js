import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
// import Notification from '../utilities/Notification'
const initialNotification = {
    type:'',
    msg:''
}
function ActivationEmail() {
    const {activation_token} = useParams()
    const [notification, setNotification] = useState(initialNotification)

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', {activation_token})
                    if(res) {
                        setNotification({...notification,type:'success',msg:"Your account has been activated !"});
                        return
                    }
                    
                } catch (err) {
                    err.response.data.msg && setNotification({...notification,type:'error',msg:err.response.data.msg})
                    return
                }
            }
           //   activationEmail()
        }
    },[activation_token,notification])

    return (
        <></>
        // <Notification type={notification.type} msg={notification.msg}/>
    )
}

export default ActivationEmail
