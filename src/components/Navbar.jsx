import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Movie Explorer
      </Link>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shows">Shows</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar