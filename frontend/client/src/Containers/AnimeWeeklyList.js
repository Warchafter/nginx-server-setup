import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from "hoc/Layout/DefaultLayout";
import { getWeeklyAnimeScheduleRelease, getFavoriteAnimeList } from 'features/jikan_anime';
import "./css/AnimeWeeklyList.css";
import Countdown from '../shared/countdown';

const AnimeWeeklyList = () => {
    const dispatch = useDispatch();
    const { weeklyAnimeScheduleData } = useSelector(state => state.jikanAnime);
    const { favoriteAnimeList } = useSelector(state => state.jikanAnime);
    const [scheduleDay, setScheduleDay] = useState("None");

    const currentTime = Date.now();
    
    const getFavAnimeList = (e) => {
        e.preventDefault()
        dispatch(getFavoriteAnimeList());
    }

    const getWeeklyAnimeData = (e) => {
        e.preventDefault()
        setScheduleDay(e.currentTarget.value);
        dispatch(getWeeklyAnimeScheduleRelease({scheduleDay: e.currentTarget.value}));
        // dispatch(getWeeklyAnimeScheduleRelease());
    }

    const getCurrentTime = (e) => {
        e.preventDefault()
        console.log("currentTime: ", currentTime);
    }
    
    return (
        <DefaultLayout>
            <div className='dayBarWrapper'>
                <button value="monday" onClick={(e) => getWeeklyAnimeData(e)}>Monday</button>
                <button value="tuesday" onClick={(e) => getWeeklyAnimeData(e)}>Tuesday</button>
                <button value="wednesday" onClick={(e) => getWeeklyAnimeData(e)}>Wednesday</button>
                <button value="thursday" onClick={(e) => getWeeklyAnimeData(e)}>Thursday</button>
                <button value="friday" onClick={(e) => getWeeklyAnimeData(e)}>Friday</button>
                <button value="saturday" onClick={(e) => getWeeklyAnimeData(e)}>Saturday</button>
                <button value="sunday" onClick={(e) => getWeeklyAnimeData(e)}>Sunday</button>
            </div>
            <div className="day-range-picker"></div>

            <div className="day-title-wrp">
                <div className="day-title">Test title for the Day</div>
            </div>
            <div className="list-wrp">
                {weeklyAnimeScheduleData ? (
                    weeklyAnimeScheduleData.data.map((value, index) => (
                        // Assuming releaseDay comes as "Fridays"
                        <div className="indv-title-item" key={index}>
                            <div className="clock-header">
                            <Countdown
                                releaseTime={value.broadcast.time}
                                releaseDay={value.broadcast.day}
                                timezone={value.broadcast.timezone}
                            />
                            </div>
                            <div className="image-thumbnail-vert">
                                <img className="mdAnimeModalImg" src={value.images.jpg.image_url} alt={value.title} />
                            </div>
                            <div className="rating-bar-bottom"></div>
                        </div>
                    ))
                ) : (
                    <p>Data is not available</p> // Placeholder or alternative rendering when data is not present
                )}
            </div>
            <button onClick={getCurrentTime}>get time</button>
        </DefaultLayout>
    )
}

export default AnimeWeeklyList;