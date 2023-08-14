import { Paper } from '@mui/material'
import './Movies.css'
import Carousel from 'react-material-ui-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function Movies({movies}) {
    const navigate = useNavigate()
    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`)
    }
  return (
    <div className='movie-carousel-container' >
      <Carousel>
        {
            movies.map((movie)=>{
                return (
                <Paper key={movie.imdbId} >
                    <div className='movie-card-container' >
                        <div className='movie-card' style={{"--img": `url(${movie.backdrops[0]})`}} >
                            <div className='movie-details'>
                                <div className='movie-poster'>
                                    <img src={movie.poster} alt='movie poster'/>
                                </div>
                                <div className='movie-title'>
                                    <h4>
                                        {movie.title}
                                    </h4>
                                </div>
                                <div className='movie-functions'>
                                    <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`} >
                                        <div className='movie-buttons-container' >
                                            <div className='play-button-icon-container' >
                                                <FontAwesomeIcon icon={faCirclePlay} className='play-button-icon'/>
                                            </div>
                                        </div>
                                    </Link>
                                    <div>
                                        <Button variant='info' onClick={()=>reviews(movie.imdbId)} >Reviews</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
                )
            })
        }
      </Carousel>
    </div>
  )
}

export default Movies
