import DOMPurify from 'isomorphic-dompurify';
import { REND_CTAS_DOCS_FOLDER, WS_SORT_LIST_FILES_RC_UNIV_BY_TYPE } from 'config';
import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export { BodyRendicionCtas };

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
	const regEx = /^http/;

    return (<tr>
        <td>{props.literal.trim()}</td>
        <td className="text-center">
            {
                props.resource === 'DOCXS' ? (<>
                    <a href={`${REND_CTAS_DOCS_FOLDER}${props.year}/${props.urlpdf}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" 
                    title={props.language === "es" ? "Descargar documento pdf" : (props.language === "en" ? "Download pdf document" : "Descarregar documento pdf")}>
                        <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
                    </a>
                </>) : (<>
                    <a href={`${!regEx.test(props.urlpw) ? ("/" + props.language) : ""}${props.urlpw}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" 
                    title={props.language === "es" ? "Enlace a página web" : (props.language === "en" ? "Link to website" : "Ligação ao website")}>
                        <i className="fa fa-link fa-2x" aria-hidden="true"></i>
                    </a>
                </>)
            }
        </td>
    </tr>)
}

const listRowsTable = (dataItems, year, language) => {
    return (
        dataItems.map((item) => {
            return (<ItemRowTable key={uuidv4()} literal={language==="es"?item.arDescripcion:(language==="en"?item.arDescripcionEn:item.arDescripcionPt)} urlpdf={item.arUrlDocumento} year={year} resource={item.arTipoRecurso} urlpw={item.arUrlPW} language={language} />);
        })
    )
}

function ItemTabPhases(props) {
    return (
        <Accordion.Item eventKey={props.index} key={uuidv4()}>
            <Accordion.Header>{props.phase.trim()}</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12 w-100">
                    {
                        props.literals.length > 0 && (
                            <table id="tbl-sublines" className="display table-static w-100">
                                <thead>
                                    <tr>
                                        <th>{props.language==="es"?"Descripción":(props.language==="en"?"Description":"Descrição")}</th>
                                        <th className="text-center">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listRowsTable(props.literals, props.year, props.language)}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

function BodyRendicionCtas(data) {

    const [datatbl, setDatatbl] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_SORT_LIST_FILES_RC_UNIV_BY_TYPE}RENCT`);
            setDatatbl((result.data !== "" && result.data !== "") ? result.data : []);
        })();
    }, []);

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const renderTextInfo = (dataInfoInst) => {
        return (<>
            {
                dataInfoInst.data8.pwDescripcion !== null && (<>
                    <div className="row" dangerouslySetInnerHTML={sanitizedData(data.language === "es" ? (dataInfoInst.data8.pwDescripcion !== null ? dataInfoInst.data8.pwDescripcion.trim() : "") : (data.language === "en" ? (dataInfoInst.data8.pwDescripcionEn !== null ? dataInfoInst.data8.pwDescripcionEn.trim() : "") : (dataInfoInst.data8.pwDescripcionPt !== null ? dataInfoInst.data8.pwDescripcionPt.trim() : "")))}></div>
                </>)
            }
        </>);
    }

    const listTabsPhases = (dataPhases, dataLiterals, year) => {
        return (
            dataPhases.map((element, index) => {
                return (
                    <ItemTabPhases key={uuidv4()} index={index} phase={element}
                        literals={dataLiterals.filter(itemdocx => ((data.language === "es" ? itemdocx.arFase.trim() : (data.language === "en" ? itemdocx.arFaseEn.trim() : itemdocx.arFasePt.trim())) === element)).sort((a, b) => (a.arOrdenDocs - b.arOrdenDocs))} year={year} language={data.language} />
                )
            })
        )
    }

    function designListByYear(dataIn, year) {
        let phases = []
        if (dataIn.length > 0) {
            phases = [...new Set(dataIn.filter(itemdocx => (itemdocx.arAnio === year)).map(item => (data.language === "es" ? item.arFase.trim() : (data.language === "en" ? item.arFaseEn.trim() : item.arFasePt.trim()))))].sort();

            return (
                <Accordion defaultActiveKey={0}>
                    {
                        listTabsPhases(phases, dataIn.filter(itemdocx => (itemdocx.arAnio === year)), year)
                    }
                </Accordion>
            )
        }
    }

    const renderListYearDocs = (dataws) => {
        var rows = [];

        for (var i = new Date().getFullYear() - 1; i >= 2015; i--) {
            rows.push(i);
        }

        return (<Accordion defaultActiveKey={new Date().getFullYear() - 1}>
            {rows.map(function (j) {
                return (dataws.filter(itemdocx => itemdocx.arAnio === j).length > 0 &&
                    <Accordion.Item eventKey={j} key={j}>
                        <Accordion.Header>{`${data.language === "es" ? "Rendición de cuentas año" : (data.language === "en" ? "Accountability year" : "Ano de prestação de contas")} ${j}`}</Accordion.Header>
                        <Accordion.Body>
                            {(dataws.filter(itemdocx => itemdocx.arAnio === j)[0].arUrlPW !== null && dataws.filter(itemdocx => itemdocx.arAnio === j)[0].arUrlPW !== '#') && (<><div className="row justify-content-center pt-2">
                                <div className="col-sm-6 col-lg-12 text-center">
                                    <a href={`/${data.language}${dataws.filter(itemdocx => itemdocx.arAnio === j)[0].arUrlPW}`} target="_blank" className="btn-tp mr-2" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ir a la página web del informe" : (data.language === "en" ? "Go to the report website" : "Ir para o website do relatório")}>
                                        <i className="fa fa-globe" aria-hidden="true"></i> {data.language === "es" ? "Ver informe" : (data.language === "en" ? "View report" : "Ver relatório")}</a>
                                </div>
                            </div><br /></>)}
                            <div className="col-md-12 w-100 mt-2">
                                {designListByYear(dataws, j)}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                );

            })}
        </Accordion>);
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{data.language === "es" ? "Rendición de Cuentas" : (data.language === "en" ? "Accountability" : "Prestação de contas")}</h2>
            {renderTextInfo(data)}<br />
            {renderListYearDocs(datatbl)}
        </div>
    </>);
}