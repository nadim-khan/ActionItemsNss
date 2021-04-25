import ACTIONS from './index'
import axios from 'axios'


export const fetchOneProject = async (token,id) => {
    const res = await axios.post('/app/infor', {
        headers: {Authorization: token}
    })
    return res
}

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

