import React from "react";
import {Link} from 'react-router-dom';

//Components
import Header from '../../components/Header';
import Faq from '../../components/Faq';
import Footer from '../../components/Footer';

//Assets
import postStep1 from '../../assets/img/post-shape.png';
import postStep2 from '../../assets/img/db-conect.png';
import postStep3 from '../../assets/img/de-para-post.png';

//Style
import "./styles.css";

function Post() {
  return (
    <>
      <Header />
      <Faq />
      
      <div className="main-container">
        <div className="post-step1-header">
          <p>1</p>
          <span> Gere arquivos SHAPEFILE do seu banco de dados POSTGRESQL com segurança e confiabilidade.</span>
        </div>
        
        <div className="post-step1-button">
          <img src={postStep1} alt="Shape-Button"/>
        </div>

        <div className="post-step2-header">
          <p>2</p>
          <span>Conecte-se com o seu Banco de Dados.</span>
        </div>
        
        <div className="post-step2-button">
          <img src={postStep2} alt="Shape-Button"/>
        </div>

        <div className="post-step3-header">
          <p>3</p>
          <span>Selecione os campos para a realização do de-para.</span>
        </div>
        
        <div className="post-step3-button">
          <img src={postStep3} alt="Shape-Button"/>
        </div>

        <Link to="/" className="post-send-button">
          REALIZAR CARGA
        </Link>

        

      </div>

      <Footer/>
      
    </>
  );
}

export default Post;
