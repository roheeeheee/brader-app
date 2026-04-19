import{useState}from'react';
import{useNavigate,Link}from'react-router-dom';
import{useAuth}from'../context/AuthContext';
const LoginPage=()=>{
const[email,setEmail] =useState('');
const[password,setPassword]=useState('');
const[nameError,setError] =useState('');
const{login}=useAuth();
const navigate =useNavigate();
const handleSubmit=async(e)=>{
e.preventDefault();
setError('');
try{
const user=await login(email, password);
//Redirectbasedonrole
navigate(user.role==='admin'? '/admin' : '/home');
}catch(err){
setError(err.response?.data?.message || 'Login failed. Please try again.');
}
};
return(
<div className='signup-form'>
<h2>Login to Rubiks</h2>
{nameError&&<p className='error'>{nameError}</p>}
<form onSubmit={handleSubmit}>
<input type='email' placeholder='Email address'
value={email} onChange={e=> setEmail(e.target.value)} required />
<input type='password' placeholder='Password'
value={password} onChange={e => setPassword(e.target.value)} required />
<button type='submit'>Login</button>
</form>
<p>Don't have an account?<Link to='/register'>Register here</Link></p>
</div>
);
};
export default LoginPage;