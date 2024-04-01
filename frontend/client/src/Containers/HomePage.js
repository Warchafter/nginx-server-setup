import DefaultLayout from 'hoc/Layout/DefaultLayout';
import AppsCardsShowcase from './AppsCardsShowcase';

import { useDispatch } from 'react-redux';
import { refreshAuthToken } from 'features/user';

const HomePage = () => {
const dispatch = useDispatch();

    const onRefreshTokenHandler = () => {
        dispatch(refreshAuthToken());
    }

    return (
        <DefaultLayout title='Auth Site | Home' content='Home Page'>
            <h1 style={{color: `var(--text-color)`}}>Home Page</h1>
            <h3 style={{color: `var(--text-color)`}}>
                Check out these neats apps I've developed!
            </h3>
            <AppsCardsShowcase></AppsCardsShowcase>
            <p style={{color: `var(--text-color)`}}>test 2</p>
            <button onClick={onRefreshTokenHandler}>Refresh Token</button>
        </DefaultLayout>
    );
}

export default HomePage;