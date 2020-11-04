import React, { useContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'; //link da biblioteca, n tá pegando nenhum caminho
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


const ShapeCarga = () => {
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
    
  const bdList = () => {
    setLoading(true);
    api({  
      method: 'post',
      url: '/shape-to-postgis',
      data: { 

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
        <div>
        <Link to="/" className="shape-send-button" onClick={bdList}>
          REALIZAR CARGA
        </Link>
      </div>
    )
  
}

export default ShapeCarga;