import { useEffect, useState } from 'react'
import { fetchShows, searchShows } from '../services/tvmaze.js'
import ShowCard from '../components/ShowCard.jsx'
import ShowDetailsModal from '../components/ShowDetailsModal.jsx'
import '../styles/shows.css'

function Shows() {
  const [shows, setShows] = useState([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('loading')
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedShow, setSelectedShow] = useState(null)

  useEffect(() => {
    let active = true

    const load = async () => {
      const trimmed = query.trim()
      try {
        const data = trimmed ? await searchShows(trimmed) : await fetchShows()
        if (active) {
          setShows(data)
          setStatus('ready')
        }
      } catch {
        if (active) {
          setStatus('error')
        }
      }
    }

    const timer = setTimeout(load, trimmedQuery(query) ? 400 : 0)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [query, reloadKey])

  const retry = () => {
    setStatus('loading')
    setReloadKey((key) => key + 1)
  }

  const clearSearch = () => setQuery('')

  const hasQuery = query.trim().length > 0
  const isEmpty = status === 'ready' && shows.length === 0

  return (
    <section className="shows">
      <header className="shows-header">
        <h1 className="shows-title">Shows</h1>
        <p className="shows-description">
          Browse the full catalog or search by title to find your next favorite series.
        </p>
      </header>

      <form className="shows-search" role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          className="shows-search-input"
          placeholder="Search shows by title…"
          aria-label="Search shows by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {hasQuery && (
          <button type="button" className="btn btn-secondary" onClick={clearSearch}>
            Clear
          </button>
        )}
      </form>

      {status === 'loading' && <p className="shows-status">Loading shows…</p>}

      {status === 'error' && (
        <div className="shows-status">
          <p>Something went wrong while loading shows.</p>
          <button type="button" className="btn btn-secondary shows-retry" onClick={retry}>
            Retry
          </button>
        </div>
      )}

      {isEmpty && (
        <div className="shows-status">
          <p>No shows found{hasQuery && ` for "${query.trim()}"`}.</p>
          {hasQuery && (
            <button type="button" className="btn btn-secondary shows-retry" onClick={clearSearch}>
              Clear search
            </button>
          )}
        </div>
      )}

      {status === 'ready' && !isEmpty && (
        <div className="shows-grid">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} onSelect={setSelectedShow} />
          ))}
        </div>
      )}

      {selectedShow && (
        <ShowDetailsModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </section>
  )
}

function trimmedQuery(value) {
  return value.trim().length > 0
}

export default Shows