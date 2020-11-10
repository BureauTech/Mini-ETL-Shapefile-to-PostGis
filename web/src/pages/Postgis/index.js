import React, { useContext, useEffect, useState, useRef } from 'react';
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
import UploadPost from '../../assets/img/upload-post.png';

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
const fileInputRef = useRef();
const modalImageRef = useRef();
const modalRef = useRef();
const progressRef = useRef();
const uploadRef = useRef();
const uploadModalRef = useRef();
const [selectedFiles, setSelectedFiles] = useState([]);
const [validFiles, setValidFiles] = useState([]);
const [unsupportedFiles, setUnsupportedFiles] = useState([]);
const [errorMessage, setErrorMessage] = useState('');
const [dbf, setDbf] = useState(0);
const [shp, setShp] = useState(0);
const [shx, setShx] = useState(0);
const [fileSHP, setFileSHP] = useState([""]);




useEffect(() => {
  let filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find(item => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
  }, []);
  setValidFiles([...filteredArr]);
  
}, [selectedFiles]);


const preventDefault = (e) => {
  e.preventDefault();
  // e.stopPropagation();
}

const dragOver = (e) => {
  preventDefault(e);
}

const dragEnter = (e) => {
  preventDefault(e);
}

const dragLeave = (e) => {
  preventDefault(e);
}

const fileDrop = (e) => {
  preventDefault(e);
  const files = e.dataTransfer.files;
  if (files.length) {
      handleFiles(files);
  }
}

const filesSelected = () => {
  if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
  }
}

const fileInputClicked = () => {
  fileInputRef.current.click();
}

const handleFiles = (files) => {
  for(let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
          setSelectedFiles(prevArray => [...prevArray, files[i]]);
          typeNecessary(files[i]);
      } else {
          files[i]['invalid'] = true;
          setSelectedFiles(prevArray => [...prevArray, files[i]]);
          setErrorMessage('Tipo de arquivo não permitido.');
          setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
      }
  }
}

const typeNecessary = (data) => {
const fileName = data.name;
if (fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) === 'shp'){
    setShp(1);
} else if (fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) === 'dbf') {
    setDbf(1);
} else if (fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) === 'shx'){
    setShx(1);
}
}

const validateFile = (data) => {
  const validTypes = ['cpg', 'dbf', 'prj', 'qix', 'shp', 'shx'];
  const fileName = data.name;
  if (validTypes.indexOf(fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)) === -1) {
      return false;
  }
  if (fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) === 'shp' ){
    setFileSHP(fileName)
  }

  return true;
}

//Remover arquivo
const removeFile = (name) => {
  const fileName = name;
  if (fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) === 'shp'){
      setShp(-1);
  } else if (fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) === 'dbf') {
      setDbf(-1);
  } else if (fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) === 'shx'){
      setShx(-1);
  }
  const index = validFiles.findIndex(e => e.name === name);
  const index2 = selectedFiles.findIndex(e => e.name === name);
  const index3 = unsupportedFiles.findIndex(e => e.name === name);
  validFiles.splice(index, 1);
  selectedFiles.splice(index2, 1);
  setValidFiles([...validFiles]);
  setSelectedFiles([...selectedFiles]);
  if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
  }
  if (name.substring(name.lastIndexOf('.') + 1, name.length) === 'shp' ){
    setFileSHP(null)
  }      
}

const openImageModal = (file) => {
  const reader = new FileReader();
  modalRef.current.style.display = "block";
  reader.readAsDataURL(file);
  reader.onload = function(e) {
      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
  }
}

const closeModal = () => {
  modalRef.current.style.display = "none";
  modalImageRef.current.style.backgroundImage = 'none';
}

//Upload de arquivo
const uploadFiles = async () => {
  uploadModalRef.current.style.display = 'block';
  uploadRef.current.innerHTML = 'Enviado o(s) arquivo(s)...';
  for (let i = 0; i < validFiles.length; i++) {
      const formData = new FormData();
      formData.append('file', validFiles[i]);
      
      api.post("/upload", formData, {
          onUploadProgress: (progressEvent) => {
              const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
              progressRef.current.innerHTML = `${uploadPercentage}%`;
              progressRef.current.style.width = `${uploadPercentage}%`;

              if (uploadPercentage === 100) {
                  uploadRef.current.innerHTML = 'Envio do(s) arquivo(s).';
                  validFiles.length = 0;
                  setValidFiles([...validFiles]);
                  setSelectedFiles([...validFiles]);
                  setUnsupportedFiles([...validFiles]);
              }
          },
      })
      .catch(() => {
          uploadRef.current.innerHTML = `<span class="error">Erro no envio do(s) arquivo(s)</span>`;
          progressRef.current.style.backgroundColor = 'red';
      })
  }
}

const closeUploadModal = () => {
  uploadModalRef.current.style.display = 'none';
}



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

const textLocal = useRef(null);

function handleClick() {
  uploadFiles();
  textLocal.current.focus();
  
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
            <input type="text" className="txtbox" ref = {textLocal} id="local" onChange={event => setLocal(event.target.value)}/>
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

              <div className="drop-container2"
                  onDragOver={dragOver}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDrop={fileDrop}
                  onClick={fileInputClicked}
              >
                  <div className="drop-message" >
                      <div className="upload-icon" width="100%">
                      <h1>Clique ou arraste o(s) arquivo(s) aqui para fazer o upload.</h1>
                      </div>
                      <img src={UploadPost} alt="Shape-Button" width="80%"/>
                      <div className="upload-icon" width="100%">
                      <h2 className="drop-message"><i>Arquivos suportados: .cpg .dbf .prj .qix .shp .shx</i></h2>
                      </div>
                  </div>                   
                  <input
                      ref={fileInputRef}
                      className="file-input"
                      type="file"
                      multiple
                      onChange={filesSelected}
                  />
              </div>
              {unsupportedFiles.length === 0 && validFiles.length && dbf > 0 && shp > 0  && shx > 0 ? <button className="file-upload-btn" onClick={() => handleClick()}>Carregar Arquivo(s)</button> : ''} 
              {unsupportedFiles.length ? <p> Por favor, remova o(s) arquivo(s) não suportado(s). </p> : ''}
              <div className="file-display-container">
              
              {
                      validFiles.map((data, i) => 
                          <div className="file-status-bar" key={i}>
                              <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}>
                                  <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                              </div>
                              <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
                          </div>
                      )
                  }

              </div>

          </div>
          <div className="overlay"></div>
          <div className="modal" ref={modalRef}>
              <span className="close" onClick={(() => closeModal())}>X</span>
              <div className="modal-image" ref={modalImageRef}></div>
          </div>
          <div className="upload-modal" ref={uploadModalRef}>
              <div className="close" onClick={(() => closeUploadModal())}>X</div>
              <div className="progress-container">
                  <span ref={uploadRef}></span>
                  <div className="progress">
                      <div className="progress-bar" ref={progressRef}></div>
                  </div>
              </div>
          </div>




        <div className="post-step3-header">
          <p>3</p>
          <span>Selecione os campos para a realização do de-para.</span>
        </div>
          
        <div className="post-step3-de-para">        
          <h1>DE-PARA</h1>

          <div className="post-step3-selection">
          <form className="columns">
              {inputFillPARA()}
            </form>

            <form className="columns">
            {inputFillDE()}
            </form>
          </div>      
        </div>

        <Link to="/" className="post-send-button">
          GERAR SHAPEFILE
        </Link>
      </div>

      <Footer/>
    </>
  );
}

export default Post;