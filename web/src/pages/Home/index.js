import React from "react";
import {Link} from 'react-router-dom';

import Shape from '../../assets/img/shape-post.png';
import Post from '../../assets/img/post-shape.png'; 

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
          <p>SHAPEFILE para POSTGIS</p>
          <span>Importe seus arquivos SHAPEFILE para seu banco de dados POSTGRESQL com segurança e confiabilidade.</span>
        </div>
        
        <div className="shape-button">
          <Link to="/shape">
            <img src={Shape} alt="Shape-Button"/>
          </Link>
        </div>

        <div className="post-header">
          <p>POSTGIS para SHAPEFILE</p>
          <span>Gere arquivos SHAPEFILE do seu banco de dados POSTGRESQL com segurança e confiabilidade.</span>
        </div>
        
        <div className="post-button">
          <Link to="/post">
            <img src={Post} alt="Shape-Button"/>
          </Link>
        </div>
      </div>

      
    </>
  );
}

export default Home;
