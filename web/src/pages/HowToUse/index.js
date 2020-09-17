import React from 'react';

//Assets
import Background from '../../assets/img/coming-soon.jpg';

import "./styles.css";

function Guide() {
    return (
        <div className="spoiler-image">
            <img src={Background} alt="Spoiler-Alert"/>
        </div>
    );
}

export default Guide;