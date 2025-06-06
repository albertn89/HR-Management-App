import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Box from '@mui/material/Box';

import { useAppDispatch, useAppSelector } from '../store';
import { resetEmployeeForm } from '../store/slices/employeeFormSlice';
import { resetEmployee } from '../store/slices/employeeSlice';
import { resetUser } from '../store/slices/userSlice';
import { api } from '../utils/utils';

const drawerWidth = 240;

export default function NavDrawer() {
  const user = useAppSelector((state) => state.user.user);
  const employee = useAppSelector((state) => state.employee.employee);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentRoute = location.pathname;
    if (!user && currentRoute !== '/') {
      navigate('/');
    }
  }, [user, location.pathname, navigate]);

  const handleLogout = async () => {
    await api('/user/logout', {
      method: 'post',
    });
    dispatch(resetUser());
    dispatch(resetEmployee());
    dispatch(resetEmployeeForm());
    navigate('/');
  };

  const onboarded = employee && employee.onboardingStatus == 'Approved';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation menu"
      >
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Card variant="outlined">
            {user ? (
              <>
                <CardHeader
                  avatar={<Avatar></Avatar>}
                  title={user.username}
                  subheader={user.email}
                />
                <CardActions>
                  <Button onClick={handleLogout}>Logout</Button>
                </CardActions>
              </>
            ) : (
              <ListItem>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </Card>
          {user && (
            <List>
              {onboarded ? (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/personal-info')}>
                      <ListItemText primary="Personal Information" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('visa')}>
                      <ListItemText primary="Visa Status" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('housing')}>
                      <ListItemText primary="Housing" />
                    </ListItemButton>
                  </ListItem>
                </>
              ) : (
                <>
                  {' '}
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/onboard')}>
                      <ListItemText primary="Onboard Application" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )}
            </List>
          )}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
