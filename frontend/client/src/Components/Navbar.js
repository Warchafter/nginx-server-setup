import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'features/user';
import { getFirstLetter } from 'shared/shared';
import { toggleThemePicker } from 'features/ui';

import 'Components/css/Navbar.css';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.user);

    const userName = (user) => {
        return (
            <NavLink className='nav-p-bg' to="/profile">
                {user.first_name}, {getFirstLetter(user['last_name'])}
            </NavLink>
        );
    };

    const authLinks = (
        <>
            <NavLink className="nav-p-bg" to="/dashboard">
                Dashboard
            </NavLink>
            <div className="right-links">
                {user ? userName(user) : <></>}
                <a href='#!' className="nav-p-bg" onClick={() => dispatch(logout())}>
                    Logout
                </a>
            </div>
        </>
    );

    const guestLinks = (
        <div className="right-links">
            <NavLink className="nav-p-bg" to="/register">
                Register
            </NavLink>
            <NavLink className="nav-p-bg" to="/login">
                Login
            </NavLink>
        </div>
    )

    return (
        <div className="nav-wrapper">
            <Link className="nav-p-bg" to="/">
                Auth Site
            </Link>
            <Link className="nav-p-bg" to="/anime-test">
                Anime Test
            </Link>
            <Link className="nav-p-bg" to="/fav-anime-list">
                Anime List
            </Link>
            <Link className="nav-p-bg" to="/to-do-list">
                To Do List
            </Link>
            <p className="nav-p-bg" onClick={() => dispatch(toggleThemePicker())}>
                Theme
            </p>
            {isAuthenticated ? authLinks : guestLinks}
        </div>
    );
};

export default Navbar;
