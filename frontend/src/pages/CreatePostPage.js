import{useState}from'react';
import{useNavigate}from'react-router-dom';
import{useAuth}from'../context/AuthContext';
import API  from'../api/axios';
const CreatePostPage=()=>{
const[title,setTitle]=useState('');
const[body,setBody] =useState('');
const[image,setImage]=useState(null);
const[error,setError]=useState('');
const{user} =useAuth();
const navigate =useNavigate();
const handleSubmit=async(e)=>{
e.preventDefault();setError('');
const fd =new FormData();
fd.append('title',title);
fd.append('body', body);
if(image)fd.append('image',image);
try{
const{data}=await API.post('/posts', fd);
navigate(`/posts/${data._id}`);
}catch(err){setError(err.response?.data?.message || 'Failed to publish post');}
};
return(
<div className='create-post-page'>
<h2>WriteaNewPost</h2>
{error&&<p className='error-msg'>{error}</p>}
<form onSubmit={handleSubmit}>
<input value={title}onChange={e => setTitle(e.target.value)}
placeholder='Posttitle'required />
<text areavalue={body}onChange={e => setBody(e.target.value)}
placeholder='Writeyourpost here...' rows={12} required />
{user?.role==='admin'&& (
<div>
<label>UploadCoverImage (Admin only):</label>
<input type='file'accept='image/*' onChange={e =>
setImage(e.target.files[0])}/>
</div>
)}
<button type='submit'>PublishPost</button>
</form>
</div>
);
};
export default CreatePostPage;