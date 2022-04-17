import { useEffect, useState, React } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import CreateSubTask from "./CreateSubTask";
import SubToDoServices from "../Services/SubToDoServices";
import { SetSubToDoStatus } from "../Redux/SubToDo/SubToDoActions";
import { useDispatch } from "react-redux";
import ToDoServices from "../Services/ToDoServices";
import { UpdateStatusOfList } from "../Redux/ToDo/ToDoActions";

export default function SubList({ id, subtodos }) {
  const dispatch = useDispatch();
  const [filteredSubToDos, setFilteredSubToDos] = useState([]);
  useEffect(() => {
    getFilteredSubToDos();
  }, [subtodos]);

  const getFilteredSubToDos = () => {
    const res = subtodos.filter((item) => item.todo_id === id);
    setFilteredSubToDos([...res]);
  };

  const handleToggle = (value) => async () => {
    let count = value.status ? 1 : -1;
    const subFilteredChildren = subtodos.filter((item) => item.todo_id === id);
    subFilteredChildren.forEach((item) => {
      if (item.status === false) {
        count++;
      }
    });
    if (count > 0) {
      const res = await ToDoServices.updateToDo({ status: false }, id);
      dispatch(UpdateStatusOfList(res.data.updatedToDo));
    } else {
      const res = await ToDoServices.updateToDo({ status: true }, id);
      dispatch(UpdateStatusOfList(res.data.updatedToDo));
    }
    const res = await SubToDoServices.updateSubToDo(
      { status: !value.status },
      value._id
    );
    if (res.data) {
      dispatch(SetSubToDoStatus(res.data.updatedSubToDo));
    }
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {filteredSubToDos.map((item) => {
        const labelId = `checkbox-list-secondary-label-${item}`;
        return (
          <ListItem
            key={item._id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(item)}
                checked={item.status}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={`${item.title}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
      <CreateSubTask parentID={id} />
    </List>
  );
}
