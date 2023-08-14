import React from 'react'
import './Trailer.css'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

function Trailer() {
    const params = useParams()
    const key = params.ytTrailerId
  return (
    <div className='react-player-container' >
      {
        (key!==null) ? (
            <ReactPlayer controls={true} playing={true} url={`https://www.youtube.com/watch?v=${key}`} height={'100%'} width={'100%'} />
        ) : null
      }
    </div>
  )
}

export default Trailer
