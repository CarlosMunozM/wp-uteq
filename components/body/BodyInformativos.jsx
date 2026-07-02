import { SliderImg } from "components";
import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { WS_LIST_NEWSPAPERS_ALL, NEWSPAPERS_FOLDER } from 'config';
import axios from 'axios';


export { BodyInformativos };


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

function BodyInformativos(data) {

    const listVidRS = (data.videos !== null && data.videos !== "") ? data.videos.filter(item => item.dmRespuesta.trim() === "RESM_SEM") : null;
    const listVidIV = (data.videos !== null && data.videos !== "") ? data.videos.filter(item => item.dmRespuesta.trim() === "UTEQ_INV") : null;
	const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	
	useEffect(() => {
        (async () => {
            const result = await make_request_ws(WS_LIST_NEWSPAPERS_ALL);
            setDatatbl((result.data !== null && result.data !== "") ?
                result.data.sort((a, b) => {
                    if (a.anio !== b.anio) {
                        return b.anio - a.anio;
                    }
                    return b.mes - a.mes;
                }) : []);
        })();
    }, []);

	const ViewDocumentPDF = row => (<>
        <a href={row.urlpw} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar documento" : (data.language === "en" ? "Download document" : "Baixar documento")}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </>);

	const getMonthName = (monthNumber, language) => {
        const months = {
            es: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ],
            en: [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            pt: [
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ]
        };

        if (monthNumber < 1 || monthNumber > 12) {
            return "Mes inválido";
        }

        return months[language][monthNumber - 1];
    };

	const columns = (language) => [
        {
            name: '...',
            sortable: false,
            cell: (row) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={`${NEWSPAPERS_FOLDER}${row.urlportada}`}
                        alt="Miniatura"
                        style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                    />
                </div>
            ),
            width: '30%',
            center: true
        },
        {
            name: (language === "es" ? "Año" : (language === "en" ? "Year" : "Ano")),
            selector: row => row.anio,
            sortable: true,
            width: '30%',
            filterable: true
        },
        {
            name: (language === "es" ? "Mes" : (language === "en" ? "Month" : "Mês")),
            selector: row => getMonthName(row.mes, language),
            sortable: true,
            width: '30%',
            filterable: true,
            center: true
        },
        {
            name: '...',
            sortable: false,
            cell: row => <ViewDocumentPDF {...row} />,
            width: '10%',
            center: true
        },
    ];

	const filteredItems = datatbl.filter(item => {
        const year = item.anio;
        const monthText = getMonthName(item.mes, data.language).toLowerCase();

        const yearMatches = year.toString().includes(filterText.toLowerCase());
        const monthMatches = monthText.includes(filterText.toLowerCase());

        return yearMatches || monthMatches;
    });

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
        <h2 className="title-cont-page text-center">{data.language === "es" ? "Periódico Universitario" : (data.language === "en" ? "University Newspaper" : "Jornal da Universidade")}</h2><br />
        <div className="col-md-12 w-100">
            {(data.newspapers !== null && data.newspapers !== "") && SliderImg(data.newspapers, 23, 3000, 1000)}
        </div><br />
        <div className="row justify-content-center pt-3">
            <div className="col-md-12 pd-3 text-center">
            {/*<a href="https://issuu.com/universidadtecnicaestataldequevedo" target="_blank"
                    className="btn-tp mr-2"><i className="fa fa-link"></i> {data.language === "es" ? "Ver más" : (data.language === "en" ? "See more" : "Ver mais")}</a>*/}
            <a className="btn-tp mr-2"
                    onClick={() => { setModalShow(true) }}>
                    <i className="fa fa-link"></i> {data.language === "es" ? "Ver más" : (data.language === "en" ? "See more" : "Ver mais")}</a>
            </div>
        	<Modal
                size="md"
                show={modalShow}
                onHide={handleClose}
                animation={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {data.language === "es" ? "Periódico Universitario" : (data.language === "en" ? "University Newspaper" : "Jornal da Universidade")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row g-0">
                        <div className="col-md-12 w-100 mt-2">
                                <DataTable
                                    columns={columns(data.language)}
                                    pagination
                                    striped
                                    className="table-wp-newspaper"
                                    highlightOnHover
                                    fixedHeader
                                    fixedHeaderScrollHeight="340px"
                                    paginationPerPage={2}
                                    paginationRowsPerPageOptions={[2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]}
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
                </Modal.Body>
            </Modal>
        </div><hr />
        <h2 className="title-cont-page text-center">{data.language === "es" ? "Resumen semanal de noticias" : (data.language === "en" ? "Weekly news round-up" : "Resumo semanal de notícias")}</h2><br />
        {(listVidRS !== null && listVidRS !== "") ? SliderImg(listVidRS[0].dpListadoVideos, 24, 3000, 1000) : ""}<br />
        <div className="row justify-content-center pt-3">
            <div className="col-md-12 pd-3 text-center">
                <a href="https://www.youtube.com/playlist?list=PLn-ZemkYzL41arJqFbwcityXr-DnwdZQF" target="_blank" className="btn-tp mr-2"><i className="fa fa-link"></i> {data.language === "es" ? "Ver más" : (data.language === "en" ? "See more" : "Ver mais")}</a>
            </div>
        </div><hr />
        <h2 className="title-cont-page text-center">{data.language === "es" ? "UTEQ Investiga" : (data.language === "en" ? "UTEQ Research" : "Investigação UTEQ")}</h2><br />
        {(listVidIV !== null && listVidIV !== "") ? SliderImg(listVidIV[0].dpListadoVideos, 25, 3000, 1000) : ""}<br />
        <div className="row justify-content-center pt-3">
            <div className="col-md-12 pd-3 text-center">
                <a href="https://www.youtube.com/playlist?list=PLn-ZemkYzL41INEv4eLBmg3c7hFDwt25D" target="_blank" className="btn-tp mr-2"><i className="fa fa-link"></i> {data.language === "es" ? "Ver más" : (data.language === "en" ? "See more" : "Ver mais")}</a>
            </div>
        </div>
    </>);

}