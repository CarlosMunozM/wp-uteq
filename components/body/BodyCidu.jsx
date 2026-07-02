import { Tabs, Tab, SSRProvider } from "react-bootstrap";
import { PHOTOS_FOLDER, IMG_EVENTS_DINMCS_FOLDER, DOCS_EVENTS_DINMCS_FOLDER, VIDEOS_FOLDER } from 'config';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { Accordion } from "react-bootstrap";
import { SliderImg } from 'components';
import Image from 'next/image';
import React/*, { useEffect, useState, useRef }*/ from 'react';
import { FormInscEvt, FormRegAsistEv } from "components/forms";


export { BodyCidu };


function BodyCidu(data) {

    const regEx = /^http/;

    const panelEvents = (
        <div className="row">
            {
                data.slider1.length > 0 && data.slider1.map(
                    (item) => <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3" key={uuidv4()}><div className="pnl-evt1">{
                        !regEx.test(item.dtUrlEnlace) ? (<Link href={item.dtUrlEnlace.trim()}><a target="_blank" aria-label="link img" style={{ textDecoration: "none" }}>
                            <div className="ratio ratio-4x3 border">
                                <Image src={`${IMG_EVENTS_DINMCS_FOLDER}${item.dtImagen.trim()}`} className="pnl-evt"
                                    alt={data.language === "es" ? item.dtDescripcion1.trim() : (data.language === "en" ? item.dtDescripcion1En.trim() : item.dtDescripcion1Pt.trim())} layout='fill' />
                            </div>
                            <div className="pnl-title-img-2 text-center">{data.language === "es" ? item.dtDescripcion1.trim() : (data.language === "en" ? item.dtDescripcion1En.trim() : item.dtDescripcion1Pt.trim())}</div>
                        </a></Link>) :
                            (<a href={item.dtUrlEnlace.trim()} target="_blank" aria-label="link img" style={{ textDecoration: "none" }}>
                                <div className="ratio ratio-4x3 border">
                                    <Image src={`${IMG_EVENTS_DINMCS_FOLDER}${item.dtImagen.trim()}`} className="pnl-evt" alt={data.language === "es" ? item.dtDescripcion1.trim() : (data.language === "en" ? item.dtDescripcion1En.trim() : item.dtDescripcion1Pt.trim())} layout='fill' />
                                </div>
                                <div className="pnl-title-img-2 text-center">{data.language === "es" ? item.dtDescripcion1.trim() : (data.language === "en" ? item.dtDescripcion1En.trim() : item.dtDescripcion1Pt.trim())}</div>
                            </a>)
                    }</div></div>
                )
            }
        </div>
    );

    function getListCommittees(dataComts) {
        var listCommts = [];

        if (dataComts !== null && dataComts !== "") {
            if (dataComts.length > 0) {
                listCommts = dataComts.map(a => a.itComite);
                listCommts = [...new Set(listCommts.sort((a, b) => (a.ctOrden > b.ctOrden) ? 1 : -1).map(a => (data.language === "es" ? a.ctNombre.trim() : (data.language === "en" ? a.ctNombreEn.trim() : a.ctNombrePt.trim()))))];
                return panelTabMembers(listCommts, dataComts);
            }
        }

    }

    const panelTabMembers = (committees, dataTotCommts) => (
        <Accordion defaultActiveKey={0}>
            {
                committees.length > 0 && committees.map(
                    (commt, index) => {
                        return (dataTotCommts.filter(integrante => (data.language === "es" ? integrante.itComite.ctNombre.trim() : (data.language === "en" ? integrante.itComite.ctNombreEn.trim() : integrante.itComite.ctNombrePt.trim())) === commt.trim()).length > 0 &&
                            <Accordion.Item eventKey={index} key={uuidv4()}>
                                <Accordion.Header>{commt.trim()}</Accordion.Header>
                                <Accordion.Body>
                                    <div className="row">
                                        {
                                            dataTotCommts.filter(integrante => (data.language === "es" ? integrante.itComite.ctNombre.trim() : (data.language === "en" ? integrante.itComite.ctNombreEn.trim() : integrante.itComite.ctNombrePt.trim())) === commt.trim()).sort((a, b) => (a.itOrden > b.itOrden) ? 1 : -1).map(
                                                (integrante_cmt) => {
                                                    return (<div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3 mx-auto" key={uuidv4()}>
                                                        <div className="pnl-evt2">
                                                            <div className="ratio ratio-4x3"><img src={PHOTOS_FOLDER + integrante_cmt.itFoto.trim()} alt={`Foto ${integrante_cmt.itNombre.trim()}`} /></div>
                                                            <div className="pnl-title-img-5 text-center pb-2">
                                                                {integrante_cmt.itNombre.trim()}<br />{index === 0 && (data.language === "es" ? integrante_cmt.itTitulo : (data.language === "en" ? integrante_cmt.itTituloEn : integrante_cmt.itTituloPt))}
                                                            </div>
                                                            <div className="pnl-title-img-4 text-center">{index === 0 ? (data.language === "es" ? integrante_cmt.itCargo : (data.language === "en" ? integrante_cmt.itCargoEn : integrante_cmt.itCargoPt)) :
                                                                (data.language === "es" ? ((integrante_cmt.itTitulo !== null && integrante_cmt.itTitulo !== "") ? integrante_cmt.itTitulo : integrante_cmt.itFacultad) :
                                                                    (data.language === "en" ? ((integrante_cmt.itTituloEn !== null && integrante_cmt.itTituloEn !== "") ? integrante_cmt.itTituloEn : integrante_cmt.itFacultadEn) :
                                                                        ((integrante_cmt.itTituloPt !== null && integrante_cmt.itTituloPt !== "") ? integrante_cmt.itTituloPt : integrante_cmt.itFacultadPt)))}</div>
                                                        </div>
                                                    </div>)
                                                }
                                            )
                                        }
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>)
                    }
                )
            }
        </Accordion>
    );

    const panelDocuments = (
        <div className="row">
            {
                data.slider2.length > 0 && data.slider2.map(
                    (item) => <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3" key={uuidv4()}>{
                        <div className="pnl-evt1">
                            <a href={`${DOCS_EVENTS_DINMCS_FOLDER}${item.dtUrlEnlace.trim()}`} target="_blank" aria-label="link img" data-toggle="tooltip" data-placement="bottom" title={item.dtDescripcion1.trim()} style={{ textDecoration: "none" }}>
                                <div className="ratio ratio-4x3 border">
                                    <Image src={`${IMG_EVENTS_DINMCS_FOLDER}${item.dtImagen.trim()}`} className="pnl-evt" alt={item.dtDescripcion1.trim()} layout='fill' />
                                </div>
                                <div className="pnl-title-img-1 text-center">{item.dtDescripcion1.trim()}</div>
                            </a>
                        </div>
                    }</div>
                )
            }
        </div>
    );

    const panelBoxDates = (
        <div className="row">
            {
                data.slider3.length > 0 && data.slider3.map(
                    (item) => <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3" key={uuidv4()}>
                        <div className="pnl-evt2">
                            <div className="ratio ratio-4x3 border">
                                <Image src={`${IMG_EVENTS_DINMCS_FOLDER}${item.dtImagen.trim()}`}
                                    alt={data.language === "es" ? item.dtDescripcion1.trim() : (data.language === "en" ? item.dtDescripcion1En.trim() : item.dtDescripcion1Pt.trim())} layout='fill' />
                            </div>
                            <div className="pnl-title-img-1 text-center">{data.language === "es" ? item.dtDescripcion1.trim() : (data.language === "en" ? item.dtDescripcion1En.trim() : item.dtDescripcion1Pt.trim())}</div>
                            <div className="pnl-title-img-3 text-center">{data.language === "es" ? item.dtDescripcion2.trim() : (data.language === "en" ? item.dtDescripcion2En.trim() : item.dtDescripcion2Pt.trim())}</div>
                        </div>
                    </div>
                )
            }
        </div>
    );

    const panelSymposiums = (
        <div className="row">
            <Accordion defaultActiveKey={0} className="col-md-12 g-0">
                <Accordion.Item eventKey={0}>
                    <Accordion.Header>{data.language === "es" ? "Ciencias Agrarias y Forestales" : (data.language === "en" ? "Agricultural and Forestry Sciences" : "Ciências Agrárias e Florestais")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 28 al 30 de enero 2026" : (data.language === "en" ? "From 28 to 30 January 2026" : "De 28 a 30 de janeiro de 2026")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/88038450429" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Ingreso a las Conferencias" : (data.language === "en" ? "Admission to the Conferences" : "Entrada nas conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen">
                                            <div className="card-body">
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scaf-uteq-cidu-2026.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-file-pdf-o fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Programación de Ponencias" : (data.language === "en" ? "Programme of lectures" : "Programa de conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="card pnl-information-symp">
                                        <div className="card-header pnl-hdr-symp">
                                            {data.language === "en" ? "Contacts" : "Contactos"}
                                        </div>
                                        <div className="card-body pnl-bdy-symp">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 mb-2">
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinador:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Ing. Mercedes Carranza Patiño, PhD.</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> mcarranza@uteq.edu.ec</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="card pnl-information-symp">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "en" ? "Objective" : "Objetivo"}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Difundir los avances científicos y tecnológicos aplicados a las ciencias agrarias y forestales, promoviendo el diálogo interdisciplinario orientado a la sostenibilidad y la gestión responsable de los recursos naturales." :
                                            (data.language === "en" ? "Disseminate scientific and technological advances applied to agricultural and forestry sciences, promoting interdisciplinary dialogue focused on sustainability and responsible management of natural resources." :
                                                "Divulgar os avanços científicos e tecnológicos aplicados às ciências agrícolas e florestais, promovendo o diálogo interdisciplinar orientado para a sustentabilidade e a gestão responsável dos recursos naturais.")}</p></div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Líneas de Investigación / Ejes Temáticos" : (data.language === "en" ? "Lines of Research / Thematic Axis" : "Linhas de investigação / Eixos temáticos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont">
                                            {data.language === "es" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Producción agrícola sostenible y agroecología.</li>
                                                    <li>Tecnología y manejo postcosecha de productos agrícolas. </li>
													<li>Innovación tecnológica en sistemas agroforestales y agricultura de precisión. </li>
													<li>Manejo y conservación de ecosistemas forestales. </li>
													<li>Biotecnología aplicada a cultivos agrícolas y forestales. </li>
													<li>Economía agraria, políticas públicas, ordenamiento territorial y desarrollo rural sostenible. </li>
													<li>Recursos hídricos, cambio climático, adaptación y resiliencia productiva. </li>
													<li>Mecanización, riego, drenaje, energía y tecnologías para la infraestructura productiva. </li>
                                                </ul>
                                            </>) : (data.language === "en" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Sustainable agricultural and forestry production with artificial intelligence applications.</li>
                                                    <li>Wood technology and industry, and the development of new technologies.</li>
                                                    <li>Biotechnology, genetic improvement in agriculture and forestry with artificial intelligence applications.</li>
                                                    <li>Plant protection and the application of new technologies.</li>
                                                    <li>Precision agriculture based on artificial intelligence.</li>
                                                    <li>Plant nutrition and physiology.</li>
                                                    <li>Agroecology and sustainable development.</li>
                                                    <li>Automated irrigation systems and the application of new technologies.</li>
                                                </ul>
                                            </>) : (<>
                                                <ul className="list-unord-step">
                                                    <li>Produção agrícola sustentável e agroecologia. </li>
                                                    <li>Tecnologia e manejo pós-colheita de produtos agrícolas. </li>
                                                    <li>Inovação tecnológica em sistemas agroflorestais e agricultura de precisão. </li>
													<li>Manejo e conservação de ecossistemas florestais. </li>
                                                    <li>Biotecnologia aplicada a culturas agrícolas e florestais. </li>
                                                    <li>Economia agrária, políticas públicas, ordenamento territorial e desenvolvimento rural sustentável. </li>
													<li>Recursos hídricos, mudanças climáticas, adaptação e resiliência produtiva. </li>
                                                    <li>Mecanização, irrigação, drenagem, energia e tecnologias para a infraestrutura produtiva. </li>
                                                </ul>
                                            </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "en" ? "Scientific Committee" : "Comité Científico"}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Ing. Carmen Marín Cuevas, M.Sc.</li>
                                                    <li>Ing. Juan Torres Rodríguez, PhD.</li>
                                                    <li>Ing. Fabricio Meza Bone, PhD.</li>
                                                    <li>Ing. Carlos Nieto Cañarte, M.Sc.</li>
                                                    <li>Ing. Edwin Jiménez Romero, M.Sc.</li>
                                                    <li>Ing. Vicente Valdivieso Vidal, M.Sc.</li>
                                                	<li>Ing. Luis Llerena Ramos, M.Sc.</li>
                                               		<li>Ing. Joel Cedeño Muñoz, M.Sc.</li>
                                               		<li>Ing. Mauricio Morejón Centeno, M.Sc.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Conferencias Magistrales" : (data.language === "en" ? "Keynote Conferences" : "Conferências principais")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row">
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcaf-rolando-tarazona.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Bio. Ronald Tarazona Delgado, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Perú (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Bio. Ronald Tarazona Delgado, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional Mayor de San Marcos</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Aplicaciones biotecnológicas de microalgas y cianobacterias: oportunidades y desafíos" :
                                                            (data.language === "en" ? "Biotechnological applications of microalgae and cyanobacteria: opportunities and challenges" :
                                                                "Aplicações biotecnológicas de microalgas e cianobactérias: oportunidades e desafios")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcaf-jorge-cumpa.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Jorge Cumpa Reyes, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Chile (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Jorge Cumpa Reyes, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional Pedro Ruiz Gallo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "El rol de la ingeniería agrícola en la gestión integrada de los recursos hídricos en Latinoamérica" :
                                                            (data.language === "en" ? "The role of agricultural engineering in integrated water resource management in Latin America" :
                                                                "O papel da engenharia agrícola na gestão integrada dos recursos hídricos na América Latina")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcaf-rui-santos.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Rui dos Santos Filho" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Brasil (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Rui dos Santos Filho</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Federal de Río Grande</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Valorización de residuos agroindustriales: bioprocesos y sustentabilidad" :
                                                            (data.language === "en" ? "Valorisation of agro-industrial waste: bioprocesses and sustainability" :
                                                                "Valorização de resíduos agroindustriais: bioprocessos e sustentabilidade")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcaf-jaime-morante.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Jaime Morante Carriel, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Jaime Morante Carriel, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Alicante</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Plant metabolomics: novel applications in medicinal chemistry" :
                                                                (data.language === "en" ? "Plant metabolomics: novel applications in medicinal chemistry" :
                                                                    "Metabolômica vegetal: novas aplicações na química medicinal")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcaf-abril-candela.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Abril Candela Larrañaga, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Argentina (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Abril Candela Larrañaga, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de La Plata</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Percepción del riesgo de los plaguicidas: ¿Potencia u obstáculo para la adopción de prácticas productivas sustentables?" :
                                                                (data.language === "en" ? "Perception of pesticide risk: A driver or obstacle to the adoption of sustainable production practices?" :
                                                                    "Percepção do risco dos pesticidas: potencial ou obstáculo para a adoção de práticas produtivas sustentáveis?")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                          <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcaf-wilson-mozena.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Wilson Mozena Leandro" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Brasil (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Wilson Mozena Leandro</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidade Federal de Goiás</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Programa Nacional de Educación en Reforma Agraria (PRONERA): una estrategia brasileña para la inclusión social de los campesinos en la universidad" :
                                                                (data.language === "en" ? "National Programme for Education in Agrarian Reform (PRONERA): a Brazilian strategy for the social inclusion of rural workers in higher education" :
                                                                    "Programa Nacional de Educação em Reforma Agrária (PRONERA): uma estratégia brasileira para a inclusão social dos camponeses na universidade")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                         <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcaf-christian-correa.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Christian Correa Farias" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Chile (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Christian Correa Farias</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Concepción</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "El cierre de la brecha digital del agro: el rol de la universidad en la transformación tecnológica de la agricultura" :
                                                                (data.language === "en" ? "Bridging the digital divide in agriculture: the role of universities in the technological transformation of agriculture" :
                                                                    "O fim da exclusão digital na agricultura: o papel da universidade na transformação tecnológica da agricultura")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcaf-luis-hernandez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Luis Hernández Montiel" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Luis Hernández Montiel</h5>
                                                        <div className="mb-1 text-titles-speaker">Centro de Investigaciones Biológicas del Noroeste (CIBNOR)</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "La biotecnología verde: biofungicidas a base de microorganismos marinos" :
                                                                (data.language === "en" ? "Green biotechnology: biofungicides based on marine microorganisms" :
                                                                    "A biotecnologia verde: biofungicidas à base de microrganismos marinhos")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                        
                                           	 <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcaf-carlos-gonzalez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Carlos González Murillo, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Colombia (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Carlos González Murillo, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de Colombia</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Análisis de frecuencia: consultoría actual y la inclusión de la variabilidad climática" :
                                                                (data.language === "en" ? "Frequency analysis: current consultancy and the inclusion of climate variability" :
                                                                    "Análise de frequência: consultoria atual e inclusão da variabilidade climática")}</p>
                                                    </div>
                                                </div>
                                           	 </div>
                                        
                                        	 <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcaf-antonio-bustamente.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Antonio Bustamante González, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Presencial)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Antonio Bustamante Gonzalez, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Empresa Agrotecban</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Estrés abióticos en banano" :
                                                                (data.language === "en" ? "Abiotic stress in bananas" :
                                                                    "Estresse abiótico em bananeiras")}</p>
                                                    </div>
                                                </div>
                                          	 </div>
                                        
                                        
                                        
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Publicación de Trabajos" : (data.language === "en" ? "Publication of Papers" : "Publicação de artigos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row d-flex">
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-agrivita.webp" className="mx-auto border" width="160" height="220" alt="AGRIVITA, Journal of Agricultural Science 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">AGRIVITA, Journal of Agricultural Science</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Su objetivo es publicar y difundir artículos de investigación originales y de alta calidad, así como revisiones de artículos en ciencias vegetales, como agronomía, horticultura, fitomejoramiento, edafología, protección vegetal y otras áreas relevantes de la producción vegetal." :
                                                            (data.language === "en" ? "Its objective is to publish and disseminate original, high-quality research articles and reviews in plant sciences, such as agronomy, horticulture, plant breeding, soil science, plant protection, and other relevant areas of plant production." :
                                                                "Seu objetivo é publicar e divulgar artigos de pesquisa originais e de alta qualidade, bem como revisões de artigos em ciências vegetais, como agronomia, horticultura, melhoramento genético vegetal, edafologia, proteção vegetal e outras áreas relevantes da produção vegetal.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-cienytec-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Ciencia y Tecnología 2" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Ciencia y Tecnología</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista científica publicada y editada semestralmente, por la Universidad Técnica Estatal de Quevedo, abierta a investigadores, docentes y profesionales ecuatorianos y extranjeros. Los evaluadores no son miembros del Comité Editorial ni de la entidad o institución editora." :
                                                            (data.language === "en" ? "It is a scientific journal published and edited every six months by the Universidad Técnica Estatal de Quevedo, open to Ecuadorian and foreign researchers, teachers and professionals. The reviewers are not members of the Editorial Committee or of the publishing entity or institution." :
                                                                "É uma revista científica publicada e editada semestralmente pela Universidad Técnica Estatal de Quevedo, aberta a investigadores, professores e profissionais equatorianos e estrangeiros. Os revisores não são membros do Comité Editorial nem da entidade ou instituição publicadora.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-terra-latina.webp" className="mx-auto border" width="160" height="220" alt="Terra Latinoamericana 3" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Terra Latinoamericana</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista de publicación continua. El objetivo principal es publicar artículos científicos originales de interés para la comunidad de la ciencia del suelo y agua alrededor del mundo." :
                                                            (data.language === "en" ? "It is a continuously published journal. The main objective is to publish original scientific articles of interest to the soil and water science community around the world." :
                                                                "É uma revista de publicação contínua. O objetivo principal é publicar artigos científicos originais de interesse para a comunidade científica do solo e da água em todo o mundo.")}</p>
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
                    <Accordion.Header>{data.language === "es" ? "Ciencias Pecuarias" : (data.language === "en" ? "Livestock Sciences" : "Pecuária e Ciências")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 28 al 30 de enero 2026" : (data.language === "en" ? "From 28 to 30 January 2026" : "De 28 a 30 de janeiro de 2026")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/82673516408" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Ingreso a las Conferencias" : (data.language === "en" ? "Admission to the Conferences" : "Entrada nas conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen">
                                            <div className="card-body">
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scpb-uteq-cidu-2026.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-file-pdf-o fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Programación de Ponencias" : (data.language === "en" ? "Programme of lectures" : "Programa de conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="card pnl-information-symp">
                                        <div className="card-header pnl-hdr-symp">
                                            {data.language === "en" ? "Contacts" : "Contactos"}
                                        </div>
                                        <div className="card-body pnl-bdy-symp">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 mb-2">
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinadora:" : (data.language === "en" ? "Coordinator:" : "Coordenadora:")}</b> Biol. Ana Álvarez Sánchez, PhD.</h3>
                                                    <h3 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> aalvarezs@uteq.edu.ec</h3>
                                                    {/*<h4 className="lbl-name-person"><b>{data.language === "es" ? "Coordinadora:" : (data.language === "en" ? "Coordinator:" : "Coordenadora:")}</b> Ing. Raquel Guerrero Chuez, M.Sc.</h4>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> rguerrero@uteq.edu.ec</h4>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="card pnl-information-symp">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Objetivo" : (data.language === "en" ? "Objective" : "Objetivo")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                       <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Reunir a expertos, investigadores, profesionales y estudiantes del ámbito de las Ciencias Pecuarias para socializar los avances científicos más recientes, fortalecer las redes de investigación y la colaboración académica en Acuicultura, Agropecuaria, Biología y Zootecnia, y generar propuestas innovadoras orientadas a la sostenibilidad y a la solución de los desafíos actuales y futuros del sector agroalimentario, promoviendo a la vez el crecimiento académico y profesional de las nuevas generaciones de investigadores." :
                                            (data.language === "en" ? "Bring together experts, researchers, professionals and students in the field of Animal Sciences to share the latest scientific advances, strengthen research networks and academic collaboration in Aquaculture, Agriculture, Biology and Animal Husbandry, and generate innovative proposals aimed at sustainability and solving current and future challenges in the agri-food sector, while promoting the academic and professional growth of new generations of researchers." :
                                                "Reunir especialistas, pesquisadores, profissionais e estudantes da área de Ciências Pecuárias e Biológicas para socializar os mais recentes avanços científicos, fortalecer as redes de pesquisa e a colaboração acadêmica em Aquicultura, Agropecuária, Biologia e Zootecnia, e gerar propostas inovadoras voltadas para a sustentabilidade e a solução dos desafios atuais e futuros do setor agroalimentar, promovendo ao mesmo tempo o crescimento acadêmico e profissional das novas gerações de pesquisadores.")}</p></div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Líneas de Investigación / Ejes Temáticos" : (data.language === "en" ? "Lines of Research / Thematic Axis" : "Linhas de investigação / Eixos temáticos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont">
                                            {data.language === "es" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Avances en agronomía y agroecología.</li>
													<li>Manejo de residuos agrícolas.</li>
													<li>Agricultura sostenible y cambio climático.</li>
													<li>Fisiología y patología agrícola.</li>
													<li>Manejo y conservación de suelos y agua.</li>
													<li>Mejora genética en animales de producción.</li>
													<li>Nutrición y alimentación animal.</li>
													<li>Producción animal sostenible y bienestar.</li>
													<li>Mejoramiento genético y reproducción animal.</li>
													<li>Sanidad animal y salud pública veterinaria.</li>
													<li>Patología acuícola.</li>
													<li>Biotecnia de especies acuícolas.</li>
													<li> Alimentos de origen acuícola.</li>
													<li>Sistemas de producción acuícola sostenible.</li>
													<li>Nutrición y alimentación de organismos acuáticos.</li>
													<li>Sanidad acuícola y bioseguridad.</li>
                                                	<li>Reproducción, genética y mejoramiento en especies acuícolas. </li>
													<li>Aprovechamiento de subproductos acuícolas y economía circular. </li>
													<li> Biodiversidad, sistemática y conservación. </li>
													<li>Biología sintética. </li>
													<li>Bioinformática y computación biológica. </li>
													<li>Biogeografía. </li>
													<li>Biotecnología. </li>
                                                </ul>
                                            </>) : (data.language === "en" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Advances in agronomy and agroecology.</li>
													<li>Agricultural waste management.</li>
													<li>Sustainable agriculture and climate change.</li>
													<li>Agricultural physiology and pathology.</li>
													<li>Soil and water management and conservation.</li>
													<li>Genetic improvement in production animals. </li>
													<li>Animal nutrition and feeding. </li>
													<li>Sustainable animal production and welfare. </li>
													<li>Genetic improvement and animal reproduction. </li>
													<li>Animal health and veterinary public health. </li>
													<li>Aquaculture pathology. </li>
													<li>Biotechnology of aquaculture species.</li>
													<li>Aquaculture-derived foods.</li>
													<li>Sustainable aquaculture production systems.</li>
													<li>Nutrition and feeding of aquatic organisms.</li>
													<li>Aquaculture health and biosecurity.</li>
                                              		<li>Reproduction, genetics and breeding in aquaculture species. </li>
													<li>Use of aquaculture by-products and circular economy. </li>
													<li>Biodiversity, systematics and conservation. </li>
													<li>Synthetic biology. </li>
													<li>Bioinformatics and computational biology. </li>
													<li>Biogeography. </li>
													<li>Biotechnology. </li>
                                                </ul>
                                            </>) : (<>
                                                <ul className="list-unord-step">
                                                    <li>Avanços em agronomia e agroecologia.</li>
													<li>Gestão de resíduos agrícolas.</li>
													<li>Agricultura sustentável e alterações climáticas.</li>
													<li>Fisiologia e patologia agrícola.</li>
													<li>Gestão e conservação dos solos e da água.</li>
													<li>Melhoria genética em animais de produção. </li>
													<li>Nutrição e alimentação animal. </li>
													<li>Produção animal sustentável e bem-estar. </li>
													<li>Melhoria genética e reprodução animal. </li>
													<li>Saúde animal e saúde pública veterinária. </li>
													<li>Patologia aquícola. </li>
													<li>Biotecnologia de espécies aquáticas.</li>
													<li>Alimentos de origem aquática.</li>
													<li>Sistemas de produção aquícola sustentável.</li>
													<li>Nutrição e alimentação de organismos aquáticos.</li>
													<li>Saúde aquícola e biossegurança.</li>
                                                	<li>Reprodução, genética e melhoramento em espécies aquáticas. </li>
													<li>Aproveitamento de subprodutos aquáticos e economia circular. </li>
													<li>Biodiversidade, sistemática e conservação. </li>
													<li>Biologia sintética. </li>
													<li>Bioinformática e computação biológica. </li>
													<li>Biogeografia. </li>
													<li>Biotecnologia. </li>
                                                </ul>
                                            </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "en" ? "Scientific Committee" : "Comité Científico"}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Dr. Ítalo Espinoza Guerra</li>
                                                    <li>Ing. María Romero Roman, PhD.</li>
                                                    <li>Ing. Verónica Segovia Montesdeoca, M.Sc.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Conferencias Magistrales" : (data.language === "en" ? "Keynote Conferences" : "Conferências principais")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row">
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcp-fernando-perez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Fernando Pérez Porras, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Fernando Pérez Porras, PhD</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Córdoba</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Aplicación de deep learnning en agricultura con vehículos autónomos terrestres" :
                                                            (data.language === "en" ? "Application of deep learning in agriculture with autonomous ground vehicles" :
                                                                "Aplicação do deep learning na agricultura com veículos terrestres autônomos")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcp-raquel-perez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Raquel Pérez Clariget" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Uruguay (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Raquel Pérez Clariget</h5>
                                                        <div className="mb-1 text-titles-speaker">Asociación Latinoamericana de Producción Animal</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Interacción nutrición - Reproducción: alternativas para aumentar la eficiencia reproductiva en ovinos" :
                                                            (data.language === "en" ? "Nutrition-Reproduction Interaction: Alternatives for Increasing Reproductive Efficiency in Sheep" :
                                                                "Interação nutrição - Reprodução: alternativas para aumentar a eficiência reprodutiva em ovinos")}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcp-claudia-garrido.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Claudia Garrido-Ruiz" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">USA (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Claudia Garrido-Ruiz</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Estatal de Utah</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Agricultura de precisión en el espacio: sistemas agrícolas cerrados para la Estación Espacial Internacional y Marte" :
                                                            (data.language === "en" ? "Precision agriculture in space: closed agricultural systems for the International Space Station and Mars" :
                                                                "Agricultura de precisão no espaço: sistemas agrícolas fechados para a Estação Espacial Internacional e Marte")}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcp-tamara-tadich.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Israel Benítez García" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Chile (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Tamara Tadich Gallo</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Austral de Chile</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Necesidades conductuales de los equinos para su bienestar animal" :
                                                            (data.language === "en" ? "Behavioural needs of equines for their animal welfare" :
                                                                "Necessidades comportamentais dos equinos para o seu bem-estar animal")}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcp-denis-avila.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Blgo. Dennis Denis Ávila, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Cuba (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Blgo. Dennis Denis Ávila, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Instituto Cubano de Biodiversidad</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Science 2.0: aplicaciones de inteligencia artificial en estudios y conservación de la biodiversidad" :
                                                            (data.language === "en" ? "Science 2.0: applications of artificial intelligence in biodiversity studies and conservation" :
                                                                "Ciência 2.0: aplicações da inteligência artificial em estudos e conservação da biodiversidade")}</p>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcp-pindaro-alvarez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Píndaro Álvarez Ruiz" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Píndaro Álvarez Ruiz</h5>
                                                        <div className="mb-1 text-titles-speaker">Instituto Politécnico Nacional- CIIDIR</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Identificación de agentes causales de la enfermedad de la necrosis aguda del hepatopáncreas en camarones de cultivo" :
                                                            (data.language === "en" ? "Identification of causative agents of acute hepatopancreatic necrosis disease in farmed shrimps" :
                                                            "Identificação dos agentes causadores da doença da necrose aguda do hepatopâncreas em camarões de cultura")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/*
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/blgo-xavier-chalen-norona-scpb-cidu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Blgo. Xavier Chalén Noroña, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Blgo. Xavier Chalén Noroña, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Director del Programa Marino y Costero - Conservación Internacional</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Planificación Espacial Marina y Costera como herramienta primordial para la gestión" :
                                                            (data.language === "en" ? "Marine and Coastal Spatial Planning as a primary tool for management" :
                                                            "Planejamento espacial marinho e costeiro como principal ferramenta de gestão")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-paul-sebastian-moreno-mejia-cidu-scpb.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Paul Sebastián Moreno Mejía" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Paul Sebastián Moreno Mejía</h5>
                                                        <div className="mb-1 text-titles-speaker">Cooperativa ANANDA-Ecuador</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Historia de la comunidad Cannabica y la industria en Ecuador" :
                                                            (data.language === "en" ? "History of the Cannabis community and industry in Ecuador" :
                                                            "História da comunidade e do setor de cannabis no Equador")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-carlos-falconi-borja-cidu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Carlos Falconi Borja, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Carlos Falconi Borja, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Laboratorios BIONIKA PSL Universidad de Kon Stanz Germany</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Monitoreo Agrofenofisiológico NanoBiocatalítico de Cultivos de Exportación" :
                                                            (data.language === "en" ? "Agro-phenophysiological NanoBiocatalytic Monitoring of Export Crops" :
                                                                "Monitoramento agro-fenofisiológico nano-biocatalítico de culturas de exportação")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-israel-benitez-garcia-scpb-cidu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Carlos Falconi Borja, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Israel Benítez García</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Politécnica de Sinaloa (UPSIN)</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Uso de biomasa subvalorada, como bioestimulantes agrícolas" :
                                                            (data.language === "en" ? "Use of undervalued biomass as agricultural biostimulants" :
                                                                "Uso de biomassa subvalorizada como bioestimulantes agrícolas")}</p>
                                                    </div>
                                                </div>
                                            </div>*/}

                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Publicación de Trabajos" : (data.language === "en" ? "Publication of Papers" : "Publicação de artigos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row d-flex">
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-fcp-bjb.webp" className="mx-auto border" width="160" height="220" alt="Brazilian Journal of Biology 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Brazilian Journal of Biology</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "La revista publica resultados de investigaciones en ciencias biológicas y agrícolas: artículos originales, notas científicas y artículos de revisión, solo en inglés." :
                                                            (data.language === "en" ? "The journal publishes research results in biological and agricultural sciences: original articles, scientific notes and review articles, in English only." :
                                                                "A revista publica resultados de pesquisas nas áreas de ciências biológicas e agrícolas: artigos originais, notas científicas e artigos de revisão, apenas em inglês.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-fcp-notulae.webp" className="mx-auto border" width="160" height="220" alt="Notulae Botanicae Horti Agrobotanici Cluj-Napoca 2" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Notulae Botanicae Horti Agrobotanici Cluj-Napoca</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Los temas se refieren a la biodiversidad vegetal, la genética y el fitomejoramiento, así como a los nuevos hallazgos que pueden ser de interés para una amplia audiencia de científicos de plantas en todas las áreas de biología vegetal, agricultura, horticultura y silvicultura." :
                                                            (data.language === "en" ? "The topics cover plant biodiversity, genetics and plant breeding, as well as new findings that may be of interest to a wide audience of plant scientists in all areas of plant biology, agriculture, horticulture and forestry." :
                                                                "Os temas referem-se à biodiversidade vegetal, genética e melhoramento genético, bem como a novas descobertas que podem ser de interesse para um amplo público de cientistas vegetais em todas as áreas da biologia vegetal, agricultura, horticultura e silvicultura.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-cienytec-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Ciencia y Tecnología 3" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Ciencia y Tecnología</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista científica publicada y editada semestralmente, por la Universidad Técnica Estatal de Quevedo, abierta a investigadores, docentes y profesionales ecuatorianos y extranjeros. Los evaluadores no son miembros del Comité Editorial ni de la entidad o institución editora." :
                                                            (data.language === "en" ? "It is a scientific journal published and edited every six months by the Universidad Técnica Estatal de Quevedo, open to Ecuadorian and foreign researchers, teachers and professionals. The reviewers are not members of the Editorial Committee or of the publishing entity or institution." :
                                                                "É uma revista científica publicada e editada semestralmente pela Universidad Técnica Estatal de Quevedo, aberta a investigadores, professores e profissionais equatorianos e estrangeiros. Os revisores não são membros do Comité Editorial nem da entidade ou instituição publicadora.")}</p>
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
                    <Accordion.Header>{data.language === "es" ? "Ciencias de la Ingeniería" : (data.language === "en" ? "Engineering Sciences" : "Ciências da Engenharia")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 28 al 30 de enero 2026" : (data.language === "en" ? "From 28 to 30 January 2026" : "De 28 a 30 de janeiro de 2026")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/85704759314" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Ingreso a las Conferencias" : (data.language === "en" ? "Admission to the Conferences" : "Entrada nas conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen">
                                            <div className="card-body">
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-fci-uteq-cidu-2026.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-file-pdf-o fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Programación de Ponencias" : (data.language === "en" ? "Programme of lectures" : "Programa de conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="card pnl-information-symp">
                                        <div className="card-header pnl-hdr-symp">
                                            {data.language === "en" ? "Contacts" : "Contactos"}
                                        </div>
                                        <div className="card-body pnl-bdy-symp">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 mb-2">
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinador:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Ing. Roberto Barragan Monrroy, M.Sc.</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> roberto.barragan2014@uteq.edu.ec</h4>
                                                </div>
                                                {/*<div className="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 mb-2">
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinadora:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Ing. Norma Guerrero Chuez, M.Sc.</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> nguerrero@uteq.edu.ec</h4>
                                                </div>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="card pnl-information-symp">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "en" ? "Objective" : "Objetivo"}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Fomentar la generación, divulgación y discusión crítica de resultados científicos y desarrollos tecnológicos en el campo de las ciencias de la ingeniería, promoviendo el intercambio académico interdisciplinario, la vinculación con el entorno y la formulación de soluciones innovadoras que contribuyan al desarrollo sostenible y al avance científico–tecnológico del país." :
                                            (data.language === "en" ? "To encourage the generation, dissemination and critical discussion of scientific results and technological developments in the field of engineering sciences, promoting interdisciplinary academic exchange, links with the environment and the formulation of innovative solutions that contribute to sustainable development and scientific and technological progress in the country." :
                                                "Incentivar a geração, divulgação e discussão crítica de resultados científicos e desenvolvimentos tecnológicos no campo das ciências da engenharia, promovendo o intercâmbio acadêmico interdisciplinar, a ligação com o meio ambiente e a formulação de soluções inovadoras que contribuam para o desenvolvimento sustentável e o avanço científico-tecnológico do país.")}</p></div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Líneas de Investigación / Ejes Temáticos (Ingeniería)" : (data.language === "en" ? "Lines of Research / Thematic Axis (Engineering)" : "Linhas de investigação / Eixos temáticos (Engenharia)")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont">
                                            {data.language === "es" ? (<>
                                                <ul className="list-unord-step">
                                                   <li><b>Ambiental</b>
                                                        <ul className="list-links">
                                                            <li>Evaluación de la calidad del agua, aire y suelo, incluyendo las alternativas de mitigación a los impactos ambientales.</li>
															<li>Desarrollo de soluciones tecnológicas para la gestión de los residuos y promoción de energías alternativas. </li>
															<li>Desarrollo de sistemas de producción que promuevan el uso eficiente de los recursos ambientales. </li>
															<li>Aprovechamiento, conservación y protección de los recursos y ecosistemas hídricos. </li>
															<li>Biología de manejo frente al cambio climático. </li>

                                                        </ul>
                                                    </li>
                                                    <li><b>Energías renovables, sistemas eléctricos de potencia, eficiencia Energética</b>
                                                        <ul className="list-links">
                                                            <li>Aplicaciones de energías. </li>
															<li>Nueva energía. </li>
															<li>Fuentes nos convencionales de energía. </li>
															<li>Confiabilidad y planificación en SEP. </li>
                                                        </ul>
                                                    </li>
                                                    <li><b>Construcción, urbanismo y planificación</b>
                                                        <ul className="list-links">
                                                            <li>Patrimonio y conservación.</li>
															<li>Ordenamiento territorial. </li>
															<li>Tecnologías de la construcción. </li>
															<li>Inclusión y accesibilidad. </li>
															<li>Urbanismo y sostenibilidad. </li>
                                                        </ul>
                                                    </li>
                                                    <li><b>Desarrollo, diseño y gestión de tecnología industrial y manufacturera</b>
                                                        <ul className="list-links">
                                                            <li>Automatización industrial, control avanzado y robótica aplicada. </li>
															<li>Industria 4.0, transformación digital y sistemas ciberfísicos. </li>
															<li>Ingeniería de procesos y optimización de la producción. </li>
                                                        </ul>
                                                    </li>
                                                    <li><b>Diseño, simulación y prototipado de elementos de máquinas, mecanismos, estructuras y sistemas térmicos</b>
                                                        <ul className="list-links">
                                                            <li>Smart Cities.</li>
                                                            <li>Modelado CAD, simulación CAE y análisis computacional avanzado. </li>
															<li>Sistemas térmicos, transferencia de calor y dinámica de fluidos computacional. </li>
															<li>Energía, eficiencia térmica y sostenibilidad. </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </>) :
                                                (data.language === "en" ? (<>
                                                    <ul className="list-unord-step">
                                                        <li><b>Environmental</b>
                                                            <ul className="list-links">
                                                                <li>Assessment of water, air and soil quality, including alternatives for mitigating environmental impacts. </li>
																<li>Development of technological solutions for waste management and promotion of alternative energies. </li>
																<li>Development of production systems that promote the efficient use of environmental resources. </li>
																<li>Use, conservation and protection of water resources and ecosystems. </li>
																<li>Biology of management in the face of climate change. </li>
                                                            </ul>
                                                        </li>
                                                        <li><b>Renewable energies, electrical power systems, energy efficiency</b>
                                                            <ul className="list-links">
                                                                <li>Energy applications. </li>
																<li>New energy. </li>
																<li>Non-conventional energy sources. </li>
																<li>Reliability and planning in SEP. </li>
                                                            </ul>
                                                        </li>
                                                        <li><b>Construction, urban planning and development</b>
                                                            <ul className="list-links">
                                                                <li>Heritage and conservation. </li>
																<li>Land use planning. </li>
																<li>Construction technologies. </li>
																<li>Inclusion and accessibility. </li>
																<li>Urban planning and sustainability. </li>
                                                            </ul>
                                                        </li>
                                                        <li><b>Industrial and manufacturing technology development, design and management</b>
                                                            <ul className="list-links">
                                                               <li>Industrial automation, advanced control and applied robotics. </li>
																<li>Industry 4.0, digital transformation and cyber-physical systems. </li>
                                                            <li>Process engineering and production optimisation. </li>
                                                            </ul>
                                                        </li>
                                                        <li><b>Design, simulation and prototyping of machine elements, mechanisms, structures and thermal systems</b>
                                                            <ul className="list-links">
                                                                <li>CAD modelling, CAE simulation and advanced computational analysis. </li>
																<li>Thermal systems, heat transfer and computational fluid dynamics. </li>
																<li>Energy, thermal efficiency and sustainability. </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </>) :
                                                    (<>
                                                        <ul className="list-unord-step">
                                                            <li><b>Ambiental</b>
                                                                <ul className="list-links">
                                                                    <li>Avaliação da qualidade da água, do ar e do solo, incluindo alternativas de mitigação dos impactos ambientais.</li>
																	<li>Desenvolvimento de soluções tecnológicas para a gestão de resíduos e promoção de energias alternativas. </li>
																	<li>Desenvolvimento de sistemas de produção que promovam o uso eficiente dos recursos ambientais. </li>
																	<li>Aproveitamento, conservação e proteção dos recursos e ecossistemas hídricos. </li>
																	<li>Biologia de manejo diante das mudanças climáticas. </li>
                                                                </ul>
                                                            </li>
                                                            <li><b>Energias renováveis, sistemas elétricos de potência, eficiência energética</b>
                                                                <ul className="list-links">
                                                                    <li>Aplicações de energias. </li>
																	<li>Nova energia. </li>
																	<li>Fontes não convencionais de energia. </li>
																	<li>Confiabilidade e planejamento em SEP. </li>
                                                                </ul>
                                                            </li>
                                                            <li><b>Construção, urbanismo e planejamento</b>
                                                                <ul className="list-links">
                                                                    <li>Patrimônio e conservação. </li>
																	<li>Ordenamento territorial. </li>
																	<li>Tecnologias de construção. </li>
																	<li>Inclusão e acessibilidade. </li>
																	<li>Urbanismo e sustentabilidade. </li>
                                                                </ul>
                                                            </li>
                                                            <li><b>Desenvolvimento, projeto e gestão de tecnologia industrial e de manufatura</b>
                                                                <ul className="list-links">
                                                                    <li>Automação industrial, controle avançado e robótica aplicada. </li>
																	<li>Indústria 4.0, transformação digital e sistemas ciberfísicos. </li>
																	<li>Engenharia de processos e otimização da produção. </li>
                                                                </ul>
                                                            </li>
                                                            <li><b>Projeto, simulação e prototipagem de elementos de máquinas, mecanismos, estruturas e sistemas térmicos</b>
                                                                <ul className="list-links">
                                                                    <li>Modelagem CAD, simulação CAE e análise computacional avançada. </li>
																	<li>Sistemas térmicos, transferência de calor e dinâmica de fluidos computacional. </li>
																	<li>Energia, eficiência térmica e sustentabilidade. </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "es" ? "Comité Científico" : (data.language === "en" ? "Scientific Committee" : "Comitê Científico")}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Arq. Eugenia Moreira Macias, M.Sc. </li>
													<li>Arq. Silvia Palacios Giler, M.Sc. </li>
													<li>Ing. Norma Guerrero Chuez, M.Sc. </li>
													<li>Ing. Ximena Cervantes Molina, PhD. </li>
													<li>Ing. Cristian Laverde Albarracin, PhD. </li>
													<li>Ing. Alfonso Gunsha Morales, M.Sc. </li>
													<li>Ing. Rodger Salazar Loor, MSc. </li>
													<li>Ing. Víctor Pachacama Nasimba, M.Sc. </li>
                                                    {/*<li>Ing. Juan Pisco Vanegas</li>
                                                    <li>Ing. Glenn Vinueza Mendoza</li>
                                                    <li>Ing. Emilio Zhuma Mera</li>
                                                    <li>Arq. Cristina Suárez Loor</li>*/}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Líneas de Investigación / Ejes Temáticos (Hidrología)" : (data.language === "en" ? "Lines of Research / Thematic Axis (Hydrology)" : "Linhas de investigação / Eixos temáticos (Hidrologia)")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont">
                                            {data.language === "es" ? (<>
                                                <ul className="list-unord-step">
                                                    <li><b>Recursos Hídricos</b>
                                                        <ul className="list-links">
                                                            <li>Exploración, caracterización y simulación numérica de recursos hídricos</li>
                                                            <li>Planificación, gestión y cambio climático</li>
                                                            <li>Abastecimiento, calidad y salud pública</li>
                                                            <li>Digitalización y nuevas tecnologías del agua</li>
                                                            <li>Gobernanza del agua, políticas públicas del agua y normativa</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </>) :
                                                (data.language === "en" ? (<>
                                                    <ul className="list-unord-step">
                                                        <li><b>Water Resources</b>
                                                            <ul className="list-links">
                                                                <li>Exploration, characterisation and numerical simulation of water resources</li>
                                                                <li>Planning, management and climate change</li>
                                                                <li>Water supply, quality and public health</li>
                                                                <li>Digitalisation and new water technologies</li>
                                                                <li>Water governance, water public policy and regulation</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </>) :
                                                    (<>
                                                        <ul className="list-unord-step">
                                                            <li><b>Recursos hídricos</b>
                                                                <ul className="list-links">
                                                                    <li>Exploração, caracterização e simulação numérica de recursos hídricos</li>
                                                                    <li>Planejamento, gerenciamento e mudanças climáticas</li>
                                                                    <li>Abastecimento de água, qualidade e saúde pública</li>
                                                                    <li>Digitalização e novas tecnologias hídricas</li>
                                                                    <li>Governança da água, política pública e regulamentação da água</li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </>))}
                                        </div>
                                    </div>
                                </div>*/}

                                {/*<div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "es" ? "Comité Técnico Científico - Recursos Hídricos" : (data.language === "en" ? "Scientific Technical Committee - Water Resources" : "Comitê Técnico Científico - Recursos hídricos")}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Ing. Norma Guerrero Chuez, M.Sc.</li>
                                                    <li>Ing. Paúl Carrión Mero, PhD.</li>
                                                    <li>Ing. Francisco Carreño Conde, PhD.</li>
                                                    <li>Ing. Javier Montalván, PhD.</li>
                                                    <li>Ing. Luis Domínguez, PhD.</li>
                                                    <li>Ing. Fernando Morante, PhD.</li>
                                                    <li>Ing. Gricelda Herrera, PhD.</li>
                                                    <li>Ing. Joselyne Solórzano, M.Sc.</li>
                                                    <li>Ing. Josue Briones, M.Sc.</li>
                                                    <li>Ing. Julio Pazmiño Rodríguez, M.Sc.</li>
                                                    <li>Ing. Carlos Nieto Rodríguez, M.Sc.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}

                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Conferencias Magistrales" : (data.language === "en" ? "Keynote Conferences" : "Conferências principais")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row">
                                            {/*<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-alejandra-orellana-maldonado-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Alejandra Orellana Maldonado, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Alejandra Orellana Maldonado, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">IEEE Member</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Intraemprendimiento como herramienta para la Innovación Empresarial" :
                                                            (data.language === "en" ? "Intrapreneurship as a tool for Business Innovation" :
                                                                "O intraempreendedorismo como ferramenta para a inovação empresarial")}</p>
                                                    </div>
                                                </div>
                                            </div>*/}
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-david-puma.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. David Puma Benavides, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. David Puma Benavides, PhD</h5>
                                                        <div className="mb-1 text-titles-speaker">Tecnologico de Monterrey</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Análisis sistemático  con base en las limitaciones de sistemas de refrigeración en motores eléctricos: caso de estudio MG1 Toyotae" :
                                                            (data.language === "en" ? "Systematic analysis based on the limitations of cooling systems in electric motors: MG1 Toyota case study" :
                                                                "Análise sistemática com base nas limitações dos sistemas de refrigeração em motores elétricos: estudo de caso MG1 Toyota")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-cristian-arias.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Cristian Arias Ulloa, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Cristian Arias Ulloa, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">ESPOL</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Gestión del riesgo y mejora continua en ordenamiento territorial" :
                                                            (data.language === "en" ? "Risk management and continuous improvement in land use planning" :
                                                                "Gestão de riscos e melhoria contínua no ordenamento territorial.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                                
                                             <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-joselyne-solorzano.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Joselyne Solórzano Chauca, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Joselyne Solórzano Chauca, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Escuela Superior Politécnica del Litoral</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "La ingeniería humanitaria en proyectos universitarios" :
                                                            (data.language === "en" ? "Humanitarian engineering in university projects" :
                                                                "Engenharia humanitária em projetos universitários")}</p>
                                                    </div>
                                                </div>
                                             </div> 
                                                
                                                
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-jose-cabrera.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. José Cabrera Escobar, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. José Cabrera Escobar, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Técnica de Ambato</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Sistemas de energía eólico con hélices verticales" :
                                                            (data.language === "en" ? "Wind energy systems with vertical propellers" :
                                                                "Sistemas de energia eólica com hélices verticais")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-luis-chuquimarca.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Luis Chuquimarca Jiménez, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Luis Chuquimarca Jiménez, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Península de Santa Elenas</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "IA transformando la ingeniería " :
                                                            (data.language === "en" ? "AI transforming engineering" :
                                                                "IA transformando a engenharia")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-fernando-pullupaxi.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Fernando Pullupaxi Masabanda, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Fernando Pullupaxi Masabanda, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Ex Viceministro de Electricidad y Energía Renovable</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Nuevas regulaciones para impulso de las ERNC en el Ecuador" :
                                                            (data.language === "en" ? "New regulations to promote NCRE in Ecuador" :
                                                                "Novas regulamentações para impulsionar as ERNC no Equador")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-benito-mendoza.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Benito Mendoza Trujillo, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Benito Mendoza Trujillo, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de Chimborazo, Riobamba, Ecuador</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Hidrogeología de Ecuador, caso de estudio en la cuenca del río Chambo" :
                                                            (data.language === "en" ? "Hydrogeology of Ecuador, Case study in the Chambo River basin" :
                                                                "Hidrogeologia do Equador, Estudo de caso na bacia do rio Chambo")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-gipsy-pena.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Gipsy Peña Ramírez" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Argentina (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Gipsy Peña Ramírez</h5>
                                                        <div className="mb-1 text-titles-speaker">Instituto de Investigaciones en Ciencia y Tecnología de Materiales</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Materiales compuestos eco-amigables aplicados en remediación acuosa" :
                                                            (data.language === "en" ? "Eco-friendly composite materials applied in aqueous remediation" :
                                                                "Materiais compostos ecológicos aplicados na remediação aquosa")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-javier-naranjo.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Javier Naranjo Vasco" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Colombia (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Javier Naranjo Vasco</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Católica de Manizales</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Retos del cambio climático y descarbonización en un contexto Latinoamericano: caso Colombia" :
                                                            (data.language === "en" ? "Challenges of climate change and decarbonisation in a Latin American context: the case of Colombia" :
                                                                "Desafios das mudanças climáticas e descarbonização no contexto latino-americano: o caso da Colômbia")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-catalina-rus.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Catalina Rus Casas" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Catalina Rus Casas</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Jaen</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Experiencia en la incorporación de sistemas de autoconsumo fotovoltaicos en pequeñas empresas de Andalucía" :
                                                            (data.language === "en" ? "Experience in incorporating photovoltaic self-consumption systems in small businesses in Andalusia" :
                                                                "Experiência na incorporação de sistemas fotovoltaicos de autoconsumo em pequenas empresas da Andaluzia")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                    
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-juan-nicolalde.webp" className="mx-auto border" width="140" height="160" alt="Ponente -  Ing. Juan Nicolalde González, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker"> Ing. Juan Nicolalde González, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Internacional del Ecuador</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Simulación computacional de mejoramiento de materiales de cambio de fase de base biológica por nanopartículas y aplicaciones de encapsulamiento" :
                                                            (data.language === "en" ? "Computer simulation of the improvement of bio-based phase change materials by nanoparticles and encapsulation applications" :
                                                                "Simulação computacional do aprimoramento de materiais de mudança de fase de base biológica por nanopartículas e aplicações de encapsulamento")}</p>
                                                    </div>
                                                </div>
                                           	 </div>
                                                                                 
                                       
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fci-walter-cobena.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Arq. Walter David Cobeña Loor, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Arq. Walter David Cobeña Loor, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad San Gregorio de Portoviejo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Caña guadúa como envolvente arquitectónica: desempeño higrotérmico en viviendas urbanas sostenibles Manabí, Ecuador" :
                                                            (data.language === "en" ? "Guadua cane as architectural cladding: hygrothermal performance in sustainable urban housing Manabí, Ecuador" :
                                                                "Cana guadúa como revestimento arquitetônico: desempenho higrotérmico em habitações urbanas sustentáveis Manabí, Equador")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/*
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-gilberto-de-jesus-colina-andrade-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Gilberto de Jesús Colina Andrade" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Perú (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Gilberto de Jesús Colina Andrade</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Católica de Santa María</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Valorización de materiales de residuo (Lodos químicos) en la remoción de especies emergentes en agua" :
                                                            (data.language === "en" ? "Valorization of waste materials (chemical sludge) in the removal of emergent species in water" :
                                                                "Valorização de resíduos (lodos químicos) na remoção de espécies emergentes em águas")}</p>
                                                    </div>
                                                </div>
                                            </div>
											*/}




                                            {/*<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-miguel-del-rio-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Miguel del Río" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Miguel del Río</h5>
                                                        <div className="mb-1 text-titles-speaker">Broward International University</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Herramientas de la IA en el aprendizaje de las disciplinas STEM" :
                                                            (data.language === "en" ? "AI tools in learning STEM disciplines" :
                                                                "Ferramentas de IA no aprendizado das disciplinas STEM")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-jorge-eliecer-gomez-gomez-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Jorge Eliécer Gómez Gómez" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Colombia (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Jorge Eliécer Gómez Gómez</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Córdoba</div>
                                                        <p className="card-text mb-auto text-subject-speaker">IoT AND 4.0 Technologies for traceability and food safety in cocoa</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-geovanny-silva-penafiel-msc.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Geovanny Silva Peñafiel, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Geovanny Silva Peñafiel, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Escuela Superior Politécnica de Chimborazo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Inteligencia de Negocios" :
                                                            (data.language === "en" ? "Business Intelligence" :
                                                                "Inteligência de Negócios")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-angel-geovanny-cudco-pomagualli-msc.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Angel Geovanny Cudco Pomagualli, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Angel Geovanny Cudco Pomagualli, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de las Fuerzas Armadas ESPE</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Inteligencia Artificial Generativa con SpringBootAI" :
                                                            (data.language === "en" ? "Generative Artificial Intelligence with SpringBootAI" :
                                                                "Inteligência Artificial Generativa com SpringBootAI")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-francisco-saul-alcocer-salazar-msc.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Francisco Saúl Alcocer Salazar, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Francisco Saúl Alcocer Salazar, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de las Fuerzas Armadas ESPE</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Evaluación de la calidad de procesos de soldadura a travès de realidad aumentada" :
                                                            (data.language === "en" ? "Evaluation of welding process quality through augmented reality" :
                                                                "Avaliação da qualidade dos processos de soldagem através de realidade aumentada")}</p>
                                                    </div>
                                                </div>
                                            </div>*/}
                                            {/*<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-doris-karina-chicaiza-a-msc.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Doris Karina Chicaiza A, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Doris Karina Chicaiza A, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de las Fuerzas Armadas ESPE</div>*/}
                                            {/*<p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Evaluación de la calidad de procesos de soldadura a travès de realidad aumentada" :
                                                            (data.language === "en" ? "Evaluation of welding process quality through augmented reality" :
                                                                "Avaliação da qualidade dos processos de soldagem através de realidade aumentada")}</p>*/}
                                            {/*</div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/sebastian-vicente-jimbo-ludena.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Sebastian Vicente Jimbo Ludeña" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Virtual</strong>
                                                        <h5 className="mb-0 text-name-speaker">Sebastian Vicente Jimbo Ludeña</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Manchester</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Simulando el viento: Principios y Aplicaciones de los túneles de viento en el diseño de vehículos de carga pesada y edificaciones" :
                                                            (data.language === "en" ? "Simulating the Wind: Principles and Applications of Wind Tunnels in the Design of Heavy Duty Vehicles and Buildings" :
                                                                "Simulando o vento: princípios e aplicações de túneis de vento no projeto de veículos pesados e edifícios")}</p>
                                                    </div>
                                                </div>
                                            </div>*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Publicación de Trabajos" : (data.language === "en" ? "Publication of Papers" : "Publicação de artigos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row d-flex">
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-terra-latina.webp" className="mx-auto border" width="160" height="220" alt="Terra Latinoamericana 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Terra Latinoamericana</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista de publicación continua. El objetivo principal es publicar artículos científicos originales de interés para la comunidad de la ciencia del suelo y agua alrededor del mundo." :
                                                            (data.language === "en" ? "It is a continuously published journal. The main objective is to publish original scientific articles of interest to the soil and water science community around the world." :
                                                                "É uma revista de publicação contínua. O objetivo principal é publicar artigos científicos originais de interesse para a comunidade científica do solo e da água em todo o mundo.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-ingenio-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Científica y Tecnológica InGenio 2" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Científica y Tecnológica "InGenio"</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista científica dedicada a la publicación semestral de artículos de resultados de investigaciones originales en español e inglés. Cubre una variedad de temas relacionados con varias áreas de conocimiento de Ciencias de la Ingeniería." :
                                                            (data.language === "en" ? "It is a scientific journal dedicated to the biannual publication of articles of original research results in Spanish and English. It covers a variety of topics related to several areas of knowledge in Engineering Sciences." :
                                                                "É uma revista científica dedicada à publicação semestral de artigos de resultados originais de investigação em espanhol e inglês. Abrange uma variedade de tópicos relacionados com diversas áreas do conhecimento em Ciências da Engenharia.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                        	<div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-fci-arquitectura.webp" className="mx-auto border" width="160" height="220" alt="Revista Arquitectura+ 3" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Arquitectura+</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "La revista Arquitectura + (Arquitectura Más) presentan los resultados de investigaciones actuales, en su mayoría aportando nuevos conocimientos en el ámbito de la arquitectura y urbanismo de Nicaragua." :
                                                            (data.language === "en" ? "The journal Arquitectura + (Architecture Plus) presents the results of current research, mostly contributing new knowledge in the field of architecture and urban planning in Nicaragua." :
                                                                "A revista Arquitectura + (Arquitectura Mais) apresenta os resultados de pesquisas atuais, na sua maioria contribuindo com novos conhecimentos no campo da arquitetura e do urbanismo da Nicarágua.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                       	    <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-fci-conectividad.webp" className="mx-auto border" width="160" height="220" alt="Revista Científica Conectividad 4" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Científica Conectividad</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una publicación científica multidisciplinaria del Departamento de Investigación del Instituto Tecnológico Superior Universitario Rumiñahui, cuyo objetivo es incentivar la publicación de artículos de investigación y la difusión sin costo del conocimiento, en el ámbito ecuatoriano, regional y latinoamericano." :
                                                            (data.language === "en" ? "It is a multidisciplinary scientific publication by the Research Department of the Rumiñahui University Technological Institute, whose objective is to encourage the publication of research articles and the free dissemination of knowledge in Ecuador, the region and Latin America." :
                                                                "É uma publicação científica multidisciplinar do Departamento de Pesquisa do Instituto Tecnológico Superior Universitário Rumiñahui, cujo objetivo é incentivar a publicação de artigos de pesquisa e a divulgação gratuita do conhecimento, no âmbito equatoriano, regional e latino-americano.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                        	<div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-fci-energies.webp" className="mx-auto border" width="160" height="220" alt="Energies 5" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Energies</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Energies es una revista de acceso abierto y con revisión por pares que aborda la investigación científica, el desarrollo tecnológico, las políticas de ingeniería y los estudios de gestión relacionados con el campo general de la energía (desde las tecnologías de suministro, conversión, distribución y uso final de la energía hasta los procesos físicos y químicos que las sustentan)." :
                                                            (data.language === "en" ? "Energies is an open-access, peer-reviewed journal that addresses scientific research, technological development, engineering policies, and management studies related to the general field of energy (from energy supply, conversion, distribution, and end-use technologies to the physical and chemical processes that underpin them)." :
                                                                "Energies é uma revista de acesso aberto e revisada por pares que aborda a pesquisa científica, o desenvolvimento tecnológico, as políticas de engenharia e os estudos de gestão relacionados ao campo geral da energia (desde as tecnologias de fornecimento, conversão, distribuição e uso final da energia até os processos físicos e químicos que as sustentam).")}</p>
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
                    <Accordion.Header>{data.language === "es" ? "Ciencias de la Industria y Producción" : (data.language === "en" ? "Industrial and Production Sciences" : "Ciências Industriais e da Produção")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 28 al 30 de enero 2026" : (data.language === "en" ? "From 28 to 30 January 2026" : "De 28 a 30 de janeiro de 2026")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/88576180911" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Ingreso a las Conferencias" : (data.language === "en" ? "Admission to the Conferences" : "Entrada nas conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen">
                                            <div className="card-body">
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scip-uteq-cidu-2026.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-file-pdf-o fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Programación de Ponencias" : (data.language === "en" ? "Programme of lectures" : "Programa de conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="card pnl-information-symp">
                                        <div className="card-header pnl-hdr-symp">
                                            {data.language === "en" ? "Contacts" : "Contactos"}
                                        </div>
                                        <div className="card-body pnl-bdy-symp">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 mb-2">
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinador:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Lic. Loguard Rojas Uribe, M.Sc</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> lrojas@uteq.edu.ec</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="card pnl-information-symp">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "en" ? "Objective" : "Objetivo"}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Promover el intercambio de conocimientos y experiencias en las áreas de la Industria y Producción, mediante la difusión de investigaciones orientadas al desarrollo tecnológico, la sostenibilidad de los procesos productivos y la mejora continua en una sociedad digital, fortaleciendo así la colaboración académica y el vínculo con el sector industrial." :
                                            (data.language === "en" ? "Promote the exchange of knowledge and experiences in the areas of Industry and Production, through the dissemination of research focused on technological development, the sustainability of production processes, and continuous improvement in a digital society, thereby strengthening academic collaboration and links with the industrial sector." :
                                                "Promover o intercâmbio de conhecimentos e experiências nas áreas da Indústria e Produção, através da divulgação de pesquisas voltadas para o desenvolvimento tecnológico, a sustentabilidade dos processos produtivos e a melhoria contínua em uma sociedade digital, fortalecendo assim a colaboração acadêmica e o vínculo com o setor industrial.")}</p></div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Líneas de Investigación / Ejes Temáticos" : (data.language === "en" ? "Lines of Research / Thematic Axis" : "Linhas de investigação / Eixos temáticos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont">
                                            {data.language === "es" ? (<>
                                                <ul className="list-unord-step">
                                                <li><b>Alimento y agroindustria</b>
                                                	<ul className="list-links">
                                                    	<li>Valoración de los residuos agroindustriales.</li>
														<li>Gestión, Innovación, desarrollo y sostenibilidad de procesos y productos alimenticios y no alimenticios. </li>
														<li>Gestión, innovación, desarrollo y sostenibilidad de productos alimenticios. </li>
													</ul>
                                                </li>
                                                <li><b>Tecnología mecánica, industrial y seguridad Industrial</b>
                                                	<ul className="list-links">
                                                		<li>Desarrollo, diseño y gestión de tecnología industrial y manufacturera. </li>
														<li>Diseño, montaje, distribución física y puesta en marcha de plantas industriales con tecnología adaptada y/o modificada. </li>
														<li>Seguridad en el trabajo. </li>
													</ul>
                                                </li>
                                                </ul>
                                            </>) : (data.language === "en" ? (<>
                                                <ul className="list-unord-step">
                                                
                                                <li><b>Food and agribusiness</b>
                                                	<ul className="list-links">
                                                    	<li>Assessment of agribusiness waste. </li>
														<li>Management, innovation, development, and sustainability of food and non-food processes and products. </li>
														<li>Management, innovation, development, and sustainability of food products. </li>
													</ul>
                                                </li>
                                                 <li><b>Mechanical and industrial technology and industrial safety</b>
                                                	<ul className="list-links">
                                               		 <li>Development, design, and management of industrial and manufacturing technology. </li>
													<li>Design, assembly, physical distribution, and commissioning of industrial plants with adapted and/or modified technology. </li>
													<li>Occupational safety. </li>
                                                 </ul>
                                                </li>
                                                
                                                </ul>
                                            </>) : (<>
                                                <ul className="list-unord-step">
                                                <li><b>Alimentação e agroindústria</b>
                                                	<ul className="list-links">
                                                    	<li>Avaliação de resíduos agroindustriais. </li>
														<li>Gestão, inovação, desenvolvimento e sustentabilidade de processos e produtos alimentícios e não alimentícios. </li>
														<li>Gestão, inovação, desenvolvimento e sustentabilidade de produtos alimentícios. </li>
                                                	</ul>
                                                </li>
 												<li><b>Tecnologia mecânica, industrial e segurança industrial</b>
                                                	<ul className="list-links">
                                                		<li>Desenvolvimento, projeto e gestão de tecnologia industrial e de manufatura. </li>
														<li>Projeto, montagem, distribuição física e colocação em funcionamento de plantas industriais com tecnologia adaptada e/ou modificada. </li>
														<li>Segurança no trabalho. </li>
													</ul>
                                                </li>
                                                
                                                </ul>
                                            </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "en" ? "Scientific Committee" : "Comité Científico"}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Ing. Sara Franco Castro, M.Sc. </li>
													<li>Ing. Edison Mancheno Padilla, M.Sc. </li>
													<li>Ing. Jhoan Plúa Montiel, M.Sc. </li>
													<li>Ing. María Pacheco Tigselema, M.Sc. </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Conferencias Magistrales" : (data.language === "en" ? "Keynote Conferences" : "Conferências principais")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row">
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcip-luis-vasquez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Luis Vásquez Cortez, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Luis Vásquez Cortez, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Técnica de Babahoyo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Intervenciones biotecnológicas en la fermentación de cacao (Theobroma cacao L.) para mejorar la calidad y la reducción de cadmio" :
                                                                (data.language === "en" ? "Biotechnological interventions in cocoa (Theobroma cacao L.) fermentation to improve quality and reduce cadmium" :
                                                                    "Intervenções biotecnológicas na fermentação do cacau (Theobroma cacao L.) para melhorar a qualidade e reduzir o cádmio")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcip-josue-hernandez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Josué Hernández Díaz. M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Guatemala (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Josué Hernández Díaz. M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de San Carlos de Guatemala</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Automatización y Robótica Industrial Colaborativa: Estrategias de Implementación y Reconfiguración Dinámica en Líneas de Producción" :
                                                                (data.language === "en" ? "Automation and Collaborative Industrial Robotics: Implementation Strategies and Dynamic Reconfiguration in Production Lines" :
                                                                    "Automação e Robótica Industrial Colaborativa: Estratégias de Implementação e Reconfiguração Dinâmica em Linhas de Produção")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                        
                                        
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcip-tereaa-vezza.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Teresa Vezza" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Teresa Vezza</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Granada-España.</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Aprovechamiento del extracto de hoja de olivo (Olea europaea): Estudio del efecto antiinflamatorio en modelos experimentales de colitis y síndrome metabólico" :
                                                                (data.language === "en" ? "Use of olive leaf extract (Olea europaea): Study of the anti-inflammatory effect in experimental models of colitis and metabolic syndrome" :
                                                                    "Aproveitamento do extrato da folha da oliveira (Olea europaea): Estudo do efeito anti-inflamatório em modelos experimentais de colite e síndrome metabólica")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcip-juan-piedra.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Juan Piedra Gonzáles, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Juan Piedra Gonzáles, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">UDLA</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Uso de datos satelitales en la salud respiratoria. Un enfoque en salud" :
                                                                (data.language === "en" ? "Use of satellite data in respiratory health. A focus on health" :
                                                                    "Uso de dados de satélite na saúde respiratória. Um enfoque na saúde.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcip-jonathan-sayavedra.webp" className="mx-auto border" width="140" height="160" alt="Ponente -  Ing. Jonathan Sayavedra Delgado, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Jonathan Sayavedra Delgado, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de las Fuerzas Armadas ESPE, Sede Santo Domingo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Valorización de residuos para la generación de productos, mediante el uso de simuladores de procesos" :
                                                                (data.language === "en" ? "Waste recovery for product generation, using process simulators" :
                                                                    "Valorização de resíduos para a geração de produtos, através do uso de simuladores de processos")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcip-sonia-ester.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Sonia Ester Yasinski, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Argentina (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Sonia Ester Yasinski, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de Misiones</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "De la industria al territorio: ingeniería industrial para productores asociativos" :
                                                                (data.language === "en" ? "From industry to territory: industrial engineering for associative producers" :
                                                                    "Da indústria ao território: engenharia industrial para produtores associativos")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcip-juan-llivisaca.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Juan Llivisaca Villazhañay, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Juan Llivisaca Villazhañay, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Cuenca</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Las agrocadenas y su integración con la industria 5.0" :
                                                                (data.language === "en" ? "Agricultural supply chains and their integration with Industry 5.0" :
                                                                    "As cadeias agrícolas e sua integração com a indústria 5.0")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        {/*<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcip-guillermo-neus.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Guillermo Neusa Arenas, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Presencial)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Guillermo Neusa Arenas, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Técnica del Norte</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Optimización Ergonómica Sostenible en los Procesos Industriales" :
                                                                (data.language === "en" ? "Sustainable Ergonomic Optimisation in Industrial Processes" :
                                                                    "Otimização Ergonômica Sustentável nos Processos Industriais")}</p>
                                                    </div>
                                                </div>
                                            </div>*/}
                                            
                                            
                                            {/*
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/angel-guillermo-hidalgo-onate-fcip-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Angel Guillermo Hidalgo Oñate" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Angel Guillermo Hidalgo Oñate</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Técnica de Cotopaxi</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Innovando la evaluación de condiciones ambientales y ergonómicas de un puesto de trabajo mediante el Internet de las Cosas (IoT)" :
                                                                (data.language === "en" ? "Innovating the assessment of environmental and ergonomic workplace conditions through the Internet of Things (IoT)" :
                                                                    "Inovando a avaliação das condições ambientais e ergonômicas do local de trabalho por meio da Internet das Coisas (IoT)")}</p>
                                                    </div>
                                                </div>
                                            </div>*/}
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Publicación de Trabajos" : (data.language === "en" ? "Publication of Papers" : "Publicação de artigos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row d-flex">
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-fcip-innovaciencia.webp" className="mx-auto border" width="160" height="220" alt="Revista Innovaciencia 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Innovaciencia</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "It is an international open-access scientific journal focusing on basic and applied sciences, including areas such as biology, chemistry, biochemistry, physics, mathematics, engineering, and computer science. " :
                                                            (data.language === "en" ? "It is a scientific journal dedicated to the biannual publication of articles of original research results in Spanish and English. It covers a variety of topics related to several areas of knowledge in Engineering Sciences." :
                                                                "É uma revista científica internacional de acesso aberto que se concentra nas ciências básicas e aplicadas, incluindo áreas como biologia, química, bioquímica, física, matemática, engenharia e informática. ")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-fcip-dyna.webp" className="mx-auto border" width="160" height="220" alt="Revista DYNA 2" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista DYNA</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista internacional de la Facultad de Minas de la Universidad Nacional de Colombia que publica artículos científicos revisados por pares en todas las áreas de la ingeniería." :
                                                            (data.language === "en" ? "It is an international journal published by the Faculty of Mining Engineering of the National University of Colombia that publishes peer-reviewed scientific articles in all areas of engineering." :
                                                                "É uma revista internacional da Faculdade de Minas da Universidade Nacional da Colômbia que publica artigos científicos revisados por pares em todas as áreas da engenharia.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-fcip-rica.webp" className="mx-auto border" width="160" height="220" alt="Revista Interdisciplinaria de Ciencias Aplicadas 3" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Interdisciplinaria de Ciencias Aplicadas</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "(RICA), es una revista científica semestral de flujo continuo. Contempla un contexto de abordaje transdisciplinario e interdisciplinario." :
                                                            (data.language === "en" ? "(RICA) is a biannual scientific journal with continuous flow. It takes a transdisciplinary and interdisciplinary approach. " :
                                                                "(RICA) é uma revista científica semestral de fluxo contínuo. Ela contempla um contexto de abordagem transdisciplinar e interdisciplinar.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                           <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-fcip-beverages.webp" className="mx-auto border" width="160" height="220" alt="Revista Beverages 4" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Beverages</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista internacional, revisada por pares y de acceso abierto sobre investigación y desarrollo de bebidas, publicada bimestralmente." :
                                                            (data.language === "en" ? "It is an international, peer-reviewed, open-access journal on beverage research and development, published bimonthly." :
                                                                "É uma revista internacional, revisada por pares e de acesso aberto sobre pesquisa e desenvolvimento de bebidas, publicada bimestralmente.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                        	{/* <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-ingenieria-industrial.webp" className="mx-auto border" width="160" height="220" alt="Revista Ingeniería Industrial, Universidad de Lima 7" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Ingeniería Industrial, Universidad de Lima</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Tiene como objetivo central difundir los resultados de las investigaciones, así como brindar información técnica y científica relativa a este campo." :
                                                            (data.language === "en" ? "Its main objective is to disseminate research results, as well as to provide technical and scientific information related to this field." :
                                                                "Seu principal objetivo é divulgar resultados de pesquisas, bem como fornecer informações técnicas e científicas relacionadas a esse campo.")}</p>
                                                    </div>
                                                </div>
                                            </div>*/}
                                        
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={4}>
                    <Accordion.Header>{data.language === "es" ? "Ciencias Empresariales" : (data.language === "en" ? "Business Science" : "Ciências Empresariais")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 28 al 30 de enero 2026" : (data.language === "en" ? "From 28 to 30 January 2026" : "De 28 a 30 de janeiro de 2026")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/82354679546" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Ingreso a las Conferencias" : (data.language === "en" ? "Admission to the Conferences" : "Entrada nas conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen">
                                            <div className="card-body">
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-sce-uteq-cidu-2026.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-file-pdf-o fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Programación de Ponencias" : (data.language === "en" ? "Programme of lectures" : "Programa de conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="card pnl-information-symp">
                                        <div className="card-header pnl-hdr-symp">
                                            {data.language === "en" ? "Contacts" : "Contactos"}
                                        </div>
                                        <div className="card-body pnl-bdy-symp">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 mb-2">
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinador:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Ing. Jefferson Bravo Salvatierra, M.Sc.</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> jbravo@uteq.edu.ec</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="card pnl-information-symp">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "en" ? "Objective" : "Objetivo"}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Compartir conocimientos de las nuevas tendencias empresariales basadas en el desarrollo de las redes de conocimiento para impulsar el nuevo entorno económico creciente a partir del impulso en una sociedad digital." :
                                            (data.language === "en" ? "Share knowledge of new business trends based on the development of knowledge networks to drive the new growing economic environment based on the momentum of a digital society." :
                                                "Compartilhar conhecimentos sobre as novas tendências empresariais baseadas no desenvolvimento de redes de conhecimento para impulsionar o novo ambiente econômico em crescimento a partir do impulso de uma sociedade digital.")}</p></div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Líneas de Investigación / Ejes Temáticos" : (data.language === "en" ? "Lines of Research / Thematic Axis" : "Linhas de investigação / Eixos temáticos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont">
                                            {data.language === "es" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Modalidades y optimización de la fuerza laboral y aumento de la automatización. </li>
													<li>Adopción de las redes de conocimiento para apoyar los cambios en la dinámica del lugar de trabajo. </li>
													<li>Modalidades laborales en las condiciones empresariales actuales. </li>
													<li>Los millennials en roles de liderazgo empresarial. </li>
													<li>Actualización tecnológica e inteligencia de negocios en el mundo de las empresas. </li>
													<li>Marketing convencional y de experiencia de contenido. </li>
													<li>Transformación digital continua y comercio electrónico. </li>
													<li>El marketing de influencias en las nuevas tendencias de las redes sociales. </li>
													<li>Métodos de automatización por medio de las redes de conocimiento. </li>
													<li>Data security, big data, data analytics and financial forecasts. </li>
													<li>Innovación y redes de conocimiento en los procesos contables y auditoría. </li>

                                                </ul>
                                            </>) :
                                                (data.language === "en" ? (<>
                                                    <ul className="list-unord-step">
                                                        <li>Workforce modalities and optimization and increased automation. </li>
														<li>Adoption of knowledge networks to support changes in workplace dynamics. </li>
														<li>Work modalities in current business conditions. </li>
														<li>Millennials in business leadership roles. </li>
														<li>Technological updates and business intelligence in the corporate world. </li>
														<li>Conventional marketing and content experience. </li>
														<li>Continuous digital transformation and e-commerce. </li>
														<li>Influencer marketing in new social media trends. </li>
														<li>Automation methods through knowledge networks. </li>
														<li>Data security, big data, data analytics, and financial forecasts. </li>
														<li>Innovation and knowledge networks in accounting and auditing processes. </li>
                                                    </ul>
                                                </>) :
                                                    (<>
                                                        <ul className="list-unord-step">
                                                        <li>Modalidades e otimização da força de trabalho e aumento da automação.</li>
                                                        <li>Adoção de redes de conhecimento para apoiar as mudanças na dinâmica do local de trabalho.</li>
                                                        <li>Modalidades de trabalho nas condições empresariais atuais.</li>
														<li>A geração do milênio em funções de liderança empresarial. </li>
														<li>Atualização tecnológica e inteligência de negócios no mundo das empresas. </li>
														<li>Marketing convencional e de experiência de conteúdo. </li>
														<li>Transformação digital contínua e comércio eletrônico. </li>
														<li>O marketing de influência nas novas tendências das redes sociais. </li>
														<li>Métodos de automação por meio de redes de conhecimento. </li>
														<li>Segurança de dados, big data, análise de dados e previsões financeiras. </li>
														<li>Inovação e redes de conhecimento nos processos contábeis e de auditoria. </li>

                                                        </ul>
                                                    </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "es" ? "Comité Científico" : (data.language === "en" ? "Scientific Committee" : "Comité Científico")}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Lic. Marco Villarroel Puma, PhD. </li>
													<li>Ing. Mariana Reyes Bermeo, M.Sc. </li>
													<li>Ing. Jefferson Bravo Salvatierra, M.Sc. </li>
													<li>CPA. Martha Sandoval Cuji, M.Sc. </li>
													<li>Ing. Janet Franco Cedeño, M.Sc. </li>
													<li>Ing. Dominga Rodríguez Ángulo, M.Sc. </li>
													<li>Ing. Freddy Triana Litardo, M.Sc. </li>
													<li>Ing. Ronald Camacho Reyes, M.Sc. </li>
                                                	<li>Econ. Gary Jiménez Hidalgo, M.Sc.</li>
                                                	<li>Ing. Rafael Pinto Arboleda, PhD.</li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Conferencias Magistrales" : (data.language === "en" ? "Keynote Conferences" : "Conferências principais")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row">
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-oshin_huamani.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Econ. Oshin Huamani Huaranca, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Perú (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Econ. Oshin Huamani Huaranca, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de San Agustín de Arequipa (Perú)</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Proyectos financiados con impacto en I+D+i para América Latina y el Caribe" :
                                                            (data.language === "en" ? "Funded projects with an impact on R&D&I for Latin America and the Caribbean" : "Projetos financiados com impacto em P&D+i para a América Latina e o Caribe")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-pablo-vidal.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Pablo Vidal Fernández, PhD" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Pablo Vidal Fernández, PhD</h5>
                                                        <div className="mb-1 text-titles-speaker">CEO de la firma consultora PVM/ docente Universidad Laica Eloy Alfaro de Manabí</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Creando marcas con inteligencia artificial" :
                                                            (data.language === "en" ? "Creating brands with artificial intelligence" : "Criando marcas com inteligência artificial")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-estela-sabando.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Purificación Galindo Villardon" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Estela Sabando Mendoza, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Laica Eloy Alfaro de Manabí</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Neuromarketing y comportamiento del consumidor" :
                                                            (data.language === "en" ? "Neuromarketing and consumer behavior" : "Neuromarketing e comportamento do consumidor")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-vasilica-margalina.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Vasilica María Margalina, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Rumania (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Vasilica María Margalina, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Alba Iulia, Rumanía CEO de IDVAS GROUP S.R.L</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Análisis PLS-SEM aplicado al comercio electrónico" :
                                                            (data.language === "en" ? "PLS-SEM analysis applied to e-commerce" : "Análise PLS-SEM aplicada ao comércio eletrônico")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-martha-lozada.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcda. Martha Lozada Orejuela, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcda. Martha Lozada Orejuela, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de las Fuerzas Armadas ESPE</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Las book tax diferences en el Ecuador en un grupo de empresas de la Bolsa de Valores" :
                                                            (data.language === "en" ? "Book tax differences in Ecuador in a group of companies listed on the Stock Exchange" : "As diferenças fiscais contábeis no Equador em um grupo de empresas da Bolsa de Valores")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                                                           
                                                                               
                                        
                                        <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-alberto-cutipa.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Alberto Cutipa Limache, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Perú (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Alberto Cutipa Limache, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional del Altiplano</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Poker de estrategias directrices del marketing" :
                                                            (data.language === "en" ? "Four key marketing strategies" : "Poker de estratégias diretrizes de marketing")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                       
                                      
                                      
                                         	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-odila-mena.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcda. Odila Mena Hidalgo,M.Sc" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcda. Odila Mena Hidalgo,M.Sc</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de Educación UNAE</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Administrar con sentido pedagógico: una mirada crítica a la burocracia educativa en el Ecuador y el rol estratégico de la universidad" :
                                                            (data.language === "en" ? "Managing with a pedagogical approach: a critical look at educational bureaucracy in Ecuador and the strategic role of the university" : "Administrar com sentido pedagógico: uma visão crítica da burocracia educacional no Equador e o papel estratégico da universidade")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                        
                                      	   <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-jose-almeida.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcdo. José Almeida Sánchez,M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcdo. José Almeida Sánchez,M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Colegio de Contadores del Ecuador</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Contabilidad 4.0: Transformación del Modelo de Enseñanza mediante Laboratorios y Sistemas Contables Digitales" :
                                                            (data.language === "en" ? "Accounting 4.0: Transforming the Teaching Model through Laboratories and Digital Accounting Systems" : "Contabilidade 4.0: Transformação do Modelo de Ensino por meio de Laboratórios e Sistemas Contábeis Digitais")}</p>
                                                    </div>
                                                </div>
                                           </div>
                                        
                                         <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-pedro-zapata.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Pedro Zapata Sánchez." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Pedro Zapata Sánchez</h5>
                                                        <div className="mb-1 text-titles-speaker">Colegio de Contadores Públicos de Pichincha y del Ecuador (CCPP-e)</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Nueva Forma de Preparar y Revelar los Estados Financieros en base de NIIF-18" :
                                                            (data.language === "en" ? "New Method for Preparing and Disclosing Financial Statements based on IFRS-18" : "Nova forma de preparar e divulgar as demonstrações financeiras com base na NIIF-18")}</p>
                                                    </div>
                                                </div>
                                           </div>
                                        
                                        <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-manuel-hidalgo.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Econ. Manuel Hidalgo Tupia, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Perú (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Econ. Manuel Hidalgo Tupia, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional Mayor de San Marcos</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Impacto Economico del Puerto de Chancay y las perpectivas sobre la conseción del Paqrque Industrial de Ancón" :
                                                            (data.language === "en" ? "Economic impact of the Port of Chancay and prospects for the concession of the Ancón Industrial Park" : "Impacto econômico do Porto de Chancay e as perspectivas sobre a concessão do Parque Industrial de Ancón")}</p>
                                                    </div>
                                                </div>
                                           </div>
                                        
                                        
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Publicación de Trabajos" : (data.language === "en" ? "Publication of Papers" : "Publicação de artigos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row d-flex">
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-ciencia-sociales-economicas.webp" className="mx-auto border" width="160" height="220" alt="Revista de Ciencias Sociales y Económicas 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista de Ciencias Sociales y Económicas</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Está dirigida a la comunidad académica nacional e internacional, y su propósito es cumplir la función institucional, económica y pedagógica de promover y desarrollar el conocimiento en el área de las Ciencias Sociales y Económicas, desde una perspectiva amplia y multidisciplinaria." :
                                                            (data.language === "en" ? "It is aimed at the national and international academic community, and its purpose is to fulfil the institutional, economic and pedagogical function of promoting and developing knowledge in the field of Social and Economic Sciences, from a broad and multidisciplinary perspective." :
                                                                "Destina-se à comunidade acadêmica nacional e internacional, e seu objetivo é cumprir a função institucional, econômica e pedagógica de promover e desenvolver o conhecimento na área das Ciências Sociais e Econômicas, a partir de uma perspectiva ampla e multidisciplinar.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-lex-localis.webp" className="mx-auto border" width="160" height="220" alt="Revista Lex Localis 2" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Lex Localis</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Publica artículos que contribuyen a una mejor comprensión y práctica del autogobierno local y que son de interés para académicos, analistas de políticas, responsables políticos y profesionales. Se centra en el análisis crítico de los avances en gobernanza local en todo el mundo." :
                                                            (data.language === "en" ? "It publishes articles that contribute to a better understanding and practice of local self-government and are of interest to academics, policy analysts, policymakers and practitioners. It focuses on critical analysis of developments in local governance around the world.":
                                                            	"Publica artigos que contribuem para uma melhor compreensão e prática da autogovernança local e que são de interesse para académicos, analistas políticos, decisores políticos e profissionais. Centra-se na análise crítica dos avanços na governança local em todo o mundo.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/portada-finanzas-politica-economica.webp" className="mx-auto border" width="160" height="220" alt="Revista Finanzas y Política Económica 3" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Finanzas y Política Económica</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "La revista ha generado un espacio científico en el que los temas relacionados con las políticas económicas, las finanzas y demás tópicos referentes a las ciencias económicas en el contexto colombiano, iberoamericano y mundial pueden ser analizados y discutidos por académicos e investigadores, nacionales e internacionales, del más alto nivel." :
                                                            (data.language === "en" ? "The journal has created a scientific space in which topics related to economic policy, finance and other issues concerning economics in the Colombian, Ibero-American and global contexts can be analysed and discussed by leading national and international academics and researchers.":
                                                            	"A revista criou um espaço científico no qual temas relacionados com políticas econômicas, finanças e outros assuntos relacionados com as ciências econômicas no contexto colombiano, ibero-americano e mundial podem ser analisados e discutidos por acadêmicos e pesquisadores nacionais e internacionais do mais alto nível.")}</p>
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
                    <Accordion.Header>{data.language === "es" ? "Ciencias Sociales, Económicas y Financieras" : (data.language === "en" ? "Social Sciences, Economics and Finance" : "Ciências Sociais, Economia e Finanças")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 28 al 30 de enero 2026" : (data.language === "en" ? "From 28 to 30 January 2026" : "De 28 a 30 de janeiro de 2026")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/84438989433" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Ingreso a las Conferencias" : (data.language === "en" ? "Admission to the Conferences" : "Entrada nas conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen">
                                            <div className="card-body">
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scsef-uteq-cidu-2026.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-file-pdf-o fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Programación de Ponencias" : (data.language === "en" ? "Programme of lectures" : "Programa de conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="card pnl-information-symp">
                                        <div className="card-header pnl-hdr-symp">
                                            {data.language === "en" ? "Contacts" : "Contactos"}
                                        </div>
                                        <div className="card-body pnl-bdy-symp">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 mb-2">
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinador:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Econ. Félix Gómez Gutiérrez, M.Sc.</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> fgomez@uteq.edu.ec</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="card pnl-information-symp">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "en" ? "Objective" : "Objetivo"}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Fomentar la creación de espacios de diálogo multidisciplinarios sobre las nuevas tendencias sociales, económicas y financieras, con el propósito de generar estrategias innovadoras para el desarrollo sostenible de los sectores productivos, integrando las tecnologías emergentes y las herramientas de la inteligencia artificial, tanto en el contexto nacional como global." :
                                            (data.language === "en" ? "Promote multidisciplinary dialogue for the transfer of innovative proposals in socioeconomic and financial matters, to accelerate sustainable growth in productive sectors through the effective integration of AI and disruptive technologies into the global ecosystem." :
                                                "Promover o diálogo multidisciplinar para a transferência de propostas inovadoras em matéria socioeconômica e financeira, a fim de acelerar o crescimento sustentável dos setores produtivos por meio da integração efetiva da IA e de tecnologias disruptivas no ecossistema global.")}</p></div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Líneas de Investigación / Ejes Temáticos" : (data.language === "en" ? "Lines of Research / Thematic Axis" : "Linhas de investigação / Eixos temáticos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont">
                                            {data.language === "es" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Transformación digital y finanzas inteligentes. </li>
													<li>Mercados y gestión de riesgos financieros. </li>
													<li>Big data, fintech, criptomonedas y blockchain. </li>
													<li>Plataformas digitales e inteligencia artificial. </li>
													<li>Emprendimiento digital y startups tecnológicas en el sector financiero </li>
													<li>Formulación y evaluación de políticas económicas y sociales. </li>
													<li>Modelos de negocios impulsados por inteligencia artificial. </li>
													<li>Economía del comportamiento e inteligencia artificial. </li>
													<li>Innovación y emprendimiento en la era digital. </li>
													<li>Inteligencia artificial en los sectores productivos. </li>
													<li>Desarrollo sostenible y políticas públicas. </li>
													<li>Emprendimiento e innovación social en el contexto de la inteligencia artificial. </li>
													<li>Gestión y administración de servicios públicos. </li>
													<li>Gobierno digital y open data. </li>
													<li>Administración pública y regulación, ética y gobernanza. </li>
                                                </ul>
                                            </>) :
                                                (data.language === "en" ? (<>
                                                    <ul className="list-unord-step">
                                                        <li>Digital transformation and smart finance. </li>
														<li>Markets and financial risk management. </li>
														<li>Big data, fintech, cryptocurrencies, and blockchain. </li>
														<li>Digital platforms and artificial intelligence. </li>
														<li>Digital entrepreneurship and tech startups in the financial sector. </li>
														<li>Formulation and evaluation of economic and social policies. </li>
														<li>Business models driven by artificial intelligence. </li>
														<li>Behavioral economics and artificial intelligence. </li>
														<li>Innovation and entrepreneurship in the digital age. </li>
														<li>Artificial intelligence in productive sectors. </li>
														<li>Sustainable development and public policy. </li>
														<li>Entrepreneurship and social innovation in the context of artificial intelligence. </li>
														<li>Management and administration of public services. </li>
														<li>Digital government and open data. </li>
														<li>Public administration and regulation, ethics, and governance. </li>
                                                    </ul>
                                                </>) :
                                                    (<>
                                                        <ul className="list-unord-step">
                                                            <li>Transformação digital e finanças inteligentes. </li>
															<li>Mercados e gestão de riscos financeiros. </li>
															<li>Big data, fintech, criptomoedas e blockchain. </li>
															<li>Plataformas digitais e inteligência artificial. </li>
															<li>Empreendedorismo digital e startups tecnológicas no setor financeiro. </li>
															<li>Formulação e avaliação de políticas econômicas e sociais. </li>
															<li>Modelos de negócios impulsionados por inteligência artificial. </li>
															<li>Economia comportamental e inteligência artificial. </li>
															<li>Inovação e empreendedorismo na era digital. </li>
															<li>Inteligência artificial nos setores produtivos. </li>
															<li>Desenvolvimento sustentável e políticas públicas. </li>
															<li>Empreendedorismo e inovação social no contexto da inteligência artificial. </li>
															<li>Gestão e administração de serviços públicos. </li>
															<li>Governo digital e dados abertos. </li>
															<li>Administração pública e regulamentação, ética e governança. </li>
                                                        </ul>
                                                    </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "es" ? "Comitê Científico" : (data.language === "en" ? "Scientific Committee" : "Comité Científico")}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Econ. Roger Yela Burgos, PhD. </li>
													<li>Ing. Celia Portugal Candelario, M.Sc. </li>
													<li>Econ. Ángel Maldonado Castro, M.Sc. </li>
													<li>Ing. Jorge Sáenz Taleno, M.Sc. </li>
													<li>Ing. Marcelo Monge García, M.Sc.</li>
                                                	<li>Econ. Wendy Mora Carpio, M.Sc.</li>
                                                	<li>Econ. Katty Jadán Solis, M.Sc.</li>                                                
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Conferencias Magistrales" : (data.language === "en" ? "Conferências principais" : "Keynote Conferences")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row">
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcesf-xavier-ordenana.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Econ. Xavier Ordeñana Rodríguez, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Econ. Xavier Ordeñana Rodríguez, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Tecnológico de Monterrey</div>
                                                    <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Del riesgo global a la acción local: desafíos económicos 2026 y el papel estratégico de las universidades en Ecuador" : 
                                                       (data.language === "en" ? "From global risk to local action: economic challenges for 2026 and the strategic role of universities in Ecuador" : 
                                                       "Do risco global à ação local: desafios econômicos para 2026 e o papel estratégico das universidades no Equador")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcsef-diego-garcia.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Econ. Diego García Vélez. PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Econ. Diego García Vélez. PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Técnica Particular de Loja</div>
                                                    		<p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "El modelo de estado abierto como ejemplo de política pública en Ecuador" :
                                                    		(data.language === "en" ? "The open state model as an example of public policy in Ecuador" : 
                                                      		 "O modelo de estado aberto como exemplo de política pública no Equador")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        {/*<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcsef-rodrigo-mendieta.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Econ. Rodrigo Mendieta Muñoz, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Econ. Rodrigo Mendieta Muñoz, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Cuenca</div>
                                                    <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "El modelo de estado abierto como ejemplo de política pública en Ecuador" : 
                                                    (data.language === "en" ? "The open state model as an example of public policy in Ecuador" : "O modelo de estado aberto como exemplo de política pública no Equador")}</p>
                                                    </div>
                                                </div>
                                            </div>*/}
                                        
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcsef-pablo-cabezas.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Pablo Cabezas Arboleda, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Pablo Cabezas Arboleda, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Banco Central del Ecuador</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "¿Las empresas determinan el ciclo económico o es el ciclo económico quien determina el comportamiento de las empresas?" : 
                                                        (data.language === "en" ? "Do companies determine the economic cycle, or does the economic cycle determine the behaviour of companies?" : "São as empresas que determinam o ciclo econômico ou é o ciclo econômico que determina o comportamento das empresas?")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                      	   <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcsef-airto-gil.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Airto Gil García, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Airto Gil García, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Camilo José Cela</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Modelos de negocio y estrategias de crecimiento impulsadas por inteligencia artificial: de la automatización a la toma de decisiones estratégicas" : 
                                                        (data.language === "en" ? "Business models and growth strategies driven by artificial intelligence: from automation to strategic decision-making" : "Modelos de negócios e estratégias de crescimento impulsionados pela inteligência artificial: da automação à tomada de decisões estratégicas")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                       	 <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcsef-beatriz-elvira.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcda. Beatriz Elvira Guerci, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Argentina (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcda. Beatriz Elvira Guerci, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de Jujuy</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Internacionalización de la investigación" : 
                                                        (data.language === "en" ? "Internationalisation of research" : "Internacionalização da pesquisa")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                       	 	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcsef-leonardo-suarez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Econ. Leonardo Suárez Giordano, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Econ. Leonardo Suárez Giordano, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Empresa Expectativas</div>
                                                    <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "¿Es la disciplina fiscal un pilar fundamental para la sustentabilidad de la dolarización?" : 
                                                        (data.language === "en" ? "Is fiscal discipline a fundamental pillar for the sustainability of dollarisation?" : "A disciplina fiscal é um pilar fundamental para a sustentabilidade da dolarização?")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcsef-virginia-garcia.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Virginia García Lorenzo" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Virginia García Lorenzo</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Castilla- La Mancha</div>
                                                    <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Instrumentos de Marketing Inteligente Aplicados al Sector Turístico" : 
                                                        (data.language === "en" ? "Smart Marketing Tools Applied to the Tourism Sector" : "Instrumentos de Marketing Inteligente aplicados ao setor turístico")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                       		<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcsef-angeles-garcia.webp" className="mx-auto border" width="140" height="160" alt="Ponente - María Ángeles García Haro" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">María Ángeles García Haro</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Castilla- La Mancha </div>
                                                    <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "El marketing 6.0 aplicado al sector turístico" : 
                                                        (data.language === "en" ? "Marketing 6.0 applied to the tourism sector" : "O marketing 6.0 aplicado ao setor turístico")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Publicación de Trabajos" : (data.language === "en" ? "Publication of Papers" : "Publicação de artigos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row d-flex">
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-argumenta-oeconomica.webp" className="mx-auto border" width="160" height="220" alt="Argumenta Oeconomica 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Argumenta Oeconomica</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Argumenta Oeconomica es una revista internacional semestral con revisión por pares. Recibimos una donación del Ministerio de Ciencia y Educación Superior de Polonia." :
                                                            (data.language === "en" ? "Argumenta Oeconomica is an international peer-reviewed biannual journal. We receive funding from the Polish Ministry of Science and Higher Education." :
                                                                "Argumenta Oeconomica é uma revista internacional semestral com revisão por pares. Recebemos uma doação do Ministério da Ciência e Educação Superior da Polônia.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/portada-finanzas-politica-economica.webp" className="mx-auto border" width="160" height="220" alt="Revista Finanzas y Política Económica 2" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Finanzas y Política Económica</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "La revista ha generado un espacio científico en el que los temas relacionados con las políticas económicas, las finanzas y demás tópicos referentes a las ciencias económicas en el contexto colombiano, iberoamericano y mundial pueden ser analizados y discutidos por académicos e investigadores, nacionales e internacionales, del más alto nivel." :
                                                            (data.language === "en" ? "The journal has created a scientific space in which topics related to economic policy, finance and other issues concerning economics in the Colombian, Ibero-American and global contexts can be analysed and discussed by leading national and international academics and researchers." :
                                                                "A revista criou um espaço científico no qual temas relacionados com políticas econômicas, finanças e outros assuntos relacionados com as ciências econômicas no contexto colombiano, ibero-americano e mundial podem ser analisados e discutidos por acadêmicos e pesquisadores nacionais e internacionais do mais alto nível.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-ciencia-sociales-economicas.webp" className="mx-auto border" width="160" height="220" alt="Revista de Ciencias Sociales y Económicas 3" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista de Ciencias Sociales y Económicas</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Está dirigida a la comunidad académica nacional e internacional, cuyo propósito es cumplir con el rol institucional, económico y pedagógico de promoción y desarrollo del conocimiento en el área de las Ciencias Sociales y Económicas , vista desde una perspectiva amplia y multidisciplinaria." :
                                                            (data.language === "en" ? "It is aimed at the national and international academic community, whose purpose is to fulfil the institutional, economic and pedagogical role of promoting and developing knowledge in the area of Social and Economic Sciences, seen from a broad and multidisciplinary perspective." :
                                                                "Destina-se à comunidade académica nacional e internacional, com o objetivo de cumprir a função institucional, económica e pedagógica de promover e desenvolver o conhecimento na área das Ciências Sociais e Económicas, numa perspetiva ampla e multidisciplinar.")}</p>
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
                    <Accordion.Header>{data.language === "es" ? "Ciencias de la Educación" : (data.language === "en" ? "Educational Sciences" : "Ciências da Educação")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 28 al 30 de enero 2026" : (data.language === "en" ? "From 28 to 30 January 2026" : "De 28 a 30 de janeiro de 2026")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/89031450640" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Ingreso a las Conferencias" : (data.language === "en" ? "Admission to the Conferences" : "Entrada nas conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen">
                                            <div className="card-body">
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scedu-uteq-cidu-2026.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-file-pdf-o fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Programación de Ponencias" : (data.language === "en" ? "Programme of lectures" : "Programa de conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="card pnl-information-symp">
                                        <div className="card-header pnl-hdr-symp">
                                            {data.language === "en" ? "Contacts" : "Contactos"}
                                        </div>
                                        <div className="card-body pnl-bdy-symp">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 mb-2">
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinador:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Lcdo. Jardel Coutinho dos Santos, PhD.</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> jcoutinhod@uteq.edu.ec</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="card pnl-information-symp">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "en" ? "Objective" : "Objetivo"}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Explorar y promover estrategias interdisciplinarias para tejer redes de conocimiento en una sociedad digital, impulsando la colaboración entre comunidades educativas, científicas y tecnológicas, con el fin de fortalecer un aprendizaje colectivo, ético y sostenible ante los retos y oportunidades de la transformación tecnológica. " :
                                            (data.language === "en" ? "Explore and promote interdisciplinary strategies for weaving knowledge networks in a digital society, fostering collaboration between educational, scientific, and technological communities, with the aim of strengthening collective, ethical, and sustainable learning in the face of the challenges and opportunities presented by technological transformation." :
                                                "Explorar e promover estratégias interdisciplinares para tecer redes de conhecimento em uma sociedade digital, impulsionando a colaboração entre comunidades educativas, científicas e tecnológicas, com o objetivo de fortalecer uma aprendizagem coletiva, ética e sustentável diante dos desafios e oportunidades da transformação tecnológica. ")}</p></div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Líneas de Investigación / Ejes Temáticos" : (data.language === "en" ? "Lines of Research / Thematic Axis" : "Linhas de investigação / Eixos temáticos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont">
                                            {data.language === "es" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Inteligencia artificial y realidad virtual aplicados a la enseñanza y aprendizaje</li>
                                                    <li>La escuela en la era de la Inteligencia Artificial</li>
                                                    <li>Personalización del Aprendizaje mediante IA</li>
                                                    <li>Conectivismo y conocimiento conectivo</li>
                                                    <li>Redes de aprendizaje</li>
                                                    <li>Emociones y aprendizaje de idiomas</li>
                                                    <li>Tecnologías de la información y comunicación</li>
                                                    <li>Tecnologías del aprendizaje y del conocimiento</li>
                                                    <li>Tecnologías para el empoderamiento y la participación</li>
                                                    <li>Gamificación o Ludificación</li>
                                                    <li>Didáctica</li>
                                                    <li>Estrategia de enseñanza aprendizaje</li>
                                                    <li>Aprendizaje significativo</li>
                                                    <li>Praxis curricular y rendimiento académico</li>
                                                    <li>Gestión curricular</li>
                                                    <li>Aprendizaje colaborativo</li>
                                                    <li>Neurociencias</li>
                                                    <li>Educación intercultural y bilingüe y/o etnoeducación</li>
                                                    <li>Necesidades educativas especiales</li>
                                                    <li>Educación inclusiva</li>
                                                    <li>Formación de identidad y cultura</li>
                                                    <li>Escuela y familia</li>
                                                    <li>Prácticas de valores en el contexto educativo</li>
                                                    <li>Ética y docencia</li>
                                                    <li>Enfoques epistemológicos</li>
                                                    <li>Educación para la paz y los derechos humanos</li>
                                                </ul>
                                            </>) : (data.language === "en" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Artificial Intelligence and Virtual Reality Applied to Teaching and Learning</li>
                                                    <li>The School in the Age of Artificial Intelligence</li>
                                                    <li>Personalisation of Learning through AI</li>
                                                    <li>Connectivism and Connective Knowledge</li>
                                                    <li>Learning Networks</li>
                                                    <li>Emotions and Language Learning</li>
                                                    <li>Information and Communication Technologies</li>
                                                    <li>Learning and Knowledge Technologies</li>
                                                    <li>Technologies for Empowerment and Participation</li>
                                                    <li>Gamification or Ludification</li>
                                                    <li>Didactics</li>
                                                    <li>Teaching and Learning Strategy</li>
                                                    <li>Meaningful Learning</li>
                                                    <li>Curricular Praxis and Academic Performance</li>
                                                    <li>Curricular Management</li>
                                                    <li>Collaborative Learning</li>
                                                    <li>Neurosciences</li>
                                                    <li>Intercultural and Bilingual Education and/or Ethnoeducation</li>
                                                    <li>Special Educational Needs</li>
                                                    <li>Inclusive Education</li>
                                                    <li>Formation of Identity and Culture</li>
                                                    <li>School and Family</li>
                                                    <li>Values Practices in the Educational Context</li>
                                                    <li>Ethics and Teaching</li>
                                                    <li>Epistemological Approaches</li>
                                                    <li>Education for Peace and Human Rights</li>
                                                </ul>
                                            </>) : (<>
                                                <ul className="list-unord-step">
                                                    <li>Inteligência artificial e realidade virtual aplicadas ao ensino e aprendizagem</li>
                                                    <li>A escola na era da Inteligência Artificial</li>
                                                    <li>Personalização da Aprendizagem por meio da IA</li>
                                                    <li>Conectivismo e conhecimento conectivo</li>
                                                    <li>Redes de aprendizagem</li>
                                                    <li>Emoções e aprendizagem de línguas</li>
                                                    <li>Tecnologias da informação e comunicação</li>
                                                    <li>Tecnologias de aprendizagem e do conhecimento</li>
                                                    <li>Tecnologias para o empoderamento e a participação</li>
                                                    <li>Gamificação ou Ludificação</li>
                                                    <li>Didática</li>
                                                    <li>Estratégia de ensino-aprendizagem</li>
                                                    <li>Aprendizagem significativa</li>
                                                    <li>Práxis curricular e desempenho acadêmico</li>
                                                    <li>Gestão curricular</li>
                                                    <li>Aprendizagem colaborativa</li>
                                                    <li>Neurociências</li>
                                                    <li>Educação intercultural e bilíngue e/ou etnoeducação</li>
                                                    <li>Necessidades educacionais especiais</li>
                                                    <li>Educação inclusiva</li>
                                                    <li>Formação de identidade e cultura</li>
                                                    <li>Escola e família</li>
                                                    <li>Práticas de valores no contexto educativo</li>
                                                    <li>Ética e docência</li>
                                                    <li>Abordagens epistemológicas</li>
                                                    <li>Educação para a paz e os direitos humanos</li>
                                                </ul>
                                            </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "es" ? "Comité Científico" : (data.language === "en" ? "Scientific Committee" : "Comité Científico")}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Lic. Karla Carrera Salinas, M.Sc.</li>
													<li>Lic. Yisell Vigoa Escobedo, PhD. </li>
													<li>Lic. Lisseth Belduma Rentería, M.Sc. </li>
													<li>Lic. Erika Herrera Irazabal, M.Sc. </li>
													<li>Lic. Marcos Gutiérrez Soto, PhD. </li>
													<li>Lic. Cristopher Herrera Navas, M.Sc. </li>
													<li>Lic. Jorge Guamán Eras, M.Sc. </li>
													<li>Lic. Carlos Núñez Michuy, PhD. </li>
													<li>Lic. María Zambrano Hernández, M.Sc. </li>
													<li>Lic. Henry Alarcón López, PhD. </li>
                                                	<li>Lic. Gabriela Galeas Arboleda, M.Sc.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Conferencias Magistrales" : (data.language === "en" ? "Keynote Conferences" : "Conferências principais")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row">
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcedu-juliana-ass.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Juliana Assunção Tonelli" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Brasil (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Juliana Assunção Tonelli</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidade Estadual de Londrina</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "¿Enseñarles inglés a los niños o con los niños? Repensando la enseñanza y el aprendizaje de idiomas y la infancia" :
                                                            (data.language === "en" ? "Teaching English to children or with children? Rethinking language teaching and learning and childhood" :
                                                                "Ensinar inglês às crianças ou com as crianças? Repensando o ensino e a aprendizagem de línguas e a infância")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcedu-yisell-vigoa.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Yisell Vigoa Escobedo" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Yisell Vigoa Escobedo</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Técnica Estatal de Quevedo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Plataformas y herramientas informáticas para la edición, diseño y maquetación de las publicaciones. Innovaciones en gestión editorial y tecnologías emergentes en una sociedad digital" :
                                                            (data.language === "en" ? "IT platforms and tools for editing, designing and laying out publications. Innovations in publishing management and emerging technologies in a digital society." :
                                                                "Plataformas e ferramentas informáticas para a edição, design e diagramação de publicações. Inovações na gestão editorial e tecnologias emergentes em uma sociedade digital.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/edwin-martin-garcia-ramirez-phd-fcedu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Edwin Martín García Ramírez, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Perú (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Edwin García Ramírez, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad César Vallejo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Ética y gobernanza de la IA en la Universidad: Implementación de marcos éticos en las facultades para asegurar un uso responsable de las tecnologías emergentes" :
                                                            (data.language === "en" ? "AI Ethics and Governance at University: Implementing ethical frameworks in faculties to ensure responsible use of emerging technologies" :
                                                                "Ética e governança da IA na universidade: implementação de marcos éticos nas faculdades para garantir o uso responsável das tecnologias emergentes")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcedu-sonia-guerra.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Sonia Guerra Iglesias" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Cuba (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Sonia Guerra Iglesias</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Bolivariana del Ecuador</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Universidad, diversidad e interseccionalidad.Un reto para la transformación social inclusiva" :
                                                            (data.language === "en" ? "University, diversity and intersectionality: a challenge for inclusive social transformation" :
                                                                "Universidade, diversidade e interseccionalidade. Um desafio para a transformação social inclusiva")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcedu-dionisio-ponce.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Dionisio Ponce Ruiz" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Dionisio Ponce Ruiz</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Regional Autónoma de los Andes</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Ecosistemas de sabiduría y creatividad universitaria: aplicaciones de la inteligencia artificial en la investigación educativa" :
                                                            (data.language === "en" ? "Ecosystems of wisdom and university creativity: applications of artificial intelligence in educational research" :
                                                                "Ecossistemas de sabedoria e criatividade universitária: aplicações da inteligência artificial na pesquisa educacional")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Publicación de Trabajos" : (data.language === "en" ? "Publication of Papers" : "Publicação de artigos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row d-flex">
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-kronos.webp" className="mx-auto border" width="160" height="220" alt="Kronos 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Kronos</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una publicación bianual del Instituto Académico de Idiomas (IAI) de la Universidad Central del Ecuador la cual recibe artículos inéditos ya sean originales o de revisión y su contenido se selecciona bajo el sistema de evaluación de pares académicos internos y externos mediante la modalidad de doble ciego para garantizar la confidencialidad de autores y árbitros." :
                                                            (data.language === "en" ? "It is a biannual publication of the Academic Language Institute (IAI) of the Central University of Ecuador, which accepts unpublished articles, whether original or revised, and whose content is selected under a double-blind peer review system involving internal and external academics to ensure the confidentiality of authors and reviewers." :
                                                                "É uma publicação semestral do Instituto Acadêmico de Línguas (IAI) da Universidade Central do Equador, que recebe artigos inéditos, sejam eles originais ou revisados, e cujo conteúdo é selecionado por meio de um sistema de avaliação por pares acadêmicos internos e externos, utilizando a modalidade duplo-cego para garantir a confidencialidade dos autores e revisores.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-conrado-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Conrado 2" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Conrado</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Se encuentra reconocida en el Registro Nacional de Publicaciones Seriadas (La Habana, Cuba). RNSP: 2081, tomo III, folio 94 e indexada en directorios, catálogos y bases de datos internacionales." :
                                                            (data.language === "en" ? "It is recorded in the National Register of Serial Publications (Havana, Cuba). RNSP: 2081, Volume III, folio 94 and indexed in indexes, catalogues and international databases." :
                                                                "Ela é reconhecida no Registro Nacional de Publicações Seriadas (Havana, Cuba). RNSP: 2081, volume III, fólio 94 e indexado em diretórios, catálogos e bancos de dados internacionais.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-cognosis-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Cognosis 3" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Cognosis</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una publicación trimestral arbitrada que publica artículos que presenten rigor científico, solidez teórica y análisis crítico; la misma está adscrita a la Facultad de Filosofía, Letras y Ciencias de la Educación de la Universidad Técnica de Manabí." :
                                                            (data.language === "en" ? "It is a quarterly peer-reviewed publication that publishes articles with scientific rigour, theoretical soundness and critical analysis; it is affiliated to the Faculty of Philosophy, Letters and Education of the Technical University of Manabí." :
                                                                "É uma publicação trimestral com arbitragem que publica artigos que apresentam rigor científico, solidez teórica e análise crítica; está vinculada à Faculdade de Filosofia, Letras e Ciências da Educação da Universidade Técnica de Manabí.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	
                                        	<div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-theory.webp" className="mx-auto border" width="160" height="220" alt="Theory and Practice of Second Language Acquisition 4" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Theory and Practice of Second Language Acquisition</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista académica de investigación dedicada a los fundamentos teóricos de la adquisición de lenguas y sus implicaciones prácticas en el aula. La revista se centra en los hallazgos empíricos relacionados con la adquisición y la enseñanza de lenguas en diversos entornos educativos." :
                                                            (data.language === "en" ? "It is an academic research journal dedicated to the theoretical foundations of language acquisition and its practical implications in the classroom. The journal focuses on empirical findings related to language acquisition and teaching in various educational settings." :
                                                                "É uma revista acadêmica de pesquisa dedicada aos fundamentos teóricos da aquisição de línguas e suas implicações práticas na sala de aula. A revista concentra-se em descobertas empíricas relacionadas à aquisição e ao ensino de línguas em diversos ambientes educacionais.")}</p>
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
                    <Accordion.Header>{data.language === "es" ? "Ciencias de la Salud" : (data.language === "en" ? "Health Sciences" : "Ciências da Saúde")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 28 al 30 de enero 2026" : (data.language === "en" ? "From 28 to 30 January 2026" : "De 28 a 30 de janeiro de 2026")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/82906058377" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Ingreso a las Conferencias" : (data.language === "en" ? "Admission to the Conferences" : "Entrada nas conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen">
                                            <div className="card-body">
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scs-uteq-cidu-2026.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-file-pdf-o fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Programación de Ponencias" : (data.language === "en" ? "Programme of lectures" : "Programa de conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="card pnl-information-symp">
                                        <div className="card-header pnl-hdr-symp">
                                            {data.language === "en" ? "Contacts" : "Contactos"}
                                        </div>
                                        <div className="card-body pnl-bdy-symp">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 mb-2">
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinadora:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Dra. María Fernanda Coello Llerena</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> mcoello@uteq.edu.ec</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="card pnl-information-symp">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "en" ? "Objective" : "Objetivo"}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Fortalecer las competencias académicas, investigativas y profesionales de los estudiantes y docentes de Enfermería mediante el análisis, intercambio y aplicación de innovaciones digitales, promoviendo la construcción de redes de conocimiento que potencien la calidad del cuidado y la formación en una sociedad digital." :
                                            (data.language === "en" ? "Strengthen the academic, research and professional skills of nursing students and teachers through the analysis, exchange and application of digital innovations, promoting the construction of knowledge networks that enhance the quality of care and training in a digital society." :
                                                "Fortalecer as competências acadêmicas, investigativas e profissionais dos estudantes e professores de Enfermagem por meio da análise, do intercâmbio e da aplicação de inovações digitais, promovendo a construção de redes de conhecimento que potenciem a qualidade do cuidado e da formação em uma sociedade digital.")}</p></div>
                                    </div>
                                    {/*<div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Fomentar un enfoque de atención en salud que reconozca la importancia de la integralidad y la holística. Buscamos compartir y discutir los avances, investigaciones y mejores prácticas relacionadas con esta temática, con el fin de promover una atención de calidad que abarque no solo los aspectos físicos, sino también los emocionales, sociales y espirituales de nuestros pacientes." :
                                            (data.language === "en" ? "To promote an approach to health care that recognises the importance of comprehensiveness and holistic care. We seek to share and discuss advances, research and best practices related to this topic, in order to promote quality care that encompasses not only the physical, but also the emotional, social and spiritual aspects of our patients." :
                                                "Promover uma abordagem de assistência médica que reconheça a importância da abrangência e do atendimento holístico. Buscamos compartilhar e discutir avanços, pesquisas e práticas recomendadas relacionadas a esse tópico, a fim de promover um atendimento de qualidade que englobe não apenas os aspectos físicos, mas também os emocionais, sociais e espirituais de nossos pacientes.")}</p></div>
                                    </div>*/}
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Líneas de Investigación / Ejes Temáticos" : (data.language === "en" ? "Lines of Research / Thematic Axis" : "Linhas de investigação / Eixos temáticos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont">
                                            {
                                                data.language === "es" ? (<>
                                                    <ul className="list-unord-step">
                                                        {/*<li>Integración de la atención en salud y salud preventiva.</li>
                                                        <li>Salud mental holística.</li>
                                                        <li>Tecnología y salud integral.</li>
                                                        <li>Salud holística en el lugar de trabajo.</li>
                                                        <li>Investigación en salud integral.</li>
                                                        <li>Tecnología y salud integral.</li>
                                                        <li>Integración de la atención en salud y salud preventiva.</li>
                                                        <li>Salud mental holística.</li>
                                                        <li>Investigación en salud integral.</li>
                                                        <li>Salud holística en el lugar de trabajo.</li>*/}
                                                    
                                                    <li><b>Tecnologías emergentes aplicadas al cuidado de Enfermería</b>
                                                
													<p class="text-cont">En este eje se abordarán innovaciones que están transformando la atención en salud</p>
                                                	<ul className="list-links">
                                                    	<li>Teleenfermería y seguimiento remoto.</li>
														<li>Uso de apps y dispositivos wearables para la vigilancia clínica.</li>
														<li>Historia clínica electrónica y análisis de datos para la toma de decisiones.</li>
														<li>Inteligencia artificial aplicada al triage y apoyo diagnóstico. </li>
													</ul>
                                                </li>
                                                <li><b>Transformación digital en la educación de Enfermería</b>
													<p class="text-cont">Orientado al impacto de la sociedad digital en la formación académica:</p>
                                                	<ul className="list-links">
                                                		<li>Simulación clínica de alta, media y baja fidelidad.</li>
														<li>Plataformas virtuales de aprendizaje y entornos híbridos.</li>
														<li>Metodologías activas mediadas por tecnología (Aula invertida, ABP digital, microlearning).</li>
														<li>Evaluación por competencias con apoyo de recursos digitales.</li>
													</ul>
                                                </li>
                                                <li><b>Innovación educativa en el ámbito de salud</b>
													<p class="text-cont">Enfocado en cómo la enfermería puede construir, sostener y aprovechar redes de conocimiento:</p>
                                                	<ul className="list-links">
                                                		<li>Comunidades académicas interinstitucionales.</li>
														<li>Publicación científica y ciencia abierta.</li>
														<li>Estrategias para fortalecer la investigación colaborativa</li>
														<li>Vinculación con la sociedad desde entornos digitales.</li>
													</ul>
                                                </li>
                                                
                                                <li><b>Fortalecimento de la gestión del cuidado</b>
													<p class="text-cont">Fortalecimento de la gestión del cuidado.</p>
                                                	<ul className="list-links">
                                                		<li>Sistemas de monitoreo electrónico y alarmas inteligentes.</li>
														<li>Protocolos digitales para prevención de eventos adversos.</li>
														<li>Modelos de gestión del cuidado basados en datos.</li>
														<li>Herramientas de apoyo para la humanización del cuidado en entornos digitales.</li>
													</ul>
                                                </li>
                                                <li><b>Casos clínicos con innovación en le cuidado enfermero</b></li>
                                                    
                                                    
                                                    
                                                    </ul>
                                                </>) :
                                                    (data.language === "en" ? (<>
                                                        <ul className="list-unord-step">
                                                            {/*<li>Integration of health care and preventive health.</li>
                                                            <li>Holistic mental health.</li>
                                                            <li>Technology and integrated health.</li>
                                                            <li>Holistic health in the workplace.</li>
                                                            <li>Integrated health research.</li>
                                                            <li>Technology and integrated health.</li>
                                                            <li>Integration of healthcare and preventive health.</li>
                                                            <li>Holistic mental health.</li>
                                                            <li>Research in integrated health.</li>
                                                            <li>Holistic health in the workplace.</li>*/}
                                                 		 <li><b>Emerging technologies applied to nursing care</b>
                                                
                                                    		<p class="text-cont">This section will address innovations that are transforming healthcare</p>
                                                			<ul className="list-links">
                                                    		    <li>Telecare and remote monitoring. </li>
                                                     		  	<li>Use of apps and wearable devices for clinical monitoring. </li>
																<li>Electronic health records and data analysis for decision-making.</li>
																<li>Artificial intelligence applied to triage and diagnostic support. </li>
															</ul>								
                                               			 </li>
                                                        
                                               			 <li><b>Digital transformation in nursing education</b>
                                                  		 	 <p class="text-cont">Focused on the impact of the digital society on academic training:</p>
                                                			<ul className="list-links">
                                                       		 <li>High, medium and low fidelity clinical simulation.</li>
                                                      		 <li>Virtual learning platforms and hybrid environments.</li>
															 <li>Active methodologies mediated by technology (flipped classroom, digital PBL, microlearning).</li>
															 <li>Competency-based assessment supported by digital resources.</li>
															</ul>
														</li>
                                                        
                                                        
                                                		<li><b>Educational innovation in the field of health</b>
																<p class="text-cont">Focused on how nursing can build, sustain and leverage knowledge networks:</p>
                                                   		 	<ul className="list-links">
                                                      	  		<li>Inter-institutional academic communities.</li>
																<li>Scientific publication and open science.</li>
                                                     	  		<li>Strategies to strengthen collaborative research</li>
                                                     	  	 	<li>Engagement with society through digital environments.</li>
                                                    		</ul>
                                               			</li>
                                                
                                                		<li><b>Strengthening care management</b>
                                                    			<p class="text-cont">This axis integrates digital transformation with clinical practice:</p>
                                                   			 <ul className="list-links">
                                                        		<li>Electronic monitoring systems and smart alarms.</li>
																<li>Digital protocols for preventing adverse events.</li>
                                                       			<li>Data-driven care management models.</li>
																<li>Support tools for the humanisation of care in digital environments.</li>
                                                    		</ul>
                                               			</li>
                                                		<li><b>Clinical cases with innovation in nursing care</b></li>
                                                    
                                                                                                                                                                       
                                                 </ul>
                                                    </>) : (<>
                                                        <ul className="list-unord-step">
                                                            {/*<li>Integração da assistência médica e da saúde preventiva.</li>
                                                            <li>Saúde mental holística.</li>
                                                            <li>Tecnologia e saúde integrada.</li>
                                                            <li>Saúde holística no local de trabalho.</li>
                                                            <li>Pesquisa integrada em saúde.</li>
                                                            <li>Tecnologia e saúde integral.</li>
                                                            <li>Integração da atenção à saúde e saúde preventiva.</li>
                                                            <li>Saúde mental holística.</li>
                                                            <li>Pesquisa em saúde integral.</li>
                                                            <li>Saúde holística no local de trabalho.</li>*/}
                                                        
                                                       <li><b>Tecnologias emergentes aplicadas aos cuidados de enfermagem</b>
                                                
                                                            <p class="text-cont">Nesta vertente, serão abordadas as inovações que estão a transformar os cuidados de saúde</p>
                                                				<ul className="list-links">
                                                                    <li>Telemedicina e acompanhamento remoto. </li>
                                                                    <li>Uso de aplicativos e dispositivos vestíveis para vigilância clínica. </li>
																	<li>Histórico clínico eletrônico e análise de dados para tomada de decisões.</li>
																	<li>Inteligência artificial aplicada à triagem e ao apoio diagnóstico. </li>
																</ul>
														</li>
                                                		<li><b>Transformação digital na educação em Enfermagem</b>
                                                                <p class="text-cont">Orientado para o impacto da sociedade digital na formação acadêmica:</p>
                                                			<ul className="list-links">
                                                                <li>Simulação clínica de alta, média e baixa fidelidade.</li>
                                                                <li>Plataformas virtuais de aprendizagem e ambientes híbridos.</li>
																<li>Metodologias ativas mediadas por tecnologia (sala de aula invertida, ABP digital, microaprendizagem).</li>
                                                                <li>Avaliação por competências com apoio de recursos digitais.</li>
                                                            </ul>
                                                        </li>
                                              		  <li><b>Inovação educacional no âmbito da saúde</b>
                                                                <p class="text-cont">Focado em como a enfermagem pode construir, sustentar e aproveitar redes de conhecimento:</p>
                                                			<ul className="list-links">
                                                                <li>Comunidades acadêmicas interinstitucionais.</li>
                                                                <li>Publicação científica e ciência aberta.</li>
																<li>Estratégias para fortalecer a pesquisa colaborativa</li>
                                                                <li>Vínculo com a sociedade a partir de ambientes digitais.</li>
                                                            </ul>
                                                      </li>
                                                
                                               		  <li><b>Fortalecimento da gestão de cuidados</b>
                                                    			<p class="text-cont">Este eixo integra a transformação digital com a prática clínica:</p>
                                                   			 <ul className="list-links">
                                                        		<li>Sistemas de monitoramento eletrônico e alarmes inteligentes.</li>
                                                                <li>Protocolos digitais para prevenção de eventos adversos.</li>
                                                                <li>Modelos de gestão de cuidados baseados em dados.</li>
                                                                <li>Ferramentas de apoio para a humanização dos cuidados em ambientes digitais.</li>
                                                    		</ul>
                                               			</li>
                                                		<li><b>Casos clínicos com inovação em cuidados de enfermagem</b></li>
                                                    
                                                        
                                                        </ul>
                                                    </>))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "en" ? "Scientific Committee" : "Comité Científico"}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                {/*<li>Lcda. Inés Bajaña Mendieta, MSc.</li>
                                                    <li>Dra. María Fernanda Coello Llerena, MSc</li>
                                                    <li>Lcda. Solange Acurio Barre, MSc</li>
                                                    <li>Lcda. Mariuxi Moreira Floes, MSc</li>
                                                    <li>Lcda. Mariela Bedoya Paucar, MSc</li>
                                                    <li>Lcda. Yulitza Villamar Torres, MSc</li>
                                                    <li>Dr. Eudes Martinez Porro, MSc.</li>
                                                    <li>Lcda. Bertha Vásquez Moran, MSc</li>
                                                    <li>Psicól. Shirley Betancuort Zambrano, MSc.</li>*/}
                                                
                                                <li>Dr. Cirilo Montufar Chavarría, M.Sc. </li>
												<li>Lic. Paola Benitez Navarrete, M.Sc. </li>
												<li>Lic. Adriana Coloma Llango, M.Sc. </li>
												<li>Lic. Yulitza Geomara Villamar Torres, M.Sc. </li>

                                                
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Conferencias Magistrales" : (data.language === "en" ? "Keynote Conferences" : "Conferências principais")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row">

                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcs-jorge-rodriguez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcdo. Jorge Rodríguez Díaz, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Presencial)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcdo. Jorge Rodríguez Díaz, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Uniandes</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Cuidar en tiempos de inteligencia artificial: significados y reflexiones éticas desde la docencia en enfermería" :
                                                            (data.language === "en" ? "Caring in the age of artificial intelligence: meanings and ethical reflections from nursing education" :
                                                                "Cuidar em tempos de inteligência artificial: significados e reflexões éticas a partir do ensino de enfermagem")}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcs-andrea-tufino.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Andrea Tufiño Aguilar" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Andrea Tufiño Aguilar</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Ambato</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Tecnologías móviles para corresponsabilidad del paciente en atención primaria" :
                                                            (data.language === "en" ? "Mobile technologies for patient co-responsibility in primary care" :
                                                                "Tecnologias móveis para a corresponsabilidade do paciente na atenção primária")}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcs-julian-manrique.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Julián Manrique Mclean, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Colombia (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Julián Manrique Mclean, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad del Sinú EBZ-Cartagena</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Administración de la universidad de Cartagena" :
                                                            (data.language === "en" ? "Administration of the University of Cartagena" :
                                                                "Administração da Universidade de Cartagena")}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcs-joshua-culcay.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Joshua Culcay Delgado" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Joshua Culcay Delgado</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad San Gregorio de Portoviejo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "La divulgación de resultados de investigación como motor del desarrollo sostenible" :
                                                            (data.language === "en" ? "The dissemination of research results as a driver of sustainable development" :
                                                                "A divulgação dos resultados da investigação como motor do desenvolvimento sustentável")}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcs-lusy-orella.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Lusy Orellana Navarrete, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Lusy Orellana Navarrete, PhD.</h5>
                                                    <div className="mb-1 text-titles-speaker">Centro Médico Axxis</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Aporte de la simulación como instrumento de enseñanza aprendizaje en los estudios de postgrado" :
                                                            (data.language === "en" ? "Contribution of simulation as a teaching and learning tool in postgraduate studies" :
                                                                "Contribuição da simulação como instrumento de ensino-aprendizagem em estudos de pós-graduação")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcs-yury-rosales.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcdo. Yury Rosales Ricardo, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Perú (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcdo. Yury Rosales Ricardo, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Tecnológica del Perú, Lima Centro-Perú</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Prevalencia de la obesidad en adultos atendidos en el Seguro de Salud del Perú" :
                                                            (data.language === "en" ? "Prevalence of obesity in adults covered by Peru's health insurance system" :
                                                            "Prevalência da obesidade em adultos atendidos pelo Seguro de Saúde do Peru")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                                                               
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcs-sandra-riofrio.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcda. Sandra Riofrío Terrazas, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcda. Sandra Riofrío Terrazas, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Federación ecuatoriana de enfermeras y enfermeros</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Intervención de enfermería con apoyo tecnológico en el autocuidado de las mujeres embarazadas en la Maternidad Isidro Ayora" :
                                                            (data.language === "en" ? "Technology-supported nursing intervention in self-care for pregnant women at the Isidro Ayora Maternity Hospital" :
                                                            "Intervenção de enfermagem com apoio tecnológico no autocuidado de mulheres grávidas na Maternidade Isidro Ayora")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                             
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcs-martha-parra.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcda. Martha Parra Aguirre, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcda. Martha Parra Aguirre, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Central del Ecuador</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Intervención de enfermería con apoyo tecnológico para el autocuidado en adolescentes embarazadas del Hospital Isidro Ayora. 2024-2026" :
                                                            (data.language === "en" ? "Technology-supported nursing intervention for self-care in pregnant adolescents at Isidro Ayora Hospital. 2024–2026" :
                                                            "Intervenção de enfermagem com apoio tecnológico para o autocuidado em adolescentes grávidas do Hospital Isidro Ayora. 2024-2026")}</p>
                                                    </div>
                                                </div>
                                      	  </div>
                                        
                                       
                                       	 <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcs-maria-lopez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcda. María López Izurieta, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcda. María López Izurieta, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Central del Ecuador</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Innovación en el cuidado de enfermería: apoyo tecnológico como complemento de las intervenciones educativas de enfermería para mejorar la función sexual, autoestima y calidad de vida en mujeres histerectomizadas." :
                                                            (data.language === "en" ? "Innovation in nursing care: technological support as a complement to nursing educational interventions to improve sexual function, self-esteem, and quality of life in women who have undergone hysterectomies." :
                                                                "Inovação nos cuidados de enfermagem: apoio tecnológico como complemento às intervenções educativas de enfermagem para melhorar a função sexual, a autoestima e a qualidade de vida em mulheres histerectomizadas.")}</p>
                                                    </div>
                                                </div>
                                       	 </div>
                                        
                                         
                                        <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcs-isis-alarcon.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Jose Luis Cobos Serrano" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Jose Luis Cobos Serrano</h5>
                                                        <div className="mb-1 text-titles-speaker">Consejo General de Enfermería</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Innovación Digital en el ámbito de la formación del profesional de enfermería" :
                                                            (data.language === "en" ? "Digital innovation in the field of nursing professional training" :
                                                                "Inovação digital no âmbito da formação profissional de enfermagem")}</p>
                                                    </div>
                                                </div>
                                         </div>
                                        
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Publicación de Trabajos" : (data.language === "en" ? "Publication of Papers" : "Publicação de artigos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row d-flex">
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-cuidarte-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Cuidarte Universidad Nacional Autónoma México 13" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Cuidarte Universidad Nacional Autónoma México</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una publicación de la comunidad académica de la Facultad de Estudios Superiores Iztacala de la Universidad Nacional Autónoma de México, que sirve para difundir los avances metodológicos, teóricos, de investigación empírica, técnicas, procedimientos y avances disciplinarios en general." :
                                                            (data.language === "en" ? "It is a publication of the academic community of the Facultad de Estudios Superiores Iztacala of the Universidad Nacional Autónoma de México, which serves to disseminate methodological, theoretical and empirical research advances, techniques, procedures and disciplinary advances in general." :
                                                                "É uma publicação da comunidade académica da Facultad de Estudios Superiores Iztacala da Universidad Nacional Autónoma de México, que serve para divulgar os avanços metodológicos, teóricos e empíricos da investigação, as técnicas, os procedimentos e os avanços disciplinares em geral.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-rebid-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Horizontes de Enfermería 14" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Horizontes de Enfermería - Universidad Politécnica Estatal de Carchi</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "La revista Horizontes de Enfermería es una revista académica, arbitrada e indexada, de publicación anual (Diciembre) y multidisciplinaria. Esta revista está administrada por la Universidad Politécnica Estatal del Carchi (UPEC)." :
                                                            (data.language === "en" ? "The journal Horizontes de Enfermería is an academic, refereed and indexed journal, published annually (December) and multidisciplinary. This journal is administered by the Universidad Politécnica Estatal del Carchi (UPEC)." :
                                                                "A revista Horizontes de Enfermería é uma revista académica, arbitrada e indexada, publicada anualmente (dezembro) e multidisciplinar. Esta revista é administrada pela Universidad Politécnica Estatal del Carchi (UPEC).")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-religation-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Religación 14" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Religación</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista científica electrónica multidisciplinar editada por el Centro de Investigaciones en Ciencias Sociales y Humanidades desde América Latina CICSHAL-RELIGACION." :
                                                            (data.language === "en" ? "Is a multidisciplinary electronic scientific journal edited by the Centro de Investigaciones en Ciencias Sociales y Humanidades desde América Latina CICSHAL-RELIGACION." :
                                                                "É uma revista científica eletrônica multidisciplinar editada pelo Centro de Investigaciones en Ciencias Sociales y Humanidades desde América Latina CICSHAL-RELIGACION.")}</p>
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
                    <Accordion.Header>{data.language === "es" ? "Ciencias de la Computación y Diseño Digital" : (data.language === "en" ? "Computer Science and Digital Design" : "Ciências da Computação e Design Digital")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 28 al 30 de enero 2026" : (data.language === "en" ? "From 28 to 30 January 2026" : "De 28 a 30 de janeiro de 2026")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/87042804707" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Ingreso a las Conferencias" : (data.language === "en" ? "Admission to the Conferences" : "Entrada nas conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen">
                                            <div className="card-body">
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-ccdd-uteq-cidu-2026.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                    <div className="row">
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                            <i className="fa fa-file-pdf-o fa-2x icon-data-gen" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                            <h2 className="msg-pnl-search-2 text-rigth">{data.language === "es" ? "Programación de Ponencias" : (data.language === "en" ? "Programme of lectures" : "Programa de conferências")}</h2>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="card pnl-information-symp">
                                        <div className="card-header pnl-hdr-symp">
                                            {data.language === "en" ? "Contacts" : "Contactos"}
                                        </div>
                                        <div className="card-body pnl-bdy-symp">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 mb-2">
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinador:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Ing. Cristian Zambrano Vega, PhD.</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> czambrano@uteq.edu.ec</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="card pnl-information-symp">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "en" ? "Objective" : "Objetivo"}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Impulsar la generación y el intercambio de conocimiento en las Ciencias de la Computación y Diseño Digital, resaltando cómo las tecnologías digitales y la inteligencia artificial transforman la investigación, el desarrollo de software y la creación de soluciones innovadoras para una sociedad cada vez más conectada. " :
                                            (data.language === "en" ? "Promote the generation and exchange of knowledge in Computer Science and Digital Design, highlighting how digital technologies and artificial intelligence transform research, software development, and the creation of innovative solutions for an increasingly connected society." :
                                                "Impulsionar a geração e o intercâmbio de conhecimento nas Ciências da Computação e Design Digital, destacando como as tecnologias digitais e a inteligência artificial transformam a pesquisa, o desenvolvimento de software e a criação de soluções inovadoras para uma sociedade cada vez mais conectada.")}</p></div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Líneas de Investigación / Ejes Temáticos" : (data.language === "en" ? "Lines of Research / Thematic Axis" : "Linhas de investigação / Eixos temáticos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="paragraph-cont">
                                            {data.language === "es" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Aplicaciones de ingeniería de software. </li>
                                                    <li>Innovación en sistemas telemáticos y electrónicos. </li>
                                                    <li>Robótica e IA. </li>
                                                    <li>Computación en la nube. </li>
                                                    <li>Soft computing. </li>
                                                    <li>Big data. </li>
                                                    <li>Visión artificial. </li>
                                                    <li>Inteligencia artificial generativa. </li>
                                                    <li>Inteligencia artificial segura y confiable. </li>
                                                    <li>Seguridad de la información. </li>
                                                    <li>Interacción humano – computador</li>
                                                    <li>Computación ubicua. </li>

                                                </ul>
                                            </>) : (data.language === "en" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Software engineering applications. </li>
                                                    <li>Innovation in telematic and electronic systems. </li>
                                                    <li>Robotics and AI. </li>
                                                    <li>Cloud computing. </li>
                                                    <li>Soft computing. </li>
                                                    <li>Big data. </li>
                                                    <li>Computer vision. </li>
                                                    <li>Generative artificial intelligence. </li>
                                                    <li>Secure and reliable artificial intelligence. </li>
                                                    <li>Information security. </li>
                                                    <li>Human-computer interaction. </li>
                                                    <li>Ubiquitous computing. </li>
                                                </ul>
                                            </>) : (<>
                                                <ul className="list-unord-step">
                                                    <li>Aplicações de engenharia de software. </li>
                                                    <li>Inovação em sistemas telemáticos e eletrônicos. </li>
                                                    <li>Robótica e IA. </li>
                                                    <li>Computação em nuvem. </li>
                                                    <li>Computação suave. </li>
                                                    <li>Big data. </li>
                                                    <li>Visão artificial. </li>
                                                    <li>Inteligência artificial generativa. </li>
                                                    <li>Inteligência artificial segura e confiável. </li>
                                                    <li>Segurança da informação. </li>
                                                    <li>Interação humano-computador. </li>
                                                    <li>Computação ubíqua. </li>
                                                </ul>
                                            </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "es" ? "Comité Científico" : (data.language === "en" ? "Scientific Committee" : "Comité Científico")}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Ing. Jéssica Ponce Ordoñez, M.Sc. </li>
                                                    <li>Ing. Emilio Zhuma Mera, M.Sc. </li>
                                                    <li>Ing. Iván Jaramillo Chuqui, PhD.</li>
                                                    <li>Ing. Orlando Erazo Moreta, PhD. </li>
                                                    <li>Ing. Nancy Rodríguez Gavilanes, PhD.</li>
                                                    <li>Ing. Lucrecia Llerena Guevara, PhD.</li>
                                                    <li>Ing. Jorge Guanín Fajardo, PhD.</li>
                                                    <li>Ing. Diego Intriago Rodríguez, M.Sc. </li>
                                                    <li>Ing. Ariosto Vicuña Pino, M.Sc. </li>
                                                    <li>Ing. Gleiston Guerrero Ulloa, M.Sc. </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Conferencias Magistrales" : (data.language === "en" ? "Keynote Conferences" : "Conferências principais")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row">
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-antonio-nebro.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Antonio J. Nebro Urbaneja, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Antonio J. Nebro Urbaneja, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Málaga</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Frameworks de optimización multiobjetivo" :
                                                            (data.language === "en" ? "Multi-Objective Optimisation Frameworks" :
                                                                "Frameworks de otimização multiobjetiva")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-pedro-diaz.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Pedro Díaz" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Presencial)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Pedro Díaz</h5>
                                                        <div className="mb-1 text-titles-speaker">Google Developers Group</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Plataformas y herramientas de Google para el desarrollo de aplicaciones de IA en la academia y la industria" :
                                                            (data.language === "en" ? "Google platforms and tools for developing AI applications in academia and industry" :
                                                                "Plataformas e ferramentas do Google para o desenvolvimento de aplicativos de IA na academia e na indústria")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-fernanda-jurado.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Fernanda Jurada Mantilla" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Fernanda Jurada Mantilla</h5>
                                                        <div className="mb-1 text-titles-speaker">Banco Guayaquil</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Aplicación de la IA generativa en los negocios" :
                                                            (data.language === "en" ? "Application of Generative AI in Business" :
                                                                "Aplicação da IA Generativa nos Negócios")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-angel-fernandez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Ángel Patricio Fernández Soria, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Ángel Fernández Soria, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Tecnológica Israel</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Sistema automático de ovoscopia con inteligencia artificial basado en redes neuronales." :
                                                            (data.language === "en" ? "Automatic egg candling system with artificial intelligence based on neural networks." :
                                                                "Sistema automático de ovoscopia com inteligência artificial baseado em redes neuronais.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-raul-hernandez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Raúl Hernández Palacios, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Raúl Hernández Palacios, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Autónoma del Estado de Hidalgo </div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Importancia de la transformación digital en los negocios." :
                                                            (data.language === "en" ? "The importance of digital transformation in business" :
                                                                "Importância da transformação digital nos negócios")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-anthony-cabrera.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Anthony Cabrera Córdova" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                    <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Anthony Cabrera Córdova</h5>
                                                        <div className="mb-1 text-titles-speaker">ALIANDO</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Arquitecturas DevOps y Cloud Computing para sistemas escalables y seguros" :
                                                            (data.language === "en" ? "DevOps and Cloud Computing Architectures for scalable and secure systems" :
                                                                "Arquiteturas DevOps e computação em nuvem para sistemas escaláveis e seguros")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-daniel-gustavo.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Daniel Gustavo Córdova Jaramillo" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                    <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Daniel Córdova Jaramillo</h5>
                                                        <div className="mb-1 text-titles-speaker">Meniuz</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Desarrollo de una aplicación móvil en Flutter para el registro de negocios gastronómicos en la startup Meniuz" :
                                                            (data.language === "en" ? "Development of a mobile application in Flutter for registering food businesses in the startup Meniuz" :
                                                                "Desenvolvimento de uma aplicação móvel em Flutter para o registro de negócios gastronômicos na startup Meniuz")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-luz-quijano.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Luz Angela Quijano Vidal, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                    <strong className="d-inline-block mb-2 text-country-speaker">Colombia (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Luz Quijano Vidal, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Internacional de la Rioja</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Tecnologías emergentes como catalizadores de competencias digitales y habilidades STEM" :
                                                            (data.language === "en" ? "Emerging technologies as catalysts for digital competences and STEM skills" :
                                                                "Tecnologias emergentes como catalisadores de competências digitais e habilidades STEM")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                       		<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-luz-cierra.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Luz Marina Sierra Martínez, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Colombia (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Luz Sierra Martínez, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad del Cauca</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Guide for prioritization of project management processes (PMBoK) in vertical construction projects" :
                                                            (data.language === "en" ? "Guide for prioritization of project management processes (PMBoK) in vertical construction projects" :
                                                                "Guia para priorização dos processos de gerenciamento de projetos (PMBOK) em projetos de construção vertical")}</p>
                                                   		</div>
                                                    </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-margarita-yepez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Margarita Yépez Villareal, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Margarita Yépez Villareal, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Fundación Datalat</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Retos de la transformación digital en épocas de IA" :
                                                            (data.language === "en" ? "Challenges of digital transformation in the age of AI" :
                                                                "Desafios da transformação digital em tempos de IA")}</p>
                                                   		</div>
                                                    </div>
                                           	</div>
                                       		 <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fcc-susana-cadena.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Susana Cadena-Vela, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Susana Cadena-Vela, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Fundación Datalat</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Retos de la transformación digital en épocas de IA" :
                                                            (data.language === "en" ? "Challenges of digital transformation in the age of AI" :
                                                                "Desafios da transformação digital em tempos de IA")}</p>
                                                   		</div>
                                                    </div>
                                           	</div>
                                        
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="card pnl-information-symp mt-2">
                                    <div className="card-header pnl-hdr-symp">
                                        {data.language === "es" ? "Publicación de Trabajos" : (data.language === "en" ? "Publication of Papers" : "Publicação de artigos")}
                                    </div>
                                    <div className="card-body pnl-bdy-symp">
                                        <div className="row d-flex">
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-ingenio.webp" className="mx-auto border" width="160" height="220" alt="Revista InGenio Journal 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista InGenio Journal</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista científica dedicada a la publicación semestral de artículos de resultados de investigaciones originales en español e inglés. Cubre una variedad de temas relacionados con varias áreas de conocimiento de Ciencias de la Ingeniería" :
                                                            (data.language === "en" ? "It is a scientific journal dedicated to the biannual publication of articles on original research findings in Spanish and English. It covers a variety of topics related to various areas of engineering science." :
                                                                "É uma revista científica dedicada à publicação semestral de artigos com resultados de pesquisas originais em espanhol e inglês. Abrange uma variedade de temas relacionados a várias áreas do conhecimento das Ciências da Engenharia.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-algorithms.webp" className="mx-auto border" width="160" height="220" alt="Algorithms 2" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Algorithms</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista de acceso abierto sobre informática, matemáticas computacionales, inteligencia artificial, sistemas de automatización y control, teoría, métodos y aplicaciones interdisciplinarias, sistemas de datos e información, e ingeniería de software." :
                                                            (data.language === "en" ? "It is an open-access journal on computer science, computational mathematics, artificial intelligence, automation and control systems, interdisciplinary theory, methods and applications, data and information systems, and software engineering." :
                                                                "É uma revista de acesso aberto sobre informática, matemática computacional, inteligência artificial, sistemas de automação e controle, teoria, métodos e aplicações interdisciplinares, sistemas de dados e informação e engenharia de software.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        {/* <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-technologies.webp" className="mx-auto border" width="160" height="220" alt="Technologies 3" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Technologies</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista de acceso abierto y arbitrada que ofrece un foro avanzado para los estudios tecnológicos más recientes, tanto para investigadores como para profesionales de diversas disciplinas afines." :
                                                            (data.language === "en" ? "It is an open-access, peer-reviewed journal that provides an advanced forum for the latest technological studies, both for researchers and professionals from various related disciplines." :
                                                                "É uma revista de acesso aberto e arbitrada que oferece um fórum avançado para os estudos tecnológicos mais recentes, tanto para pesquisadores quanto para profissionais de diversas disciplinas afins.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        */}
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            
            
            
            </Accordion>
        </div>
    );

    /*function compareDateEvent(dateBegin, dateEnd, dateNow) {
        var response = false;

        response = new Date(dateBegin).getTime() <= dateNow.getTime() && new Date(dateEnd).getTime() >= dateNow.getTime();

        return response;
    }*/

    function compareDateEvent(dateBegin, dateEnd, dateNow) {
        const dateBeginTime = new Date(dateBegin).getTime();
        const dateEndTime = new Date(dateEnd).getTime();
        const dateNowTime = dateNow.getTime();

        if (dateNowTime < dateBeginTime) {
            return "dateBeginIsPast";
        } else if (dateNowTime >= dateBeginTime && dateNowTime <= dateEndTime) {
            return "dateIsInRange";
        } else {
            return "dateEndIsPast";
        }
    }

    const renderTextInfo = (dataInfoEvt) => {
        const fechaActual = new Date();
        const fechaInicio = new Date("2025-11-17");
        const fechaFin = new Date("2026-01-28");

        return (<>
            <div className="row">
                {/*
                    (dataInfoEvt.data8.pwNombre !== null && dataInfoEvt.data8.pwNombre !== '') && (<><h2 className="title-cont-page text-center mt-2">{dataInfoEvt.data8.pwNombre.trim()}</h2></>)
                */}
                <h2 className="title-cont-page text-center mt-2">{dataInfoEvt.language === "es" ? dataInfoEvt.data8.pwNombre.trim() : (dataInfoEvt.language === "en" ? dataInfoEvt.data8.pwNombreEn.trim() : dataInfoEvt.data8.pwNombrePt.trim())}</h2>
                <div className="col-md-12">
                    <Tabs defaultActiveKey={11} id="tab-info">

                        <Tab eventKey={0} title={dataInfoEvt.language === "es" ? "Acerca del Congreso" : (dataInfoEvt.language === "en" ? "About the Congress" : "Sobre o Congresso")}>
                            <h2 className="msg-pnl-search text-rigth">{dataInfoEvt.language === "es" ? "Mensaje de la Dra. Yenny Torres Navarrete - RECTORA" : (dataInfoEvt.language === "en" ? "Message from Dr. Yenny Torres Navarrete – RECTOR" : "Mensagem da Dra. Yenny Torres Navarrete – REITORA")}</h2>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card-tp-img mb-3">
                                        <Image src={PHOTOS_FOLDER + "img-aut-5999016.jpg"} className="card-img-top" alt="Fotografía de la Rectora" width={640} height={430} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="paragraph-cont">
                                        {/*<p className="text-cont-cidu">
                                            {dataInfoEvt.language === "es" ? "Es grato para nuestra Alma Máter invitar a la  comunidad científica, académica, profesional, empresarial y estudiantil a participar en el V Congreso Internacional de Desarrollo Universitario CIDU-2023. En la edición del año 2022, bajo la modalidad híbrida alcanzó una gran acogida tanto a nivel nacional e internacional. Con un total de 11435 participantes, distribuidos en los Simposios de Ciencias Agrarias y forestales, Ciencias Pecuarias y Biológicas, Ciencias de la Ingeniería, Ciencias de la Industria y Producción, Ciencias Empresariales, Ciencias Sociales, Económicas y Financieras, Ciencias de la Educación y Ciencias de la Salud." : (dataInfoEvt.language === "en" ?
                                                "It is a pleasure for our Alma Mater to invite the scientific, academic, professional, business and student community to participate in the V International Congress on University Development CIDU-2023. In the 2022 edition, under the hybrid modality, it reached a great reception both nationally and internationally. With a total of 11435 participants, distributed in the Symposia of Agricultural and Forestry Sciences, Livestock and Biological Sciences, Engineering Sciences, Industry and Production Sciences, Business Sciences, Social, Economic and Financial Sciences, Education Sciences and Health Sciences." :
                                                "É um prazer para nossa Alma Mater convidar a comunidade científica, acadêmica, profissional, empresarial e estudantil a participar do V Congresso Internacional de Desenvolvimento Universitário CIDU-2023. Na edição de 2022, sob a modalidade híbrida, alcançou uma grande recepção nacional e internacional. Com um total de 11435 participantes, distribuídos nos Simpósios de Ciências Agrárias e Florestais, Pecuária e Ciências Biológicas, Ciências da Engenharia, Indústria e Ciências da Produção, Ciências Empresariais, Ciências Sociais, Econômicas e Financeiras, Ciências da Educação e Ciências da Saúde.")}</p>
                                        {dataInfoEvt.language === "es" ? (<><p className="text-cont-cidu">Durante el evento se presentaron 46 conferencistas magistrales, incluidos  científicos de 15 países y 362 ponencias que constan en el libro de memorias del evento con ISBN. Además, 160 artículos publicados en revistas Indexadas, SCOPUS, WOS y JCR. El proximo congreso internacional CIDU -2023 en su quinta edición, contará con la participación de expertos nacionales e internacionales mediante la presentación de conferencias magistrales, ponencias y presentación de posters sobre los avances científicos multidisciplinarios, en ocho áreas del conocimiento en la modalidad presencial y virtual. Los esperamos el próximo 6, 7 y 8 de diciembre del 2023, en este evento científico  que  brindará la oportunidad de forjar vínculos, establecer redes y publicar artículos en revistas de impacto regional y mundial.</p></>) :
                                            (dataInfoEvt.language === "en" ? (<><p className="text-cont-cidu">During the event, 46 keynote speakers, including scientists from 15 countries, and 362 papers were presented and published in the proceedings book with ISBN. In addition, 160 papers were published in indexed journals, SCOPUS, WOC and JCR. The next International Congress CIDU -2023 in its fifth edition will feature the participation of national and international experts through the presentation of keynote lectures, papers and poster presentations on multidisciplinary scientific advances in eight areas of knowledge in face-to-face and virtual mode. We look forward to welcoming you on the 6th, 7th and 8th of December 2023 to this scientific event that will provide the opportunity to forge links, build networks and publish articles in journals with regional and global impact.</p></>) :
                                                (<><p className="text-cont-cidu">Durante o evento, 46 palestrantes principais, incluindo cientistas de 15 países, e 362 trabalhos foram apresentados e publicados no livro de anais com ISBN. Além disso, 160 artigos foram publicados em periódicos indexados, SCOPUS, WOC e JCR. O próximo congresso internacional CIDU -2023, em sua quinta edição, contará com a participação de especialistas nacionais e internacionais por meio da apresentação de palestras, trabalhos e pôsteres sobre os avanços científicos multidisciplinares em oito áreas do conhecimento de forma presencial e virtual. Esperamos vê-lo nos dias 6, 7 e 8 de dezembro de 2023, nesse evento científico que proporcionará a oportunidade de criar vínculos, estabelecer redes e publicar artigos em revistas de impacto regional e global.</p></>))} */}

                                        <p className="text-cont-cidu">
                                            {dataInfoEvt.language === "es"
                                                ? "La Universidad Técnica Estatal de Quevedo, se complace en invitar a la comunidad científica, académica, profesional, empresarial y estudiantil a participar en el VII Congreso Internacional de Desarrollo Universitario CIDU-2026, bajo el lema “Tejiendo redes de conocimiento en una sociedad digital”. En la edición del año 2025 bajo la modalidad híbrida se registró una destacada participación con 12762 participantes, tres conferencias magistrales presenciales, 50 conferencias magistrales virtuales y 659 ponencias de resultados de investigación. El evento bajo la modalidad híbrida permitió articular modalidades de sustentación y debates científicos con participantes de 67 países que constan en el libro de memorias del evento con ISBN y DOI, y más de 150 artículos publicados en revistas de impacto regional y mundial"
                                                : dataInfoEvt.language === "en"
                                                    ? "The Technical State University of Quevedo is pleased to invite the scientific, academic, professional, business, and student communities to participate in the 7th International Congress on University Development CIDU-2026, under the theme “Weaving networks of knowledge in a digital society”. In the 2025 edition, held in hybrid modality, an outstanding participation was recorded, with 12,762 attendees, three in-person keynote lectures, 50 virtual keynote lectures, and 659 research presentations. The hybrid format made it possible to integrate different modes of presentation and scientific debate, with participants from 67 countries, whose contributions are included in the event’s proceedings book with ISBN and DOI, as well as more than 150 articles published in journals of regional and global impact."
                                                    : "A Universidade Técnica Estadual de Quevedo tem o prazer de convidar a comunidade científica, acadêmica, profissional, empresarial e estudantil para participar do VII Congresso Internacional de Desenvolvimento Universitário CIDU-2026, sob o lema “Tecendo redes de conhecimento em uma sociedade digital”. Na edição de 2025, realizada na modalidade híbrida, registrou-se uma participação destacada, com 12.762 participantes, três conferências presenciais, 50 conferências magnas virtuais e 659 apresentações de resultados de pesquisa. A modalidade híbrida permitiu articular diferentes formas de apresentação e debates científicos com participantes de 67 países, cujas contribuições constam no livro de memórias do evento, com ISBN e DOI, além de mais de 150 artigos publicados em revistas de impacto regional e mundial."
                                            }
                                        </p>

                                        {dataInfoEvt.language === "es" ? (
                                            <p className="text-cont-cidu">
                                                La séptima edición del CIDU se desarrollará del 28 al 30 de enero de 2026 de manera gratuita y los participantes recibirán certificados digitales de participación o ponencia, conforme su nivel de inscripción. Este congreso, organizado por la Dirección de Investigación y el colectivo de facultades de nuestra universidad, busca también crear espacios para la cooperación interinstitucional a través de redes, convenios, cartas de entendimiento o publicaciones científicas. A lo largo del evento, se compartirán resultados de investigaciones desde una perspectiva multidisciplinaria considerando que las plataformas digitales han democratizado el acceso a la información y han generado nuevos métodos de aprendizaje y colaboración. Además, se abordarán aspectos relacionados con dilemas éticos de la digitalización como la privacidad de los datos, la desinformación masiva, la brecha digital y la seguridad cibernética.
                                            </p>
                                        ) : dataInfoEvt.language === "en" ? (
                                            <p className="text-cont-cidu">
                                                The seventh edition of CIDU will be held from 28 to 30 January 2026, free of charge, and participants will receive digital certificates of attendance or presentation, depending on their registration level. This congress, organised by the Directorate of Research together with the faculties of our university, also aims to create spaces for inter-institutional cooperation through networks, agreements, memoranda of understanding, and scientific publications. Throughout the event, research findings will be shared from a multidisciplinary perspective, considering that digital platforms have democratised access to information and generated new methods of learning and collaboration. In addition, topics related to ethical dilemmas of digitalisation will be addressed, such as data privacy, massive disinformation, the digital divide, and cybersecurity.
                                            </p>
                                        ) : (
                                            <p className="text-cont-cidu">
                                                A sétima edição do CIDU será realizada de 28 a 30 de janeiro de 2026, de forma gratuita, e os participantes receberão certificados digitais de participação ou apresentação, conforme seu nível de inscrição. Este congresso, organizado pela Direção de Pesquisa e pelo conjunto de faculdades da nossa universidade, também busca criar espaços de cooperação interinstitucional por meio de redes, convênios, cartas de entendimento ou publicações científicas. Ao longo do evento, serão compartilhados resultados de pesquisas a partir de uma perspectiva multidisciplinar, considerando que as plataformas digitais democratizaram o acesso à informação e geraram novos métodos de aprendizagem e colaboração. Além disso, serão abordados aspectos relacionados aos dilemas éticos da digitalização, como a privacidade de dados, a desinformação em massa, a desigualdade digital e a segurança cibernética.
                                            </p>
                                        )}

                                        {dataInfoEvt.language === "es" ? (
                                            <p className="text-cont-cidu">
                                                ¡Los esperamos para juntos construir conocimiento responsable en una sociedad digital!
                                            </p>
                                        ) : dataInfoEvt.language === "en" ? (
                                            <p className="text-cont-cidu">
                                                We look forward to welcoming you as we build responsible knowledge together in a digital society!
                                            </p>
                                        ) : (
                                            <p className="text-cont-cidu">
                                                Esperamos por vocês para juntos construirmos conhecimento responsável em uma sociedade digital!
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 mb-2 mx-auto">
                                    <div className="card panel-metcs-bx">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                                    <Image className="img-fluid img-metcs-bx" src={`/assets/img/metric-participants.png`} alt={dataInfoEvt.language === "es" ? "Métrica Participantes" : (dataInfoEvt.language === "en" ? "Metrics Participants" : "Métricas Participantes")} width={70} height={70} />
                                                </div>
                                                <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                                    <h3 className="number-metcs-bx">{dataInfoEvt.numPartcs}</h3>
                                                    <div className="sect-title-metcs">
                                                        <h4 className="title-metcs-bx">{dataInfoEvt.language === "en" ? "Participants" : "Participantes"}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 mb-2 mx-auto">
                                    <div className="card panel-metcs-bx">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                                    <Image className="img-fluid img-metcs-bx" src={`/assets/img/metric-people.png`} alt={dataInfoEvt.language === "es" ? "Métrica Ponencias" : (dataInfoEvt.language === "en" ? "Metrics Presentations" : "Apresentações")} width={70} height={70} />
                                                </div>
                                                <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                                    <h3 className="number-metcs-bx">766</h3>
                                                    <div className="sect-title-metcs">
                                                        <h4 className="title-metcs-bx">{dataInfoEvt.language === "es" ? "Ponencias" : (dataInfoEvt.language === "en" ? "Presentations" : "Apresentações")}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 mb-2 mx-auto">
                                    <div className="card panel-metcs-bx">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                                    <Image className="img-fluid img-metcs-bx" src={`/assets/img/metric-conferences.png`} alt={dataInfoEvt.language === "es" ? "Métrica Conferencias magistrales" : (dataInfoEvt.language === "en" ? "Metrics Keynote lectures" : "Palestras sobre métricas")} width={70} height={70} />
                                                </div>
                                                <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                                    <h3 className="number-metcs-bx">79</h3>
                                                    <div className="sect-title-metcs">
                                                        <h4 className="title-metcs-bx">{dataInfoEvt.language === "es" ? "Conferencias magistrales" : (dataInfoEvt.language === "en" ? "Keynote lectures" : "Conferências principais")}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Tab>
                    
                    {<Tab eventKey={12} title={dataInfoEvt.language === "es" ? "Promoción" : (dataInfoEvt.language === "en" ? "Promotion" : "Promoção")}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="ratio ratio-16x9 panel-vd">
                                        <video
                                            className="bg-video"
                                            autoPlay
                                            /*loop*/
                                            controls>
                                            <source src={VIDEOS_FOLDER + "cidu-2026.mp4"} type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </Tab>}
                    
                        <Tab eventKey={8} title={dataInfoEvt.language === "es" ? "Inscripción" : (dataInfoEvt.language === "en" ? "Registration" : "Inscrição")}>
                            {(dataInfoEvt.congress !== null && dataInfoEvt.congress !== "") ? (
                                (() => {
                                    const comparisonResult = compareDateEvent("2025-11-17T01:00:00", "2026-01-28T23:59:00", fechaActual);

                                    if (comparisonResult === "dateBeginIsPast") {
                                        return (
                                            <div className="ratio ratio-21x9">
                                                <img src={`/assets/img/${dataInfoEvt.language === "es" ? "proximamente-inscp-es.webp" : (dataInfoEvt.language === "en" ? "proximamente-inscp-en.webp" : "proximamente-inscp-pt.webp")}`} alt={dataInfoEvt.language === "es" ? "Anuncio previo de Inscripción al Evento" : (dataInfoEvt.language === "en" ? "Pre-announcement of Event Registration" : "Pré-anúncio do registro do evento")} />
                                            </div>
                                        );
                                    } else if (comparisonResult === "dateEndIsPast") {
                                        return (
                                            <div className="ratio ratio-21x9">
                                                <img src={`/assets/img/${dataInfoEvt.language === "es" ? "evento-cerrado-es.webp" : (dataInfoEvt.language === "en" ? "evento-cerrado-en.webp" : "evento-cerrado-pt.webp")}`} alt={dataInfoEvt.language === "es" ? "Inscripción al Evento" : (dataInfoEvt.language === "en" ? "Event Registration" : "Registro do evento")} />
                                            </div>
                                        );
                                    } else if (comparisonResult === "dateIsInRange") {
                                        return FormInscEvt(data.countries, data.symps, data.language);
                                    } else {
                                        return "";
                                    }
                                })()
                            ) : ""}
                        </Tab>
                        {/*{(dataInfoEvt.congress !== null && dataInfoEvt.congress !== "") ? (
                            (() => {
                                const comparisonResult = compareDateEvent(dataInfoEvt.congress.cgFechaIncAsist, dataInfoEvt.congress.cgFechaFinAsist, fechaActual);

                                if (comparisonResult === "dateIsInRange") {
                                    return (<><Tab eventKey={11} title={dataInfoEvt.language === "es" ? "Registro de asistencia" : (dataInfoEvt.language === "en" ? "Attendance register" : "Registro de presença")}>
                                        {FormRegAsistEv(data.symps, data.language, data.linkSymps)}
                                    </Tab></>);
                                } else {
                                    return "";
                                }
                            })()
                        ) : ""}
                        {(dataInfoEvt.congress !== null && dataInfoEvt.congress !== "") ? (
                            dataInfoEvt.congress.cgFecha === fechaActual ? (
                                <Tab eventKey={10} title={dataInfoEvt.language === "es" ? "Ingreso al evento" : (dataInfoEvt.language === "en" ? "Entry to the event" : "Entrada para o evento")}>
                                    <a href="https://cidu.uteq.edu.ec/" target="_blank" aria-label="link login" data-toggle="tooltip" data-placement="bottom" title={dataInfoEvt.language === "es" ? "Ir a la página web de ingreso al Evento" : (dataInfoEvt.language === "en" ? "Go to the event entry website" : "Acesse o site de inscrição do evento")}>
                                        <div className="ratio ratio-21x9">
                                            <img src={`/assets/img/${dataInfoEvt.language === "es" ? "ingreso-evento-cidu-es.webp" : (dataInfoEvt.language === "en" ? "ingreso-evento-cidu-en.webp" : "ingreso-evento-cidu-pt.webp")}`} alt={dataInfoEvt.language === "es" ? "Imagen tipo enlace para el ingreso al Evento" : (dataInfoEvt.language === "en" ? "Image link to enter the event" : "Link da imagem para entrar no evento")} />
                                        </div>
                                    </a>
                                </Tab>
                            ) : "") : ""}*/}
                        
                    	{/*<Tab eventKey={11} title={dataInfoEvt.language === "es" ? "Registro de asistencia" : (dataInfoEvt.language === "en" ? "Attendance register" : "Registro de presença")}>
                            {FormRegAsistEv(data.symps, data.language, data.linkSymps)}
                    
                    	</Tab>*/}
                    
                        {/*<Tab eventKey={10} title={dataInfoEvt.language === "es" ? "Ingreso al evento" : (dataInfoEvt.language === "en" ? "Entry to the event" : "Entrada para o evento")}>
                                    <a href="https://cidu.uteq.edu.ec/" target="_blank" aria-label="link login" data-toggle="tooltip" data-placement="bottom" title={dataInfoEvt.language === "es" ? "Ir a la página web de ingreso al Evento" : (dataInfoEvt.language === "en" ? "Go to the event entry website" : "Acesse o site de inscrição do evento")}>
                                        <div className="ratio ratio-21x9">
                                            <img src={`/assets/img/${dataInfoEvt.language === "es" ? "ingreso-evento-cidu-es.webp" : (dataInfoEvt.language === "en" ? "ingreso-evento-cidu-en.webp" : "ingreso-evento-cidu-pt.webp")}`} alt={dataInfoEvt.language === "es" ? "Imagen tipo enlace para el ingreso al Evento" : (dataInfoEvt.language === "en" ? "Image link to enter the event" : "Link da imagem para entrar no evento")} />
                                        </div>
                                    </a>
                        </Tab>*/}
                        <Tab eventKey={1} title={dataInfoEvt.language === "es" ? "Simposios" : (dataInfoEvt.language === "en" ? "Symposium" : "Simpósios")}>
                            {panelSymposiums}
                        </Tab>
                        {/*<Tab eventKey={9} title={dataInfoEvt.language === "es" ? "Posters virtuales" : (dataInfoEvt.language === "en" ? "Virtual posters" : "Cartazes virtuais")}>
                        	<div className="row">
                                <div className="col-md-12 w-100">
                                    {(data.posters !== null && data.posters !== "") ? SliderImg(data.posters, 92, 2000, 1000) : (<>
                                        <div className="ratio ratio-21x9">
                                            <Image src="/assets/img/proximamente-publicacion-posters-cidu-2023-uteq.webp" alt={dataInfoEvt.language === "es" ? "Imagen de Posters" : (dataInfoEvt.language === "en" ? "Poster Image" : "Imagem do cartaz")} layout='fill' />
                                        </div>
                                    </>)}
                                </div>
                            </div>
                        </Tab>*/}
                        <Tab eventKey={3} title={dataInfoEvt.language === "es" ? "Fechas importantes" : (dataInfoEvt.language === "en" ? "Important dates" : "Datas importantes")}>
                            {panelBoxDates}
                        </Tab>
                        <Tab eventKey={4} title={dataInfoEvt.language === "es" ? "Cómite" : (dataInfoEvt.language === "en" ? "Committee" : "Comité")}>
                            {getListCommittees(dataInfoEvt.committees)}
                        </Tab>
                        <Tab eventKey={5} title={dataInfoEvt.language === "es" ? "Documentos" : (dataInfoEvt.language === "en" ? "Documents" : "Documentos")}>
                            <div className="col-md-12 w-100">{(data.slider2 !== null && data.slider2 !== "") && SliderImg(data.slider2, 90, 2500, 1000)}</div>
                        </Tab>
                        <Tab eventKey={6} title={dataInfoEvt.language === "es" ? "Ediciones anteriores" : (dataInfoEvt.language === "en" ? "Previous editions" : "Edições anteriores")}>
                            {panelEvents}
                        </Tab>
                        <Tab eventKey={7} title={dataInfoEvt.language === "es" ? "Memorias" : (dataInfoEvt.language === "en" ? "Scientific Reports" : "Relatórios científicos")}>
                            <div className="row">
                                <div className="col-md-12 w-100">
                                    {(data.datamem !== null && data.datamem !== "") && SliderImg(data.datamem, 91, 2000, 1000)}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>);
    }

    return (<>
        <SSRProvider>{renderTextInfo(data)}</SSRProvider>
    </>);

}

