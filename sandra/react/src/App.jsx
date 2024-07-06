import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from 'react-router-dom';
// import './App.css'; 


// pages 
import User from './pages/User';
import Doctor from './pages/Doctor';
import Admin from './pages/Admin';
import Signup from './pages/Signup';
import SignupDoctor from './pages/SignupDoctor';
import Login from './pages/Login';
import Home from './pages/Home';

// layouts
import RouteLayout from './layouts/RouteLayout';
// component 
import Chats from './components/Chats';
import ChatMessages from './components/ChatMessages';
import UploadDocument from './components/UploadDocument'; 
import AdminDoctors from './components/AdminDoctors';
import RequestVerfiy from './components/RequestVerfiy';
import VideoCall from './components/VideoCall';
import InfoForVideo from './components/InfoForVideo'; 
import PostsSession from './components/PostsSession'; 
import './components/translateCom.js'; 
import SharePost from './components/SharePost';
import SuggestVideo from './components/SuggestVideo';
import SeePost from './components/SeePost';
import LikedPost from './components/LikedPost';
import AdminPost from './components/AdminPost';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RouteLayout />}>
            <Route index element={<User />} />
            <Route path="/home" element={<Home />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signup/doctor' element={<SignupDoctor />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/doctor' element={<Doctor />} />
            <Route path='/user' element={<User />} />
            <Route path='/chats' element ={<Chats/>} />
            <Route path='/chat/messages' element={<ChatMessages/>}/>
            <Route path='/verfiy' element={<UploadDocument/>}/>
            <Route path='/control/doctors' element={<AdminDoctors/>}/>
            <Route path='/request/verfiy' element={<RequestVerfiy/>}/>
            <Route path='/chat/video/call' element={<VideoCall/>}/>
            <Route path='/intro/for/video/call' element={<InfoForVideo/>}/>
            <Route path='/posts' element={<PostsSession/>}/>
            <Route path='/share/post' element={<SharePost/>}/>
            <Route path='/suggest/videos' element={<SuggestVideo/>}></Route>
            <Route path='/see/post' element={<SeePost/>}/>
            <Route path='/liked/post' element={<LikedPost/>}></Route>
            <Route path='/admin/posts' element={<AdminPost/>}/>
            
          
        </Route>
    )
)

class App extends React.Component {

    render() {
        return (
            <RouterProvider className="background" router={router}/>
        )
    }
}

export default App; 