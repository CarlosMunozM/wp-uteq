import DataTable from 'react-data-table-component';
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { WS_LIST_RESEARCH_PROJECTS } from 'config';

export { BodyProyectosInvst };

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

function BodyProyectosInvst(data) {

    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(WS_LIST_RESEARCH_PROJECTS);
            setDatatbl((result.data !== null && result.data !== "") ? (result.data.sort((a, b) => (Number(new Date(b.ptFechaInicio)) - Number(new Date(a.ptFechaInicio))))) : []);
        })();
    }, []);

    const filteredItems = datatbl.filter(
        item => (data.language === "es" ? (
            (item.ptNombre && item.ptNombre.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.ptConvocatoria && item.ptConvocatoria.toLowerCase().includes(filterText.toLowerCase()))
        ) : (data.language === "en" ? (
            (item.ptNombreEn && item.ptNombreEn.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.ptConvocatoriaEn && item.ptConvocatoriaEn.toLowerCase().includes(filterText.toLowerCase()))
        ) : (
            (item.ptNombrePt && item.ptNombrePt.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.ptConvocatoriaPt && item.ptConvocatoriaPt.toLowerCase().includes(filterText.toLowerCase()))
        ))) || (`${changeFormatMonth(item.ptFechaInicio.substr(5, 2), data.language)}, ${item.ptFechaInicio.substr(0, 4)}` &&
            `${changeFormatMonth(item.ptFechaInicio.substr(5, 2), data.language)}, ${item.ptFechaInicio.substr(0, 4)}`.toLowerCase().includes(filterText.toLowerCase()))
    );

    const WebPageLink = row => (<>
        <a href={`/${data.language}/investigacion/proyecto/${row.ptUrlParcial.trim()}`} className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ir a la página web del Proyecto de Investigación" : (data.language === "en" ? "Go to the Research Project website" : "Ir para o sítio Web do Projecto de Investigação")}>
            <i className="fa fa-globe fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    function changeFormatMonth(mes, language) {
        switch (mes) {
            case "1":
            case "01":
                return (language === "es" ? "Enero" : (language === "en" ? "January" : "Janeiro"));
            case "2":
            case "02":
                return (language === "es" ? "Febrero" : (language === "en" ? "February" : "Fevereiro"));
            case "3":
            case "03":
                return (language === "es" ? "Marzo" : (language === "en" ? "March" : "Março"));
            case "4":
            case "04":
                return (language === "es" ? "Abril" : (language === "en" ? "April" : "Abril"));
            case "5":
            case "05":
                return (language === "es" ? "Mayo" : (language === "en" ? "May" : "Maio"));
            case "6":
            case "06":
                return (language === "es" ? "Junio" : (language === "en" ? "June" : "Junho"));
            case "7":
            case "07":
                return (language === "es" ? "Julio" : (language === "en" ? "July" : "Julho"));
            case "8":
            case "08":
                return (language === "es" ? "Agosto" : (language === "en" ? "August" : "Agosto"));
            case "9":
            case "09":
                return (language === "es" ? "Septiembre" : (language === "en" ? "September" : "Setembro"));
            case "10":
                return (language === "es" ? "Octubre" : (language === "en" ? "October" : "Outubro"));
            case "11":
                return (language === "es" ? "Noviembre" : (language === "en" ? "November" : "Novembro"));
            case "12":
                return (language === "es" ? "Diciembre" : (language === "en" ? "December" : "Dezembro"));
        }
    }

    const columns = (language) => [
        {
            name: "Web",
            sortable: false,
            cell: row => <WebPageLink {...row} />,
            width: '5%',
            center: true
        },
    	{
            name: "Convocatoria",
            sortable: true,
            cell: row => (language === "es" ? row.ptConvocatoria.trim() : (language === "en" ? row.ptConvocatoriaEn.trim() : row.ptConvocatoriaPt.trim())),
            width: '15%',
            center: true,
            filterable: true
        },
        {
            name: (language === "es" ? "Inicio" : (language === "en" ? "Start" : "Início")),
            selector: row => `${changeFormatMonth(row.ptFechaInicio.substr(5, 2), language)}, ${row.ptFechaInicio.substr(0, 4)}`,
            sortable: true,
            width: '15%',
            filterable: true
        },
        {
            name: (language === "en" ? "Title" : "Título"),
            selector: row => (language === "es" ? row.ptNombre.trim() : (language === "en" ? row.ptNombreEn.trim() : row.ptNombrePt.trim())),
            sortable: true,
            width: '65%',
            filterable: true
        }
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
            <h2 className="title-cont-page text-center mb-3">{data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())}</h2>
            <div className="col-md-12 w-100 mt-2">
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
                        noRowsPerPage: false, selectAllRowsItem: false,
                        selectAllRowsItemText: (data.language === "en" ? "All" : "Todos")
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