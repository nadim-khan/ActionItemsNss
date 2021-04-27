import React from 'react'
import './notification.css'

export const showErrMsg = (msg) => {
    return <div id="notification" className="errMsg ">{msg}</div>
}

export const showSuccessMsg = (msg) => {
        return <div id="notification" className="successMsg">{msg}</div>
}

