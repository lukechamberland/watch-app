import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

export default function ToggleNav({ isOpen, toggleDrawer }) {
    const anchor = 'left';

    const navigate = useNavigate();

    const changeNavigation = function(route) {
      navigate(route);
    }
  
    const list = (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
      >
        <List>
          {['Mens', 'Womens', 'Kids', 'Athletic'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => changeNavigation(`/${text.toLowerCase()}`)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    );
  
    return (
      <Drawer
        anchor={anchor}
        open={isOpen}
        onClose={() => toggleDrawer(false)}
      >
        {list}
      </Drawer>
    );
};
