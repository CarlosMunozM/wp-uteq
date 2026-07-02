import { WS_LIST_PROJECTS_LKG } from 'config';
import DataTable from 'react-data-table-component';
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';


export { BodyProyectosVinc };

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

function BodyProyectosVinc(data) {

    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(WS_LIST_PROJECTS_LKG);
            setDatatbl((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);

    const filteredItems = datatbl.filter(
        item => (item.pvPeriodo && item.pvPeriodo.toLowerCase().includes(filterText.toLowerCase())) ||
            (data.language === "es" ? (item.pvCarrera && item.pvCarrera.toLowerCase().includes(filterText.toLowerCase())) : (data.language === "en" ?
                (item.pvCarreraEn && item.pvCarreraEn.toLowerCase().includes(filterText.toLowerCase())) :
                (item.pvCarreraPt && item.pvCarreraPt.toLowerCase().includes(filterText.toLowerCase())))) ||
            (item.pvDirector && item.pvDirector.toLowerCase().includes(filterText.toLowerCase())) ||
            (data.language === "es" ? (item.pvTitulo && item.pvTitulo.toLowerCase().includes(filterText.toLowerCase())) : (data.language === "en" ?
                (item.pvTituloEn && item.pvTituloEn.toLowerCase().includes(filterText.toLowerCase())) :
                (item.pvTituloPt && item.pvTituloPt.toLowerCase().includes(filterText.toLowerCase()))))
    );

    const ViewWebPageProject = row => (<>
        <a href={`/${data.language}/vinculacion/proyectos/${row.pvUrlParcial.trim()}`} className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ir a la página web del Proyecto" : (data.language === "en" ? "Go to the Project website" : "Ir para o website do Projecto")}>
            <i className="fa fa-globe fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const columns = (language) => [
        {
            name: '...',
            sortable: false,
            cell: row => <ViewWebPageProject {...row} />,
            width: '5%',
            center: true
        },
        {
            name: (language === "es" ? "Período" : (language === "en" ? "Period" : "Periodo")),
            selector: row => row.pvPeriodo.trim().toUpperCase(),
            sortable: true,
            width: '8%',
            filterable: true
        },
        {
            name: (language === "en" ? "Title" : "Título"),
            selector: row => (language === "es" ? row.pvTitulo.trim() : (language === "en" ? row.pvTituloEn.trim() : row.pvTituloPt.trim())),
            sortable: true,
            width: '52%',
            filterable: true
        },
        {
            name: (language === "es" ? "Carrera" : (language === "en" ? "Career" : "Carreira")),
            selector: row => (language === "es" ? row.pvCarrera.trim() : (language === "en" ? row.pvCarreraEn.trim() : row.pvCarreraPt.trim())),
            sortable: true,
            width: '20%',
            filterable: true
        },
        {
            name: (language === "es" ? "Director/a" : "Director"),
            selector: row => row.pvDirector.trim(),
            sortable: true,
            width: '15%',
            filterable: true
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


    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center">{data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())}</h2>
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
        </div>
    </>);

}