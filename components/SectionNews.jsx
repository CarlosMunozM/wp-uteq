import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { NEWS_UNIV_IMGS_FOLDER } from 'config';
import Link from 'next/link';
import { useRouter } from 'next/router';



export { SectionNews };

function changeFormatMonth(mes, language) {
    switch (mes) {
        case "1":
        case "01":
            return (language === "es" ? "Ene" : (language === "en" ? "Jan" : "Jan"));
        case "2":
        case "02":
            return (language === "es" ? "Feb" : (language === "en" ? "Feb" : "Fev"));
        case "3":
        case "03":
            return (language === "es" ? "Mar" : (language === "en" ? "Mar" : "Mar"));
        case "4":
        case "04":
            return (language === "es" ? "Abr" : (language === "en" ? "Apr" : "Abr"));
        case "5":
        case "05":
            return (language === "es" ? "May" : (language === "en" ? "May" : "Mai"));
        case "6":
        case "06":
            return (language === "es" ? "Jun" : (language === "en" ? "Jun" : "Jun"));
        case "7":
        case "07":
            return (language === "es" ? "Jul" : (language === "en" ? "Jul" : "Jul"));
        case "8":
        case "08":
            return (language === "en" ? "Aug" : "Ago");
        case "9":
        case "09":
            return (language === "es" ? "Sep" : (language === "en" ? "Sep" : "Set"));
        case "10":
            return (language === "es" ? "Oct" : (language === "en" ? "Oct" : "Out"));
        case "11":
            return (language === "es" ? "Nov" : (language === "en" ? "Nov" : "Nov"));
        case "12":
            return (language === "es" ? "Dic" : (language === "en" ? "Dec" : "Dez"));
    }
}

function NewsPanelForPage(props) {
    return (
        <>
            {props.currentItems ?
                props.currentItems.map((item, index) => (
                    <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center" key={index}>
                        <div className="card-only-news w-100 m-2">
                            <img src={`${NEWS_UNIV_IMGS_FOLDER}${item.ntUrlPortada.trim()}`} className="card-nw-image" alt={props.language === "es" ? "Imagen de la noticia" : (props.language === "en" ? "Image of the news" : "Imagem da notícia")} />
                            <div className="card-nw-bdy">
                                <div className="pnl-franja g-0 w-100 mt-2"></div>
                                <h2 className="card-nw-type g-0">{props.language === "es" ? item.ntTitular.trim() : (props.language === "en" ? item.ntTitularEn.trim() : item.ntTitularPt.trim())}</h2>
                                <div className="card-nw-title g-0 mb-3"><i className="fa fa-history"></i>&nbsp;&nbsp;{`${changeFormatMonth(item.ntFecha.substr(5, 2), props.language)} ${item.ntFecha.substr(8, 2)}, ${item.ntFecha.substr(0, 4)}`}</div>
                                <div className="pnl-text-news">
                                    <p className="card-nw-text">{props.language === "es" ? item.ntDescripMeta.trim() : (props.language === "en" ? item.ntDescripMetaEn.trim() : item.ntDescripMetaPt.trim())}</p>
                                </div>
                                <div className="row justify-content-center p-3">
                                    <div className="col-sm-12 col-lg-12 text-center">
                                        <Link href={`/${props.language}/comunicacion/noticia/${item.ntUrlNoticia.trim()}`}>
                                            <a target="_blank" aria-label="link noticia" data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? item.ntTitular.trim() : (props.language === "en" ? item.ntTitularEn.trim() : item.ntTitularPt.trim())}
                                                className="btn-tp"><i className="fa fa-bookmark"></i> {props.language === "es" ? "Leer más" : (props.language === "en" ? "Read more" : "Ler mais")}</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : ""}
        </>
    );
}

function SectionNews(data_news) {

    const itemsPerPage = 4;
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [endOffset, setEndOffset] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [listNewsFilter, setListNewsFilter] = useState([]);
    const [estdListNews, setEstdListNews] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setEndOffset(itemOffset + itemsPerPage);
        setListNewsFilter(data_news);
        setCurrentItems(listNewsFilter.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listNewsFilter.length / itemsPerPage));
        setEstdListNews(data_news.length > 0);
    }, [itemOffset, itemsPerPage, listNewsFilter, endOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listNewsFilter.length;
        setItemOffset(newOffset);
    };

    return (<>
        <div className="col-md-12 g-0">
            <div className="row d-flex justify-content-center align-items-center g-0">
                {
                    estdListNews ? (<NewsPanelForPage currentItems={currentItems} language={router.locale} />) : (<div className="ratio ratio-21x9">
                        <img src={`/assets/img/${router.locale === "es" ? "busqueda-de-noticias-uteq-es.webp" : (router.locale === "en" ? "busqueda-de-noticias-uteq-en.webp" : "busqueda-de-noticias-uteq-pt.webp")}`} className="d-block w-100" alt={router.locale === "es" ? "Noticias" : (router.locale === "en" ? "News" : "Notícias")} />
                    </div>)
                }
            </div>
            <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-center">
                    {
                        (estdListNews && listNewsFilter.length > itemsPerPage) ? <ReactPaginate
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
                            renderOnZeroPageCount={null} /> : ""
                    }
                </div>
            </div>
        </div>
    </>);

}