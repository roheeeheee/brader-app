import {useState} from 'react';
import {useAuth} from '../context/AuthContext';
import API from'../api/axios';
const ProfilePage=()=>{
const{user,setUser}=useAuth();
const[name,setName] =useState(user?.name || '');
const[bio,setBio] =useState(user?.bio || '');
const[pic,setPic] =useState(null);
const[curPw,setCurPw]=useState('');
const[newPw,setNewPw]=useState('');
const[msg,setMsg] =useState('');
const handleProfile=async(e)=> {
e.preventDefault();setMsg('');
const fd =new FormData();
fd.append('name',name);
fd.append('bio', bio);
if(pic)fd.append('profilePic',pic);
try{
//DoNOTmanuallysetContent-Type — Axios sets multipart automatically
const{data}=await API.put('/auth/profile', fd);
setUser(data);
setMsg('Profileupdatedsuccessfully!');
}catch(err){setMsg(err.response?.data?.message || 'Error'); }
};
const handlePassword=async(e) => {
e.preventDefault();setMsg('');
try{
await API.put('/auth/change-password', {currentPassword: curPw, newPassword:newPw});
setMsg('Passwordchangedsuccessfully!');
setCurPw('');setNewPw('');
}catch(err){setMsg(err.response?.data?.message || 'Error'); }
};
const picSrc=user?.profilePic
?`http://localhost:5000/uploads/${user.profilePic}`
:'/default-avatar.png';
return(
<div className='profile-page'>
<h2>MyProfile</h2>
<img src={picSrc}alt='Profile' className='profile-pic-preview' />
{msg&&<p className='success-msg'>{msg}</p>}
<form onSubmit={handleProfile}>
<h3>EditProfile</h3>
<input value={name}onChange={e => setName(e.target.value)}
placeholder='Displayname'/>
<text areavalue={bio}onChange={e => setBio(e.target.value)}
placeholder='Shortbio...'rows={3}/>
<label>ChangeProfilePicture:</label>
<input type='file'accept='image/*' onChange={e =>
setPic(e.target.files[0])}/>
<button type='submit'>SaveProfile</button>
</form>
<form onSubmit={handlePassword}>
<h3>ChangePassword</h3>
<input type='password'placeholder='Current password'
value={curPw}onChange={e=> setCurPw(e.target.value)} required />
<input type='password'placeholder='New password (min 6 chars)'
value={newPw}onChange={e=> setNewPw(e.target.value)} required
minLength={6}/>
<button type='submit'>ChangePassword</button>
</form>
</div>
);
};
export default ProfilePage;
