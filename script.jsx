let currentPage = 'dashboard';
let isRecording = false;
let breathingInterval = null;
let breathingPhase = 'inhale';
let userSettings = {
    careMode: 'general',
    userName: 'Sarah',
    cycleDay: 14,
    pregnancyWeek: 20
};

// User data storage (in-memory)
let userData = {
    moods: [],
    cycleData: {
        currentDay: 14,
        phase: 'ovulation',
        lastPeriod: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    },
    pregnancyData: {
        week: 20,
        dueDate: new Date(Date.now() + 140 * 24 * 60 * 60 * 1000)
    },
    elderlyReminders: [
        { id: 1, text: 'Take morning medication', time: '8:00 AM', completed: true },
        { id: 2, text: 'Lunch Time', time: '12:30 PM', completed: false },
        { id: 3, text: 'Call Sarah', time: '3:00 PM', completed: false }
    ]
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateDashboard();
});

function initializeApp() {
    // Set initial page
    showPage('dashboard');
    
    // Update user-specific content
    updateUserContent();
    
    // Initialize voice features if available
    initializeVoiceFeatures();
    
    // Set up responsive navigation
    setupResponsiveNav();
}

function setupEventListeners() {
    // Navigation hamburger
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close nav menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navMenu) {
            navMenu.classList.remove('active');
        }
    });

    // Voice button
    const voiceBtn = document.getElementById('voiceBtn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', toggleVoiceRecording);
    }

    // Mood chart interactions
    const chartBars = document.querySelectorAll('.bar');
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', showBarTooltip);
        bar.addEventListener('mouseleave', hideBarTooltip);
    });
}

