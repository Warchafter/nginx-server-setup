import React, { useState, useEffect, useRef } from 'react';
import './css/WavyFooter.css'; // Your CSS file for hero towers

const WavyFooter = () => {
    const [totalTowers, setTotalTowers] = useState(12); // Initial number of towers
    const [towerSizes, setTowerSizes] = useState([]);
    const towerRefs = useRef([]);

    useEffect(() => {
        const maxRem = 5; // Maximum height in rem for towers

        const interval = setInterval(() => {
            const updatedSizes = Array.from({ length: totalTowers }, () => {
                const randomHeight = Math.random() * maxRem;
                return `${randomHeight}rem`;
            });

            setTowerSizes(updatedSizes);
        }, 1000);

        return () => clearInterval(interval);
    }, [totalTowers]);

    useEffect(() => {
        towerRefs.current = towerRefs.current.slice(0, towerSizes.length);
    }, [towerSizes]);

    return (
        <div className="wavy-footer-wrapper">
            <div className="wavy-footer-background-wrapper"></div>
            <div className="wavy-footer-tower-wrapper">
                {Array.from({ length: totalTowers }).map((_, index) => (
                    <div
                        key={index}
                        className="wavy-footer-tower"
                        ref={(element) => (towerRefs.current[index] = element)}
                        style={{
                            height: towerSizes[index],
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default WavyFooter;