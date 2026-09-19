import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="hero">
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <h1 className="hero-title">Discover Your Next Favorite Show</h1>
        <p className="hero-text">
          Explore captivating stories, discover new favorites, and find your next
          binge-worthy series.
        </p>
        <div className="hero-actions">
          <Link to="/shows" className="btn btn-primary">
            Explore Shows
          </Link>
          <Link to="/shows" className="btn btn-secondary">
            Browse Shows
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home