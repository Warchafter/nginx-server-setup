import "./css/PlatformShowcase.css";
import ReactLogo from '../assets/images/logo-react-icon.png';
import PythonLogo from '../assets/images/python-logo.png';
import JavascriptLogo from '../assets/images/JavaScript-Logo.png';
import DockerLogo from '../assets/images/docker-logo.png';
import ReduxLogo from '../assets/images/react-redux-logo.png'
import PostgresLogo from '../assets/images/PostgreSQL-logo.png';
import MaterialUILogo from '../assets/images/material-ui-logo.png';
import DjangoLogo from '../assets/images/django-logo.jpg';



const PlatformShowcase = () => {
    return (
        <div className='container-platforms'>
            <div className='grid-skill timeline'>
                    <div className='container-1 left'>
                        <div className='container-1-child'>
                            <img className='skill-logo' src={JavascriptLogo} alt='js-logo'></img>
                            <p>test</p>
                        </div>
                    </div>

                    <div className='middle-colum'>
                    </div>

                    <div className='empty-right'></div>

                    <div className='empty-right'></div>

                    <div className='middle-colum'>
                    </div>

                    <div className='container-1 right'>
                        <img className='skill-logo' src={PythonLogo} alt='python-logo'></img>
                    </div>

                    <div className='container-1 left'>
                        <img className='skill-logo' src={ReactLogo} alt='react-logo'></img>
                    </div>

                    <div className='middle-colum'>
                    </div>

                    <div className='empty-right'></div>

                    <div className='empty-right'></div>

                    <div className='middle-colum'>
                    </div>

                    <div className='container-1 right'>
                        <img className='skill-logo' src={DockerLogo} alt='docker-logo'></img>
                    </div>

                    <div className='container-1 left'>
                        <img className='skill-logo' src={ReduxLogo} alt='redux-logo'></img>
                    </div>

                    <div className='middle-colum'>
                    </div>

                    <div className='empty-right'></div>

                    <div className='empty-right'></div>

                    <div className='middle-colum'>
                    </div>

                    <div className='container-1 right'>
                            <img className='skill-logo' src={PostgresLogo} alt='postgres-logo'></img>
                    </div>

                    <div className='container-1 left'>
                        <img className='skill-logo' src={MaterialUILogo} alt='material-ui-logo'></img>
                    </div>

                    <div className='middle-colum'>
                    </div>

                    <div className='empty-right'></div>

                    <div className='empty-right'></div>

                    <div className='middle-colum'>
                    </div>

                    <div className='container-1 right'>
                        <img className='skill-logo' src={DjangoLogo} alt='django-logo'></img>
                    </div>
            </div>
            <div className='transition-block-skill-top'></div>
        </div>
    )
};

export default PlatformShowcase;