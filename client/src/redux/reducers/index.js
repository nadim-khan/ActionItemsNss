import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import projects from './projectReducer'

export default combineReducers({
    auth,
    token,
    users,
    projects
})