import {combineReducers} from 'redux';
import SubToDoReducer from './SubToDo/SubToDoReducer';
import ToDoReducer from './ToDo/ToDoReducer';


var rootReducer = combineReducers({
    toDos: ToDoReducer,
    subToDos: SubToDoReducer,
})



export default rootReducer;