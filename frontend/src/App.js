import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Quiz from './pages/Quiz';
import './style.css'; 
//frontend/src/App.js
//import Navbar from'./components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PostPage from'./pages/PostPage';
import ProfilePage from'./pages/ProfilePage';
import CreatePostPage from'./pages/CreatePostPage';
import EditPostPage from'./pages/EditPostPage';
import AdminPage from'./pages/AdminPage';

function App(){
return(
<>
<Header/>

<Routes>
{/*Publicroutes—anyonecan visit */}
<Route path='/' element={<SplashPage />} />
<Route path='/home' element={<HomePage />} />
<Route path='/about' element={<AboutPage />} />
<Route path='/contact' element={<ContactPage />} />
<Route path='/posts/:id'element={<PostPage />} />
<Route path='/login' element={<LoginPage />} />
<Route path='/register' element={<RegisterPage />} />
<Route path='/quiz' element={<Quiz />} />
{/*Protectedroutes—mustbe logged in */}
<Route path='/profile'
element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
<Route path='/create-post'
element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
<Route path='/edit-post/:id'
element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
{/*Adminonly—redirectsmembers/guests to home */}
<Route path='/admin'
element={<ProtectedRoute role='admin'><AdminPage /></ProtectedRoute>}
/>
</Routes>
</>
);
}


export default App;


