import DOMPurify from 'isomorphic-dompurify';
import { Accordion } from "react-bootstrap";
import { ListBox, PanelMetrics } from 'components';

export { BodyServiciosMed };

function BodyServiciosMed(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const renderSectionCaldAcad = (dataSM) => {
        if (dataSM.data9.length > 0) {
            return (<>
                <Accordion defaultActiveKey={0}>
                    {dataSM.data9.sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                        (item, index) => {
                            return (<Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{dataSM.language === "es" ? item.smNombre.trim() : (dataSM.language === "en" ? item.smNombreEn.trim() : item.smNombrePt.trim())}</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        dataSM.language === "es" ? ((item.smObjetivos !== null && item.smObjetivos !== "") ? (<>
                                            <div className="paragraph-cont"><h3 className="msg-pnl-search pb-2">Objetivo/s</h3><div dangerouslySetInnerHTML={sanitizedData(item.smObjetivos.trim())}></div></div>
                                        </>) : (<></>)) : (dataSM.language === "en" ? ((item.smObjetivosEn !== null && item.smObjetivosEn !== "") ? (<>
                                            <div className="paragraph-cont"><h3 className="msg-pnl-search pb-2">Objective(s)</h3><div dangerouslySetInnerHTML={sanitizedData(item.smObjetivosEn.trim())}></div></div>
                                        </>) : (<></>)) : ((item.smObjetivosPt !== null && item.smObjetivosPt !== "") ? (<>
                                            <div className="paragraph-cont"><h3 className="msg-pnl-search pb-2">Objectivo(s)</h3><div dangerouslySetInnerHTML={sanitizedData(item.smObjetivosPt.trim())}></div></div>
                                        </>) : (<></>)))
                                    }
                                    {
                                        dataSM.language === "es" ? ((item.smServicios !== null && item.smServicios !== "") ? (<>
                                            <div className="paragraph-cont"><h3 className="msg-pnl-search pb-2">Servicios</h3><div dangerouslySetInnerHTML={sanitizedData(item.smServicios.trim())}></div></div>
                                        </>) : (<></>)) :
                                            (dataSM.language === "en" ? ((item.smServiciosEn !== null && item.smServiciosEn !== "") ? (<>
                                                <div className="paragraph-cont"><h3 className="msg-pnl-search pb-2">Services</h3><div dangerouslySetInnerHTML={sanitizedData(item.smServiciosEn.trim())}></div></div>
                                            </>) : (<></>)) :
                                                ((item.smServiciosPt !== null && item.smServiciosPt !== "") ? (<>
                                                    <div className="paragraph-cont"><h3 className="msg-pnl-search pb-2">Serviços</h3><div dangerouslySetInnerHTML={sanitizedData(item.smServiciosPt.trim())}></div></div>
                                                </>) : (<></>)))
                                    }
                                    {
                                        item.smCorreos && (<>
                                            <div className="paragraph-cont"><h3 className="msg-pnl-search pb-2">{dataSM.language === "es" ? "Correos" : (dataSM.language === "en" ? "E-mails" : "Correios electrónicos")}</h3><div dangerouslySetInnerHTML={sanitizedData(item.smCorreos.trim())}></div></div>
                                        </>)
                                    }
                                    {data.datamtc.filter(metrica => metrica.mcCodServMedc === item.smCodigo).length > 0 && <div className="paragraph-cont"><h3 className="msg-pnl-search pb-2">{dataSM.language === "es"?"Estadísticas":(dataSM.language === "en"?"Statistics":"Estatísticas")}</h3>{PanelMetrics(data.datamtc.filter(metrica => metrica.mcCodServMedc === item.smCodigo), 1, 2)}</div>}
                                    {
                                        dataSM.language === "es" ? ((item.smFraseInfm !== null && item.smFraseInfm !== "") ? (<>
                                            <p className="sentence-green mt-3">{item.smFraseInfm.trim()}</p>
                                        </>) : (<></>)) :
                                            (dataSM.language === "en" ? ((item.smFraseInfmEn !== null && item.smFraseInfmEn !== "") ? (<>
                                                <p className="sentence-green mt-3">{item.smFraseInfmEn.trim()}</p>
                                            </>) : (<></>)) :
                                                ((item.smFraseInfmPt !== null && item.smFraseInfmPt !== "") ? (<>
                                                    <p className="sentence-green mt-3">{item.smFraseInfmPt.trim()}</p>
                                                </>) : (<></>)))
                                    }
                                </Accordion.Body>
                            </Accordion.Item>);
                        })}
                </Accordion>
            </>);
        }
    }

    return (<>
        <div className="row">
            {
                (data.data8.pwNombre !== null && data.data8.pwNombre !== '') && (<><h2 className="title-cont-page text-center mt-2">{data.language === "es" ? data.data8.pwNombre : (data.language === "en" ? data.data8.pwNombreEn : data.data8.pwNombrePt)}</h2></>)
            }
            <div className="paragraph-cont mt-3">
                {
                    data.language === "es" ? ((data.data8.pwObjetivos !== null && data.data8.pwObjetivos !== '') ? (<><div dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivos.trim())}></div></>) : (<></>)) :
                        (data.language === "en" ? ((data.data8.pwObjetivosEn !== null && data.data8.pwObjetivosEn !== '') ? (<><div dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivosEn.trim())}></div></>) : (<></>)) :
                            ((data.data8.pwObjetivosPt !== null && data.data8.pwObjetivosPt !== '') ? (<><div dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivosPt.trim())}></div></>) : (<></>)))
                }
                {
                    data.language === "es" ? ((data.data8.pwHorario !== null && data.data8.pwHorario !== '') ? (<><h3 className="msg-pnl-search">Horarios de atención</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwHorario.trim())}></p></>) : (<></>)) :
                        (data.language === "en" ? ((data.data8.pwHorarioEn !== null && data.data8.pwHorarioEn !== '') ? (<><h3 className="msg-pnl-search">Opening hours</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwHorarioEn.trim())}></p></>) : (<></>)) :
                            ((data.data8.pwHorarioPt !== null && data.data8.pwHorarioPt !== '') ? (<><h3 className="msg-pnl-search">Horário de abertura</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwHorarioPt.trim())}></p></>) : (<></>)))
                }
            </div>
            {renderSectionCaldAcad(data)}
        </div>
    </>);
}


