import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Divider } from '@mui/material';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';


const routes = [
  {
    path: 'home',
    name: 'Home',
    icon: <HomeFilledIcon/>
  },
  {
    path: 'message',
    name: 'Message',
    icon: <MessageIcon/>
  },
  {
    path: 'editProfile',
    name: 'Edit Profile',
    icon: <EditIcon/>
  },
  {
    path: 'profile',
    name: 'Profile',
    icon: <ProfileIcon/>
  },
  {
    path: 'reels',
    name: 'Reels',
    icon: <ReelsIcon/>
  },
  {
    path: 'upload',
    name: 'Upload',
    icon: <UploadIcon/>
  }
]

const drawerWidth = 240;

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <div className="text-3xl px-4 py-4 font7 gap-2 font-bold flex flex-row justify-start items-center">
            <img src="/archvid.svg" alt="ArchVid" className="w-10 h-10" />
            <span>ArchVid</span>

          </div>
          <Divider/>
          <List>

          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, }}>
        <Outlet/>
      </Box>
    </Box>
  );
}
