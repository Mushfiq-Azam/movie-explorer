export const TVMAZE_API_URL = 'https://api.tvmaze.com'

async function request(path) {
  let response

  try {
    response = await fetch(`${TVMAZE_API_URL}${path}`)
  } catch {
    throw new Error('Network error. Check your connection and try again.')
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`)
  }

  let data
  try {
    data = await response.json()
  } catch {
    throw new Error('TVMaze returned an invalid response.')
  }

  if (!Array.isArray(data)) {
    throw new Error('TVMaze returned an unexpected response.')
  }

  return data
}

export async function fetchShows() {
  return request('/shows')
}

export async function searchShows(query) {
  const results = await request(`/search/shows?q=${encodeURIComponent(query)}`)
  return results.map((result) => result.show)
}