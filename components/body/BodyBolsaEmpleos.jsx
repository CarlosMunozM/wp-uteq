import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { WS_LIST_JOBS_BUSN, IMG_JOBS_BS_FOLDER, WS_LIST_SIX_NEWS_OF_UNIVERSITY, NEWS_UNIV_IMGS_FOLDER } from 'config';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';


export { BodyBolsaEmpleos };

async function make_request_ws(path_url) {
    var listTemp = null;
    const https = require('https');
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        await axios.get(path_url, { httpsAgent: agent }).then(function (response) {
            listTemp = response/*.data*/;
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
            return (language === "en" ? "August" : "Agosto");
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

function ItemNews(props) {
    return (<>
        <div className="col-md-6">
            <a href={`/${props.language}/comunicacion/noticia/${props.url.trim()}`} target="_blank" aria-label="link noticia indv" data-toggle="tooltip" data-placement="bottom" className="link-news-dep" title={props.titular.trim()}>
                <div className="p-3 pnl-other-news">
                    <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <img alt="" className="img-portrait-news" src={`${NEWS_UNIV_IMGS_FOLDER}${props.urlportada.trim()}`} />
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                            <div className="text-news-other">
                                {props.titular.trim()}
                            </div>
                            <div className="date-news">
                                <span className="badge sticker-tipo-dept" style={{ backgroundColor: "#025a27", color: "#FFF" }}>{props.departamento.trim() !== 'Universidad' ? props.departamento.trim() : 'Institucional'}</span>&nbsp;&nbsp;
                                <i className="fa fa-history"></i>&nbsp;&nbsp;{`${props.fecha.substr(8, 2)} de ${changeFormatMonth(props.fecha.substr(5, 2), props.language)} del ${props.fecha.substr(0, 4)}`}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </>)
}

const listItemsNewsPanel = (dataItems, language) => {
    return (
        dataItems?.map((item) => {
            // Extrae el primer departamento o categoría si existen
            const primerDept = item.listaDepartamentos?.[0];
            const primeraCat = item.listaCategoriasNotc?.[0];

            const colordep = primerDept?.dpColor?.trim()
                || primeraCat?.gtColorIdentf?.trim()
                || "#025a27";

            let deptName = '';

            if (primerDept) {
                deptName = language === "es"
                    ? (primerDept.dpNombre?.trim() !== 'Universidad' ? primerDept.dpNombre?.trim() : 'Institucional')
                    : (language === "en"
                        ? (primerDept.dpNombreEn?.trim() !== 'University' ? primerDept.dpNombreEn?.trim() : 'Institutional')
                        : (primerDept.dpNombrePt?.trim() !== 'Universidade' ? primerDept.dpNombrePt?.trim() : 'Institucional'));
            } else if (primeraCat) {
                deptName = language === "es"
                    ? primeraCat.gtTitular?.trim()
                    : (language === "en" ? primeraCat.gtTitularEn?.trim() : primeraCat.gtTitularPt?.trim());
            } else {
                deptName = language === "en" ? 'Institutional' : 'Institucional';
            }

            return (
                <ItemNews
                    key={uuidv4()}
                    url={item.ntUrlNoticia}
                    titular={language === "es" ? item.ntTitular : (language === "en" ? item.ntTitularEn : item.ntTitularPt)}
                    urlportada={item.ntUrlPortada}
                    colordep={colordep}
                    departamento={deptName}
                    fecha={item.ntFecha}
                    language={language}
                />
            );
        })
    );
};

function BodyBolsaEmpleos(data) {
    const itemsPerPage = 4;
    const [dataempls, setDataempls] = useState([]);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [endOffset, setEndOffset] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [estdListEmplys, setEstdListEmplys] = useState(false);

    const [dataSixNews, setDataSixNews] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(WS_LIST_JOBS_BUSN);
            setDataempls((result.data !== null && result.data !== "") ? result.data : []);
            setEndOffset(itemOffset + itemsPerPage);
            setCurrentItems(dataempls.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(dataempls.length / itemsPerPage));
            setEstdListEmplys(result.data.length > 0);
        })();
    }, [itemOffset, itemsPerPage, endOffset]);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_SIX_NEWS_OF_UNIVERSITY}0`);
            setDataSixNews((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);


    function EmploymentsPanelsForPage({ currentItems }) {
        return (
            <>
                {currentItems &&
                    currentItems.map((item, index) => (
                        <div className="col-md-6 mb-3" key={index}>
                            <div className="ratio ratio-1x1">
                                <img src={`${IMG_JOBS_BS_FOLDER}${data.language === "es" ? item.epUrlImg.trim() : (data.language === "en" ? item.epUrlImgEn.trim() : item.epUrlImgPt.trim())}`} alt={`img-oferta-empleo-${index}`} />
                            </div>
                        </div>
                    ))}
            </>
        );
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % dataempls.length;
        setItemOffset(newOffset);
    };

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center">{data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())}</h2>
            <div className="col-md-12 mt-2">
                {
                    /*
                    estdListEmplys ? (<div className="row"><EmploymentsPanelsForPage currentItems={currentItems} /></div>) : (<div className="row g-0"><div className="ratio ratio-21x9">
                        <img src={`/assets/img/${data.language === "es" ? "bolsa-de-empleo-banner-uteq-es.jpg" : (data.language === "en" ? "bolsa-de-empleo-banner-uteq-en.jpg" : "bolsa-de-empleo-banner-uteq-pt.jpg")}`} className="d-block w-100"
                            alt={data.language === "es" ? "Ofertas de empleo" : (data.language === "en" ? "Job vacancies" : "Ofertas de emprego")} />
                    </div></div>)
                    */
                    (<div className="row g-0">
                        <div className="ratio ratio-21x9">
                            <a
                                href="https://sga.uteq.edu.ec/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-block w-100 h-100"
                            >
                                <img
                                    src={`/assets/img/${data.language === "es" ? "bolsa-de-empleo-sga-banner-uteq-es.jpg" : (data.language === "en" ? "bolsa-de-empleo-sga-banner-uteq-en.jpg" : "bolsa-de-empleo-sga-banner-uteq-pt.jpg")}`}
                                    className="d-block w-100 h-100 object-fit-cover"
                                    alt={data.language === "es" ? "Ofertas de empleo" : (data.language === "en" ? "Job vacancies" : "Ofertas de emprego")}
                                />
                            </a>
                        </div>
                    </div>)
                }
                {/*
                <div className="row mt-3">
                    <div className="col-md-12 d-flex justify-content-center">
                        {
                            dataempls.length > itemsPerPage && (<>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=">"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    marginPagesDisplayed={2}
                                    pageCount={pageCount}
                                    previousLabel="<"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null} />
                            </>)
                        }
                    </div>
                </div>
                */}
            </div>

            <div className="row g-0 mt-3">
                {
                    dataSixNews.length > 0 && (<>
                        <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Noticias" : (data.language === "en" ? "News" : "Notícias")}</h2>
                        <div className="row g-1">
                            {listItemsNewsPanel(dataSixNews, data.language)}
                        </div>
                    </>)
                }
            </div>
        </div>
    </>);
}