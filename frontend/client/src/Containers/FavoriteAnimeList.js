import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from "hoc/Layout/DefaultLayout";
import { Navigate } from 'react-router-dom';
import { Loader } from 'Components/Loader'
import { getFavoriteAnimeList } from 'features/jikan_anime';
// import MediumAnimeModal from 'Components/MediumAnimeModal';

import "./css/AnimeTest.css";

const AnimeTest = () => {
    const dispatch = useDispatch();

    const { isAuthenticated, user, loading } = useSelector(state => state.user);
    const { favoriteAnimeList } = useSelector(state => state.jikanAnime);

    useEffect(() => {
        dispatch(getFavoriteAnimeList())
    }, []);

    if (isAuthenticated && loading && user === null) {
        return <Navigate to='/login' />
    }

    return (
        <DefaultLayout title='Entertainment Advisor | Anime' content='Favorite Anime List'>
            {loading || user === null
                ?
                    <Loader />
                :
                    favoriteAnimeList
                        ?
                        <>
                            <p>Favotires added: {favoriteAnimeList.count}</p>
                            <ul>
                                {favoriteAnimeList.results.map((index, value) => {
                                    console.log(index);
                                    return (<li id={index}>{value.mal_id} (added: {value.fav_added})</li>)
                                })}
                            </ul>
                        </>
                        :
                            <p>There is not a list</p>
            }
        </DefaultLayout>
    );
};

export default AnimeTest;