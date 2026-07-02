import DOMPurify from 'isomorphic-dompurify';
import { EVTS_ORGZ_POSTERS_FOLDER, EVTS_ORGZ_SPEAKERS_FOLDER } from 'config';

export { BodyEventoOrgz };

function BodyEventoOrgz(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const renderTextInfo = (dataInfoEvt) => {

        return (<>
            <div className="row">
                <div className="col-md-4">
                    <div className="row g-0">
                        <div className="col-md-12">
                            <div className="ratio ratio-1x1">
                                {
                                    dataInfoEvt.language === "es" ? (
                                        (dataInfoEvt.info_event.eoUrlAfiche !== null && dataInfoEvt.info_event.eoUrlAfiche !== "" && dataInfoEvt.info_event.eoUrlAfiche !== "#") ? (<>
                                            <img src={EVTS_ORGZ_POSTERS_FOLDER + dataInfoEvt.info_event.eoUrlAfiche} className="img-fluid" alt={dataInfoEvt.info_event.eoTitulo.trim()} />
                                        </>) : ""
                                    ) : (dataInfoEvt.language === "en" ? (
                                        (dataInfoEvt.info_event.eoUrlAficheEn !== null && dataInfoEvt.info_event.eoUrlAficheEn !== "" && dataInfoEvt.info_event.eoUrlAficheEn !== "#") ? (<>
                                            <img src={EVTS_ORGZ_POSTERS_FOLDER + dataInfoEvt.info_event.eoUrlAficheEn} className="img-fluid" alt={dataInfoEvt.info_event.eoTituloEn.trim()} />
                                        </>) : ""
                                    ) : (
                                        (dataInfoEvt.info_event.eoUrlAfichePt !== null && dataInfoEvt.info_event.eoUrlAfichePt !== "" && dataInfoEvt.info_event.eoUrlAfichePt !== "#") ? (<>
                                            <img src={EVTS_ORGZ_POSTERS_FOLDER + dataInfoEvt.info_event.eoUrlAfichePt} className="img-fluid" alt={dataInfoEvt.info_event.eoTituloPt.trim()} />
                                        </>) : ""
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 g-0" style={{ backgroundColor: "#EFEFEF" }}>
                        {
                            dataInfoEvt.language === "es" ? (
                                (dataInfoEvt.info_event.eoSeccionCont !== null && dataInfoEvt.info_event.eoSeccionCont !== "") ? (<>
                                    <div className="col-md-12" dangerouslySetInnerHTML={sanitizedData(dataInfoEvt.info_event.eoSeccionCont.trim())}></div>
                                </>) : ""
                            ) : (dataInfoEvt.language === "en" ? (
                                (dataInfoEvt.info_event.eoSeccionContEn !== null && dataInfoEvt.info_event.eoSeccionContEn !== "") ? (<>
                                    <div className="col-md-12" dangerouslySetInnerHTML={sanitizedData(dataInfoEvt.info_event.eoSeccionContEn.trim())}></div>
                                </>) : ""
                            ) : (
                                (dataInfoEvt.info_event.eoSeccionContPt !== null && dataInfoEvt.info_event.eoSeccionContPt !== "") ? (<>
                                    <div className="col-md-12" dangerouslySetInnerHTML={sanitizedData(dataInfoEvt.info_event.eoSeccionContPt.trim())}></div>
                                </>) : ""
                            ))
                        }
                    </div>
                </div>
                <div className="col-md-8 mt-2">
                    {
                        dataInfoEvt.language === "es" ? (
                            (dataInfoEvt.info_event.eoTitulo !== null && dataInfoEvt.info_event.eoTitulo !== "") ? (<>
                                <h2 className="title-cont-page-evt-1 text-center">{dataInfoEvt.info_event.eoTitulo.trim()}</h2><hr />
                            </>) : ""
                        ) : (dataInfoEvt.language === "en" ? (
                            (dataInfoEvt.info_event.eoTituloEn !== null && dataInfoEvt.info_event.eoTituloEn !== "") ? (<>
                                <h2 className="title-cont-page-evt-1 text-center">{dataInfoEvt.info_event.eoTituloEn.trim()}</h2><hr />
                            </>) : ""
                        ) : (
                            (dataInfoEvt.info_event.eoTituloPt !== null && dataInfoEvt.info_event.eoTituloPt !== "") ? (<>
                                <h2 className="title-cont-page-evt-1 text-center">{dataInfoEvt.info_event.eoTituloPt.trim()}</h2><hr />
                            </>) : ""
                        ))
                    }
                    {
                        dataInfoEvt.language === "es" ? (
                            (dataInfoEvt.info_event.eoSeccionPres !== null && dataInfoEvt.info_event.eoSeccionPres !== "") ? (<>
                                <h2 className="title-cont-page-evt-2 text-left">Presentación</h2>
                                <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoEvt.info_event.eoSeccionPres.trim())}></div>
                            </>) : ""
                        ) : (dataInfoEvt.language === "en" ? (
                            (dataInfoEvt.info_event.eoSeccionPresEn !== null && dataInfoEvt.info_event.eoSeccionPresEn !== "") ? (<>
                                <h2 className="title-cont-page-evt-2 text-left">Presentation</h2>
                                <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoEvt.info_event.eoSeccionPresEn.trim())}></div>
                            </>) : ""
                        ) : (
                            (dataInfoEvt.info_event.eoSeccionPresPt !== null && dataInfoEvt.info_event.eoSeccionPresPt !== "") ? (<>
                                <h2 className="title-cont-page-evt-2 text-left">Apresentação</h2>
                                <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoEvt.info_event.eoSeccionPresPt.trim())}></div>
                            </>) : ""
                        ))
                    }
                    {
                        dataInfoEvt.language === "es" ? (
                            (dataInfoEvt.info_event.eoSeccionPons !== null && dataInfoEvt.info_event.eoSeccionPons !== "") ? (<>
                                <h2 className="title-cont-page-evt-2 text-left">Ponentes invitados</h2>
                                <div dangerouslySetInnerHTML={sanitizedData(dataInfoEvt.info_event.eoSeccionPons.split('RUTA_IMG_PONENTE').join(EVTS_ORGZ_SPEAKERS_FOLDER))}></div>
                            </>) : ""
                        ) : (dataInfoEvt.language === "en" ? (
                            (dataInfoEvt.info_event.eoSeccionPonsEn !== null && dataInfoEvt.info_event.eoSeccionPonsEn !== "") ? (<>
                                <h2 className="title-cont-page-evt-2 text-left">Guest speakers</h2>
                                <div dangerouslySetInnerHTML={sanitizedData(dataInfoEvt.info_event.eoSeccionPonsEn.split('RUTA_IMG_PONENTE').join(EVTS_ORGZ_SPEAKERS_FOLDER))}></div>
                            </>) : ""
                        ) : (
                            (dataInfoEvt.info_event.eoSeccionPonsPt !== null && dataInfoEvt.info_event.eoSeccionPonsPt !== "") ? (<>
                                <h2 className="title-cont-page-evt-2 text-left">Oradores convidados</h2>
                                <div dangerouslySetInnerHTML={sanitizedData(dataInfoEvt.info_event.eoSeccionPonsPt.split('RUTA_IMG_PONENTE').join(EVTS_ORGZ_SPEAKERS_FOLDER))}></div>
                            </>) : ""
                        ))
                    }
                </div>
            </div><br /><br />
            <div className="row">
                <div className="col-md-12 col-lg-12 text-center">
                    {
                        (dataInfoEvt.info_event.eoUrlPaginaWeb !== null && dataInfoEvt.info_event.eoUrlPaginaWeb !== "" && dataInfoEvt.info_event.eoUrlPaginaWeb !== "#") && (<>
                            <a href={dataInfoEvt.info_event.eoUrlPaginaWeb} className="link-inscrip-evt" target="_blank" data-toggle="tooltip" data-placement="bottom"
                                title={dataInfoEvt.language === "es" ? "Enlace web al formulario de inscripción" : (dataInfoEvt.language === "en" ? "Web link to registration form" : "Ligação Web ao formulário de registo")}>
                                {dataInfoEvt.language === "es" ? "Formulario de inscripción" : (dataInfoEvt.language === "en" ? "Registration form" : "Formulário de registo")}</a>
                        </>)
                    }
                </div>
            </div>
        </>);
    }

    return (<>
        {renderTextInfo(data)}
    </>);

}
