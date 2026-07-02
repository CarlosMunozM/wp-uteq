import DOMPurify from 'isomorphic-dompurify';
import DataTable from 'react-data-table-component';
import { WS_LIST_FILES_UNIV_BY_TYPE, TRAB_SOC_UBU_DOCS_FOLDER, } from 'config';
import { PanelMetrics } from 'components';
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';

export { BodyTrabajoSocial };

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

function BodyTrabajoSocial(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_FILES_UNIV_BY_TYPE}TRBSC`);
            setDatatbl((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);

    const DownloadFiles = row => (<>
        <a href={`${TRAB_SOC_UBU_DOCS_FOLDER}${row.arUrlDocumento}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar documento" : (data.language === "en" ? "Download document" : "Baixar documento")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const columns = (language) => [
        {
            name: (language === "es" ? "Descripción" : (language === "en" ? "Description" : "Descrição")),
            selector: row => (language === "es" ? row.arDescripcion.trim() : (language === "en" ? row.arDescripcionEn.trim() : row.arDescripcionPt.trim())),
            sortable: true,
            width: '95%',
            filterable: true
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
            {
                data.language === "es" ? ((data.data8.pwNombre !== null && data.data8.pwNombre !== '') && (<><h2 className="title-cont-page text-center mt-2">{data.data8.pwNombre}</h2></>)) :
                    (data.language === "en" ? ((data.data8.pwNombreEn !== null && data.data8.pwNombreEn !== '') && (<><h2 className="title-cont-page text-center mt-2">{data.data8.pwNombreEn}</h2></>)) :
                        (data.data8.pwNombrePt !== null && data.data8.pwNombrePt !== '') && (<><h2 className="title-cont-page text-center mt-2">{data.data8.pwNombrePt}</h2></>))
            }
            {
                data.language === "es" ? ((data.data8.pwDescripcion !== null && data.data8.pwDescripcion !== '') && (<><div className="col-md-12 paragraph-cont w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.pwDescripcion.trim())}></div></>)) :
                    (data.language === "en" ? ((data.data8.pwDescripcionEn !== null && data.data8.pwDescripcionEn !== '') && (<><div className="col-md-12 paragraph-cont w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.pwDescripcionEn.trim())}></div></>)) :
                        (data.data8.pwDescripcionPt !== null && data.data8.pwDescripcionPt !== '') && (<><div className="col-md-12 paragraph-cont w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.pwDescripcionPt.trim())}></div></>))

            }
            {
                data.language === "es" ? ((data.data8.pwObjetivos !== null && data.data8.pwObjetivos !== '') && (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivos)}></div></>)) :
                    (data.language === "en" ? ((data.data8.pwObjetivosEn !== null && data.data8.pwObjetivosEn !== '') && (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivosEn)}></div></>)) :
                        ((data.data8.pwObjetivosPt !== null && data.data8.pwObjetivosPt !== '') && (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivosPt)}></div></>)))

            }
            <div className="paragraph-cont">
                {
                    (data.data8.pwCorreos !== null && data.data8.pwCorreos !== '') && (<><h3 className="msg-pnl-search text-right">{data.language === "es" ? "Correos" : (data.language === "en" ? "Email" : "Correio electrónico")}</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwCorreos.trim())}></p></>)
                }
                {
                    data.language === "es" ? ((data.data8.pwHorario !== null && data.data8.pwHorario !== '') && (<><h3 className="msg-pnl-search text-right">Horarios de atención</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwHorario.trim())}></p></>)) :
                        (data.language === "en" ? ((data.data8.pwHorarioEn !== null && data.data8.pwHorarioEn !== '') && (<><h3 className="msg-pnl-search text-right">Opening hours</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwHorarioEn.trim())}></p></>)) :
                            ((data.data8.pwHorarioPt !== null && data.data8.pwHorarioPt !== '') && (<><h3 className="msg-pnl-search text-right">Horário de abertura</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwHorarioPt.trim())}></p></>)))

                }
            </div>
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Estadísticas" : (data.language === "en" ? "Statistics" : "Estatísticas")}</h2>
            {(data.datamtc !== null && data.datamtc !== "") && (data.datamtc.length > 0 && PanelMetrics(data.datamtc, 1, 2))}
            <div className="col-md-12 w-100">
                {
                    datatbl.length > 0 && (<>
                        <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Documentos de interés" : (data.language === "en" ? "Documents of interest" : "Documentos de interesse")}</h2>
                        <DataTable
                            columns={columns(data.language)}
                            pagination
                            striped
                            className="table-wp"
                            highlightOnHover
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
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
                        /></>)
                }
            </div>
        </div>
    </>);
}

