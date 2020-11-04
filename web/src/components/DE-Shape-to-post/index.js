import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import AppContext from '../../context';
import api from '../../services/api';
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
    className: 'fields',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  text: {
    fontSize: '30px',
    minWidth: '100%',
  },
  label: {
    fontSize: '30px',
    minWidth: '100%',
  },
  select:{
    fontSize: '20px',
    minWidth: '50%',
    margin: theme.spacing(0) 
  }
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [campos, setCampos] = React.useState('');
  const [open, setOpen] = React.useState(false);
  //const [local, setLocal] = useState();
  //const [portal, setPortal] = useState();
  //const [table, setTable] = useState(''); 
  //const [user, setUser] = useState();
  //const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [bdList2, setBdList] = useState('');
  const [lista, setLista] = useState();
  const {shapeReturn, setShapeReturn} = useContext(AppContext); 

  const handleChange = (event) => {
    setCampos(event.target.value);
    bdList(event.target.value);
  };

  useEffect(() => {}, [shapeReturn]);
  const bdList = (tableSelected) => {
    setLoading(true);
    api({  
      method: 'get',
      url: '/fields/ft_curso_dagua',
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
    <div className={classes.text}>     
      <FormControl className={classes.text}>
          <select value={campos} onChange={handleChange} className="fields2">
            <option value={0} selected disabled>Selecione o atributo do arquivo</option>

            { shapeReturn && shapeReturn.length > 0 && 
              shapeReturn.map((item)=>{
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
          </select>          
      </FormControl>
    </div>
  );
}