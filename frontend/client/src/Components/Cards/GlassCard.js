import "./css/GlassCard.css";

const GlassCard = ({children}) => {
    return (
        <div className="glass-card__content">
            {children}
        </div>
    );
};

export default GlassCard;