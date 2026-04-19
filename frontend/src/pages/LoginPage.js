import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Improved variable name from nameError
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // The login function MUST return the user object from the context
      const user = await login(email, password);
      
      if (user) {
        // Successful login: Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      }
    } catch (err) {
      // Capture the specific error message from your backend auth.routes.js
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='signup-form'>
      <h2>Login to Rubiks</h2>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type='email' 
          placeholder='Email address'
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type='password' 
          placeholder='Password'
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button type='submit'>Login</button>
      </form>
      <p>Don't have an account? <Link to='/register'>Register here</Link></p>
    </div>
  );
};

export default LoginPage;