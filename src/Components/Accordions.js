import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import SubList from "./SubList";
import { Checkbox } from "@mui/material";
import { UpdateStatusOfList } from "../Redux/ToDo/ToDoActions";
import ToDoServices from "../Services/ToDoServices";
import SubToDoServices from "../Services/SubToDoServices";
import { SetSubToDoStatus } from "../Redux/SubToDo/SubToDoActions";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Accordions({ getData }) {
  const [expanded, setExpanded] = React.useState("panel1");
  const todos = useSelector((state) => state.toDos);
  const subtodos = useSelector((state) => state.subToDos);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Reload!");
  }, [todos, subtodos]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleToggle = (value) => async () => {
    const res = await ToDoServices.updateToDo(
      { status: !value.status },
      value._id
    );
    if (res.data) {
      const filteredChildren = subtodos.filter(
        (item) => item.todo_id === value._id
      );
      for (var child of filteredChildren) {
        const result = await SubToDoServices.updateSubToDo(
          { status: res.data.updatedToDo.status },
          child._id
        );
        if (result.data) {
          dispatch(SetSubToDoStatus(result.data.updatedSubToDo));
        }
      }
      dispatch(UpdateStatusOfList(res.data.updatedToDo));
    }
  };

  return (
    <div>
      {todos.map((item) => {
        const labelId = `checkbox-list-secondary-label-${item}`;
        return (
          <Accordion
            key={item._id}
            expanded={expanded === item._id}
            onChange={handleChange(item._id)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <div className="main-row">
                <Typography className="row-text" style={{ width: "70%" }}>
                  {item.title}
                </Typography>
                <Typography className="row-sidearea" style={{ width: "15%" }}>
                  {
                    subtodos.filter(
                      (subtodo) =>
                        subtodo.todo_id === item._id && subtodo.status === true
                    ).length
                  }
                  <span className="text">of</span>
                  {
                    subtodos.filter((subtodo) => subtodo.todo_id === item._id)
                      .length
                  }
                </Typography>
                <Checkbox
                  className="row-sidearea"
                  style={{ width: "15%" }}
                  edge="end"
                  onChange={handleToggle(item)}
                  checked={item.status}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <SubList id={item._id} subtodos={subtodos} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
