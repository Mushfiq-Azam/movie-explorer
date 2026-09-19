function ShowCard({ show }) {
  const title = show.name || 'Untitled'
  const image = show.image?.medium
  const year = show.premiered ? show.premiered.slice(0, 4) : null
  const rating = show.rating?.average

  return (
    <article className="show-card">
      <div className="show-card-poster">
        {image ? (
          <img src={image} alt={`${title} poster`} loading="lazy" />
        ) : (
          <div className="show-card-placeholder" role="img" aria-label={`${title} poster`}>
            {title.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="show-card-body">
        <h2 className="show-card-title">{title}</h2>
        {year && <p className="show-card-meta">{year}</p>}
        {rating && <p className="show-card-meta">Rating: {rating.toFixed(1)}</p>}
        <button type="button" className="btn btn-primary show-card-button">
          See Details
        </button>
      </div>
    </article>
  )
}

export default ShowCard