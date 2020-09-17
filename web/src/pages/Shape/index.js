import React from "react";

//Components
import Header from '../../components/Header';
import Faq from '../../components/Faq';

import "./styles.css";

function Shape() {
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
          <img src="http://placehold.it/900x400" alt="Shape-Button"/>
        </div>

        <div className="post-header">
          <p>SHAPEFILE para POSTGREE</p>
          <span> importe seus arquivos SHAPEFILE para seu banco de dados POSTGREESQL com segurança e confiabilidade.</span>
        </div>
        
        <div className="post-button">
          <img src="http://placehold.it/900x400" alt="Shape-Button"/>
        </div>

        <div className="post-header">
          <p>SHAPEFILE para POSTGREE</p>
          <span> importe seus arquivos SHAPEFILE para seu banco de dados POSTGREESQL com segurança e confiabilidade.</span>
        </div>
        
        <div className="post-button">
          <img src="http://placehold.it/900x400" alt="Shape-Button"/>
        </div>

      </div>
      
    </>
  );
}

export default Shape;
