import { Tabs, Tab, SSRProvider } from "react-bootstrap";
import DOMPurify from 'isomorphic-dompurify';
import {
    apiUrl, CAREER_ACADEMIC_IMGS_FOLDER, FORMATS_DOCS_FOLDER, CAREER_PROMOTION_IMGS_FOLDER, CAREER_PROMOTION_DOCS_FOLDER, 
    WS_LIST_SHORT_FILES_FORMTS_UNIV_BY_TYPE_LANG
} from 'config';
import ReactPlayer from "react-player";
import * as htmlToImage from 'html-to-image';
import React, { useState, useEffect, useMemo } from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Accordion } from "react-bootstrap";
import { Badge } from 'react-bootstrap';


export { BodyCarrera };

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <div id="tbl-list-images_filter" className="dataTables_filter">
            <label>Buscar:<input type="search" className="" placeholder="" aria-controls="tbl-list-images" value={filterText} onChange={onFilter} /></label>
        </div>
    </>
);

async function make_request_ws(path_url) {
    var listTemp = null;
    const https = require('https');
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        await axios.get(path_url, { httpsAgent: agent }).then(function (response) {
            listTemp = response/*.data*/;
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

function BodyCarrera(data) {

    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_SHORT_FILES_FORMTS_UNIV_BY_TYPE_LANG}FORSL`);
            setDatatbl((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);

    const DownloadFiles = row => (<>
        <a href={`${FORMATS_DOCS_FOLDER}${row.arUrlDocumento}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom"
            title={data.language === "es" ? "Descargar documento institucional" : (data.language === "en" ? "Download institutional document" : "Descarregar o documento institucional")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const columns = (language) => [
        {
            name: (language === "es" ? "Título" : (language === "en" ? "Title" : "Título")),
            selector: row => (language === "es" ? row.arInformacion.trim() : (language === "en" ? row.arInformacionEn.trim() : row.arInformacionPt.trim())),
            sortable: true,
            width: '80%',
            filterable: true
        },
        {
            name: (language === "es" ? "Solicitante" : (language === "en" ? "Applicant" : "Requerente")),
            selector: row => (language === "es" ? row.arSolicitante.trim() : (language === "en" ? row.arSolicitanteEn.trim() : row.arSolicitantePt.trim())),
            sortable: true,
            width: '15%',
            filterable: true,
            center: true
        },
        {
            name: '...',
            sortable: false,
            cell: row => <DownloadFiles {...row} />,
            width: '5%',
            center: true
        },
    ];

    const filteredItems = datatbl.filter(
        item => (data.language === "es" ? (item.arInformacion && item.arInformacion.toLowerCase().includes(filterText.toLowerCase())) :
            (data.language === "en" ? (item.arInformacionEn && item.arInformacionEn.toLowerCase().includes(filterText.toLowerCase())) :
                (item.arInformacionPt && item.arInformacionPt.toLowerCase().includes(filterText.toLowerCase())))) ||
            (data.language === "es" ? (item.arSolicitante && item.arSolicitante.toLowerCase().includes(filterText.toLowerCase())) :
                (data.language === "en" ? (item.arSolicitanteEn && item.arSolicitanteEn.toLowerCase().includes(filterText.toLowerCase())) :
                    (item.arSolicitantePt && item.arSolicitantePt.toLowerCase().includes(filterText.toLowerCase()))))
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    const style_img = {
        width: "100%",
        height: "100%"
    };

    const handleDownloadClickImage = (event, param, careerName) => {
        var node = document.getElementById(param);

        htmlToImage.toBlob(node, { quality: 1, pixelRatio: 2 })
            .then(function (blob) {
                window.saveAs(blob, `Malla-académica-${careerName}.png`);
            });
    };

    function getTitlesByAuthority(dataTitle) {
        var titles = '';
        if (dataTitle.length > 0) {
            dataTitle.map((item) => (
                titles += (titles, item.taTituloRec.trim() /*+ " - " + item.taInstitucionSup.trim())*/ + ". ")
            ));
        }
        return titles.trim();
    }

    const renderSectionQuestion = (dataQst) => {
        return (<><div id="panel-question">
            <Accordion defaultActiveKey="0">
                {dataQst.sort((a, b) => (a.dmOrdenPreg > b.dmOrdenPreg) ? 1 : -1).map(
                    (item, index) => {
                        return (<Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>{data.language === "es" ? item.dmDescripcion.trim() : (data.language === "en" ? item.dmDescripcionEn.trim() : item.dmDescripcionPt.trim())}</Accordion.Header>
                            <Accordion.Body>
                                {
                                    <div dangerouslySetInnerHTML={sanitizedData(data.language === "es" ? item.dmRespuesta.trim() : (data.language === "en" ? item.dmRespuestaEn.trim() : item.dmRespuestaPt.trim()))}></div>
                                }
                            </Accordion.Body>
                        </Accordion.Item>);
                    })}
            </Accordion>
        </div></>);
    }

    return (<><SSRProvider>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{(data.career !== null && data.career !== '') ? (data.language === "es" ? data.career.crNombre.trim() : (data.language === "en" ? data.career.crNombreEn.trim() : data.career.crNombrePt.trim())) : (data.language === "es" ? "Carrera - UTEQ" : (data.language === "en" ? "Career - UTEQ" : "Carreira - UTEQ"))}</h2>
            <div className="col-md-12 w-100 mt-2">
                <Tabs defaultActiveKey={0} id="tab-info">
                    <Tab eventKey={0} title={data.language === "es" ? "Información" : (data.language === "en" ? "Information" : "Informações")}>
                        <div className="row">
                            {
                                (data.career !== null && data.career !== '') && (<>
                                	{
                                        (data.career.crUrlPagInsc !== "#") ? (<>
                                            <div className="col-md-12 w-100 mt-3 mb-3">
                                                <a href={data.career.crUrlPagInsc} target="_blank" className="link-text-local" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ir a la página web de Inscripción" : (data.language === "en" ? "Go to the Registration webpage" : "Acesse o site de registro")}>
                                                    <div className="card-header pnl-link-effect">
                                                        <i className="fa fa-check-square" aria-hidden="true"></i> {data.language === "es" ? "¡Inscríbete aquí!" : (data.language === "en" ? "Register here!" : "Registre-se aqui!")}
                                                    </div>
                                                </a>
                                            </div>
                                        </>) : ""
                                    }
                                    <div className="col-md-12">
                                        {
                                            (data.language === "es" ? (
                                                (data.career.crDenom !== null && data.career.crDenom !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crDenom.trim())}></div>
                                                </>) : ""
                                            ) : (data.language === "en" ? (
                                                (data.career.crDenomEn !== null && data.career.crDenomEn !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crDenomEn.trim())}></div>
                                                </>) : ""
                                            ) : (
                                                (data.career.crDenomPt !== null && data.career.crDenomPt !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crDenomPt.trim())}></div>
                                                </>) : ""
                                            )))
                                        }
                                        {
                                            (data.career.crAprobCES !== null && data.career.crAprobCES !== '') && (<>
                                                <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crAprobCES.replace("Aprobación CES", (data.language === "es" ? "Aprobación CES" : (data.language === "en" ? "CES Approval" : "Aprovação do CES"))))}></div>
                                            </>)
                                        }
                                        {
                                            (data.language === "es" ? (
                                                (data.career.crTitAcad !== null && data.career.crTitAcad !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crTitAcad.trim())}></div>
                                                </>) : ""
                                            ) : (data.language === "en" ? (
                                                (data.career.crTitAcadEn !== null && data.career.crTitAcadEn !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crTitAcadEn.trim())}></div>
                                                </>) : ""
                                            ) : (
                                                (data.career.crTitAcadPt !== null && data.career.crTitAcadPt !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crTitAcadPt.trim())}></div>
                                                </>) : ""
                                            )))
                                        }
                                        {
                                            (data.language === "es" ? (
                                                (data.career.crModald !== null && data.career.crModald !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crModald.trim())}></div>
                                                </>) : ""
                                            ) : (data.language === "en" ? (
                                                (data.career.crModaldEn !== null && data.career.crModaldEn !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crModaldEn.trim())}></div>
                                                </>) : ""
                                            ) : (
                                                (data.career.crModaldPt !== null && data.career.crModaldPt !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crModaldPt.trim())}></div>
                                                </>) : ""
                                            )))
                                        }
                                        {
                                            (data.language === "es" ? (
                                                (data.career.crDurac !== null && data.career.crDurac !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crDurac.trim())}></div>
                                                </>) : ""
                                            ) : (data.language === "en" ? (
                                                (data.career.crDuracEn !== null && data.career.crDuracEn !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crDuracEn.trim())}></div>
                                                </>) : ""
                                            ) : (
                                                (data.career.crDuracPt !== null && data.career.crDuracPt !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crDuracPt.trim())}></div>
                                                </>) : ""
                                            )))
                                        }
                                        {
                                            (data.language === "es" ? (
                                                (data.career.crHorarios !== null && data.career.crHorarios !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crHorarios.trim())}></div>
                                                </>) : ""
                                            ) : (data.language === "en" ? (
                                                (data.career.crHorariosEn !== null && data.career.crHorariosEn !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crHorariosEn.trim())}></div>
                                                </>) : ""
                                            ) : (
                                                (data.career.crHorariosPt !== null && data.career.crHorariosPt !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crHorariosPt.trim())}></div>
                                                </>) : ""
                                            )))
                                        }
                                    </div>
                                    <div className="col-md-5"></div>
                                    <div className="col-md-12">
                                        {
                                            (data.language === "es" ? (
                                                (data.career.crVision !== null && data.career.crVision !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crVision.trim())}></div>
                                                </>) : ""
                                            ) : (data.language === "en" ? (
                                                (data.career.crVisionEn !== null && data.career.crVisionEn !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crVisionEn.trim())}></div>
                                                </>) : ""
                                            ) : (
                                                (data.career.crVisionPt !== null && data.career.crVisionPt !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crVisionPt.trim())}></div>
                                                </>) : ""
                                            )))
                                        }
                                        {
                                            (data.language === "es" ? (
                                                (data.career.crMision !== null && data.career.crMision !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crMision.trim())}></div>
                                                </>) : ""
                                            ) : (data.language === "en" ? (
                                                (data.career.crMisionEn !== null && data.career.crMisionEn !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crMisionEn.trim())}></div>
                                                </>) : ""
                                            ) : (
                                                (data.career.crMisionPt !== null && data.career.crMisionPt !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crMisionPt.trim())}></div>
                                                </>) : ""
                                            )))
                                        }
                                        {
                                            (data.language === "es" ? (
                                                (data.career.crObjetivos !== null && data.career.crObjetivos !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crObjetivos.trim())}></div>
                                                </>) : ""
                                            ) : (data.language === "en" ? (
                                                (data.career.crObjetivosEn !== null && data.career.crObjetivosEn !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crObjetivosEn.trim())}></div>
                                                </>) : ""
                                            ) : (
                                                (data.career.crObjetivosPt !== null && data.career.crObjetivosPt !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crObjetivosPt.trim())}></div>
                                                </>) : ""
                                            )))
                                        }
                                        {
                                            (data.language === "es" ? (
                                                (data.career.crPerfilProf !== null && data.career.crPerfilProf !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crPerfilProf.trim())}></div>
                                                </>) : ""
                                            ) : (data.language === "en" ? (
                                                (data.career.crPerfilProfEn !== null && data.career.crPerfilProfEn !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crPerfilProfEn.trim())}></div>
                                                </>) : ""
                                            ) : (
                                                (data.career.crPerfilProfPt !== null && data.career.crPerfilProfPt !== '') ? (<>
                                                    <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.career.crPerfilProfPt.trim())}></div>
                                                </>) : ""
                                            )))
                                        }
                                        {
                                            (data.career.crCampoOcupc !== null && data.career.crCampoOcupc !== '') ? (<>
                                                <h2 className="msg-pnl-search text-right">{data.language === "es" ? "Campo ocupacional" : (data.language === "en" ? "Occupational field" : "Domínio profissional")}</h2>
                                                <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.language === "es" ? data.career.crCampoOcupc.trim() : (data.language === "en" ? data.career.crCampoOcupcEn.trim() : data.career.crCampoOcupcPt.trim()))}></div>
                                            </>) : ""
                                        }
                                        {
                                            (data.authort !== "" && data.authort !== null) ? (<>
                                                <h2 className="msg-pnl-search text-right">{data.language === "es" ? "Correo electrónico" : (data.language === "en" ? "E-mail" : "Endereço electrónico")}</h2>
                                                {
                                                    (data.authort.auCorreoElect !== null && data.authort.auCorreoElect !== '') ? (<>
                                                        <a href={`mailto:${data.authort.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Comunicación vía correo electrónico" : (data.language === "en" ? "Communication via e-mail" : "Comunicação por correio electrónico")}
                                                            style={{ textDecoration: 'none' }}>
                                                            <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{data.authort.auCorreoElect.trim()}</Badge>
                                                        </a>
                                                    </>) : (<></>)
                                                }
                                            </>) : (<></>)
                                        }
                                        {
                                            (data.career.crUrlVideo !== null && data.career.crUrlVideo !== '' && data.career.crUrlVideo !== '#') && (<>
                                                <h2 className="msg-pnl-search text-right mt-2">{data.language === "es" ? "Conoce más de la Carrera" : (data.language === "en" ? "Learn more about the Career" : "Saiba mais sobre a carreira")}</h2>
                                                <div className="row g-0 mt-2">
                                                    <div className="ratio ratio-16x9">
                                                        <ReactPlayer
                                                            className="embed-responsive-item g-0"
                                                            width="100%"
                                                            height="100%"
                                                            playing={false}
                                                            playsinline={true}
                                                            muted={false}
                                                            url={`${data.career.crUrlVideo.trim()}?showinfo=0&enablejsapi=1&origin=${apiUrl}`}
                                                            controls={false} />
                                                    </div>
                                                </div>
                                            </>)
                                        }
                                    </div>
                                </>)
                            }
                        </div>
                    </Tab>
                    <Tab eventKey={1} title={data.language === "es" ? "Malla académica" : (data.language === "en" ? "Academic grid" : "Grelha académica")}>
                        {
                            (data.career !== null && data.career !== '') && (<>
                                {
                                    (data.career.crUrlImgMalla !== null && data.career.crUrlImgMalla !== '') && (<>
                                        <div className="row">
                                            <p><span className="badge badge-download-web rounded-pill" onClick={event => handleDownloadClickImage(event, 'career-acadm', data.career.crUrlParcial.trim().toLowerCase())} style={{ cursor: "pointer" }}
                                                data-toggle="tooltip" data-placement="bottom" title={`${data.language === "es" ? "Descargar malla académica de la carrera" : (data.language === "en" ? "Download academic syllabus" : "Descarregar o programa académico")} - 
                                            ${data.language === "es" ? data.career.crNombre.trim() : (data.language === "en" ? data.career.crNombreEn.trim() : data.career.crNombrePt.trim())}`}><i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>&nbsp;{data.language === "es" ? "Descargar" : (data.language === "en" ? "Download" : "Descarregar")}</span></p>
                                        </div>
                                        <div className="row g-0 mt-2">
                                            <a href={`${CAREER_ACADEMIC_IMGS_FOLDER}${data.career.crUrlImgMalla.trim()}`} target="_blank"
                                                className="link-text-local" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ver imagen" : (data.language === "en" ? "View image" : "Ver imagem")}>
                                                <div className={`ratio ${(data.career.crProporcion !== null && data.career.crProporcion !== '') ? data.career.crProporcion.trim() : "ratio-4x3"}`}>
                                                    <img src={`${CAREER_ACADEMIC_IMGS_FOLDER}${data.career.crUrlImgMalla.trim()}`} id="career-acadm" alt={data.language === "es" ? "Malla académica" : (data.language === "en" ? "Academic grid" : "Grelha académica")} />
                                                </div>
                                            </a>
                                        </div>
                                    </>)
                                }
                            </>)
                        }
                    </Tab>
                    <Tab eventKey={2} title={data.language === "es" ? "Preguntas frecuentes" : (data.language === "en" ? "Frequently asked questions" : "Perguntas mais frequentes")}>
                        {(data.question !== null && data.question !== "") && renderSectionQuestion(data.question)}
                    </Tab>
                    <Tab eventKey={3} title={data.language === "es" ? "Formatos de solicitud" : (data.language === "en" ? "Application forms" : "Formulários de candidatura")}>
                        <div className="col-md-12 w-100 mt-2">
                            <DataTable
                                columns={columns(data.language)}
                                pagination
                                striped
                                className="table-wp"
                                highlightOnHover
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                                paginationComponentOptions={{
                                    rowsPerPageText: (data.language === "es" ? "Registros por página:" : (data.language === "en" ? "Rows per page:" : "Linhas por página:")),
                                    rangeSeparatorText: (data.language === "en" ? "of" : "de"), noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: (data.language === "en" ? "All" : "Todos")
                                }}
                                data={filteredItems}
                                noDataComponent={data.language === "es" ? "No hay registros para mostrar" : (data.language === "en" ? "No records to show" : "Sem registros para exibir")}
                                paginationResetDefaultPage={resetPaginationToggle}
                                subHeader
                                subHeaderComponent={subHeaderComponentMemo}
                                responsive
                            />
                        </div>
                    </Tab>
                    <Tab eventKey={4} title={data.language === "es" ? "Promoción" : (data.language === "en" ? "Promotion" : "Promoção")}>
                        {
                            (data.career !== null && data.career !== '') && (<>
                                {
                                    (data.career.crDocTriptc !== null && data.career.crDocTriptc !== '') && (<>
                                        <div className="row">
                                            <p><a href={`${CAREER_PROMOTION_DOCS_FOLDER}${data.career.crDocTriptc.trim()}`} data-toggle="tooltip" data-placement="bottom"
                                                title={`${data.language === "es" ? "Descargar tríptico de la carrera" : (data.language === "en" ? "Download degree career brochure" : "Descarregar a brochura do curso")} - ${data.language === "es" ? data.career.crNombre.trim() : (data.language === "en" ? data.career.crNombreEn.trim() : data.career.crNombrePt.trim())}`}>
                                                <span className="badge badge-download-web rounded-pill"><i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>&nbsp;{data.language === "es" ? "Descargar" : (data.language === "en" ? "Download" : "Descarregar")}</span></a></p>
                                        </div>
                                    </>)
                                }
                                <div className="row g-0 mt-2">
                                    {
                                        (data.career.crUrlTriptc1 !== null && data.career.crUrlTriptc1 !== '') && (<>
                                            <a href={`${CAREER_PROMOTION_IMGS_FOLDER}${data.career.crUrlTriptc1.trim()}`} target="_blank"
                                                className="link-text-local" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ver diseño frontal del Tríptico" : (data.language === "en" ? "See front design of the Triptych" : "Ver desenho da frente do Tríptico")}>
                                                <div className="ratio ratio-4x3">
                                                    <img src={`${CAREER_PROMOTION_IMGS_FOLDER}${data.career.crUrlTriptc1.trim()}`} id="career-acadm" alt={data.language === "es" ? "Imagen del Tríptico 1" : (data.language === "en" ? "Image of Triptych 1" : "Imagem do Tríptico 1")} />
                                                </div>
                                            </a>
                                        </>)
                                    }
                                    {
                                        (data.career.crUrlTriptc2 !== null && data.career.crUrlTriptc2 !== '') && (<>
                                            <a href={`${CAREER_PROMOTION_IMGS_FOLDER}${data.career.crUrlTriptc2.trim()}`} target="_blank"
                                                className="link-text-local mt-2" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ver diseño posterior del Tríptico" : (data.language === "en" ? "See back design of the Triptych" : "Ver o desenho do tríptico no verso")}>
                                                <div className="ratio ratio-4x3">
                                                    <img src={`${CAREER_PROMOTION_IMGS_FOLDER}${data.career.crUrlTriptc2.trim()}`} id="career-acadm" alt={data.language === "es" ? "Imagen del Tríptico 2" : (data.language === "en" ? "Imagem do Tríptico 2" : "Image of Triptych 2")} />
                                                </div>
                                            </a>
                                        </>)
                                    }
                                </div>
                            </>)
                        }
                    </Tab>
                </Tabs>
            </div>
        </div>
    </SSRProvider></>);

}
