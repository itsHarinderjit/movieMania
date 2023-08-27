import React, { useContext } from 'react'
import { currentUserContext } from '../../App'
import api from '../../api/axiosConfig'
import './Watchlist.css'
import 'react-toastify/dist/ReactToastify.css';
import MovieTile from './MovieTile'

function watchlist() {
    const {user,setUser} = useContext(currentUserContext)
    async function removeMovieFromWatchlist(movie) {
      console.log(movie)
      const response = await api.post('/api/v1/user/removeMovie',{username:user.userName,imdbId:movie.imdbId})
      let newUser = user
      const ind = newUser.watchlist.indexOf(movie)
      console.log(newUser.watchlist[ind])
      newUser.watchlist.splice(ind,1)
      setUser(newUser)
      localStorage.setItem("userInfo",JSON.stringify(user))
    }
  return (
    user !== null ? (
      <div className='watchlist-container'>
      {
        user.watchlist?.map((movie)=>{
            return (
                <MovieTile movie={movie} key={movie.imdbId} removeMovieFromWatchlist={removeMovieFromWatchlist}/>
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
