import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page">
      <h1>404</h1>
      <p>That page does not exist.</p>
      <Link to="/">Go back home</Link>
    </section>
  )
}

export default NotFound