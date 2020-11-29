import React from "react";
import {Link} from 'react-router-dom';
import Pdf from '../../assets/pdf/Manual_Usuario_ShapeGis.pdf';

import "./styles.css";

import Logo from '../../assets/img/logo.png'

function Header () {
    return (
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img src={Logo} alt="Logo" />
        </Link>
      
      <div className="buttons-container">
        <Link to="/" className="converter">CONVERSOR</Link>
        <a href = {Pdf} target = "_blank" className="use-guide">COMO USAR</a>
      </div>
    </div>
  )
}

export default Header;