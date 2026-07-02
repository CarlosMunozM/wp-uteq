import axios from "axios";
import { WS_LIST_DATA_AUTHORITIES_AREA_UBU, PHOTOS_FOLDER } from 'config';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


export { ListBox };

function ItemAuthority(props) {
    return (
        <div className="col-md-4 d-flex justify-content-center align-items-center mx-auto">
            <div className="card-tp">
                <img style={{ borderRadius: "0px" }} src={(props.urlfoto !== null && props.urlfoto !== "" && props.urlfoto !== "#") ? (PHOTOS_FOLDER + props.urlfoto.trim()) : (props.genero === "M" ? (PHOTOS_FOLDER + "img-aut-masc-default.jpg") : (PHOTOS_FOLDER + "img-aut-fem-default.jpg"))} className="card-img-top" alt={props.nombres.trim() + ' ' + props.apellidos.trim()} />
                <h3 className="card-subtitle-aut-1 mb-2 g-0">{(props.genero === "M" ? props.cargomasc.trim() : props.cargofem.trim())}</h3>
                <div className="card-body-aut-ubu">
                    <h3 className="card-title">{props.nombres.trim() + ' ' + props.apellidos.trim()}</h3>
                    <p className="card-text">{`Telf.: (+593) ${props.telefono.trim()} Ext. ${props.extension.trim()}`} <br />{`Correo: ${props.correoelec.trim()}`}</p>
                </div>
            </div>
        </div>
    )
}

async function make_request_ws(path_url) {
    var listTemp=null;
    const https = require('https');
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        await axios.get(path_url, { httpsAgent: agent }).then(function (response) {
            listTemp = response;
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log();
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            listTemp = null;
        })
    } catch (error) {
        console.log(error.message);
        listTemp = null;
    }

    return (listTemp);
}

function ListBox(cod_area) {

    const [listAuthoritiesArea, setListAuthoritiesArea] = useState([]);

    useEffect(() => {
        (async () => {
            const listAuth = await make_request_ws(`${WS_LIST_DATA_AUTHORITIES_AREA_UBU}${cod_area}`);
            setListAuthoritiesArea(listAuth.data);
        })();
    }, []);

    const listItemsAuthorities = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (<ItemAuthority key={uuidv4()} urlfoto={item.auUrlFoto} genero={item.auGenero} nombres={item.auNombres} apellidos={item.auApellidos} cargomasc={item.auObjCargo.dmDescripcion}
                    cargofem={item.auObjCargo.dmRespuesta} telefono={item.auTelefono} extension={item.auExtensTelf} correoelec={item.auCorreoElect} />);
            })
        )
    }

    function getListSortInformationBox(listInf) {
        return (<>
            <div className="container mx-auto mt-4 g-0">
                <div className="row">
                    {listItemsAuthorities(listInf)}
                </div>
            </div>
        </>);
    }

    return (<>{getListSortInformationBox(listAuthoritiesArea)}</>);
}


