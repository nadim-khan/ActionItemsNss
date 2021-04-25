import ACTIONS from '../actions/'

const projects =[]

const projectsReducer = (state = projects, action) => {
    console.log('XXXXXXX : action.type = ',action.type, '\n action.payload : ',action.payload)
    switch(action.type){
        case ACTIONS.GET_ALL_PROJECTS:
            return action.payload
        default:
            return state
    }
}

export default projectsReducer