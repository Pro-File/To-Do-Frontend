import { SET_ALL_SUBTODO_TO_LIST, ADD_SUBTODO_TO_LIST, ELIMINATE_SUBTODO_FROM_LIST } from "./SubToDoConstants";

 var initialState =  [];
 var SubToDoReducer = (state = initialState, action) =>{
    let subtodos;
    var {type, payload} = action;

    switch(type) {
        case SET_ALL_SUBTODO_TO_LIST:
            return [...payload.data]
        case ADD_SUBTODO_TO_LIST:
           subtodos = [...state, payload.data];
           return subtodos;
        case ELIMINATE_SUBTODO_FROM_LIST:
            subtodos = state.filter((todo) => todo.ID !== payload.todoID);
            return subtodos;
        default:
            return state;
    }
 }

 export default SubToDoReducer;