import React, { useContext } from 'react'
import { currentUserContext } from '../../App'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import './Watchlist.css'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function watchlist() {
    const {user,setUser} = useContext(currentUserContext)
    const navigate = useNavigate()
    function Navigate(movie) {
      navigate(`/Trailer/${movie}`)
    }
  return (
    user !== null ? (
      <div className='watchlist-container'>
      {
        user.watchlist?.map((movie)=>{
            return (
                <div className='movie-container'>
                    <div className='poster-container' onClick={()=>Navigate(movie.trailerLink.substring(movie.trailerLink.length-11))}>
                      <img src={movie.poster} alt={`${movie.title} poster`} className='poster'/>
                    </div>
                    <div className='movie-title'>
                        {movie.title}
                    </div>
                    <div className='movie-attributes'>
                      <div>
                        {movie.releaseDate.substr(0,4)}
                      </div>
                      {
                        movie.genres.slice(0,2).map((gen)=>{
                          return (
                            <div>
                              {gen}
                            </div>
                          )
                        })
                      }
                    </div>
                </div>
            )
        })
      }
    </div>  
    ) : (
      <div className='msg' >
        LogIn to view your watchlist
      </div>
    )
  )
}

export default watchlist
