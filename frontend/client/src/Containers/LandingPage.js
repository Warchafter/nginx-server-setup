import FloatingNavbar from "Components/FloatingNavbar";
import HeroHeader from "Containers/HeroHeader";
import PlatformShowcaseV2 from "Containers/PlatformShowcaseV2";
import Footer from "Containers/Footer";

import "./css/LandingPage.css";
import ProjectShowcase from "./ProjectShowcase";


const LandingPage = () => {
    return (
        <div className="page-container">
            <FloatingNavbar />
            <div className="content-wrapper">
                <HeroHeader />
                <ProjectShowcase />
                <PlatformShowcaseV2 />
            </div>
            <div className="footer-position">
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;