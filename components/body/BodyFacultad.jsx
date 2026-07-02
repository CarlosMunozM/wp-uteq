import { Tabs, Tab, SSRProvider } from "react-bootstrap";
import DOMPurify from 'isomorphic-dompurify';
import { apiUrl } from 'config';
import ReactPlayer from "react-player";
import { PanelNews } from "components";
import { Badge } from 'react-bootstrap';


export { BodyFacultad };

function BodyFacultad(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    const style_img = {
        width: "100%",
        height: "100%"
    };

    function getTitlesByAuthority(dataTitle) {
        var titles = '';
        if (dataTitle.length > 0) {

            dataTitle.map((item) => (
                titles += (titles, ((data.language === "es" ? item.taTituloRec.trim() : (data.language === "en" ? item.taTituloRecEn.trim() : item.taTituloRecPt.trim())) + /*" - " + item.taInstitucionSup.trim()) +*/ ". "))
            ));

        }
        return titles.trim();
    }

    return (<><SSRProvider>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{(data.faculty !== null && data.faculty !== '') ? (data.language === "es" ? data.faculty.dpNombre.trim() : (data.language === "en" ? data.faculty.dpNombreEn.trim() : data.faculty.dpNombrePt.trim())) : (data.language === "es" ? "Facultad - UTEQ" : (data.language === "en" ? "Faculty - UTEQ" : "Faculdade - UTEQ"))}</h2>
            <div className="col-md-12 w-100 mt-2">
                <Tabs defaultActiveKey={0} id="tab-info">
                    <Tab eventKey={0} title={data.language === "es" ? "Información" : (data.language === "en" ? "Information" : "Informação")}>
                        {
                            (data.faculty !== null && data.faculty !== '') && (<>
                                {
                                    data.language === "es" ? (
                                        (data.faculty.dpVision !== null && data.faculty.dpVision !== '') && (<>
                                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.faculty.dpVision.trim())}></div>
                                        </>)
                                    ) : (data.language === "en" ? (
                                        (data.faculty.dpVisionEn !== null && data.faculty.dpVisionEn !== '') && (<>
                                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.faculty.dpVisionEn.trim())}></div>
                                        </>)
                                    ) : (
                                        (data.faculty.dpVisionPt !== null && data.faculty.dpVisionPt !== '') && (<>
                                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.faculty.dpVisionPt.trim())}></div>
                                        </>)
                                    ))
                                }
                                {
                                    data.language === "es" ? (
                                        (data.faculty.dpMision !== null && data.faculty.dpMision !== '') && (<>
                                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.faculty.dpMision.trim())}></div>
                                        </>)
                                    ) : (data.language === "en" ? (
                                        (data.faculty.dpMisionEn !== null && data.faculty.dpMisionEn !== '') && (<>
                                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.faculty.dpMisionEn.trim())}></div>
                                        </>)
                                    ) : (
                                        (data.faculty.dpMisionPt !== null && data.faculty.dpMisionPt !== '') && (<>
                                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.faculty.dpMisionPt.trim())}></div>
                                        </>)
                                    ))
                                }
                                {
                                    data.language === "es" ? (
                                        (data.faculty.dpObjetivos !== null && data.faculty.dpObjetivos !== '') && (<>
                                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.faculty.dpObjetivos.trim())}></div>
                                        </>)
                                    ) : (data.language === "en" ? (
                                        (data.faculty.dpObjetivosEn !== null && data.faculty.dpObjetivosEn !== '') && (<>
                                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.faculty.dpObjetivosEn.trim())}></div>
                                        </>)
                                    ) : (
                                        (data.faculty.dpObjetivosPt !== null && data.faculty.dpObjetivosPt !== '') && (<>
                                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.faculty.dpObjetivosPt.trim())}></div>
                                        </>)
                                    ))
                                }
                                {
                                    (data.authort !== "" && data.authort !== null) ? (<>
                                        <h2 className="msg-pnl-search text-right">{data.language === "es" ? "Correo electrónico" : (data.language === "en" ? "E-mail" : "Endereço electrónico")}</h2>
                                        {
                                            (data.authort.auCorreoElect !== null && data.authort.auCorreoElect !== '') ? (<>
                                                <a href={`mailto:${data.authort.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={data.language==="es"?"Comunicación vía correo electrónico":(data.language==="en"?"Communication via e-mail":"Comunicação por correio electrónico")} style={{ textDecoration: 'none' }}>
                                                    <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{data.authort.auCorreoElect.trim()}</Badge>
                                                </a>
                                            </>) : (<></>)
                                        }
                                    </>) : (<></>)
                                }
                                <h2 className="msg-pnl-search text-right mt-2">{data.language === "es" ? "Redes sociales" : (data.language === "en" ? "Social media" : "Meios de comunicação social")}</h2>
                                {(data.faculty.dpCtaFacb !== null && data.faculty.dpCtaFacb !== "" && data.faculty.dpCtaFacb !== "#") && (
                                    <>
                                        <a href={data.faculty.dpCtaFacb.trim()} target="_blank" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ir al perfil de Facebook de la Facultad" : (data.language === "en" ? "Go to the Faculty's Facebook profile" : "Ir para o perfil do Facebook da Faculdade")}>
                                            <span className="badge badge-cust-facb"><i className="fa fa-facebook fa-1x" aria-hidden="true"></i> | {data.language === "es" ? "Cuenta de Facebook" : (data.language === "en" ? "Facebook account" : "Conta no Facebook")}</span>
                                        </a>
                                    </>
                                )}
                                {
                                    (data.faculty.dpUrlVideo !== null && data.faculty.dpUrlVideo !== '' && data.faculty.dpUrlVideo !== '#') && (<>
                                        <h2 className="msg-pnl-search text-right mt-2">{data.language === "es" ? "Conoce más de la Facultad" : (data.language === "en" ? "Learn more about the Faculty" : "Saiba mais sobre a Faculdade")}</h2>
                                        <div className="row g-0 mt-2">
                                            <div className="ratio ratio-16x9">
                                                <ReactPlayer
                                                    className="embed-responsive-item g-0"
                                                    width="100%"
                                                    height="100%"
                                                    playing={false}
                                                    playsinline={true}
                                                    muted={false}
                                                    url={`${data.faculty.dpUrlVideo.trim()}?showinfo=0&enablejsapi=1&origin=${apiUrl}`}
                                                    controls={false} />
                                            </div>
                                        </div>
                                    </>)
                                }
                            </>)
                        }
                    </Tab>
                    <Tab eventKey={1} title={data.language === "es" ? "Noticias" : (data.language === "en" ? "News" : "Notícias")}>
                        {
                            (data.news !== null && data.news !== "") && (<>
                                {
                                    data.news.length > 0 && (<>{PanelNews(data.news, data.actcategrs, data.codpage)}</>)
                                }
                            </>)
                        }
                    </Tab>
                </Tabs>
            </div>
        </div>
    </SSRProvider></>);

}