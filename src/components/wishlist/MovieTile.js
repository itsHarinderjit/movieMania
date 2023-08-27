import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faXmark } from '@fortawesome/free-solid-svg-icons'

function MovieTile({movie,removeMovieFromWatchlist}) {
    const navigate = useNavigate()
    function Navigate(movie) {
        navigate(`/Trailer/${movie}`)
      }
      
  return (
    <div className='movie-container'>
        <div className='poster-container'>
            <img src={movie.poster} alt={`${movie.title} poster`} className='poster' onClick={()=>Navigate(movie.trailerLink.substring(movie.trailerLink.length-11))}/>
            <FontAwesomeIcon icon={faXmark} className='poster-remove-movie' title='Remove from watchlist' onClick={()=>removeMovieFromWatchlist(movie)}/>
            <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`} className='poster-button-container' >
                <div className='poster-play-button-icon-container' >
                    <FontAwesomeIcon icon={faCirclePlay} className='poster-play-button-icon'/>
                </div>
            </Link>
        </div>
        <div className='movie-title'>
            {movie.title}
        </div>
        <div className='movie-attributes'>
            <div>
                {movie.releaseDate.substr(0,4)}
            </div>
            {
                movie.genres.slice(0,2).map((gen,i)=>{
                    return (
                        <div key={i}>
                          {gen}
                        </div>
                    )
                })
            }
        </div>
    </div> 
  )
}

export default MovieTile
