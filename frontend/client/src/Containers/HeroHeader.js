import React from "react";
import "./css/HeroHeader.css";

const HeroHeader = () => {
    return (
        <div className="hero-image">
            <div className="hero-text">
                <div className="parentHeroHeader">
                    <div className="itemHeroHeader">
                        <h1>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                        </h1>
                    </div>
                    <div className="itemHeroHeader"></div>
                    <div className="itemHeroHeader">
                        <h1>Lorem ipsum dolor sit
                            amet, consectetur
                            adipiscing elit.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroHeader;