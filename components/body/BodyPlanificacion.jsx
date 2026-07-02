import { Accordion } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

export { BodyPlanificacion };

function ItemRowTable(props) {
    return (
        <tr>
            <td>{props.descripcion.trim()}</td>
            <td style={{ textAlign: "center" }}>{props.dirigido.trim()}</td>
            <td style={{ textAlign: "center" }}>
                <a href={props.urlfacb !== null && props.urlfacb !== "" ? props.urlfacb : "#"} target="_blank" className="cls-icon-facb" data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? "Cobertura del evento - Facebook" : (props.language === "en" ? "Event coverage - Facebook" : "Cobertura do evento - Facebook")} style={{ padding: "5px", marginBottom: "3px" }}>
                    <i className="fa fa-facebook fa-2x" aria-hidden="true"></i>
                </a>
                <a href={props.urlyoutb !== null && props.urlyoutb !== "" ? props.urlyoutb : "#"} target="_blank" className="cls-icon-yout" data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? "Video del evento - Youtube" : (props.language === "en" ? "Video of the event - Youtube" : "Vídeo do evento - Youtube")} style={{ padding: "5px", marginBottom: "3px" }}>
                    <i className="fa fa-youtube fa-2x" aria-hidden="true"></i>
                </a>
                <a href={props.urlweb !== null && props.urlweb !== "" ? props.urlweb : "#"} target="_blank" className="cls-icon-wp" data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? "Nota informativa acerca del evento" : (props.language === "en" ? "Information note about the event" : "Nota de informação sobre o evento")} style={{ padding: "5px", marginBottom: "3px" }}>
                    <i className="fa fa-newspaper-o fa-2x" aria-hidden="true"></i>
                </a>
            </td>
        </tr>
    )
}

const listRowsTables = (dataItems, language) => {
    return (
        dataItems.map((item) => {
            return (<ItemRowTable key={uuidv4()} descripcion={language === "es" ? item.evDescripcion : (language === "en" ? item.evDescripcionEn : item.evDescripcionPt)}
                dirigido={language === "es" ? item.evDirigido : (language === "en" ? item.evDirigidoEn : item.evDirigidoPt)} urlfacb={item.evUrlVidFac} urlyoutb={item.evUrlVidYout} urlweb={item.evUrlPagWeb} language={language} />)
        })
    )
}

function changeFormatMonth(mes, language) {
    switch (mes) {
        case 1:
            return (language === "es" ? "Enero" : (language === "en" ? "January" : "Janeiro"));
        case 2:
            return (language === "es" ? "Febrero" : (language === "en" ? "February" : "Fevereiro"));
        case 3:
            return (language === "es" ? "Marzo" : (language === "en" ? "March" : "Março"));
        case 4:
            return (language === "es" ? "Abril" : (language === "en" ? "April" : "Abril"));
        case 5:
            return (language === "es" ? "Mayo" : (language === "en" ? "May" : "Maio"));
        case 6:
            return (language === "es" ? "Junio" : (language === "en" ? "June" : "Junho"));
        case 7:
            return (language === "es" ? "Julio" : (language === "en" ? "July" : "Julho"));
        case 8:
            return (language === "es" ? "Agosto" : (language === "en" ? "August" : "Agosto"));
        case 9:
            return (language === "es" ? "Septiembre" : (language === "en" ? "September" : "Setembro"));
        case 10:
            return (language === "es" ? "Octubre" : (language === "en" ? "October" : "Outubro"));
        case 11:
            return (language === "es" ? "Noviembre" : (language === "en" ? "November" : "Novembro"));
        case 12:
            return (language === "es" ? "Diciembre" : (language === "en" ? "December" : "Dezembro"));
    }
}

function ItemTable(props) {
    return (
        <Accordion.Item eventKey={props.index}>
            <Accordion.Header>{changeFormatMonth(props.month, props.language)}</Accordion.Header>
            <Accordion.Body>
                {
                    props.activities.filter(itemactv => parseInt(itemactv.evFecha.substr(5, 2), 10) === props.month).length > 0 && (
                        <table id="tbl-projects" className="display table-static w-100">
                            <thead>
                                <tr>
                                    <th className="text-center">{props.language === "en" ? "Event" : "Evento"}</th>
                                    <th className="text-center">{props.language === "es" ? "Dirigido a" : (props.language === "en" ? "Aimed at" : "Destinado a")}</th>
                                    <th className="text-center">...</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listRowsTables(props.activities.filter(itemactv => parseInt(itemactv.evFecha.substr(5, 2), 10) === props.month).sort((a, b) => (a.evFecha > b.evFecha) ? 1 : -1), props.language)}
                            </tbody>
                        </table>
                    )
                }
            </Accordion.Body>
        </Accordion.Item>
    )
    //}
}

function BodyPlanificacion(data) {

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const listNotEmpty = data.activities.length > 0;

    const listMonthsTables = (dataItems, dataActvts) => {
        return (
            dataItems.map((month, index) => {
                return (<ItemTable key={uuidv4()} activities={dataActvts} month={month} index={index} language={data.language} />)
            })
        )
    }

    const renderSectionCaldActvts = (dataActvts) => {
        return (<>
            {
                !listNotEmpty && (<>
                    <div className="ratio ratio-21x9">
                        <img src="/assets/img/img-min-ubu-planf.jpg" className="d-block w-100" alt={data.language === "es" ? "Calendario de actividades del UBU" : (data.language === "en" ? "Calendário de actividades da UBU" : "Calendário de actividades da UBU")} />
                    </div>
                </>)
            }
            <div className="row g-0" style={{ visibility: listNotEmpty ? 'visible' : 'hidden' }}>
                <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? dataActvts.data8.pwNombre.trim() : (data.language === "en" ? dataActvts.data8.pwNombreEn.trim() : dataActvts.data8.pwNombrePt.trim())}</h2>
                <Accordion defaultActiveKey={0}>
                    {listMonthsTables(months, dataActvts.activities)}
                </Accordion>
            </div>
        </>);
    }

    return (<>
        {
            renderSectionCaldActvts(data)
        }
    </>);

}