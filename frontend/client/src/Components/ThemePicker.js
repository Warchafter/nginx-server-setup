import { useSelector, useDispatch } from 'react-redux';
import { themeList } from "shared/themeList";
import { toggleThemePicker } from "features/ui";
import { setDefaultTheme } from 'features/user';
import { getUserData } from 'features/user';

import './css/ThemePicker.css';

const ThemePicker = () => {
    const dispatch = useDispatch();
    const { themePicked } = useSelector(state => state.ui);
    const user = useSelector(getUserData);

    const onClickHandler = (e) => {
        const theme_picked = Number(e.target.getAttribute('value'))
        const id = user.id;
        dispatch(setDefaultTheme({ id, theme_picked }));
    };

    const onCloseHandler = () => {
        dispatch(toggleThemePicker());
    };


    return (
        <div className="center-wrapper">
            <div className="center-box modal-style1">
                <p className='exit-button' onClick={onCloseHandler}>x</p>
                <h3 style={{color: `var(--text-color)`}}>Theme Picker | Current: {user ? user.theme_picked : themePicked}</h3>
                <div className="theme-wrapper">
                    {themeList.map((value, index) => {
                        var i;
                        var backgroundStyle;
                        var shadowStyle;
                        for(i in value.cssAttributes) {
                            if (value.cssAttributes[i].name === '--background-color') (
                                backgroundStyle = value.cssAttributes[i].value
                            );
                            if (value.cssAttributes[i].name === '--shadow-color') (
                                shadowStyle = value.cssAttributes[i].value
                            );
                        }
                        return (
                            <button
                                className="theme-item-wrapper"
                                onClick={e => {onClickHandler(e)}}
                                id={value.themeId}
                                value={value.themeId}
                            >
                                <p
                                    value={value.themeId}
                                    className='theme-color-ball'
                                    style={{
                                        backgroundImage: `linear-gradient(
                                            135deg,
                                            ${backgroundStyle} 50%, ${shadowStyle} 50%
                                        )`
                                    }}
                                ></p>
                                <p style={{color: `var(--text-color)`}} value={value.themeId}>
                                    {value.themeName}
                                </p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ThemePicker;