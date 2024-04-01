import "./css/Footer.css";
import WavyFooter from "Components/WavyFooter";

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <div className="footer-content-overlay">
                <div className="logo-section">
                    <img className="image-logo" src="https://miro.medium.com/v2/resize:fit:1196/1*KZHfluSxMl5RMy2C9SLaEA.png" alt="react logo"></img>
                </div>
                <div className="info-section">
                    <ul className="footer-info-row">
                        <li className="footer-li">Kevin Arriaga Solis</li>
                        <li className="footer-li">Github</li>
                        <li className="footer-li">LinkedIn</li>
                        <li className="footer-li">Portfolio</li>
                    </ul>
                </div>
            </div>
            <WavyFooter className="wavy-footer-background"/>
        </div>
    )
}

export default Footer;