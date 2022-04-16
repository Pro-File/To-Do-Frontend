import { useEffect } from 'react';
import './App.css';
import Accordions from './Components/Accordions';
import SubToDoServices from './Services/SubToDoServices';
import ToDoServices from './Services/ToDoServices';
import {SetAllToList} from './Redux/ToDo/ToDoActions';
import { useDispatch } from 'react-redux';
import { SetAllSubToDos } from './Redux/SubToDo/SubToDoActions';
import CreateList from './Components/CreateList';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);
  
  const getData = async() => {
    const todores = await ToDoServices.getToDos();
    const subres = await SubToDoServices.getSubToDos();
    if(todores.data.data && subres.data.data){
     dispatch(SetAllToList(todores.data.data));
     dispatch(SetAllSubToDos(subres.data.data));
    }
  }
  
  return (
    <div className="App">
     <div className="main-container">
     <h1 className="main-head">To Do Application</h1>
      <CreateList/>
     <Accordions getData={getData}/>
     </div>
    </div>
  );
}

export default App;
