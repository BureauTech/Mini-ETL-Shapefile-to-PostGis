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
            <label htmlFor="">Local</label>
            <input type="text"/>

            <label htmlFor="">Porta</label>
            <input type="text"/>

            <label htmlFor="">Tabela</label>
            <input type="text"/>

            <label htmlFor="">Usuário</label>
            <input type="text"/>

            <label htmlFor="">Senha</label>
            <input type="text"/>

            <button type="submit">CONECTAR BANCO DE DADOS</button>

          </form>
        </div>
    )
}

export default Connection;