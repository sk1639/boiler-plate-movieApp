import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config"
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'
import { Row } from 'antd'

function LandingPage() {
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en_US&page=1`;

        fetchMovies(endPoint, true);
    }, []);

    const fetchMovies = (endPoint, fromLoadMoreItem) => {
        fetch(endPoint).then(res => res.json())
            .then(
                res => {
                    setMainMovieImage(MainMovieImage || res.results[0]);
                    setMovies([...Movies, ...res.results]);
                    setCurrentPage(res.page)
                })
    }

    const loadMoreItems = () => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en_US&page=${CurrentPage + 1}`;
        console.log(endPoint);
        fetchMovies(endPoint)
    }


    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* Main Image */}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview} />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movie by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                LandingPage
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            >
                            </GridCards>
                        </React.Fragment>
                    ))}

                </Row>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}> Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
