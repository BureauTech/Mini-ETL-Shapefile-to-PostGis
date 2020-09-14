import React from "react";


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
        <div className="header-container">
          <p>SHAPEFILE para POSTGREE</p>
          <span> importe seus arquivos SHAPEFILE para seu banco de dados POSTGREESQL com segurança e confiabilidade.</span>
        </div>
        <div className="shape-button">
          POSTGREE para SHAPEFILE
        </div>
      </div>
    </>
  );
}

export default Home;
