import { SliderImg } from "components";
import DataTable from 'react-data-table-component';
import { GENERAL_IMGS_FOLDER, LOGOS_FOLDER, WS_LIST_SHORT_FILES_IMAGES_UNIV_BY_TYPE_LANG } from 'config';
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';

export { BodyIdentCorp };


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

function BodyIdentCorp(data) {

    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_SHORT_FILES_IMAGES_UNIV_BY_TYPE_LANG}LOGOT`);
            setDatatbl((result.data !== null && result.data !== "") ? result.data.sort((a, b) => (a.arOrdenDocs > b.arOrdenDocs) ? 1 : -1) : []);
        })();
    }, []);

    const filteredItems = datatbl.filter(
        item => item.arDescripcion && item.arDescripcion.toLowerCase().includes(filterText.toLowerCase()),
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

    const columns = (language) => [
        {
            name: (language === "es" ? 'Nombre' : (language === "en" ? "Name" : "Nome")),
            selector: row => (language === "es" ? row.arDescripcion.trim() : (language === "en" ? row.arDescripcionEn.trim() : row.arDescripcionPt.trim())),
            sortable: true,
            width: '45%',
            filterable: true
        },
        {
            name: (language === "es" ? 'Información' : (language === "en" ? "Information" : "Informação")),
            selector: row => (language === "es" ? row.arInformacion.trim() : (language === "en" ? row.arInformacionEn.trim() : row.arInformacionPt.trim())),
            sortable: true,
            width: '25%',
            filterable: true
        },
        {
            name: (language === "en" ? "State" : 'Estado'),
            selector: row => row.arEstado,
            cell: row => (row.arEstado === 1 ? (language === "es" ? "Vigente" : (language === "en" ? "Applicable" : "Em vigor")) : (language === "es" ? "No vigente" : (language === "en" ? "Not applicable" : "Não em vigor"))),
            sortable: true,
            center: true,
            width: '15%',
            filterable: true
        },
        {
            name: '...',
            sortable: false,
            cell: row => <DownloadFiles {...row} />,
            width: '15%',
            center: true
        },
    ];

    const DownloadFiles = row => (<>{
        (row.arUrlDocumento !== null && row.arUrlDocumento !== "") ? (<><a href={`${LOGOS_FOLDER}files/${row.arUrlDocumento.trim()}`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={(data.language === "es" ? "Descargar archivo" : (data.language === "en" ? "Download file" : "Descarregar ficheiro"))}>
            <img src={`${GENERAL_IMGS_FOLDER}icon-ai.png`} className="p-2 icon-ic" alt={(data.language === "es" ? "Icono Archivo" : (data.language === "en" ? "Icon File" : "Ficheiro de Ícones"))} />
        </a></>) : (<>
            {
                (row.arUrlAI !== null && row.arUrlAI !== "") && (<><a href={`${LOGOS_FOLDER}ai/${row.arUrlAI}`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={(data.language === "es" ? "Descargar archivo AI" : (data.language === "en" ? "Download AI file" : "Descarregar ficheiro AI"))}>
                    <img src={`${GENERAL_IMGS_FOLDER}icon-ai.png`} className="p-2 icon-ic" alt={(data.language === "es" ? "Icono AI" : (data.language === "en" ? "Icon AI" : "Ícone AI"))} />
                </a></>)
            }
            {
                (row.arUrlPNG !== null && row.arUrlPNG !== "") && (<><a href={`${LOGOS_FOLDER}png/${row.arUrlPNG}`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={(data.language === "es" ? "Descargar imagen PNG" : (data.language === "en" ? "Download PNG image" : "Descarregar imagem PNG"))}>
                    <img src={`${GENERAL_IMGS_FOLDER}icon-png.png`} className="p-2 icon-ic" alt={(data.language === "es" ? "Icono PNG" : (data.language === "en" ? "Icon PNG" : "Ícone PNG"))} />
                </a></>)
            }
            {
                (row.arUrlJPG !== null && row.arUrlJPG !== "") && (<><a href={`${LOGOS_FOLDER}jpg/${row.arUrlJPG}`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={(data.language === "es" ? "Descargar imagen JPG" : (data.language === "en" ? "Download JPG image" : "Descarregar imagem JPG"))}>
                    <img src={`${GENERAL_IMGS_FOLDER}icon-jpg.png`} className="p-2 icon-ic" alt={(data.language === "es" ? "Icono JPG" : (data.language === "en" ? "Icon JPG" : "Ícone JPG"))} />
                </a></>)
            }
        </>)
    }</>);

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Identidad Universitaria" : (data.language === "en" ? "University Identity" : "Identidade Universitária")}</h2>
            <div className="col-md-12 w-100 mt-3">
                {(data.slider1 !== null && data.slider1 !== "") && SliderImg(data.slider1, 6, 2500, 900)}
            </div><br />
            <h2 className="title-cont-page text-rigth mt-5">{data.language === "es" ? "Logotipos" : "Logos"}</h2>
            <div className="col-md-12 w-100 mt-2">
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
            <h2 className="title-cont-page text-rigth mt-5">{data.language === "es" ? "Insumos de comunicación" : (data.language === "en" ? "Communication resources" : "Recursos de comunicação")}</h2>
            <div className="col-md-12 w-100 mt-3">
                {(data.slider2 !== null && data.slider2 !== "") && SliderImg(data.slider2, 86, 2500, 900)}
            </div><br />
        </div><br />
    </>);
}