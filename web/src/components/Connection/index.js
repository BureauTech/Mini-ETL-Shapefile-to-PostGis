import React, { useContext, useState, useEffect } from 'react';

//API
import api from '../../services/api';
import AppContext from '../../context';

import postStep1 from '../../assets/img/notebook-background.png';

import './styles.css';

const Connection = () => {

  const [local, setLocal] = useState();
  const [portal, setPortal] = useState();
  const [table, setTable] = useState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const {shapeReturn, setShapeReturn} = useContext(AppContext);

  useEffect(() => {
    console.log('context here: ', shapeReturn);
  }, [shapeReturn]);

//  const url = "/bomdia"; // site that doesn’t send Access-Control-*

//  fetch(url)
//  .then((response) => response.text())
//  .then((data) => console.log('This is your data', data));
//  {

  const bdConnect = () => {
    setLoading(true);
    api({
      method: 'post',
      url: '/tables',
      data: {
        "host": local,
        "porta": portal,
        "bd": table,
        "usuario": user,
        "senha": password
      }
    })
    .then(response => {
        setShapeReturn(response.data);
      }
    )
    .catch(err => {
      console.log('deu ruim bb', err);
    });

  } 
    return (
        <div className="db-container" width="100%">
          <div className="post-step1-button" width="100%">
            <img src={postStep1} alt="Shape-Button" width="80%"/>
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

            <button type="button" onClick={bdConnect}>
              CONECTAR
            </button>
          </form>
        
        </div>
     
      
    )
}


export default Connection;