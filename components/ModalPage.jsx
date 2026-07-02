import axios from "axios";
import { WS_LIST_ELEMENTS_OF_MODAL, IMG_MODAL_FOLDER } from 'config';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { v4 as uuidv4 } from 'uuid';



export { ModalPage };

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

function ElementModalSld(props) {
    if (props.estado === 1) {
        if (props.tiporec === "IMG") {
            if (props.urlenlace !== "#" && props.urlenlace !== "") {
                return (<div className="row g-0">
                    <a href={props.urlenlace} target="_blank" aria-label="link modal img" data-toggle="tooltip" data-placement="bottom" title={props.descripcion.trim()}
                        style={{ textDecoration: 'none' }}>
                        <div className={`ratio ${props.proporcion.trim()}`}>
                            <img src={`${IMG_MODAL_FOLDER}${props.urlrecurso.trim()}`} alt={props.descripcion.trim()} />
                        </div></a>
                </div>)
            } else {
                return (<div className="row g-0">
                    <div className={`ratio ${props.proporcion.trim()}`}>
                        <img src={`${IMG_MODAL_FOLDER}${props.urlrecurso.trim()}`} alt={props.descripcion.trim()} />
                    </div>
                </div>)
            }
        } else {
            return (<div className="row g-0">
                <div className={`ratio ${props.proporcion.trim()}`}>
                    <iframe src={`${props.urlrecurso.trim()}?playsinline=1&enablejsapi=1&rel=0&autoplay=1&mute=1&controls=0&loop=1`} title={props.descripcion.trim()} frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" sandbox='allow-same-origin allow-scripts allow-presentation' loading='eager'></iframe>
                </div>
            </div>)
        }
    }
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

function ModalPage(cod_entidad, language) {

    const [listElementsModal, setListElementsModal] = useState([]);
    const [modalShow, setModalShow] = useState(true);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const regEx = /^http/;

    useEffect(() => {
        (async () => {
            if (cod_entidad !== "" && cod_entidad !== null) {
                const listElmtsModal = await make_request_ws(`${WS_LIST_ELEMENTS_OF_MODAL}${cod_entidad}`);
                setListElementsModal(listElmtsModal.data);
            } else {
                setListElementsModal([]);
            }
        })();
    }, []);

    function compareDateModalBox(dateBegin, dateEnd, dateNow) {
        var response = false;

        if (dateEnd !== "" && dateEnd !== null) {
            response = new Date(dateBegin).getTime() <= dateNow.getTime() && new Date(dateEnd).getTime() >= dateNow.getTime();
        } else {
            response = new Date(dateBegin).getTime() <= dateNow.getTime();
        }

        return response;
    }

    const ElementModalTwo = (urlenlace, descripcion, proporcion, urlrecurso, tiporec) => {
        return (<><div className="row">
            <div className="col-md-12">
                <button type="button" className="btn-close topright float-end" data-bs-dismiss="modal" aria-label="Close" data-toggle="tooltip" data-placement="bottom"
                    title={language === "es" ? "Cerrar ventana modal" : (language === "en" ? "Close modal window" : "Fechar a janela modal")} onClick={handleClose}></button>
            </div>
            <div className="col-md-12">
                <div className="row g-0">
                    {
                        tiporec === "IMG" ? (<>
                            {
                                (urlenlace !== "#" && urlenlace !== "") ? (<>
                                    {
                                        <a href={urlenlace.trim()} target="_blank" aria-label="link modal img" data-toggle="tooltip" data-placement="bottom" title={descripcion.trim()} style={{ textDecoration: 'none' }}>
                                            <div className={`ratio ${proporcion.trim()}`}>
                                                <img src={`${IMG_MODAL_FOLDER}${urlrecurso.trim()}`} alt={descripcion.trim()} />
                                            </div>
                                        </a>
                                    }
                                </>) : (<>
                                    <div className={`ratio ${proporcion.trim()}`}>
                                        <img src={`${IMG_MODAL_FOLDER}${urlrecurso.trim()}`} alt={descripcion.trim()} />
                                    </div>
                                </>)
                            }
                        </>) : (<div className={`ratio ${proporcion.trim()}`}>
                            <iframe src={`${urlrecurso.trim()}?playsinline=1&enablejsapi=1&rel=0&autoplay=1&mute=1&controls=0&loop=1`} title={descripcion.trim()} frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                sandbox='allow-same-origin allow-scripts allow-presentation' loading='eager'></iframe>
                        </div>)
                    }
                </div>
            </div>
        </div></>)
    }

    const listItemsModalFirst = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (<ElementModalSld key={uuidv4()} estado={item.mdsEstado} tiporec={item.mdsTipoRec} urlenlace={language === "es" ? item.mdsUrlEnlace : (language === "en" ? item.mdsUrlEnlaceEn : item.mdsUrlEnlacePt)}
                    descripcion={language === "es" ? item.mdsDescripcion : (language === "en" ? item.mdsDescripcionEn : item.mdsDescripcionPt)}
                    proporcion={item.mdsModal.mdpProporcion} urlrecurso={language === "es" ? item.mdsUrlRecurso : (language === "en" ? item.mdsUrlRecursoEn : item.mdsUrlRecursoPt)} />);
            })
        )
    }

    /*function generateBoxModal(listElmts) {
        const fechaActual = new Date();
        var listAux = listElmts[0].mdsModal.mdpSlider === 0 ? listElmts.filter(item_modal => item_modal.mdsEstado === 1).sort((a, b) => (a.mdsOrden > b.mdsOrden) ? 1 : -1) : null;

        if (listElmts[0].mdsModal.mdpEstado === 1) {
            if (compareDateModalBox(listElmts[0].mdsModal.mdpFechaInicio, listElmts[0].mdsModal.mdpFechaFin, fechaActual) && listElmts.filter(item_modal => item_modal.mdsEstado === 1).length > 0) {
                return (<>
                    <Modal
                        size="lg"
                        show={modalShow}
                        onHide={handleClose}
                        animation={true}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        {
                            listElmts[0].mdsModal.mdpSlider === 1 ? (<>{
                                (listElmts[0].mdsModal.mdpTitulo !== null && listElmts[0].mdsModal.mdpTitulo !== "") ? (<>
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            {language==="es"?listElmts[0].mdsModal.mdpTitulo.trim():(language==="en"?listElmts[0].mdsModal.mdpTituloEn.trim():listElmts[0].mdsModal.mdpTituloPt.trim())}
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Carousel
                                            swipeable={false}
                                            draggable={false}
                                            showDots={false}
                                            arrows={true}
                                            responsive={responsiveCust()}
                                            ssr={true}
                                            infinite={true}
                                            autoPlay={true}
                                            autoPlaySpeed={2000}
                                            keyBoardControl={true}
                                            customTransition="all .5"
                                            transitionDuration={900}
                                            containerclassName="carousel-container text-center"
                                            dotListclassName="custom-dot-list-style"
                                            itemclass="carousel-item-padding-40-px">
                                            {listItemsModalFirst(listElmts.sort((a, b) => (a.mdsOrden > b.mdsOrden) ? 1 : -1))}
                                        </Carousel>
                                    </Modal.Body>
                                </>) : (<>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button type="button" className="btn-close topright float-end" data-bs-dismiss="modal" aria-label="Close" data-toggle="tooltip" data-placement="bottom" 
                                            title={language==="es"?"Cerrar ventana modal":(language==="en"?"Close modal window":"Fechar a janela modal")} 
                                            onClick={handleClose}></button>
                                        </div>
                                        <div className="col-md-12">
                                            <Carousel
                                                swipeable={false}
                                                draggable={false}
                                                showDots={false}
                                                arrows={true}
                                                responsive={responsiveCust()}
                                                ssr={true}
                                                infinite={true}
                                                autoPlay={true}
                                                autoPlaySpeed={2000}
                                                keyBoardControl={true}
                                                customTransition="all .5"
                                                transitionDuration={900}
                                                containerclassName="carousel-container text-center"
                                                dotListclassName="custom-dot-list-style"
                                                itemclass="carousel-item-padding-40-px">
                                                {listItemsModalFirst(listElmts.sort((a, b) => (a.mdsOrden > b.mdsOrden) ? 1 : -1))}
                                            </Carousel>
                                        </div>
                                    </div>
                                </>)
                            }</>) : (<>{
                                (listAux[0].mdsModal.mdpTitulo !== null && listAux[0].mdsModal.mdpTitulo !== "") ? (<>
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            {language==="es"?listAux[0].mdsModal.mdpTitulo.trim():(language==="en"?listAux[0].mdsModal.mdpTituloEn.trim():listAux[0].mdsModal.mdpTituloPt.trim())}
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ElementModalSld key={uuidv4()} estado={1} tiporec={listAux[0].mdsTipoRec}
                                            urlenlace={language === "es" ? listAux[0].mdsUrlEnlace : (language === "en" ? listAux[0].mdsUrlEnlaceEn : listAux[0].mdsUrlEnlacePt)}
                                            descripcion={language === "es" ? listAux[0].mdsDescripcion : (language === "en" ? listAux[0].mdsDescripcionEn : listAux[0].mdsDescripcionPt)}
                                            proporcion={listAux[0].mdsModal.mdpProporcion}
                                            urlrecurso={language === "es" ? listAux[0].mdsUrlRecurso : (language === "en" ? listAux[0].mdsUrlRecursoEn : listAux[0].mdsUrlRecursoPt)} />
                                    </Modal.Body></>) : (ElementModalTwo((language === "es" ? listAux[0].mdsUrlEnlace : (language === "en" ? listAux[0].mdsUrlEnlaceEn : listAux[0].mdsUrlEnlacePt)),
                                        (language === "es" ? listAux[0].mdsDescripcion : (language === "en" ? listAux[0].mdsDescripcionEn : listAux[0].mdsDescripcionPt)),
                                        listAux[0].mdsModal.mdpProporcion, (language === "es" ? listAux[0].mdsUrlRecurso : (language === "en" ? listAux[0].mdsUrlRecursoEn : listAux[0].mdsUrlRecursoPt)), listAux[0].mdsTipoRec))
                            }</>)
                        }
                    </Modal>
                </>)
            }
        }
    }*/
    
    function generateBoxModal(listElmts) {
        const fechaActual = new Date();
        const activeModals = listElmts.filter(item_modal => item_modal.mdsEstado === 1).sort((a, b) => (a.mdsOrden > b.mdsOrden) ? 1 : -1);

        if (activeModals.length === 0 || activeModals[0].mdsModal.mdpEstado !== 1) {
            return null;
        }

        const mostRecentModal = activeModals[0];
        const isModalActive = compareDateModalBox(
            mostRecentModal.mdsModal.mdpFechaInicio,
            mostRecentModal.mdsModal.mdpFechaFin,
            fechaActual
        );

        if (!isModalActive) {
            return null;
        }

        const title = language === "es"
            ? mostRecentModal.mdsModal.mdpTitulo.trim()
            : (language === "en" ? mostRecentModal.mdsModal.mdpTituloEn.trim()
                : mostRecentModal.mdsModal.mdpTituloPt.trim());

        const body = mostRecentModal.mdsModal.mdpSlider === 1 ? (
            mostRecentModal.mdsModal.mdpTitulo !== null && mostRecentModal.mdsModal.mdpTitulo !== "" ? (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Carousel
                            swipeable={false}
                            draggable={false}
                            showDots={false}
                            arrows={true}
                            responsive={responsiveCust()}
                            ssr={true}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={5000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={900}
                            containerclassName="carousel-container text-center"
                            dotListclassName="custom-dot-list-style"
                            itemclass="carousel-item-padding-40-px">
                            {listItemsModalFirst(activeModals)}
                        </Carousel>
                    </Modal.Body>
                </>
            ) : (
                <>
                    <div className="row">
                        <div className="col-md-12">
                            <button
                                type="button"
                                className="btn-close topright float-end"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title={
                                    language === "es"
                                        ? "Cerrar ventana modal"
                                        : language === "en"
                                            ? "Close modal window"
                                            : "Fechar a janela modal"
                                }
                                onClick={handleClose}
                            ></button>
                        </div>
                        <div className="col-md-12">
                            <Carousel
                                swipeable={false}
                                draggable={false}
                                showDots={false}
                                arrows={true}
                                responsive={responsiveCust()}
                                ssr={true}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                keyBoardControl={true}
                                customTransition="all .5"
                                transitionDuration={900}
                                containerclassName="carousel-container text-center"
                                dotListclassName="custom-dot-list-style"
                                itemclass="carousel-item-padding-40-px">
                                {listItemsModalFirst(activeModals)}
                            </Carousel>
                        </div>
                    </div>
                </>
            )
        ) : (mostRecentModal.mdsModal.mdpTitulo !== null && mostRecentModal.mdsModal.mdpTitulo !== "" ? (
            <>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ElementModalSld
                        key={uuidv4()}
                        estado={1}
                        tiporec={mostRecentModal.mdsTipoRec}
                        urlenlace={
                            language === "es"
                                ? mostRecentModal.mdsUrlEnlace
                                : language === "en"
                                    ? mostRecentModal.mdsUrlEnlaceEn
                                    : mostRecentModal.mdsUrlEnlacePt
                        }
                        descripcion={
                            language === "es"
                                ? mostRecentModal.mdsDescripcion
                                : language === "en"
                                    ? mostRecentModal.mdsDescripcionEn
                                    : mostRecentModal.mdsDescripcionPt
                        }
                        proporcion={mostRecentModal.mdsModal.mdpProporcion}
                        urlrecurso={
                            language === "es"
                                ? mostRecentModal.mdsUrlRecurso
                                : language === "en"
                                    ? mostRecentModal.mdsUrlRecursoEn
                                    : mostRecentModal.mdsUrlRecursoPt
                        }
                    />
                </Modal.Body>
            </>
        ) : ElementModalTwo(
            language === "es"
                ? mostRecentModal.mdsUrlEnlace
                : language === "en"
                    ? mostRecentModal.mdsUrlEnlaceEn
                    : mostRecentModal.mdsUrlEnlacePt,
            language === "es"
                ? mostRecentModal.mdsDescripcion
                : language === "en"
                    ? mostRecentModal.mdsDescripcionEn
                    : mostRecentModal.mdsDescripcionPt,
            mostRecentModal.mdsModal.mdpProporcion,
            language === "es"
                ? mostRecentModal.mdsUrlRecurso
                : language === "en"
                    ? mostRecentModal.mdsUrlRecursoEn
                    : mostRecentModal.mdsUrlRecursoPt,
            mostRecentModal.mdsTipoRec
        ));

        return (
            <Modal size="lg" show={modalShow} onHide={handleClose} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
                {body}
            </Modal>
        );
    }

    return (
    <>
    {listElementsModal.length > 0 ? (
    generateBoxModal(listElementsModal)
    ):null}
    </>
    );
}
