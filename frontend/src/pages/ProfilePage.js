import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');

  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg('');
    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);
    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setMsg('Profile updated successfully!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error updating profile');
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await API.put('/auth/change-password', { currentPassword: curPw, newPassword: newPw });
      setMsg('Password changed successfully!');
      setCurPw('');
      setNewPw('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error changing password');
    }
  };

  const picSrc = user?.profilePic 
    ? `http://localhost:5000/uploads/${user.profilePic}` 
    : '/default-avatar.png';

  return (
    <div className='profile-page'>
      <h2>My Profile</h2>
      <div className="profile-header">
        <img src={picSrc} alt='Profile' className='profile-pic-preview' style={{ width: '100px', borderRadius: '50%' }} />
        <p>Role: <strong>{user?.role}</strong></p>
      </div>
      
      {msg && <p className='info-msg'>{msg}</p>}

      <form onSubmit={handleProfile}>
        <h3>Edit Profile</h3>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder='Display name' 
        />
        {/* CORRECTED TEXTAREA SYNTAX */}
        <textarea 
          value={bio} 
          onChange={e => setBio(e.target.value)} 
          placeholder='Short bio...' 
          rows={4} 
        />
        <label>Change Profile Picture:</label>
        <input type='file' accept='image/*' onChange={e => setPic(e.target.files[0])} />
        <button type='submit'>Save Profile</button>
      </form>

      <form onSubmit={handlePassword} style={{ marginTop: '20px' }}>
        <h3>Change Password</h3>
        <input 
          type='password' 
          value={curPw} 
          onChange={e => setCurPw(e.target.value)} 
          placeholder='Current Password' 
          required 
        />
        <input 
          type='password' 
          value={newPw} 
          onChange={e => setNewPw(e.target.value)} 
          placeholder='New Password' 
          required 
        />
        <button type='submit'>Update Password</button>
      </form>
    </div>
  );
};

export default ProfilePage;