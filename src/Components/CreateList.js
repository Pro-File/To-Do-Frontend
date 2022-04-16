import React,{ useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ToDoServices from "../Services/ToDoServices";
import MuiAlert from "@mui/material/Alert";
import { SetToList } from "../Redux/ToDo/ToDoActions";
import { useDispatch } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateList = () => {
  const [title, setTitle] = useState("");
  const [notify, setNotify] = useState({
    message: "Hello Worlds",
    type: "success",
    open: false,
  });
  const dispatch = useDispatch();
  const action = (
    <div>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(e) => setNotify({ ...notify, open: false })}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );

  const handleListSubmit = async () => {
    const res = await ToDoServices.createToDo({ title: title });
    if (res.data) {
      dispatch(SetToList(res.data.data));
      setNotify({
        open: true,
        message: res.data.message,
        type: "success",
      });
      setTitle("");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Snackbar
        open={notify.open}
        action={action}
        autoHideDuration={6000}
        onClose={(e) => setNotify({ ...notify, open: false })}
      >
        <Alert
          onClose={(e) => setNotify({ ...notify, open: false })}
          severity={notify.type}
          sx={{ width: "100%" }}
        >
          {notify.message}
        </Alert>
      </Snackbar>
      <TextField
        id="standard-basic"
        variant="filled"
        color="success"
        focused
        label="Enter New List Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="medium"
        color="success"
        title="Add"
        onClick={handleListSubmit}
      >
        <AddBoxIcon />
      </Button>
    </div>
  );
};

export default CreateList;
