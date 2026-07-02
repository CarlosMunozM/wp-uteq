import { Accordion } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { UBU_IMGS_EVENTS_UBU } from "config";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';


export { ListItems };


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

function ItemSliderImage(props) {
    return (
        <div className="row gx-2 gy-2">
            <div className="col-md-6">
                <div className="ratio ratio-16x9 p-3">
                    <img src={UBU_IMGS_EVENTS_UBU + props.url.trim()} alt={(props.descripcion !== null && props.descripcion !== "") ? props.descripcion.trim() : "Imagen del evento"} />
                </div>
            </div>
            <div className="col-md-6">
                <div className="ratio ratio-16x9 p-3">
                    <img src={UBU_IMGS_EVENTS_UBU + props.url.trim()} alt={(props.descripcion !== null && props.descripcion !== "") ? props.descripcion.trim() : "Imagen del evento"} />
                </div>
            </div>
            <div className="col-md-6">
                <div className="ratio ratio-16x9 p-3">
                    <img src={UBU_IMGS_EVENTS_UBU + props.url.trim()} alt={(props.descripcion !== null && props.descripcion !== "") ? props.descripcion.trim() : "Imagen del evento"} />
                </div>
            </div>
            <div className="col-md-6">
                <div className="ratio ratio-16x9 p-3">
                    <img src={UBU_IMGS_EVENTS_UBU + props.url.trim()} alt={(props.descripcion !== null && props.descripcion !== "") ? props.descripcion.trim() : "Imagen del evento"} />
                </div>
            </div>
        </div>
    )
}

function ItemImg(props) {
    return (
        <div className="col-md-6">
            <div className="ratio ratio-16x9 p-3 pnl-photg">
                <img src={UBU_IMGS_EVENTS_UBU + props.url.trim()} className="p-1" alt={(props.descripcion !== null && props.descripcion !== "") ? props.descripcion.trim() : "Imagen del evento"} />
            </div>
        </div>
    )
}

function ItemSliderGalImages(props) {
    return (<><div className="row gx-2 gy-2">{props.datasld.map((item) => {
        return (<ItemImg key={uuidv4()} url={item.ieUrl} descripcion={item.ieDescripcion} />)
    })
    }</div></>)
}

const listItemsGallery = (dataItems, divider, quotient, numelements) => {
    var valbegin = 0, valend = 0, datagal = [], elmts = [...Array(divider).keys()];

    if (quotient === 0) {
        return (elmts.map((counter) => {
            datagal = [];
            valbegin = counter * numelements;
            valend = valbegin + numelements;
            datagal = dataItems.slice(valbegin, valend);

            if (datagal.length > 0) {
                return (<ItemSliderGalImages key={uuidv4()} datasld={datagal} />)
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
                return (<ItemSliderGalImages key={uuidv4()} datasld={datagal} />)
            }
        }))
    }
}

const listItemsSliderImages = (dataItems) => {
    const numelements = 4;
    var divider = 0, quotient = 0;

    divider = Math.ceil(dataItems.length / numelements);
    quotient = dataItems.length % numelements;

    if (divider <= 1) {
        return (<div className="row gx-2 gy-2"><ItemSliderGalImages key={uuidv4()} datasld={dataItems} /></div>)
    } else {
        return (listItemsGallery(dataItems, divider, quotient, numelements))
    }
}

const panelPhotographies = (dataItems, numelements) => {
    if (dataItems.length <= numelements) {
        return (<div className="row gx-2 gy-2"><ItemSliderGalImages key={uuidv4()} datasld={dataItems} /></div>);
    } else {
        return (<Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            arrows={true}
            responsive={responsiveCust()}
            ssr={true}
            infinite={true}
            key="1"
            autoPlay={true}
            autoPlaySpeed={2500}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={900}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="item">
            {listItemsSliderImages(dataItems)}
        </Carousel>);
    }
}

