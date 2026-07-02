import React from 'react';
import {
    CALENDAR_DOCS_FOLDER, IMAGES_ADMISSION_FOLDER
} from 'config';
import { Accordion } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

export { BodyCaldAcadNiv };


function BodyCaldAcadNiv(data) {

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
            return (<><div id="panel-cald-acad">
                <Accordion defaultActiveKey={0}>
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

    return (<>
        <div className="col-md-12">
            <div className="hero-wrap" style={{ backgroundImage: `url(${IMAGES_ADMISSION_FOLDER}background-calendario-academico.webp)` }}>
                <div className="container-fluid p-0">
                    <div className="row g-0 slider-text align-items-center justify-content-end" data-scrollax-parent="true">
                        <div className="col-md-6 ftco-animate">
                            <h1 className="mb-4">{data.language === "es" ? "Calendarios" : (data.language === "en" ? "Academic" : "Calendários")} <br /><span>{data.language === "es"
                                ? "académicos"
                                : (data.language === "en"
                                    ? "calendars"
                                    : "acadêmicos")} <i className="fa fa-calendar-check-o" aria-hidden="true"></i></span></h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section-information">
                <div className="container">
                    <div className="row mt-4">
                        <p className="mb-4">
                            {data.language === "es"
                                ? (
                                    <>
                                        Este calendario está diseñado específicamente para los estudiantes que han superado el proceso de admisión y están listos para comenzar su formación en el programa de Nivelación Pre Universitaria. A diferencia del calendario general de fases del proceso de admisión, aquí encontrarás las fechas y eventos clave relacionados con las actividades académicas del semestre de Nivelación.<br />
                                        Te invitamos a consultar las fechas importantes, como el inicio y fin de clases, periodos de evaluaciones, vacaciones y otros eventos académicos relevantes. Este calendario te ayudará a planificar tu semestre de manera eficiente y asegurarte de cumplir con los plazos establecidos en tu formación preuniversitaria.
                                    </>
                                )
                                : (data.language === "en"
                                    ? (
                                        <>
                                            This calendar is specifically designed for students who have passed the admission process and are ready to begin their education in the Pre-University Leveling Program. Unlike the general admission process calendar, here you will find key dates and events related to the academic activities of the Leveling semester.<br />
                                            We invite you to check important dates such as the start and end of classes, evaluation periods, vacations, and other relevant academic events. This calendar will help you plan your semester efficiently and ensure you meet the deadlines set for your pre-university education.
                                        </>
                                    )
                                    : (
                                        <>
                                            Este calendário é projetado especificamente para os estudantes que passaram no processo de admissão e estão prontos para iniciar sua formação no programa de Nivelamento Pré-Universitário. Ao contrário do calendário geral das fases do processo de admissão, aqui você encontrará as datas e eventos importantes relacionados às atividades acadêmicas do semestre de Nivelamento.<br />
                                            Convidamos você a consultar as datas importantes, como o início e fim das aulas, períodos de avaliação, férias e outros eventos acadêmicos relevantes. Este calendário ajudará você a planejar seu semestre de maneira eficiente e garantir que cumpra os prazos estabelecidos na sua formação pré-universitária.
                                        </>
                                    )
                                )}
                        </p>
                        {
                            (data.calendars !== null && data.calendars !== "") && (<>{data.calendars.length > 0 && renderSectionCaldAcad(data)}</>)
                        }
                    </div>
                </div>
            </section>

        </div>
    </>);
}