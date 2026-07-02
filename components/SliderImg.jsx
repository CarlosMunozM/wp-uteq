import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
    IDENT_DOCS_FOLDER, IDENT_IMGS_FOLDER, EVAL_INTRN_DOCS_FOLDER, EVAL_INTRN_IMGS_FOLDER, COOP_INTERNC_DOCS_FOLDER, COOP_INTERNC_IMGS_FOLDER, CAREERS_MSC_IMG_FOLDER, ADMS_IMGS_FOLDER, ADMS_DOCS_FOLDER,
    LOGST_IMGS_FOLDER, LOGST_DOCS_FOLDER, NEWSPAPERS_FOLDER, RESEMN_IMGS_FOLDER, UTQINV_IMGS_FOLDER, UBU_SERVICIOS_IMGS_FOLDER, UBU_DOCS_FOLDER, VINC_DOCS_FOLDER, VINC_IMGS_FOLDER, MAGAZINES_FOLDER,
    IMG_SLD_INVESTG_FOLDER, INV_DOCS_FOLDER, apiUrl, IMG_GENERAL_UNIVS_FOLDER, IMG_GALLERY_LABORATORIES_FOLDER, IMG_EVENTS_UBU_PORTRAIT_FOLDER, IMG_EVENTS_DINMCS_FOLDER, DOCS_EVENTS_DINMCS_FOLDER
} from "config";
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';
import { CardImg } from "react-bootstrap";
import { useRouter } from 'next/router';



export { SliderImg }

const responsiveCust = (option) => {
    return {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 2000 },
            items: ((option === 68 || option === 84) ? 1 : (option === 80 ? 7 : ((option === 81 || option === 85) ? 2 : (option === 82 ? 4 : 3))))
        },
        desktop: {
            breakpoint: { max: 2000, min: 1024 },
            items: ((option === 68 || option === 81 || option === 84 || option === 85) ? 1 : (option === 80 ? 7 : (option === 82 ? 2 : 3)))
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: (option === 68 ? 5 : (option === 80 ? 7 : (option === 84 ? 1 : 2)))
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: (option === 80 ? 2 : 1)
        }
    }
};

const sanitizedData = (codeHTML) => ({
    __html: DOMPurify.sanitize(codeHTML)
})

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

