import React, { useState } from 'react';
import FetchData from './components/FetchData';
import AxiosData from './components/AxiosData';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('fetch');

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🌐 TP API avec React</h1>
        <p className="app-subtitle">Comparaison entre Fetch et Axios</p>
      </header>

      <nav className="tab-navigation">
        <button 
          className={activeTab === 'fetch' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('fetch')}
        >
          📝 Fetch API
        </button>
        <button 
          className={activeTab === 'axios' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('axios')}
        >
          ⚡ Axios
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'fetch' && <FetchData />}
        {activeTab === 'axios' && <AxiosData />}
      </main>

      <footer className="app-footer">
        <p>TP React - Consommation d'API</p>
      </footer>
    </div>
  );
}

export default App;