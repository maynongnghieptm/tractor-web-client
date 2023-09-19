import React from 'react';

const GearBar = (props) => {
    const { value, count, min } = props;

    const renderBars = () => {
        const bars = [];
        for (let i = 0; i < count; i++) {
            // Determine the background color based on the value
            let backgroundColor = 'transparent';
            if (i <= value + min) {
                backgroundColor =  'green'; // Set the color based on your condition
            }
            
            bars.push(
                <div key={i} style={{ backgroundColor }}></div>
            );
        }
        return bars;
    };

    return (
        <div className={`progress-bar-container gearbar `} style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${count}, 1fr)`,
        }}>
            {renderBars()}
        </div>
    );
};

export default GearBar;
