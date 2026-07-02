import DataTable from 'react-data-table-component';
import { FILES_UNIV_DOCS_FOLDER, WS_LIST_SHORT_FILES_UNIV_LANGUAGES } from 'config';
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';


export { BodyArchivo };

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

function BodyArchivo(data) {

    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_SHORT_FILES_UNIV_LANGUAGES}ARCHV`);
            setDatatbl((result.data !== null && result.data !== "") ? result.data.sort((a, b) => (a.arFechaPublc > b.arFechaPublc) ? -1 : 1) : []);
        })();
    }, []);

    const DownloadFiles = row => (<>
        <a href={`${FILES_UNIV_DOCS_FOLDER}${row.arUrlDocumento}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar documento" : (data.language === "en" ? "Download document" : "Baixar documento")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const PreviewFiles = row => (<>
        <a href="#" onClick={() => { row.arUrlDocumento.includes(".pdf") && window.open(`${FILES_UNIV_DOCS_FOLDER}${row.arUrlDocumento}`, "_blank", "fullscreen=yes"); return false }} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Visualizar documento" : (data.language === "en" ? "View document" : "Exibir documento")}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const columns = (language) => [
        {
            name: (language === "es" ? "Nombre de archivo" : (language === "en" ? "Filename" : "Nome do arquivo")),
            selector: row => (language === "es" ? row.arDescripcion.trim() : (language === "en" ? row.arDescripcionEn.trim() : row.arDescripcionPt.trim())),
            sortable: true,
            width: '65%',
            filterable: true
        },
        {
            name: (language === "es" ? "Fecha de publicación" : (language === "en" ? "Publication date" : "Data de publicação")),
            selector: row => row.arFechaPublc,
            sortable: true,
            width: '25%',
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
        {
            name: '...',
            sortable: false,
            cell: row => <PreviewFiles {...row} />,
            width: '5%',
            center: true
        },
    ];

    const filteredItems = datatbl.filter(
        item => (data.language === "es" ? (item.arDescripcion && item.arDescripcion.toLowerCase().includes(filterText.toLowerCase())) :
            (data.language === "en" ? (item.arDescripcionEn && item.arDescripcionEn.toLowerCase().includes(filterText.toLowerCase())) :
                (item.arDescripcionPt && item.arDescripcionPt.toLowerCase().includes(filterText.toLowerCase())))),
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
            <h2 className="title-cont-page text-center mt-2">{data.titlepage}</h2>
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