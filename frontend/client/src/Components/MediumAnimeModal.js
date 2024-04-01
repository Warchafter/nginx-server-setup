import { useDispatch } from 'react-redux';
import { addFavoriteAnime } from "features/jikan_anime";

import "./css/MediumAnimeModal.css";

const MediumAnimeModal = ({ data }) => {
    const dispatch = useDispatch();

    const onFavClickHandler = (e) => {
        const mal_id = Number(e.target.getAttribute('value'))
        dispatch(addFavoriteAnime({mal_id}))
    }

    return (
        <div className="mdAnimeModalWrapper">
            <div className="animeModalLayout">
                <div className="animeModalLayoutTop">
                    <div className="mdAnimeModalImgWrapper">
                        <img className="mdAnimeModalImg" src={data.images.jpg.image_url} alt={data.title} />
                    </div>
                </div>
                <div className="animeModalLayoutBottom">
                    <h2 className="mdAnimeModalTitle">{data.title}</h2>
                    <ul>
                        <li>Rank: {data.rank}</li>
                        <li>Duration: {data.duration}</li>
                        <li>Rating: {data.rating}</li>
                    </ul>
                </div>
                <button
                    onClick={onFavClickHandler}
                    id={data.mal_id}
                    value={data.mal_id}
                >
                    Fav
                </button>
            </div>
        </div>
    );
};

export default MediumAnimeModal;