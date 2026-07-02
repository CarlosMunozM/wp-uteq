import DOMPurify from 'isomorphic-dompurify';
import { Tabs, Tab, SSRProvider } from "react-bootstrap";
import { ListBox, ListItems, PanelMetrics } from 'components';

export { BodyDeporte };


function BodyDeporte(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    return (<><SSRProvider>
        <div className="row">
            {
                (data.data8.pwNombre !== null && data.data8.pwNombre !== '') && (<><h2 className="title-cont-page text-center mt-2">{data.language === "es" ? data.data8.pwNombre : (data.language === "en" ? data.data8.pwNombreEn : data.data8.pwNombrePt)}</h2></>)
            }
            <div className="col-md-12">
                <Tabs defaultActiveKey={0} id="tab-info">
                    <Tab eventKey={0} title={data.language === "es" ? "Acerca De" : (data.language === "en" ? "About" : "Sobre")}>
                        <div className="paragraph-cont">
                            <div dangerouslySetInnerHTML={sanitizedData(data.language === "es" ? data.data8.pwDescripcion.trim() : (data.language === "en" ? data.data8.pwDescripcionEn.trim() : data.data8.pwDescripcionPt.trim()))}></div><br />
                            {
                                data.language === "es" ? ((data.data8.pwHorario !== null && data.data8.pwHorario !== '') ? (<><h3 className="msg-pnl-search text-right">Horarios de atención</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwHorario.trim())}></p></>) : (<></>)) :
                                    (data.language === "en" ? ((data.data8.pwHorarioEn !== null && data.data8.pwHorarioEn !== '') ? (<><h3 className="msg-pnl-search">Opening hours</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwHorarioEn.trim())}></p></>) : (<></>)) :
                                        ((data.data8.pwHorarioPt !== null && data.data8.pwHorarioPt !== '') ? (<><h3 className="msg-pnl-search">Horário de abertura</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwHorarioPt.trim())}></p></>) : (<></>)))
                            }
                            <h2 className="sentence-first pt-3">{data.language === "es" ? (data.data8.pwFraseDesc.trim()) : (data.language === "en" ? (data.data8.pwFraseDescEn.trim()) : (data.data8.pwFraseDescPt.trim()))}</h2>
                        </div>
                    </Tab>
                    {/*<Tab eventKey={1} title="Director/es">
                        {ListBox(data.codarea)}
                        </Tab>*/}
                    {
                        data.language === "es" ? ((data.datamtc !== null && data.datamtc !== "") ? (<Tab eventKey={2} title="Estadísticas">
                            {data.datamtc.length > 0 && PanelMetrics(data.datamtc, 1, 2)}
                        </Tab>) : (<></>)) : (data.language === "en" ? ((data.datamtc !== null && data.datamtc !== "") ? (<Tab eventKey={2} title="Statistics">
                            {data.datamtc.length > 0 && PanelMetrics(data.datamtc, 1, 2)}
                        </Tab>) : (<></>)) : ((data.datamtc !== null && data.datamtc !== "") ? (<Tab eventKey={2} title="Estatísticas">
                            {data.datamtc.length > 0 && PanelMetrics(data.datamtc, 1, 2)}
                        </Tab>) : (<></>)))
                    }
                    <Tab eventKey={3} title={data.language === "es" ? "Galería de los eventos" : (data.language === "en" ? "Gallery of events" : "Galeria de eventos")}>
                        {(data.dataevts !== null && data.dataevts !== "") ? ListItems(data.dataevts) : ""}
                    </Tab>
                </Tabs>
            </div>
            {
                data.language === "es" ? ((data.data8.pwEventos !== null && data.data8.pwEventos !== '') ? (<><div className="paragraph-cont pt-5"><h3 className="subtitle-cont">Eventos</h3><div dangerouslySetInnerHTML={sanitizedData(data.data8.pwEventos.trim())}></div></div></>) : (<></>)) :
                    (data.language === "en" ? ((data.data8.pwEventosEn !== null && data.data8.pwEventosEn !== '') ? (<><div className="paragraph-cont pt-5"><h3 className="subtitle-cont">Events</h3><div dangerouslySetInnerHTML={sanitizedData(data.data8.pwEventosEn.trim())}></div></div></>) : (<></>)) :
                        ((data.data8.pwEventosPt !== null && data.data8.pwEventosPt !== '') ? (<><div className="paragraph-cont pt-5"><h3 className="subtitle-cont">Acontecimentos</h3><div dangerouslySetInnerHTML={sanitizedData(data.data8.pwEventosPt.trim())}></div></div></>) : (<></>)))
            }
        </div>
    </SSRProvider></>);

}