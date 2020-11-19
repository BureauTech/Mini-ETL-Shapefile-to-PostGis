import React from 'react';
import {Link} from 'react-router-dom';

//Assets
import Background from '../../assets/img/coming-soon.jpg';
import Logo from '../../assets/img/logo.png';
import { FiArrowLeft } from 'react-icons/fi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Faq from '../../components/Faq';
import "./styles.css";

const Guide = () => {
    return (
<>
      <Header />
      <Faq />
      
      <div className="main-container">
        <div className="shape-header">
          <p>MANUAL DO USUÁRIO</p>
          <span>Nosso guia para ajudar você a usar a ferramenta ShapeGIS de maneira mais eficaz.</span>
        </div>
        
        
        <div className="post-header">
          <p>POSTGIS para SHAPEFILE</p>
          <span>Gere arquivos SHAPEFILE do seu banco de dados POSTGRESQL com segurança e confiabilidade.</span>
        </div>

      </div>

      <Footer />    
    </>
    );
}

export default Guide;