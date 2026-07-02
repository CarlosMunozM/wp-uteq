import DOMPurify from 'isomorphic-dompurify';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { WS_INFORMATION_OF_GROUP_BY_CODE } from 'config';


export { BodyGrupoInvst };

async function make_request_ws(path_url) {
    var listTemp = null;
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

function ItemRowTable(props) {
    return (
        <tr>
            <td className="text-center">{props.nombres.trim()}</td>
            <td className="text-center">{props.tipointg}</td>
            <td className="text-center">{props.correo.trim()}</td>
            <td className="text-center">
                {
                    (props.perfilacad !== null && props.perfilacad !== "") && (<>
                        <a href={props.perfilacad.trim()} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={props.language==="es"?"Ir al perfil de Google Académico":(props.language==="en"?"Go to Google Scholar profile":"Ir ao perfil do Google Scholar")}>
                            <i className="fa fa-google fa-2x" aria-hidden="true"></i>
                        </a>
                    </>)
                }
            </td>
        </tr>
    )
}

function BodyGrupoInvst(data) {

    const [datatbl, setDatatbl] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_INFORMATION_OF_GROUP_BY_CODE}${data.urlgroup.trim()}`);
            setDatatbl((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    const listRowsTables = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (<ItemRowTable key={uuidv4()} nombres={item.itNombres} tipointg={data.language==="es"?(item.itTipoIntg==="DIRT"?"Coordinador":"Integrante"):(data.language==="en"?(item.itTipoIntg==="DIRT"?"Coordinator":"Member"):(item.itTipoIntg==="DIRT"?"Coordenador":"Membro"))} 
                correo={item.itCorreoInst} perfilacad={item.itPerfilAcad} language={data.language} />);
            })
        )
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{(data.datagp !== null && data.datagp !== "") ? (data.language === "es" ? data.datagp[0].itGrupoInv.giNombre.trim() :
                (data.language === "en" ? data.datagp[0].itGrupoInv.giNombreEn.trim() : data.datagp[0].itGrupoInv.giNombrePt.trim())) : "---"}</h2>
            <div className="col-md-12 w-100">
                {
                    (data.datagp !== null && data.datagp !== "") && (<>
                        <h2 className="msg-pnl-search text-right mb-2">{data.language === "es" ? "Facultad" : (data.language === "en" ? "Faculty" : "Faculdade")}</h2>
                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? data.datagp[0].itGrupoInv.giFacultad.dpNombre.trim() :
                            (data.language === "en" ? data.datagp[0].itGrupoInv.giFacultad.dpNombreEn.trim() : data.datagp[0].itGrupoInv.giFacultad.dpNombrePt.trim())}</p></div>
                        {
                            data.language === "es" ? (
                                (data.datagp[0].itGrupoInv.giMision !== null && data.datagp[0].itGrupoInv.giMision !== '') ? (<>
                                    <h2 className="msg-pnl-search text-right mb-2">Misión</h2>
                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.datagp[0].itGrupoInv.giMision.trim())}></div>
                                </>) : ""
                            ) : (data.language === "en" ? (
                                (data.datagp[0].itGrupoInv.giMisionEn !== null && data.datagp[0].itGrupoInv.giMisionEn !== '') ? (<>
                                    <h2 className="msg-pnl-search text-right mb-2">Mission</h2>
                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.datagp[0].itGrupoInv.giMisionEn.trim())}></div>
                                </>) : ""
                            ) : (
                                (data.datagp[0].itGrupoInv.giMisionPt !== null && data.datagp[0].itGrupoInv.giMisionPt !== '') ? (<>
                                    <h2 className="msg-pnl-search text-right mb-2">Missão</h2>
                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.datagp[0].itGrupoInv.giMisionPt.trim())}></div>
                                </>) : ""
                            ))
                        }
                        {
                            data.language === "es" ? (
                                (data.datagp[0].itGrupoInv.giObjetivos !== null && data.datagp[0].itGrupoInv.giObjetivos !== '') ? (<>
                                    <h2 className="msg-pnl-search text-right mb-2">Objetivos</h2>
                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.datagp[0].itGrupoInv.giObjetivos.trim())}></div>
                                </>) : ""
                            ) : (data.language === "en" ? (
                                (data.datagp[0].itGrupoInv.giObjetivosEn !== null && data.datagp[0].itGrupoInv.giObjetivosEn !== '') ? (<>
                                    <h2 className="msg-pnl-search text-right mb-2">Objectives</h2>
                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.datagp[0].itGrupoInv.giObjetivosEn.trim())}></div>
                                </>) : ""
                            ) : (
                                (data.datagp[0].itGrupoInv.giObjetivosPt !== null && data.datagp[0].itGrupoInv.giObjetivosPt !== '') ? (<>
                                    <h2 className="msg-pnl-search text-right mb-2">Objectivos</h2>
                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.datagp[0].itGrupoInv.giObjetivosPt.trim())}></div>
                                </>) : ""
                            ))
                        }
                    </>)
                }
                {
                    datatbl.length > 0 && (<>
                        <h2 className="msg-pnl-search text-right mb-3">{data.language==="es"?"Integrantes":(data.language==="en"?"Members":"Membros")}</h2>
                        <div className="col-md-12 w-100">
                            <table id="tbl-sublines" className="display table-static w-100">
                                <thead>
                                    <tr>
                                        <th className="text-center">{data.language==="es"?"Nombre completo":(data.language==="en"?"Full name":"Nome completo")}</th>
                                        <th className="text-center">{data.language==="es"?"Rol":(data.language==="en"?"Role":"Papel")}</th>
                                        <th className="text-center">{data.language==="es"?"Correo electrónico":(data.language==="en"?"E-mail address":"Endereço de correio electrónico")}</th>
                                        <th className="text-center">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listRowsTables(datatbl.sort((a, b) => (a.itTipoIntg > b.itTipoIntg) ? 1 : -1))}
                                </tbody>
                            </table>
                        </div>
                    </>)
                }
            </div>
        </div>
    </>);

}