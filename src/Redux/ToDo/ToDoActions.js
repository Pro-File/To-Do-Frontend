import { SET_ALL_TO_LIST, ADD_TO_LIST, ELIMINATE_FROM_LIST } from "./ToDoConstants";


// Set All Todos
export var SetAllToList = (data) => async(dispatch) => {
    dispatch({
        type: SET_ALL_TO_LIST,
        payload: {
            data
        }
    })
}

// Adding ToDo
export var SetToList = (data) => async(dispatch) => {
    console.log(data);
    dispatch({
        type: ADD_TO_LIST,
        payload: {
            data
        }
    })
}

// Deleting ToDo
export var EliminateFromList = (todoID) => async(dispatch) =>{
    try {
    dispatch({
        type: ELIMINATE_FROM_LIST,
        payload: {
            todoID
        }
    })
    } catch (error) {
        console.log(error)
    }
}