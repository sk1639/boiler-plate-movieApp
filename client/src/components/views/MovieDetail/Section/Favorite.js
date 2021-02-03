import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {
    console.log('props', props);
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRuntime = props.movieInfo.runtime
    let variables = {
        userFrom, movieId, movieTitle, moviePost, movieRuntime
    }

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false)


    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables).then(res => {

            if (res.data.success) {
                console.log('좋아요갯수', res.data.favoriteNumber);
                setFavoriteNumber(res.data.favoriteNumber)
            } else {
                alert('숫자 정보를 가져오는데 실패했습니다.');
            }
        })

        Axios.post('/api/favorite/favorited', variables).then(res => {

            if (res.data.success) {
                console.log('좋아요상태', res.data)
                setFavorited(res.data.favorited);
                console.log(Favorited);
            } else {
                alert('정보를 가져오는데 실패했습니다.');
            }
        })


    }, [])



    const onClickFavorite = () => {
        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables).then(res => {
                if (res.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1);
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                }
            })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables).then(res => {
                if (res.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1);
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 c 걸 실패했습니다.')
                }
            })
        }
    }


    return (
        <div>

            <Button onClick={onClickFavorite}>{Favorited ? 'Favorited' : 'Not Favortied'} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
