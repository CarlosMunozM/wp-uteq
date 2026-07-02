import DOMPurify from 'isomorphic-dompurify';
import DataTable from 'react-data-table-component';
import { WS_LIST_FILES_UNIV_BY_TYPE, INV_NORM_DOCS_FOLDER, INV_DOCS_FOLDER, PHOTOS_FOLDER } from 'config';
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { Badge } from 'react-bootstrap';


export { BodyInvestigacion };

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

function BodyInvestigacion(data) {

    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_FILES_UNIV_BY_TYPE}NRMIV`);
            setDatatbl((result.data !== null && result.data !== "") ? (result.data.sort((a, b) => (a.arDescripcion > b.arDescripcion) ? 1 : -1)) : []);
        })();
    }, []);

    const filteredItems = datatbl.filter(
        item => data.language === "es" ? (item.arDescripcion && item.arDescripcion.toLowerCase().includes(filterText.toLowerCase())) :
            (data.language === "en" ? (item.arDescripcionEn && item.arDescripcionEn.toLowerCase().includes(filterText.toLowerCase())) :
                (item.arDescripcionPt && item.arDescripcionPt.toLowerCase().includes(filterText.toLowerCase()))),
    );

    const DownloadFiles = row => (<>
        <a href={`${INV_NORM_DOCS_FOLDER}${row.arUrlDocumento}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar documento" : (data.language === "en" ? "Download document" : "Baixar documento")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const columns = (language) => [
        {
            name: '...',
            sortable: false,
            cell: row => <DownloadFiles {...row} />,
            width: '5%',
            center: true
        },
        {
            name: (language === "es" ? "Fecha de aprobación" : (language === "en" ? "Date of approval" : "Data de aprovação")),
            selector: row => row.arFechaPublc.trim(),
            sortable: true,
            width: '20%',
            filterable: true
        },
        {
            name: (language === "es" ? "Descripción" : (language === "en" ? "Description" : "Descrição")),
            selector: row => (language === "es" ? row.arDescripcion.trim() : (language === "en" ? row.arDescripcionEn.trim() : row.arDescripcionPt.trim())),
            sortable: true,
            width: '75%',
            filterable: true
        },
    ];

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    const style_img = {
        width: "100%",
        height: "100%"
    };

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

    function getTitlesByAuthority(dataTitle) {
        var titles = '';
        if (dataTitle.length > 0) {

            dataTitle.map((item) => (
                titles += (titles, item.taTituloRec.trim() + ". ")
            ));

        }
        return titles.trim();
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{data.language === "es" ? data.data8.dpNombre.trim() : (data.language === "en" ? data.data8.dpNombreEn.trim() : data.data8.dpNombrePt.trim())}</h2>
            {
                data.language === "es" ? (
                    (data.data8.dpVision !== null && data.data8.dpVision !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpVision.trim())}></div></>) : ""
                ) : (data.language === "en" ? (
                    (data.data8.dpVisionEn !== null && data.data8.dpVisionEn !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpVisionEn.trim())}></div></>) : ""
                ) : (
                    (data.data8.dpVisionPt !== null && data.data8.dpVisionPt !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpVisionPt.trim())}></div></>) : ""
                ))
            }
            {
                data.language === "es" ? (
                    (data.data8.dpMision !== null && data.data8.dpMision !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMision.trim())}></div></>) : ""
                ) : (data.language === "en" ? (
                    (data.data8.dpMisionEn !== null && data.data8.dpMisionEn !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMisionEn.trim())}></div></>) : ""
                ) : (
                    (data.data8.dpMisionPt !== null && data.data8.dpMisionPt !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMisionPt.trim())}></div></>) : ""
                ))
            }
            {
                data.language === "es" ? (
                    (data.data8.dpObjetivos !== null && data.data8.dpObjetivos !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpObjetivos.trim())}></div></>) : ""
                ) : (data.language === "en" ? (
                    (data.data8.dpObjetivosEn !== null && data.data8.dpObjetivosEn !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpObjetivosEn.trim())}></div></>) : ""
                ) : (
                    (data.data8.dpObjetivosPt !== null && data.data8.dpObjetivosPt !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpObjetivosPt.trim())}></div></>) : ""
                ))
            }
            {
                (data.authort !== "" && data.authort !== null) ? (<>
                    <h2 className="msg-pnl-search text-right">{data.language === "es" ? "Correo electrónico" : (data.language === "en" ? "E-mail" : "Endereço electrónico")}</h2>
                    {
                        (data.authort.auCorreoElect !== null && data.authort.auCorreoElect !== '') ? (<>
                            <a href={`mailto:${data.authort.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Comunicación vía correo electrónico" : (data.language === "en" ? "Communication via e-mail" : "Comunicação via e-mail")} style={{ textDecoration: 'none' }}>
                                <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{data.authort.auCorreoElect.trim()}</Badge>
                            </a>
                        </>) : (<></>)
                    }
                </>) : (<></>)
            }
            <div className="col-md-12 w-100 mt-3">
                <div className="ratio ratio-21x9">
                    <a href={`${INV_DOCS_FOLDER}docx-uteq-plan-investigacion.pdf`} target="_blank" aria-label="link plan de investigacion" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar Plan de Investigación" : (data.language === "en" ? "Download Research Plan" : "Descarregar Plano de Investigação")}>
                        <img src={`/assets/img/${data.language === "es" ? "descargar-plan-investigacion-2021-2025-uteq-es.jpg" : (data.language === "en" ? "descargar-plan-investigacion-2021-2025-uteq-en.jpg" : "descargar-plan-investigacion-2021-2025-uteq-pt.jpg")}`} className="img-fluid" alt={data.language === "es" ? "Descargar Plan de Investigación" : (data.language === "en" ? "Download Research Plan" : "Descarregar Plano de Investigação")} />
                    </a>
                </div>
            </div>
            <h2 className="title-cont-page text-center mt-4">{data.language === "es" ? "Normativas" : (data.language === "en" ? "Regulations" : "Regulamentos")}</h2>
            <div className="col-md-12 w-100 mt-1">
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
        </div>
    </>);

}