import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Divider, ListItem, ListItemIcon } from '@mui/material';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PiCardsThreeLight } from "react-icons/pi";
import { LuUpload } from "react-icons/lu";


const routes = [
  {
    path: 'home',
    name: 'Home',
    icon: <HomeFilledIcon/>
  },
  {
    path: 'message',
    name: 'Message',
    icon: <ChatIcon/>
  },
  {
    path: 'profile',
    name: 'Profile',
    icon: <AccountCircleIcon/>
  },
  {
    path: 'reels',
    name: 'Reels',
    icon: <PiCardsThreeLight/>
  },
  {
    path: 'upload',
    name: 'Upload',
    icon: <LuUpload/>
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
        <Box sx={{ overflow: 'auto', 
           backgroundColor: '#1f2937',
           color: 'white',
           height: '100vh'
           }}>
          <div className="text-3xl px-4 py-4 font7 gap-2 font-bold flex flex-row justify-start items-center">
            <img src="/archvid.svg" alt="ArchVid" className="w-10 h-10" />
            <span>ArchVid</span>

          </div>
          <Divider/>
          <List>
            {routes.map((route, index)=> (
               <Fragment key={route.path}>
               <ListItem component={Link} to={route.path}>
                 <ListItemIcon>
                   {route.icon}
                 </ListItemIcon>
                 {route.name}
               </ListItem>
               {/* Divider after each item */}
               {index < routes.length - 1 && <Divider variant='middle' className='py-1' />}
             </Fragment>
              
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, }}>
        <Outlet/>
      </Box>
    </Box>
  );
}
