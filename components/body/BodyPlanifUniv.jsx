import DOMPurify from 'isomorphic-dompurify';
import { Accordion } from "react-bootstrap";
import { PLANF_UNIV_DOCS_FOLDER } from 'config';
import { PanelAut } from 'components';
import { v4 as uuidv4 } from 'uuid';

export { BodyPlanifUniv };

function ItemRowTable(props) {
    return (<tr>
        <td style={{ textAlign: "center" }}>{props.descripcion.trim()}</td>
        <td style={{ textAlign: "center" }}>
            <a href={`${PLANF_UNIV_DOCS_FOLDER}${props.urldoc.trim()}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={`${props.language === "es" ? "Descargar" : (props.language === "en" ? "Download" : "Descarregar")} ${props.descripcion.trim()}`}>
                <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
            </a>&nbsp;
            <a href="#" onClick={() => { props.urldoc.includes(".pdf") && window.open(`${PLANF_UNIV_DOCS_FOLDER}${props.urldoc.trim()}`, "_blank", "fullscreen=yes"); return false }} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? "Visualizar documento" : (props.language === "en" ? "View document" : "Exibir documento")}>
                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
            </a>
        </td>
    </tr>)
}

function BodyPlanifUniv(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    const listRowsTable = (dataItems, tipo) => {
        return (<>{
            dataItems.docs.filter(itemdocx => itemdocx.arFase.trim() === tipo).sort((a, b) => (a.arFechaPublc < b.arFechaPublc) ? 1 : -1).map(
                (itemdoc) => {
                    return <ItemRowTable key={uuidv4()} descripcion={dataItems.language === "es" ? itemdoc.arDescripcion.trim() : (dataItems.language === "en" ? itemdoc.arDescripcionEn.trim() : itemdoc.arDescripcionPt.trim())} urldoc={itemdoc.arUrlDocumento} language={dataItems.language} />
                })
        }</>)
    }

    const renderTextInfo = (dataInfoInst) => {
        return (<>
            {
                dataInfoInst.data8.dpHistoria !== null && (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.data8.dpHistoria.trim())}></div></>)
            }
            {
                (dataInfoInst.docs !== null && dataInfoInst.docs !== "") && (
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>{dataInfoInst.language === "es" ? "Plan estratégico de desarrollo institucional" : (dataInfoInst.language === "en" ? "Institutional development strategic plan" : "Plano estratégico de desenvolvimento institucional")}</Accordion.Header>
                            <Accordion.Body>
                                {dataInfoInst.docs.filter(itemdocx => itemdocx.arFase.trim() === "PEDI").length > 0 &&
                                    (<table id="tbl-pedi" className="display table-static w-100">
                                        <thead>
                                            <tr>
                                                <th className="text-center">{dataInfoInst.language === "en" ? "Document" : "Documento"}</th>
                                                <th className="text-center">...</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listRowsTable(dataInfoInst, "PEDI")}
                                        </tbody>
                                    </table>)}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>{dataInfoInst.language === "es" ? "Planificación operativa institucional" : (dataInfoInst.language === "en" ? "Institutional operational planning" : "Planeamento operacional institucional")}</Accordion.Header>
                            <Accordion.Body>
                                {dataInfoInst.docs.filter(itemdocx => itemdocx.arFase.trim() === "PAPP").length > 0 &&
                                    (<table id="tbl-papp" className="display table-static w-100">
                                        <thead>
                                            <tr>
                                                <th className="text-center">{dataInfoInst.language === "en" ? "Document" : "Documento"}</th>
                                                <th className="text-center">...</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listRowsTable(dataInfoInst, "PAPP")}
                                        </tbody>
                                    </table>)}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )
            }
        </>);
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Planificación y desarrollo universitario" : (data.language === "en" ? "University planning and development" : "Planeamento e desenvolvimento universitário")}</h2>
            {renderTextInfo(data)}
        </div>
    </>);
}