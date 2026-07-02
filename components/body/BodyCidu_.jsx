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
                                                <a href="https://cedia.zoom.us/j/82958107058" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scaf-uteq-cidu-2024.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                                {data.language === "en" ? "Organising Committee" : "Comité Organizador"}
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
                                                        <Image src="/assets/images/research/events/cidu/img-ing-ignacio-antonio-sotomayor-herrera-msc.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Xavier Mejía Ramos, PhD" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Presencial)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Ignacio Antonio Sotomayor Herrera, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Consultor independiente</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Moko (Ralstonia solanacearum) del banano: Estrategias de prevención y manejo integrado de la enfermedad" :
                                                            (data.language === "en" ? "Moko (Ralstonia solanacearum) of banana: Strategies for prevention and integrated disease management" :
                                                                "Moko (Ralstonia solanacearum) da banana: estratégias de prevenção e manejo integrado da doença")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/img-dr-patricio-alejandro-sandana-gomez-phd.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Christian Velasco, PhD" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Chile (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Patricio Alejandro Sandaña Gómez</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Austral de Chile</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Factores a considerar para incrementar la eficiencia de uso de nutrientes en los cultivos" :
                                                            (data.language === "en" ? "Factors to consider for increasing nutrient use efficiency in crops" :
                                                                "Fatores a serem considerados para aumentar a eficiência do uso de nutrientes nas culturas")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/img-dr-santiago-cristobal-vasquez-matute.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Jorge Alberto Reyes, PhD" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Santiago Cristóbal Vásquez Matute</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de Loja</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Respuesta agro-fisiológica de la quinua frente al estrés por anegamiento" :
                                                            (data.language === "en" ? "Agro-physiological response of quinoa to water stress" :
                                                                "Resposta agrofisiológica da quinoa ao estresse hídrico")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/img-dr-alfredo-jimenez-gonzalez.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Jorge Alberto Reyes, PhD" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Cuba (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Alfredo Jiménez González</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Estatal del Sur de Manabí</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Aprovechamiento de productos forestales no maderables en Manabí, Ecuador" :
                                                                (data.language === "en" ? "Non-timber forest products harvesting in Manabí, Ecuador" :
                                                                    "Colheita de produtos florestais não madeireiros em Manabí, Equador")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/img-dr-danilo-vera-coello.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Danilo Vera Coello" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Danilo Vera Coello</h5>
                                                        <div className="mb-1 text-titles-speaker">INIAP</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Impliccaiones del hongo Fusarium oxysporum f. sp. cubense, raza 4 para la industroa bananera ecuatoriana" :
                                                                (data.language === "en" ? "Implications of the fungus Fusarium oxysporum f. sp. cubense, race 4, for the Ecuadorian banana industry" :
                                                                    "Implicações do fungo Fusarium oxysporum f. sp. cubense, raça 4, para a indústria bananeira equatoriana")}</p>
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
                                                        <Image src="/assets/images/research/events/cidu/revista-bionatura.webp" className="mx-auto border" width="160" height="220" alt="Revista Ibero American Journal of Biotechnology and Life Sciences (BIONATURA) 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Ibero American Journal of Biotechnology and Life Sciences (BIONATURA)</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Bionatura se dedica a la publicación de manuscritos sobre temas relacionados con todos los aspectos de la biotecnología y las ciencias de la vida." :
                                                            (data.language === "en" ? "Bionatura is dedicated to publishing manuscripts on topics concerning all aspects of biotechnology and life sciences." :
                                                                "A Bionatura se dedica à publicação de manuscritos sobre tópicos relacionados a todos os aspectos da biotecnologia e das ciências da vida.")}</p>
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
                                                        <Image src="/assets/images/research/events/cidu/revista-plants-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Plants Science 3" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Plants Science</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Plants es una revista internacional, científica, revisada por pares, de acceso abierto y publicada quincenalmente en línea por MDPI." :
                                                            (data.language === "en" ? "Plants is an international, scientific, peer-reviewed, open access journal published semimonthly online by MDPI." :
                                                                "Plants é uma revista internacional, científica, revisada por pares e de acesso aberto, publicada semestralmente on-line pela MDPI.")}</p>
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
                    <Accordion.Header>{data.language === "es" ? "Ciencias Pecuarias y Biológicas" : (data.language === "en" ? "Livestock and Biological Sciences" : "Pecuária e Ciências Biológicas")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 28 al 30 de enero 2026" : (data.language === "en" ? "From 28 to 30 January 2026" : "De 28 a 30 de janeiro de 2026")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/86254929712" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scpb-uteq-cidu-2024.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Reunir a expertos, investigadores, profesionales y estudiantes del ámbito de las Ciencias Pecuarias y Biológicas para socializar los avances científicos más recientes, fortalecer las redes de investigación y la colaboración académica en Acuicultura, Agropecuaria, Biología y Zootecnia, y generar propuestas innovadoras orientadas a la sostenibilidad y a la solución de los desafíos actuales y futuros del sector agroalimentario, promoviendo a la vez el crecimiento académico y profesional de las nuevas generaciones de investigadores." :
                                            (data.language === "en" ? "Bring together experts, researchers, professionals and students in the field of Animal and Biological Sciences to share the latest scientific advances, strengthen research networks and academic collaboration in Aquaculture, Agriculture, Biology and Animal Husbandry, and generate innovative proposals aimed at sustainability and solving current and future challenges in the agri-food sector, while promoting the academic and professional growth of new generations of researchers." :
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
                                                {data.language === "en" ? "Organising Committee" : "Comité Organizador"}
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
                                                        <Image src="/assets/images/research/events/cidu/joao-paulo-rodriguez-da-cunha-scpb-cidu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Edilmar Cortes Jacinto, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Brasil (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">João Paulo Rodriguez Da Cunha</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidade Federal de Uberlândia</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Tecnología de Aplicación de Agroquímicos" :
                                                            (data.language === "en" ? "Agrochemical Application Technology" :
                                                                "Tecnologia de aplicação de agroquímicos")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-genaro-diarte-plata-scpb-cidu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Genaro Diarte-Plata" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Genaro Diarte-Plata</h5>
                                                        <div className="mb-1 text-titles-speaker">Institución IPN CIIDIR Sinaloa</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Acuacultura de las jaibas Callinectes spp. en el Pacífico mexicano: estado del arte" :
                                                            (data.language === "en" ? "Aquaculture of Callinectes spp. crabs in the Mexican Pacific: state of the art" :
                                                                "Acuicultura de caranguejos Callinectes spp. no Pacífico mexicano: estado da arte.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-fabio-marcelo-montossi-porchile-scpb-cidu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Fabio Marcelo Montossi Porchile" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Uruguay (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Fabio Marcelo Montossi Porchile</h5>
                                                        <div className="mb-1 text-titles-speaker">Instituto Nacional de Investigación Agropecuaria</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Ganadería, Ciencia y Sostenibilidad: Resolviendo los dilemas que se presentan en el consumo de carne" :
                                                            (data.language === "en" ? "Livestock, Science and Sustainability: Addressing the dilemmas surrounding meat consumption" :
                                                                "Pecuária, Ciência e Sustentabilidade: Resolvendo os dilemas relacionados ao consumo de carne.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-israel-benitez-garcia-scpb-cidu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Israel Benítez García" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Mexico (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Israel Benítez García</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Politécnica de Sinaloa (UPSIN)</div>
                                                        {/*<p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Residuos plaguicidas en productos hortofrutícolas: riesgos y desafíos" :
                                                            (data.language === "en" ? "Pesticide residues in horticultural products: risks and challenges" :
                                                                "Resíduos de pesticidas em produtos hortofrutícolas: riscos e desafios")}</p>*/}
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-narciso-aguilera-marin-scpb-cidu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Narciso Aguilera Marín" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Chile (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Narciso Aguilera Marín</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de la Concepción</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Residuos plaguicidas en productos hortofrutícolas: riesgos y desafíos" :
                                                            (data.language === "en" ? "Pesticide residues in horticultural products: risks and challenges" :
                                                                "Resíduos de pesticidas em produtos hortofrutícolas: riscos e desafios")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        
                                        {/*<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-edilmar-cortes-jacinto-scpb-cidu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Edilmar Cortes Jacinto, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Edilmar Cortes Jacinto, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">CIBNOR</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Retos y logros en la investigación científica de especies acuícolas nativas: el langostino de río, Macrobrachium americanum" :
                                                            (data.language === "en" ? "Challenges and achievements in scientific research on native aquaculture species: the river prawn, Macrobrachium americanum" :
                                                            "Desafios e conquistas na pesquisa científica de espécies nativas de aquicultura: o camarão do rio, Macrobrachium americanum")}</p>
                                                    </div>
                                                </div>
                                            </div>
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
                                                        <Image src="/assets/images/research/events/cidu/revista-bionatura.webp" className="mx-auto border" width="160" height="220" alt="Revista Ibero American Journal of Biotechnology and Life Sciences (BIONATURA) 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Ibero American Journal of Biotechnology and Life Sciences (BIONATURA)</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Bionatura se dedica a la publicación de manuscritos sobre temas relacionados con todos los aspectos de la biotecnología y las ciencias de la vida." :
                                                            (data.language === "en" ? "Bionatura is dedicated to publishing manuscripts on topics concerning all aspects of biotechnology and life sciences." :
                                                                "A Bionatura se dedica à publicação de manuscritos sobre tópicos relacionados a todos os aspectos da biotecnologia e das ciências da vida.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-dateh.webp" className="mx-auto border" width="160" height="220" alt="Revista DATEH 2" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista DATEH</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "DATEH es una revista multidisciplinaria que constituye un medio de comunicación y socialización de los procesos científicos, tecnológicos y de emprendimiento de los investigadores, docentes y estudiantes universitarios con miras hacia la sociedad." :
                                                            (data.language === "en" ? "DATEH is a multidisciplinary journal that constitutes a means of communication and socialisation of the scientific, technological and entrepreneurial processes of researchers, teachers and university students with a view to society." :
                                                                "A DATEH é uma revista multidisciplinar que constitui um meio de comunicação e socialização dos processos científicos, tecnológicos e empresariais de pesquisadores, professores e estudantes universitários com vistas à sociedade.")}</p>
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
                                                <a href="https://cedia.zoom.us/j/86210376463" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-fci-uteq-cidu-2024.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                                {data.language === "es" ? "Comité Técnico Científico" : (data.language === "en" ? "Scientific Technical Committee" : "Comitê Técnico Científico")}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Arq. Eugenia Moreira Macias, M.Sc. </li>
													<li>Arq. Silvia Palacios Giler, M.Sc. </li>
													<li>Ing. Norma Guerrero Chuez, M.Sc. </li>
													<li>Ing. Óscar Prieto Benavides, PhD. </li>
													<li>Ing. Cristhian Laverde Albarracin, PhD. </li>
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
                                                        <Image src="/assets/images/research/events/cidu/ing-alvaro-fuentes-phd-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Álvaro Fuentes PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Corea del Sur (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Álvaro Fuentes PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Core Research Institute of Intelligent Robots</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Frontiers of AI and its Applications in Smart Agriculture" :
                                                            (data.language === "en" ? "Frontiers of AI and its Applications in Smart Agriculture" :
                                                                "Frontiers of AI and its Applications in Smart Agriculture")}</p>
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
                                                        <Image src="/assets/images/research/events/cidu/ing-raul-hernandez-palacios-phd-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Raúl Hernández Palacios, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Raúl Hernández Palacios, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Autónoma del Estado de Hidalgo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Procesamiento y almacenamiento de imágenes médicas sobre aplicaciones móviles" :
                                                            (data.language === "en" ? "Medical image processing and storage on mobile applications" :
                                                                "Processamento e armazenamento de imagens médicas em aplicativos móveis")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-sebastian-vicente-jimbo-ludena-msc-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Sebastián Vicente Jimbo Ludeña, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Sebastián Vicente Jimbo Ludeña, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">RWDI Consulting Engineers and Scientists</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Principios y Aplicaciones de los túneles de viento en el diseño de vehículos de carga pesada y edificaciones" :
                                                            (data.language === "en" ? "Principles and Applications of Wind Tunnels in the Design of Heavy Duty Vehicles and Buildings" :
                                                                "Princípios e aplicações de túneis de vento no projeto de veículos pesados e edifícios")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/arq-marlown-edward-cuenca-gonzaga-phd-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Arq. Marlown Edward Cuenca Gonzaga, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Arq. Marlown Edward Cuenca Gonzaga, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Central del Ecuador</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Infraestructuras verde azul, caso Quito" :
                                                            (data.language === "en" ? "Blue green infrastructure, Quito case" :
                                                                "Infraestrutura verde azul, caso de Quito")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-karen-monserrat-bermudez-moreira-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Karen Monserrat Bermudez Moreira" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Karen Monserrat Bermudez Moreira</h5>
                                                        <div className="mb-1 text-titles-speaker">AB InBev</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Análisis de Sentimientos en redes Sociales" :
                                                            (data.language === "en" ? "Sentiment Analysis in Social Networks" :
                                                                "Análise de sentimento em redes sociais")}</p>
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
                                                        <div className="mb-1 text-titles-speaker">Training & Inspection Occidental</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Ensayos no destructivos en juntas precalificadas y su incidencia en la calidad de los procesos" :
                                                            (data.language === "en" ? "Non-destructive testing of pre-qualified joints and its impact on process quality" :
                                                                "Testes não destrutivos de juntas pré-qualificadas e seu impacto na qualidade do processo")}</p>
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
                                                        <Image src="/assets/images/research/events/cidu/ing-doris-karina-chicaiza-a-msc-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Doris Karina Chicaiza A, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Doris Karina Chicaiza A, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de las Fuerzas Armadas ESPE</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Desarrollo de aplicaciones móviles con Flutter" :
                                                            (data.language === "en" ? "Mobile application development with Flutter" :
                                                                "Desenvolvimento de aplicativos móveis com o Flutter")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-karen-lilibet-reyes-pacheco-msc-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Karen Lilibet Reyes Pacheco, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Karen Lilibet Reyes Pacheco, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Purdue University</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Importancia de los convertidores eléctricos para el uso de energías renovables" :
                                                            (data.language === "en" ? "Importance of electrical converters for the use of renewable energies" :
                                                                "Importância dos conversores elétricos para o uso de energias renováveis")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-ernesto-pimentel-fci-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Ernesto Pimentel" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Ernesto Pimentel</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Málaga</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Iniciativa Quant·UMA" :
                                                            (data.language === "en" ? "Quant·UMA Initiative" :
                                                                "Iniciativa Quant·UMA")}</p>
                                                    </div>
                                                </div>
                                            </div>
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
                                                        <Image src="/assets/images/research/events/cidu/revista-investigacion-operacional.webp" className="mx-auto border" width="160" height="220" alt="Revista Investigación Operacional 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Investigación Operacional</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Fundada en 1966, está dirigida a la comunidad académica y científica nacional e internacional dedicada al desarrollo teórico y a las aplicaciones de los modelos y métodos utilizados en la Investigación Operativa." :
                                                            (data.language === "en" ? "Founded in 1966, it is aimed at the national and international academic and scientific community dedicated to the theoretical development and applications of the models and methods used in Operational Research." :
                                                                "Fundada em 1966, destina-se à comunidade acadêmica e científica nacional e internacional dedicada ao desenvolvimento teórico e às aplicações dos modelos e métodos utilizados na Pesquisa Operacional.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-ingenio-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Científica y Tecnológica InGenio 6" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Científica y Tecnológica "InGenio"</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista científica dedicada a la publicación semestral de artículos de resultados de investigaciones originales en español e inglés. Cubre una variedad de temas relacionados con varias áreas de conocimiento de Ciencias de la Ingeniería." :
                                                            (data.language === "en" ? "It is a scientific journal dedicated to the biannual publication of articles of original research results in Spanish and English. It covers a variety of topics related to several areas of knowledge in Engineering Sciences." :
                                                                "É uma revista científica dedicada à publicação semestral de artigos de resultados originais de investigação em espanhol e inglês. Abrange uma variedade de tópicos relacionados com diversas áreas do conhecimento em Ciências da Engenharia.")}</p>
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
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 22 al 24 de enero 2025" : (data.language === "en" ? "From 22 to 24 January 2025" : "De 22 a 24 de janeiro de 2025")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                                <a href="https://cedia.zoom.us/j/81244149273" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scip-uteq-cidu-2024.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinador:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Soc. Jonathan Alexis Tapia Chamba, M.Sc.</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> jtapiac3@uteq.edu.ec</h4>
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
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Promover el intercambio de conocimiento y experiencias innovadoras en producción, investigación y desarrollo industrial, con énfasis en la incorporación de tecnologías emergentes como la Inteligencia Artificial en las áreas de Ingeniería y Producción." :
                                            (data.language === "en" ? "Promote the exchange of knowledge and innovative experiences in production, research, and industrial development, with an emphasis on the integration of emerging technologies such as Artificial Intelligence in the fields of Engineering and Production." :
                                                "Promover o intercâmbio de conhecimento e experiências inovadoras em produção, pesquisa e desenvolvimento industrial, com ênfase na incorporação de tecnologias emergentes como a Inteligência Artificial nas áreas de Engenharia e Produção.")}</p></div>
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
                                                    <li>Desarrollo de tecnología para la transformación de materia prima agroindustrial.</li>
                                                    <li>IA en la optimización de procesos de producción alimentaria.</li>
                                                    <li>Soluciones de IA para la gestión de la Seguridad Industrial.</li>
                                                    <li>Automatización y control inteligente en agroindustrias.</li>
                                                    <li>Aprovechamiento de residuos agroindustriales.</li>
                                                    <li>Gestión avanzada de operaciones.</li>
                                                    <li>Logística 4.0 y análisis de datos con IA.</li>
                                                    <li>Soluciones de IA para la optimización de procesos industriales.</li>
                                                    <li>Producción sostenible y resiliencia climática.</li>
                                                    <li>Agricultura de precisión y análisis de cultivos.</li>
                                                    <li>Seguridad Alimentaria.</li>
                                                </ul>
                                            </>) : (data.language === "en" ? (<>
                                                <ul className="list-unord-step">
                                                    <li>Development of technology for the transformation of agro-industrial raw materials.</li>
                                                        <li>AI in the optimisation of food production processes.</li>
                                                        <li>AI solutions for Industrial Safety management.</li>
                                                        <li>Automation and intelligent control in agro-industries.</li>
                                                        <li>Exploitation of agro-industrial waste.</li>
                                                        <li>Advanced operations management.</li>
                                                        <li>Logistics 4.0 and data analytics with AI.</li>
                                                        <li>AI solutions for the optimisation of industrial processes.</li>
                                                        <li>Sustainable production and climate resilience.</li>
                                                        <li>Precision agriculture and crop analysis.</li>
                                                        <li>Food Security.</li>
                                                </ul>
                                            </>) : (<>
                                                <ul className="list-unord-step">
                                                    <li>Desenvolvimento de tecnologia para a transformação de matéria-prima agroindustrial.</li>
                                                    <li>IA na otimização de processos de produção alimentícia.</li>
                                                    <li>Soluções de IA para a gestão de Segurança Industrial.</li>
                                                    <li>Automatização e controle inteligente em agroindústrias.</li>
                                                    <li>Aproveitamento de resíduos agroindustriais.</li>
                                                    <li>Gestão avançada de operações.</li>
                                                    <li>Logística 4.0 e análise de dados com IA.</li>
                                                    <li>Soluções de IA para a otimização de processos industriais.</li>
                                                    <li>Produção sustentável e resiliência climática.</li>
                                                    <li>Agricultura de precisão e análise de culturas.</li>
                                                    <li>Segurança Alimentar.</li>
                                                </ul>
                                            </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "en" ? "Organising Committee" : "Comité Organizador"}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Ing. Sonia Barzola Miranda, PhD.</li>
                                                    <li>Soc. Jonathan Tapia Chamba, M.Sc.</li>
                                                    <li>Ing. Andry Álvarez Aspiazu, M.Sc.</li>
                                                    <li>Ing. Milton Villafuerte López, M.Sc.</li>
                                                    <li>Lcdo. Loguard Rojas Uribe, M.Sc.</li>
                                                    <li>Ing. Leonardo Baque Mite, M.Sc.</li>
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
                                                        <Image src="/assets/images/research/events/cidu/robinson-jasmany-herrera-feijoo-fcip-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Robinson Jasmany Herrera Feijoo" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Robinson Jasmany Herrera Feijoo</h5>
                                                        <div className="mb-1 text-titles-speaker">UTEQ - FCPB</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Aplicación de nuevas tecnologías de inteligencia artificial apegadas al uso de nuevas metodologías de investigación de las ciencias agroalimentarias" :
                                                                (data.language === "en" ? "Application of new artificial intelligence technologies linked to the use of new research methodologies in agri-food sciences" :
                                                                    "Aplicação de novas tecnologias de inteligência artificial ligadas ao uso de novas metodologias de pesquisa em ciências agroalimentares")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/cristhian-arturo-arias-ulloa-fcip-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Cristian Arturo Arias Ulloa" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Presencial)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Cristian Arturo Arias Ulloa</h5>
                                                        <div className="mb-1 text-titles-speaker">Gerente General de Performance & Solutions</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "La IA en la Industria 4.0: Transformando los Modelos de Negocios y Producción" :
                                                                (data.language === "en" ? "AI in Industry 4.0: Transforming Business and Production Models" :
                                                                    "IA na Indústria 4.0: transformando modelos de negócios e produção")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/jorge-delgado-noboa-fcip-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Jorge Delgado Noboa" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Jorge Delgado Noboa</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Cuenca</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Producción de bioetanol carburante a partir del residuo mucilaginoso de cacao CCN-51 y su simulación en Aspen Plus®" :
                                                                (data.language === "en" ? "Production of fuel bioethanol from cocoa mucilaginous residue CCN-51 and its simulation in Aspen Plus®" :
                                                                    "Produção de bioetanol combustível a partir do resíduo mucilaginoso de cacau CCN-51 e sua simulação no Aspen Plus®")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/felipe-grijalba-fcip-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Felipe Grijalba" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Felipe Leonel Grijalba Arévalo</h5>
                                                        <div className="mb-1 text-titles-speaker">Director de Maestría en IA - USFQ</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Deep Learning: A gentle Introduction" :
                                                                (data.language === "en" ? "Deep Learning: A gentle Introduction" :
                                                                    "Deep Learning: A gentle Introduction")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/francisco-serrano-fcip-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Francisco Serrano" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Francisco Serrano Sánchez</h5>
                                                        <div className="mb-1 text-titles-speaker">Azurian Consulting</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "La gestión del cambio en proyecto de transformación digital" :
                                                                (data.language === "en" ? "Change management in digital transformation projects" :
                                                                    "Gerenciamento de mudanças em projetos de transformação digital")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/andres-aguaguina-crillo-fcip-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Andrés Aguaguina Crillo" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Carlos Andrés Aguaguiña Criollo</h5>
                                                        <div className="mb-1 text-titles-speaker">CELEC-EP</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Nuevas tecnologías y software aplicados a la Seguridad y Salud Ocupacional" :
                                                                (data.language === "en" ? "New technologies and software applied to Occupational Health and Safety" :
                                                                    "Novas tecnologias e softwares aplicados à Saúde e Segurança Ocupacional")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/enrique-jose-salazar-llorente-fcip-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Enrique José Salazar Llorente" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Enrique José Salazar Llorente</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Técnica de Babahoyo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Evaluación de la concentración mínima de inhibición de polifenoles combinados con Saccharomyces cerevisiae como antimicrobiano para crecimiento de Listeria monocytogenes" :
                                                                (data.language === "en" ? "Evaluation of the minimum inhibitory concentration of polyphenols combined with Saccharomyces cerevisiae as an antimicrobial for growth of Listeria monocytogenes" :
                                                                    "Avaliação da concentração inibitória mínima de polifenóis combinados com Saccharomyces cerevisiae como um antimicrobiano para o crescimento de Listeria monocytogenes")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/jose-manuel-moreno-rojas-fcip-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - José Manuel Moreno Rojas" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">José Manuel Moreno Rojas</h5>
                                                        <div className="mb-1 text-titles-speaker">Instituto Andaluz de Investigación y Formación Agraria, Pesquera, Alimentaria y de la Producción Ecológica (IFAPA) Alameda del Obispo-Cordoba</div>
                                                        <p className="card-text mb-auto text-subject-speaker">
                                                            {data.language === "es" ? "Líneas de trabajo en el área de Agroindustria y Calidad Alimentaria de IFAPA" :
                                                                (data.language === "en" ? "Lines of work in IFAPA Agroindustry and Food Quality Area" :
                                                                    "Linhas de trabalho na Área de Agroindústria e Qualidade de Alimentos do IFAPA")}</p>
                                                    </div>
                                                </div>
                                            </div>
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
                                                        <Image src="/assets/images/research/events/cidu/revista-ideas-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Innovation & Development in Engineering and Applied Science 7" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Innovation & Development in Engineering and Applied Science</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista científica dedicada a la publicación semestral de artículos de resultados de investigaciones originales en español e inglés. Cubre una variedad de temas relacionados con varias áreas de conocimiento de Ciencias de la Ingeniería." :
                                                            (data.language === "en" ? "It is a scientific journal dedicated to the biannual publication of articles of original research results in Spanish and English. It covers a variety of topics related to several areas of knowledge in Engineering Sciences." :
                                                                "É uma revista científica dedicada à publicação semestral de artigos de resultados originais de investigação em espanhol e inglês. Abrange uma variedade de tópicos relacionados com diversas áreas do conhecimento em Ciências da Engenharia.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-ingenio-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Científica y Tecnológica InGenio 7" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Científica y Tecnológica "InGenio"</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una revista científica dedicada a la publicación semestral de artículos de resultados de investigaciones originales en español e inglés. Cubre una variedad de temas relacionados con varias áreas de conocimiento de Ciencias de la Ingeniería." :
                                                            (data.language === "en" ? "It is a scientific journal dedicated to the biannual publication of articles of original research results in Spanish and English. It covers a variety of topics related to several areas of knowledge in Engineering Sciences." :
                                                                "É uma revista científica dedicada à publicação semestral de artigos de resultados originais de investigação em espanhol e inglês. Abrange uma variedade de tópicos relacionados com diversas áreas do conhecimento em Ciências da Engenharia.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        {/*<div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-bionatura.webp" className="mx-auto border" width="160" height="220" alt="Revista Ibero American Journal of Biotechnology and Life Sciences (BIONATURA) 1" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Ibero American Journal of Biotechnology and Life Sciences (BIONATURA)</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Bionatura se dedica a la publicación de manuscritos sobre temas relacionados con todos los aspectos de la biotecnología y las ciencias de la vida." :
                                                            (data.language === "en" ? "Bionatura is dedicated to publishing manuscripts on topics concerning all aspects of biotechnology and life sciences." :
                                                                "A Bionatura se dedica à publicação de manuscritos sobre tópicos relacionados a todos os aspectos da biotecnologia e das ciências da vida.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-terra.webp" className="mx-auto border" width="160" height="220" alt="Revista Terra Latinoamericana 7" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Terra Latinoamericana</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "El objetivo principal es publicar artículos científicos originales realizados por especialistas de la comunidad de las Ciencias del Suelo y del Agua de todo el mundo." :
                                                            (data.language === "en" ? "The main objective is to publish original scientific articles conducted by specialists in the Soil and Water Science community around the world." :
                                                                "O principal objetivo é publicar artigos científicos originais conduzidos por especialistas da comunidade de Ciência do Solo e da Água em todo o mundo.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
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
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 22 al 24 de enero 2025" : (data.language === "en" ? "From 22 to 24 January 2025" : "De 22 a 24 de janeiro de 2025")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                            <a href="https://cedia.zoom.us/j/83988492854" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Compartir conocimientos de las nuevas tendencias empresariales basadas en el desarrollo de los cambios tecnológicos para impulsar el nuevo entorno económico creciente a partir del impulso de la inteligencia artificial en los negocios." :
                                            (data.language === "en" ? "Sharing knowledge of new business trends based on the development of technological changes to drive the new growing economic environment from the impulse of artificial intelligence in business." :
                                                "Compartilhar o conhecimento de novas tendências de negócios com base no desenvolvimento de mudanças tecnológicas para impulsionar o novo ambiente econômico em crescimento a partir do impulso da inteligência artificial nos negócios.")}</p></div>
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
                                                    <li>Modalidades y optimización de la fuerza laboral y aumento de la automatización.</li>
                                                    <li>Adopción de la inteligencia artificial para apoyar los cambios en la dinámica del lugar de trabajo.</li>
                                                    <li>Modalidades laborales en las condiciones empresariales actuales.</li>
                                                    <li>Los millennials en roles de liderazgo empresarial.</li>
                                                    <li>Actualización tecnológica e inteligencia de negocios en el mundo de las empresas.</li>
                                                    <li>Marketing convencional y de experiencia de contenido.</li>
                                                    <li>Transformación digital continua y comercio electrónico.</li>
                                                    <li>El Marketing de influencias en las nuevas tendencias de las redes sociales.</li>
                                                    <li>Métodos de automatización por medio de inteligencia artificial.</li>
                                                    <li>Data Security, Big Data, Data Analytics and financial forecasts.</li>
                                                    <li>Software de contabilidad basado en la nube.</li>
                                                    <li>Innovación e inteligencia artificial en los procesos contables y auditoría.</li>
                                                </ul>
                                            </>) :
                                                (data.language === "en" ? (<>
                                                    <ul className="list-unord-step">
                                                        <li>Modalities and optimisation of the workforce and increased automation.</li>
                                                        <li>Adoption of artificial intelligence to support changes in workplace dynamics.</li>
                                                        <li>Workplace modalities in the current business environment.</li>
                                                        <li>Millennials in business leadership roles.</li>
                                                        <li>Technological updates and business intelligence in the corporate world.</li>
                                                        <li>Conventional marketing and content experience marketing.</li>
                                                        <li>Continuous digital transformation and e-commerce.</li>
                                                        <li>Influencer marketing in new social media trends.</li>
                                                        <li>Automation methods using artificial intelligence.</li>
                                                        <li>Data security, big data, data analytics, and financial forecasts.</li>
                                                        <li>Cloud-based accounting software.</li>
                                                        <li>Innovation and artificial intelligence in accounting processes and auditing.</li>
                                                    </ul>
                                                </>) :
                                                    (<>
                                                        <ul className="list-unord-step">
                                                            <li>Modalidades e optimização da força de trabalho e aumento da automação.</li>
                                                            <li>Adoção de inteligência artificial para apoiar mudanças na dinâmica do local de trabalho.</li>
                                                            <li>Modalidades de trabalho nas condições empresariais atuais.</li>
                                                            <li>Os millennials em cargos de liderança empresarial.</li>
                                                            <li>Atualizações tecnológicas e inteligência de negócios no mundo corporativo.</li>
                                                            <li>Marketing convencional e marketing de experiência de conteúdo.</li>
                                                            <li>Transformação digital contínua e comércio eletrônico.</li>
                                                            <li>Marketing de influenciadores nas novas tendências das redes sociais.</li>
                                                            <li>Métodos de automação por meio de inteligência artificial.</li>
                                                            <li>Segurança de dados, big data, análise de dados e previsões financeiras.</li>
                                                            <li>Software de contabilidade baseado na nuvem.</li>
                                                            <li>Inovação e inteligência artificial nos processos contábeis e auditoria.</li>
                                                        </ul>
                                                    </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "es" ? "Comité Organizador" : (data.language === "en" ? "Organising Committee" : "Comité Organizador")}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Ing. Harold Escobar Terán, M.Sc.</li>
                                                    <li>Ing. Mariana Reyes Bermeo, M.Sc.</li>
                                                    <li>Ing. Jefferson Bravo Salvatierra, M.Sc.</li>
                                                    <li>CPA. Martha Sandoval Cuji, M.Sc.</li>
                                                    <li>Ing. Janet Franco Cedeño, M.Sc.</li>
                                                    <li>Ing. Dominga Rodríguez Ángulo, M.Sc.</li>
                                                    <li>Ing. Freddy Triana Litardo, M.Sc.</li>
                                                    <li>Ing. Ronald Camacho Reyes, M.Sc.</li>
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
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de San Agustín de Arequipa (Perú</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Proyectos financiados con impacto en I+D+i para América Latina y el Caribe" :
                                                            (data.language === "en" ? "Funded projects with an impact on R&D&I for Latin America and the Caribbean" : "Projetos financiados com impacto em P&D+i para a América Latina e o Caribe")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-pablo-vidal.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Teresa Jesús Rios Delgado" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Pablo Vidal Fernández, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">CEO de la firma consultora PVM/ docente Universidad Laica Eloy Alfaro de Manabí</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Creando marcas con inteligencia artificial" :
                                                            (data.language === "en" ? "Creating brands with artificial intelligence" : "Criando marcas com inteligência artificial")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-estela-sabando.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Estela Sabando Mendoza, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Estela Sabando Mendoza, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Laica Eloy Alfaro de Manabí/div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Neuromarketing y comportamiento del consumidor" :
                                                            (data.language === "en" ? "Neuromarketing and consumer behavior" : "Neuromarketing e comportamento do consumidor")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/fce-vasilica-margalina.webp" className="mx-auto border" width="140" height="160" alt="Ponente -Ing. Vasilica María Margalina, PhD." />
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
                                                        <Image src="/assets/images/research/events/cidu/ing-sonia-romina-niezwida-cidu-fce-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Sonia Romina Niezwida" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Argentina (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Sonia Romina Niezwida</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de Misiones</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Administración y Estructuras Organizacionales: Organigramas como Herramienta Estratégica" :
                                                            (data.language === "en" ? "Management and Organisational Structures: Organisational Charts as Strategic Tools" : "Gerenciamento e estruturas organizacionais: organogramas como ferramentas estratégicas")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-nora-adriana-garcia-barbaro-cidu-fce-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Nora Adriana García Bárbaro" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Argentina (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Nora Adriana García Bárbaro</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de Misiones</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Administración y Estructuras Organizacionales: Organigramas como Herramienta Estratégica" :
                                                            (data.language === "en" ? "Management and Organisational Structures: Organisational Charts as Strategic Tools" : "Gerenciamento e estruturas organizacionais: organogramas como ferramentas estratégicas")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/eco-adelaida-escobar-teran-cidu-fce-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Eco. Adelaida Escobar Terán" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Estados Unidos (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Eco. Adelaida Escobar Terán</h5>
                                                        <div className="mb-1 text-titles-speaker">Baruch College</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "La inclusión financiera como pilar para el progreso y la equidad económica" :
                                                            (data.language === "en" ? "Financial inclusion as a pillar for economic progress and equity" : "Inclusão financeira como um pilar para o progresso econômico e a equidade")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dra-maria-jose-gomez-aguilella-cidu-fce-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. María José Gómez Aguilella" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. María José Gómez Aguilella</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Internacional de Valencia</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Creación de publicidad en redes sociales a partir de tendencias detectadas en eventos internacionales" :
                                                            (data.language === "en" ? "Creation of social media advertising based on trends detected at international events" : "Criação de publicidade em mídias sociais com base em tendências detectadas em eventos internacionais")}</p>
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
                                                        <Image src="/assets/images/research/events/cidu/revista-codigo-cientf-cidu.webp" className="mx-auto border" width="160" height="220" alt="Código Científico 8" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Código Científico</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Esta adscrita al Instituto Superior Tecnológico Los Andes de Santo Domingo - Ecuador, creada con el objetivo de fomentar la divulgación científica interna y externa cumpliendo estrictas normas nacionales e internacionales exigidas por la comunidad científica." :
                                                            (data.language === "en" ? "It is attached to the Instituto Superior Tecnológico Los Andes de Santo Domingo - Ecuador, created with the aim of promoting internal and external scientific dissemination in compliance with strict national and international standards required by the scientific community." :
                                                                "Está vinculado ao Instituto Superior Tecnológico Los Andes de Santo Domingo - Equador, criado com o objetivo de promover a divulgação científica interna e externa em conformidade com os rigorosos padrões nacionais e internacionais exigidos pela comunidade científica.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-enlace-univ-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Enlace Universitario 9" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Enlace Universitario</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es un órgano de divulgación del conocimiento científico y tecnológico, bajo la responsabilidad del Departamento de Investigación de la Universidad Estatal de Bolívar (UEB). Tiene como objetivo la difusión del conocimiento científico generado y el estímulo a la producción intelectual de los docentes e investigadores de la UEB." :
                                                            (data.language === "en" ? "It is an organ for the dissemination of scientific and technological knowledge, under the responsibility of the Research Department of the State University of Bolivar (UEB). Its objective is to disseminate the scientific knowledge generated and to stimulate the intellectual production of the teachers and researchers of the UEB." : "É um órgão de divulgação do conhecimento científico e tecnológico, sob a responsabilidade do Departamento de Pesquisa da Universidade Estadual do Bolívar (UEB). Seu objetivo é divulgar o conhecimento científico gerado e estimular a produção intelectual dos professores e pesquisadores da UEB.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-rcs-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista de Ciencias Sociales y Económicas 10" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista de Ciencias Sociales y Económicas</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Está dirigida a la comunidad académica nacional e internacional, cuyo propósito es cumplir con el rol institucional, económico y pedagógico de promoción y desarrollo del conocimiento en el área de las Ciencias Sociales y Económicas , vista desde una perspectiva amplia y multidisciplinaria." :
                                                            (data.language === "en" ? "It is aimed at the national and international academic community, whose purpose is to fulfil the institutional, economic and pedagogical role of promoting and developing knowledge in the area of Social and Economic Sciences, seen from a broad and multidisciplinary perspective." : "Destina-se à comunidade académica nacional e internacional, com o objetivo de cumprir a função institucional, económica e pedagógica de promover e desenvolver o conhecimento na área das Ciências Sociais e Económicas, numa perspetiva ampla e multidisciplinar.")}</p>
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
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 22 al 24 de enero 2025" : (data.language === "en" ? "From 22 to 24 January 2025" : "De 22 a 24 de janeiro de 2025")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                            <a href="https://cedia.zoom.us/j/89186739164" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                                    <h3 className="lbl-name-person"><b>{data.language === "es" ? "Coordinador:" : (data.language === "en" ? "Coordinator:" : "Coordenador:")}</b> Econ. Jorge Bernal Yamuca, M.Sc.</h3>
                                                    <h4 className="lbl-contact-person"><i className="fa fa-envelope-o" aria-hidden="true"></i> bjorgel@uteq.edu.ec</h4>
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
                                            (data.language === "en" ? "Encourage the creation of multidisciplinary dialogue spaces on new social, economic, and financial trends, with the aim of generating innovative strategies for the sustainable development of productive sectors, integrating emerging technologies and artificial intelligence tools, both in the national and global context." :
                                                "Fomentar a criação de espaços de diálogo multidisciplinares sobre as novas tendências sociais, económicas e financeiras, com o objetivo de gerar estratégias inovadoras para o desenvolvimento sustentável dos sectores produtivos, integrando as tecnologias emergentes e as ferramentas de inteligência artificial, tanto no contexto nacional quanto global.")}</p></div>
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
                                                    <li>Transformación digital y finanzas inteligentes</li>
                                                    <li>Mercados y gestión de riesgos financieros</li>
                                                    <li>Big data, fintech, criptomonedas y blockchain</li>
                                                    <li>Plataformas digitales e inteligencia artificial</li>
                                                    <li>Emprendimiento digital y startups tecnológicas en el sector financiero</li>
                                                    <li>Formulación y evaluación de políticas económicas y sociales</li>
                                                    <li>Modelos de negocios impulsados por inteligencia artificial</li>
                                                    <li>Economía del comportamiento e inteligencia artificial</li>
                                                    <li>Innovación y emprendimiento en la era digital</li>
                                                    <li>Inteligencia artificial en los sectores productivos</li>
                                                    <li>Desarrollo sostenible y políticas públicas</li>
                                                    <li>Emprendimiento e innovación social en el contexto de la inteligencia artificial</li>
                                                    <li>Gestión y administración de servicios públicos</li>
                                                    <li>Gobierno digital y open data</li>
                                                    <li>Administración pública y regulación, ética y gobernanza</li>
                                                </ul>
                                            </>) :
                                                (data.language === "en" ? (<>
                                                    <ul className="list-unord-step">
                                                        <li>Digital transformation and smart finance</li>
                                                        <li>Markets and financial risk management</li>
                                                        <li>Big data, fintech, cryptocurrencies, and blockchain</li>
                                                        <li>Digital platforms and artificial intelligence</li>
                                                        <li>Digital entrepreneurship and tech startups in the financial sector</li>
                                                        <li>Formulation and evaluation of economic and social policies</li>
                                                        <li>AI-driven business models</li>
                                                        <li>Behavioural economics and artificial intelligence</li>
                                                        <li>Innovation and entrepreneurship in the digital age</li>
                                                        <li>Artificial intelligence in productive sectors</li>
                                                        <li>Sustainable development and public policies</li>
                                                        <li>Social entrepreneurship and innovation in the context of artificial intelligence</li>
                                                        <li>Management and administration of public services</li>
                                                        <li>Digital government and open data</li>
                                                        <li>Public administration and regulation, ethics, and governance</li>
                                                    </ul>
                                                </>) :
                                                    (<>
                                                        <ul className="list-unord-step">
                                                            <li>Transformação digital e finanças inteligentes</li>
                                                            <li>Mercados e gestão de riscos financeiros</li>
                                                            <li>Big data, fintech, criptomoedas e blockchain</li>
                                                            <li>Plataformas digitais e inteligência artificial</li>
                                                            <li>Empreendedorismo digital e startups tecnológicas no setor financeiro</li>
                                                            <li>Formulação e avaliação de políticas econômicas e sociais</li>
                                                            <li>Modelos de negócios impulsionados por inteligência artificial</li>
                                                            <li>Economia comportamental e inteligência artificial</li>
                                                            <li>Inovação e empreendedorismo na era digital</li>
                                                            <li>Inteligência artificial nos setores produtivos</li>
                                                            <li>Desenvolvimento sustentável e políticas públicas</li>
                                                            <li>Empreendedorismo e inovação social no contexto da inteligência artificial</li>
                                                            <li>Gestão e administração de serviços públicos</li>
                                                            <li>Governo digital e open data</li>
                                                            <li>Administração pública e regulação, ética e governança</li>
                                                        </ul>
                                                    </>))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="card pnl-information-symp mt-2">
                                            <div className="card-header pnl-hdr-symp">
                                                {data.language === "es" ? "Comité Organizador" : (data.language === "en" ? "Organising Committee" : "Comité Organizador")}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Econ. Jorge Bernal Yamuca, M.Sc.</li>
                                                    <li>Ing. Rosalva Aguayo Carvajal, M.Sc.</li>
                                                    <li>Ing. Elsye Cobo Litardo, PhD</li>
                                                    <li>Ing. Oscar Moncayo Carreño, PhD.</li>
                                                    <li>Econ. Roger Yela Burgos, PhD.</li>
                                                    <li>Ing. Javier Zamora Mayorga, M.Sc.</li>
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
                                                        <Image src="/assets/images/research/events/cidu/econ-anderson-argothy-almeida-phd-cidu-scsef-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Econ. Anderson Argothy Almeida, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Econ. Anderson Argothy Almeida, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Técnica de Ambato</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Universidad en el Sistema de Innovación y empredimiento de Ecuador" : (data.language === "en" ? "University in the Innovation and Entrepreneurship System of Ecuador" : "Universidade no Sistema de Inovação e Empreendedorismo do Equador")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-jain-jorda-msc-cidu-scsef-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Jain Jorda, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Alain Jorda, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universitat Politécnica de Catalunya</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "¿Cómo impulsar el desarrollo de Quevedo en un S.XXI post-COVID?" : (data.language === "en" ? "How to boost Quevedo's development in a post-COVID 21st century?" : "Como impulsionar o desenvolvimento de Quevedo em um século XXI pós-COVID?")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/abg-santiago-cahuasqui-cevallos-cidu-scsef-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Abg. Santiago Cahuasquí Cevallos, M.Sc." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Abg. Santiago Cahuasquí Cevallos, M.Sc.</h5>
                                                        <div className="mb-1 text-titles-speaker">Facultad Latinoamericana de Ciencias Sociales (FLACSO)</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "El derecho a la democracia: una mirada a la administración de las elecciones de 2025 en Ecuador" : (data.language === "en" ? "The right to democracy: a look at the administration of the 2025 elections in Ecuador" : "O direito à democracia: uma análise da administração das eleições de 2025 no Equador")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/ing-armando-jose-urdaneta-montiel-phd-cidu-scsef-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Ing. Armando José Urdaneta Montiel, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Venezuela (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Ing. Armando José Urdaneta Montiel, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Metropolitana del Ecuador</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Hacia una Inclusión Financiera Sostenible" : (data.language === "en" ? "Towards Sustainable Financial Inclusion" : "Rumo à inclusão financeira sustentável")}</p>
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
                                                        <Image src="/assets/images/research/events/cidu/revista-retos-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Retos 9" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Retos</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una publicación científica bilingüe de la Universidad Politécnica Salesiana de Ecuador, editada desde 2011 de forma ininterrumpida, con periodicidad fija semestral." :
                                                            (data.language === "en" ? "It is a bilingual scientific publication of the Salesian Polytechnic University of Ecuador, published uninterruptedly since 2011, with a fixed biannual periodicity." :
                                                                "É uma publicação científica bilíngue da Universidade Politécnica Salesiana do Equador, publicada ininterruptamente desde 2011, com uma periodicidade semestral fixa.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-enlace-univ-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Enlace Universitario 10" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Enlace Universitario</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es un órgano de divulgación del conocimiento científico y tecnológico, bajo la responsabilidad del Departamento de Investigación de la Universidad Estatal de Bolívar (UEB). Tiene como objetivo la difusión del conocimiento científico generado y el estímulo a la producción intelectual de los docentes e investigadores de la UEB." :
                                                            (data.language === "en" ? "It is an organ for the dissemination of scientific and technological knowledge, under the responsibility of the Research Department of the State University of Bolivar (UEB). Its objective is to disseminate the scientific knowledge generated and to stimulate the intellectual production of the teachers and researchers of the UEB." :
                                                                "É um órgão de divulgação do conhecimento científico e tecnológico, sob a responsabilidade do Departamento de Pesquisa da Universidade Estadual do Bolívar (UEB). Seu objetivo é divulgar o conhecimento científico gerado e estimular a produção intelectual dos professores e pesquisadores da UEB.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-rcs-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista de Ciencias Sociales y Económicas 11" />
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
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 22 al 24 de enero 2025" : (data.language === "en" ? "From 22 to 24 January 2025" : "De 22 a 24 de janeiro de 2025")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                            <a href="https://cedia.zoom.us/j/81978666751" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scedu-uteq-cidu-2024.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Discutir los avances científicos y tecnológicos interdisciplinarios sobre el papel transformador y los desafíos de la inteligencia artificial en la educación y el aprendizaje del futuro." :
                                            (data.language === "en" ? "Discuss the interdisciplinary scientific and technological advances regarding the transformative role and challenges of artificial intelligence in the education and learning of the future." :
                                                "Discutir os avanços científicos e tecnológicos interdisciplinares sobre o papel transformador e os desafios da inteligência artificial na educação e no aprendizado do futuro.")}</p></div>
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
                                                {data.language === "es" ? "Comité Organizador" : (data.language === "en" ? "Organising Committee" : "Comité Organizador")}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Lcdo. Marcos Gutierrez Soto, PhD.</li>
                                                    <li>Lcdo. Cristopher Herrera Navas, M.Sc.</li>
                                                    <li>Psic. Veronica Hurtado Flores, M.Sc.</li>
                                                    <li>Ing. Aida Izquierdo Moran, PhD.</li>
                                                    <li>Lcdo. Juan Torres Garcia, M.Sc.</li>
                                                    <li>Lcdo. Holger Meza Arguello, M.Sc.</li>
                                                    <li>Lcda. Gabriela Galeas Arboleda, M.Sc.</li>
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
                                                        <Image src="/assets/images/research/events/cidu/teresa-moran-calatayud-fcedu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Teresa Morán Calatayud, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Teresa Morán Calatayud, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Isabel I</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Percepción docente sobre la productividad de asistir a cursos de formación intercultural y su repercusión en las aulas." :
                                                            (data.language === "en" ? "Teachers' perceptions of the productivity of attending intercultural training courses and their impact in the classroom" :
                                                                "Percepções dos professores sobre a produtividade de participar de cursos de treinamento intercultural e seu impacto na sala de aula")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/manuel-gomez-campos-phd-fcedu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Manuel Gómez Campos, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Manuel Gómez Campos, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad de Córdoba</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "La traducción en la era digital: oportunidades y desafíos de las nuevas herramientas tecnológicas (Inglés – Español)" :
                                                            (data.language === "en" ? "Translation in the Digital Age: Opportunities and Challenges of New Technological Tools (English – Spanish)" :
                                                                "Tradução na Era Digital: Oportunidades e Desafios das Novas Ferramentas Tecnológicas (Inglês – Espanhol)")}</p>
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
                                                        <h5 className="mb-0 text-name-speaker">Edwin Martín García Ramírez, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad César Vallejo</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "La investigación científica en la era de la inteligencia artificial" :
                                                            (data.language === "en" ? "Scientific research in the age of artificial intelligence" :
                                                                "Pesquisa científica na era da inteligência artificial")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/maria-de-los-angeles-aldana-hernandez-fcedu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - María de Los Angeles Aldana Hernández" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">María de Los Angeles Aldana Hernández</h5>
                                                        <div className="mb-1 text-titles-speaker">UNIR</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "IA: más allá del corta y pega" :
                                                            (data.language === "en" ? "AI: beyond cutting and pasting" :
                                                                "IA: além de recortar e colar")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/miriam-patricia-cardenas-zea-fcedu-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Miriam Patricia Cardenas Sea" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Miriam Patricia Cardenas Sea</h5>
                                                        <div className="mb-1 text-titles-speaker">UTEQ</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "La Transformación de la Educación a través de las TIC en la era Post-Pandemia" :
                                                            (data.language === "en" ? "Transforming Education through ICTs in the Post-Pandemic Era" :
                                                                "Transformando a educação por meio das TICs na era pós-pandemia")}</p>
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
                                                        <Image src="/assets/images/research/events/cidu/revista1-fcaf.png" className="mx-auto border" width="160" height="220" alt="Revista de Investigación Talentos 12" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista de Investigación Talentos</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es un órgano de divulgación del conocimiento científico y tecnológico, bajo la responsabilidad del Departamento de Investigación de la Universidad Estatal de Bolívar (UEB). Es un órgano de divulgación del conocimiento científico y tecnológico, bajo la responsabilidad del Departamento de Investigación de la Universidad Estatal de Bolívar (UEB)." :
                                                            (data.language === "en" ? "It is an organ for the dissemination of scientific and technological knowledge, under the responsibility of the Research Department of the Bolivar State University (UEB). It is an organ for the dissemination of scientific and technological knowledge, under the responsibility of the Research Department of the State University of Bolivar (UEB)." :
                                                                "É um órgão de difusão do conhecimento científico e tecnológico, sob a responsabilidade do Departamento de Pesquisa da Universidade Estadual Bolívar (UEB). É um órgão de divulgação do conhecimento científico e tecnológico, sob a responsabilidade do Departamento de Pesquisa da Universidade Estadual do Bolívar (UEB).")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-9 col-lg-5 col-xl-6 col-xxl-5 mx-auto pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-4 col-xxl-4 d-flex">
                                                        <Image src="/assets/images/research/events/cidu/revista-conrado-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Conrado 13" />
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
                                                        <Image src="/assets/images/research/events/cidu/revista-cognosis-cidu.webp" className="mx-auto border" width="160" height="220" alt="Revista Cognosis 13" />
                                                    </div>
                                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-8 col-xxl-8 p-3">
                                                        <h5 className="mb-0 text-name-speaker-1">Revista Cognosis</h5>
                                                        <p className="card-text mb-auto text-subject-speaker-1">{data.language === "es" ? "Es una publicación trimestral arbitrada que publica artículos que presenten rigor científico, solidez teórica y análisis crítico; la misma está adscrita a la Facultad de Filosofía, Letras y Ciencias de la Educación de la Universidad Técnica de Manabí." :
                                                            (data.language === "en" ? "It is a quarterly peer-reviewed publication that publishes articles with scientific rigour, theoretical soundness and critical analysis; it is affiliated to the Faculty of Philosophy, Letters and Education of the Technical University of Manabí." :
                                                                "É uma publicação trimestral com arbitragem que publica artigos que apresentam rigor científico, solidez teórica e análise crítica; está vinculada à Faculdade de Filosofia, Letras e Ciências da Educação da Universidade Técnica de Manabí.")}</p>
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
                            <h2 className="msg-pnl-search-2 text-rigth"><i className="fa fa-calendar" aria-hidden="true"></i> {data.language === "es" ? "Del 22 al 24 de enero 2025" : (data.language === "en" ? "From 22 to 24 January 2025" : "De 22 a 24 de janeiro de 2025")}</h2>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                        <div className="card panel-metcs-data-gen" style={{ cursor: "pointer" }}>
                                            <div className="card-body">
                                            <a href="https://cedia.zoom.us/j/88557213394" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                                <a href={`${DOCS_EVENTS_DINMCS_FOLDER}programacion-simposio-scs-uteq-cidu-2024.pdf`} target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
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
                                        <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? "Difundir el uso de la inteligencia artificial (IA) en la investigación científica, con el fin de fortalecer las competencias de los estudiantes, optimizar la calidad de la atención en salud y promover la innovación en los servicios dirigidos a la comunidad." :
                                            (data.language === "en" ? "Promote the use of artificial intelligence (AI) in scientific research in order to strengthen students' skills, optimise the quality of healthcare services, and encourage innovation in community-directed services." :
                                                "Difundir o uso da inteligência artificial (IA) na pesquisa científica, a fim de fortalecer as competências dos estudantes, otimizar a qualidade da atenção à saúde e promover a inovação nos serviços dirigidos à comunidade.")}</p></div>
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
                                                        <li>Investigación en salud integral.</li>*/}
                                                    	<li>Tecnología y salud integral.</li>
                                                        <li>Integración de la atención en salud y salud preventiva.</li>
                                                        <li>Salud mental holística.</li>
                                                        <li>Investigación en salud integral.</li>
                                                        <li>Salud holística en el lugar de trabajo.</li>
                                                    </ul>
                                                </>) :
                                                    (data.language === "en" ? (<>
                                                        <ul className="list-unord-step">
                                                        {/*<li>Integration of health care and preventive health.</li>
                                                            <li>Holistic mental health.</li>
                                                            <li>Technology and integrated health.</li>
                                                            <li>Holistic health in the workplace.</li>
                                                            <li>Integrated health research.</li>*/}
                                                        	<li>Technology and integrated health.</li>
                                                            <li>Integration of healthcare and preventive health.</li>
                                                            <li>Holistic mental health.</li>
                                                            <li>Research in integrated health.</li>
                                                            <li>Holistic health in the workplace.</li>
                                                        </ul>
                                                    </>) : (<>
                                                        <ul className="list-unord-step">
                                                        {/*<li>Integração da assistência médica e da saúde preventiva.</li>
                                                            <li>Saúde mental holística.</li>
                                                            <li>Tecnologia e saúde integrada.</li>
                                                            <li>Saúde holística no local de trabalho.</li>
                                                            <li>Pesquisa integrada em saúde.</li>*/}
                                                        	<li>Tecnologia e saúde integral.</li>
                                                            <li>Integração da atenção à saúde e saúde preventiva.</li>
                                                            <li>Saúde mental holística.</li>
                                                            <li>Pesquisa em saúde integral.</li>
                                                            <li>Saúde holística no local de trabalho.</li>
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
                                                {data.language === "en" ? "Organising Committee" : "Comité Organizador"}
                                            </div>
                                            <div className="card-body pnl-bdy-symp">
                                                <ul className="list-links">
                                                    <li>Lcda. Inés Bajaña Mendieta, MSc.</li>
                                                    <li>Dra. María Fernanda Coello Llerena, MSc</li>
                                                    <li>Lcda. Solange Acurio Barre, MSc</li>
                                                    <li>Lcda. Mariuxi Moreira Floes, MSc</li>
                                                    <li>Lcda. Mariela Bedoya Paucar, MSc</li>
                                                    <li>Lcda. Yulitza Villamar Torres, MSc</li>
                                                    <li>Dr. Eudes Martinez Porro, MSc.</li>
                                                    <li>Lcda. Bertha Vásquez Moran, MSc</li>
                                                    <li>Psicól. Shirley Betancuort Zambrano, MSc.</li>
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
                                                        <Image src="/assets/images/research/events/cidu/dra-betty-bravo-zuniga-fcs-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Prof. Víctor Manuel Reyes, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Presencial)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Betty Bravo Zuñiga</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Catolica de Guayaquil</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Uso de la Inteligencia Artificial en el diagnóstico virtual inmersivo con Realidad Virtual" :
                                                            (data.language === "en" ? "Use of Artificial Intelligence in immersive virtual diagnostics with Virtual Reality" :
                                                                "Uso de Inteligência Artificial em diagnósticos virtuais imersivos com Realidade Virtual")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dra-almudena-barrientos-baez-fcs-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Almudena Barrientos Báez" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">España (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Almudena Barrientos Báez</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Complutense de Madrid</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Neurocomunicación: las tic y sus implicaciones futuras en el contexto sanitario" :
                                                            (data.language === "en" ? "Neurocommunication: ICT and their future implications in the healthcare context" :
                                                                "Neurocomunicação: as TIC e suas implicações futuras no contexto sanitário")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dr-sergio-daniel-toro-reina-fcs-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Sergio Daniel Toro Reina" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Sergio Daniel Toro Reina</h5>
                                                        <div className="mb-1 text-titles-speaker">MSP Distrito 10D03 Cotacachi</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Uso de la inteligencia artificial en el diagnóstico y tratamiento de enfermedades" :
                                                            (data.language === "en" ? "Use of artificial intelligence in the diagnosis and treatment of diseases" :
                                                                "Uso da inteligência artificial no diagnóstico e tratamento de doenças")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/edinson-fausto-lainez-salazar-fcs-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Edinson Fausto Laínez Salazar" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Ecuador (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Edinson Fausto Laínez Salazar</h5>
                                                        <div className="mb-1 text-titles-speaker">Hospital de Especialidades Carlos Andrade Marín</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Clasificación de riesgos laborales según el nuevo decreto ejecutivo 255, ¿Promoción al nuevo Ecuador" :
                                                            (data.language === "en" ? "Classification of occupational hazards according to the new executive decree 255, Promotion of the new Ecuador" :
                                                                "Classificação de riscos ocupacionais de acordo com o novo decreto executivo 255, Promoção do novo Equador")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        {/*<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/victor-manuel-reyes-fcs-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Prof. Víctor Manuel Reyes, PhD." />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Perú (Presencial)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Prof. Víctor Manuel Reyes, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de Tumbes</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Investigación en Salud: estudios de caso clínicos y perspectivas alternativas" :
                                                            (data.language === "en" ? "Health Research: Clinical Case Studies and Alternative Perspectives" :
                                                                "Pesquisa em saúde: estudos de casos clínicos e perspectivas alternativas")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/katya-cuadros-fcs-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcda. Katya Cuadros Carlesi, PhD" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Chile (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcda. Katya Cuadros Carlesi, PhD.</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Viña del Mar</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Evaluación de riesgos laborales en enfermeros en Hospitales de Chile" :
                                                            (data.language === "en" ? "Evaluation of occupational risks in nurses in hospitals in Chile" :
                                                            "Avaliação de riscos ocupacionais em enfermeiros de hospitais no Chile")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/willson-betancourt-fcs-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dr. Willson Betancourt Zamundio" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Colombia (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dr. Willson Betancourt Zamundio</h5>
                                                        <div className="mb-1 text-titles-speaker">Centro Holístico 'Complejo Natura'</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "La reparentalización como técnica terapéutica para sanar o corregir la crianza tóxica" :
                                                            (data.language === "en" ? "Reparenting as a therapeutic technique for healing or correcting toxic parenting" :
                                                            "A reparação como técnica terapêutica para curar ou corrigir a parentalidade tóxica")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        	<div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/sendy-melendez-fcs-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Sendy Meléndez Chávez, PhD" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">México (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Sendy Meléndez Chávez, PhD</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Veracruzana</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "La práctica clínica en la formación de profesionales de la salud" :
                                                            (data.language === "en" ? "Clinical practice in the training of health professionals" :
                                                            "Prática clínica no treinamento de profissionais de saúde")}</p>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/lcda-diana-marcela-castillo-sierra-phd-fcs-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Lcda. Diana Marcela Castillo Sierra, PhD" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Colombia (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Lcda. Diana Marcela Castillo Sierra, PhD</h5>
                                                        <div className="mb-1 text-titles-speaker">Universidad Nacional de Colombia</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Uso de las TIC’s en el cuidado de enfermería para pacientes con enfermedades cardíacas" :
                                                            (data.language === "en" ? "Use of ICTs in nursing care for patients with heart disease" :
                                                                "Uso de TICs na assistência de enfermagem a pacientes com doenças cardíacas")}</p>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="col-md-6 pt-2">
                                                <div className="row g-0 border rounded pnl-speaker-evt">
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex ">
                                                        <Image src="/assets/images/research/events/cidu/dra-isis-alarcon-chavez-fcs-uteq.webp" className="mx-auto border" width="140" height="160" alt="Ponente - Dra. Isis Alarcón Chávez" />
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 p-3">
                                                        <strong className="d-inline-block mb-2 text-country-speaker">Argentina (Virtual)</strong>
                                                        <h5 className="mb-0 text-name-speaker">Dra. Isis Alarcón Chávez</h5>
                                                        <div className="mb-1 text-titles-speaker">Organización PsySon</div>
                                                        <p className="card-text mb-auto text-subject-speaker">{data.language === "es" ? "Prevención de quemaduras mental" :
                                                            (data.language === "en" ? "Prevention of mental burns" :
                                                                "Prevenção de queimaduras mentais")}</p>
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
        const fechaInicio = new Date("2025-01-22");
        const fechaFin = new Date("2025-01-24");

        return (<>
            <div className="row">
                {/*
                    (dataInfoEvt.data8.pwNombre !== null && dataInfoEvt.data8.pwNombre !== '') && (<><h2 className="title-cont-page text-center mt-2">{dataInfoEvt.data8.pwNombre.trim()}</h2></>)
                */}
                <h2 className="title-cont-page text-center mt-2">{dataInfoEvt.language === "es" ? dataInfoEvt.data8.pwNombre.trim() : (dataInfoEvt.language === "en" ? dataInfoEvt.data8.pwNombreEn.trim() : dataInfoEvt.data8.pwNombrePt.trim())}</h2>
                <div className="col-md-12">
                    <Tabs defaultActiveKey={11} id="tab-info">
                    
                        <Tab eventKey={0} title={dataInfoEvt.language === "es" ? "Acerca del Congreso" : (dataInfoEvt.language === "en" ? "About the Congress" : "Sobre o Congresso")}>
                            <h2 className="msg-pnl-search text-rigth">{dataInfoEvt.language === "es" ? "Mensaje del Dr. Eduardo Díaz Ocampo - RECTOR" : (dataInfoEvt.language === "en" ? "Message from Dr. Eduardo Díaz Ocampo - RECTOR" : "Mensagem do Dr. Eduardo Díaz Ocampo - REITOR")}</h2>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card-tp-img mb-3">
                                        <Image src={PHOTOS_FOLDER + "img-aut-5991216.jpg"} className="card-img-top" alt="Fotografía del Rector" width={640} height={430} />
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
                                            {dataInfoEvt.language === "es" ? "Es un honor para nuestra Alma Máter invitar a la comunidad científica, académica, profesional, empresarial y estudiantil a participar en el VI Congreso Internacional de Desarrollo Universitario CIDU-2025. En la edición anterior, celebrada en 2023, se registró una destacada participación con 14.414 inscritos, que incluyeron cuatro conferencias magistrales presenciales y 80 virtuales, así como 593 ponencias que reflejan los avances en diversas áreas del conocimiento. Este evento, realizado bajo la modalidad híbrida, fomentó un intercambio enriquecedor de ideas y experiencias entre participantes de 16 países, todo documentado en el libro de memorias del congreso con ISBN, y resultando en más de 150 artículos publicados en revistas de impacto." : (dataInfoEvt.language === "en" ?
                                                "It is an honour for our Alma Mater to invite the scientific, academic, professional, business, and student community to participate in the VI International Congress on University Development CIDU-2025. In the previous edition, held in 2023, we recorded a notable participation with 14,414 registered attendees, which included four in-person keynote lectures and 80 virtual ones, as well as 593 presentations reflecting advances in various fields of knowledge. This event, conducted in a hybrid format, fostered an enriching exchange of ideas and experiences among participants from 16 countries, all documented in the congress’s proceedings book with ISBN, resulting in more than 150 articles published in impactful journals." :
                                                "É com honra que nossa Alma Mater convida a comunidade científica, acadêmica, profissional, empresarial e estudantil a participar do VI Congresso Internacional de Desenvolvimento Universitário CIDU-2025. Na edição anterior, realizada em 2023, registramos uma participação notável com 14.414 inscritos, que incluíram quatro conferências magnas presenciais e 80 virtuais, além de 593 apresentações refletindo avanços em várias áreas do conhecimento. Este evento, realizado em formato híbrido, promoveu um intercâmbio enriquecedor de ideias e experiências entre participantes de 16 países, tudo documentado no livro de anais do congresso com ISBN, resultando em mais de 150 artigos publicados em revistas de impacto.")}</p>
                                        {dataInfoEvt.language === "es" ? (<><p className="text-cont-cidu">La sexta edición del CIDU, titulada “La investigación en la era de la inteligencia artificial”, se llevará a cabo del 22 al 24 de enero de 2025 en el Campus Central. Este congreso, organizado por el colectivo de facultades de nuestra universidad, creará espacios para la cooperación interinstitucional, involucrando a docentes, investigadores, estudiantes y profesionales. A lo largo del evento, se presentarán conferencias magistrales y se compartirán resultados de investigaciones, enfocándose en los desafíos y oportunidades que presenta la inteligencia artificial en el ámbito académico y profesional. Además, se abordarán consideraciones éticas y la importancia de contar con datos de calidad, promoviendo un debate constructivo sobre el futuro de la investigación en esta nueva era tecnológica. ¡Los esperamos para ser parte de este evento científico transformador!</p></>) :
                                            (dataInfoEvt.language === "en" ? (<><p className="text-cont-cidu">The sixth edition of CIDU, titled "Research in the Era of Artificial Intelligence", will take place from 22 to 24 January 2025 at the Central Campus. Organised by the collective faculties of our university, this congress will create spaces for interinstitutional cooperation, involving faculty, researchers, students, and professionals. Throughout the event, keynote lectures will be presented, and research findings will be shared, focusing on the challenges and opportunities presented by artificial intelligence in academic and professional settings. Additionally, ethical considerations and the importance of having quality data will be addressed, promoting a constructive debate on the future of research in this new technological era. We look forward to welcoming you to be part of this transformative scientific event!</p></>) :
                                                (<><p className="text-cont-cidu">A sexta edição do CIDU, intitulada "A Pesquisa na Era da Inteligência Artificial", ocorrerá de 22 a 24 de janeiro de 2025 no Campus Central. Organizado pelo coletivo de faculdades de nossa universidade, este congresso criará espaços para a cooperação interinstitucional, envolvendo docentes, pesquisadores, estudantes e profissionais. Ao longo do evento, serão apresentadas conferências magnas e compartilhados resultados de pesquisas, focando nos desafios e oportunidades apresentados pela inteligência artificial nos ambientes acadêmico e profissional. Além disso, serão abordadas considerações éticas e a importância de dados de qualidade, promovendo um debate construtivo sobre o futuro da pesquisa nesta nova era tecnológica. Esperamos acolhê-los para fazer parte deste evento científico transformador!</p></>))}
                                    
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
                                                    <h3 className="number-metcs-bx">659</h3>
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
                                                    <h3 className="number-metcs-bx">53</h3>
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
                    	<Tab eventKey={12} title={dataInfoEvt.language === "es" ? "Promoción" : (dataInfoEvt.language === "en" ? "Promotion" : "Promoção")}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="ratio ratio-16x9 panel-vd">
                                        <video
                                            className="bg-video"
                                            autoPlay
                                            loop
                                            controls>
                                            <source src={VIDEOS_FOLDER + "cidu-2025.mp4"} type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    {/*<Tab eventKey={8} title={dataInfoEvt.language === "es" ? "Inscripción" : (dataInfoEvt.language === "en" ? "Registration" : "Inscrição")}>
                            {(dataInfoEvt.congress !== null && dataInfoEvt.congress !== "") ? (
                                (() => {
                                    const comparisonResult = compareDateEvent("2024-10-13T01:00:00", "2025-01-22T23:59:00", fechaActual);

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
                        </Tab>*/}
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

