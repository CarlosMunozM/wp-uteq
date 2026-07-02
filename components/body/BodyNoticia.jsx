import React, { useState, useEffect } from "react";
import axios from 'axios';
import { NEWS_UNIV_IMGS_FOLDER, WS_LIST_SIX_NEWS_OF_UNIVERSITY } from 'config';
import DOMPurify from 'isomorphic-dompurify';
import { v4 as uuidv4 } from 'uuid';



export { BodyNoticia };

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

function BodyNoticia(data) {

    const [dataSixNews, setDataSixNews] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_SIX_NEWS_OF_UNIVERSITY}${data.infonews.ntCodigo}`);
            setDataSixNews((result.data !== null && result.data !== "") ? result.data : []);
        })();
    }, []);

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const listItemsNewsPanel = (dataItems, language) => {
        return (
            dataItems.map((item) => {
                return (<ItemNews key={uuidv4()} url={item.ntUrlNoticia} titular={language === "es" ? item.ntTitular : (language === "en" ? item.ntTitularEn : item.ntTitularPt)}
                    urlportada={item.ntUrlPortada} colordep={item.objDepartamento.dpColor}
                    departamento={language === "es" ? (item.objDepartamento.dpNombre.trim() !== 'Universidad' ? item.objDepartamento.dpNombre.trim() : 'Institucional') :
                        (language === "en" ? (item.objDepartamento.dpNombreEn.trim() !== 'University' ? item.objDepartamento.dpNombreEn.trim() : 'Institutional') :
                            (item.objDepartamento.dpNombrePt.trim() !== 'Universidade' ? item.objDepartamento.dpNombrePt.trim() : 'Institucional'))}
                    fecha={item.ntFecha} language={language} />);
            })
        )
    }

    return (<>
        {
            data.infonews.ntEstado !== 1 ? (
                <div className="row g-0">
                    <div className="col-md-12 mt-3 pnl-form-filter-news">
                        <h2 className="title-cont-page text-center mt-2"><i className="fa fa-trash" aria-hidden="true"></i> {data.language === "es" ? "Noticia archivada" : (data.language === "en" ? "Archived news" : "Notícias arquivadas")}</h2>
                    </div>
                </div>
            ) : (<>
                <hr /><div className="row g-0">
                    <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? data.infonews.ntTitular.trim() : (data.language === "en" ? data.infonews.ntTitularEn.trim() : data.infonews.ntTitularPt.trim())}</h2>
                    <div className="paragraph-cont">
                        <h2 className="subtitle-cont-news"><i className="fa fa-history"></i>&nbsp;&nbsp;{`${data.language === "es" ? "Publicada el" : (data.language === "en" ? "Published on" : "Publicado em")} ${data.infonews.ntFecha.substr(8, 2)} ${data.language === "es" ? "de" : (data.language === "en" ? "from" : "do")} ${changeFormatMonth(data.infonews.ntFecha.substr(5, 2), data.language)} ${data.language === "es" ? "del" : (data.language === "en" ? "from" : "do")} ${data.infonews.ntFecha.substr(0, 4)}`}</h2>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex justify-content-center">
                            <span className="badge" data-toggle="tooltip" data-placement="bottom" title="Departamento" style={{ backgroundColor: `${data.infonews.objDepartamento.dpColor.trim()}`, cursor: "context-menu" }}><i className="fa fa-building" aria-hidden="true"></i> {data.language === "es" ? data.infonews.objDepartamento.dpNombre.trim() : (data.language === "en" ? data.infonews.objDepartamento.dpNombreEn.trim() : data.infonews.objDepartamento.dpNombrePt.trim())}</span>&nbsp;&nbsp;
                            <span className="badge" data-toggle="tooltip" data-placement="bottom" title="Categoría" style={{ backgroundColor: "#2D2D2D", cursor: "context-menu" }}><i className="fa fa-suitcase" aria-hidden="true"></i> {data.language === "es" ? data.infonews.objCategoriaNotc.gtTitular.trim() : (data.language === "en" ? data.infonews.objCategoriaNotc.gtTitularEn.trim() : data.infonews.objCategoriaNotc.gtTitularPt.trim())}</span>
                        </div>
                    </div><hr />
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-center">
                            <a href={`fb://share?url=https://www.uteq.edu.ec/${data.language}/comunicacion/noticia/${data.infonews.ntUrlNoticia.trim()}`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Compartir en Facebook" : (data.language === "en" ? "Share on Facebook" : "Partilhar no Facebook")}>
                                <span className="badge badge-cust-facb-news"><i className="fa fa-facebook fa-1x" aria-hidden="true"></i></span>
                            </a>
                            <a href={`http://twitter.com/share?text=${data.infonews.ntTitular.trim()}&url=https://www.uteq.edu.ec/${data.language}/comunicacion/noticia/${data.infonews.ntUrlNoticia.trim()}&hashtags=UTEQ,NoticiasUteq`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Compartir en Twitter" : (data.language === "en" ? "Share on Twitter" : "Partilhar no Twitter")}>
                                <span className="badge badge-cust-twit-news"><i className="fa fa-twitter fa-1x" aria-hidden="true"></i></span>
                            </a>
                            <a href={`https://plus.google.com/share?url=https://www.uteq.edu.ec/${data.language}/comunicacion/noticia/${data.infonews.ntUrlNoticia.trim()}&src=sdkpreparse`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Compartir en Google +" : (data.language === "en" ? "Share on Google +" : "Partilhar no Google +")}>
                                <span className="badge badge-cust-gog-news"><i className="fa fa-google-plus fa-1x" aria-hidden="true"></i></span>
                            </a>
                            <a href={`https://web.whatsapp.com://send?text= https://www.uteq.edu.ec/${data.language}/comunicacion/noticia/${data.infonews.ntUrlNoticia.trim()}`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Compartir en WhatsApp" : (data.language === "en" ? "Share on WhatsApp" : "Partilhar no WhatsApp")}>
                                <span className="badge badge-cust-wha-news"><i className="fa fa-whatsapp fa-1x" aria-hidden="true"></i></span>
                            </a>
                            <a href={`https://telegram.me/share/url?url=https://www.uteq.edu.ec/${data.language}/comunicacion/noticia/${data.infonews.ntUrlNoticia.trim()}&text=${data.language === "es" ? data.infonews.ntTitular.trim() : (data.language === "en" ? data.infonews.ntTitularEn.trim() : data.infonews.ntTitularPt.trim())}`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Compartir en Telegram" : (data.language === "en" ? "Share on Telegram" : "Partilhar no Telegram")}>
                                <span className="badge badge-cust-telg-news"><i className="fa fa-telegram fa-1x" aria-hidden="true"></i></span>
                            </a>
                            <a href={`http://www.linkedin.com/shareArticle?mini=true&url=https://www.uteq.edu.ec/${data.language}/comunicacion/noticia/${data.infonews.ntUrlNoticia.trim()}&title=${data.language === "es" ? data.infonews.ntTitular.trim() : (data.language === "en" ? data.infonews.ntTitularEn.trim() : data.infonews.ntTitularPt.trim())}&source=uteq.edu.ec`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Compartir en LinkedIn" : (data.language === "en" ? "Share on LinkedIn" : "Partilhar no LinkedIn")}>
                                <span className="badge badge-cust-linkedin-news"><i className="fa fa-linkedin fa-1x" aria-hidden="true"></i></span>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <center>
                            <img className="img-zoom-vw img-news img-fluid" src={`${NEWS_UNIV_IMGS_FOLDER}${data.infonews.ntUrlPortada.trim()}`} alt={data.language === "es" ? "Imagen de la noticia" : (data.language === "en" ? "Image of the news" : "Imagem da notícia")} />
                        </center>
                    </div>
                    <hr />
                    <div className="paragraph-cont pnl-summary-news mt-2"><p>{data.language === "es" ? data.infonews.ntDescripMeta.trim() : (data.language === "en" ? data.infonews.ntDescripMetaEn.trim() : data.infonews.ntDescripMetaPt.trim())}</p></div><hr />
                    <div className="paragraph-cont mt-2" dangerouslySetInnerHTML={sanitizedData(data.language === "es" ? data.infonews.ntCuerpo.trim() : (data.language === "en" ? data.infonews.ntCuerpoEn.trim() : data.infonews.ntCuerpoPt.trim()))}></div>
                </div>
            </>)
        }
        <hr />
        <div className="row g-0">
            {
                dataSixNews.length > 0 && (<>
                    <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Noticias relacionadas" : (data.language === "en" ? "Related news" : "Notícias relacionadas")}</h2>
                    <div className="row g-1">
                        {listItemsNewsPanel(dataSixNews, data.language)}
                    </div>
                </>)
            }
        </div>
    </>);

}