import { createContext, useEffect, useState } from 'react';
import './App.css';
import api from './api/axiosConfig'
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import Wishlist from './components/wishlist/Watchlist';

export const currentUserContext = createContext(null)

function App() {
  const [movies,setMovies] = useState([])
  const [movie,setMovie] = useState()
  const [reviews,setReviews] = useState([])
  const [user,setUser] = useState(null)
  const getMovies = async ()=> {
    try {
      const response = await api.get("/api/v1/movies")
      setMovies(response.data)
    }catch(err) {
      console.log(err)
    }
  }
  const getMovieData = async (movieId)=> {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`)
      const singleMovie = response.data
      setMovie(singleMovie)
      setReviews(singleMovie.reviewIds)
    }catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getMovies();
  },[])
  return (
    <currentUserContext.Provider value={{user,setUser}}>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route path='/' element={<Home movies={movies} />}/>
            <Route path='/Watchlist' element={<Wishlist/>}/>
            <Route path='/Trailer/:ytTrailerId' element={<Trailer/>}/>
            <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}/>
          </Route>
        </Routes>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
