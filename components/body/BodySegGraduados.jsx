import { Tabs, Tab, SSRProvider } from "react-bootstrap";
import DOMPurify from 'isomorphic-dompurify';
import { PHOTOS_FOLDER, DOCS_LINK_GRAD_FOLDER, WS_LIST_FILES_UNIV_BY_TYPE, IMG_GENERAL_UNIVS_FOLDER,
       IMG_SECTION_GRADUATED_FOLLOW_FOLDER, DOC_SECTION_GRADUATED_FOLLOW_FOLDER} from 'config';
//import DataTable from 'react-data-table-component';
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Badge } from 'react-bootstrap';

export { BodySegGraduados };

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

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <div id="tbl-list-images_filter" className="dataTables_filter">
            <label>Buscar:<input type="search" className="" placeholder="" aria-controls="tbl-list-images" value={filterText} onChange={onFilter} /></label>
        </div>
    </>
);



function ItemPanelPerson(props) {
    return (
        <div className="col-lg-4 mx-auto">
            <figure className="snip1390">
                <img src={IMG_GENERAL_UNIVS_FOLDER + props.urlimgweb.trim()} alt={props.profesional.trim()} className="profile" />
                <figcaption>
                    <h2>{props.profesional.trim()}</h2>
                    <h3>{props.cargo.trim()}</h3>
                    <div className="sect-testm"><blockquote>{props.testimonio.trim()}</blockquote></div>
                </figcaption>
            </figure>
        </div>
    )
}

