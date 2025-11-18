import { useState, useEffect } from 'react';
import axios from 'axios';
import './DataComponents.css';

function AxiosData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
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
            Utilisateurs avec Axios
          </h2>
          <div className="api-badge axios-badge">External Library</div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-container">
        <div className="data-header">
          <h2 className="data-title">Utilisateurs avec Axios</h2>
          <div className="api-badge axios-badge">External Library</div>
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
            Utilisateurs avec Axios
          </h2>
          <span className="data-count">{users.length} utilisateurs</span>
        </div>
        <div className="api-badge axios-badge">External Library</div>
      </div>

      <div className="data-content">
        <div className="stats-bar">
          <span>{users.length} utilisateurs chargés</span>
          <button className="refresh-button" onClick={handleRetry}>
            Actualiser
          </button>
        </div>

        <div className="cards-grid">
          {users.map((user) => (
            <div key={user.id} className="data-card user-card">
              <div className="card-header">
                <span className="card-id">#{user.id}</span>
                <div className="user-avatar">
                  {user.name.charAt(0)}
                </div>
              </div>
              <h3 className="card-title">{user.name}</h3>
              <p className="card-email">Email: {user.email}</p>
              <p className="card-phone">Tel: {user.phone}</p>
              <div className="card-address">
                <p>Entreprise: {user.company.name}</p>
                <p>Ville: {user.address.city}, {user.address.street}</p>
              </div>
              <div className="card-footer">
                <span className="website">Site: {user.website}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AxiosData;