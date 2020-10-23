import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import api from '../../services/api';

const bdConnect = () => { 
  api({
    method: 'get',
    url: '/bomdia',
    })
  } //chama a API 

const useStyles = makeStyles((theme) => ({ //equivalente ao css
  button: {
    display: 'block',
    blockSize: '30px',
    marginTop: theme.spacing(2),
  }, //botão termina aqui
  formControl: {
    margin: theme.spacing(1),
    minWidth: '75%',
  },
  text: {
    margin: theme.spacing(0),
    fontSize: '20px',
    minWidth: '75%',
  },
  select: {
    fontSize: '15px',
    minWidth: '75%',
  }// definido o estilo de algo 
}));

export default function ControlledOpenSelect() { //nova função; 
  const classes = useStyles(); //chama useStyles
  const [campos, setCampos] = React.useState(''); //definindo estados = vazio  hook
  const [open, setOpen] = React.useState(false); //só vai ser open quando a gente mandar, caso contrario fechado
  const handleChange = (event) => { //é um evento que vai pefar o setCampos e definir um valor
  setCampos(event.target.value); // vai atualizar o campos da linha 39,  smp q tiver um evento
  };

  const handleClose = () => { //func sem nenhum parametro 
    setOpen(false); // fecha o setOpen
  };

  const handleOpen = () => {
    setOpen(true); //abre Open como padrao
  };

  return ( //oq vai aparecer na tela
    <div className={classes.text}>  
      <FormControl className={classes.text}>
        <InputLabel className={classes.text}>TABELA</InputLabel> 
        <Select  //tbm importado no começo //tem vários parametro / em linhas separadas
          className={classes.text} //aparencia da class
          open={open} //o open do estado da linha 40
          onClose={handleClose} //func pra fechado 
          onOpen={handleOpen} //func aberto //funcs são amarelas
          value={campos} //chamando linha 39
          onChange={handleChange} //chama linha 41 e 42
        > 
          <MenuItem value="" className={classes.select}><em>None</em></MenuItem>
          <MenuItem value={1}className={classes.select} onClick={bdConnect}>ft_ponto_drenagem</MenuItem> 
          <MenuItem value={2}className={classes.select} onClick={bdConnect}>geography_columns</MenuItem>
          <MenuItem value={3}className={classes.select} onClick={bdConnect}>geometry_columns</MenuItem>
          <MenuItem value={4}className={classes.select} onClick={bdConnect}>spatial_ref_sys</MenuItem>
          <MenuItem value={5}className={classes.select} onClick={bdConnect}>raster_columns</MenuItem>
          <MenuItem value={6}className={classes.select} onClick={bdConnect}>raster_overviews</MenuItem>
          <MenuItem value={7}className={classes.select} onClick={bdConnect}>ft_bacia_hidrografica_n1</MenuItem>
          <MenuItem value={8}className={classes.select} onClick={bdConnect}>ft_curso_dagua</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}