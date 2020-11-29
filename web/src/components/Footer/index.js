import React from 'react';
import {Link} from 'react-router-dom';
import Pdf from '../../assets/pdf/Manual_Usuario_ShapeGis.pdf';

//Assets
import Logo from '../../assets/img/logo.png'; 

// Icon
import {AiFillGithub} from 'react-icons/ai';

// Style
import "./styles.css";

function Footer() {
    return(
        <div className="footer-container">
        <div className="head-margin"></div>
        <div className="info-content">
          <img src={Logo} alt="Logo"/>
          <div>
            <p>CONVERSOR</p>
            <Link to="/shape">
              <span>Shapefile - Postgis</span>
            </Link>
            <Link to="/post">
              <span>Postgis - Shapefile</span>
            </Link>
          </div>
          <div>
            <p>COMO USAR</p>
            <a href = {Pdf} target = "_blank"><span>Guia de uso</span></a>
          </div>
          <div>
            <p>CONTATO</p>
            <a href="https://github.com/BureauTech"><span>GITHUB</span></a>
          </div>
        </div>
        <div className="head-margin"></div>
        <div className="footer-end">
          <p> Copyright © {new Date().getFullYear()} Bureau Tech - Extract, Transform, Load </p>
          <a href="https://github.com/BureauTech">
            <AiFillGithub value={{className: 'git-icon'}} />
          </a>
        </div>
      </div>
    )
}

export default Footer;