function ItemEvent(props) {
    return (<>
        <h2 className="title-evt-area text-rigth mt-2">{props.descevt}</h2>
        <p>
            {
                (props.urlfac !== null && props.urlfac !== "") && (
                    <>
                        <a href={props.urlfac !== null && props.urlfac !== "" ? props.urlfac : "#"} target="_blank" data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? "Cobertura del evento - Facebook" : (props.language === "en" ? "Event coverage - Facebook" : "Cobertura de eventos - Facebook")}>
                            <span className="badge badge-cust-facb"><i className="fa fa-facebook fa-1x" aria-hidden="true"></i>{` | ${props.language === "es" ? "Cobertura del evento" : (props.language === "en" ? "Event coverage" : "Cobertura de eventos")}`}</span>
                        </a>
                    </>
                )
            }
            {
                (props.urlyoutb !== null && props.urlyoutb !== "") && (
                    <>
                        <a href={props.urlyoutb !== null && props.urlyoutb !== "" ? props.urlyoutb : "#"} target="_blank" data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? "Video del evento - Youtube" : (props.language === "en" ? "Video of the event - Youtube" : "Vídeo do evento - Youtube")}>
                            <span className="badge badge-cust-yout"><i className="fa fa-youtube fa-1x" aria-hidden="true"></i>{` | ${props.language === "es" ? "Video del evento" : (props.language === "en" ? "Video of the event" : "Vídeo do evento")}`}</span>
                        </a>
                    </>
                )
            }
            {
                (props.urlweb !== null && props.urlweb !== "") && (<>
                    <Link href={props.urlweb !== null && props.urlweb !== "" ? props.urlweb : "#"}>
                        <a target="_blank" data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? "Nota informativa acerca del evento" : (props.language === "en" ? "Information note about the event" : "Nota de informação sobre o evento")}>
                            <span className="badge badge-pag-web-inst"><i className="fa fa-link fa-1x" aria-hidden="true"></i>{` | ${props.language === "es" ? "Nota informativa" : (props.language === "en" ? "Information note" : "Nota de informação")}`}</span>
                        </a>
                    </Link>
                </>)
            }
        </p>
        {
            props.dataimgs.filter(imagen => imagen.objEvento.evCodigo === props.codevt).sort((a, b) => (a.ieOrden > b.ieOrden) ? 1 : -1).length > 0 && (
                panelPhotographies(props.dataimgs.filter(imagen => imagen.objEvento.evCodigo === props.codevt).sort((a, b) => (a.ieOrden > b.ieOrden) ? 1 : -1), 4))
        }
        <hr />
    </>)
}

const listItemsEvents = (dataItems, dataImgs, language) => {
    return (
        dataItems.map((item) => {
            return (<ItemEvent key={uuidv4()} descevt={language === "es" ? item.objEvento.evDescripcion : (language === "en" ? item.objEvento.evDescripcionEn : item.objEvento.evDescripcionPt)} urlfac={item.objEvento.evUrlVidFac} urlyoutb={item.objEvento.evUrlVidYout} urlweb={item.objEvento.evUrlPagWeb} codevt={item.objEvento.evCodigo} dataimgs={dataImgs} language={language} />)
        })
    )
}

function ItemPanel(props) {
    return (
        <Accordion.Item eventKey={props.index}>
            <Accordion.Header>{`${props.language === "es" ? "Periodo" : (props.language === "en" ? "Period" : "Período")} ${props.anio}`}</Accordion.Header>
            <Accordion.Body>
                {listItemsEvents(props.events.filter(evento => parseInt(evento.objEvento.evFecha.substr(0, 4), 10) === props.anio).sort((a, b) => (a.evFecha > b.evFecha) ? 1 : -1), props.dataimg, props.language)}
            </Accordion.Body>
        </Accordion.Item>
    )
}

function ListItems(listsEvents) {

    const [stateLoading, setStateLoading] = useState(true);

    const listItemsPanels = (dataItems, dataImgs, dataEvents, language) => {
        return (
            dataItems.map((valueanio, index) => {
                return (<ItemPanel key={uuidv4()} index={index} anio={valueanio} events={dataEvents} dataimg={dataImgs} language={language} />)
            })
        )
    }

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setStateLoading(false);
        }, 6000);
    }, []);

    function renderPanelList(listData) {
        if (listData.length > 0) {
            var listYears = [...new Set(listData.map(function (obj) { return parseInt(obj.objEvento.evFecha.substr(0, 4), 10); }))];
            listYears = listYears.sort(function (a, b) { return b - a; });
            var listEventsFilter = listData.filter((value, index, arr) => index === arr.map(function (obj) { return obj.objEvento.evCodigo; }).indexOf(value.objEvento.evCodigo));
            {
                return (<>
                    <Accordion defaultActiveKey={0}>
                        {
                            listItemsPanels(listYears, listData, listEventsFilter, router.locale)
                        }
                    </Accordion>
                </>);
            }
        }
    }

    return (<>{stateLoading ? (<>
        <div className="row g-0">
            <div className="ratio ratio-16x9">
                <img src="/assets/img/img-loading-uteq.gif" alt="Imagen de cargado" />
            </div>
        </div>
    </>) : renderPanelList(listsEvents)}</>);
}