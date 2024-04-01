import React, { useEffect, useRef } from "react";

import "./css/ProjectShowcase.css";
import { projList } from "Components/ProjectShowcaseList";

const ProjectShowcase = () => {
    const panelsRef = useRef([]);

    useEffect(() => {
        const panels = panelsRef.current;

        const activeHandlerPanels = () => {
            panels.forEach((panelshowcase) => {
            panelshowcase.addEventListener("mouseenter", () => {
                removeActiveClasses();
                panelshowcase.classList.add("active");
                });
            });
        };

        const removeActiveClasses = () => {
            panels.forEach((panelshowcase) => {
            panelshowcase.classList.remove("active");
            });
        };

        activeHandlerPanels();
    }, []);

    return (
    <div className="component">
        <div className="container-showcase">
        {projList.map((item, index) => (
            <div
                key={item.name}
                ref={(el) => (panelsRef.current[index] = el)}
                className={`panelshowcase ${index === 0 ? "active" : ""}`}
                style={{ backgroundImage: `url(${item.url})` }}
            >
            <div>
                <h3>{item.title}</h3>
            </div>
            </div>
        ))}
        </div>
    </div>
    );
};

export default ProjectShowcase;