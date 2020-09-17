import React from "react";
import {Link} from 'react-router-dom';

//Components
import Header from '../../components/Header';
import Faq from '../../components/Faq';

import "./styles.css";

function Home() {
  return (
    <>
      <Header />
      <Faq />
      
      <div className="main-container">
        <div className="shape-header">
          <p>SHAPEFILE para POSTGREE</p>
          <span> Importe seus arquivos SHAPEFILE para seu banco de dados POSTGREESQL com segurança e confiabilidade.</span>
        </div>
        
        <div className="shape-button">
          <Link to="/shape">
            <img src="http://placehold.it/900x400" alt="Shape-Button"/>
          </Link>
        </div>

        <div className="post-header">
          <p>SHAPEFILE para POSTGREE</p>
          <span> importe seus arquivos SHAPEFILE para seu banco de dados POSTGREESQL com segurança e confiabilidade.</span>
        </div>
        
        <div className="post-button">
          <Link to="/post">
            <img src="http://placehold.it/900x400" alt="Shape-Button"/>
          </Link>
        </div>
      </div>

      
    </>
  );
}

export default Home;
