import React from "react";
import {Link} from 'react-router-dom';

//Components
import Header from '../../components/Header';
import Faq from '../../components/Faq';
import Footer from '../../components/Footer';
import Connection from '../../components/Connection';

//Assets
import shapeStep1 from '../../assets/img/shape-post-new.png';
import shapeStep3 from '../../assets/img/de-para-shape.png';

//Styles
import "./styles.css";

function Shape() {
  return (
    <>
      <Header />
      <Faq />
      
      <div className="main-container">
        <div className="shape-step1-header">
          <p>1</p>
          <span> Carregue seus arquivos SHAPEFILE para seu banco de dados POSTGRESQL com segurança.</span>
        </div>
        
        <div className="shape-step1-button">
          <img src={shapeStep1} alt="Shape-Button" width="100%"/>
        </div>

        <div className="shape-step2-header">
          <p>2</p>
          <span>Conecte-se com o seu Banco de Dados.</span>
        </div>
        
        <Connection />

        <div className="shape-step3-header">
          <p>3</p>
          <span>Selecione os campos para a realização do de-para.</span>
        </div>
        
        <div className="shape-step3-button">
          <img src={shapeStep3} alt="Shape-Button" width="100%"/>
        </div>

        <Link to="/" className="shape-send-button">
          REALIZAR CARGA
        </Link>

      </div>
      
      <Footer />
    </>
  );
}

export default Shape;