import React, { useContext, useState, useEffect } from 'react'; //3 hooks de estados 
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import api from '../../services/api';
import Connection from '../Connection';


import "./styles.css";
import AppContext from '../../context';

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
    margin: theme.spacing(0),
    fontSize: '30px',
    minWidth: '75%',
  },
  select: {
    fontSize: '20px',
    minWidth: '50%',
    margin: theme.spacing(0) 
  }
}));


function ControlledOpenSelect() {
  const [local, setLocal] = useState();
  const [portal, setPortal] = useState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [lista, setLista] = useState();
  const [open, setOpen] = React.useState(false); 
  const classes = useStyles();
  const [campos, setCampos] = React.useState('');
  const [field, setField] = useState([]);
  const [banco, setBanco] = useState();
  const [response2, setResponse] = useState();

  const [body2, setBody] = useState([]);
  const handleChange = (event) => {
    setCampos(event.target.value);
    setBanco(event.target.value)
  };

  const handleNew = (event) => {
    setField(event.target.value);
    PARAList(event.target.value);
  }
  const [Files, setFiles] = useState([]); //lista vazia
  const {shapeReturn, setShapeReturn} = useContext(AppContext); //chamando o AppContext 

  const [params, setParams] = useState([])

  useEffect(() => {}, [shapeReturn]);

  const PARAList = async (field) => {
    await api({  
      method: 'post',
      url: '/fields/' + field,
      data: {
        
      }
    })
    .then(response => { 
      }
    )
    .catch(err => {
      console.log('deu ruim bb', err); 
    });
  }
 
  const listItems = shapeReturn.map(
    (value, index) =>
    <option className="fields" id={index + 1} key={index}>{value}</option>
  );

  function inputFill() { //func 
    if (shapeReturn.length > 0){
      return (
        shapeReturn.map(
          (value, index) =>
          <option className="fields" id={index + 1} key={index}>{value}</option>
        )
      )}
    
    else {
      return (
        <>

          <MenuItem value={''} className={classes.text} onClick={Connection}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text} onClick={Connection}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text} onClick={Connection}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text} onClick={Connection}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text} onClick={Connection}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text} onClick={Connection}><em>None</em></MenuItem>
        </>
      )
    }
  }

  return (
    <div className={classes.text}>     
      <FormControl className={classes.text} onChange={handleNew}>
          <select value={campos} onChange={handleChange} className={classes.select}>
            <option value={0} selected disabled>Selecione a Tabela</option>

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

export default ControlledOpenSelect;