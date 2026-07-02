import Carousel from "react-multi-carousel";
import { IMG_PROJECT_LKG_FOLDER } from 'config';
import { v4 as uuidv4 } from 'uuid';


export { BodyProyectoVinc };


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

function ItemImageGallery(props) {
    return (<div className="row">
        <div className="ratio ratio-16x9">
            <img src={IMG_PROJECT_LKG_FOLDER + props.urlimg.trim()} alt="Imagen de evidencia" />
        </div>
    </div>)
}

function BodyProyectoVinc(data) {

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center">{(data.infoproj !== null && data.infoproj !== '') ? (data.language === "es" ? data.infoproj.pvTitulo.trim() : (data.language === "en" ? data.infoproj.pvTituloEn.trim() : data.infoproj.pvTituloPt.trim())) : 'Proyecto de Vinculación con la sociedad - UTEQ'}</h2>
            {
                (data.infoproj !== null && data.infoproj !== '') && (<>
                    {
                        (data.infoproj.pvCodigoUniv !== null && data.infoproj.pvCodigoUniv !== '') && (<>
                            <h2 className="msg-pnl-search text-rigth mt-3">{data.language === "en" ? "Code" : "Código"}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvCodigoUniv.trim().toUpperCase()}</p></div>
                        </>)
                    }
                    {
                        data.language === "es" ? (
                            (data.infoproj.pvLineaInv !== null && data.infoproj.pvLineaInv !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Línea de investigación</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvLineaInv.trim()}</p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.infoproj.pvLineaInvEn !== null && data.infoproj.pvLineaInvEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Line of research</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvLineaInvEn.trim()}</p></div>
                            </>) : ""
                        ) : (
                            (data.infoproj.pvLineaInvPt !== null && data.infoproj.pvLineaInvPt !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Linha de investigação</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvLineaInvPt.trim()}</p></div>
                            </>) : ""
                        ))
                    }
                    {
                        data.language === "es" ? (
                            (data.infoproj.pvCampoAmplio !== null && data.infoproj.pvCampoAmplio !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Campo amplio</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvCampoAmplio.trim()}</p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.infoproj.pvCampoAmplioEn !== null && data.infoproj.pvCampoAmplioEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Wide field</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvCampoAmplioEn.trim()}</p></div>
                            </>) : ""
                        ) : (
                            (data.infoproj.pvCampoAmplioPt !== null && data.infoproj.pvCampoAmplioPt !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Amplo campo</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvCampoAmplioPt.trim()}</p></div>
                            </>) : ""
                        ))
                    }
                    {
                        data.language === "es" ? (
                            (data.infoproj.pvCampoEspecf !== null && data.infoproj.pvCampoEspecf !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Campo específico</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvCampoEspecf.trim()}</p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.infoproj.pvCampoEspecfEn !== null && data.infoproj.pvCampoEspecfEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Specific area</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvCampoEspecfEn.trim()}</p></div>
                            </>) : ""
                        ) : (
                            (data.infoproj.pvCampoEspecfPt !== null && data.infoproj.pvCampoEspecfPt !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Área específica</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvCampoEspecfPt.trim()}</p></div>
                            </>) : ""
                        ))
                    }
                    {
                        data.language === "es" ? (
                            (data.infoproj.pvPrograma !== null && data.infoproj.pvPrograma !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Programa</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvPrograma.trim()}</p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.infoproj.pvProgramaEn !== null && data.infoproj.pvProgramaEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Program</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvProgramaEn.trim()}</p></div>
                            </>) : ""
                        ) : (
                            (data.infoproj.pvProgramaPt !== null && data.infoproj.pvProgramaPt !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Programa</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvProgramaPt.
                                    trim()}</p></div>
                            </>) : ""
                        ))
                    }
                    {
                        (data.infoproj.pvConvenios !== null && data.infoproj.pvConvenios !== '') && (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Convenio" : (data.language === "en" ? "Agreement" : "Convenção")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvConvenios.trim()}</p></div>
                        </>)
                    }
                    {
                        data.language === "es" ? (
                            (data.infoproj.pvFacultad !== null && data.infoproj.pvFacultad !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Facultad</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvFacultad.trim()}</p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.infoproj.pvFacultadEn !== null && data.infoproj.pvFacultadEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Faculty</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvFacultadEn.trim()}</p></div>
                            </>) : ""
                        ) : (
                            (data.infoproj.pvFacultadPt !== null && data.infoproj.pvFacultadPt !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Faculdade</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvFacultadPt.trim()}</p></div>
                            </>) : ""
                        ))
                    }
                    {
                        data.language === "es" ? (
                            (data.infoproj.pvCarrera !== null && data.infoproj.pvCarrera !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Carrera</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvCarrera.trim()}</p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.infoproj.pvCarreraEn !== null && data.infoproj.pvCarreraEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Career</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvCarreraEn.trim()}</p></div>
                            </>) : ""
                        ) : ((data.infoproj.pvCarreraPt !== null && data.infoproj.pvCarreraPt !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">Carreira</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvCarreraPt.trim()}</p></div>
                        </>) : ""))
                    }
                    {
                        (data.infoproj.pvDirector !== null && data.infoproj.pvDirector !== '') && (<>
                            <h2 className="msg-pnl-search text-rigth">Director</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvDirector.trim()}<br />{data.infoproj.pvCorreoDir !== null && data.infoproj.pvCorreoDir.trim()}</p></div>
                        </>)
                    }
                    {
                        data.language === "es" ? (
                            (data.infoproj.pvObjetivos !== null && data.infoproj.pvObjetivos !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Objetivos</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvObjetivos.trim()}</p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.infoproj.pvObjetivosEn !== null && data.infoproj.pvObjetivosEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Objectives</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvObjetivosEn.trim()}</p></div>
                            </>) : ""
                        ) : (
                            (data.infoproj.pvObjetivosPt !== null && data.infoproj.pvObjetivosPt !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Objectivos</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvObjetivosPt.trim()}</p></div>
                            </>) : ""
                        ))
                    }
                    {
                        (data.infoproj.pvPeriodo !== null && data.infoproj.pvPeriodo !== '') && (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Período" : "Period"}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvPeriodo.trim()}</p></div>
                        </>)
                    }
                    {
                        data.infoproj.pvFechaInc !== null && (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Inicio" : (data.language === "en" ? "Start" : "Início")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvFechaInc.substring(0, 10)}</p></div>
                        </>)
                    }
                    {
                        data.infoproj.pvFechaFin !== null && (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Finalización" : (data.language === "en" ? "Completion" : "Conclusão")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvFechaFin.substring(0, 10)}</p></div>
                        </>)
                    }
                    {
                        data.language === "es" ? (
                            (data.infoproj.pvEstadoProy !== null && data.infoproj.pvEstadoProy !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Estado</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvEstadoProy.trim()}</p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.infoproj.pvEstadoProyEn !== null && data.infoproj.pvEstadoProyEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">State</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvEstadoProyEn.trim()}</p></div>
                            </>) : ""
                        ) : (
                            (data.infoproj.pvEstadoProyPt !== null && data.infoproj.pvEstadoProyPt !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Estado</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.infoproj.pvEstadoProyPt.trim()}</p></div>
                            </>) : ""
                        ))
                    }
                    {
                        (data.imgproj !== null && data.imgproj !== "") && (
                            data.imgproj.length > 0 && (<>
                                <br /><Carousel
                                    swipeable={false}
                                    draggable={false}
                                    showDots={false}
                                    arrows={true}
                                    responsive={responsiveCust()}
                                    ssr={true}
                                    infinite={true}
                                    key="1"
                                    autoPlay={true}
                                    autoPlaySpeed={2000}
                                    keyBoardControl={true}
                                    customTransition="all .5"
                                    transitionDuration={900}
                                    containerClass="carousel-container bg-dark"
                                    dotListClass="custom-dot-list-style"
                                    itemClass="item">
                                    {
                                        data.imgproj.sort((a, b) => (a.gpOrden > b.gpOrden) ? 1 : -1).map(
                                            (item) => {
                                                return <ItemImageGallery key={uuidv4()} urlimg={item.gpUrlImg} />
                                            }
                                        )
                                    }
                                </Carousel>
                            </>)
                        )
                    }
                </>)
            }
        </div><hr />
    </>);

}
