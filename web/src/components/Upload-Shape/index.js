import React from 'react';
import Dropzone from 'react-dropzone';

import shapeStep1 from '../../assets/img/shape-post-new.png';

import {DropContainer, UploadMessage} from "./styles";

function UploadShape() {
    return (
      <Dropzone accept="multipart/form-data" onDropAccepted={() => {}}>
        {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
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
    );
}

export default UploadShape;