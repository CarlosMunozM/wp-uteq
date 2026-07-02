import { Accordion } from "react-bootstrap";
import { CALENDAR_DOCS_FOLDER } from "config";
import { v4 as uuidv4 } from 'uuid';

export { BodyCaldAcad };

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

const getDateDayActivity = (fechaInc, fechaFin, opcionfc, language) => {
    var salida = "";
    if (opcionfc == 1) {
        if (fechaInc == fechaFin) {
            salida = `${fechaInc.substr(8, 2)} ${language !== "en" ? "de" : ""} ${changeFormatMonth(fechaInc.substr(5, 2), language).toLowerCase()} ${fechaInc.substr(0, 4)/* != fechaFin.substr(0, 4) ? fechaInc.substr(0, 4) : ''*/}`;
        } else {
            salida = `${language === "es" ? "Del" : (language === "en" ? "From" : "De")} ${fechaInc.substr(8, 2)} ${language !== "en" ? "de" : ""} ${changeFormatMonth(fechaInc.substr(5, 2), language).toLowerCase()} ${fechaInc.substr(0, 4) != fechaFin.substr(0, 4) ? fechaInc.substr(0, 4) : ''} - ${fechaFin.substr(8, 2)} ${language !== "en" ? "de" : ""} ${changeFormatMonth(fechaFin.substr(5, 2), language).toLowerCase()} ${fechaFin.substr(0, 4)}`;
        }
    } else {
        if (fechaInc == fechaFin) {
            salida = `${fechaInc.substr(8, 2)} ${language !== "en" ? "de" : ""} ${changeFormatMonth(fechaInc.substr(5, 2), language).toLowerCase()} ${fechaInc.substr(0, 4)/* != fechaFin.substr(0, 4) ? fechaInc.substr(0, 4) : ''*/}`;
        } else {
            salida = `${opcionfc == 1 ? (language === "es" ? "Del" : (language === "en" ? "From" : "De")) : ''} ${fechaInc.substr(8, 2)} ${language !== "en" ? "de" : ""} ${changeFormatMonth(fechaInc.substr(5, 2), language).toLowerCase()} ${fechaInc.substr(0, 4) != fechaFin.substr(0, 4) ? fechaInc.substr(0, 4) : ''} - ${fechaFin.substr(8, 2)} ${language !== "en" ? "de" : ""} ${changeFormatMonth(fechaFin.substr(5, 2), language).toLowerCase()} ${fechaFin.substr(0, 4)}`;
        }
    }
    return salida;
}

function ItemRowTbl1(props) {
    return (<>
        <tr>
            <td style={{ textAlign: "center" }}>{props.descripcion.trim()}</td>
            <td style={{ textAlign: "center" }}>{getDateDayActivity(props.fechainc, props.fechafin, 2, props.language)}</td>
        </tr>
    </>)
}

function ItemRowTbl2(props) {
    return (<>
        <tr>
            <td style={{ textAlign: "center" }}>{getNumberWeeksActivities(props.itemactv)}</td>
            <td style={{ textAlign: "center" }}>{getDateDayActivity(props.itemactv.detFechaInc, props.itemactv.detFechaFin, 1, props.language)}</td>
            <td>{props.language==="es"?props.itemactv.detDescripcion.trim():(props.language==="en"?props.itemactv.detDescripcionEn.trim():props.itemactv.detDescripcionPt.trim())}</td>
        </tr>
    </>)
}

const listRowsTables1 = (dataItems, language) => {
    return (
        dataItems.map((item) => {
            return (<ItemRowTbl1 key={uuidv4()} descripcion={language==="es"?item.detDescripcion:(language==="en"?item.detDescripcionEn:item.detDescripcionPt)} fechainc={item.detFechaInc} fechafin={item.detFechaFin} language={language} />)
        })
    )
}

const listRowsTables2 = (dataItems, language) => {
    return (
        dataItems.map((item) => {
            return (<ItemRowTbl2 key={uuidv4()} itemactv={item} language={language} />)
        })
    )
}

function BodyCaldAcad(data) {

    const renderSectionCaldAcad = (dataCldrs) => {
        if (dataCldrs.calendars !== null && dataCldrs.calendars !== "") {
            return (<><h2 className="title-cont-page text-center">{data.language === "es" ? "Calendarios académicos" : (data.language === "en" ? "Academic calendars" : "Calendários académicos")}</h2>
                <Accordion defaultActiveKey={0}>
                    {dataCldrs.calendars.length > 0 && dataCldrs.calendars.map(
                        (item, index) => {
                            return (<Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{`${item.cbzPeriodo == 'PPA' ? (data.language==="es"?"Primer periodo académico ordinario":(data.language==="en"?"First regular academic term":"Primeiro período académico regular")) : (data.language==="es"?"Segundo periodo académico ordinario":(data.language==="en"?"Second regular academic term":"Segundo período académico regular"))} ${changeFormatMonth(item.cbzMesInc.toString(),data.language)} ${item.cbzAnioInc} - ${changeFormatMonth(item.cbzMesFin.toString(),data.language)} ${item.cbzAnioFin}`}</Accordion.Header>
                                <Accordion.Body>
                                    {item.cbzUrlDocx ? (<><div className="row justify-content-center pt-2">
                                        <div className="col-sm-6 col-lg-12 text-center">
                                            <a href={`${CALENDAR_DOCS_FOLDER}${item.cbzUrlDocx}`} target="_blank" className="btn-tp mr-2" data-toggle="tooltip" data-placement="bottom" title={data.language==="es"?"Descargar PDF":(data.language==="en"?"Download PDF":"Descarregar PDF")}>
                                                <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i> {data.language==="es"?"Descargar":(data.language==="en"?"Download":"Descarregar")}</a>
                                        </div>
                                    </div><br /></>):""}
                                    {item.cbzListadoActvds.filter(itemca => itemca.detTipo === 1).length > 0 &&
                                        (<table id="tbl-projects" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">{data.language==="en"?"Week":"Semana"}</th>
                                                    <th className="text-center">{data.language==="es"?"Fecha":(data.language==="en"?"Date":"Data")}</th>
                                                    <th className="text-center">{data.language==="es"?"Actividad":(data.language==="en"?"Activity":"Actividade")}</th>
                                                </tr>
                                            </thead>
                                            <tbody key={index}>
                                                {
                                                    listRowsTables2(item.cbzListadoActvds.filter(itemca => itemca.detTipo === 1).sort((a, b) => (a.detFechaInc > b.detFechaInc) ? 1 : -1), data.language)
                                                }
                                            </tbody>
                                        </table>)}<br />
                                    {item.cbzListadoActvds.filter(itemca => itemca.detTipo === 2).length > 0 &&
                                        (<table id="tbl-holidays" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">{data.language==="es"?"Feriado":(data.language==="en"?"Holiday":"Férias")}</th>
                                                    <th className="text-center">{data.language==="es"?"Fecha":(data.language==="en"?"Date":"Data")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    listRowsTables1(item.cbzListadoActvds.filter(itemca => itemca.detTipo === 2).sort((a, b) => (a.detFechaInc > b.detFechaInc) ? 1 : -1), data.language)
                                                }
                                            </tbody>
                                        </table>)}
                                </Accordion.Body>
                            </Accordion.Item>);
                        })}
                </Accordion>
            </>);
        }
    }

    return (<>
        {renderSectionCaldAcad(data)}
    </>);

}