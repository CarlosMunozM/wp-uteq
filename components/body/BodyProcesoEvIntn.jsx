import DOMPurify from 'isomorphic-dompurify';
import { WS_LIST_IMAGES_SLIDER_BY_ENTITY, EVAL_INTRN_DOCS_FOLDER } from 'config';
import React, { useState, useEffect, useMemo, memo } from "react";
import axios from 'axios';
import DataTable from 'react-data-table-component';

export { BodyProcesoEvIntn };

async function make_request_ws(path_url) {
    var listTemp = null;
    const https = require('https');
    const agent = new https.Agent({ rejectUnauthorized: false });

    try {
        await axios.get(path_url, { httpsAgent: agent }).then(function (response) {
            listTemp = response;
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            listTemp = null;
        });
    } catch (error) {
        console.log(error.message);
        listTemp = null;
    }

    return listTemp;
}

const TableHeader = memo(({ title, filterText, onFilter, language }) => (
    <>
        <style jsx>{`
            .table-header {
                gap: 20px;
            }

            @media (max-width: 464px) {
                .table-header {
                    flex-direction: column !important;
                    align-items: flex-start !important;
                }

                .table-header .dataTables_filter {
                    width: 100%;
                }

                .table-header .dataTables_filter label {
                    width: 100%;
                }

                .table-header .dataTables_filter input {
                    flex: 1;
                    width: auto;
                }
            }
        `}</style>

        <div className="table-header d-flex justify-content-between align-items-center w-100 mt-2 mb-2">
            <h2 className="msg-pnl-search mb-0">{title}</h2>
            <div className="dataTables_filter mb-0">
                <label className="mb-0 d-flex align-items-center">
                    <span className="mr-2">{language === "es" ? "Buscar:" : (language === "en" ? "Search:" : "Buscar:")}</span>
                    <input type="search" value={filterText} onChange={onFilter} aria-controls="tbl-list-images" />
                </label>
            </div>
        </div>
    </>
));

