import DOMPurify from 'isomorphic-dompurify';
import DataTable from 'react-data-table-component';
import { LOTAIP_DOCS_FOLDER, WS_SORT_LIST_FILES_TP_UNIV_BY_TYPE } from 'config';
import React, { useState, useEffect, useMemo } from "react";
import { Accordion } from "react-bootstrap";
import axios from 'axios';

export { BodyTransparencia };


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

function BodyTransparencia(data) {
    const [datatbl, setDatatbl] = useState([]);
    const [activeMonths, setActiveMonths] = useState({});
    const rows = [];

    for (let i = new Date().getFullYear(); i >= 2015; i--) {
        rows.push(i);
    }
	
    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_SORT_LIST_FILES_TP_UNIV_BY_TYPE}TRSPR`);
            const initialActiveMonths = {};

            setDatatbl(result.data);
            rows.forEach(year => {
                initialActiveMonths[year] = null;
            });
            setActiveMonths(initialActiveMonths);
        })();
    }, []);

    const handleMonthClick = (year, month) => {
        setActiveMonths(prevState => ({
            ...prevState,
            [year]: month
        }));
    };

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const renderTextInfo = (dataInfoInst) => {
        return (<>
            <div className="row" dangerouslySetInnerHTML={sanitizedData(data.language === "es" ? dataInfoInst.data8.pwDescripcion.trim() : (data.language === "en" ? dataInfoInst.data8.pwDescripcionEn.trim() : dataInfoInst.data8.pwDescripcionPt.trim()))}></div>
        </>);
    }

    const DownloadFiles = row => (<>
        <a href={`${/(http:\/\/|https:\/\/|www\.|ftp\.)/.test(row.arUrlDocumento) ? row.arUrlDocumento : (row.arInformacion.includes('b2') || row.arInformacion.includes('c')) ? `${LOTAIP_DOCS_FOLDER}informacion.pdf` : `${LOTAIP_DOCS_FOLDER}${row.arAnio}/${changeFormatMonthURL(row.arMes)}/${row.arUrlDocumento}`}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Enlace" : (data.language === "en" ? "Link" : "Ligação")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const PreviewFiles = row => (<>
        <a href="#" onClick={() => {
            if (/http:\/\/|https:\/\/|www\.|ftp\./.test(row.arUrlDocumento)) {
                window.open(row.arUrlDocumento, "_blank", "fullscreen=yes");
            } else if (row.arUrlDocumento.includes(".pdf")) {
                window.open(
                    `${(row.arInformacion.includes('b2') || row.arInformacion.includes('c')) ? `${LOTAIP_DOCS_FOLDER}informacion.pdf` : `${LOTAIP_DOCS_FOLDER}${row.arAnio}/${changeFormatMonthURL(row.arMes)}/${row.arUrlDocumento}`}`,
                    "_blank",
                    "fullscreen=yes"
                );
            }
            return false;
        }}
            target="_blank"
            className="btn-table"
            data-toggle="tooltip"
            data-placement="bottom"
            title={data.language === "es" ? "Visualizar documento" : (data.language === "en" ? "Display document" : "Mostrar documento")}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    /*const DownloadCSVFiles = (row, tpBtn) => (<>
        <a href={`${/(http:\/\/|https:\/\/|www\.|ftp\.)/.test(tpBtn === 1 ? row.row.arUrlDocumento : (tpBtn === 2 ? row.row.arUrlDocumento2 : row.row.arUrlDocumento3)) ? (tpBtn === 1 ? row.row.arUrlDocumento : (tpBtn === 2 ? row.row.arUrlDocumento2 : row.row.arUrlDocumento3)) : `${LOTAIP_DOCS_FOLDER}${row.row.arAnio}/${changeFormatMonthURL(row.row.arMes)}/${row.row.arSolicitante}/${tpBtn === 1 ? row.row.arUrlDocumento : (tpBtn === 2 ? row.row.arUrlDocumento2 : row.row.arUrlDocumento3)}`}`}
            target="_blank"
            className="btn-table"
            data-toggle="tooltip"
            data-placement="bottom"
            title={data.language === "es" ? "Descargar archivo" : (data.language === "en" ? "Download file" : "Baixar arquivo")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    </>);*/

	const DownloadCSVFiles = ({ row, tpBtn }) => {
        // Extrayendo propiedades de 'row'
        const { arAnio, arMes, arSolicitante, arUrlDocumento, arUrlDocumento2, arUrlDocumento3 } = row;

        // Función para cambiar el formato de la URL del mes
        const formattedMonthURL = changeFormatMonthURL(arMes);

        // Verificando si la URL es una URL válida
        const isValidURL = /(http:\/\/|https:\/\/|www\.|ftp\.)/.test(
            tpBtn === 1 ? arUrlDocumento : tpBtn === 2 ? arUrlDocumento2 : arUrlDocumento3
        );

        // Construyendo la URL de descarga
        const downloadURL = isValidURL
            ? tpBtn === 1 ? arUrlDocumento : tpBtn === 2 ? arUrlDocumento2 : arUrlDocumento3
            : `${LOTAIP_DOCS_FOLDER}${arAnio}/${formattedMonthURL}/${arSolicitante}/${tpBtn === 1 ? arUrlDocumento : tpBtn === 2 ? arUrlDocumento2 : arUrlDocumento3
            }`;

        return (
            <>
                <a
                    href={downloadURL}
                    target="_blank"
                    className="btn-table"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={
                        data.language === "es"
                            ? "Descargar archivo"
                            : data.language === "en"
                                ? "Download file"
                                : "Baixar arquivo"
                    }
                >
                    <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
                </a>
            </>
        );
    };

    function changeFormatMonth(mes, language) {
        switch (mes) {
            case 1:
                return (language === "es" ? "Enero" : (language === "en" ? "January" : "Janeiro"));
            case 2:
                return (language === "es" ? "Febrero" : (language === "en" ? "February" : "Fevereiro"));
            case 3:
                return (language === "es" ? "Marzo" : (language === "en" ? "March" : "Março"));
            case 4:
                return (language === "es" ? "Abril" : (language === "en" ? "April" : "Abril"));
            case 5:
                return (language === "es" ? "Mayo" : (language === "en" ? "May" : "Maio"));
            case 6:
                return (language === "es" ? "Junio" : (language === "en" ? "June" : "Junho"));
            case 7:
                return (language === "es" ? "Julio" : (language === "en" ? "July" : "Julho"));
            case 8:
                return (language === "en" ? "August" : "Agosto");
            case 9:
                return (language === "es" ? "Septiembre" : (language === "en" ? "September" : "Setembro"));
            case 10:
                return (language === "es" ? "Octubre" : (language === "en" ? "October" : "Outubro"));
            case 11:
                return (language === "es" ? "Noviembre" : (language === "en" ? "November" : "Novembro"));
            case 12:
                return (language === "es" ? "Diciembre" : (language === "en" ? "December" : "Dezembro"));
        }
    }

    function changeFormatMonthURL(mes) {
        switch (mes) {
            case 1:
                return "Enero";
            case 2:
                return "Febrero";
            case 3:
                return "Marzo";
            case 4:
                return "Abril";
            case 5:
                return "Mayo";
            case 6:
                return "Junio";
            case 7:
                return "Julio";
            case 8:
                return "Agosto";
            case 9:
                return "Septiembre";
            case 10:
                return "Octubre";
            case 11:
                return "Noviembre";
            case 12:
                return "Diciembre";
        }
    }

    const columns = (language) => [
        {
            name: (language === "es" ? 'Mes' : (language === "en" ? "Month" : "Mês")),
            selector: row => changeFormatMonth(row.arMes, language),
            sortable: true,
            width: '25%',
            filterable: true,
            center: true
        },
        {
            name: 'Literal',
            selector: row => ((language === "es" ? row.arInformacion.trim() : (language === "en" ? row.arInformacionEn.trim() : row.arInformacionPt.trim())) + '. ' + (language === "es" ? row.arDescripcion.trim() : (language === "en" ? row.arDescripcionEn.trim() : row.arDescripcionPt.trim()))),
            sortable: true,
            width: '65%',
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

    const columnsModf = (language) => [
        {
            name: 'Descripción',
            selector: row => ((language === "es" ? row.arDescripcion.trim() : (language === "en" ? row.arDescripcionEn.trim() : row.arDescripcionPt.trim()))),
            sortable: true,
            width: '38%',
            filterable: true
        },
        {
            name: 'Conjunto de datos',
            sortable: false,
            cell: row => <DownloadCSVFiles row={row} tpBtn={1} />,
            width: '22%',
            center: true
        },
        {
            name: 'Metadatos',
            sortable: false,
            cell: row => <DownloadCSVFiles row={row} tpBtn={2} />,
            width: '15%',
            center: true
        },
        {
            name: 'Diccionario de datos',
            sortable: false,
            cell: row => <DownloadCSVFiles row={row} tpBtn={3} />,
            width: '25%',
            center: true
        },
    ];

    const renderListYearDocs = (dataws) => {
        return (<Accordion defaultActiveKey={new Date().getFullYear()}>
            {rows.map(function (j) {
                if (j >= 2024) {
                    const months = [...Array(12).keys()];
                    const firstRowMonths = months.slice(0, 6);
                    const secondRowMonths = months.slice(6);

                    return (dataws.filter(itemdocx => itemdocx.arAnio === j).length > 0 &&
                        <Accordion.Item eventKey={j} key={j}>
                            <Accordion.Header>{`${data.language === "es" ? "Transparencia año" : (data.language === "en" ? "Transparency year" : "Ano da transparência")} ${j}`}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100 mt-2">
                                    <div className="row justify-content-center">
                                        {firstRowMonths.map(month => (
                                            <div key={month} className="col-4 col-md-2 mb-3">
                                                <a className={"link-month-transp me-2" + (activeMonths[j] === month ? " active-link-transp-month" : "")} onClick={() => handleMonthClick(j, month)} role="button">
                                                    {changeFormatMonth(month + 1, data.language)}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="row justify-content-center">
                                        {secondRowMonths.map(month => (
                                            <div key={month} className="col-4 col-md-2 mb-2">
                                                <a className={"link-month-transp me-2" + (activeMonths[j] === month ? " active-link-transp-month" : "")} onClick={() => handleMonthClick(j, month)} role="button">
                                                    {changeFormatMonth(month + 1, data.language)}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                    {Object.keys(activeMonths).length > 0 && (
                                        <div className={"collapse" + (activeMonths[j] !== null ? " show" : "")} id={`collapseExample-${j}`}>
                                            <div className="title-table-transp mb-0">{data.language === "es" ? ("Artículo 19 - " + changeFormatMonth(activeMonths[j] + 1, data.language)) : (data.language === "en" ? ("Article 19 - " + changeFormatMonth(activeMonths[j] + 1, data.language)) : ("Artigo 19 - " + changeFormatMonth(activeMonths[j] + 1, data.language)))}</div>
                                            <div className="overflow-auto">
                                                <DataTable
                                                    columns={columnsModf(data.language)}
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
                                                    data={dataws.filter(itemdocx => (itemdocx.arAnio === j && itemdocx.arMes === (activeMonths[j] + 1) && itemdocx.arFase.trim() === 'ART_19')).sort((a, b) => (a.arOrdenDocs - b.arOrdenDocs))}
                                                    noDataComponent={<div className="alert alert-warning alert-dismissible fade show w-100" role="alert">{data.language === "es" ? ("No hay archivos relacionados con el mes de " + changeFormatMonth(activeMonths[j] + 1, data.language)) : (data.language === "en" ? ("There are no files related to the month of " + changeFormatMonth(activeMonths[j] + 1, data.language)) : ("Não há arquivos relacionados ao mês de " + changeFormatMonth(activeMonths[j] + 1, data.language)))}</div>}
                                                    responsive
                                                />
                                            </div>
                                            <div className="col-md-12 w-100 mt-2 table-responsive">
                                                <table id="tbl-sublines" className="display table-static w-100">
                                                    <tbody>
                                                        {dataws
                                                            .filter(itemdocx => (
                                                                itemdocx.arAnio === j &&
                                                                itemdocx.arMes === activeMonths[j] + 1 &&
                                                                (itemdocx.arFase.trim() === 'TRSPR_ACT' || itemdocx.arFase.trim() === 'TRSPR_COL' || itemdocx.arFase.trim() === 'TRSPR_FOC')
                                                            ))
                                                            .sort((a, b) => (a.arOrdenDocs - b.arOrdenDocs))
                                                            .map((item, index) => (
                                                                <tr key={index}>
                                                                    <td className="text-center">
                                                                        {data.language === "es" ? item.arDescripcion :
                                                                            (data.language === "en" ? item.arDescripcionEn : item.arDescripcionPt)}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <a href={`${/(http:\/\/|https:\/\/|www\.|ftp\.)/.test(item.arUrlDocumento) || (item.arUrlDocumento === "" || item.arUrlDocumento === "#") ? item.arUrlDocumento : `${LOTAIP_DOCS_FOLDER}${item.arAnio}/${changeFormatMonthURL(item.arMes)}/${item.arSolicitante}/${item.arUrlDocumento}`}`}
                                                                            target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar archivo de datos" : (data.language === "en" ? "Download data file" : "Baixar arquivo de dados")}>
                                                                            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                }

                return (dataws.filter(itemdocx => itemdocx.arAnio === j).length > 0 &&
                    <Accordion.Item eventKey={j} key={j}>
                        <Accordion.Header>{`${data.language === "es" ? "Transparencia año" : (data.language === "en" ? "Transparency year" : "Ano da transparência")} ${j}`}</Accordion.Header>
                        <Accordion.Body>
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
                                        rangeSeparatorText: (data.language === "en" ? "of" : "de"),
                                        noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: (data.language === "en" ? "All" : "Todos")
                                    }}
                                    data={dataws.filter(itemdocx => itemdocx.arAnio === j).sort((a, b) => (b.arMes - a.arMes))}
                                    noDataComponent={data.language === "es" ? "No hay registros para mostrar" : (data.language === "en" ? "No records to show" : "Sem registros para exibir")}
                                    responsive
                                />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                );

            })}
        </Accordion>);
    }

    return (<>
        {renderTextInfo(data)}<br />
        {renderListYearDocs(datatbl)}
    </>);
}