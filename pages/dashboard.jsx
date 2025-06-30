export default function Dashboard({ userData, userSettings, setCurrentPage }) {
  return (
    <div id="dashboard" className="page active">
      <header className="page-header">
        <h1>Welcome back, {userSettings.userName}! 🌸</h1>
        <p className="subtitle">Your emotional well-being companion</p>
      </header>

      <div className="quick-actions">
        <div className="action-card primary" onClick={() => setCurrentPage('mood-check')}>
          <div className="card-icon">🎙️</div>
          <h3>Daily Mood Check-In</h3>
          <p>Share how you're feeling today</p>
          <button className="btn-speak">
            <i className="fas fa-microphone"></i> Speak Now
          </button>
        </div>

        <div className="action-card secondary">
          <div className="card-icon">🧘‍♀️</div>
          <h3>Quick Breathing Exercise</h3>
          <p>3-minute calming session</p>
          <button className="btn-action">Start Now</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Today's Mood</h3>
          <div className="mood-display">
            <div className="mood-emoji">
              {userData.moods.length > 0 ? userData.moods[userData.moods.length-1].emoji : '😊'}
            </div>
            <span className="mood-text">
              {userData.moods.length > 0 ? 
                `Feeling ${userData.moods[userData.moods.length-1].mood}` : 
                'No mood recorded yet'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}