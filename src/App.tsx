import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Authlogin/Login'
// import Signup from './pages/Authlogin/Signup'
import WelcomeScreen from './WelcomeScreen'
import Layout from './component/Layout'
import Home from './pages/Home'
import Message from './pages/Message'
import Profile from './pages/Profile'
import Reels from './pages/Reels'
import Uplaod from './pages/Uplaod'
import EditProfile from './component/EditProfile'

function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/register' element={<Signup/>}/> */}

        <Route path='/' element={<WelcomeScreen/>}/>

        
        <Route element={<Layout/>}>
          <Route path='home' element={<Home/>}/>
          <Route path='message' element={<Message/>}/>

          <Route path='editProfile' element= {<EditProfile/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='reels' element={<Reels/>}/>
          <Route path='upload' element={<Uplaod/>}/>
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
