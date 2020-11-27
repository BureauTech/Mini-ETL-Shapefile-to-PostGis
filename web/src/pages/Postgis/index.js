import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom';

//Context
import AppContext from '../../context';

//Components
import Header from '../../components/Header';
import Faq from '../../components/Faq';
import Footer from '../../components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import postStep1 from '../../assets/img/notebook-background.png';
import FormControl from '@material-ui/core/FormControl';
import ReactLoading from 'react-loading';

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
const [porta, setPorta] = useState();
const [table, setTable] = useState(''); 
const [user, setUser] = useState();
const [password, setPassword] = useState();
const [bdList2, setBdList] = useState('');
const [lista, setLista] = useState();
const [campos, setCampos] = React.useState(0); 
const classes = useStyles();
const [stateCon, setStateCon] = useState(false);
const [statDown, setStateDown] = useState(false);

const handleChange = (e) => {
  console.log(e.target.value);
  setTable(e.target.value);
  console.log(table);
  bdList(e.target.value); //Para isso é só passar a tabela selecionada como um parâmetro para a próxima função.
}

//funcao que gera um loading da conexão com o bd
const Loadingcon = ({ type, color }) => (
  <ReactLoading type={"balls"} color={'white'} height={'10%'} width={'10%'}  />
);
//funcao que gera um loading do dowload do arquivo do banco
const Loadingdown = ({ type, color }) => (
  <ReactLoading type={"spin"} color={'#06a6ce'} height={'10%'} width={'10%'}  />
);

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
    setStateCon(true);
  api({  
    method: 'post',
    url: '/connect/postgres',
    data: { 
      "host": local,
      "porta": porta,
      "bd": null, 
      "usuario": user,
      "senha": password
    }
  })
  .then(response => { 
    setStateCon(false);
      console.log(response.data);
      setBdList(response.data);
    }
  )
  .catch(err => {
    setStateCon(false);
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
      "porta": porta,
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

const Banco = (event) => {
  setCampos(event.target.value);
};

const Gerar = async () => {
  setStateDown(true);
  api({
    method: 'POST',
    url: '/postgis-to-shape',
    responseType: 'blob',
    data: {
      "host": local,
      "porta": porta,
      "bd": table,
      "usuario": user,
      "senha": password,
      "tabela": campos,
    }
  })
    .then(response => {
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', campos+".zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setStateDown(false);
      alert("Arquivo gerado com sucesso!")
    })
    .catch(err => {
      setStateDown(false);
      console.log('deu ruim bb', err);
      alert("Não foi possível gerar o arquivo.\n" + err)
    });
}

  return (
    <>
      <Header />
      <Faq />
      
      <div className="main-container">

        <div className="post-step2-header">
          <p>1</p>
          <span> Conecte-se com o seu Banco de Dados.</span>
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
            <input type="text" autofocus='true' className="txtbox" id="local" onChange={event => setLocal(event.target.value)}/>
            <input type="number" className="txtbox" id="porta" onChange={event => setPorta(event.target.value)}/>
             
            <input type="text" className="txtbox" id="user" onChange={event => setUser(event.target.value)}/>
            <input type="password" className="txtbox" id="password" onChange={event => setPassword(event.target.value)}/>
          </form> 
        </form>

        <button type="button" onClick={bdConnect}>CONECTAR</button>   
        { stateCon== 1 ? < Loadingcon /> : null}
      
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

        <FormControl className={classes.text} >
        <select value={campos} onChange={Banco} className={classes.select}>
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
      <div align="center">
      { statDown == 1 ? < Loadingdown /> : null}   
      </div>    

        <Link /*to="/"*/ className="post-send-button" onClick={Gerar}>
          GERAR SHAPEFILE
        </Link>
      </div>
      <Footer/>
    </>
  );
}

export default Post;