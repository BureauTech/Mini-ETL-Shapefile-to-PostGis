import React from 'react';

import postStep1 from '../../assets/img/notebook-background.png';

import './styles.css';


function Connection() {
    return (
        <div className="db-container">
          <div className="post-step1-button">
            <img src={postStep1} alt="Shape-Button"/>
          </div>

          <form className="forms-content">
            <label htmlFor="">Bom dia flor</label>
            <input type="text"/>

            <label htmlFor="">Bom dia flor</label>
            <input type="text"/>

            <label htmlFor="">Bom dia flor</label>
            <input type="text"/>

            <label htmlFor="">Bom dia flor</label>
            <input type="text"/>

            <label htmlFor="">Bom dia flor</label>
            <input type="text"/>

          </form>

          <button type="submit">CONECTAR COM O BANCO DE DADOS</button>
        </div>
    )
}

export default Connection;