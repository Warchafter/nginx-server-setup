import "./css/CaidaPlayerIcon.css";
import CaidaBackCard from "Components/CaidaCardGame/CaidaBackCard";

const CaidaPlayerIcon = ({playerNumber}) => {
    return (
        <div className="caida-player-icon-wrapper">
            <div className="caida-player-icon">
                <p>Player {playerNumber}</p>
            </div>
            <CaidaBackCard />
            <div className="caida-orange-card caida-sm-card"></div>
            <div className="caida-yellow-card caida-sm-card"></div>
            <div className="caida-white-card caida-sm-card"></div>
        </div>
    );
};

export default CaidaPlayerIcon;