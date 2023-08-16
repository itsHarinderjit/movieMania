import { Paper } from '@mui/material'
import './Movies.css'
import Carousel from 'react-material-ui-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useContext } from 'react'
import { currentUserContext } from '../../App'
import api from '../../api/axiosConfig'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Movies({movies}) {
    const navigate = useNavigate()
    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`)
    }
    const {user,setUser} = useContext(currentUserContext)
    async function addMovieTowatchlist(movie) {
        if(user===null) {
            toast.info("LogIn to add movies to your watchlist",{autoClose:3000,theme:'dark'})
        }   
        else {
            const response = await api.post('/api/v1/user/addMovie',{userName:user.userName,imdbId:movie.imdbId})
            const data = user
            data.watchlist.push(movie);
            setUser(data)
            const element = document.getElementById(`watchlistButton${movie.imdbId}`)
            element.style.display = 'none'
            localStorage.setItem("userInfo",JSON.stringify(user))
            toast.info("Movie added to your watchlist",{autoClose:3000,theme:'dark'})
        }
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
                                    <Button variant='info' onClick={()=>reviews(movie.imdbId)} style={{height:'40px',marginRight:'10px'}}>Reviews</Button>
                                    {
                                        user !==null && user.watchlist.some((m)=>{
                                            return m.imdbId === movie.imdbId
                                        }) ? (
                                            <></>
                                        ) : (
                                            <Button variant='info' style={{height:'40px',marginLeft:'10px'}} onClick={()=>addMovieTowatchlist(movie)} id={`watchlistButton${movie.imdbId}`} >Add to watchlist</Button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
                )
            })
        }
      </Carousel>
      <ToastContainer/>
    </div>
  )
}

export default Movies