function BodyProcesoEvIntn(data) {

    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [filterTextInst, setFilterTextInst] = useState('');
    const [resetPaginationInst, setResetPaginationInst] = useState(false);
    const [filterTextCarrPos, setFilterTextCarrPos] = useState('');
    const [resetPaginationCarrPos, setResetPaginationCarrPos] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_IMAGES_SLIDER_BY_ENTITY}${data.data8.pwCodigo.trim()}`);
            setDatatbl((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);

    const getDescription = (item) => {
        if (data.language === "es") {
            return item.sldTitulo ? item.sldTitulo.trim() : "";
        } else if (data.language === "en") {
            return item.sldTituloEn ? item.sldTituloEn.trim() : "";
        }
        return item.sldTituloPt ? item.sldTituloPt.trim() : "";
    };

    const filteredItems = useMemo(() => {
        return datatbl.filter(item => getDescription(item).toLowerCase().includes(filterText.toLowerCase()));
    }, [datatbl, filterText, data.language]);

    // Filtra los documentos de tipo intitucional (INST) y los que no tienen tipo de documento definido
    const filteredItemsInst = useMemo(() => {
        return datatbl
            .filter(item => !item.sldTipoDoc || item.sldTipoDoc.trim().toUpperCase() === "INST")
            .filter(item => getDescription(item).toLowerCase().includes(filterTextInst.toLowerCase()));
    }, [datatbl, filterTextInst, data.language]);

    // Filtra los documentos de tipo carrera y programas (CARR_PROG)
    const filteredItemsCarrPos = useMemo(() => {
        return datatbl
            .filter(item => item.sldTipoDoc && item.sldTipoDoc.trim().toUpperCase() === "CARR_PROG")
            .filter(item => getDescription(item).toLowerCase().includes(filterTextCarrPos.toLowerCase()));
    }, [datatbl, filterTextCarrPos, data.language]);

    const DownloadFiles = row => (
        <a href={`${EVAL_INTRN_DOCS_FOLDER}${row.sldEnlace.trim()}`} target="_blank" rel="noopener noreferrer" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar recurso multimedia" : (data.language === "en" ? "Download multimedia resource" : "Descarregar recurso multimédia")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    );

    const PreviewFiles = row => (
        <a href="#" onClick={(e) => { e.preventDefault(); row.sldEnlace.includes(".pdf") && window.open(`${EVAL_INTRN_DOCS_FOLDER}${row.sldEnlace.trim()}`, "_blank", "fullscreen=yes"); }} className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Visualizar documento" : (data.language === "en" ? "Display document" : "Mostrar documento")}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    );

    const columns = useMemo(() => [
        {
            name: data.language === "es" ? "Descripción" : (data.language === "en" ? "Description" : "Descrição"),
            selector: row => data.language === "es" ? (row.sldTitulo ? row.sldTitulo.trim() : "") : (data.language === "en" ? (row.sldTituloEn ? row.sldTituloEn.trim() : "") : (row.sldTituloPt ? row.sldTituloPt.trim() : "")),
            sortable: true,
            width: '90%',
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
        }
    ], [data.language]);

    const paginationComponentOptions = useMemo(() => ({
        rowsPerPageText: data.language === "es" ? "Registros por página:" : (data.language === "en" ? "Rows per page:" : "Linhas por página:"),
        rangeSeparatorText: data.language === "en" ? "of" : "de",
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: data.language === "en" ? "All" : "Todos"
    }), [data.language]);

    const noDataMessage = data.language === "es" ? "No hay registros para mostrar" : (data.language === "en" ? "No records to show" : "Sem registros para exibir");

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    const handleFilter = (e) => setFilterText(e.target.value);
    const handleFilterInst = (e) => setFilterTextInst(e.target.value);
    const handleFilterCarrPos = (e) => setFilterTextCarrPos(e.target.value);

    return (
        <>
            <div className="row">
                <h2 className="title-cont-page text-center mt-2">{(data.data8 !== null && data.data8 !== "") ? (data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())) : "---"}</h2>

                {
                    data.language === "es" ? (
                        (data.data8.pwDescripcion !== null && data.data8.pwDescripcion !== '') ? <div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.pwDescripcion.trim())}></div> : ""
                    ) : (data.language === "en" ? (
                        (data.data8.pwDescripcionEn !== null && data.data8.pwDescripcionEn !== '') ? <div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.pwDescripcionEn.trim())}></div> : ""
                    ) : (
                        (data.data8.pwDescripcionPt !== null && data.data8.pwDescripcionPt !== '') ? <div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.pwDescripcionPt.trim())}></div> : ""
                    ))
                }

                {
                    data.shortUrlPage === 'autoevaluacion' ? (
                        <>
                            <div className="col-md-12 w-100">
                                <TableHeader
                                    title={data.language === "es" ? "Documentos institucionales" : (data.language === "en" ? "Institutional documents" : "Documentos institucionais")}
                                    filterText={filterTextInst}
                                    onFilter={handleFilterInst}
                                    language={data.language}
                                />

                                <DataTable
                                    columns={columns}
                                    pagination
                                    striped
                                    className="table-wp"
                                    highlightOnHover
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                                    paginationComponentOptions={paginationComponentOptions}
                                    data={filteredItemsInst}
                                    noDataComponent={noDataMessage}
                                    paginationResetDefaultPage={resetPaginationInst}
                                    responsive
                                />
                            </div>

                            <div className="col-md-12 w-100 mt-4">
                                <TableHeader
                                    title={data.language === "es" ? "Documentos de carreras y programas" : (data.language === "en" ? "Career and program documents" : "Documentos de carreiras e programas")}
                                    filterText={filterTextCarrPos}
                                    onFilter={handleFilterCarrPos}
                                    language={data.language}
                                />

                                <DataTable
                                    columns={columns}
                                    pagination
                                    striped
                                    className="table-wp"
                                    highlightOnHover
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                                    paginationComponentOptions={paginationComponentOptions}
                                    data={filteredItemsCarrPos}
                                    noDataComponent={noDataMessage}
                                    paginationResetDefaultPage={resetPaginationCarrPos}
                                    responsive
                                />
                            </div>
                        </>
                    ) : (
                        <div className="col-md-12 w-100">
                            <TableHeader
                                title={data.language === "es" ? "Documentos" : (data.language === "en" ? "Documents" : "Documentos")}
                                filterText={filterText}
                                onFilter={handleFilter}
                                language={data.language}
                            />

                            <DataTable
                                columns={columns}
                                pagination
                                striped
                                className="table-wp"
                                highlightOnHover
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                                paginationComponentOptions={paginationComponentOptions}
                                data={filteredItems}
                                noDataComponent={noDataMessage}
                                paginationResetDefaultPage={resetPaginationToggle}
                                responsive
                            />
                        </div>
                    )
                }
            </div>
        </>
    );
}