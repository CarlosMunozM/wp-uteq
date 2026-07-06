import { HeadComponent, FooterComponent, TopMenu, SideMenu, SliderImg } from 'components';
import {
    BodyContact, BodyDirectorio, BodyOCS, BodyHistoria, BodyCaldAcad, BodyIdentCorp, BodyArchivo, BodyFormatoSolc, BodyTransparencia, BodyCoopInternc, BodyPosgrado, BodyEvalIntrn, BodyPlanifUniv, BodyReglmNorm, BodyTalentoHumn,
    BodyRendicionCtas, BodyAdmision, BodyMaestria, BodyEventoOrgz, BodyLogistica, BodyComunicacion, BodyInformativos, BodyUbu, BodyReglamentos, BodyServicios, BodyPlanificacion, BodyTrabajoSocial, BodyServiciosMed, BodyPsicologia,
    BodyDanza, BodyMusica, BodyDeporte, BodyFichaInscripcion, BodyNoticia, BodyInformeRC, BodyVinculacion, BodyGuiaTramites, BodyProyectosVinc, BodyConveniosVinc, BodySegGraduados, BodyResoluciones, BodyBusqueda, BodySeguros,
    BodyInvestigacion, BodyRedes, BodyMemorias, BodyDireccion, BodyBolsaEmpleos, BodyProyectoVinc, BodyLineasInvst, BodyGruposInvst, BodyGrupoInvst, BodyProyectosInvst, BodyProyectoInvst, BodyConvocatorias, BodyProduccionCientifica,
    BodyLibros, BodyCapLibro, BodyLibro, BodyArticulo, BodyPonencia, BodyProcesoEvIntn, BodyFacultades, BodyFacultad, BodyCarrera, BodyCidu, BodyLaboratorios, BodyBusq, BodyMapaSitioWeb, BodySitioWebRector, /*BodySitioWebVicerrectorAdm,*/
    BodySitioWebVicerrectoraAcad, BodyAyudasEconomicas, BodyDesafioUTEQ, BodyAdmision2,
    BodyCaldAcadNiv,
    BodyProcesoAdmision,
    BodyPruebaIngresoAdms,
    BodySitioWebVicerrectorAdm,
    BodyUsuarios
} from 'components/body';
import { VIDEOS_FOLDER, GENERAL_IMGS_FOLDER } from 'config';
import { ModalPage } from 'components';
import React, { useState } from 'react';
import { BodyContactoAdm } from 'components/body/BodyContactoAdm';


export { LayoutSecond };

const host_wp = "https://www.uteq.edu.ec/";
const props_head = {
    title: "Contáctenos - Universidad Técnica Estatal de Quevedo",
    desc: "Sitio web de contactos de la Universidad Técnica Estatal de Quevedo",
    url_page: { host_wp },
    image: `${GENERAL_IMGS_FOLDER}img-meta-ogimage-1.jpg`,
    vald_form: 1
};

