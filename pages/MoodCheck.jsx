import { useState } from 'react';

export default function MoodCheck({ userData, setUserData }) {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: 'great', emoji: '😄', label: 'Great' },
    { id: 'good', emoji: '😊', label: 'Good' },
    { id: 'okay', emoji: '😐', label: 'Okay' },
    { id: 'sad', emoji: '😔', label: 'Sad' },
    { id: 'anxious', emoji: '😰', label: 'Anxious' },
    { id: 'angry', emoji: '😠', label: 'Angry' }
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setUserData(prev => ({
      ...prev,
      moods: [...prev.moods, {
        date: new Date(),
        mood: mood.id,
        emoji: mood.emoji,
        note: ''
      }]
    }));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add voice recording logic here
  };

  return (
    <div id="mood-check" className="page">
      <header className="page-header">
        <h1>Daily Mood Check-In 💝</h1>
        <p className="subtitle">How are you feeling today?</p>
      </header>

      <div className="mood-check-container">
        <div className="voice-interface">
          <div className="voice-visualizer" style={{ display: isRecording ? 'flex' : 'none' }}>
            {[...Array(4)].map((_, i) => <div key={i} className="wave"></div>)}
          </div>
          
          <button 
            className={`btn-voice ${isRecording ? 'recording' : ''}`} 
            onClick={toggleRecording}
          >
            <i className="fas fa-microphone"></i>
            <span>{isRecording ? 'Listening...' : 'Tap to Speak'}</span>
          </button>
        </div>

        <div className="mood-options">
          <h3>Or select your mood:</h3>
          <div className="mood-grid">
            {moods.map(mood => (
              <div 
                key={mood.id}
                className={`mood-option ${selectedMood?.id === mood.id ? 'selected' : ''}`}
                onClick={() => handleMoodSelect(mood)}
              >
                <div className="mood-emoji">{mood.emoji}</div>
                <span>{mood.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}