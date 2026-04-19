//frontend/src/pages/HomePage.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]); // Initialized as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/posts')
      .then(res => {
        // DEFENSIVE CHECK: Ensure res.data is actually an array before setting state
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          console.error("API did not return an array:", res.data);
          setPosts([]);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Could not load posts. Please check if the server is running.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="home-page" style={{ textAlign: 'center', padding: '50px' }}>
      <div className="spinner"></div>
      <p>Loading the latest cubing news...</p>
    </div>
  );

  if (error) return (
    <div className="home-page" style={{ textAlign: 'center', color: 'red', padding: '50px' }}>
      <p>{error}</p>
    </div>
  );

  return (
    <div className='home-page'>
      <section className="hero-section" style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1>Welcome to Twist & Turn</h1>
        <p>The ultimate community for speedcubers and puzzle enthusiasts.</p>
      </section>

      <h2>Latest Posts</h2>
      
      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#f4f4f4', borderRadius: '8px' }}>
          <p>No posts yet. Be the first to share your progress!</p>
          <Link to="/create-post" className="btn-primary">Create a Post</Link>
        </div>
      ) : (
        <div className='posts-grid'>
          {posts.map(post => (
            <div key={post._id} className='post-card'>
              {post.image && (
                <img 
                  src={`http://localhost:5000/uploads/${post.image}`} 
                  alt={post.title} 
                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'}
                />
              )}
              <div className="post-card-content">
                <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
                <p>{post.body?.substring(0, 120)}...</p>
                <div className="post-meta">
                  <small>By <strong>{post.author?.name || 'Unknown'}</strong></small>
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;