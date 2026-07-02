import DOMPurify from 'isomorphic-dompurify';
import { COOP_INTERNC_DOCS_FOLDER, WS_LIST_AGREEMTS_CI, WS_LIST_AGREEMTS_CI_TYPE_1, WS_LIST_AGREEMTS_CI_TYPE_2, WS_LIST_AGREEMTS_CI_TYPE_3 } from 'config';
// import { BoxMetric } from 'components';
import DataTable from 'react-data-table-component';
import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from 'axios';
import { Badge } from 'react-bootstrap';


export { BodyCoopInternc };

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

function BodyCoopInternc(data) {
    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [selectedOption, setSelectedOption] = useState("TOD");
	const tableRef = useRef(null);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(WS_LIST_AGREEMTS_CI);
            setDatatbl((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);

	const handleChangeTypeAgrs = (event) => {
        const selectedValue = event.target.value;
        const selectedDataValopt = event.target.options[event.target.selectedIndex].getAttribute('data-valopt');

        setSelectedOption(selectedValue);
        getListDatAgreemtsByType(parseInt(selectedDataValopt, 10), selectedValue);
    };

    const handleClickMetrics = (option, type) => () => {
        getListDatAgreemtsByType(option, type);
    
    	if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getListDatAgreemtsByType = async (option, type) => {
        try {
            let result;

            if (type === "TOD") {
                result = await make_request_ws(WS_LIST_AGREEMTS_CI);
            } else {
                const endpoint = option === 1 ? WS_LIST_AGREEMTS_CI_TYPE_1 : (option === 2 ? WS_LIST_AGREEMTS_CI_TYPE_2 : WS_LIST_AGREEMTS_CI_TYPE_3);
                
                result = await make_request_ws(endpoint + type);
            }

            setDatatbl(result.data !== null && result.data !== "" ? result.data : []);
        } catch (error) {
            setDatatbl([]);
        }
    };

    const filteredItems = datatbl.filter(
        item => (item.cvColaborador && item.cvColaborador.toLowerCase().includes(filterText.toLowerCase())) || (item.cvPais && item.cvPais.trim().toLowerCase().includes(filterText.toLowerCase())),
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
    })

    function stringSentenceCase(str) {
        return str.replace(/\.\s+([a-z])[^\.]|^(\s*[a-z])[^\.]/g, s => s.replace(/([a-z])/, s => s.toUpperCase()))
    }

    const columns = (language) => [
        {
            name: (language === "en" ? "Type" : "Tipo"),
            selector: row => (row.cvTipoColb.trim() === 'EMPRESA' ? (language === "en" ? "Company" : "Empresa") : (language === "es" ? "Institución" : (language === "en" ? "Institution" : "Instituição"))) + " " + (row.cvOrgCpt.toLowerCase() === "pública" ? (language === "es" ? "pública" : (language === "en" ? "public" : "público")) :
                (row.cvOrgCpt.toLowerCase() === "privada" ? (language === "es" ? "privada" : (language === "en" ? "private" : "privado")) : (language === "es" ? "mixta" : (language === "en" ? "mixed" : "misto")))),
            sortable: true,
            width: '20%',
            filterable: true
        },
        {
            name: (language === "es" ? "Convenio" : (language === "en" ? "Convention" : "Convenção")),
            selector: row => row.cvColaborador.trim(),
            sortable: true,
            width: '65%',
            filterable: true
        },
        {
            name: (language === "en" ? "Country" : "País"),
            selector: row => stringSentenceCase(row.cvPais.trim().toLowerCase()),
            sortable: true,
            width: '15%',
            filterable: true
        }
    ];

    const renderTextInfo = (dataInfoInst) => {
        return (<>
            {
                (dataInfoInst.language === "es" ? (dataInfoInst.data8.dpHistoria !== null ? (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.data8.dpHistoria.trim())}></div></>) : (<></>)) :
                    (dataInfoInst.language === "en" ? (dataInfoInst.data8.dpHistoriaEn !== null ? (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.data8.dpHistoriaEn.trim())}></div></>) : (<></>)) :
                        (dataInfoInst.data8.dpHistoriaPt !== null ? (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.data8.dpHistoriaPt.trim())}></div></>) : (<></>))))
            }
            {
                (dataInfoInst.language === "es" ? (dataInfoInst.data8.dpObjetivos !== null ? (<><div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.data8.dpObjetivos.trim())}></div></>) : (<></>)) :
                    (dataInfoInst.language === "en" ? (dataInfoInst.data8.dpObjetivosEn !== null ? (<><div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.data8.dpObjetivosEn.trim())}></div></>) : (<></>)) :
                        (dataInfoInst.data8.dpObjetivosPt !== null ? (<><div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.data8.dpObjetivosPt.trim())}></div></>) : (<></>))))
            }
        </>);
    }

    return (<><div className="row">
        <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Cooperación Internacional" : (data.language === "en" ? "International Cooperation" : "Cooperação Internacional")}</h2>
        {renderTextInfo(data)}
        <h3 className="msg-pnl-search text-right mt-3">{data.language === "es" ? "Estadísticas de Convenios" : (data.language === "en" ? "Convention Statistics" : "Estatísticas da Convenção")}</h3>
        {/*BoxMetric(data.ctAgM, (data.language === "es" ? "Nacionales" : (data.language === "en" ? "National" : "Nacional")), "metrica-11.png", 1, 2, "")*/}
        {/*BoxMetric(data.ctAgS, (data.language === "es" ? "Internacionales" : "Internacional"), "metrica-12.png", 2, 2, "")*/}
        {/*BoxMetric(data.ctAgN, (data.language === "en" ? "Public Sector" : "Sector Público"), "metrica-13.png", 3, 2, "")*/}
        {/*BoxMetric(data.ctAgI, (data.language === "en" ? "Private Sector" : "Sector Privado"), "metrica-14.png", 4, 2, "")*/}
        {/*BoxMetric(data.ctAgP, (data.language === "es" ? "Univ. Nacionales" : (data.language === "en" ? "National Univ." : "Univ. Nacional")), "metrica-13.png", 5, 2, "")*/}
        {/*BoxMetric(data.ctAgR, (data.language === "es" ? "Univ. Internacionales" : (data.language === "en" ? "International Univ." : "Univ. Internacional")), "metrica-14.png", 6, 2, "")*/}
        
    	<div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
            <div className="card panel-metcs-bx" onClick={handleClickMetrics(1, 'NACIONAL')}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                            <img className="img-fluid img-metcs-bx" src={`/assets/img/metrica-11.png`} alt="" />
                        </div>
                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                            <h3 className="number-metcs-bx">{data.ctAgM}</h3>
                            <div className="sect-title-metcs">
                                <h4 className="title-metcs-bx">{(data.language === "es" ? "Nacionales" : (data.language === "en" ? "National" : "Nacional"))}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
            <div className="card panel-metcs-bx" onClick={handleClickMetrics(1, 'INTERNACIONAL')}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                            <img className="img-fluid img-metcs-bx" src={`/assets/img/metrica-12.png`} alt="" />
                        </div>
                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                            <h3 className="number-metcs-bx">{data.ctAgS}</h3>
                            <div className="sect-title-metcs">
                                <h4 className="title-metcs-bx">{(data.language === "es" ? "Internacionales" : "Internacional")}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
            <div className="card panel-metcs-bx" onClick={handleClickMetrics(2, 1)}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                            <img className="img-fluid img-metcs-bx" src={`/assets/img/metrica-13.png`} alt="" />
                        </div>
                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                            <h3 className="number-metcs-bx">{data.ctAgN}</h3>
                            <div className="sect-title-metcs">
                                <h4 className="title-metcs-bx">{(data.language === "en" ? "Public Sector" : "Sector Público")}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
            <div className="card panel-metcs-bx" onClick={handleClickMetrics(2, 2)}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                            <img className="img-fluid img-metcs-bx" src={`/assets/img/metrica-14.png`} alt="" />
                        </div>
                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                            <h3 className="number-metcs-bx">{data.ctAgI}</h3>
                            <div className="sect-title-metcs">
                                <h4 className="title-metcs-bx">{(data.language === "en" ? "Private Sector" : "Sector Privado")}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
            <div className="card panel-metcs-bx" onClick={handleClickMetrics(3, "NACIONAL")}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                            <img className="img-fluid img-metcs-bx" src={`/assets/img/metrica-13.png`} alt="" />
                        </div>
                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                            <h3 className="number-metcs-bx">{data.ctAgP}</h3>
                            <div className="sect-title-metcs">
                                <h4 className="title-metcs-bx">{(data.language === "es" ? "Univ. Nacionales" : (data.language === "en" ? "National Univ." : "Univ. Nacional"))}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
            <div className="card panel-metcs-bx" onClick={handleClickMetrics(3, "INTERNACIONAL")}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                            <img className="img-fluid img-metcs-bx" src={`/assets/img/metrica-14.png`} alt="" />
                        </div>
                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                            <h3 className="number-metcs-bx">{data.ctAgR}</h3>
                            <div className="sect-title-metcs">
                                <h4 className="title-metcs-bx">{(data.language === "es" ? "Univ. Internacionales" : (data.language === "en" ? "International Univ." : "Univ. Internacional"))}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    	<hr />
        <div className="col-md-12 w-100">
            <div className="ratio ratio-21x9">
                <a href={`${COOP_INTERNC_DOCS_FOLDER}docx-uteq-3-0001.pdf`} target="_blank" aria-label="link cooperacion internacional pdf">
                    <img src={`/assets/img/${data.language === "es" ? "bn-m-2-6.jpg" : (data.language === "en" ? "bn-m-2-6-en.jpg" : "bn-m-2-6-pt.jpg")}`} className="img-fluid" alt={(data.language === "es" ? "Descargar el reglamento para suscripción de convenios (PDF)" : (data.language === "en" ? "Download the regulations for the subscription of agreements (PDF)" : "Descarregar o regulamento para a assinatura de acordos (PDF)"))} />
                </a>
            </div>
        </div>
        {
            (data.authort !== "" && data.authort !== null) ? (<>
                <h2 className="msg-pnl-search text-right mt-3">{data.language === "es" ? "Correo electrónico" : (data.language === "en" ? "E-mail" : "Endereço electrónico")}</h2>
                {
                    (data.authort.auCorreoElect !== null && data.authort.auCorreoElect !== '') ? (<>
                        <a href={`mailto:${data.authort.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Comunicación vía correo electrónico" : (data.language === "en" ? "Communication via e-mail" : "Comunicação via e-mail")} style={{ textDecoration: 'none' }}>
                            <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{data.authort.auCorreoElect.trim()}</Badge>
                        </a>
                    </>) : (<></>)
                }
            </>) : (<></>)
        }
        <h2 className="msg-pnl-search text-right mt-3">{data.language === "es" ? "Listado de convenios suscritos" : (data.language === "en" ? "List of agreements signed" : "Lista de acordos assinados")}</h2>
        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 flex-column d-flex">
            <select name="ftTypeAgrs"
                onChange={handleChangeTypeAgrs}
                value={selectedOption}
                className="form-select form-select-lg" id="slct-type-aggs">
                <option data-valopt="1" value="NACIONAL">{(data.language==="es"? "Convenios Nacionales" : (data.language==="en"?"National Agreements":"Convenções nacionais"))}</option>
                <option data-valopt="1" value="INTERNACIONAL">{(data.language==="es"? "Convenios Internacionales" : (data.language==="en"?"International Conventions":"Convenções internacionais"))}</option>
                <option data-valopt="2" value="1">{(data.language==="es"? "Sector Público" : (data.language==="en"?"Public Sector":"Setor público"))}</option>
                <option data-valopt="2" value="2">{(data.language==="es"? "Sector Privado" : (data.language==="en"?"Private Sector":"Setor privado"))}</option>
                <option data-valopt="3" value="NACIONAL">{(data.language==="es"? "Univ. Nacionales" : (data.language==="en"?"National Univ.":"Univ. Nacional"))}</option>
                <option data-valopt="3" value="INTERNACIONAL">{(data.language==="es"? "Univ. Internacionales" : (data.language==="en"?"International Univ.":"International Univ."))}</option>
                <option data-valopt="-1" value="TOD">{(data.language==="es"? "Todos los convenios" : (data.language==="en"?"All agreements":"Todos os contratos"))}</option>
            </select>
        </div>
    	<div className="col-md-12 w-100 mt-1" id="table-aggrets" ref={tableRef}>
            <DataTable
                columns={columns(data.language)}
                pagination
                striped
                className="table-wp"
                highlightOnHover
                paginationPerPage={15}
                paginationRowsPerPageOptions={[15, 30, 45, 60, 75]}
                paginationComponentOptions={{
                    rowsPerPageText: (data.language === "es" ? "Registros por página:" : (data.language === "en" ? "Rows per page:" : "Linhas por página:")),
                    rangeSeparatorText: (data.language === "en" ? "of" : "de"),
                    noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: (data.language === "en" ? "All" : "Todos")
                }}
                data={filteredItems}
                noDataComponent={data.language === "es" ? "No hay registros para mostrar" : (data.language === "en" ? "No records to show" : "Sem registros para exibir")}
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                responsive
            />
        </div>
    </div><br /></>);
}