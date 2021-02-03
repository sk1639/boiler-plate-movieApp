import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './favorite.css';
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'
import { Button } from 'antd'


function FavoritePage() {

    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoredMovie();

    }, [])


    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId') }).then(res => {
            if (res.data.success) {
                console.log(res.data)
                setFavorites(res.data.favorites);
            } else {
                alert('영화 정보를 가져오는데 실패 했습니다.')
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const Variables = {
            movieId, userFrom
        }

        Axios.post('api/favorite/removeFromFavorite', Variables).then(res => {
            if (res.data.success) {
                fetchFavoredMovie();
            } else {
                alert("리스트를 지우는데 실패했습니다.")
            }


        })

    }


    const rederCards = Favorites.map((favorites, index) => {

        const content = (
            <div>
                {favorites.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorites.moviePost}`} /> : "NO IMAGE"
                }
            </div>

        )

        return <tr key={index}>
            <Popover content={content} title={`${favorites.movieTitle}`}>
                <td>{favorites.movieTitle}</td>
            </Popover>
            <td>{favorites.movieRuntime}</td>
            <td><Button onClick={() => onClickDelete(favorites.movieId, favorites.userFrom)}>Remove</Button></td>
        </tr>

    })


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove From Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {rederCards}
                </tbody>

            </table>
        </div>
    )
}

export default FavoritePage
