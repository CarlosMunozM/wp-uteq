import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { WS_LIST_JOBS_BUSN, IMG_JOBS_BS_FOLDER } from 'config';
import ReactPaginate from 'react-paginate';


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

function BodyBolsaEmpleos(data) {
    const itemsPerPage = 4;
    const [dataempls, setDataempls] = useState([]);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [endOffset, setEndOffset] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [estdListEmplys, setEstdListEmplys] = useState(false);

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
                    estdListEmplys ? (<div className="row"><EmploymentsPanelsForPage currentItems={currentItems} /></div>) : (<div className="row g-0"><div className="ratio ratio-21x9">
                        <img src={`/assets/img/${data.language === "es" ? "bolsa-de-empleo-banner-uteq-es.jpg" : (data.language === "en" ? "bolsa-de-empleo-banner-uteq-en.jpg" : "bolsa-de-empleo-banner-uteq-pt.jpg")}`} className="d-block w-100"
                            alt={data.language === "es" ? "Ofertas de empleo" : (data.language === "en" ? "Job vacancies" : "Ofertas de emprego")} />
                    </div></div>)
                }
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
            </div>
        </div>
    </>);
}