import React from "react";
import {Link} from 'react-router-dom';

import "./styles.css";


function Header () {
    return (
        <div className="header-container">
            <div to="/" className="logo-container">
              <img src="http://placehold.it/180x100" alt="Logo" />
            </div>
            <div className="buttons-container">
              <Link to="/" className="converter">Conversor</Link>
              <Link to="/" className="use-guide">Como usar</Link>
            </div>
        </div>
    )
}

export default Header;