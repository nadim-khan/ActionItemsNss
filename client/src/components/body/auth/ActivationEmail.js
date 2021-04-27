import React, {useState, useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
const initialNotification = {
    type:'',
    msg:''
}
function ActivationEmail() {
    const history = useHistory()
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
             activationEmail();
             setTimeout(()=>{
                 if(notification.type==='error')
                    history.push('/register')
                else
                    history.push('/login')
                 window.close();
             },3000)
        }
    },[activation_token])

    return (
        <>{notification.type ==='error' && showErrMsg(notification.msg)}
        {notification.type ==='success' && showSuccessMsg(notification.msg)}</>
        
    )
}

export default ActivationEmail
