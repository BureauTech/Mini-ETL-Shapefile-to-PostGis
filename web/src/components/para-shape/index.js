import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import api from '../../services/api';

import "./styles.css";

const bdConnect = () => {
  api({
    method: 'get',
    url: '/bomdia',
    })
  } 

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
    fontSize: '20px',
    minWidth: '75%',
  },
  select: {
    fontSize: '15px',
    minWidth: '75%',
  }
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [campos, setCampos] = React.useState('');
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

  return (
    <div className={classes.text}>
      <FormControl className={classes.text}>
        <InputLabel className={classes.text}>TABELA</InputLabel>
        <Select
          className={classes.text}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={campos}
          onChange={handleChange}
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