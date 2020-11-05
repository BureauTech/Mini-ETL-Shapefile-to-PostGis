import React, { useContext, useState, useEffect } from 'react';
import api from '../../services/api';
import AppContext from '../../context';
import postStep1 from '../../assets/img/notebook-background.png';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './styles.css';

const useStyles = makeStyles((theme) => ({ 
  button: {
    display: 'block',
    blockSize: '30px',
    marginTop: theme.spacing(2),
  }, 
  formControl: {
    margin: theme.spacing(1),
    minWidth: '75%',
  },
  text: {
    margin: '10px 0px 0px 0px',
    fontSize: '20px',
    minWidth: '75%',
  },
  select: {
    fontSize: '20px', 
    minWidth: '75%',
    backgroundColor: '#fff',
    color: '#000',
  },
  label: {
    fontSize: '20px',
    minWidth: '75%',
  }
}));


const Connection = () => {
  const [local, setLocal] = useState();
  const [portal, setPortal] = useState();
  const [table, setTable] = useState(''); 
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [bdList2, setBdList] = useState('');
  const [lista, setLista] = useState();
  const [open, setOpen] = React.useState(false); 
  const {shapeReturn, setShapeReturn} = useContext(AppContext); 
  const [campos, setCampos] = React.useState(0); 

  useEffect(() => {
    console.log('context here: ', shapeReturn);
  }, [shapeReturn]);

  const classes = useStyles(); 
  const handleClose = () => { 
    setOpen(false); 
  };

  const handleOpen = () => {
    setOpen(true); 
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setTable(e.target.value);
    console.log(table);
    bdList(e.target.value); //Para isso é só passar a tabela selecionada como um parâmetro para a próxima função.
  }

  const handleSubmit = () => {
    console.log(table)
  }
  
  const bdConnect = () => {

    var l = document.getElementById("local").value;
    var p = document.getElementById("porta").value;
    var u = document.getElementById("user").value;
    var s = document.getElementById("password").value;

    if (l == "") {
      alert("Favor preencher o campo <Local>.");
      document.getElementById("local").focus();
    } else if (p == "") {
      alert("Favor preencher o campo <Porta>.");
      document.getElementById("porta").focus();
    } else if (u == "") {
      alert("Favor preencher o campo <Usuário>.");
      document.getElementById("user").focus();
    } else if (s == "") {
      alert("Favor preencher o campo <Senha>.");
      document.getElementById("password").focus();
    } else {
    api({  
      method: 'post',
      url: '/connect/postgres',
      data: { 
        "host": local,
        "porta": portal,
        "bd": null, 
        "usuario": user,
        "senha": password
      }
    })
    .then(response => { 
        console.log(response.data);
        setBdList(response.data);
      }
    )
    .catch(err => {
      console.log('deu ruim', err); 
    });
  }
  }
  
  const bdList = (tableSelected) => {
    setLoading(true);
    api({  
      method: 'post',
      url: '/connect/database',
      data: { 
        "host": local,
        "porta": portal,
        "bd": tableSelected, 
        "usuario": user,
        "senha": password
      }
    })
    .then(response => { 
        setLista(response.data); 
        console.log('olha a lista ' + JSON.stringify(lista))
        setShapeReturn(response.data); 
      }
    )
    .catch(err => {
      console.log('deu ruim bb', err); 
    });
  } 
  
    return (
      <div className="db-container" width="100%">
        <div className="db-container-title" width="100%">
          <h1>CONEXÃO COM O BANCO DE DADOS</h1>
        </div>
        
        <form className="forms-content-label-text-box" width="100%">
          <div className="post-step1-button" width="100%">
            <img src={postStep1} alt="Shape-Button" width="80%"/>
          </div>
              
          <form className="forms-content-label">
            <label htmlFor="">Local</label>
            <label htmlFor="">Porta</label>
  
            <label htmlFor="">Usuário</label>
            <label htmlFor="">Senha</label>
          </form>    
        <form className="forms-content-text-box">
            <input type="text" className="txtbox" id="local" onChange={event => setLocal(event.target.value)}/>
            <input type="number" className="txtbox" id="porta" onChange={event => setPortal(event.target.value)}/>
             
            <input type="text" className="txtbox" id="user" onChange={event => setUser(event.target.value)}/>
            <input type="password" className="txtbox" id="password" onChange={event => setPassword(event.target.value)}/>
          </form> 
        </form>

        <button type="button" onClick={bdConnect}>CONECTAR</button>   
        

          <div className={classes.text}>  
          <form className={classes.text}> 

          <select value={table} onChange={handleChange} className={classes.select}>
            <option value={0} selected disabled>Selecione o Banco de Dados</option>

            { bdList2 && bdList2.length > 0 && 
              bdList2.map((item)=>{
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
          </select>
        </form>
        </div>
      </div>
    )
  
}

export default Connection;