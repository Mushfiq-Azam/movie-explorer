import { useEffect, useRef, useState } from 'react'
import { fetchShowDetails } from '../services/tvmaze.js'
import '../styles/show-details.css'

function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function formatPremiereDate(dateString) {
  if (!dateString) return null
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function ShowDetailsModal({ show, onClose }) {
  const [details, setDetails] = useState(show)
  const [status, setStatus] = useState(show.summary ? 'ready' : 'loading')
  const [reloadKey, setReloadKey] = useState(0)

  const backdropRef = useRef(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    previouslyFocused.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }

    return () => {
      document.body.style.overflow = previousOverflow
      if (previouslyFocused.current) {
        previouslyFocused.current.focus({ preventScroll: true })
      }
    }
  }, [])

  useEffect(() => {
    if (show.summary) {
      setDetails(show)
      setStatus('ready')
      return
    }

    let active = true
    setStatus('loading')

    fetchShowDetails(show.id)
      .then((data) => {
        if (active) {
          setDetails(data)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (active) {
          setStatus('error')
        }
      })

    return () => {
      active = false
    }
  }, [show, reloadKey])

  const retry = () => {
    setStatus('loading')
    setReloadKey((key) => key + 1)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key !== 'Tab') return

    const focusables = dialogRef.current.querySelectorAll(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    )
    const list = Array.from(focusables).filter((element) => !element.disabled)
    if (list.length === 0) return

    const first = list[0]
    const last = list[list.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const title = details?.name || 'Untitled'
  const poster = details?.image?.original || details?.image?.medium || null
  const summary = stripHtml(details?.summary)
  const premiereDate = formatPremiereDate(details?.premiered)
  const rating = details?.rating?.average
  const genres = details?.genres?.filter(Boolean) || []
  const network = details?.network?.name || details?.webChannel?.name

  return (
    <div
      className="modal-backdrop"
      ref={backdropRef}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === backdropRef.current) {
          onClose()
        }
      }}
    >
      <div
        className="modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={summary ? 'modal-summary' : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          ref={closeButtonRef}
          aria-label="Close details"
          onClick={onClose}
        >
          ×
        </button>

        {status === 'loading' && <p className="modal-status">Loading details…</p>}

        {status === 'error' && (
          <div className="modal-status">
            <p>Something went wrong while loading this show.</p>
            <button type="button" className="btn btn-secondary" onClick={retry}>
              Retry
            </button>
          </div>
        )}

        {status === 'ready' && (
          <div className="modal-layout">
            <div className="modal-poster">
              {poster ? (
                <img src={poster} alt={`${title} poster`} />
              ) : (
                <div className="modal-poster-placeholder" role="img" aria-label={`${title} poster`}>
                  {title.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="modal-content">
              <h2 className="modal-title" id="modal-title">
                {title}
              </h2>

              <dl className="modal-meta">
                {rating && (
                  <div className="modal-meta-item">
                    <dt>Rating</dt>
                    <dd>{rating.toFixed(1)} / 10</dd>
                  </div>
                )}
                {premiereDate && (
                  <div className="modal-meta-item">
                    <dt>Premiered</dt>
                    <dd>{premiereDate}</dd>
                  </div>
                )}
                {details?.status && (
                  <div className="modal-meta-item">
                    <dt>Status</dt>
                    <dd>{details.status}</dd>
                  </div>
                )}
                {details?.runtime && (
                  <div className="modal-meta-item">
                    <dt>Runtime</dt>
                    <dd>{details.runtime} min</dd>
                  </div>
                )}
                {details?.language && (
                  <div className="modal-meta-item">
                    <dt>Language</dt>
                    <dd>{details.language}</dd>
                  </div>
                )}
                {network && (
                  <div className="modal-meta-item">
                    <dt>Network</dt>
                    <dd>{network}</dd>
                  </div>
                )}
                {genres.length > 0 && (
                  <div className="modal-meta-item modal-meta-genres">
                    <dt>Genres</dt>
                    <dd>{genres.join(', ')}</dd>
                  </div>
                )}
              </dl>

              {summary && (
                <p className="modal-summary" id="modal-summary">
                  {summary}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowDetailsModal