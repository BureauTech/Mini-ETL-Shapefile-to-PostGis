import React, { useContext, useState, useEffect, useRef } from 'react'; //3 hooks de estados 

//Context
import AppContext from '../../context';

//Components
import Header from '../../components/Header';
import Faq from '../../components/Faq';
import Footer from '../../components/Footer';
import api from '../../services/api';
import postStep1 from '../../assets/img/notebook-background.png';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {Link} from 'react-router-dom'; //link da biblioteca, n tá pegando nenhum caminho
import UploadShape from '../../assets/img/upload-shape.png';


//Styles
import "./styles.css"; 

//Styles do Connection
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

const Shape = () => {
  //Parâmetros do banco de dados
  const [local, setLocal] = useState();
  const [porta, setPorta] = useState();
  const [table, setTable] = useState(''); 
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [bdList2, setBdList] = useState('');
  const {shapeReturn, setShapeReturn} = useContext(AppContext); 
  const [campos, setCampos] = React.useState(0); 
  const classes = useStyles();
  const [fieldsde, setFieldsDe] = useState([]);
  const [fieldspara, setFieldsPara] = useState([]);
  const [dbf, setDbf] = useState(0);
  const [shp, setShp] = useState(0);
  const [shx, setShx] = useState(0);
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

  const handleChange = (e) => {
    setTable(e.target.value);
    bdList(e.target.value); //Para isso é só passar a tabela selecionada como um parâmetro para a próxima função.
  }

  //Função de conexão ao banco de dados
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
          "porta": porta,
          "bd": null,
          "usuario": user,
          "senha": password
        }
      })
        .then(response => {
          setBdList(response.data);
        }
        )
        .catch(err => {
          console.log('deu ruim', err);
        });
    }
  }
  
  //Função de seleção da tabela do banco de dados
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
        setShapeReturn(response.data); 
      }
    )
    .catch(err => {
      console.log('deu ruim bb', err); 
    });
  } 
  
  //Retorno das colunas das tabelas no PARA
  const returnPARA = async (field) => {
    await api({  
      method: 'post',
      url: '/fields/' + field,
      data: {
        "host": local,
        "porta": porta,
        "bd": table, 
        "usuario": user,
        "senha": password
      }
    })
    .then(response => {
      setFieldsPara(response.data);
      }
    )
    .catch(err => {
      console.log('deu ruim bb', err); 
    });
  }
  
  const Banco = (event) => {
    setCampos(event.target.value);
  };

  const dadosPARA = (event) => {
    returnPARA(event.target.value);
  }

  //Retorno dos atributos dos arquivos no DE
  const returnAtributos = () => {
    api({
      method: 'get',
      url: '/attributes/'+ fileSHP,
    })
    .then(response => { 
      setFieldsDe(response.data);
    }
  )
  .catch(err => {
    console.log('deu ruim', err); 
  });
}

  //Função para realizar a carga do DE-PARA
  const carga = () => {
    api({  
      method: 'post',
      url: '/shape-to-postgis',
      data: { 

      }
    })
    .then(response => { 
        setShapeReturn(response.data); 
      }
    )
    .catch(err => {
      console.log('deu ruim bb', err); 
    });
  }
 

  const itensListDe = fieldsde.map((valor) =>
    <label className="fields">
      {valor}
    </label>
  );

  //função para pegar os atributos do arquivos
  function inputFillDE() { 
    if (fieldsde.length > 0) {
      return (
        itensListDe
      )
    }
    else {
      return (
        <>
          <h1>Não há itens.</h1>
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
          <h1>Não há itens.</h1>
        </>
      )
    }
  }

  return (
    <>
      <Header />
      <Faq />
      
      <div className="main-container"> 

        <div className="shape-step3-header">
          <p>1</p>
          <span> Carregue seus arquivos SHAPEFILE para seu banco de dados POSTGRESQL com segurança.</span>
        </div>

          <div className="container">
              <div className="drop-container"
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
                      <img src={UploadShape} alt="Shape-Button" width="80%"/>
                      <div className="upload-icon" width="100%">
                      <h2><i>Arquivos suportados: .cpg .dbf .prj .qix .shp .shx</i></h2>
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
              {unsupportedFiles.length === 0 && validFiles.length && dbf > 0 && shp > 0  && shx > 0 ? <button className="file-upload-btn" onClick={() => uploadFiles()}>Carregar Arquivo(s)</button> : ''} 
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
      

        <div className="shape-step1-header">
          <p>2</p>
          <span>
          Conecte-se com o seu Banco de Dados.</span>
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
            <input type="text" className="txtbox" id="local" onChange={event => setLocal(event.target.value)} />
            <input type="number" className="txtbox" id="porta" onChange={event => setPorta(event.target.value)}/>
             
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

        <FormControl className={classes.text} onChange={dadosPARA}>
          <select value={campos} onChange={Banco} onClick={returnAtributos} className={classes.select}>
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

        <div className="shape-step4-header">
          <p>3</p>
          <span>Selecione os campos para a realização do de-para.</span>
        </div>
        
        <div className="shape-step4-de-para">
          <h1>DE-PARA</h1>

          <div className="shape-step4-selection">
            <form className="columns">
              {inputFillDE()}
            </form>

            <form className="columns">

              {inputFillPARA()}
            </form>
          </div>
        </div>

          <div>
        <Link to="/" className="shape-send-button" onClick={carga}>
          REALIZAR CARGA
        </Link>
      </div>          

        </div>

        <Footer/>
      </>
  );
}

export default Shape;