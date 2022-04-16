import { useEffect,useState, React } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function SubList({subtodos, id}) {
    useEffect(() => {
        getFilteredSubToDos()
    }, [])
  const [filteredSubToDos, setFilteredSubToDos] = useState([]);

  const getFilteredSubToDos = () => {
    const res = subtodos.filter((item) => item.todo_id === id);
    setFilteredSubToDos([...res]);
  }

  const handleToggle = (value) => () => {
    console.log(value);
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
                inputProps={{ 'aria-labelledby': labelId }}
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
    </List>
  );
}
