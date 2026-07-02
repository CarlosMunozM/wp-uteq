import DOMPurify from 'isomorphic-dompurify';
import { PanelMetrics, SliderImg } from "components";
import { Badge, Accordion } from 'react-bootstrap';


export { BodyVinculacion };


function BodyVinculacion(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{data.language === "es" ? data.data8.dpNombre.trim() : (data.language === "en" ? data.data8.dpNombreEn.trim() : data.data8.dpNombrePt.trim())}</h2>
            {
                data.language === "es" ? ((data.data8.dpMision !== null && data.data8.dpMision !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMision.trim())}></div></>) : (<></>)) :
                    (data.language === "en" ? ((data.data8.dpMisionEn !== null && data.data8.dpMisionEn !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMisionEn.trim())}></div></>) : (<></>)) :
                        ((data.data8.dpMisionPt !== null && data.data8.dpMisionPt !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMisionPt.trim())}></div></>) : (<></>)))
            }
            {
                data.language === "es" ? ((data.data8.dpVision !== null && data.data8.dpVision !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpVision.trim())}></div></>) : (<></>)) :
                    (data.language === "en" ? ((data.data8.dpVisionEn !== null && data.data8.dpVisionEn !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpVisionEn.trim())}></div></>) : (<></>)) :
                        ((data.data8.dpVisionPt !== null && data.data8.dpVisionPt !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpVisionPt.trim())}></div></>) : (<></>)))
            }
            {
                data.language === "es" ? ((data.data8.dpObjetivos !== null && data.data8.dpObjetivos !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpObjetivos.trim())}></div></>) : (<></>)) :
                    (data.language === "en" ? ((data.data8.dpObjetivosEn !== null && data.data8.dpObjetivosEn !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpObjetivosEn.trim())}></div></>) : (<></>)) :
                        ((data.data8.dpObjetivosEn !== null && data.data8.dpObjetivosEn !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpObjetivosEn.trim())}></div></>) : (<></>)))
            }
            {
                (data.authort !== "" && data.authort !== null) ? (<>
                    <h2 className="msg-pnl-search text-right">{data.language === "es" ? "Correo electrónico" : (data.language === "en" ? "E-mail" : "Endereço electrónico")}</h2>
                    {
                        (data.authort.auCorreoElect !== null && data.authort.auCorreoElect !== '') ? (<>
                            <a href={`mailto:${data.authort.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Comunicación vía correo electrónico" : (data.language === "en" ? "Communication via e-mail" : "Comunicação via e-mail")} style={{ textDecoration: 'none' }}>
                                <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{data.authort.auCorreoElect.trim()}</Badge>
                            </a>
                        </>) : (<></>)
                    }
                </>) : (<></>)
            }
            {
                data.datamtc !== null && (<>
                    <h2 className="title-cont-page text-center mt-3">{data.language === "es" ? "Estadísticas" : (data.language === "en" ? "Statistics" : "Estatísticas")}</h2>
                	{/*<div className="paragraph-cont">
                        <h3 className="subtitle-cont text-center">{data.language === "es" ? "Desde PPA 2019-2020" : (data.language === "en" ? "From PPA 2019-2020" : "A partir de PPA 2019-2020")}</h3>
                    </div>*/}
                    {/*data.datamtc.length > 0 && PanelMetrics(data.datamtc, 3, 2)*/}
                
                	<Accordion defaultActiveKey={0}>
    <Accordion.Item eventKey={0}>
            <Accordion.Header>SPA 2024 - 2025</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-students-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">1395</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-beneficiaries-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">6813</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Beneficiarios" : (data.language === "en" ? "Beneficiaries" : "Beneficiários")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-1-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">53</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos" : (data.language === "en" ? "Projects" : "Projetos")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-2-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">46</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos en ejecución" : (data.language === "en" ? "Projects in progress" : "Projetos em execução")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-3-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">7</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos finalizados" : (data.language === "en" ? "Finished projects" : "Projetos finalizados")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-conventions-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">37</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Convenios" : (data.language === "en" ? "Agreements" : "Convênios")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={1}>
            <Accordion.Header>PPA 2024 - 2025</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-students-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">1254</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-beneficiaries-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">7810</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Beneficiarios" : (data.language === "en" ? "Beneficiaries" : "Beneficiários")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-1-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">46</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos" : (data.language === "en" ? "Projects" : "Projetos")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-2-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">42</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos en ejecución" : (data.language === "en" ? "Projects in progress" : "Projetos em execução")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-3-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">4</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos finalizados" : (data.language === "en" ? "Finished projects" : "Projetos finalizados")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-conventions-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">40</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Convenios" : (data.language === "en" ? "Agreements" : "Convênios")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={2}>
            <Accordion.Header>SPA 2023 - 2024</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-students-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">1133</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-beneficiaries-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">6094</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Beneficiarios" : (data.language === "en" ? "Beneficiaries" : "Beneficiários")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-1-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">40</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos" : (data.language === "en" ? "Projects" : "Projetos")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-2-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">37</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos en ejecución" : (data.language === "en" ? "Projects in progress" : "Projetos em execução")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-3-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">3</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos finalizados" : (data.language === "en" ? "Finished projects" : "Projetos finalizados")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-conventions-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">72</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Convenios" : (data.language === "en" ? "Agreements" : "Convênios")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={3}>
            <Accordion.Header>PPA 2023 - 2024</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-students-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">979</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-beneficiaries-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">5542</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Beneficiarios" : (data.language === "en" ? "Beneficiaries" : "Beneficiários")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-1-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">32</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos" : (data.language === "en" ? "Projects" : "Projetos")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-2-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">30</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos en ejecución" : (data.language === "en" ? "Projects in progress" : "Projetos em execução")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-3-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">2</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos finalizados" : (data.language === "en" ? "Finished projects" : "Projetos finalizados")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-conventions-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">21</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Convenios" : (data.language === "en" ? "Agreements" : "Convênios")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={4}>
            <Accordion.Header>SPA 2022 - 2023</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-students-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">788</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-beneficiaries-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">4931</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Beneficiarios" : (data.language === "en" ? "Beneficiaries" : "Beneficiários")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-1-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">29</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos" : (data.language === "en" ? "Projects" : "Projetos")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-2-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">28</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos en ejecución" : (data.language === "en" ? "Projects in progress" : "Projetos em execução")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-3-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">1</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos finalizados" : (data.language === "en" ? "Finished projects" : "Projetos finalizados")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-conventions-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">10</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Convenios" : (data.language === "en" ? "Agreements" : "Convênios")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={5}>
            <Accordion.Header>PPA 2022 - 2023</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-students-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">847</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-beneficiaries-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">4286</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Beneficiarios" : (data.language === "en" ? "Beneficiaries" : "Beneficiários")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-1-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">35</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos" : (data.language === "en" ? "Projects" : "Projetos")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-2-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">27</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos en ejecución" : (data.language === "en" ? "Projects in progress" : "Projetos em execução")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-3-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">8</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos finalizados" : (data.language === "en" ? "Finished projects" : "Projetos finalizados")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-conventions-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">23</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Convenios" : (data.language === "en" ? "Agreements" : "Convênios")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={6}>
            <Accordion.Header>SPA 2021 - 2022</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-students-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">1318</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-beneficiaries-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">6188</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Beneficiarios" : (data.language === "en" ? "Beneficiaries" : "Beneficiários")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-1-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">33</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos" : (data.language === "en" ? "Projects" : "Projetos")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-2-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">28</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos en ejecución" : (data.language === "en" ? "Projects in progress" : "Projetos em execução")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-3-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">5</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos finalizados" : (data.language === "en" ? "Finished projects" : "Projetos finalizados")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-conventions-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">59</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Convenios" : (data.language === "en" ? "Agreements" : "Convênios")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={7}>
            <Accordion.Header>PPA 2021 - 2022</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-students-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">976</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-beneficiaries-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">4503</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Beneficiarios" : (data.language === "en" ? "Beneficiaries" : "Beneficiários")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-1-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">35</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos" : (data.language === "en" ? "Projects" : "Projetos")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-2-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">28</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos en ejecución" : (data.language === "en" ? "Projects in progress" : "Projetos em execução")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-3-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">7</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos finalizados" : (data.language === "en" ? "Finished projects" : "Projetos finalizados")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-conventions-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">81</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Convenios" : (data.language === "en" ? "Agreements" : "Convênios")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={8}>
            <Accordion.Header>SPA 2020 - 2021</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-students-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">849</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-beneficiaries-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">4159</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Beneficiarios" : (data.language === "en" ? "Beneficiaries" : "Beneficiários")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-1-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">37</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos" : (data.language === "en" ? "Projects" : "Projetos")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-2-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">26</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos en ejecución" : (data.language === "en" ? "Projects in progress" : "Projetos em execução")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-projects-3-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">11</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Proyectos finalizados" : (data.language === "en" ? "Finished projects" : "Projetos finalizados")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                            <div className="card panel-metcs-bx">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                            <img className="img-fluid img-metcs-bx" src="/assets/img/metric-conventions-lkg.png" alt="" />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                            <h3 className="number-metcs-bx">62</h3>
                                            <div className="sect-title-metcs">
                                                <h4 className="title-metcs-bx">{data.language === "es" ? "Convenios" : (data.language === "en" ? "Agreements" : "Convênios")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
</Accordion>
                
                </>)
            }
            <h2 className="title-cont-page text-center mt-4">{data.language === "es" ? "Normativas" : (data.language === "en" ? "Regulations" : "Regulamentos")}</h2>
            <div className="col-md-12 w-100">
                {(data.slider1 !== null && data.slider1 !== "") && SliderImg(data.slider1, 39, 2000, 1000)}
            </div>

        </div>
    </>);

}