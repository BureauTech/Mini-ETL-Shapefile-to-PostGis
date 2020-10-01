import React, {useEffect, useState} from 'react';

import postStep1 from '../../assets/img/notebook-background.png';

import './styles.css';


function Connection() {

  const [host, setLocal] = useState();
  const [porta, setPortal] = useState();
  const [bd, setTable] = useState();
  const [usuario, setUser] = useState();
  const [senha, setPassword] = useState();
  const url = "/bomdia"; // site that doesn’t send Access-Control-*

  fetch(url)
  .then((response) => response.text())
  .then((data) => console.log('This is your data', data));
  {
    return (
        <div className="db-container">
          <div className="post-step1-button">
            <img src={postStep1} alt="Shape-Button" width="100%"/>
          </div>

          <form className="forms-content">
            <label htmlFor="">Local</label>
            <input type="text" 
              onChange={event => setLocal(event.target.value)}
            />

            <label htmlFor="">Porta</label>
            <input type="text" 
              onChange={event => setPortal(event.target.value)}
            />

            <label htmlFor="">Banco</label>
            <input type="text"
              onChange={event => setTable(event.target.value)}
            />

            <label htmlFor="">Usuário</label>
            <input type="text"
              onChange={event => setUser(event.target.value)}
            />

            <label htmlFor="">Senha</label>
            <input type="password" 
              onChange={event => setPassword(event.target.value)}
            />

            <button type="submit" onClick={() => alert(host + "\n" + porta + "\n" + bd + "\n" + usuario + "\n" + senha)}>CONECTAR COM O BANCO DE DADOS</button>
          </form>
        </div>
    )
  }
}

export default Connection;