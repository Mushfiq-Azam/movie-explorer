import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Movie Explorer
      </Link>

      <button
        type="button"
        className="navbar-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="navbar-toggle-bar" />
        <span className="navbar-toggle-bar" />
        <span className="navbar-toggle-bar" />
      </button>

      <div className={`navbar-collapse ${menuOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shows" onClick={() => setMenuOpen(false)}>
              Shows
            </Link>
          </li>
          <li className="navbar-cta-item">
            <Link to="/shows" className="navbar-cta" onClick={() => setMenuOpen(false)}>
              Explore Shows
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar