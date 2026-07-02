import DataTable from 'react-data-table-component';
import { FORMATS_DOCS_FOLDER, WS_LIST_SHORT_FILES_FORMTS_UNIV_BY_TYPE_LANG } from 'config';
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';

export { BodyFormatoSolc };




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

function BodyFormatoSolc(data) {

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
        <a href={`${FORMATS_DOCS_FOLDER}${row.arUrlDocumento}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar documento institucional" : (data.language === "en" ? "Download institutional document" : "Descarregar documento institucional")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const columns = (language) => [
        {
            name: (language === "en" ? "Title" : "Título"),
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
        item => (data.language === "es" ? (
            (item.arInformacion && item.arInformacion.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.arSolicitante && item.arSolicitante.toLowerCase().includes(filterText.toLowerCase()))
        ) :
            (data.language === "en" ? (
                (item.arInformacionEn && item.arInformacionEn.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.arSolicitanteEn && item.arSolicitanteEn.toLowerCase().includes(filterText.toLowerCase()))
            ) :
                (
                    (item.arInformacionPt && item.arInformacionPt.toLowerCase().includes(filterText.toLowerCase())) ||
                    (item.arSolicitantePt && item.arSolicitantePt.toLowerCase().includes(filterText.toLowerCase()))
                )))
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

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Formatos de solicitudes" : (data.language === "en" ? "Application forms" : "Formulários de candidatura")}</h2>
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
        </div><br />
    </>);
}