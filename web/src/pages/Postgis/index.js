import React from "react";

//Components
import Header from '../../components/Header';
import Faq from '../../components/Faq';

import "./styles.css";

function Post() {
  return (
    <>
      <Header />
      <Faq />
      
      <div className="main-container">
        <div className="first-header">
          <p>SHAPEFILE para POSTGREE</p>
          <span> Importe seus arquivos SHAPEFILE para seu banco de dados POSTGREESQL com segurança e confiabilidade.</span>
        </div>
        
        <div className="first-button">
          <img src="http://placehold.it/900x400" alt="Shape-Button"/>
        </div>

      </div>      
    </>
  );
}

export default Post;