function setupResponsiveNav() {
    // Close mobile menu when nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

<html lang="en">
<head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🌸 MindCare Buddy</title>
    <style>
        /* Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Navigation */
        .navbar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            transition: all 0.3s ease;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            height: 70px;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 600;
            color: #764ba2;
        }

        .nav-menu {
            display: flex;
            gap: 30px;
        }

        .nav-link {
            text-decoration: none;
            color: #555;
            font-weight: 500;
            padding: 8px 16px;
            border-radius: 20px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .nav-link:hover {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            transform: translateY(-2px);
        }

        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
        }

        .hamburger span {
            width: 25px;
            height: 3px;
            background: #764ba2;
            margin: 3px 0;
            transition: 0.3s;
        }

        /* Pages */
        .page {
            display: none;
            margin-top: 70px;
            min-height: calc(100vh - 70px);
            animation: fadeIn 0.5s ease-in;
        }

        .page.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .page-header {
            text-align: center;
            margin-bottom: 40px;
            padding: 40px 20px;
        &rbrace;

.page-header h1 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 10px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
&rbrace;
.subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 300;
&rbrace;

/* Dashboard */
.quick-actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
&rbrace;

.action-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
&rbrace;

.action-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
&rbrace;

.action-card.primary {
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
    color: white;
&rbrace;

.card-icon {
    font-size: 3rem;
    margin-bottom: 15px;
&rbrace;

.action-card h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
&rbrace;

.btn-speak {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 15px;
&rbrace;

.btn-speak:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
&rbrace;
.btn-action {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 15px;
&rbrace;

.btn-action:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
&rbrace;

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
&rbrace;

.dashboard-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
&rbrace;

.dashboard-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
&rbrace;

.dashboard-card h3 {
    color: #764ba2;
    margin-bottom: 20px;
    font-size: 1.3rem;
&rbrace;

.mood-display {
    display: flex;
    align-items: center;
    gap: 15px;
&rbrace;

.mood-emoji {
    font-size: 3rem;
&rbrace;

.mood-text {
    font-size: 1.2rem;
    font-weight: 500;
    color: #555;
&rbrace;

.cycle-info {
    text-align: center;
&rbrace;

.cycle-day {
    font-size: 2rem;
    font-weight: 600;
    color: #764ba2;
    margin-bottom: 5px;
&rbrace;

.cycle-phase {
    color: #667eea;
    font-weight: 500;
    margin-bottom: 10px;
&rbrace;

.cycle-tip {
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
&rbrace;

.mood-week {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
&rbrace;

.day-mood {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.2rem;
    background: #f0f0f0;
    transition: all 0.3s ease;
&rbrace;

.day-mood.current {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    transform: scale(1.1);
&rbrace;

.week-insight {
    color: #666;
    font-size: 0.9rem;
    text-align: center;
&rbrace;

.reminders {
    space-y: 10px;
&rbrace;

.reminder-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 10px;
    margin-bottom: 10px;
&rbrace;

.btn-small {
    background: #28a745;
    border: none;
    padding: 5px 10px;
    border-radius: 15px;
    color: white;
    font-size: 0.8rem;
    cursor: pointer;
&rbrace;

/* Mood Check Page */
.mood-check-container {
    max-width: 800px;
    margin: 0 auto;
&rbrace;

.voice-interface {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 40px;
    text-align: center;
    margin-bottom: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
&rbrace;
        .voice-visualizer {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            height: 60px;
            margin-bottom: 30px;
        &rbrace;

        .wave {
            width: 4px;
            height: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 2px;
            animation: wave 1.5s ease-in-out infinite;
        &rbrace;

        .wave:nth-child(2) { animation-delay: 0.1s; &rbrace;
        .wave:nth-child(3) { animation-delay: 0.2s; &rbrace;
        .wave:nth-child(4) { animation-delay: 0.3s; &rbrace;

        @keyframes wave {
            0%, 100% { height: 20px; }
            50% { height: 40px; &rbrace;
        &rbrace;

        .btn-voice {
            background: linear-gradient(135deg, #ff9a9e, #fecfef);
            border: none;
            padding: 20px 40px;
            border-radius: 50px;
            color: white;
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0 auto;
        {"}"}

        .btn-voice:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(255, 154, 158, 0.4);
        {"}"}

        .btn-voice.recording {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            animation: pulse 1.5s infinite;
        {"}"}

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); &rbrace;
            70% { box-shadow: 0 0 0 10px rgba(255, 107, 107, 0); &rbrace;
            100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); &rbrace;
        &rbrace;

        .voice-response {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 20px;
            margin-top: 20px;
            border-left: 4px solid #764ba2;
        {"}"}

        .mood-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
            margin-top: 20px;
        {"}"}

        .mood-option {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        {"}"}

        .mood-option:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        {"}"}

        .mood-option.selected {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        {"}"}

        .mood-option .mood-emoji {
            font-size: 2.5rem;
            margin-bottom: 10px;
        &rbrace;

        .mood-support {
            margin-top: 30px;
        {"}"}

        .support-card {
            background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
        {"}"}

        .support-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 20px;
            flex-wrap: wrap;
        {"}"}

        /* Cycle Care Page */
        .care-tabs {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 40px;
        {"}"}

        .tab-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        {"}"}

        .tab-btn.active {
            background: rgba(255, 255, 255, 0.95);
            color: #764ba2;
        {"}"}

        .tab-content {
                display: none;
        &rbrace;

        .tab-content.active {
            display: block;
        {"}"}

        .cycle-tracker {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 40px;
            align-items: start;
        {"}"}

        .cycle-calendar {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
        {"}"}

        .cycle-circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: conic-gradient(from 0deg, #ff9a9e 0deg, #fecfef 180deg, #a8edea 270deg, #fed6e3 360deg);
            position: relative;
            margin: 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
        {"}"}

        .cycle-progress {
            position: absolute;
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background: white;
        {"}"}

        .cycle-center {
            position: relative;
            z-index: 2;
            text-align: center;
        {"}"}

        .cycle-day-large {
            font-size: 3rem;
            font-weight: 600;
            color: #764ba2;
        {"}"}

        .cycle-phase-small {
            color: #667eea;
            font-weight: 500;
        {"}"}

        .cycle-insights {
            display: flex;
            flex-direction: column;
            gap: 20px;
        {"}"}

        .insight-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 20px;
        {"}"}

        .insight-card h4 {
            color: #764ba2;
            margin-bottom: 10px;
        {"}"}

        .pms-alert {
            background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
        {"}"}

        .pregnancy-tracker {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 40px;
        {"}"}

        .pregnancy-week {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
        {"}"}

        .baby-size {
            margin-top: 20px;
        {"}"}

        .baby-icon {
            font-size: 4rem;
            margin-bottom: 15px;
        {"}"}

        .pregnancy-insights {
            display: flex;
            flex-direction: column;
            gap: 20px;
        {"}"}

        /* Elderly Care Page */
        .elderly-friendly {
            font-size: 1.2rem;
        {"}"}

        .large-text {
            font-size: 1.4rem;
        {"}"}

        .elderly-dashboard {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
        {"}"}

        .daily-reminders h2 {
            color: white;
            margin-bottom: 30px;
            font-size: 2rem;
        {"}"}

        .reminder-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
        {"}"}

        .reminder-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 25px;
            display: flex;
            align-items: center;
            gap: 20px;
        {"}"}

        .reminder-icon {
            font-size: 2.5rem;
            width: 60px;
            text-align: center;
        {"}"}

        .reminder-content h3 {
            font-size: 1.4rem;
            margin-bottom: 5px;
            color: #764ba2;
        {"}"}

        .reminder-time {
            color: #666;
            font-size: 1.1rem;
        {"}"}

        .btn-large {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            color: white;
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        {"}"}

        .btn-large.completed {
            background: #28a745;
        &rbrace;

        .btn-large:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        {"}"}

        .call-btn {
            background: linear-gradient(135deg, #28a745, #20c997);
        {"}"}

        .daily-checkin {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
        {"}"}

        .daily-checkin h2 {
            color: #764ba2;
            margin-bottom: 30px;
        {"}"}

        .mood-check-elderly {
            display: flex;
            flex-direction: column;
            gap: 20px;
        {"}"}

        .mood-btn-large {
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid #ddd;
            border-radius: 15px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 1.2rem;
        {"}"}

        .mood-btn-large:hover {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-color: transparent;
        {"}"}

        .mood-emoji-large {
            font-size: 2rem;
        {"}"}

        .emergency-contact {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            margin-top: 40px;
        {"}"}

        .emergency-contact h2 {
            color: #764ba2;
            margin-bottom: 20px;
        {"}"}

        .btn-emergency {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            border: none;
            padding: 20px 40px;
            border-radius: 25px;
            color: white;
            font-size: 1.3rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        {"}"}

        .btn-emergency:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
        {"}"}

        /* Analytics Page */
        .analytics-dashboard {
            max-width: 1000px;
            margin: 0 auto;
        {"}"}

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        {"}"}

        .stat-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        {"}"}

        .stat-number {
            font-size: 3rem;
            font-weight: 700;
            color: #764ba2;
        {"}"}

        .stat-label {
            color: #666;
            font-weight: 500;
            margin-top: 5px;
        {"}"}

        .stat-icon {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 2rem;
            opacity: 0.3;
        {"}"}

        .chart-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 40px;
        {"}"}

        .chart-container h3 {
            color: #764ba2;
            margin-bottom: 30px;
            text-align: center;
        {"}"}

        .mood-chart {
            position: relative;
        {"}"}

        .chart-bars {
            display: flex;
            justify-content: space-between;
            align-items: end;
            height: 200px;
            margin-bottom: 20px;
        {"}"}

        .bar {
            width: 30px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 15px 15px 0 0;
            transition: all 0.3s ease;
            cursor: pointer;
        {"}"}

        .bar:hover {
            background: linear-gradient(135deg, #ff9a9e, #fecfef);
            transform: scaleY(1.1);
        {"}"}

        .chart-labels {
            display: flex;
            justify-content: space-between;
            color: #666;
            font-size: 0.9rem;
        {"}"}

        .insights-section h3 {
            color: white;
            margin-bottom: 30px;
            text-align: center;
            font-size: 2rem;
        {"}"}

        .insight-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        {"}"}

        .analytics-insight-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 25px;
        {"}"}

        .analytics-insight-card h4 {
            color: #764ba2;
            margin-bottom: 15px;
        {"}"}

        /* Settings Page */
        .settings-sections {
            max-width: 800px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 30px;
        {"}"}

        .settings-section {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
        {"}"}

        .settings-section h3 {
            color: #764ba2;
            margin-bottom: 25px;
            font-size: 1.5rem;
        {"}"}

        .setting-item {
            margin-bottom: 20px;
        {"}"}

        .setting-item label {
            display: block;
            color: #555;
            font-weight: 500;
            margin-bottom: 8px;
        {"}"}

        .setting-item input,
        .setting-item select {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        {"}"}

        .setting-item input:focus,
        .setting-item select:focus {
            outline: none;
            border-color: #764ba2;
        {"}"}

        .setting-item.toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
        {"}"}

        .toggle-switch {
            position: relative;
            width: 60px;
            height: 34px;
        {"}"}

        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        {"}"}

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.4s;
            border-radius: 34px;
        {"}"}

        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        {"}"}

        input:checked + .slider {
            background: linear-gradient(135deg, #667eea, #764ba2);
        {"}"}

        input:checked + .slider:before {
            transform: translateX(26px);
        {"}"}

        .contact-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        {"}"}

        .contact-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
        {"}"}

        .contact-info strong {
            display: block;
            color: #764ba2;
        {"}"}

        .setting-description {
            font-size: 0.9rem;
            color: #666;
            margin-top: 5px;
        {"}"}

        .btn-secondary {
            background: #6c757d;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        {"}"}

        .btn-secondary:hover {
            background: #5a6268;
            transform: translateY(-2px);
        {"}"}

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        {"}"}

        .modal-content {
            background: white;
            margin: 5% auto;
            padding: 40px;
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            position: relative;
            animation: modalSlideIn 0.3s ease;
        {"}"}

        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; {"}"}
            to { transform: translateY(0); opacity: 1; {"}"}
        {"}"}

        .close {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 2rem;
            cursor: pointer;
            color: #aaa;
        {"}"}

        .close:hover {
            color: #333;
        {"}"}

        .breathing-exercise {
            text-align: center;
        {"}"}

        .breathing-exercise h2 {
            color: #764ba2;
            margin-bottom: 30px;
        {"}"}

        .breathing-circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            margin: 30px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 4s ease-in-out;
        {"}"}

        .breathing-text {
            color: white;
            font-size: 1.2rem;
            font-weight: 500;
        {"}"}

        .breathing-circle.inhale {
            transform: scale(1.3);
        {"}"}

        .breathing-circle.exhale {
            transform: scale(0.8);
        {"}"}

        .breathing-controls {
            margin-top: 30px;
        {"}"}

        /* OmniDimension Agent */
        .omnidimension-agent {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1500;
        {"}"}

        .agent-toggle {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            padding: 15px 25px;
            border-radius: 50px;
            color: white;
            font-weight: 500;
            cursor: pointer;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        {"}"}

        .agent-toggle:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        {"}"}

        /* Responsive Design */
        @media (max-width: 768px) {
            .hamburger {
                display: flex;
            &rbrace;

            .nav-menu {
                display: none;
                position: absolute;
                top: 70px;
                left: 0;
                width: 100%;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            &rbrace;

            .nav-menu.active {
                display: flex;
            &rbrace;

            .page-header h1 {
                font-size: 2rem;
            &rbrace;

            .subtitle {
                font-size: 1rem;
            &rbrace;

            .quick-actions {
                grid-template-columns: 1fr;
            &rbrace;

            .dashboard-grid {
                grid-template-columns: 1fr;
            &rbrace;

            .cycle-tracker,
            .pregnancy-tracker,
            .elderly-dashboard {
                grid-template-columns: 1fr;
            &rbrace;

            .stats-grid {
                grid-template-columns: 1fr;
            &rbrace;

            .mood-grid {
                grid-template-columns: repeat(2, 1fr);
            &rbrace;

            .support-actions {
                flex-direction: column;
            &rbrace;

            .care-tabs {
                flex-direction: column;
                align-items: center;
            &rbrace;

            .insight-cards {
                grid-template-columns: 1fr;
            &rbrace;

            .omnidimension-agent {
                bottom: 20px;
                right: 20px;
            &rbrace;

            .agent-toggle span {
                display: none;
            &rbrace;
        &rbrace;

        @media (max-width: 480px) {
            .container {
                padding: 15px;
            &rbrace;

            .page-header {
                padding: 20px 15px;
            &rbrace;

            .action-card,
            .dashboard-card,
            .settings-section {
                padding: 20px;
            &rbrace;

            .modal-content {
                margin: 10% auto;
                padding: 30px;
            &rbrace;

            .breathing-circle {
                width: 150px;
                height: 150px;
            &rbrace;
        &rbrace;
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
</head>
<body>
    {/* Navigation */}
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <span class="logo">MindCare Buddy</span>
            </div>
            <div class="nav-menu" id="nav-menu">
                <a href="#" class="nav-link" onclick="showPage('dashboard')">
                    <i class="fas fa-home"></i> Dashboard
                </a>
                <a href="#" class="nav-link" onclick="showPage('mood-check')">
                    <i class="fas fa-heart"></i> Mood Check
                </a>
                <a href="#" class="nav-link" onclick="showPage('cycle-care')">
                    <i class="fas fa-venus"></i> Cycle Care
                </a>
                <a href="#" class="nav-link" onclick="showPage('elderly-care')">
                    <i class="fas fa-user-friends"></i> Elderly Care
                </a>
                <a href="#" class="nav-link" onclick="showPage('analytics')">
                    <i class="fas fa-chart-line"></i> Analytics
                </a>
                <a href="#" class="nav-link" onclick="showPage('settings')">
                    <i class="fas fa-cog"></i> Settings
                </a>
            </div>
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    {/* Dashboard Page */}
    <div id="dashboard" class="page active">
        <div class="container">
            <header class="page-header">
                <h1>Welcome back! 🌸</h1>
                <p class="subtitle">I'm Mira Your voice companion for emotional well-being</p>
            </header>

            <div class="quick-actions">
                <div class="action-card primary" onclick="showPage('mood-check')">
                    <div class="card-icon">🎙️</div>
                    <h3>Daily Mood Check-In</h3>
                    <p>Share how you're feeling today</p>
                    <button class="btn-speak">
                        <i class="fas fa-microphone"></i> Speak Now
                    </button>
                </div>

                <div class="action-card secondary">
                    <div class="card-icon">🧘‍♀️</div>
                    <h3>Quick Breathing Exercise</h3>
                    <p>3-minute calming session</p>
                    <button class="btn-action" onclick="startBreathingExercise()">Start Now</button>
                </div>
            </div>

            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3>Today's Mood</h3>
                    <div class="mood-display">
                        <div class="mood-emoji" id="todayMood">😊</div>
                        <span class="mood-text" id="todayMoodText">Feeling Good</span>
                    </div>
                </div>

                <div class="dashboard-card" id="cycleCard">
                    <h3>Cycle & Care</h3>
                    <div class="cycle-info">
                        <div class="cycle-day">Day <span id="cycleDay">14</span></div>
                        <div class="cycle-phase" id="cyclePhase">Ovulation Phase</div>
                        <div class="cycle-tip" id="cycleTip">💪 Energy levels may be higher today</div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <h3>This Week</h3>
                    <div class="week-summary">
                        <div class="mood-week">
                            <div class="day-mood active">😊</div>
                            <div class="day-mood">😐</div>
                            <div class="day-mood">😊</div>
                            <div class="day-mood">😔</div>
                            <div class="day-mood">😊</div>
                            <div class="day-mood">😄</div>
                            <div class="day-mood current">😊</div>
                        </div>
                        <p class="week-insight">You've had 5 good days this week! 🌟</p>
                    </div>
                </div>

                <div class="dashboard-card" id="elderlyCard" style="display: none;">
                    <h3>Daily Reminders</h3>
                    <div class="reminders">
                        <div class="reminder-item">
                            <i class="fas fa-pills"></i>
                            <span>Take morning medication</span>
                            <button class="btn-small" onclick="markComplete(this)">✓</button>
                        </div>
                        <div class="reminder-item">
                            <i class="fas fa-phone"></i>
                            <span>Call family member</span>
                            <button class="btn-small">Call</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Mood Check Page --&gt;
    <div id="mood-check" class="page">
        <div class="container">
            <header class="page-header">
                <h1>Daily Mood Check-In 💝</h1>
                <p class="subtitle">How are you feeling today?</p>
            </header>

            <div class="mood-check-container">
                <div class="voice-interface">
                    <div class="voice-visualizer" id="voiceVisualizer">
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                    </div>
                    
                    <button class="btn-voice" id="voiceBtn" onclick="toggleVoiceRecording()">
                        <i class="fas fa-microphone"></i>
                        <span>Tap to Speak</span>
                    </button>
                    
                    <div class="voice-response" id="voiceResponse">
                        <p>Your assistant's response will appear here...</p>
                    </div>
                </div>

                <div class="mood-options">
                    <h3>Or select your mood:</h3>
                    <div class="mood-grid">
                        <div class="mood-option" onclick="selectMood('great', '😄')">
                            <div class="mood-emoji">😄</div>
                            <span>Great</span>
                        </div>
                        <div class="mood-option" onclick="selectMood('good', '😊')">
                            <div class="mood-emoji">😊</div>
                            <span>Good</span>
                        </div>
                        <div class="mood-option" onclick="selectMood('okay', '😐')">
                            <div class="mood-emoji">😐</div>
                            <span>Okay</span>
                        </div>
                        <div class="mood-option" onclick="selectMood('sad', '😔')">
                            <div class="mood-emoji">😔</div>
                            <span>Sad</span>
                        </div>
                        <div class="mood-option" onclick="selectMood('anxious', '😰')">
                            <div class="mood-emoji">😰</div>
                            <span>Anxious</span>
                        </div>
                        <div class="mood-option" onclick="selectMood('angry', '😠')">
                            <div class="mood-emoji">😠</div>
                            <span>Angry</span>
                        </div>
                    </div>
                </div>

                <div class="mood-support" id="moodSupport" style="display: none;">
                    <div class="support-card">
                        <h3>I'm here for you 💕</h3>
                        <p id="supportMessage"></p>
                        <div class="support-actions">
                            <button class="btn-action" onclick="startBreathingExercise()">
                                <i class="fas fa-wind"></i> Breathing Exercise
                            </button>
                            <button class="btn-action" onclick="playGuidedMeditation()">
                                <i class="fas fa-om"></i> Guided Meditation
                            </button>
                            <button class="btn-action" onclick="showPositiveAffirmations()">
                                <i class="fas fa-heart"></i> Positive Affirmations
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Cycle Care Page */}
    <div id="cycle-care" class="page">
        <div class="container">
            <header class="page-header">
                <h1>Cycle & Pregnancy Care 🌸</h1>
                <p class="subtitle">Personalized support for your journey</p>
            </header>

            <div class="care-tabs">
                <button class="tab-btn active" onclick="switchTab('cycle')">Menstrual Cycle</button>
                <button class="tab-btn" onclick="switchTab('pregnancy')">Pregnancy</button>
            </div>

            <div id="cycle-tab" class="tab-content active">
                <div class="cycle-tracker">
                    <div class="cycle-calendar">
                        <h3>Current Cycle</h3>
                        <div class="cycle-circle">
                            <div class="cycle-progress" style="--progress: 50%"></div>
                            <div class="cycle-center">
                                <div class="cycle-day-large">14</div>
                                <div class="cycle-phase-small">Ovulation</div>
                            </div>
                        </div>
                    </div>

                    <div class="cycle-insights">
                        <div class="insight-card">
                            <h4>🌟 Today's Insight</h4>
                            <p>You're in your ovulation phase. Energy and confidence are typically higher!</p>
                        </div>
                        
                        <div class="insight-card">
                            <h4>💡 Self-Care Tips</h4>
                            <ul>
                                <li>Stay hydrated with extra water</li>
                                <li>Consider light exercise or yoga</li>
                                <li>Practice mindful eating</li>
                            </ul>
                        </div>

                        <div class="insight-card pms-alert" id="pmsAlert" style="display: none;">
                            <h4>🤗 PMS Support</h4>
                            <p>PMS week is approaching. Extra self-care and gentleness with yourself is recommended.</p>
                            <button class="btn-action" onclick="showPMSSupport()">Get Support</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="pregnancy-tab" class="tab-content">
                <div class="pregnancy-tracker">
                    <div class="pregnancy-week">
                        <h3>Week 20</h3>
                        <div class="baby-size">
                            <div class="baby-icon">👶</div>
                            <p>Your baby is the size of a <strong>banana</strong></p>
                        </div>
                    </div>

                    <div class="pregnancy-insights">
                        <div class="insight-card">
                            <h4>✨ This Week</h4>
                            <p>You might be feeling the baby's movements more clearly now. How exciting!</p>
                        </div>
                        
                        <div class="insight-card">
                            <h4>💝 Daily Affirmation</h4>
                            <p>"I am strong, capable, and growing new life. My body knows exactly what to do."</p>
                        </div>

                        <div class="insight-card">
                            <h4>🍎 Wellness Tips</h4>
                            <ul>
                                <li>Continue taking prenatal vitamins</li>
                                <li>Practice gentle prenatal yoga</li>
                                <li>Stay connected with your support system</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Elderly Care Page */}
    <div id="elderly-care" class="page">
        <div class="container elderly-friendly">
            <header class="page-header">
                <h1>Daily Care & Reminders 👥</h1>
                <p class="subtitle large-text">Gentle support for your daily routine</p>
            </header>

            <div class="elderly-dashboard">
                <div class="daily-reminders">
                    <h2>Today's Reminders</h2>
                    <div class="reminder-list">
                        <div class="reminder-card">
                            <div class="reminder-icon">💊</div>
                            <div class="reminder-content">
                                <h3>Morning Medication</h3>
                                <p class="reminder-time">8:00 AM</p>
                                <button class="btn-large completed" onclick="toggleReminder(this)">
                                    <i class="fas fa-check"></i> Completed
                                </button>
                            </div>
                        </div>

                        <div class="reminder-card">
                            <div class="reminder-icon">🍽️</div>
                            <div class="reminder-content">
                                <h3>Lunch Time</h3>
                                <p class="reminder-time">12:30 PM</p>
                                <button class="btn-large" onclick="toggleReminder(this)">
                                    Mark Done
                                </button>
                            </div>
                        </div>

                        <div class="reminder-card">
                            <div class="reminder-icon">📞</div>
                            <div class="reminder-content">
                                <h3>Call Sarah</h3>
                                <p class="reminder-time">3:00 PM</p>
                                <button class="btn-large call-btn" onclick="initiateCall()">
                                    <i class="fas fa-phone"></i> Call Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="daily-checkin">
                    <h2>How are you feeling today?</h2>
                    <div class="mood-check-elderly">
                        <button class="mood-btn-large" onclick="logElderlyMood('great')">
                            <div class="mood-emoji-large">😊</div>
                            <span>Great</span>
                        </button>
                        <button class="mood-btn-large" onclick="logElderlyMood('okay')">
                            <div class="mood-emoji-large">😐</div>
                            <span>Okay</span>
                        </button>
                        <button class="mood-btn-large" onclick="logElderlyMood('need-help')">
                            <div class="mood-emoji-large">🤗</div>
                            <span>Need Support</span>
                        </button>
                    </div>
                </div>

                <div class="emergency-contact">
                    <h2>Emergency Contact</h2>
                    <button class="btn-emergency" onclick="emergencyCall()">
                        <i class="fas fa-phone"></i>
                        Call Emergency Contact
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Analytics Page --&gt;
    <div id="analytics" class="page">
        <div class="container">
            <header class="page-header">
                <h1>Your Wellness Journey 📊</h1>
                <p class="subtitle">Track your progress and insights</p>
            </header>

            <div class="analytics-dashboard">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">7</div>
                        <div class="stat-label">Day Streak</div>
                        <div class="stat-icon">🔥</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">85%</div>
                        <div class="stat-label">Good Days</div>
                        <div class="stat-icon">😊</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">12</div>
                        <div class="stat-label">Check-ins</div>
                        <div class="stat-icon">💝</div>
                    </div>
                </div>

                <div class="chart-container">
                    <h3>Mood Trends (Last 30 Days)</h3>
                    <div class="mood-chart" id="moodChart">
                        <div class="chart-bars">
                            <div class="bar" style="height: 80%;" data-day="1"></div>
                            <div class="bar" style="height: 60%;" data-day="2"></div>
                            <div class="bar" style="height: 90%;" data-day="3"></div>
                            <div class="bar" style="height: 40%;" data-day="4"></div>
                            <div class="bar" style="height: 85%;" data-day="5"></div>
                            <div class="bar" style="height: 95%;" data-day="6"></div>
                            <div class="bar" style="height: 75%;" data-day="7"></div>
                        </div>
                        <div class="chart-labels">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </div>
                </div>

                <div class="insights-section">
                    <h3>Personalized Insights</h3>
                    <div class="insight-cards">
                        <div class="analytics-insight-card">
                            <h4>🌟 Pattern Recognition</h4>
                            <p>You tend to feel better on weekends. Consider incorporating weekend activities into weekdays.</p>
                        </div>
                        <div class="analytics-insight-card">
                            <h4>💪 Strength Identified</h4>
                            <p>Your consistent check-ins show great self-awareness. Keep up the excellent work!</p>
                        </div>
                        <div class="analytics-insight-card">
                            <h4>🎯 Recommendation</h4>
                            <p>Try scheduling breathing exercises on days when you feel stressed for better balance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Settings Page --&gt;
    <div id="settings" class="page">
        <div class="container">
            <header class="page-header">
                <h1>Settings ⚙️</h1>
                <p class="subtitle">Personalize your MindCare experience</p>
            </header>

            <div class="settings-sections">
                <div class="settings-section">
                    <h3>Profile Settings</h3>
                    <div class="setting-item">
                        <label>Care Mode</label>
                        <select id="careMode" onchange="changeCareMode(this.value)">
                            <option value="general">General Care</option>
                            <option value="cycle">Menstrual Cycle Support</option>
                            <option value="pregnancy">Pregnancy Support</option>
                            <option value="elderly">Elderly Care</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label>Name</label>
                        <input type="text" id="userName" placeholder="What should I call you?" value="Sarah" />
                    </div>
                </div>

                <div class="settings-section">
                    <h3>Notifications</h3>
                    <div class="setting-item toggle">
                        <label>Daily Check-in Reminders</label>
                        <div class="toggle-switch">
                            <input type="checkbox" id="dailyReminders" checked />
                            <span class="slider"></span>
                        </div>
                    </div>
                    <div class="setting-item toggle">
                        <label>Cycle Notifications</label>
                        <div class="toggle-switch">
                            <input type="checkbox" id="cycleNotifications" checked />
                            <span class="slider"></span>
                        </div>
                    </div>
                    <div class="setting-item toggle">
                        <label>Emergency Alerts</label>
                        <div class="toggle-switch">
                            <input type="checkbox" id="emergencyAlerts" checked />
                            <span class="slider"></span>
                        </div>
                    </div>
                </div>

                <div class="settings-section">
                    <h3>Emergency Contacts</h3>
                    <div class="contact-list">
                        <div class="contact-item">
                            <div class="contact-info">
                                <strong>Primary Contact</strong>
                                <p>+1 (555) 123-4567</p>
                            </div>
                            <button class="btn-small">Edit</button>
                        </div>
                        <div class="contact-item">
                            <div class="contact-info">
                                <strong>Healthcare Provider</strong>
                                <p>+1 (555) 987-6543</p>
                            </div>
                            <button class="btn-small">Edit</button>
                        </div>
                    </div>
                    <button class="btn-action">Add Contact</button>
                </div>

                <div class="settings-section">
                    <h3>Data & Privacy</h3>
                    <div class="setting-item">
                        <button class="btn-action">Export My Data</button>
                        <p class="setting-description">Download your mood data and insights</p>
                    </div>
                    <div class="setting-item">
                        <button class="btn-secondary">Reset All Data</button>
                        <p class="setting-description">Clear all stored information</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Breathing Exercise Modal --&gt;
    <div id="breathingModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeBreathingExercise()">&times;</span>
            <div class="breathing-exercise">
                <h2>Guided Breathing 🌬️</h2>
                <div class="breathing-circle" id="breathingCircle">
                    <div class="breathing-text" id="breathingText">Breathe In</div>
                </div>
                <div class="breathing-controls">
                    <button class="btn-action" id="breathingBtn" onclick="toggleBreathing()">Start</button>
                </div>
            </div>
        </div>
    </div>

    <!-- OmniDimension Agent --&gt;
    <div class="omnidimension-agent">
        <button class="agent-toggle" onclick="toggleAgent()">
            <i class="fas fa-robot"></i>
            <span>OmniDimension Agent</span>
        </button>
    </div>

        <script src="script.js"></script>
    </body>
    </html>