function LayoutSecond(data) {
    const renderElementPortadaPage = (datainf) => {
        return (<><div className="jumbotron bg-cover text-white pn-banner-page" style={{ backgroundImage: `url(/assets/images/banners/${datainf.bannerimg})` }}></div><br /></>);
    }

    const renderElementTourVirtual = (datagen) => {
        return (<><br /><br /><div className="row g-0 mb-4">
            <div className="ratio ratio-21x9">
                <video src={VIDEOS_FOLDER + datagen.campus[0].dmUrlFoto.trim()} autoPlay loop muted playsInline>
                </video>
            </div>
        </div></>);
    }

    const renderListMagazines = (datamagz, optPg, language) => {
        return (<><br /><div className="row g-0">
            <h2 className="title-cont-page text-rigth mt-2">{language === "es" ? "Revistas científicas" : (language === "en" ? "Scientific Journals" : "Periódicos científicos")}</h2>
            <div className="col-md-12 w-100 mt-2" id="panel-mg">
                {SliderImg(datamagz, optPg, 2000, 1000)}
            </div>
        </div></>);
    }

    const renderElementBodyPage = (data) => {
        switch (data.option) {
            case 1:
                return BodyContact(data);
            case 2:
                return BodyDirectorio(data);
            case 3:
                return BodyOCS(data);
            case 4:
                return BodyHistoria(data);
            case 5:
                return BodyCaldAcad(data);
            case 6:
                return BodyIdentCorp(data);
            case 7:
                return BodyArchivo(data);
            case 8:
                return BodyFormatoSolc(data);
            case 9:
                return BodyTransparencia(data);
            case 10:
                return BodyCoopInternc(data);
            case 11:
                return BodyPosgrado(data);
            case 12:
                return BodyEvalIntrn(data);
            case 13:
                return BodyPlanifUniv(data);
            case 14:
                return BodyReglmNorm(data);
            case 15:
                return BodyTalentoHumn(data);
            case 16:
                return BodyRendicionCtas(data);
            case 17:
                return BodyAdmision(data);
            case 18:
                return BodyMaestria(data);
            case 19:
                return BodyEventoOrgz(data);
            case 20:
                return BodyLogistica(data);
            case 21:
                return BodyFacultades(data);
            case 22:
                return BodyComunicacion(data);
            case 23:
                return BodyInformativos(data);
            case 26:
                return BodyUbu(data);
            case 27:
                return BodyReglamentos(data);
            case 28:
                return BodyServicios(data);
            case 29:
                return BodyPlanificacion(data);
            case 30:
                return BodyTrabajoSocial(data);
            case 31:
                return BodyServiciosMed(data);
            case 32:
                return BodyPsicologia(data);
            case 33:
                return BodyDanza(data);
            case 34:
                return BodyMusica(data);
            case 35:
                return BodyDeporte(data);
            case 36:
                return BodyFichaInscripcion(data);
            case 37:
                return BodyNoticia(data);
            case 38:
                return BodyInformeRC(data);
            case 39:
                return BodyVinculacion(data);
            case 40:
                return BodyGuiaTramites(data);
            case 41:
                return BodyProyectosVinc(data);
            case 42:
                return BodyConveniosVinc(data);
            case 43:
                return BodySegGraduados(data);
            case 44:
                return BodyResoluciones(data);
            case 45:
                return BodyBusq(data);
            case 46:
                return BodySeguros(data);
            case 47:
                return BodyInvestigacion(data);
            case 48:
                return BodyRedes(data);
            case 49:
                return BodyMemorias(data);
            case 52:
                return BodyDireccion(data);
            case 53:
                return BodyBolsaEmpleos(data);
            case 54:
                return BodyProyectoVinc(data);
            case 55:
                return BodyLineasInvst(data);
            case 56:
                return BodyGruposInvst(data);
            case 57:
                return BodyGrupoInvst(data);
            case 58:
                return BodyProyectosInvst(data);
            case 59:
                return BodyProyectoInvst(data);
            case 60:
                return BodyConvocatorias(data);
            case 62:
                return BodyProduccionCientifica(data);
            case 63:
                return BodyLibros(data);
            case 64:
                return BodyCapLibro(data);
            case 65:
                return BodyLibro(data);
            case 66:
                return BodyArticulo(data);
            case 67:
                return BodyPonencia(data);
            case 68:
                return BodyProcesoEvIntn(data);
            case 69:
                return BodyFacultad(data);
            case 70:
                return BodyCarrera(data);
            case 71:
                return BodyCidu(data);
            case 72:
                return BodyLaboratorios(data);
            case 73:
                return BodyMapaSitioWeb(data);
            case 74:
                // return BodySitioWebRector(data);
                return BodySitioWebVicerrectoraAcad(data);
            case 75:
                // return BodySitioWebVicerrectoraAcad(data);
                return BodySitioWebRector(data);
            case 76:
                return BodySitioWebVicerrectorAdm(data);
            case 77:
                return BodyAyudasEconomicas(data);
            case 78:
                return BodyDesafioUTEQ(data);
            case 79:
                return BodyAdmision2(data);
            case 80:
                return BodyCaldAcadNiv(data);
            case 81:
                return BodyProcesoAdmision(data);
            case 82:
                return BodyContactoAdm(data);
            case 83:
                return BodyPruebaIngresoAdms(data);
            case 84:
                return BodyUsuarios(data);
        }
    }

    const renderElementPresentationVideo = () => {
        return (<>
            <a href="https://tour-virtual.uteq.edu.ec/" target="_blank" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Enlace al Tour Virtual 360" : (data.language === "en" ? "Link to the 360° Virtual Tour" : "Ligação para a visita virtual de 360")}>
                <div className="ratio ratio-16x9 panel-vd">
                    <video
                        className="bg-video"
                        autoPlay
                        loop
                        muted>
                        <source src={VIDEOS_FOLDER + "tour-virtual-360.mp4"} type="video/mp4" />
                    </video>
                    <h1 className="text">{data.language === "es" ? "Tour virtual 360º - Explora y conoce la UTEQ" : (data.language === "en" ? "360º Virtual Tour - Explore and know UTEQ" : "Visita Virtual 360º - Explore e conheça a UTEQ")}
                        <img src="/assets/img/360.png" className="img-360" />
                    </h1>
                </div>
            </a>
        </>)
    }

    return (<>
        <HeadComponent title={(data.option !== null && data.option !== "") ? (data.titlepage) : (props_head.title)}
            desc={(data.option !== null && data.option !== "") ? (data.descpage) : (props_head.desc)}
            url_page={(data.option !== null && data.option !== "") ? (data.urlpageweb) : (props_head.url_page)}
            image={(data.option !== null && data.option !== "") ? (data.urlimage) : (props_head.image)}
            vald_form={(data.option !== null && data.option !== "") ? data.option : vald_form}
            language={(data.option !== null && data.option !== "") ? data.language : "es"} />
        {TopMenu()}
        {
            (data.option !== 19 && data.option !== 37 && data.option !== 38 && data.option !== 73 && data.option !== /*74*/ 75 && data.option !== 79 && data.option !== 80 && data.option !== 81 && data.option !== 82 && data.option !== 83) && renderElementPortadaPage(data)
        }
        {
            (data.option === 74 || data.option === 75 || data.option === 76) ? (<>
                {renderElementBodyPage(data)}
                <br /><br /><div className="row g-0">
                    <div className="col-md-12 col-lg-12">
                        {renderElementPresentationVideo()}
                    </div>
                </div>
            </>) : ""
        }
        {
            (data.option === 79 || data.option === 80 || data.option === 81 || data.option === 82 || data.option === 83) ? (<>
                {renderElementBodyPage(data)}
            </>) : ""
        }
        <div className="container">
            <div className="row">
                {
                    (data.option !== 19 && data.option !== 45 && data.option !== 71 && data.option !== 73 && data.option !== 74 && data.option !== 75 && data.option !== 76 && data.option !== 21 && data.option !== 79 && data.option !== 80 && data.option !== 81 && data.option !== 82 && data.option !== 83) && (<>
                        <div className="col-md-12 col-lg-9">
                            {renderElementBodyPage(data)}
                            {(data.option === 47 || data.option === 48 || data.option === 49 || data.option === 52 || data.option === 55 || data.option === 56 || data.option === 57 || data.option === 58 || data.option === 59 || data.option === 60 || data.option === 62 || data.option === 63 || data.option === 64 || data.option === 65 || data.option === 66 || data.option === 67 || data.option === 72) && renderListMagazines(data.datamagz.filter(item => item.dmCodgDato !== 55), data.option, data.language)}
                            <br /><br /><div className="row">
                                <div className="col-md-12 col-lg-12">
                                    {renderElementPresentationVideo()}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-3 pt-3">
                            {(data.option !== 10) && SideMenu(data)}
                        </div>
                    </>)
                }
                {
                    (data.option === 19 || data.option === 45 || data.option === 71 || data.option === 73 || data.option === 21) && (<>
                        <div className="col-md-12 col-lg-12">
                            {renderElementBodyPage(data)}
                            <br /><br /><div className="row">
                                <div className="col-md-12 col-lg-12">
                                    {renderElementPresentationVideo()}
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>

            {/*<br /><br /><div className="row">
                <div className="col-md-12 col-lg-9">
                    {renderElementPresentationVideo()}
                </div>
            </div>*/}

        </div>

        <br /><br /><br />
        {FooterComponent(data)}
        {(typeof data.codpage !== 'undefined') && ModalPage(data.codpage, data.language)}
    </>);
}