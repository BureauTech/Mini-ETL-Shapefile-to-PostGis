import React, { useRef, useState, useEffect } from 'react';
import api from '../../services/api';
import axios from 'axios';
import UploadShape from '../../assets/img/upload-shape.png';

import './DropZone.css';

const Dropzone = () => {
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
            } else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage('Tipo de arquivo não permitido.');
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
        }
    }

    const validateFile = (data) => {
        const validTypes = ['cpg', 'dbf', 'prj', 'qix', 'shp', 'shx'];
        const fileName = data.name;
        if (validTypes.indexOf(fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)) === -1) {
            return false;
        }

        return true;
    }

    const fileSize = (size) => {
        if (size === 0) {
          return '0 Bytes';
        }
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (name) => {
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

    return (
        <>
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
                {unsupportedFiles.length === 0 && validFiles.length ? <button className="file-upload-btn" onClick={() => uploadFiles()}>Carregar Arquivo(s)</button> : ''} 
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
        </>
    );
}
export default Dropzone;