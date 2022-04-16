import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import SubList from './SubList';
import { Checkbox } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Accordions() {
  const [expanded, setExpanded] = React.useState('panel1');
  const todos = useSelector((state) => state.toDos);
  const subtodos = useSelector((state) => state.subToDos);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
     {
       todos.map((item) => {
        const labelId = `checkbox-list-secondary-label-${item}`;
         return <Accordion key={item._id} expanded={expanded === item._id} onChange={handleChange(item._id)}>
         <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div style={{width: '100%', display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography>{item.title}</Typography>
          <Checkbox
                edge="end"
                // onChange={handleToggle(item)}
                checked={item.status}
                inputProps={{ 'aria-labelledby': labelId }}
              />
          </div>

         </AccordionSummary>
         <AccordionDetails >
          <SubList subtodos={subtodos} id={item._id}/>
         </AccordionDetails>
       </Accordion>
       })
     }

    </div>
  );
}
