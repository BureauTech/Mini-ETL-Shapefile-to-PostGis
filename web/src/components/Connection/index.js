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
    color: 'rgb(156 152 166)',
  },
  label: {
    fontSize: '20px',
    minWidth: '75%',
  }
}));


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

  
  const classes = useStyles(); 
  const [campos, setCampos] = React.useState(0); 
  const [open, setOpen] = React.useState(false); 
  const handleChange = (event) => { 
    setCampos(event.target.value); 
  };

  const handleClose = () => { 
    setOpen(false); 
  };

  const handleOpen = () => {
    setOpen(true); 
  };
  
  const bdConnect = () => {
    setLoading(true);
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
            <input type="text" autoFocus className="txtbox" onChange={event => setLocal(event.target.value)}/>
            <input type="text" className="txtbox" onChange={event => setPortal(event.target.value)}/>
             
            <input type="text" className="txtbox" onChange={event => setUser(event.target.value)}/>
            <input type="password" className="txtbox" onChange={event => setPassword(event.target.value)}/>
          </form> 
        </form>
                
        <button type="button" onClick={bdConnect}>CONECTAR</button>   
        
        <div className={classes.text}>  
          <FormControl className={classes.text}> 
          <Select  
          className={classes.select}
          open={open} 
          onClose={handleClose} 
          onOpen={handleOpen} 
          value={campos}
          onChange={handleChange}
          > 
          <MenuItem value={0} selected disabled className={classes.select}>Selecione o Banco de Dados</MenuItem>
          <MenuItem value={1} className={classes.select} onClick={bdConnect}>ft_ponto_drenagem</MenuItem>
        </Select>
        </FormControl>
        </div>
      </div>
    )
  
}

export default Connection;