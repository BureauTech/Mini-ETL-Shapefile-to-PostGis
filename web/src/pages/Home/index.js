import React from "react";


//Components
import Header from '../../components/Header';

import "./styles.css";

function Home() {
  return (
    <>
      <Header />
      <div className="faq-container">
        <div className="text-content">
          <p>Conversor Shapefile Online</p>
          <span>Converta facilmente de e para Shapefile em segundos.</span>
        </div>
      </div>
    </>
  );
}

export default Home;
