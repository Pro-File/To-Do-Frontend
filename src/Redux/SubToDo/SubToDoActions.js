import { SET_ALL_SUBTODO_TO_LIST, ADD_SUBTODO_TO_LIST, ELIMINATE_SUBTODO_FROM_LIST, UPDATE_SUBTODO_STATUS } from "./SubToDoConstants";


// Set All Todos
export var SetAllSubToDos = (data) => async(dispatch) => {
    dispatch({
        type: SET_ALL_SUBTODO_TO_LIST,
        payload: {
            data
        }
    })
}

// Adding ToDo
export var SetSubToDoToList = (data) => async(dispatch) => {
    dispatch({
        type: ADD_SUBTODO_TO_LIST,
        payload: {
            data
        }
    })
}

// Update Status
export var SetSubToDoStatus = (subtodo) => async(dispatch) => {
    dispatch({
        type: UPDATE_SUBTODO_STATUS,
        payload: {
            subtodo
        }
    })
}

// Deleting ToDo
export var EliminateSubToDoFromList = (todoID) => async(dispatch) =>{
    try {
    dispatch({
        type: ELIMINATE_SUBTODO_FROM_LIST,
        payload: {
            todoID
        }
    })
    } catch (error) {
        console.log(error)
    }
}