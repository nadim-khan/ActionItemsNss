import ACTIONS from './index'
import axios from 'axios'


export const fetchOneProject = async (token,id) => {
    const res = await axios.post('/app/infor', {
        headers: {Authorization: token}
    })
    return res
}

// All Projects Data
export const fetchAllProject = async (token) => {
    const res = await axios.get('/app/getAllApps', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchAllProject = (res) => {
    return {
        type: ACTIONS.GET_ALL_PROJECTS,
        payload: res.data
    }
}

// All Projects Data specific to user
export const fetchUsersAllProject = async (token,email) => {
    const res = await axios.post(`/app/getUserApps`, email,{
        headers: {Authorization: token}
    })
    return res
}

export const dispatchUsersAllProject = (res) => {
    return {
        type: ACTIONS.FETCH_USERS_ALL_PROJECTS,
        payload: res.data
    }
}

//Delete Single Project

export const deleteOneProject = async (token,projectId) => {
    const res = await axios.delete(`/app/deleteApp/${projectId}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchDeleteProject = (res) => {
    return {
        type: ACTIONS.DELETE_ONE_PROJECT,
        payload: res.data
    }
}

//Update Single Project

export const updateOneProject = async (token,projectId) => {
    const res = await axios.update(`/app/deleteApp/${projectId}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchUpdateProject = (res) => {
    return {
        type: ACTIONS.UPDATE_ONE_PROJECT,
        payload: res.data
    }
}

