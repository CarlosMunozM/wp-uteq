import { CALENDAR_DOCS_FOLDER } from 'config';
import React, { useState, useEffect, useMemo } from "react";
import DOMPurify from 'isomorphic-dompurify';
import { SliderImg } from "components";
import { Accordion } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { Badge } from 'react-bootstrap';


export { BodyAdmision };


function BodyAdmision(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    function changeFormatMonth(mes, language) {
        switch (mes) {
            case "1":
            case "01":
                return (language === "es" ? "Enero" : (language === "en" ? "January" : "Janeiro"));
            case "2":
            case "02":
                return (language === "es" ? "Febrero" : (language === "en" ? "February" : "Fevereiro"));
            case "3":
            case "03":
                return (language === "es" ? "Marzo" : (language === "en" ? "March" : "Março"));
            case "4":
            case "04":
                return (language === "es" ? "Abril" : (language === "en" ? "April" : "Abril"));
            case "5":
            case "05":
                return (language === "es" ? "Mayo" : (language === "en" ? "May" : "Maio"));
            case "6":
            case "06":
                return (language === "es" ? "Junio" : (language === "en" ? "June" : "Junho"));
            case "7":
            case "07":
                return (language === "es" ? "Julio" : (language === "en" ? "July" : "Julho"));
            case "8":
            case "08":
                return (language === "en" ? "August" : "Agosto");
            case "9":
            case "09":
                return (language === "es" ? "Septiembre" : (language === "en" ? "September" : "Setembro"));
            case "10":
                return (language === "es" ? "Octubre" : (language === "en" ? "October" : "Outubro"));
            case "11":
                return (language === "es" ? "Noviembre" : (language === "en" ? "November" : "Novembro"));
            case "12":
                return (language === "es" ? "Diciembre" : (language === "en" ? "December" : "Dezembro"));
        }
    }

    function ItemRowTableCareer(props) {
        return (<tr>
            <td>{props.nombre.trim()}</td>
            <td>{props.areacon.trim()}</td>
            <td className="text-center">
                <a href={`grado/carrera/${props.url.trim()}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ir a la página web de la Carrera" : (data.language === "en" ? "Go to the Career website" : "Ir para o sítio web Carreira")}>
                    <i className="fa fa-globe fa-2x" aria-hidden="true"></i>
                </a>
            </td>
        </tr>)
    }

    const listRowsTableCareers = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (<ItemRowTableCareer key={uuidv4()} nombre={data.language === "es" ? item.crNombre : (data.language === "en" ? item.crNombreEn : item.crNombrePt)} url={item.crUrlParcial} areacon={data.language === "es" ? item.crAreaConc : (data.language === "en" ? item.crAreaConcEn : item.crAreaConcPt)} />);
            })
        )
    }

    const getNumberWeeksActivities = (itemact) => {
        var weeks = "";
        if (itemact.detSemanaInc != null && itemact.detSemanaFin != null) {
            if (itemact.detSemanaInc != '' && itemact.detSemanaFin != '') {
                if (itemact.detSemanaInc == itemact.detSemanaFin) {
                    weeks = itemact.detSemanaInc;
                } else {
                    weeks = itemact.detSemanaInc + ' - ' + itemact.detSemanaFin;
                }
            } else if (itemact.detSemanaInc != '' && itemact.detSemanaFin == '') {
                weeks = itemact.detSemanaInc;
            } else {
                weeks = itemact.detSemanaFin;
            }
        } else if (itemact.detSemanaInc != null && itemact.detSemanaFin == null) {
            if (itemact.detSemanaInc != '') {
                weeks = itemact.detSemanaInc;
            }
        } else {
            if (itemact.detSemanaFin != '') {
                weeks = itemact.detSemanaFin;
            }
        }
        return weeks;
    }

    const getDateDayActivity = (fechaInc, fechaFin, opcionfc) => {
        var salida = "";
        if (opcionfc == 1) {
            if (fechaInc == fechaFin) {
                salida = `${fechaInc.substr(8, 2)} de ${changeFormatMonth(fechaInc.substr(5, 2), data.language).toLowerCase()} ${fechaInc.substr(0, 4) != fechaFin.substr(0, 4) ? fechaInc.substr(0, 4) : ''}`;
            } else {
                salida = `Del ${fechaInc.substr(8, 2)} de ${changeFormatMonth(fechaInc.substr(5, 2), data.language).toLowerCase()} ${fechaInc.substr(0, 4) != fechaFin.substr(0, 4) ? fechaInc.substr(0, 4) : ''} - ${fechaFin.substr(8, 2)} de ${changeFormatMonth(fechaFin.substr(5, 2), data.language).toLowerCase()} ${fechaFin.substr(0, 4)}`;
            }
        } else {
            if (fechaInc == fechaFin) {
                salida = `${fechaInc.substr(8, 2)} de ${changeFormatMonth(fechaInc.substr(5, 2), data.language).toLowerCase()} ${fechaInc.substr(0, 4) != fechaFin.substr(0, 4) ? fechaInc.substr(0, 4) : ''}`;
            } else {
                salida = `${opcionfc == 1 ? 'Del' : ''} ${fechaInc.substr(8, 2)} de ${changeFormatMonth(fechaInc.substr(5, 2), data.language).toLowerCase()} ${fechaInc.substr(0, 4) != fechaFin.substr(0, 4) ? fechaInc.substr(0, 4) : ''} - ${fechaFin.substr(8, 2)} de ${changeFormatMonth(fechaFin.substr(5, 2), data.language).toLowerCase()} ${fechaFin.substr(0, 4)}`;
            }
        }
        return salida;
    }

    const listRowsTable = (dataItems, tipo) => {
        return (<>{
            dataItems.cbzListadoActvds.filter(itemca => itemca.detTipo === tipo).sort((a, b) => (a.detFechaInc > b.detFechaInc) ? 1 : -1).map(
                (itemactv) => {
                    return <ItemRowTable key={uuidv4()} actividad={itemactv} tipo={tipo} />
                })
        }</>)
    }

    function ItemRowTable(props) {
        if (props.tipo === 1) {
            return (<tr>
                <td style={{ textAlign: "center" }}>{getNumberWeeksActivities(props.actividad)}</td>
                <td style={{ textAlign: "center" }}>{getDateDayActivity(props.actividad.detFechaInc, props.actividad.detFechaFin, 1)}</td>
                <td>{data.language === "es" ? props.actividad.detDescripcion.trim() : (data.language === "en" ? props.actividad.detDescripcionEn.trim() : props.actividad.detDescripcionPt.trim())}</td>
            </tr>)
        } else {
            return (<tr>
                <td style={{ textAlign: "center" }}>{data.language === "es" ? props.actividad.detDescripcion.trim() : (data.language === "en" ? props.actividad.detDescripcionEn.trim() : props.actividad.detDescripcionPt.trim())}</td>
                <td style={{ textAlign: "center" }}>{getDateDayActivity(props.actividad.detFechaInc, props.actividad.detFechaFin, 2)}</td>
            </tr>)
        }
    }

    const renderSectionCaldAcad = (dataCldrs) => {
        if (dataCldrs.calendars.length > 0) {
            return (<><div id="panel-cald-acad"><h2 className="title-cont-page text-center mt-3">{data.language === "es" ? "Calendarios académicos" : (data.language === "en" ? "Academic calendars" : "Calendários acadêmicos")}</h2>
                <Accordion defaultActiveKey="0">
                    {dataCldrs.calendars.map(
                        (item, index) => {
                            return (<Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{`${item.cbzPeriodo == 'PPA' ? (data.language === "es" ? "Primer periodo académico ordinario" : (data.language === "en" ? "First regular academic term" : "Primeiro período acadêmico regular")) : (data.language === "es" ? "Segundo periodo académico ordinario" : (data.language === "en" ? "Second regular academic term" : "Segundo período acadêmico regular"))} ${changeFormatMonth(item.cbzMesInc.toString(), data.language)} ${item.cbzAnioInc} - ${changeFormatMonth(item.cbzMesFin.toString(), data.language)} ${item.cbzAnioFin}`}</Accordion.Header>
                                <Accordion.Body>
                                    {item.cbzUrlDocx && (<><div className="row justify-content-center pt-2">
                                        <div className="col-sm-6 col-lg-12 text-center">
                                            <a href={`${CALENDAR_DOCS_FOLDER}${item.cbzUrlDocx}`} target="_blank" className="btn-tp mr-2" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar PDF" : (data.language === "en" ? "Download PDF" : "Descarregar PDF")}>
                                                <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i> {data.language === "es" ? "Descargar" : (data.language === "en" ? "Download" : "Descarregar")}</a>
                                        </div>
                                    </div><br /></>)}
                                    {item.cbzListadoActvds.filter(itemca => itemca.detTipo === 1).length > 0 &&
                                        (<table id="tbl-projects" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">{data.language === "en" ? "Week" : "Semana"}</th>
                                                    <th className="text-center">{data.language === "es" ? "Fecha" : (data.language === "en" ? "Date" : "Data")}</th>
                                                    <th className="text-center">{data.language === "es" ? "Actividad" : (data.language === "en" ? "Activity" : "Actividade")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listRowsTable(item, 1)}
                                            </tbody>
                                        </table>)}<br />
                                    {item.cbzListadoActvds.filter(itemca => itemca.detTipo === 2).length > 0 &&
                                        (<table id="tbl-holidays" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">{data.language === "es" ? "Feriado" : (data.language === "en" ? "Holiday" : "Férias")}</th>
                                                    <th className="text-center">{data.language === "es" ? "Fecha" : (data.language === "en" ? "Date" : "Data")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listRowsTable(item, 2)}
                                            </tbody>
                                        </table>)}
                                </Accordion.Body>
                            </Accordion.Item>);
                        })}
                </Accordion>
            </div></>);
        }
    }

    const renderSectionQuestion = (dataQst) => {
        return (<><div id="panel-question"><h2 className="title-cont-page text-center mt-3">{data.language === "es" ? "Preguntas frecuentes" : (data.language === "en" ? "Frequently asked questions" : "Perguntas mais frequentes")}</h2>
            <Accordion defaultActiveKey="0">
                {dataQst.question.sort((a, b) => (a.dmOrdenPreg > b.dmOrdenPreg) ? 1 : -1).map(
                    (item, index) => {
                        return (<Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>{item.dmDescripcion.trim()}</Accordion.Header>
                            <Accordion.Body>
                                {
                                    <div dangerouslySetInnerHTML={sanitizedData(item.dmRespuesta.trim())}></div>
                                }
                            </Accordion.Body>
                        </Accordion.Item>);
                    })}
            </Accordion>
        </div></>);
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? data.data8.dpNombre.trim() : (data.language === "en" ? data.data8.dpNombreEn.trim() : data.data8.dpNombrePt.trim())}</h2>
        
        {/*<a target="_blank" data-toggle="tooltip" data-placement="bottom" title="Ir a la plataforma Postúlate UTEQ" href="https://sga.uteq.edu.ec/media/images/postulacion_aceptacion.html">
                <div className="ratio ratio-21x9">
                    <img src={`/assets/images/advertisements/principal/${data.language === "es" ? "fase-2-simulador-de-evaluacion-uteq-admision-es.webp" : (data.language === "en" ? "fase-2-simulador-de-evaluacion-uteq-admision-en.webp" : "fase-2-simulador-de-evaluacion-uteq-admision-pt.webp")}`} className="d-block w-100" alt="Aviso importante de UAN" />
                </div>
            </a>*/}
        
        	{/*<a target="_blank" data-toggle="tooltip" data-placement="bottom" title="Ir a la plataforma Postúlate" href="https://postulate.uteq.edu.ec/loginpostulacion">
                <div className="ratio ratio-21x9">
                    <img src={`/assets/images/advertisements/principal/${data.language === "es" ? "anuncio-admision-uteq-etapa-1-spa-2024.webp" : (data.language === "en" ? "anuncio-admision-uteq-etapa-1-spa-2024.webp" : "anuncio-admision-uteq-etapa-1-spa-2024.webp")}`} className="d-block w-100" alt="Aviso importante de UAN" />
                </div>
            </a>*/}
        	<div className="col-md-12 w-100 mt-3 mb-3">
                                                <a href="https://www.uteq.edu.ec/assets/docs/admission/Guia_usuario_admision_2023_SPA.pdf" target="_blank" className="link-text-local" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar Guía de usuario" : (data.language === "en" ? "Download User Guide" : "Download do Guia do Usuário")}>
                                                    <div className="card-header pnl-link-effect">
                                                        <i className="fa fa-arrow-circle-down" aria-hidden="true"></i> {data.language === "es" ? "Descargar manual de usuario" : (data.language === "en" ? "Download user manual" : "Download do manual do usuário")}
                                                    </div>
                                                </a>
                                            </div>
        {/*<div className="col-md-12 w-100 mt-3 mb-3">
                                                <a href="https://www.uteq.edu.ec/assets/docs/admission/pasos_para_la_postulacion_y_aceptacion_de_cupos.pdf" target="_blank" className="link-text-local" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar Manual para la postulación y aceptación de cupos" : (data.language === "en" ? "Download Application and Acceptance of Quotas Handbook" : "Faça o download do Manual de Aplicação e Aceitação de Cotas")}>
                                                    <div className="card-header pnl-link-effect">
                                                        <i className="fa fa-arrow-circle-down" aria-hidden="true"></i> {data.language === "es" ? "Descargar Manual para la postulación y aceptación de cupos" : (data.language === "en" ? "Download Application and Acceptance of Quotas Handbook" : "Faça o download do Manual de Aplicação e Aceitação de Cotas")}
                                                    </div>
                                                </a>
                                            </div>*/}
            {
                data.language === "es" ? (
                    (data.data8.dpMision !== null && data.data8.dpMision !== '') ? (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMision.trim())}></div></>) : ""
                ) : (data.language === "en" ? (
                    (data.data8.dpMisionEn !== null && data.data8.dpMisionEn !== '') ? (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMisionEn.trim())}></div></>) : ""
                ) : (
                    (data.data8.dpMisionPt !== null && data.data8.dpMisionPt !== '') ? (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMisionPt.trim())}></div></>) : ""
                ))
            }
            <div className="col-md-12 w-100 mb-3"></div>
            <div className="col-md-12 w-100 mt-3 mb-3">
                <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{data.language === "es" ? "Oferta académica" : (data.language === "en" ? "Academic offer" : "Ofertas acadêmicas")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="col-md-12 w-100">
                                <table id="tbl-careers-adms" className="display table-static w-100 mt-1">
                                    <thead>
                                        <tr>
                                            <th className="text-center">{data.language === "es" ? "Carrera" : (data.language === "en" ? "Degree course" : "Curso")}</th>
                                            <th className="text-center">{data.language === "es" ? "Área de conocimiento" : (data.language === "en" ? "Area of knowledge" : "Área de conhecimento")}</th>
                                            <th className="text-center">...</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listRowsTableCareers(data.dataform5)}
                                    </tbody>
                                </table>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>{data.language === "es" ? "Fases del proceso de admisión" : (data.language === "en" ? "Phases of the admission process" : "Fases do processo de admissão")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="col-md-12 mb-3">
                                <div className="wrapper">
                                    <div className="center-line">
                                        <i className="scroll-icon fa fa-code-fork"></i>
                                    </div>
                                    <div className="row row-1">
                                        <section>
                                            <i className="icon fa fa-newspaper-o"></i>
                                            <div className="details">
                                                <span className="title">{data.language === "es" ? "Registro nacional en Senescyt" : (data.language === "en" ? "National registration at Senescyt" : "Registo nacional em Senescyt")}</span>
                                            </div>
                                            <p>{data.language === "es" ? "Del 30 de noviembre 2024 al 8 de diciembre 2024" : (data.language === "en" ? "30 November 2024 to 8 December 2024" : "30 de novembro de 2024 a 8 de dezembro de 2024")}</p>
                                            <div className="bottom">
                                                <a href="https://www.registrounicoedusup.gob.ec/" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Visitar página web de Registro Nacional" : (data.language === "en" ? "Visit the National Register website" : "Visite o website do Registo Nacional")}>{data.language === "es" ? "Ir al sitio web" : (data.language === "en" ? "Go to the website" : "Ir para o sítio web")}</a>
                                                <i className="type-finlz">{`- ${data.language === "es" ? "Finalizado" : (data.language === "en" ? "Completed" : "Concluído")}`}</i>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="row row-2">
                                        <section>
                                            <i className="icon fa fa-id-card"></i>
                                            <div className="details">
                                                <span className="title">{data.language === "es" ? "Registro de inscripción en la UTEQ" : (data.language === "en" ? "Registration at the UTEQ" : "Inscrição na UTEQ")}</span>
                                            </div>
                                        	<p>{data.language === "es" ? "Del 09 de enero al 10 de febrero 2025" : (data.language === "en" ? "From 09 January to 10 February 2025" : "De 09 de janeiro a 10 de fevereiro de 2025")}</p>
                                            <p>{data.language === "es" ? "Para continuar en esta fase, debes haber realizado el Registro Nacional Único de la Senescyt. Deberás realizar lo siguiente:" : (data.language === "en" ? "To continue in this phase, you must have completed the Single National Register of Senescyt. You will need to do the following:" : "Para continuar nesta fase, deve ter completado o Registo Nacional Único de Senescyt. Terá de fazer o seguinte:")}</p>
                                            <ul className="list-links">
                                                {data.language === "es" ? (<>
                                                    <li>Desde el sitio web <a className="link-word-imp" href="https://uteq.edu.ec/" data-toggle="tooltip" data-placement="bottom" title="Visitar sitio web de la UTEQ">www.uteq.edu.ec</a> en el apartado <strong>Admisión</strong>, podrás acceder al enlace de inscripción de la UTEQ.</li>
                                                    <li>Ingresarás todos los datos generales solicitados.</li>
                                                    <li>Seleccionarás una carrera a la que deseas ingresar. La carrera la podrás cambiar después.</li>
                                                    <li>Aceptarás las condiciones de inscripción y se notificará a tu correo electrónico personal, el usuario y contraseña provisional para acceso al sistema <strong>POSTÚLATE UTEQ</strong>.</li>
                                                    <li>Ingresarás al sistema <strong>POSTÚLATE UTEQ</strong> y cambiarás la contraseña, luego deberás completar la información solicitada y podrás generar tu comprobante de inscripción.</li>
                                                </>) : (data.language === "en" ? (<>
                                                    <li>From the website <a className="link-word-imp" href="https://uteq.edu.ec/en" data-toggle="tooltip" data-placement="bottom" title="Visit the UTEQ website">www.uteq.edu.ec</a> in the <strong>Admission</strong> section, you can access the UTEQ registration link.</li>
                                                    <li>You will enter all the general data requested.</li>
                                                    <li>You will select a career you wish to enter. You can change the course later.</li>
                                                    <li>You will accept the conditions of registration and will be notified to your personal email, the username and password for access to the <strong>POSTÚLATE UTEQ</strong> system.</li>
                                                    <li>You will enter the <strong>POSTÚLATE UTEQ</strong> system and change your password, then you will have to fill in the requested information and you will be able to generate your registration voucher.</li>
                                                </>) : (<>
                                                    <li>A partir do website <a className="link-word-imp" href="https://uteq.edu.ec/pt" data-toggle="tooltip" data-placement="bottom" title="Visitar sitio web de la UTEQ">www.uteq.edu.ec</a> na secção de <strong>Admissão</strong>, pode aceder ao link de registo UTEQ.</li>
                                                    <li>Introduzirá todos os dados gerais solicitados.</li>
                                                    <li>Seleccionará uma carreira na qual deseja entrar. Poderá mudar o curso mais tarde.</li>
                                                    <li>Aceitará as condições de registo e será notificado ao seu e-mail pessoal, o nome de utilizador e a palavra-chave para acesso ao sistema <strong>POSTÚLATE UTEQ</strong>.</li>
                                                    <li>Introduzirá o sistema <strong>POSTÚLATE UTEQ</strong> e alterará a sua palavra-passe, depois terá de preencher as informações solicitadas e poderá gerar o seu voucher de registo.</li>
                                                </>))}
                                            </ul>
                                            <a className="link-word-imp mb-1" href="https://www.uteq.edu.ec/assets/docs/admission/Guia_usuario_admision_2023_SPA.pdf" target="_blank"
                                                data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar instructivo" : (data.language === "en" ? "Download instructions" : "Instruções para descarregar")}>{data.language === "es" ? "Instructivo del proceso" : (data.language === "en" ? "Instructions for the process" : "Instruções para o processo")}</a>
                                            <div className="bottom mt-2">
                                                <a href="https://postulate.uteq.edu.ec/registroadmision?id=OPPQQRRSSTTUUVVWWXXR" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Visitar sitio web de POSTÚLATE UTEQ" : (data.language === "en" ? "Visit POSTÚLATE UTEQ website" : "Visite o site POSTÚLATE UTEQ")}>{data.language === "es" ? "Ir al sitio web" : (data.language === "en" ? "Go to the website" : "Ir para o sítio web")}</a>
                                            	<i className="type-finlz">{data.language === "es" ? "Finalizado" : (data.language === "en" ? "Completed" : "Concluído")}</i>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="row row-1">
                                        <section>
                                            <i className="icon fa fa-desktop"></i>
                                            <div className="details">
                                                <span className="title">{data.language === "es" ? "Simulación de evaluación de competencias generales y específicas" : (data.language === "en" ? "Simulation of assessment of general and specific competencies" : "Simulação de avaliação de competências gerais e específicas")}</span>
                                            </div>
                                        	<p>{data.language === "es" ? "Del 14 de enero al 17 de febrero 2025" : (data.language === "en" ? "From 14 January to 17 February 2025" : "De 14 de janeiro a 17 de fevereiro de 2025")}</p>
                                            <p>{data.language === "es" ? "Para continuar en esta fase, debes haber realizado el Registro de inscripción de la UTEQ. ¿Cómo acceder?:" : (data.language === "en" ? "To continue to this stage, you must have completed the UTEQ Registration Form. How to access?" : "Para continuar até esta fase, deve ter preenchido o formulário de registo UTEQ. Como aceder?")}</p>
                                            <ul className="list-links">
                                                {data.language === "es" ? (<>
                                                    <li>Ingresa al sitio web <a className="link-word-imp" href="https://uteq.edu.ec/" data-toggle="tooltip" data-placement="bottom" title="Visitar sitio web de la UTEQ">www.uteq.edu.ec</a> y desde el apartado <strong>Postúlate</strong>, accede al sistema <strong>POSTÚLATE UTEQ</strong>.</li>
                                                    <li>Ingreso de usuario y clave para acceder al sistema Postúlate UTEQ.</li>
                                                    <li>Se habilitará un simulador de evaluación de conocimientos con múltiples intentos y la muestra de resultados por cada intento realizado.</li>
                                                </>) : (data.language === "en" ? (<>
                                                    <li>Go to the website <a className="link-word-imp" href="https://uteq.edu.ec/en" data-toggle="tooltip" data-placement="bottom" title="Visitar sitio web de la UTEQ">www.uteq.edu.ec</a> and from the section <strong>Postúlate</strong>, access the <strong>POSTÚLATE UTEQ</strong> system.</li>
                                                    <li>User and password entry to access the UTEQ Application System.</li>
                                                    <li>A knowledge assessment simulator will be enabled with multiple attempts, and results will be displayed for each attempt made.</li>
                                                </>) : (<>
                                                    <li>Ir para o website <a className="link-word-imp" href="https://uteq.edu.ec/pt" data-toggle="tooltip" data-placement="bottom" title="Visitar sitio web de la UTEQ">www.uteq.edu.ec</a> e a partir da secção <strong>Postúlate</strong>, aceder ao sistema <strong>POSTÚLATE UTEQ</strong>.</li>
                                                    <li>Inserção de usuário e senha para acessar o sistema de inscrição da UTEQ.</li>
                                                    <li>Um simulador de avaliação de conhecimentos será habilitado com várias tentativas, e os resultados serão exibidos para cada tentativa realizada.</li>
                                                </>))}
                                            </ul>
                                            <div className="bottom">
                                                <a href="https://postulate.uteq.edu.ec" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ingresar al simulador de evaluación de conocimientos" : (data.language === "en" ? "Enter the knowledge assessment simulator" : "Entrar no simulador de avaliação de conhecimentos")}>{data.language === "es" ? "Ir al simulador" : (data.language === "en" ? "Go to the simulator" : "Ir para o simulador")}</a>
                                            	<i className="type-finlz">{data.language === "es" ? "Finalizado" : (data.language === "en" ? "Completed" : "Concluído")}</i>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="row row-2">
                                        <section>
                                            <i className="icon fa fa-users"></i>
                                            <div className="details">
                                                <span className="title">{data.language === "es" ? "Evaluación por competencia generales y específicas" : (data.language === "en" ? "Assessment by general and specific competences" : "Avaliação por competências gerais e específicas")}</span>
                                            </div>
                                            {data.language === "es" ? (<>
                                        		<p>Del 18 al 28 de febrero 2025</p>
                                                <p>Para continuar en esta fase, debes haber realizado el Registro de Inscripción de la UTEQ.<br />Pasos a seguir:</p>
                                                <ul className="list-links">
                                                    <li>Deberás pasar por una verificación de datos el día asignado según la planificación de la convocatoria y puedas quedar habilitado para tu evaluación de conocimientos.</li>
                                                    <li>Ingresa al sitio web <a className="link-word-imp" href="https://uteq.edu.ec/" data-toggle="tooltip" data-placement="bottom" title="Visitar sitio web de la UTEQ">www.uteq.edu.ec</a> y desde el apartado <strong>Postúlate</strong>, accede al sistema <strong>POSTÚLATE UTEQ</strong>.</li>
                                                    <li>Ingresa tu usuario y contraseña.</li>
                                                    <li>Se habilitará el paso 3 que te permitirá acceder a la evaluación, siguiendo directrices indicadas en ese momento.</li>
                                                </ul>
                                            </>) : (data.language === "en" ? (<>
                                        		<p>From 18 to 28 February 2025</p>
                                                <p>To continue to this stage, you must have completed the UTEQ Registration Form.<br />Steps to follow:</p>
                                                <ul className="list-links">
                                                    <li>You will have to undergo a data check on the assigned day according to the schedule of the call and you will be eligible for your knowledge assessment.</li>
                                                    <li>Log in to the website <a className="link-word-imp" href="https://uteq.edu.ec/en" data-toggle="tooltip" data-placement="bottom" title="Visit the UTEQ website">www.uteq.edu.ec</a> and from the section <strong>Postúlate</strong>, access the system <strong>POSTÚLATE UTEQ</strong>.</li>
                                                    <li>Enter your username and password.</li>
                                                    <li>Step 3 will be enabled which will allow you to access the evaluation, following the guidelines indicated at that time.</li>
                                                </ul>
                                            </>) : (<>
                                        		<p>De 18 a 28 de fevereiro de 2025</p>
                                                <p>Para continuar até esta fase, deve ter preenchido o Formulário de Inscrição UTEQ.<br />Passos a seguir:</p>
                                                <ul className="list-links">
                                                    <li>Terá de se submeter a uma verificação de dados no dia atribuído de acordo com o calendário da chamada e será elegível para a sua avaliação de conhecimentos.</li>
                                                    <li>Entrar no sítio web <a className="link-word-imp" href="https://uteq.edu.ec/pt" data-toggle="tooltip" data-placement="bottom" title="Visite o website da UTEQ">www.uteq.edu.ec</a> e da secção <strong>Postúlate</strong>, aceder ao sistema <strong>POSTÚLATE UTEQ</strong>.</li>
                                                    <li>Introduza o seu nome de utilizador e palavra-passe.</li>
                                                    <li>A Etapa 3 será ativada e permitirá que você acesse a avaliação, seguindo as diretrizes indicadas nesse momento.</li>
                                                </ul>
                                            </>))}
                                        	<div className="bottom">
                                                <i className="type-finlz">{data.language === "es" ? "- Finalizado" : (data.language === "en" ? "- Completed" : "- Concluído")}</i>
                                            </div>
                                        </section>
                                    </div>
                                {/*<div className="row row-1">
                                        <section>
                                            <i className="icon fa fa-list" aria-hidden="true"></i>
                                            <div className="details">
                                                <span className="title">{data.language === "es" ? "Cálculo del puntaje para postulación" : (data.language === "en" ? "Calculation of the score for application" : "Cálculo da pontuação para aplicação")}</span>
                                            </div>
                                            {data.language === "es" ? (<>
                                        		<p>04 de marzo 2025</p>
                                                <p>Se ejecutará el proceso interno de cálculo del puntaje de postulación de acuerdo a la normativa vigente de la SENESCYT que está compuesto por los siguientes componentes:</p>
                                                <ul className="list-links">
                                                    <li>Puntaje de evaluación de capacidades y competencias (50%).</li>
                                                    <li>Puntaje de antecedentes académicos (50%).</li>
                                                    <li>Puntaje adicional por acciones afirmativas en caso de que corresponda.</li>
                                                </ul>
                                                <div className="bottom">
                                                    <i className="type-finlz">- Próximamente</i>
                                                </div>
                                            </>) : (data.language === "en" ? (<>
                                        		<p>04 March 2025</p>
                                                <p>The internal process of calculating the application score will be carried out in accordance with the current SENESCYT regulations, which is made up of the following components:</p>
                                                <ul className="list-links">
                                                    <li>Skills and competencies assessment score (50%).</li>
                                                    <li>Academic background score (50%).</li>
                                                    <li>Additional points for affirmative action where applicable.</li>
                                                </ul>
                                                <div className="bottom">
                                                    <i className="type-finlz">- Coming soon</i>
                                                </div>
                                            </>) : (<>
                                        		<p>04 de março de 2025</p>
                                                <p>O processo interno de cálculo da pontuação da candidatura será efectuado de acordo com os regulamentos SENESCYT em vigor, que é composto pelos seguintes componentes:</p>
                                                <ul className="list-links">
                                                    <li>Pontuação da avaliação de aptidões e competências (50%).</li>
                                                    <li>Pontuação académica de fundo (50%).</li>
                                                    <li>Pontos adicionais para acção afirmativa, quando aplicável.</li>
                                                </ul>
                                                <div className="bottom">
                                                    <i className="type-finlz">- Em breve</i>
                                                </div>
                                            </>))}
                                        </section>
                                    </div>*/}
                                    <div className="row row-2">
                                        <section>
                                            <i className="icon fa fa-newspaper-o"></i>
                                            <div className="details">
                                                <span className="title">{data.language === "es" ? "Publicación de la nota de postulación" : (data.language === "en" ? "Publication of the application form" : "Publicação do formulário de candidatura")}</span>
                                            </div>
                                            <p>{data.language === "es" ? "17 de marzo 2025" : (data.language === "en" ? "17 March 2025" : "17 de março de 2025")}</p>
                                            <div className="bottom">
                                                <a href="https://postulate.uteq.edu.ec" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Visitar sitio web de la UTEQ" : (data.language === "en" ? "Visit the UTEQ website" : "Visite o sítio Web da UTEQ")}>Postúlate UTEQ</a>
                                                <i className="type-finlz">{`- ${data.language === "es" ? "Finalizado" : (data.language === "en" ? "Completed" : "Concluído")}`}</i>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="row row-1">
                                        <section>
                                            <i className="icon fa fa-check-square-o" aria-hidden="true"></i>
                                            <div className="details">
                                                <span className="title">{data.language === "es" ? "Postulación de carrera" : (data.language === "en" ? "Career application" : "Candidatura de carreira")}</span>
                                            </div>
                                            {data.language === "es" ? (<>
                                        		<p>17, 21, 22, 26, 30 y 31 de marzo 2025</p>
                                                <p>Para continuar en esta fase, debes haber realizado el Registro de Inscripción de la UTEQ.<br />Pasos a seguir:</p>
                                                <ul className="list-links">
                                                    <li>Acceso desde <a className="link-word-imp" href="https://uteq.edu.ec/" data-toggle="tooltip" data-placement="bottom" title="Visitar sitio web de la UTEQ">www.uteq.edu.ec</a> en la opción <strong>Postúlate</strong>.</li>
                                                    <li>Ingresa tu usuario y contraseña.</li>
                                                    <li>Se mostrará el puntaje de postulación obtenido</li>
                                                    <li>Se presentará la carrera seleccionada en el proceso de inscripción, además visualizará los cupos disponibles en la oferta académica y una referencia de que si está dentro del rango para obtener un posible cupo.</li>
                                                    <li>El aspirante podrá realizar el cambio de la carrera y el sistema le presentará los cupos disponibles. Para aplicar el cambio el aspirante deberá aceptar unas condiciones y se notificará al correo electrónico personas.</li>
                                                </ul>
                                                <div className="bottom">
                                                    <i className="type-finlz">- Finalizado</i>
                                                </div>
                                            </>) : (data.language === "en" ? (<>
                                        		<p>17th, 21st, 22nd, 26th, 30th, and 31st of March 2025</p>
                                                <p>To continue to this stage, you must have completed the UTEQ Registration Form.<br />Steps to follow:</p>
                                                <ul className="list-links">
                                                    <li>Access from <a className="link-word-imp" href="https://uteq.edu.ec/en" data-toggle="tooltip" data-placement="bottom" title="Visit the UTEQ website">www.uteq.edu.ec</a> in the option <strong>Postúlate</strong>.</li>
                                                    <li>Enter your username and password.</li>
                                                    <li>The obtained application score will be displayed.</li>
                                                    <li>The course selected in the registration process will be presented, and you will also see the available places in the academic offer and a reference to whether you are within the range to obtain a possible place.</li>
                                                    <li>The applicant will be able to change the career and the system will show the available places. To apply the change, the applicant must accept certain conditions and will be notified by email.</li>
                                                </ul>
                                                <div className="bottom">
                                                    <i className="type-finlz">- Completed</i>
                                                </div>
                                            </>) : (<>
                                        		<p>17, 21, 22, 26, 30 e 31 de março de 2025</p>
                                                <p>Para continuar até esta fase, deve ter preenchido o Formulário de Inscrição UTEQ.<br />Passos a seguir:</p>
                                                <ul className="list-links">
                                                    <li>Acesso a partir de <a className="link-word-imp" href="https://uteq.edu.ec/pt" data-toggle="tooltip" data-placement="bottom" title="Visite o website da UTEQ">www.uteq.edu.ec</a> na opção <strong>Postúlate</strong>.</li>
                                                    <li>Introduza o seu nome de utilizador e palavra-passe.</li>
                                                    <li>A pontuação da aplicação obtida será afixada</li>
                                                    <li>O curso seleccionado no processo de inscrição será apresentado, e verá também os lugares disponíveis na oferta académica e uma referência sobre se está dentro do alcance para obter um possível lugar.</li>
                                                    <li>O candidato poderá alterar a carreira e o sistema mostrará os lugares disponíveis. Para aplicar a alteração, o candidato deverá aceitar determinadas condições e será notificado por correio electrónico.</li>
                                                </ul>
                                                <div className="bottom">
                                                    <i className="type-finlz">- Concluído</i>
                                                </div>
                                            </>))}
                                        </section>
                                    </div>
                                    <div className="row row-2">
                                        <section>
                                            <i className="icon fa fa-calculator" aria-hidden="true"></i>
                                            <div className="details">
                                                <span className="title">{data.language === "es" ? "Aceptación de cupo - SENESCYT" : (data.language === "en" ? "Acceptance of quota - SENESCYT" : "Aceitação da cota - SENESCYT")}</span>
                                            </div>
                                            {data.language === "es" ? (<>
                                                <p>19, 24, 28 de marzo y 2 de abril 2025</p>
                                                <p>Para continuar en esta fase, debes haber realizado el Registro Nacional Único de la Senescyt.<br />Deberás realizar lo siguiente:</p>
                                                <ul className="list-links">
                                                    <li>Acceso desde la <a className="link-word-imp" href="https://acepta.registrounicoedusup.gob.ec/auth/login" data-toggle="tooltip" data-placement="bottom" title="Visitar sitio web de la SENESCYT">Plataforma de aceptación de cupos de instituciones de educación superior públicas</a>.</li>
                                                    <li>Ingresa tu usuario y contraseña del Registro Nacional Único de la Senescyt.</li>
                                                    <li>Los aspirantes podrán visualizar si se les asignó el cupo en la carrera postulada, en caso de ser afirmativo deberá aceptarlo y se generará un comprobante de postulación y aceptación del cupo en la UTEQ.</li>
                                                    <li>Si el aspirante no fue beneficiado de un cupo, deberá esperar la habiltación de la etapa de postulación y seleccionar otra carrera.</li>
                                                    <li>Si el aspirante no aceptó un cupo asignado, se considerará como rechazado y el cupo será liberado para otro aspirante que cumpla con el puntaje requerido.</li>
                                                </ul>
                                                <div className="bottom">
                                                    <i className="type-finlz">- Finalizado</i>
                                                </div>
                                            </>) : (data.language === "en" ? (<>
                                                <p>19th, 24th, 28th of March, and 2nd of April 2025</p>
                                                <p>To continue in this phase, you must have completed the Single National Registration at Senescyt.<br />You will need to do the following:</p>
                                                <ul className="list-links">
                                                    <li>Access from <a className="link-word-imp" href="https://acepta.registrounicoedusup.gob.ec/auth/login" data-toggle="tooltip" data-placement="bottom" title="Visit the SENESCYT website">Platform for acceptance of places in public higher education institutions</a>.</li>
                                                    <li>Enter your username and password for the Senescyt National Register.</li>
                                                    <li>Applicants will be able to see if they have been assigned a place in the degree course they have applied for, if so, they must accept it and a receipt of application and acceptance of the place in the UTEQ will be generated.</li>
                                                    <li>If the applicant was not awarded a place, he/she will have to wait until the application stage is completed and select another course of study.</li>
                                                    <li>If the applicant did not accept an allocated place, he/she will be considered as rejected and the place will be released for another applicant who meets the required score.</li>
                                                </ul>
                                                <div className="bottom">
                                                    <i className="type-finlz">- Completed</i>
                                                </div>
                                            </>) : <>
                                                <p>19, 24, 28 de março e 2 de abril de 2025</p>
                                                <p>Para continuar nesta fase, deverá ter completado o Registo Nacional Único em Senescyt.<br />Terá de fazer o seguinte:</p>
                                                <ul className="list-links">
                                                    <li>Acesso a partir de <a className="link-word-imp" href="https://acepta.registrounicoedusup.gob.ec/auth/login" data-toggle="tooltip" data-placement="bottom" title="Visite o website da SENESCYT">Plataforma para aceitação de vagas em instituições públicas de ensino superior</a>.</li>
                                                    <li>Digite seu nome de usuário e senha para o Registro Nacional do Senescyt.</li>
                                                    <li>Os candidatos poderão ver se lhes foi atribuído um lugar no curso de graduação ao qual se candidataram, se assim for, deverão aceitá-lo e será gerado um recibo de candidatura e aceitação do lugar na UTEQ.</li>
                                                    <li>Se o candidato não tiver obtido um lugar, terá de esperar até que a fase de candidatura esteja concluída e seleccionar outro curso de estudo.</li>
                                                    <li>Se o candidato não aceitar um lugar atribuído, será considerado como rejeitado e o lugar será libertado para outro candidato que cumpra a pontuação requerida.</li>
                                                </ul>
                                                <div className="bottom">
                                                    <i className="type-finlz">- Concluído</i>
                                                </div>
                                            </>)}

                                        </section>
                                    </div>
                                    {/*<div className="row row-2">
                                        <section>
                                            <i className="icon fa fa-tags" aria-hidden="true"></i>
                                            <div className="details">
                                                <span className="title">{data.language === "es" ? "Aceptación de cupos en la SENESCYT" : (data.language === "en" ? "Acceptance of SENESCYT quotas" : "Aceitação de quotas SENESCYT")}</span>
                                            </div>
                                            {data.language === "es" ? (<>
                                                <p>29 de abril de 2023 al 2 de mayo del 2023</p>
                                                <p>Establecido por SENESCYT</p>
                                                <div className="bottom">
                                                    <i className="type-proxm">- Próximamente</i>
                                                </div>
                                            </>) : (data.language === "en" ? <>
                                                <p>29 April 2023 to 2 May 2023</p>
                                                <p>Established by SENESCYT</p>
                                                <div className="bottom">
                                                    <i className="type-proxm">- Coming soon</i>
                                                </div>
                                            </> : <>
                                                <p>29 de Abril de 2023 a 2 de Maio de 2023</p>
                                                <p>Criado pelo SENESCYT</p>
                                                <div className="bottom">
                                                    <i className="type-proxm">- Em breve</i>
                                                </div>
                                            </>)}
                                        </section>
                                    </div>*/}
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            {
                data.slider1.length > 0 && (<>
                    <h2 className="title-cont-page text-center">{data.language === "es" ? "Instructivos y accesos" : (data.language === "en" ? "Instructions and access" : "Instruções e acesso")}</h2>
                    <div className="col-md-12 w-100">
                        {(data.slider1 !== null && data.slider1 !== "") ? SliderImg(data.slider1, 17, 2500, 1000) : ""}
                    </div>
                </>)
            }
            {/*
                data.authort !== "" ? (<>
                    <h2 className="title-cont-page text-center mt-3">{data.language === "en" ? "Contact" : "Contacto"}</h2>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-12 col-lg-8 d-flex justify-content-center align-items-center">
                            <div className="pnl-members-res">
                                <h2 className="pnl-mr-title-mod-3 g-0">
                                    {data.authort.auNombres.trim() + ' ' + data.authort.auApellidos.trim()}
                                </h2>
                                <div className="pnl-mr-data-member">
                                    <h3 className="pnl-mr-text p-2">{`${data.authort.auGenero === "M" ? (data.language === "es" ? data.authort.auObjCargo.dmDescripcion.trim() : (data.language === "en" ? data.authort.auObjCargo.dmDescripcionEn.trim() : data.authort.auObjCargo.dmDescripcionPt.trim())) : (data.language === "es" ? data.authort.auObjCargo.dmRespuesta.trim() : (data.language === "en" ? data.authort.auObjCargo.dmRespuestaEn.trim() : data.authort.auObjCargo.dmRespuestaPt.trim()))} ${data.language === "es" ? "de la Unidad de Admisión y Nivelación" : (data.language === "en" ? "of the Admissions and Placement Unit" : "da Unidade de Admissão e Colocação")}`}</h3>
                                    <h3 style={{ textAlign: 'center' }} className="pnl-mr-text-1">
                                        <a href={`mailto:${data.authort.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={`${data.language === "es" ? "Comunicarse con" : (data.language === "en" ? "Contact" : "Contacto")} ${data.authort.auNombres.trim() + ' ' + data.authort.auApellidos.trim()}`} style={{ textDecoration: 'none' }}>
                                            <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{data.authort.auCorreoElect.trim()}</Badge>
                                        </a>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </>) : <br />
            */}
            {
                (data.calendars !== null && data.calendars !== "") && (<>{data.calendars.length > 0 && renderSectionCaldAcad(data)}</>)
            }
        </div>
    </>);
}