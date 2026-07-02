import DOMPurify from 'isomorphic-dompurify';
import { WS_LIST_IMAGES_SLIDER_BY_ENTITY, EVAL_INTRN_DOCS_FOLDER } from 'config';
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import DataTable from 'react-data-table-component';


export { BodyProcesoEvIntn };

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

function BodyProcesoEvIntn(data) {

    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_IMAGES_SLIDER_BY_ENTITY}${data.data8.pwCodigo.trim()}`);
            setDatatbl((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);

    const filteredItems = datatbl.filter(
        item => (data.language === "es" ? (item.sldTitulo && item.sldTitulo.toLowerCase().includes(filterText.toLowerCase())) :
            (data.language === "en" ? (item.sldTituloEn && item.sldTituloEn.toLowerCase().includes(filterText.toLowerCase())) :
                (item.sldTituloPt && item.sldTituloPt.toLowerCase().includes(filterText.toLowerCase())))),
    );

    const DownloadFiles = row => (<>
        <a href={`${EVAL_INTRN_DOCS_FOLDER}${row.sldEnlace.trim()}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar recurso multimedia" : (data.language === "en" ? "Download multimedia resource" : "Descarregar recurso multimédia")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const PreviewFiles = row => (<>
        <a href="#" onClick={() => { row.sldEnlace.includes(".pdf") && window.open(`${EVAL_INTRN_DOCS_FOLDER}${row.sldEnlace.trim()}`, "_blank", "fullscreen=yes"); return false }} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Visualizar documento" : (data.language === "en" ? "Display document" : "Mostrar documento")}>
            <i class="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const columns = (language) => [
        {
            name: (language === "es" ? "Descripción" : (language === "en" ? "Description" : "Descrição")),
            selector: row => (language === "es" ? row.sldTitulo.trim() : (language === "en" ? row.sldTituloEn.trim() : row.sldTituloPt.trim())),
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
        },
    ];

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

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{(data.data8 !== null && data.data8 !== "") ? (data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())) : "---"}</h2>
            {
                data.language === "es" ? (
                    (data.data8.pwDescripcion !== null && data.data8.pwDescripcion !== '') ? (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.pwDescripcion.trim())}></div></>) : ""
                ) : (data.language === "en" ? (
                    (data.data8.pwDescripcionEn !== null && data.data8.pwDescripcionEn !== '') ? (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.pwDescripcionEn.trim())}></div></>) : ""
                ) : (
                    (data.data8.pwDescripcionPt !== null && data.data8.pwDescripcionPt !== '') ? (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.pwDescripcionPt.trim())}></div></>) : ""
                ))
            }
            <h2 className="msg-pnl-search text-rigth mt-2">{data.language === "en" ? "Documents" : "Documentos"}</h2>
            <div className="col-md-12 w-100">
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
        </div>
    </>);

}