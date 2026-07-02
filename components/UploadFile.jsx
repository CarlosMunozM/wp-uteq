import { useDropzone } from 'react-dropzone';
import React, { useState, useRef, useMemo, useCallback } from 'react';

export { UploadFile };

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'rgba(236,185,50,1)',
    borderStyle: 'dashed',
    backgroundColor: '#EFEEEE',
    color: '#2D2D2D',
    transition: 'border .3s ease-in-out',
    fontFamily: 'open-sans-light',
    fontSize: '14px',
    height: '70px'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function UploadFile(nombreCampo, requerido) {

    const [files, setFiles] = useState([]), maxSize = 10485760;

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => (
            <li key={file.path} className="pnl-list-files-docs">
                Documento: {file.path} - Tamaño: {Math.round(((1 * file.size) / 1048576) * 100) / 100} MB
            </li>
        )));
    }, []);
    const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop, accept: 'application/pdf', maxFiles: 1, maxSize: maxSize, multiple: false });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (<>
        <div className="form-group col-sm-6 flex-column d-flex">
            <label className="form-control-label px-3" htmlFor="inp-cv">{nombreCampo}</label>
            <div className="mt-2" {...getRootProps({ style })}>
                <input {...getInputProps()} id="inp-cv" required={requerido} />
                <div>
                    {!isDragActive && "Arrastrar y soltar tu hoja de vida en formato pdf"}
                    {isDragActive && !isDragReject && "Soltar el archivo pdf"}
                    {isDragReject && "Tipo de archivo no aceptado"}
                </div>
            </div>
            {
                files.length > 0 && (<>
                    <ul className="ul-list-files-docs mt-2">{files}</ul>
                </>)
            }
        </div>
    </>);
}