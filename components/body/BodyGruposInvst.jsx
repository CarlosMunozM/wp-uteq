import { Accordion } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import React, { useState, useEffect, useMemo } from "react";
import { WS_LIST_RESEARCH_GROUP_BY_FACULTY } from 'config';

export { BodyGruposInvst };

function ItemRowTable(props) {
    return (<tr>
        <td>{props.nombre.trim()}</td>
        <td className="text-center">
            <a href={`/${props.language}/investigacion/grupo/${props.url.trim()}`} className="btn-table" data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? "Ir a la página web del Grupo de Investigación" :
                (props.language === "en" ? "Go to the website of the Research Group" : "Ir para o website do Grupo de Investigação")}>
                <i className="fa fa-globe fa-2x" aria-hidden="true"></i>
            </a>
        </td>
    </tr>)
}

const listRowsTable = (dataItems, language) => {
    return (
        dataItems.map((item) => {
            return (<ItemRowTable key={uuidv4()} nombre={language === "es" ? item.giNombre : (language === "en" ? item.giNombreEn : item.giNombrePt)} url={item.giUrlParcial} language={language} />);
        })
    )
}

function ItemTabGroupRes(props) {
    return (
        <Accordion.Item eventKey={props.index} key={uuidv4()}>
            <Accordion.Header>{props.faculty.trim()}</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12 w-100">
                    <table id="tbl-sublines" className="display table-static w-100">
                        <thead>
                            <tr>
                                <th>{props.language === "en" ? "Group" : "Grupo"}</th>
                                <th className="text-center">...</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listRowsTable(props.data_gps.filter(dataFaculty => (props.language === "es" ? dataFaculty.giFacultad.dpNombre.trim() : (props.language === "en" ? dataFaculty.giFacultad.dpNombreEn.trim() : dataFaculty.giFacultad.dpNombrePt.trim())) == props.faculty.trim()), props.language)}
                        </tbody>
                    </table>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

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

function BodyGruposInvst(data) {

    const [datatbl, setDatatbl] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(WS_LIST_RESEARCH_GROUP_BY_FACULTY);
            setDatatbl((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);

    const listTabsGroupsRes = (dataItems, dataGroups) => {
        return (
            dataItems.map((faculty, index) => {
                return (
                    <ItemTabGroupRes key={uuidv4()} index={index} faculty={faculty} data_gps={dataGroups} language={data.language} />
                )
            })
        )
    }

    function getPanelsFaculties(data_gps) {
        if (data_gps.length > 0) {
            const listFaculties = [...new Set(data_gps.sort((a, b) => (data.language === "es" ? (a.giFacultad.dpNombre > b.giFacultad.dpNombre) :
                (data.language === "en" ? (a.giFacultad.dpNombreEn > b.giFacultad.dpNombreEn) : (a.giFacultad.dpNombrePt > b.giFacultad.dpNombrePt))) ? 1 : -1)
                .map(item => (data.language === "es" ? item.giFacultad.dpNombre.trim() : (data.language === "en" ? item.giFacultad.dpNombreEn.trim() : item.giFacultad.dpNombrePt.trim()))))];
            return (
                <Accordion defaultActiveKey={0}>
                    {listTabsGroupsRes(listFaculties, data_gps)}
                </Accordion>
            );

        }
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{data.language === "es" ? "Grupos de Investigación" : (data.language === "en" ? "Research Groups" : "Grupos de Investigação")}</h2>
            <div className="col-md-12 w-100">
                {
                    getPanelsFaculties(datatbl)
                }
            </div>
        </div>
    </>);
}