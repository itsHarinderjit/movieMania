import Movies from '../movies/Movies'

function Home({movies}) {
  return (
    <div>
      <Movies movies={movies} />
    </div>
  )
}

export default Home
