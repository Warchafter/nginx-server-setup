import "./css/AppsCardsShowcase.css";
import GlassCard from 'Components/Cards/GlassCard';

import {projectShowcaseList} from "shared/projectShowcaseList";

const AppsCardsShowcase = () => {

    /// When hovering over the cards, there should be a glassdoor effect on the
    /// background image, allowing for text to be shown and become readable.

    return(
        <div className='apps-cards-showcase__wrapper'>
            {projectShowcaseList.map((item, index) => (
                <div className="apps-cards-showcase__item">
                    <GlassCard>
                        <div
                            key={item.name+index}
                            className="apps-cards-showcase__content trigger"
                            style={{ backgroundImage: `url(${item.backgroundImageURL})` }}
                        >
                            <div className="app-card_content">
                                <div className="apps-cards-showcase-name target">
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            ))}
        </div>
    );
};

export default AppsCardsShowcase;
