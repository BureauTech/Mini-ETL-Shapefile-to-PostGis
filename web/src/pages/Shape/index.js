import React, { useContext, useState, useEffect } from 'react'; //3 hooks de estados 

import {Link} from 'react-router-dom'; //link da biblioteca, n tá pegando nenhum caminho

//Context
import AppContext from '../../context';

//Components
import Header from '../../components/Header';
import Faq from '../../components/Faq';
import Footer from '../../components/Footer';
import Connection from '../../components/Connection';
import UploadShape from '../../components/Upload-Shape';
import MenuItem from '../../components/para-shape'; //pegando oq fizemos 

//Styles
import "./styles.css"; 

const Shape = () => {
  const [Files, setFiles] = useState([]); //lista vazia
  const {shapeReturn, setShapeReturn} = useContext(AppContext); //chamando o AppContext 

  useEffect(() => {
    console.log('contexto aqui: ', shapeReturn);
  }, [shapeReturn]);

  const listItems = shapeReturn.map(
    (value, index) =>
    <label className="fields" id={index + 1} key={index}>{value}</label>
  );

  function inputFill() { //func 
    console.log('NÃO SE CONFIA EM ANÃO BEBEDOR DE APPIA', shapeReturn.length);
    if (shapeReturn.length > 0){
      return (
        shapeReturn.map(
          (value, index) =>
          <label className="fields" id={index + 1} key={index}>{value}</label>
        )
      )}
    
    else {
      return (
        <> //tag vazia pra n reclamar de ter dois return 
          <label className="fields2">PARA</label>
          <label className="fields2">PARA</label>
          <label className="fields2">PARA</label>
          <label className="fields2">PARA</label>
          <label className="fields2">PARA</label>
          <label className="fields2">PARA</label>
          <label className="fields2">PARA</label>
          <label className="fields2">PARA</label>
        </>
      )
    }
  }

  return (
    <>
      <Header />
      <Faq />
      
      <div className="main-container"> 
        <div className="shape-step1-header">
          <p>1</p>
          <span>
          Conecte-se com o seu Banco de Dados.</span>
        </div>
        
        <Connection />

        <div className="shape-step2-header">
          <p>2</p>
          <span>Selecione a tabela do banco</span>
        </div>
        
        <MenuItem />
  
        <div className="shape-step3-header">
          <p>3</p>
          <span> Carregue seus arquivos SHAPEFILE para seu banco de dados POSTGRESQL com segurança.</span>
        </div>
        
        <UploadShape />

        <div className="shape-step4-header">
          <p>4</p>
          <span>Selecione os campos para a realização do de-para.</span>
        </div>
        
        <div className="shape-step4-de-para">
          <h1>DE-PARA</h1>
            
            <div className="shape-step4-selection">
              <form className="columns">
                <label className="fields">DE</label>
                <label className="fields">DE</label>
                <label className="fields">DE</label>
                <label className="fields">DE</label>
                <label className="fields">DE</label>
                <label className="fields">DE</label>
                <label className="fields">DE</label>
                <label className="fields">DE</label>
              </form>

            <form className="columns">
              {inputFill()}
            </form>
          </div>
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