function SliderImg(datacomp, opt, time1, time2) {
    var folderImg, folderDoc;
    const [modalShow, setModalShow] = useState(false);
    const [urlVideo, setUrlVideo] = useState("#");
    const [titulo, setTitulo] = useState("");
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const router = useRouter();

    switch (opt) {
        case 6:
        case 86:
            folderImg = IDENT_IMGS_FOLDER;
            folderDoc = IDENT_DOCS_FOLDER;
            break;
        case 10:
            folderImg = COOP_INTERNC_IMGS_FOLDER;
            folderDoc = COOP_INTERNC_DOCS_FOLDER;
            break;
        case 11:
            folderImg = CAREERS_MSC_IMG_FOLDER;
            break;
        case 12:
            folderImg = EVAL_INTRN_IMGS_FOLDER;
            folderDoc = EVAL_INTRN_DOCS_FOLDER;
            break;
        case 17:
            folderImg = ADMS_IMGS_FOLDER;
            folderDoc = ADMS_DOCS_FOLDER;
            break;
        case 20:
            folderImg = LOGST_IMGS_FOLDER;
            folderDoc = LOGST_DOCS_FOLDER;
            break;
        case 23:
            folderImg = NEWSPAPERS_FOLDER;
            break;
        case 24:
            folderImg = RESEMN_IMGS_FOLDER;
            break;
        case 25:
            folderImg = UTQINV_IMGS_FOLDER;
            break;
        case 26:
        case 27:
        case 28:
        case 46:
            folderImg = UBU_SERVICIOS_IMGS_FOLDER;
            folderDoc = UBU_DOCS_FOLDER;
            break;
        case 39:
            folderImg = VINC_IMGS_FOLDER;
            folderDoc = VINC_DOCS_FOLDER;
            break;
        case 47:
        case 48:
        case 49:
        case 52:
        case 55:
        case 56:
        case 57:
        case 58:
        case 59:
        case 60:
        case 62:
        case 63:
        case 64:
        case 65:
        case 66:
        case 67:
        case 82:
        case 72:
            folderImg = MAGAZINES_FOLDER;
            break;
        case 50:
        case 51:
        case 61:
    	case 91:
            folderImg = IMG_SLD_INVESTG_FOLDER;
            folderDoc = INV_DOCS_FOLDER;
            break;
        case 68:
        case 81:
        case 83:
            folderImg = IMG_GENERAL_UNIVS_FOLDER;
            break;
        case 84:
            folderImg = IMG_GALLERY_LABORATORIES_FOLDER;
            break;
        case 85:
            folderImg = IMG_EVENTS_UBU_PORTRAIT_FOLDER;
            break;
        case 90:
            folderImg = IMG_EVENTS_DINMCS_FOLDER;
            folderDoc = DOCS_EVENTS_DINMCS_FOLDER;
            break;
    }

    function ItemSlider(props) {
        const regEx = /^http/;

        if (props.tipo === 11) {
            return (<div className="item item-sld-mult">
                <div className="work">
                    <a target="_blank" href={!regEx.test(props.url) ? `/posgrado/${props.url.trim()}` : props.url.trim()} aria-label="link maestria" data-toggle="tooltip" data-placement="bottom" title={props.nombre.trim()}>
                        <div className="img-n2 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${CAREERS_MSC_IMG_FOLDER}${props.urlportada.trim()})` }}></div>
                    </a>
                </div>
            </div>)
        } else if (props.tipo === 12) {
            return (<div className="item item-sld-mult">
                <div className="work">
                    <a href={!regEx.test(props.url) ? `/${router.locale}/evaluacion-interna/${props.url.trim()}` : props.url.trim()} target="_blank" aria-label="link pagina" style={{ textDecoration: "none" }}>
                        <div className="img-n10 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${props.folderimg}${props.urlimgvid.trim()})` }}></div>
                        <div className="text-pn text-center">{props.nombre.trim()}</div>
                    </a>
                </div>
            </div>)
        } else if (props.tipo === 22) {
            return (<div className="item item-sld-mult">
                <div className="work">
                    <blockquote className="pnl-twitter mx-auto">
                        <div className="row">
                            <div className="col-md-6" style={{ fontWeight: "bold", padding: "6px" }}><i className="fa fa-twitter" aria-hidden="true" style={{ color: "#1DA1F2", textAlign: "right" }}></i>  @utequevedo</div>
                            <div className="col-md-6" style={{ textAlign: "right", padding: "6px", fontWeight: "bold" }}>{`${changeFormatMonth(props.fecha.substr(5, 2), router.locale)} ${props.fecha.substr(8, 2)}, ${props.fecha.substr(0, 4)}`}</div>
                        </div><hr className="sep-twitter" />
                        <div className="row pnl-body-tweet">
                            <p className="text-tweet" dangerouslySetInnerHTML={sanitizedData(props.texto.trim())}></p>
                        </div><hr className="sep-twitter-ub" />
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="social-media-list">
                                    <li>
                                        <a href={`https://twitter.com/intent/tweet?in_reply_to=${props.codpub.trim()}`}>
                                            <i className="fa fa-reply" aria-hidden="true"></i>  {router.locale === "es" ? "Responder" : (router.locale === "en" ? "Reply" : "Resposta")}</a>
                                    </li>
                                    <li>
                                        <a href={`https://twitter.com/intent/retweet?tweet_id=${props.codpub.trim()}`}>
                                            <i className="fa fa-retweet" aria-hidden="true"></i>  {router.locale === "es" ? "Retuitear" : (router.locale === "en" ? "Retweet" : "Retweetar")}</a>
                                    </li>
                                    <li>
                                        <a href={`https://twitter.com/intent/favorite?tweet_id=${props.codpub.trim()}`}>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>  {router.locale === "es" ? "Favorito" : (router.locale === "en" ? "Favourite" : "Favorito")}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </blockquote>
                </div>
            </div>)
        } else if (props.tipo === 23) {
            return (<div className="item item-sld-mult">
                <div className="work">
                    <a href={props.url.trim()} target="_blank" aria-label="link newspaper" style={{ textDecoration: "none" }}>
                        <div className="img-n11 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${props.folderimg}${props.urlportada.trim()})` }}></div>
                    </a>
                </div>
            </div>)
        } else if (props.tipo === 24 || props.tipo === 25) {
            return (<div className="item item-sld-mult">
                <div className="work">
                    <div className="img-n12 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${props.folderimg}${props.urlportadavid})`, cursor: 'pointer' }}
                        onClick={() => { setUrlVideo(props.urlvideo2.trim() + "?showinfo=0&enablejsapi=1&origin=" + apiUrl); setTitulo(props.nombre.trim()); setModalShow(true) }}></div>
                </div>
            </div>)
        } else if (props.tipo === 26 || props.tipo === 28) {
            return (<div className="item item-sld-mult">
                <div className="work">
                    <a href={props.url.trim()} target="_blank" aria-label="link ubu" style={{ textDecoration: 'none' }}>
                        <div className="img-n10 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${props.folderimg}${props.urlimgvid.trim()})` }}></div>
                        <div className="text-pn text-center">{props.nombre.trim()}</div>
                    </a>
                </div>
            </div>)
        } else if (props.tipo === 47 || props.tipo === 48 || props.tipo === 49 || props.tipo === 52 || props.tipo === 55 || props.tipo === 56 || props.tipo === 57 || props.tipo === 58 || props.tipo === 59 || props.tipo === 60 || props.tipo === 62 || props.tipo === 63 || props.tipo === 64 || props.tipo === 65 || props.tipo === 66 || props.tipo === 67 || props.tipo === 72) {
            return (<div className="item item-sld-mult">
                <div className="work">
                    <a href={props.url.trim()} target="_blank" aria-label="link revista" data-toggle="tooltip" data-placement="bottom" title={props.nombre.trim()}>
                        <div className="img-n13 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${props.folderimg}${props.urlportada.trim()})` }}></div>
                    </a>
                </div>
            </div>)
        } else if (props.tipo === 50 || props.tipo === 91) {
            return (<div className="item item-sld-mult">
                <div className="work">
                    <a href={(!regEx.test(props.url) ? (`${props.folderdoc}${props.url.trim()}`) : props.url.trim())} target="_blank" aria-label="link memoria" data-toggle="tooltip" data-placement="bottom" title={props.nombre.trim()}>
                        <div className={`${props.tipo===50?"img-n11":"pnl-memories"} d-flex align-items-end justify-content-center`} style={{ backgroundImage: `url(${props.folderimg}${props.urlimgvid.trim()})` }}></div>
                    </a>
                </div>
            </div>)
        } else if (props.tipo === 51) {
            return (<div className="item item-sld-mult">
                <div className="work">
                    <a href={`${props.folderdoc}${props.url.trim()}`} target="_blank" aria-label="link investigacion" data-toggle="tooltip" data-placement="bottom" title={props.nombre.trim()} style={{ textDecoration: 'none' }}>
                        <div className="img-n10 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${props.folderimg}${props.urlimgvid.trim()})` }}></div>
                        <div className="text-pn text-center">{props.nombre.trim()}</div>
                    </a>
                </div>
            </div>)
        } else if (props.tipo === 68 || props.tipo === 84) {
            return (<div className="ratio ratio-16x9 img-anim-transt">
                <img src={folderImg + props.urlimgvid.trim()} alt={props.nombre.trim()} />
            </div>)
        } else if (props.tipo === 80) {
            return (<div className="box-book-stock mx-auto">
                <a href={props.codigo !== null ? (`/${router.locale}/investigacion/libro/${props.codigo}`) : "#"} target="_blank" aria-label="link book stock" data-toggle="tooltip" data-placement="bottom" title={props.titulo.trim()}>
                    <img src={(props.urlportada !== null && props.urlportada !== "") ? (!regEx.test(props.urlportada) ? `https://${props.urlportada.trim()}` : props.urlportada.trim()) :
                        `/assets/img/${router.locale === "es" ? "img-port-def-libro.jpg" : (router.locale === "en" ? "img-port-def-libro-en.jpg" : "img-port-def-libro-pt.jpg")}`} className="box-img-book mx-auto"
                        alt={`${router.locale === "es" ? "Portada Libro" : (router.locale === "en" ? "Book cover" : "Capa do livro")} - ${props.titulo.trim().substring(0, 14)}`} />
                </a>
            </div>)
        } else if (props.tipo === 81) {
            return (<CardImg variant="top" src={folderImg + props.urlportada.trim()} className="image-mgz-pnl" alt={props.nombre.trim()} />)
        } else if (props.tipo === 82) {
            return (<a href={props.urlimgweb.trim()} target="_blank" data-toggle="tooltip" data-placement="bottom" title={props.nombre.trim()}>
                <CardImg variant="top" src={folderImg + props.urlportada.trim()} className="image-mgz-pnl" alt={props.nombre.trim()} />
            </a>)
        } else if (props.tipo === 83) {
            return (<div className="col-lg-4 g-0 mx-auto">
                <figure className="snip1390">
                    <img src={folderImg + props.urlimgweb.trim()} alt={props.profesional.trim()} className="profile" />
                    <figcaption>
                        <h2>{props.profesional.trim()}</h2>
                        <h4>{props.cargo.trim()}</h4>
                        <blockquote>{props.testimonio.trim()}</blockquote>
                    </figcaption>
                </figure>
            </div>)
        } else if (props.tipo === 85) {
            return (<CardImg variant="top" src={folderImg + props.urlportada.trim()} className="image-mgz-pnl" alt={props.nombre.trim()} />)
        } else if (props.tipo === 90) {
            return (
                <div className="pnl-evt1 p-1">
                    <a href={`${props.folderdoc}${props.url.trim()}`} target="_blank" aria-label="link img" style={{ textDecoration: "none" }}>
                        <div className="ratio ratio-4x3 border">
                            <img className="pnl-evt" src={`${props.folderimg}${props.urlimgvid.trim()}`} alt={props.nombre.trim()} />
                        </div>
                        <div className="pnl-title-img-1 text-center">{props.nombre.trim()}</div>
                    </a>
                </div>
            )
        } else if (props.tipo === 92) {
            return (
                <div className="col-md-12 col-lg-12">
                    <div className="card-only-news w-100 m-2">
                        <iframe
                            className="card-nw-image"
                            src={props.urlembvid !== "#" ? props.urlembvid : "/assets/img/imagen-estandar-poster-virtual-cidu-2023-uteq.webp"}
                        	referrerPolicy="strict-origin-when-cross-origin"
                            frameBorder="0"
                            title={`Video explicativo de la Ponencia ${props.key}`}>
                        </iframe>
                        <div className="card-nw-bdy">
                            <div className="pnl-franja g-0 w-100 mt-2"></div>
                            <h2 className="card-nw-type g-0" dangerouslySetInnerHTML={{ __html: props.nombre.trim() }} />
                            {
                                (props.palabras !== null && props.palabras !== "") ? (<div className="card-nw-title g-0 mb-3"><span className="badge sticker-tipo-dept" style={{ backgroundColor: "#025a27" }}>{props.palabras.trim()}</span></div>) : ""
                            }
                            <div className="pnl-text-news">
                                <p className="card-nw-text">{props.autores}</p>
                            </div>
                            <div className="row justify-content-center p-3">
                                <div className="col-sm-12 col-lg-12 text-center">
                                    <a href={`https://cidu.uteq.edu.ec/index.php/ponente/pdfPonencia?idp=${props.codigo}`} target="_blank" aria-label="link noticia" data-toggle="tooltip" data-placement="bottom" title="" className="btn-tp"><i className="fa fa-bookmark"></i> {router.locale === "es" ? "Leer más" : (router.locale === "en" ? "Read more" : "Ler mais")}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div className="item item-sld-mult">
                <div className="work">
                    <a href={props.option === 'IMG' ? `${props.folderdoc}${props.url.trim()}` : (props.option === 'VID' ? props.url.trim() : '#')} target="_blank" aria-label="link corpidt" style={{ textDecoration: "none" }}>
                        <div className="img-n10 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${props.folderimg}${props.urlimgvid.trim()})` }}></div>
                        <div className="text-pn text-center">{props.nombre.trim()}</div>
                    </a>
                </div>
            </div>)
        }

    }

    const listItemSlider = (data, option) => {
        return (<>{
            (data !== null && data !== "") && data.map(
                (item) => {
                    if (option === 11) {
                        return <ItemSlider key={uuidv4()} tipo={option} url={item.crUrlParcial.trim()} nombre={item.crNombre.trim()} urlportada={item.crUrlPortada.trim()} />
                    } else if (option === 12) {
                        return <ItemSlider key={uuidv4()} tipo={option} url={item.sldEnlace.trim()} nombre={item.sldTitulo.trim()} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                    } else if (option === 22) {
                        return <ItemSlider key={uuidv4()} tipo={option} fecha={item.prFecha} texto={item.prTextoTwt} codpub={item.prCodPub} />
                    } else if (option === 23) {
                        return <ItemSlider key={uuidv4()} tipo={option} url={item.urlpw.trim()} folderimg={folderImg} urlportada={item.urlportada.trim()} />
                    } else if (option === 24 || option === 25) {
                        return <ItemSlider key={uuidv4()} tipo={option} folderimg={folderImg} urlportadavid={item.portadaVideo.trim()} urlvideo2={item.urlvideo2} nombre={item.titulo} />
                    } else if (option === 26 || option === 28) {
                        return <ItemSlider key={uuidv4()} tipo={option} url={item.sldEnlace.trim()} nombre={item.sldTitulo.trim()} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                    } else if (option === 47 || option === 48 || option === 49 || option === 52 || option === 55 || option === 56 || option === 57 || option === 58 || option === 59 || option === 60 || option === 62 || option === 63 || option === 64 || option === 65 || option === 66 || option === 67) {
                        return <ItemSlider key={uuidv4()} tipo={option} url={item.dmUrlPagWeb} nombre={item.dmDescripcion.trim()} folderimg={folderImg} urlportada={item.dmUrlFoto.trim()} />
                    } else if (option === 50) {
                        return <ItemSlider key={uuidv4()} tipo={option} folderdoc={folderDoc} url={item.sldEnlace} nombre={item.sldTitulo.trim()} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                    } else if (option === 51) {
                        return <ItemSlider key={uuidv4()} tipo={option} folderdoc={folderDoc} url={item.sldEnlace.trim()} nombre={item.sldTitulo.trim()} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                    } else if (option === 68) {
                        return <ItemSlider key={uuidv4()} tipo={option} nombre={item.sldTitulo.trim()} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                    } else if (option === 80) {
                        return <ItemSlider key={uuidv4()} codigo={item.id} titulo={item.titulo.trim()} urlportada={item.urlportada.trim()} />
                    } else if (option === 81) {
                        return <ItemSlider key={uuidv4()} tipo={option} nombre={item.sldTitulo.trim()} urlportada={item.sldUrlImgVid.trim()} urlimgweb={item.sldEnlace.trim()} />
                    } else if (option === 82) {
                        return <ItemSlider key={uuidv4()} tipo={option} nombre={item.dmDescripcion.trim()} urlportada={item.dmUrlFoto.trim()} urlimgweb={item.dmUrlPagWeb.trim()} />
                    } else if (option === 83) {
                        return <ItemSlider key={uuidv4()} tipo={option} folderImg={folderImg} urlimgweb={item.dmUrlFoto} profesional={item.dmNombreGrad} cargo={item.dmProfesion} testimonio={item.dmRespuesta} />
                    } else if (option === 84) {
                        return <ItemSlider key={uuidv4()} tipo={option} nombre={(item.glbDescripc !== null && item.glbDescripc !== "") ? item.glbDescripc.trim() : "Imagen de Laboratorio - UTEQ"} folderimg={folderImg} urlimgvid={item.glbUrlImg.trim()} />
                    } else if (option === 85) {
                        return <ItemSlider key={uuidv4()} tipo={option} nombre={item.evDescripcion.trim()} urlportada={item.evtUrlAfiche.trim()} />
                    } else if (option === 90) {
                        return <ItemSlider key={uuidv4()} tipo={option} folderdoc={folderDoc} url={item.dtUrlEnlace.trim()} nombre={item.dtDescripcion1.trim()} folderimg={folderImg} urlimgvid={item.dtImagen.trim()} />
                    } else {
                        return <ItemSlider key={uuidv4()} tipo={option} option={item.sldTipo} folderdoc={folderDoc} url={item.sldEnlace.trim()} nombre={item.sldTitulo.trim()} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                    }
                }
            )
        }</>)
    }

    return (<>
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            arrows={true/*opt !== 81 && opt !== 82 && opt !== 85*/}
            responsive={responsiveCust(opt)}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={time1}
            keyBoardControl={true}
            customTransition="transform 750ms ease-in-out 0s"
            transitionDuration={time2}
            containerclassName="carousel-container text-center"
            dotListclassName="custom-dot-list-style"
            itemclass="carousel-item-padding-40-px">
            {
                (datacomp !== null && datacomp !== "") && datacomp.map(
                    (item) => {
                        if (opt === 11) {
                            return <ItemSlider key={uuidv4()} tipo={opt} url={item.crUrlParcial.trim()} nombre={item.crNombre.trim()} urlportada={item.crUrlPortada.trim()} />
                        } else if (opt === 12) {
                            return <ItemSlider key={uuidv4()} tipo={opt} url={item.sldEnlace.trim()} nombre={router.locale === "es" ? item.sldTitulo.trim() : (router.locale === "en" ? item.sldTituloEn.trim() : item.sldTituloPt.trim())} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                        } else if (opt === 22) {
                            return <ItemSlider key={uuidv4()} tipo={opt} fecha={item.prFecha} texto={item.prTextoTwt} codpub={item.prCodPub} />
                        } else if (opt === 23) {
                            return <ItemSlider key={uuidv4()} tipo={opt} url={item.urlpw.trim()} folderimg={folderImg} urlportada={item.urlportada.trim()} />
                        } else if (opt === 24 || opt === 25) {
                            return <ItemSlider key={uuidv4()} tipo={opt} folderimg={folderImg} urlportadavid={item.portadaVideo.trim()} urlvideo2={item.urlvideo2} nombre={router.locale === "es" ? item.titulo : (router.locale === "en" ? item.tituloEn : item.tituloPt)} />
                        } else if (opt === 26 || opt === 28) {
                            return <ItemSlider key={uuidv4()} tipo={opt} url={"/" + router.locale + item.sldEnlace.trim()} nombre={router.locale === "es" ? item.sldTitulo.trim() : (router.locale === "en" ? item.sldTituloEn.trim() : item.sldTituloPt.trim())} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                        } else if (opt === 47 || opt === 48 || opt === 49 || opt === 52 || opt === 55 || opt === 56 || opt === 57 || opt === 58 || opt === 59 || opt === 60 || opt === 62 || opt === 63 || opt === 64 || opt === 65 || opt === 66 || opt === 67 || opt === 72) {
                            return <ItemSlider key={uuidv4()} tipo={opt} url={router.locale === "es" ? item.dmUrlPagWeb : (router.locale === "en" ? item.dmDescTramiteEn.trim() : item.dmDescTramitePt.trim())} nombre={item.dmDescripcion.trim()} folderimg={folderImg} urlportada={router.locale === "es" ? item.dmUrlFoto.trim() : (router.locale === "en" ? item.dmDescripcionEn.trim() : item.dmDescripcionPt.trim())} />
                        } else if (opt === 50) {
                            return <ItemSlider key={uuidv4()} tipo={opt} folderdoc={folderDoc} url={item.sldEnlace} nombre={item.sldTitulo.trim()} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                        } else if (opt === 51) {
                            return <ItemSlider key={uuidv4()} tipo={opt} folderdoc={folderDoc} url={item.sldEnlace.trim()} nombre={item.sldTitulo.trim()} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                        } else if (opt === 68) {
                            return <ItemSlider key={uuidv4()} tipo={opt} nombre={item.sldTitulo.trim()} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                        } else if (opt === 80) {
                            return <ItemSlider key={uuidv4()} tipo={opt} codigo={item.id} titulo={item.titulo.trim()} urlportada={item.urlportada.trim()} />
                        } else if (opt === 81) {
                            return <ItemSlider key={uuidv4()} tipo={opt} nombre={router.locale==="es"?item.sldTitulo.trim():(router.locale==="en"?item.sldTituloEn.trim():item.sldTituloPt.trim())} urlportada={router.locale==="es"?item.sldUrlImgVid.trim():(router.locale==="en"?item.sldUrlImgVidEn.trim():item.sldUrlImgVidPt.trim())} urlimgweb={item.sldEnlace.trim()} />
                        } else if (opt === 82) {
                            return <ItemSlider key={uuidv4()} tipo={opt} nombre={item.dmDescripcion.trim()} urlportada={router.locale === "es" ? item.dmUrlFoto.trim() : (router.locale === "en" ? item.dmDescripcionEn.trim() : item.dmDescripcionPt.trim())} urlimgweb={router.locale === "es" ? item.dmUrlPagWeb.trim() : (router.locale === "en" ? item.dmDescTramiteEn.trim() : item.dmDescTramitePt.trim())} />
                        } else if (opt === 83) {
                            return <ItemSlider key={uuidv4()} tipo={opt} folderImg={folderImg} urlimgweb={item.dmUrlFoto} profesional={item.dmNombreGrad} cargo={item.dmProfesion} testimonio={item.dmRespuesta} />
                        } else if (opt === 84) {
                            return <ItemSlider key={uuidv4()} tipo={opt} nombre={(item.glbDescripc !== null && item.glbDescripc !== "") ? item.glbDescripc.trim() : "Imagen de Laboratorio - UTEQ"} folderimg={folderImg} urlimgvid={item.glbUrlImg.trim()} />
                        } else if (opt === 85) {
                            return <ItemSlider key={uuidv4()} tipo={opt} nombre={router.locale==="es"?item.evDescripcion.trim():(router.locale==="en"?(item.evDescriptionEn ? item.evDescriptionEn.trim() : ""):(item.evDescriptionPt ? item.evDescriptionPt.trim() : ""))} urlportada={router.locale==="es"?item.evtUrlAfiche.trim():(router.locale==="en"?item.evtUrlAficheEn.trim():item.evtUrlAfichePt.trim())} />
                        } else if (opt === 90) {
                            return <ItemSlider key={uuidv4()} tipo={opt} folderdoc={folderDoc} url={item.dtUrlEnlace.trim()} nombre={router.locale==="es"?item.dtDescripcion1.trim():(router.locale==="en"?item.dtDescripcion1En.trim():item.dtDescripcion1Pt.trim())} folderimg={folderImg} urlimgvid={item.dtImagen.trim()} />
                        } else if (opt === 91) {
                            return <ItemSlider key={uuidv4()} tipo={opt} option={item.sldTipo} folderdoc={folderDoc} url={router.locale === "es" ? item.sldEnlace.trim() : (router.locale === "en" ? item.sldEnlaceEn.trim() : item.sldEnlacePt.trim())} nombre={router.locale === "es" ? item.sldTitulo.trim() : (router.locale === "en" ? item.sldTituloEn.trim() : item.sldTituloPt.trim())} folderimg={folderImg} urlimgvid={router.locale === "es" ? item.sldUrlImgVid.trim() : (router.locale === "en" ? item.sldUrlImgVidEn.trim() : item.sldUrlImgVidPt.trim())} />
                        } else if (opt === 92) {
                            return <ItemSlider key={uuidv4()} tipo={opt} urlembvid={item.video} nombre={item.titulo} palabras={item.palabras_clave} autores={item.autor_principal} codigo={item.idponencia} />
                        } else {
                            return <ItemSlider key={uuidv4()} tipo={opt} option={item.sldTipo} folderdoc={folderDoc} url={item.sldEnlace.trim()} nombre={router.locale === "es" ? item.sldTitulo.trim() : (router.locale === "en" ? item.sldTituloEn.trim() : item.sldTituloPt.trim())} folderimg={folderImg} urlimgvid={item.sldUrlImgVid.trim()} />
                        }
                    }
                )
            }
        </Carousel>
        <Modal
            size="lg"
            show={modalShow}
            onHide={handleClose}
            animation={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {opt === 24 ? 'Resumen semanal' : 'UTEQ Investiga'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-0">
                    <div className="ratio ratio-16x9">
                        <iframe src={urlVideo} title={titulo} frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" sandbox='allow-same-origin allow-scripts allow-presentation' loading='eager'></iframe>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>);
}