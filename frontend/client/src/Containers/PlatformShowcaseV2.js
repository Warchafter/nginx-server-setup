import "./css/PlatformShowcaseV2.css";
import {platformList} from '../shared/platformList.js';


const PlatformShowcase = () => {
    return (
        <div className='container-platforms-v2'>
            {platformList.map((value, index) => {
                return(
                    <>
                        <div className="platform-card-wrapper">
                            <img className="platform-logo" src={value.platformImageUrl} alt="logo"></img>
                            <p className="platform-description">{value.description}</p>
                        </div>

                        <div className="platform-line"></div>
                    </>
                )
            })}
            {/* <div className='container-1-v2 left-v2'>
                <div className='container-1-child-v2'>
                    <img className='skill-logo-v2' src={JavascriptLogo} alt='js-logo'></img>
                    <p>test</p>
                </div>
            </div>

            <div className='container-1-v2 right-v2'>
                <img className='skill-logo' src={PythonLogo} alt='python-logo'></img>
            </div>

            <div className='container-1-v2 left-v2'>
                <img className='skill-logo' src={ReactLogo} alt='react-logo'></img>
            </div>

            <div className='container-1 right-v2'>
                <img className='skill-logo' src={DockerLogo} alt='docker-logo'></img>
            </div>

            <div className='container-1 left'>
                <img className='skill-logo' src={ReduxLogo} alt='redux-logo'></img>
            </div>

            <div className='container-1 right'>
                    <img className='skill-logo' src={PostgresLogo} alt='postgres-logo'></img>
            </div>

            <div className='container-1 left'>
                <img className='skill-logo' src={MaterialUILogo} alt='material-ui-logo'></img>
            </div>

            <div className='container-1 right'>
                <img className='skill-logo' src={DjangoLogo} alt='django-logo'></img>
            </div> */}
        </div>
    )
};

export default PlatformShowcase;