function BodySegGraduados(data) {

    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_FILES_UNIV_BY_TYPE}DOCSG`);
            setDatatbl((result.data !== null && result.data !== "") ? result.data.filter(itemdocx => itemdocx.arEstado === 1).sort((a, b) => (a.arFechaPublc < b.arFechaPublc) ? 1 : -1) : []);
        })();
    }, []);

    const filteredItems = datatbl.filter(
        item => item.arDescripcion && item.arDescripcion.toLowerCase().includes(filterText.toLowerCase()),
    );

    const DownloadFiles = row => (<>
        <a href={`${DOCS_LINK_GRAD_FOLDER}${row.arUrlDocumento.trim()}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar documento" : (data.language === "en" ? "Download document" : "Baixar documento")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const PreviewFiles = row => (<>
        <a href="#" onClick={() => { row.arUrlDocumento.includes(".pdf") && window.open(`${DOCS_LINK_GRAD_FOLDER}${row.arUrlDocumento.trim()}`, "_blank", "fullscreen=yes"); return false }} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Visualizar documento" : (data.language === "en" ? "View document" : "Exibir documento")}>
            <i class="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const columns = (language) => [
        {
            name: (language === "es" ? "Período" : "Period"),
            selector: row => row.arFase.trim(),
            sortable: true,
            width: '15%',
            filterable: true
        },
        {
            name: (language === "es" ? "Facultad" : (language === "en" ? "Faculty" : "Faculdade")),
            selector: row => (language === "es" ? row.arDescripcion.trim() : (language === "en" ? row.arDescripcionEn.trim() : row.arDescripcionPt.trim())),
            sortable: true,
            width: '40%',
            filterable: true
        },
        {
            name: (language === "es" ? "Carrera" : (language === "en" ? "Career" : "Carreira")),
            selector: row => (language === "es" ? row.arInformacion.trim() : (language === "en" ? row.arInformacionEn.trim() : row.arInformacionPt.trim())),
            sortable: true,
            width: '35%',
            filterable: true
        },
        {
            name: '...',
            sortable: false,
            cell: row => <DownloadFiles {...row} />,
            width: '5%',
            center: true
        },
        {
            name: '...',
            sortable: false,
            cell: row => <PreviewFiles {...row} />,
            width: '5%',
            center: true
        },
    ];

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

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

    const listItemsTestimonials = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (<ItemPanelPerson key={uuidv4()} urlimgweb={item.dmUrlFoto} profesional={item.dmNombreGrad} cargo={data.language === "es" ? item.dmProfesion.trim() : (data.language === "en" ? item.dmProfesionEn.trim() : item.dmProfesionPt.trim())}
                    testimonio={data.language === "es" ? item.dmRespuesta.trim() : (data.language === "en" ? item.dmRespuestaEn.trim() : item.dmRespuestaPt.trim())} />);
            })
        )
    }

    const renderPanelAuthorts = (dataMembers) => {
        if (dataMembers.length > 0) {
            return (<>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center">
                        <div className="card-tp">
                            <img style={{ borderRadius: "0px" }} src={(dataMembers[0].orObjAutoridad.auUrlFotoAlt !== null && dataMembers[0].orObjAutoridad.auUrlFotoAlt !== "" && dataMembers[0].orObjAutoridad.auUrlFotoAlt !== "#") ? (PHOTOS_FOLDER + dataMembers[0].orObjAutoridad.auUrlFotoAlt.trim()) : (item.auGenero === "M" ? (PHOTOS_FOLDER + "img-aut-masc-default-2.jpg") : (PHOTOS_FOLDER + "img-aut-fem-default-2.jpg"))} className="card-img-top" alt={""} />
                            <h3 className="card-subtitle-aut-2 mb-2 g-0">
                                {dataMembers[0].orObjAutoridad.auNombres.trim() + ' ' + dataMembers[0].orObjAutoridad.auApellidos.trim()}
                            </h3>
                            <div className="card-body-aut-ev">
                                <h3 className="card-title">{dataMembers[0].orObjAutoridad.auGenero === "M" ? dataMembers[0].orObjAutoridad.auObjCargo.dmDescripcion.trim() : dataMembers[0].orObjAutoridad.auObjCargo.dmRespuesta.trim()}</h3>
                                <h3 style={{ textAlign: 'center' }} className="card-title">
                                    <a href={`mailto:${dataMembers[0].orObjAutoridad.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={`Comunicarse con ${dataMembers[0].orObjAutoridad.auNombres.trim() + ' ' + dataMembers[0].orObjAutoridad.auApellidos.trim()}`} style={{ textDecoration: 'none' }}>
                                        <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{dataMembers[0].orObjAutoridad.auCorreoElect.trim()}</Badge>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    {
                        dataMembers.map(
                            (item, index) => {
                                return (
                                    index > 0 && <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center" key={index}>
                                        <div className="pnl-members-res">
                                            <h2 className="pnl-mr-title-mod-3 g-0">
                                                {item.orObjAutoridad.auNombres.trim() + ' ' + item.orObjAutoridad.auApellidos.trim()}
                                            </h2>
                                            <div className="pnl-mr-data-member">
                                                <h3 className="pnl-mr-text p-2">{`${item.orObjAutoridad.auGenero === "M" ? item.orObjAutoridad.auObjCargo.dmDescripcion.trim() : item.orObjAutoridad.auObjCargo.dmRespuesta.trim()} - ${item.orObjAutoridad.auDireccion.trim()}`}</h3>
                                                <h3 style={{ textAlign: 'center' }} className="pnl-mr-text-1">
                                                    <a href={`mailto:${item.orObjAutoridad.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={`Comunicarse con ${item.orObjAutoridad.auNombres.trim() + ' ' + item.orObjAutoridad.auApellidos.trim()}`} style={{ textDecoration: 'none' }}>
                                                        <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{item.orObjAutoridad.auCorreoElect.trim()}</Badge>
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>
            </>);
        }
    }

    return (<><SSRProvider>
        <div className="row">
            <h2 className="title-cont-page text-center">{data.language === "es" ? "Seguimiento a Graduados" : (data.language === "en" ? "Graduate Follow-up" : "Acompanhamento dos graduados")}</h2>
            <div className="col-md-12 mt-2">
                <Tabs defaultActiveKey={0} id="tab-info">
                    <Tab eventKey={0} title={data.language === "es" ? "Descripción" : (data.language === "en" ? "Description" : "Descrição")}>
                        <a target="_blank" data-toggle="tooltip" data-placement="bottom" title="Ir a realizar la encuesta" href="https://docs.google.com/forms/d/e/1FAIpQLSectJDO1N5nTsrj8VBt7G2cVWk4raVY2nScTq3AQ2dWI5tAyg/viewform?usp=preview">
                            <div className="ratio ratio-21x9">
                                <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}encuesta-general-2022.webp`} className="d-block w-100" alt="Aviso importante de Seguimiento a graduados" />
                            </div>
                        </a>
                        <h2 className="title-cont-page text-center mt-3">{data.language === "es" ? "Estadísticas" : (data.language === "en" ? "Statistics" : "Estatísticas")}</h2>
                        <div className="paragraph-cont">
                            <h3 className="subtitle-cont text-center">{data.language === "es" ? "Período académico 2024" : (data.language === "en" ? "Academic year 2024" : "Ano acadêmico de 2024")}</h3>
                        </div>
                        <div className="col-md-12 mt-2 w-100">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="card panel-metcs-bx">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                                    <img className="img-fluid img-metcs-bx" src="/assets/img/metrica-total-graduados.webp" alt="" />
                                                </div>
                                                <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                                    <h3 className="number-metcs-bx">1610</h3>
                                                    <div className="sect-title-metcs">
                                                        <h4 className="title-metcs-bx">Total de graduados</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="card panel-metcs-bx">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                                    <img className="img-fluid img-metcs-bx" src="/assets/img/metrica-graduadas.webp" alt="" />
                                                </div>
                                                <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                                    <h3 className="number-metcs-bx">944</h3>
                                                    <div className="sect-title-metcs">
                                                        <h4 className="title-metcs-bx">Graduados mujeres</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="card panel-metcs-bx">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                                    <img className="img-fluid img-metcs-bx" src="/assets/img/metrica-graduados.webp" alt="" />
                                                </div>
                                                <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                                    <h3 className="number-metcs-bx">666</h3>
                                                    <div className="sect-title-metcs">
                                                        <h4 className="title-metcs-bx">Graduados varones</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="card panel-metcs-bx">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                                    <img className="img-fluid img-metcs-bx" src="/assets/img/metrica-tasa-empleabilidad.webp" alt="" />
                                                </div>
                                                <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                                    <h3 className="number-metcs-bx">67.3%</h3>
                                                    <div className="sect-title-metcs">
                                                        <h4 className="title-metcs-bx">Tasa de empleabilidad</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="card panel-metcs-bx">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                                    <img className="img-fluid img-metcs-bx" src="/assets/img/metrica-graduados-trabajos.webp" alt="" />
                                                </div>
                                                <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                                    <h3 className="number-metcs-bx">56%</h3>
                                                    <div className="sect-title-metcs">
                                                        <h4 className="title-metcs-bx">Trabajo en relación a su carrera</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="card panel-metcs-bx">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                                    <img className="img-fluid img-metcs-bx" src="/assets/img/metrica-eventos-graduados.webp" alt="" />
                                                </div>
                                                <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                                    <h3 className="number-metcs-bx">60</h3>
                                                    <div className="sect-title-metcs">
                                                        <h4 className="title-metcs-bx">Eventos para graduados</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    	{
                            (data.data8 !== null && data.data8 !== "") && (
                                <div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData((data.language === "es" ? (data.data8.pwEventos !== null ? data.data8.pwEventos : '') :
                                    (data.language === "en" ? (data.data8.pwEventosEn !== null ? data.data8.pwEventosEn : '') : (data.data8.pwEventosPt !== null ? data.data8.pwEventosPt : ''))) +
                                    (data.language === "es" ? (data.data8.pwMision !== null ? data.data8.pwMision.trim() : '') : (data.language === "en" ? (data.data8.pwMisionEn !== null ? data.data8.pwMisionEn.trim() : '') :
                                        (data.data8.pwMisionPt !== null ? data.data8.pwMisionPt.trim() : '')))
                                    + (data.language === "es" ? (data.data8.pwObjetivos !== null ? data.data8.pwObjetivos : '') : (data.language === "en" ? (data.data8.pwObjetivosEn !== null ? data.data8.pwObjetivosEn : '') :
                                        (data.data8.pwObjetivosPt !== null ? data.data8.pwObjetivosPt : ''))))}></div>
                            )
                        }
                    	<div className="row g-0 w-100 mt-4">
                            <div className="col-lg-4 mx-auto">
                                <div className="item item-sld-mult">
                                    <div className="work">
                                        <a href={`${DOC_SECTION_GRADUATED_FOLLOW_FOLDER}normativas-seguimiento-a-graduados.pdf`} target="_blank" aria-label="link corpidt" style={{ textDecoration: "none" }}>
                                            <div className="img-n10 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}normativa-seguimiento-graduados.webp)` }}></div>
                                            <div className="text-pn text-center">Normativa</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mx-auto">
                                <div className="item item-sld-mult">
                                    <div className="work">
                                        <a href="https://sga.uteq.edu.ec/loginsga?ret=/" target="_blank" aria-label="link corpidt" style={{ textDecoration: "none" }}>
                                            <div className="img-n10 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}ingresar-al-sistema-alumni.webp)` }}></div>
                                            <div className="text-pn text-center">Ingreso a Alumni</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mx-auto">
                                <div className="item item-sld-mult">
                                    <div className="work">
                                        <a href={`${DOC_SECTION_GRADUATED_FOLLOW_FOLDER}informe-general-2024.pdf`} target="_blank" aria-label="link corpidt" style={{ textDecoration: "none" }}>
                                            <div className="img-n10 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}informe-general-2022.webp)` }}></div>
                                            <div className="text-pn text-center">Informe general 2024</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row w-100">
                            <h2 className="title-cont-page mt-4">{data.language === "es" ? "Casos de éxito" : (data.language === "en" ? "Success stories" : "Histórias de sucesso")}</h2>
                            {
                                (data.testimonials !== null && data.testimonials !== "") && (
                                    data.testimonials.length > 0 && listItemsTestimonials(data.testimonials))
                            }
                        </div>
                    </Tab>
                	<Tab eventKey={1} title={data.language === "en" ? "Events" : "Eventos"}>
                        <div className="col-md-12 w-100 mt-1">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-1.jpg`} alt="Evento de Seguimiento a graduados Num.1" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-2.jpg`} alt="Evento de Seguimiento a graduados Num.2" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-3.jpg`} alt="Evento de Seguimiento a graduados Num.3" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-4.jpeg`} alt="Evento de Seguimiento a graduados Num.4" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-5.jpeg`} alt="Evento de Seguimiento a graduados Num.5" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-6.jpeg`} alt="Evento de Seguimiento a graduados Num.6" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-7.jpg`} alt="Evento de Seguimiento a graduados Num.7" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-8.jpg`} alt="Evento de Seguimiento a graduados Num.8" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-9.jpg`} alt="Evento de Seguimiento a graduados Num.9" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-10.jpg`} alt="Evento de Seguimiento a graduados Num.10" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="ratio ratio-1x1">
                                        <img src={`${IMG_SECTION_GRADUATED_FOLLOW_FOLDER}evento-seg-grad-11.jpg`} alt="Evento de Seguimiento a graduados Num.11" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                {/*<Tab eventKey={2} title={data.language === "es" ? "Informes" : (data.language === "en" ? "Reports" : "Relatórios")}>
                        <div className="col-md-12 w-100 mt-1">
                            <DataTable
                                columns={columns(data.language)}
                                pagination
                                striped
                                className="table-wp"
                                highlightOnHover
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
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
                    <Tab eventKey={3} title={data.language === "es" ? "Casos de exito" : (data.language === "en" ? "Success stories" : "Histórias de sucesso")}>
                        <div className="row w-100">
                            {
                                (data.testimonials !== null && data.testimonials !== "") && (
                                    data.testimonials.length > 0 && listItemsTestimonials(data.testimonials))
                            }
                        </div>
                    </Tab>*/}
                </Tabs>
            </div>
        </div>
    </SSRProvider></>);

}