import { Tabs, Tab, SSRProvider } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DOMPurify from 'isomorphic-dompurify';
import { CAREERS_MSC_IMG_FOLDER, PHOTOS_FOLDER } from 'config';
import { SliderImg, PanelNews } from "components";
import { FormInscripcion } from "components/forms";
import { v4 as uuidv4 } from 'uuid';
import { Badge } from 'react-bootstrap';


export { BodyPosgrado };

const responsiveCust = () => {
    return {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 2000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 2000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
};

function ItemListTitles(props) {
    return <li>{props.titulo.trim() + ', ' + props.institucion.trim()}</li>;
}

function ItemListMaster(props) {
    return (
        <div className="col-md-12 w-100 mb-3">
            {SliderImg(props.masters.slice(props.numbegin, props.numend), 11, 2000, 1000)}
        </div>
    )
}

function ItemMasterPortrait(props) {
    const regEx = /^http/;
    return (
        <div className="col-md-4">
            <div className="ratio ratio-4x3 pnl-photg">
                <a target="_blank" href={!regEx.test(props.url) ? `/posgrado/${props.url.trim()}` : props.url.trim()} aria-label="link maestria" data-toggle="tooltip" data-placement="bottom" title={props.nombre.trim()}>
                    <img src={CAREERS_MSC_IMG_FOLDER + props.urlportada.trim()} className="ratio ratio-4x3" alt={(props.nombre !== null && props.nombre !== "") ? `${props.nombre.trim().substring(0, 14)} - ${props.numero}` : "Programa de Maestría"} />
                </a>
            </div>
        </div>
    )
}

function ItemSliderMasterPortrait(props) {
    return (<><div className="row gx-2 gy-2">{props.datasld.map((item, index) => {
        return (<ItemMasterPortrait key={uuidv4()} url={item.crUrlParcial} nombre={props.language === "es" ? item.crNombre : (props.language === "en" ? item.crNombreEn : item.crNombrePt)}
            urlportada={props.language === "es" ? item.crUrlPortada : (props.language === "en" ? item.crUrlPortadaEn : item.crUrlPortadaPt)} numero={index} />)
    })
    }</div></>)
}

const listItemsMasters = (dataItems, divider, quotient, numelements, language) => {
    var valbegin = 0, valend = 0, datagal = [], elmts = [...Array(divider).keys()];

    if (quotient === 0) {
        return (elmts.map((counter) => {
            datagal = [];
            valbegin = counter * numelements;
            valend = valbegin + numelements;
            datagal = dataItems.slice(valbegin, valend);

            if (datagal.length > 0) {
                return (<ItemSliderMasterPortrait key={uuidv4()} datasld={datagal} language={language} />)
            }
        }))
    } else {
        return (elmts.map((counter) => {
            datagal = [];
            numelements = counter === (divider - 1) ? quotient : numelements;
            valbegin = counter > 0 ? valend : 0;
            valend = valbegin + numelements;
            datagal = dataItems.slice(valbegin, valend);

            if (datagal.length > 0) {
                return (<ItemSliderMasterPortrait key={uuidv4()} datasld={datagal} language={language} />)
            }
        }))
    }
}

const listItemsSliderImages = (dataItems, language) => {
    const numelements = 6;
    var divider = 0, quotient = 0;

    divider = Math.ceil(dataItems.length / numelements);
    quotient = dataItems.length % numelements;

    if (divider <= 1) {
        return (<div className="row gx-2 gy-2"><ItemSliderMasterPortrait key={uuidv4()} datasld={dataItems} language={language} /></div>)
    } else {
        return (listItemsMasters(dataItems, divider, quotient, numelements, language))
    }
}

const panelMastersPortraits = (dataItems, numelements, language) => {
    if (dataItems.length <= numelements) {
        return (<div className="row gx-2 gy-2"><ItemSliderMasterPortrait key={uuidv4()} datasld={dataItems} language={language} /></div>);
    } else {
        return (<Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            arrows={false}
            responsive={responsiveCust()}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            customTransition="transform 750ms ease-in-out 0s"
            transitionDuration={900}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="item">
            {listItemsSliderImages(dataItems, language)}
        </Carousel>);
    }
}

function BodyPosgrado(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const style_img = {
        width: "100%",
        height: "100%"
    };

    const renderListCareers = (dataCareers) => {
        var numItemsPerSlider = ((dataCareers.mscdegs.length / 3) | 0), numItemsDiff = (dataCareers.mscdegs.length - (((dataCareers.mscdegs.length / 3) | 0) * 3));
        var numBegin = 0, numEnd = 0;
        return ([1, 2, 3].map(
            (item, index) => {
                numBegin = numEnd;
                numEnd = (index == 3 ? (numBegin + numItemsPerSlider + numItemsDiff) : (numBegin + numItemsPerSlider));
                return (<>
                    <div className="col-md-12 w-100 mb-3" key={uuidv4()}>
                        {SliderImg(dataCareers.mscdegs.slice(numBegin, numEnd), 11, 2000, 1000)}
                    </div>
                </>);
            }
        ));
    }

    const renderListMasters = (dataPrograms) => {
        var numItemsPerSlider = ((dataPrograms.mscdegs.length / 3) | 0), numItemsDiff = (dataPrograms.mscdegs.length - (((dataPrograms.mscdegs.length / 3) | 0) * 3));
        var numBegin = 0, numEnd = 0;

        return ([1, 2, 3].map((item, index) => {
            numBegin = numEnd;
            numEnd = (index == 3 ? (numBegin + numItemsPerSlider + numItemsDiff) : (numBegin + numItemsPerSlider));
            return (<ItemListMaster key={uuidv4()} masters={dataPrograms.mscdegs} numbegin={numBegin} numend={numEnd} />)
        }))

    }

    const listItemsTitles = (dataItems) => {
        return (dataItems.auListadoTitulosAcad.length > 0 && (<><h6 className="shp-title mt-3">Títulos académicos</h6><div className="col-md-12 w-100"><ul className="list-unord-titles ml-5">
            {dataItems.auListadoTitulosAcad.map(
                (item) => {
                    return (<>
                        <ItemListTitles key={uuidv4()} titulo={item.taTituloRec} institucion={item.taInstitucionSup} />
                    </>);
                }
            )}
        </ul></div></>))
    }

    function getTitlesByAuthority(dataTitle, language) {
        var titles = '';
        if (dataTitle.length > 0) {

            dataTitle.map((item) => (
                titles += (titles, (language === "es" ? item.taTituloRec.trim() : (language === "en" ? item.taTituloRecEn.trim() : item.taTituloRecPt.trim()))
                /*+ " - " + item.taInstitucionSup.trim())*/ + ". ")
            ));

        }
        return titles.trim();
    }

    return (<><SSRProvider>
        <div className="row g-0">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Unidad de Posgrado" : (data.language === "en" ? "Postgraduate Unit" : "Unidade de pós-graduação")}</h2>
            <div className="row g-0">
                <div className="col-md-12 g-0">
                    <div className="col-md-12 w-100">
                        {(data.mscdegs !== "" && data.mscdegs !== null) && panelMastersPortraits(data.mscdegs, 6, data.language)}
                    </div>
                </div>
            </div><br />
            <div className="row g-0 mt-3">
                <div className="col-md-12 g-0">
                    <Tabs defaultActiveKey="tab0" id="tab-info">
                        <Tab eventKey="tab0" title={data.language === "es" ? "Información" : (data.language === "en" ? "Information" : "Informações")}>
                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData((
                                (data.language === "es" ? ((data.inform.dpVision !== null && data.inform.dpVision !== "") ? data.inform.dpVision : "") :
                                    (data.language === "en" ? ((data.inform.dpVisionEn !== null && data.inform.dpVisionEn !== "") ? data.inform.dpVisionEn : "") :
                                        ((data.inform.dpVisionPt !== null && data.inform.dpVisionPt !== "") ? data.inform.dpVisionPt : ""))) +
                                (data.language === "es" ? data.inform.dpMision.trim() : (data.language === "en" ? data.inform.dpMisionEn.trim() : data.inform.dpMisionPt.trim())) +
                                (data.language === "es" ? data.inform.dpObjetivos.trim() : (data.language === "en" ? data.inform.dpObjetivosEn.trim() : data.inform.dpObjetivosPt.trim()))))}></div>
                            {
                                (data.authort !== "" && data.authort !== null) ? (<>
                                    <h2 className="msg-pnl-search text-right">{data.language === "es" ? "Correo electrónico" : (data.language === "en" ? "E-mail" : "Endereço electrónico")}</h2>
                                    {
                                        (data.authort.auCorreoElect !== null && data.authort.auCorreoElect !== '') ? (<>
                                            <a href={`mailto:${data.authort.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Comunicación vía correo electrónico" : (data.language === "en" ? "Communication via e-mail" : "Comunicação por correio electrónico")}
                                                style={{ textDecoration: 'none' }}>
                                                <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{data.authort.auCorreoElect.trim()}</Badge>
                                            </a>
                                        </>) : (<></>)
                                    }
                                </>) : (<></>)
                            }
                        </Tab>
                        <Tab eventKey="tab1" title={data.language === "en" ? "Contact" : "Contacto"}>
                            {
                                (data.authort !== null && data.authort !== "") && (<>
                                    <div className="row pn-aut-data">
                                        <div className="col-md-12 mx-auto pnl-aut-info" style={{ border: "1px solid rgba(236,185,50,1)" }}>
                                            <div className="row pn-bd-dean">
                                                <div className="col-md-6 g-0 pnl-aut-info-img" style={{ borderRight: "1px solid rgba(236,185,50,1)", borderBottom: "1px solid rgba(236,185,50,1)" }}>
                                                    <img src={(data.authort.auUrlFotoAlt !== null && data.authort.auUrlFotoAlt !== "" && data.authort.auUrlFotoAlt !== "#") ? (PHOTOS_FOLDER + data.authort.auUrlFotoAlt.trim()) : (data.authort.auGenero === "M" ? (PHOTOS_FOLDER + "img-aut-masc-default.jpg") : (PHOTOS_FOLDER + "img-aut-fem-default.jpg"))} className="card-img-top" alt={data.language === "es" ? "Imagen 1" : (data.language === "en" ? "Image 1" : "Imagem 1")} style={style_img} />
                                                </div>
                                                <div className="col-md-6 pnl-text-dean">
                                                    <div className="row">
                                                        <div className="col-md-12 w-100 text-center p-2 title-mn-third">{data.authort.auNombres.trim() + ' ' + data.authort.auApellidos.trim() + ' - ' + (data.authort.auGenero === "M" ? (data.language === "es" ? data.authort.auObjCargo.dmDescripcion.trim() :
                                                            (data.language === "en" ? data.authort.auObjCargo.dmDescripcionEn.trim() : data.authort.auObjCargo.dmDescripcionPt.trim())) : (data.language === "es" ? data.authort.auObjCargo.dmRespuesta.trim() :
                                                                (data.language === "en" ? data.authort.auObjCargo.dmRespuestaEn.trim() : data.authort.auObjCargo.dmRespuestaPt.trim())))}</div>
                                                        {
                                                            data.authort.auListadoTitulosAcad.length > 0 && (<><h3 className="shp-title mt-3">{data.language === "es" ? "Títulos académicos" : (data.language === "en" ? "Academic qualifications" : "Habilitações académicas")}</h3><div className="col-md-12 w-100"><ul className="list-unord-titles ml-5">
                                                                {getTitlesByAuthority(data.authort.auListadoTitulosAcad, data.language)}
                                                            </ul></div></>)
                                                        }
                                                        <h3 className="shp-title mt-2">{data.language === "en" ? "Contact" : "Contacto"}</h3>
                                                        <p className="shp-content">{(data.authort.auTelefono !== null && data.authort.auTelefono !== '') && `${data.language === "es" ? "Telf." : (data.language === "en" ? "Phone" : "Tel.")}: (+593) ${data.authort.auTelefono.trim()} Ext. ${data.authort.auExtensTelf.trim()}`}<br />{(data.authort.auCorreoElect !== null && data.authort.auCorreoElect !== '') && `${data.language === "es" ? "Correo" : (data.language === "en" ? "Email" : "Correio")}: ${data.authort.auCorreoElect.trim()}`}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>)
                            }
                        </Tab>
                        <Tab eventKey="tab2" title={data.language === "es" ? "Noticias" : (data.language === "en" ? "News" : "Notícias")}>
                            {
                                (data.news !== null && data.news !== "") && (<>
                                    {
                                        data.news.length > 0 && (<>{PanelNews(data.news, data.actcategrs, data.codpage)}</>)
                                    }
                                </>)
                            }
                        </Tab>
                        <Tab eventKey="tab3" title={data.language === "es" ? "Solicitud" : (data.language === "en" ? "Application" : "Aplicação")}>
                            {FormInscripcion("", data.mscdegs, data.inform.dpUrlVideoInscripcion, data.language)}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    </SSRProvider></>);
}