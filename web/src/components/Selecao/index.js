import React, { useContext, useState, useEffect } from 'react'; //3 hooks de estados 
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import api from '../../services/api';

import "./styles.css";
import AppContext from '../../context';
import shape from '@material-ui/core/styles/shape';

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


export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [campos, setCampos] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setCampos(event.target.value);
  };
  const [Files, setFiles] = useState([]); //lista vazia
  const {shapeReturn, setShapeReturn} = useContext(AppContext); //chamando o AppContext 

  useEffect(() => {}, [shapeReturn]);

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

          <MenuItem value={''} className={classes.text}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text}><em>None</em></MenuItem>
          <MenuItem value={''} className={classes.text}><em>None</em></MenuItem>
        </>
      )
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.text}>     
      <FormControl className={classes.text}>
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