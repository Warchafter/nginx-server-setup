import "./css/CaidaTeamPointDisplay.css";

const CaidaTeamPointDisplay = ({ teamName, teamPoints }) => {

    return (
        <div className="caida-team-point-display__wrapper">
            <div className="caida-team-point-display__content">
                <p>Team N: 5 points</p>
            </div>
        </div>
    );
};

export default CaidaTeamPointDisplay;