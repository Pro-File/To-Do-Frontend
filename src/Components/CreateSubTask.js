import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch } from "react-redux";
import ListItem from "@mui/material/ListItem";
import SubToDoServices from "../Services/SubToDoServices";
import { SetSubToDoToList } from "../Redux/SubToDo/SubToDoActions";

const CreateSubTask = ({ parentID }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleListSubmit = async () => {
    const res = await SubToDoServices.createSubToDo({
      title: title,
      todo_id: parentID,
    });
    if (res.data) {
      dispatch(SetSubToDoToList(res.data.data));
      setTitle("");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <TextField
          id="standard-basic"
          variant="standard"
          size="small"
          color="success"
          label="Enter New Sub Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  variant="outlined"
                  size="large"
                  color="success"
                  onClick={handleListSubmit}
                >
                  <AddBoxIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </ListItem>
    </div>
  );
};

export default CreateSubTask;
