import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  const [local, setLocal] = useState();
  const [portal, setPortal] = useState();
  const [table, setTable] = useState(''); 
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [bdList2, setBdList] = useState('');
  const [lista, setLista] = useState();
  const {shapeReturn, setShapeReturn} = useContext(AppContext); 

  const handleChange = (event) => {
    setCampos(event.target.value);
    bdList(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {}, [shapeReturn]);
  const bdList = (tableSelected) => {
    setLoading(true);
    api({  
      method: 'post',
      url: '/shape-to-post',
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


 /* return (
    <div className={classes.text}>
      <FormControl className={classes.text}>
        <InputLabel className={classes.label}>DE</InputLabel>
        <Select
          className={classes.text}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={campos}
          onChange={handleChange}
        >
          <MenuItem value="" className={classes.select}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1} className={classes.select}>the_geom</MenuItem>
          <MenuItem value={2} className={classes.select}>fid</MenuItem>
          <MenuItem value={3} className={classes.select}>wtc_pk</MenuItem>
          <MenuItem value={4} className={classes.select}>idcda</MenuItem>
          <MenuItem value={5} className={classes.select}>cocursodag</MenuItem>
          <MenuItem value={6} className={classes.select}>nudistbacc</MenuItem>
          <MenuItem value={7} className={classes.select}>nucompcda</MenuItem>
          <MenuItem value={8} className={classes.select}>nuareabacc</MenuItem>
          <MenuItem value={9} className={classes.select}>cocdadesag</MenuItem>
          <MenuItem value={10} className={classes.select}>nunivotcda</MenuItem>
          <MenuItem value={11} className={classes.select}>nuordemcda</MenuItem>
          <MenuItem value={12} className={classes.select}>dedominial</MenuItem>
          <MenuItem value={13} className={classes.select}>dsversao</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}*/