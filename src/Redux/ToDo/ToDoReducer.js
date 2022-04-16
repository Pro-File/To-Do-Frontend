import { SET_ALL_TO_LIST, ADD_TO_LIST, ELIMINATE_FROM_LIST } from "./ToDoConstants";

 var initialState =  [];
 var ToDoReducer = (state = initialState, action) =>{
    let todos;
    var {type, payload} = action;

    switch(type) {
        case SET_ALL_TO_LIST:
            return [...payload.data]
        case ADD_TO_LIST:
           todos = [...state, payload.data];
           return todos;
        case ELIMINATE_FROM_LIST:
            todos = state.filter((todo) => todo.ID !== payload.todoID);
            return todos;
        default:
            return state;
    }
 }

 export default ToDoReducer;