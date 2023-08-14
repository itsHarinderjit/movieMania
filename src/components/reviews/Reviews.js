import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewForm from '../reviewForm/ReviewForm';
import api from '../../api/axiosConfig'

function Reviews({getMovieData,movie,reviews,setReviews}) {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(()=>{
        getMovieData(movieId)
    },[])

    const addReview = async (e)=>{
        console.log(typeof(reviews))
        console.log(Array.isArray(reviews))
        e.preventDefault()
        try {
            const rev = revText.current;
            const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId})
            const updatedReviews = [...reviews,{body:rev.value}]
            rev.value = ""
            setReviews(updatedReviews)
        }catch(err) {
            console.log(err)
        }
    }

  return (
    <Container>
        <Row>
            <Col>
                <h3>
                    Reviews
                </h3>
            </Col>
        </Row>
        <Row className='mt-2' >
            <Col>
                <img src={movie?.poster} alt='movie poster' />
            </Col>
            <Col>
                <Row>
                    <Col>
                        <ReviewForm handleSubmit={addReview} revText={revText} labelText={'Write a review'} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr/>
                    </Col>
                </Row>
                {
                    reviews?.map((review)=>{
                        return (
                            <>
                                <Row>
                                    <Col>
                                        {review.body}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr/>
                                    </Col>
                                </Row>
                            </>
                        )
                    })
                }
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews
