import { useSelector } from 'react-redux';
import { Sidebar, Navbar } from 'Components/index';
import { Helmet } from 'react-helmet';

import ThemePicker from 'Components/ThemePicker';

import "hoc/Layout/css/DefaultLayout.css";

const DefaultLayout = ({title, content, children}) => {
    const { themePickerToggle } = useSelector(state => state.ui);

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={content}/>
            </Helmet>
            <div className='layout-lg'>
                <Sidebar />
                <div className='layout-right'>
                    <div className='layout-navbar'>
                        <Navbar />
                    </div>
                    {themePickerToggle ? <ThemePicker /> : null}
                    <div className='layout-main-content'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;