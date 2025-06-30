export default function NavBar({ currentPage, setCurrentPage }) {
  const pages = [
    { id: 'dashboard', icon: 'fa-home', label: 'Dashboard' },
    { id: 'mood-check', icon: 'fa-heart', label: 'Mood Check' },
    { id: 'cycle-care', icon: 'fa-venus', label: 'Cycle Care' },
    { id: 'elderly-care', icon: 'fa-user-friends', label: 'Elderly Care' },
    { id: 'analytics', icon: 'fa-chart-line', label: 'Analytics' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">MindCare Buddy</div>
        <div className="nav-menu">
          {pages.map(page => (
            <a 
              key={page.id}
              href="#" 
              className={`nav-link ${currentPage === page.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(page.id);
              }}
            >
              <i className={`fas ${page.icon}`}></i> {page.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}