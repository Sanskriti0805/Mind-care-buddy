// Later: connect to backend
document.getElementById('speakBtn').addEventListener('click', () => {
    // For demo: replace with real call
    document.getElementById('assistantReply').textContent = "I'm here for you! How are you feeling?";
});

// Mood trend chart demo data
const ctx = document.getElementById('moodChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Mood (1-10)',
            data: [5, 6, 7, 6, 8, 7, 9],
            borderColor: '#A58CB8',
            backgroundColor: 'rgba(165,140,184,0.2)',
            tension: 0.3
        }]
    },
    options: {
        scales: {
            y: { beginAtZero: true, max: 10 }
        }
    }
});
