import React, { useContext, useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';

import shapeStep1 from '../../assets/img/shape-post-new.png';

import {DropContainer, UploadMessage} from "./styles";

import api from '../../services/api';
function UploadShape() {

    const [file, setFile] = useState();

    const carregar = (() => {
        api({
          method: 'post',
          url: '/upload', 
          data: {
              "file": file
          } 
        })
        console.log('olha o file aqui: ' + file)
      })
    
    return (
        <>
      <Dropzone accept="multipart/form-data"  onDropAccepted={event => setFile(event.target.value)}>

        {({getRootProps, getInputProps, isDragActive, isDragReject}) =>  (
          <DropContainer

            {... getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
            >
              <input {... getInputProps()} />
              <img src={shapeStep1} alt="Shape-Button" width="100%"/>
            </DropContainer>
        )}

      </Dropzone>
      <div>
        <button type="button" onClick={carregar} enctype="multipart/form-data">
            CARREGAR
        </button>
        </div>
        </>
    );
    }
export default UploadShape;