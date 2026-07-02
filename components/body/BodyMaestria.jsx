import { Tabs, Tab, SSRProvider } from "react-bootstrap";
import DOMPurify from 'isomorphic-dompurify';
import { CAREERS_MSC_BROC_IMG_FOLDER, CAREERS_MSC_BROC_DOCS_FOLDER, WS_INFORMATION_DEPARTAMENT, PHOTOS_FOLDER,
       MASTER_PROMOTION_IMGS_FOLDER, MASTER_PROMOTION_DOCS_FOLDER, MASTER_ACADEMIC_IMGS_FOLDER,} from 'config';
import { FormInscripcion } from "components/forms";
import React, { useState, useEffect } from "react";
import * as htmlToImage from 'html-to-image';
import axios from 'axios';
import { Badge } from 'react-bootstrap';

export { BodyMaestria };

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

function BodyMaestria(data) {

    const [datadept, setDatadept] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}37823e40-8900-11ec-b5cf-244bfe557d55`);
            setDatadept((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const style_img = {
        width: "100%",
        height: "100%"
    };

    function getTitlesByAuthority(dataTitle, language) {
        var titles = '';
        if (dataTitle.length > 0) {
            dataTitle.map((item) => (
                titles += (titles, (language==="es"?item.taTituloRec.trim():(language==="en"?item.taTituloRecEn.trim():item.taTituloRecPt.trim())) + ". ")
            ));
        }
        return titles.trim();
    }

	const handleDownloadClickImage = (event, param, careerName) => {
        var node = document.getElementById(param);

        htmlToImage.toBlob(node, { quality: 1, pixelRatio: 2 })
            .then(function (blob) {
                window.saveAs(blob, `Malla-académica-${careerName}.png`);
            });
    };

    return (<>
        <SSRProvider>
            <div className="row g-0">
                <div className="row g-0">
                    <h2 className="title-cont-page text-center mt-2">{(data.infocar !== null && data.infocar !== "") ? (data.language === "es" ? data.infocar.crNombre.trim() : (data.language === "en" ? data.infocar.crNombreEn.trim() : data.infocar.crNombrePt.trim())) : "---"}</h2>
                    <div className="col-md-12 g-0 mt-2">
                        <Tabs defaultActiveKey="tab0" id="tab-info">
                            <Tab eventKey="tab0" title="Información">
                                <div className="container-fluid g-0">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {
                                                (data.infocar !== null && data.infocar !== "") ? (
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData((data.infocar.crAprobCES !== null ? (`<h2 class="msg-pnl-search text-right">
                                                    ${data.infocar.crAprobCES.replace("Resolución CES", (data.language === "es" ? "Resolución CES" : (data.language === "en" ? "CES Resolution" : "Resolução do CES")))}</h2>`) : '') +
                                                        (data.language === "es" ? ((data.infocar.crPerfilProf !== null && data.infocar.crPerfilProf !== "") ? data.infocar.crPerfilProf : '') :
                                                            (data.language === "en" ? ((data.infocar.crPerfilProfEn !== null && data.infocar.crPerfilProfEn !== "") ? data.infocar.crPerfilProfEn : '') :
                                                                ((data.infocar.crPerfilProfPt !== null && data.infocar.crPerfilProfPt !== "") ? data.infocar.crPerfilProfPt : ''))) +
                                                        (data.language === "es" ? (
                                                            ((data.infocar.crObjetivos !== null && data.infocar.crObjetivos !== "") ? data.infocar.crObjetivos : '')
                                                        ) : (data.language === "en" ? (
                                                            ((data.infocar.crObjetivosEn !== null && data.infocar.crObjetivosEn !== "") ? data.infocar.crObjetivosEn : '')
                                                        ) : (
                                                            ((data.infocar.crObjetivosPt !== null && data.infocar.crObjetivosPt !== "") ? data.infocar.crObjetivosPt : '')
                                                        ))) + (data.language === "es" ? (((data.infocar.crHorarios !== null && data.infocar.crHorarios !== "") ? data.infocar.crHorarios : '')) :
                                                            (data.language === "en" ? (((data.infocar.crHorariosEn !== null && data.infocar.crHorariosEn !== "") ? data.infocar.crHorariosEn : '')) :
                                                                (((data.infocar.crHorariosPt !== null && data.infocar.crHorariosPt !== "") ? data.infocar.crHorariosPt : '')))))}>
                                                    </div>
                                                ) : ""
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        {
                                            (data.infocar !== null && data.infocar !== "") && (
                                                <div className="col-md-7" dangerouslySetInnerHTML={sanitizedData(data.language === "es" ? ((data.infocar.crModulos !== null && data.infocar.crModulos !== "") ? data.infocar.crModulos : '') :
                                                    (data.language === "en" ? ((data.infocar.crModulosEn !== null && data.infocar.crModulosEn !== "") ? data.infocar.crModulosEn : '') :
                                                        ((data.infocar.crModulosPt !== null && data.infocar.crModulosPt !== "") ? data.infocar.crModulosPt : '')))}></div>
                                            )
                                        }
                                        <div className="col-md-5">
                                            {
                                                (data.infocar.crUrlPdfBrochure !== null && data.infocar.crUrlPdfBrochure !== "") && (
                                                    <div className="row">
                                                        <div className="col-md-12 mx-auto">
                                                            <div className="work pnl-img-brochr mx-auto">
                                                                <a href={`${CAREERS_MSC_BROC_DOCS_FOLDER}${data.infocar.crUrlPdfBrochure.trim()}`} target="_blank" aria-label="link-brochure" style={{ textDecoration: "none" }}>
                                                                    <div className="img-n7 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${data.infocar.crUrlImgBrochure !== null ? (`${CAREERS_MSC_BROC_IMG_FOLDER}${data.infocar.crUrlImgBrochure}`) : ""})` }}></div>
                                                                    <div className="text-pn-servc text-center">{data.language === "es" ? "Ver Brochure" : (data.language === "en" ? "View Brochure" : "Ver Brochura")}</div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div><hr />
                                    <div className="row mt-3">
                                        {
                                            (data.infocar !== null && data.infocar !== "") && (
                                                <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData((data.language === "es" ? ((data.infocar.crReqIng !== null && data.infocar.crReqIng !== "") ? data.infocar.crReqIng : '') :
                                                    (data.language === "en" ? ((data.infocar.crReqIngEn !== null && data.infocar.crReqIngEn !== "") ? data.infocar.crReqIngEn : '') :
                                                        ((data.infocar.crReqIngPt !== null && data.infocar.crReqIngPt !== "") ? data.infocar.crReqIngPt : ''))) +
                                                    (data.language === "es" ? ((data.infocar.crInscripciones !== null && data.infocar.crInscripciones !== "") ? data.infocar.crInscripciones : '') :
                                                        (data.language === "en" ? ((data.infocar.crInscripcionesEn !== null && data.infocar.crInscripcionesEn !== "") ? data.infocar.crInscripcionesEn : '') :
                                                            ((data.infocar.crInscripcionesPt !== null && data.infocar.crInscripcionesPt !== "") ? data.infocar.crInscripcionesPt : ''))) +
                                                    (data.language === "es" ? ((data.infocar.crMatriculas !== null && data.infocar.crMatriculas !== "") ? data.infocar.crMatriculas : '') :
                                                        (data.language === "en" ? ((data.infocar.crMatriculasEn !== null && data.infocar.crMatriculasEn !== "") ? data.infocar.crMatriculasEn : '') :
                                                            ((data.infocar.crMatriculasPt !== null && data.infocar.crMatriculasPt !== "") ? data.infocar.crMatriculasPt : ''))) +
                                                    (data.language === "es" ? ((data.infocar.crInicioCls !== null && data.infocar.crInicioCls !== "") ? data.infocar.crInicioCls : '') :
                                                        (data.language === "en" ? ((data.infocar.crInicioClsEn !== null && data.infocar.crInicioClsEn !== "") ? data.infocar.crInicioClsEn : '') :
                                                            ((data.infocar.crInicioClsPt !== null && data.infocar.crInicioClsPt !== "") ? data.infocar.crInicioClsPt : ''))) +
                                                    (data.language === "es" ? ((data.infocar.crFormaPago !== null && data.infocar.crFormaPago !== "") ? data.infocar.crFormaPago : '') :
                                                        (data.language === "en" ? ((data.infocar.crFormaPagoEn !== null && data.infocar.crFormaPagoEn !== "") ? data.infocar.crFormaPagoEn : '') :
                                                            ((data.infocar.crFormaPagoPt !== null && data.infocar.crFormaPagoPt !== "") ? data.infocar.crFormaPagoPt : ''))) +
                                                    (data.infocar.crTitAcad !== null ? (`<h2 class="msg-pnl-search text-right">${data.language === "es" ? "Título académico a obtener" : (data.language === "en" ? "Academic degree to be obtained" : "Grau académico a obter")}:</h2><div class="col-md-12 w-100 text-center p-2 title-mn-third">${data.language === "es" ? data.infocar.crTitAcad.trim() : (data.language === "en" ? data.infocar.crTitAcadEn.trim() : data.infocar.crTitAcadPt.trim())}</div>`) : '') +
                                                    (data.infocar.crDurac !== null ? (`<p class="text-cont">${data.language === "es" ? data.infocar.crDurac.trim() : (data.language === "en" ? data.infocar.crDuracEn.trim() : data.infocar.crDuracPt.trim())}</p>`) : ''))}></div>
                                            )
                                        }
                                        {
                                            (data.authort !== "" && data.authort !== null) ? (<>
                                                <h2 className="msg-pnl-search text-right">{data.language === "es" ? "Correo electrónico" : (data.language === "en" ? "E-mail" : "Endereço electrónico")}</h2>
                                                {
                                                    (data.authort.auCorreoElect !== null && data.authort.auCorreoElect !== '') ? (<>
                                                        <a href={`mailto:${data.authort.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Comunicación vía correo electrónico" : (data.language === "en" ? "Communication via e-mail" : "Comunicação por correio electrónico")} style={{ textDecoration: 'none' }}>
                                                            <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>  {data.authort.auCorreoElect.trim()}</Badge>
                                                        </a>
                                                    </>) : (<></>)
                                                }
                                            </>) : (<></>)
                                        }
                                    </div>
                                </div>
                            </Tab>
                        	<Tab eventKey="tab3" title={data.language === "es" ? "Malla académica" : (data.language === "en" ? "Academic grid" : "Grelha académica")}>
                                {
                                    (data.infocar !== null && data.infocar !== '') && (<>
                                        {
                                            (data.infocar.crUrlImgMalla !== null && data.infocar.crUrlImgMalla !== '') && (<>
                                                <div className="row">
                                                    <p><span className="badge badge-download-web rounded-pill" onClick={event => handleDownloadClickImage(event, 'career-acadm', data.infocar.crUrlParcial.trim().toLowerCase())} style={{ cursor: "pointer" }}
                                                        data-toggle="tooltip" data-placement="bottom" title={`${data.language === "es" ? "Descargar malla académica de la carrera" : (data.language === "en" ? "Download academic syllabus" : "Descarregar o programa académico")} - 
                                                                        ${data.language === "es" ? data.infocar.crNombre.trim() : (data.language === "en" ? data.infocar.crNombreEn.trim() : data.infocar.crNombrePt.trim())}`}><i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>&nbsp;{data.language === "es" ? "Descargar" : (data.language === "en" ? "Download" : "Descarregar")}</span></p>
                                                </div>
                                                <div className="row g-0 mt-2">
                                                    <a href={`${MASTER_ACADEMIC_IMGS_FOLDER}${data.infocar.crUrlImgMalla.trim()}`} target="_blank"
                                                        className="link-text-local" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ver imagen" : (data.language === "en" ? "View image" : "Ver imagem")}>
                                                        <div className={`ratio ${(data.infocar.crProporcion !== null && data.infocar.crProporcion !== '') ? data.infocar.crProporcion.trim() : "ratio-4x3"}`}>
                                                            <img src={`${MASTER_ACADEMIC_IMGS_FOLDER}${data.infocar.crUrlImgMalla.trim()}`} id="career-acadm" alt={data.language === "es" ? "Malla académica" : (data.language === "en" ? "Academic grid" : "Grelha académica")} />
                                                        </div>
                                                    </a>
                                                </div>
                                            </>)
                                        }
                                    </>)
                                }
                            </Tab>
                            <Tab eventKey="tab4" title={data.language === "es" ? "Promoción" : (data.language === "en" ? "Promotion" : "Promoção")}>
                                {
                                    (data.infocar !== null && data.infocar !== '') && (<>
                                        {
                                            (data.infocar.crDocTriptc !== null && data.infocar.crDocTriptc !== '') && (<>
                                                <div className="row">
                                                    <p><a href={`${MASTER_PROMOTION_DOCS_FOLDER}${data.infocar.crDocTriptc.trim()}`} data-toggle="tooltip" data-placement="bottom"
                                                        title={`${data.language === "es" ? "Descargar tríptico de la carrera" : (data.language === "en" ? "Download degree career brochure" : "Descarregar a brochura do curso")} - ${data.language === "es" ? data.infocar.crNombre.trim() : (data.language === "en" ? data.infocar.crNombreEn.trim() : data.infocar.crNombrePt.trim())}`}>
                                                        <span className="badge badge-download-web rounded-pill"><i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>&nbsp;{data.language === "es" ? "Descargar" : (data.language === "en" ? "Download" : "Descarregar")}</span></a></p>
                                                </div>
                                            </>)
                                        }
                                        <div className="row g-0 mt-2">
                                            {
                                                (data.infocar.crUrlTriptc1 !== null && data.infocar.crUrlTriptc1 !== '') && (<>
                                                    <a href={`${MASTER_PROMOTION_IMGS_FOLDER}${data.infocar.crUrlTriptc1.trim()}`} target="_blank"
                                                        className="link-text-local" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ver diseño frontal del Tríptico" : (data.language === "en" ? "See front design of the Triptych" : "Ver desenho da frente do Tríptico")}>
                                                        <div className="ratio ratio-4x3">
                                                            <img src={`${MASTER_PROMOTION_IMGS_FOLDER}${data.infocar.crUrlTriptc1.trim()}`} id="career-acadm" alt={data.language === "es" ? "Imagen del Tríptico 1" : (data.language === "en" ? "Image of Triptych 1" : "Imagem do Tríptico 1")} />
                                                        </div>
                                                    </a>
                                                </>)
                                            }
                                            {
                                                (data.infocar.crUrlTriptc2 !== null && data.infocar.crUrlTriptc2 !== '') && (<>
                                                    <a href={`${MASTER_PROMOTION_IMGS_FOLDER}${data.infocar.crUrlTriptc2.trim()}`} target="_blank"
                                                        className="link-text-local mt-2" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ver diseño posterior del Tríptico" : (data.language === "en" ? "See back design of the Triptych" : "Ver o desenho do tríptico no verso")}>
                                                        <div className="ratio ratio-4x3">
                                                            <img src={`${MASTER_PROMOTION_IMGS_FOLDER}${data.infocar.crUrlTriptc2.trim()}`} id="career-acadm" alt={data.language === "es" ? "Imagen del Tríptico 2" : (data.language === "en" ? "Imagem do Tríptico 2" : "Image of Triptych 2")} />
                                                        </div>
                                                    </a>
                                                </>)
                                            }
                                        </div>
                                    </>)
                                }
                            </Tab>
                            <Tab eventKey="tab1" title={data.language === "en" ? "Contact" : "Contacto"}>
                                {
                                    (data.authort !== null && data.authort !== "") && (<>
                                        <div className="row pn-aut-data">
                                            <div className="col-md-12 mx-auto pnl-aut-info" style={{ border: "1px solid rgba(236,185,50,1)" }}>
                                                <div className="row pn-bd-dean">
                                                    <div className="col-md-6 g-0 pnl-aut-info-img" style={{ borderRight: "1px solid rgba(236,185,50,1)", borderBottom: "1px solid rgba(236,185,50,1)" }}>
                                                        <img src={(data.authort.auUrlFotoAlt !== null && data.authort.auUrlFotoAlt !== "" && data.authort.auUrlFotoAlt !== "#") ? (PHOTOS_FOLDER + data.authort.auUrlFotoAlt.trim()) : (data.authort.auGenero === "M" ? (PHOTOS_FOLDER + "img-aut-masc-default.jpg") : (PHOTOS_FOLDER + "img-aut-fem-default.jpg"))} className="card-img-top"
                                                            alt={data.language === "es" ? "Imagen 1" : (data.language === "en" ? "Image 1" : "Imagem 1")} style={style_img} />
                                                    </div>
                                                    <div className="col-md-6 pnl-text-dean">
                                                        <div className="row">
                                                            <div className="col-md-12 w-100 text-center p-2 title-mn-third">{data.authort.auNombres.trim() + ' ' + data.authort.auApellidos.trim() + ' - ' + (data.authort.auGenero === "M" ?
                                                                (data.language === "es" ? data.authort.auObjCargo.dmDescripcion.trim() : (data.language === "en" ? data.authort.auObjCargo.dmDescripcionEn.trim() : data.authort.auObjCargo.dmDescripcionPt.trim())) :
                                                                (data.language === "es" ? data.authort.auObjCargo.dmRespuesta.trim() : (data.language === "en" ? data.authort.auObjCargo.dmRespuestaEn.trim() : data.authort.auObjCargo.dmRespuestaPt.trim())))}</div>
                                                            {
                                                                data.authort.auListadoTitulosAcad.length > 0 && (<><h3 className="shp-title mt-3">{data.language === "es" ? "Títulos académicos" : (data.language === "en" ? "Academic qualifications" : "Habilitações académicas")}</h3><div className="col-md-12 w-100"><ul className="list-unord-titles ml-5">
                                                                    {getTitlesByAuthority(data.authort.auListadoTitulosAcad, data.language)}
                                                                </ul></div></>)
                                                            }
                                                            <h3 className="shp-title mt-2">{data.language === "en" ? "Contact" : "Contacto"}</h3>
                                                            <p className="shp-content">{(data.authort.auTelefono !== null && data.authort.auTelefono !== '') && `${data.language === "es" ? "Telf." : (data.language === "en" ? "Phone" : "Tel.")}: (+593) ${data.authort.auTelefono.trim()} Ext. ${data.authort.auExtensTelf.trim()}`}<br />{(data.authort.auCorreoElect !== null && data.authort.auCorreoElect !== '') && `${data.language === "es" ? "Correo" : (data.language === "en" ? "Email" : "Correio")}: ${data.authort.auCorreoElect.trim()}`}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>)
                                }
                            </Tab>
                            <Tab eventKey="tab2" title={data.language === "es" ? "Solicitud" : (data.language === "en" ? "Application" : "Aplicação")}>
                                {FormInscripcion(data.infocar.crCodigo.trim(), data.mscdegs, datadept.dpUrlVideoInscripcion, data.language)}
                            </Tab>
                            {
                                (data.infocar.crUrlVideo !== null && data.infocar.crUrlVideo !== "#" && data.infocar.crUrlVideo !== "") && (<>
                                    <Tab eventKey="tab4" title={data.language === "en" ? "Promotional" : "Promocional"}>
                                        <div className="container-fluid g-0">
                                            <div className="row">
                                                {
                                                    (data.infocar.crUrlVideo !== null && data.infocar.crUrlVideo !== "#" && data.infocar.crUrlVideo !== "") && (
                                                        <div className="col-md-12 mx-auto">
                                                            <iframe src={data.infocar.crUrlVideo} style={{ width: "100%", height: "500px" }} title="YouTube video player" frameborder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </Tab>
                                </>)
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
        </SSRProvider>
    </>);

}