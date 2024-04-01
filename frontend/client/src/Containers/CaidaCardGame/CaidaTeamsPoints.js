import CaidaTeamPointDisplay from "Components/CaidaCardGame/CaidaTeamPointDisplay";

import './css/CaidaTeamsPoints.css';

const CaidaTeamsPoints = () => {
    return (
        <div className="caida-teams-points-display-wrapper">
            <CaidaTeamPointDisplay />
            <CaidaTeamPointDisplay />
            <CaidaTeamPointDisplay />
        </div>
    );
};

export default CaidaTeamsPoints;