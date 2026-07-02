import DOMPurify from 'isomorphic-dompurify';
import ReactPlayer from "react-player";

export { BodyInformeRC };

function BodyInformeRC(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    return (<>
        <div className="row g-0">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? data.datainf.pwNombre.trim() : (data.language === "en" ? data.datainf.pwNombreEn.trim() : data.datainf.pwNombrePt.trim())}</h2>
            <div dangerouslySetInnerHTML={sanitizedData(data.language === "es" ? data.datainf.pwDescripcion.trim() : (data.language === "en" ? data.datainf.pwDescripcionEn.trim() : data.datainf.pwDescripcionPt.trim()))}></div>
            {
                data.language === "es" ? ((data.datainf.pwMision !== null && data.datainf.pwMision !== "") ? (<>
                    <div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.datainf.pwMision.trim())}></div>
                </>) : "") :
                    (data.language === "en" ? ((data.datainf.pwMisionEn !== null && data.datainf.pwMisionEn !== "") ? (<>
                        <div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.datainf.pwMisionEn.trim())}></div>
                    </>) : "") :
                        ((data.datainf.pwMisionPt !== null && data.datainf.pwMisionPt !== "") ? (<>
                            <div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.datainf.pwMisionPt.trim())}></div>
                        </>) : ""))
            }
            {
                ((data.datainf.pwEventos !== null && data.datainf.pwEventos !== "") ? (<>
                    <h2 className="title-cont-page text-right mt-3">{data.language === "es" ? "Acto de deliberación del informe de rendición de cuentas" : (data.language === "en" ? "Deliberation of the accountability report" : "Deliberação do relatório de prestação de contas")}</h2>
                    <div className="col-md-12 mx-auto">
                        <div className="ratio ratio-16x9">
                            <iframe src={data.datainf.pwEventos} title="Acto de deliberación del informe de rendición de cuentas" frameBorder="0"
                            	referrerPolicy="strict-origin-when-cross-origin"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope"></iframe>                        
                        </div>
                    </div>
                </>) : "")
            }
            {
                ((data.datainf.pwServicios !== null && data.datainf.pwServicios !== "") ? (<>
                    <h2 className="title-cont-page text-right mt-3">{data.language === "es" ? "Acto de Deliberación Pública" : (data.language === "en" ? "Public Deliberation Act" : "Lei de Deliberação Pública")}</h2>
                    <div className="col-md-12 mx-auto">
                        <div className="ratio ratio-16x9">
                            <ReactPlayer
                                width='100%'
                                height='100%'
                                url={data.datainf.pwServicios.trim()}
                                controls={false} />
                        </div>
                    </div>
                </>) : "")
            }
            {
                data.language === "es" ? ((data.datainf.pwObjetivos !== null && data.datainf.pwObjetivos !== null) ? (<>
                    <h2 className="title-cont-page text-right mt-3">Buzón de mensajes</h2>
                    <div dangerouslySetInnerHTML={sanitizedData(data.datainf.pwObjetivos.trim())}></div>
                </>) : "") :
                    (data.language === "en" ? ((data.datainf.pwObjetivosEn !== null && data.datainf.pwObjetivosEn !== null) ? (<>
                        <h2 className="title-cont-page text-right mt-3">Message box</h2>
                        <div dangerouslySetInnerHTML={sanitizedData(data.datainf.pwObjetivosEn.trim())}></div>
                    </>) : "") :
                        ((data.datainf.pwObjetivosPt !== null && data.datainf.pwObjetivosPt !== null) ? (<>
                            <h2 className="title-cont-page text-right mt-3">Caixa de mensagens</h2>
                            <div dangerouslySetInnerHTML={sanitizedData(data.datainf.pwObjetivosPt.trim())}></div>
                        </>) : ""))
            }
        </div>
    </>);

}
