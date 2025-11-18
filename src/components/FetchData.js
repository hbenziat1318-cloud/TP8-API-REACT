import { useState, useEffect } from 'react';
import './DataComponents.css';

function FetchData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      if (!response.ok) {
        throw new Error('Erreur HTTP: ' + response.status);
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="data-container">
        <div className="data-header">
          <h2 className="data-title">
            Articles avec Fetch API
          </h2>
          <div className="api-badge fetch-badge">Native Browser API</div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-container">
        <div className="data-header">
          <h2 className="data-title">Articles avec Fetch API</h2>
          <div className="api-badge fetch-badge">Native Browser API</div>
        </div>
        <div className="error-container">
          <div className="error-icon">!</div>
          <h3>Erreur de chargement</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={handleRetry}>
            Reessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="data-container">
      <div className="data-header">
        <div className="header-content">
          <h2 className="data-title">
            Articles avec Fetch API
          </h2>
          <span className="data-count">{posts.length} articles</span>
        </div>
        <div className="api-badge fetch-badge">Native Browser API</div>
      </div>

      <div className="data-content">
        <div className="stats-bar">
          <span>{posts.length} articles chargés</span>
          <button className="refresh-button" onClick={handleRetry}>
            Actualiser
          </button>
        </div>

        <div className="cards-grid">
          {posts.slice(0, 12).map((post) => (
            <div key={post.id} className="data-card">
              <div className="card-header">
                <span className="card-id">#{post.id}</span>
                <span className="card-user">User {post.userId}</span>
              </div>
              <h3 className="card-title">{post.title}</h3>
              <p className="card-body">{post.body.substring(0, 100)}...</p>
              <div className="card-footer">
                <span className="read-more">Lire la suite</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FetchData;