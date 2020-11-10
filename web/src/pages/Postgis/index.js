import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

//Context
import AppContext from '../../context';

//Components
import Header from '../../components/Header';
import Faq from '../../components/Faq';
import Footer from '../../components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import MenuItem from '@material-ui/core/MenuItem';
import postStep1 from '../../assets/img/notebook-background.png';
import FormControl from '@material-ui/core/FormControl';
import postStep2 from '../../assets/img/post-shape-new.png';


//Style
import "./styles.css";

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


const Post = () => {
  const {shapeReturn, setShapeReturn} = useContext(AppContext);
// ------------------------------------------------------------
//Código componente Connection
const [local, setLocal] = useState();
const [portal, setPortal] = useState();
const [table, setTable] = useState(''); 
const [user, setUser] = useState();
const [password, setPassword] = useState();
const [bdList2, setBdList] = useState('');
const [lista, setLista] = useState();
const [campos, setCampos] = React.useState(0); 
const classes = useStyles();
const [field, setField] = useState([]);
const [banco, setBanco] = useState();
const [fieldsde, setFieldsDe] = useState([]);
const [fieldspara, setFieldsPara] = useState([]);

const handleChange2 = (event) => {
  setCampos(event.target.value);
  setBanco(event.target.value)
};

const handleNew = (event) => {
  setField(event.target.value);
  PARAList(event.target.value);
}

const PARAList = async (field) => {
  await api({  
    method: 'post',
    url: '/fields/' + field,
    data: {
      "host": local,
      "porta": portal,
      "bd": table, 
      "usuario": user,
      "senha": password
    }
  })
  .then(response => { 
    }
  )
  .catch(err => {
    console.log('deu ruim bb', err); 
  });
}

const listItems2 = shapeReturn.map(
  (value, index) =>
  <option className="fields" id={index + 1} key={index}>{value}</option>
);

function inputFill2() { //func 
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
useEffect(() => {
  console.log('context here: ', shapeReturn);
}, [shapeReturn]);

const handleChange = (e) => {
  console.log(e.target.value);
  setTable(e.target.value);
  console.log(table);
  bdList(e.target.value); //Para isso é só passar a tabela selecionada como um parâmetro para a próxima função.
}

const bdConnect = () => {

  var l = document.getElementById("local").value;
  var p = document.getElementById("porta").value;
  var u = document.getElementById("user").value;
  var s = document.getElementById("password").value;

  if (l === "") {
    alert("Favor preencher o campo <Local>.");
    document.getElementById("local").focus();
  } else if (p === "") {
    alert("Favor preencher o campo <Porta>.");
    document.getElementById("porta").focus();
  } else if (u === "") {
    alert("Favor preencher o campo <Usuário>.");
    document.getElementById("user").focus();
  } else if (s === "") {
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

// fim código connection
// ------------------------------------------------------------

  useEffect(() => {
    console.log('contexto aqui: ', shapeReturn);
  }, [shapeReturn]);
  
  const listItems = shapeReturn.map(
    (value, index) =>
    <label className="fields" id={index + 1} key={index}>{value}</label>
    );

    const itensListDe = fieldsde.map((valor) =>
    <label className="fields">
      {valor}
    </label>
  );
    
    function inputFillDE() { 
      if (fieldsde.length > 0) {
        return (
          itensListDe
        )
      }
      else {
        return (
          <>
            <h2 className="drop-message"><i>Realize os passos anteriores para visualização dos dados</i></h2>
          </>
        )
      }
    }
  
    const itensListPara = fieldspara.map((valor) =>
      <option value={valor}>
        {valor}
      </option>
    );
  
    const listPara = fieldsde.map((valor) =>
      <select id={valor} className="fields">
        <option selected disabled>Para</option>
        {itensListPara}
      </select>
    );
  
    //funcao para pegar colunas das tabelas
    function inputFillPARA() { 
      if (fieldspara.length > 0) {
        for (let y = 0; y < fieldsde.length; y++) {
          return (
            listPara
          )
        }
      }
      else {
        return (
          <>
            <h2 className="drop-message"><i>Realize os passos anteriores para visualização dos dados</i></h2>
          </>
        )
      }
    }

  return (
    <>
      <Header />
      <Faq />
      
      <div className="main-container">
        <div className="post-step1-header">
          <p>1</p>
          <span>Conecte-se com o seu Banco de Dados.</span>
        </div>
          
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
        <div className={classes.text}>    

        <FormControl className={classes.text} onChange={handleNew}>
          <select value={campos} onChange={handleChange2} className={classes.select}>
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
      </div>

        <div className="post-step2-header">
          <p>2</p>
          <span> Gere arquivos SHAPEFILE do seu banco de dados POSTGRESQL com segurança e confiabilidade.</span>
        </div>
          
        <div className="post-step2-button">
        <form method="POST" enctype="multipart/form-data" action="/upload">
          <img src={postStep2} alt="Shape-Button" width="100%"/>
          </form>
        </div>

        <div className="post-step3-header">
          <p>3</p>
          <span>Selecione os campos para a realização do de-para.</span>
        </div>
          
        <div className="post-step3-de-para">        
          <h1>DE-PARA</h1>

          <div className="post-step3-selection">
          <form className="columns">
              {inputFillDE()}
            </form>

            <form className="columns">

              {inputFillPARA()}
            </form>
          </div>      
        </div>

        <Link to="/" className="post-send-button">
          REALIZAR CARGA
        </Link>
      </div>

      <Footer/>
    </>
  );
}

export default Post;