import React, { useState } from 'react';
import Login from './components/Login';
import ExperienceList from './components/ExperienceList';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-brand">
          <div>
            <div className="header-title">Rozgar <span>Pakistan</span></div>
            <div className="header-sub">E-Resume Builder</div>
          </div>
        </div>
        {user && (
          <div className="header-user">
            <div className="avatar">{user.FullName.charAt(0)}</div>
            <span>{user.FullName}</span>
            <button className="btn-logout" onClick={() => setUser(null)}>Logout</button>
          </div>
        )}
      </header>

      <main className="app-main">
        {!user
          ? <Login onLogin={(u) => setUser(u)} />
          : <ExperienceList userID={user.UserID} userName={user.FullName} />
        }
      </main>

      <footer className="app-footer">
        2026 Rozgar Pakistan - Empowering Pakistani Youth
      </footer>
    </div>
  );
}

export default App;
