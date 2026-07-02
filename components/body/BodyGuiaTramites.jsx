import { Accordion } from "react-bootstrap";
import DOMPurify from 'isomorphic-dompurify';
import { v4 as uuidv4 } from 'uuid';

export { BodyGuiaTramites };

const sanitizedData = (codeHTML) => ({
    __html: DOMPurify.sanitize(codeHTML)
});

function ItemPanel(props) {
    return (<Accordion.Item eventKey={props.index}>
        <Accordion.Header>{props.respuesta.trim()}</Accordion.Header>
        <Accordion.Body>
            <div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(props.tramite.trim())}></div>
        </Accordion.Body>
    </Accordion.Item>)
}

function BodyGuiaTramites(data) {

    const listItemsPanels = (dataItems) => {
        return (
            dataItems.map((item, index) => {
                return (<ItemPanel key={uuidv4()} index={index} respuesta={data.language === "es" ? item.dmRespuesta : (data.language === "en" ? item.dmRespuestaEn : item.dmRespuestaPt)} tramite={data.language === "es" ? item.dmDescTramite : (data.language === "en" ? item.dmDescTramiteEn : item.dmDescTramitePt)} />)
            })
        )
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center">{data.language === "es" ? "Guía de trámites" : (data.language === "en" ? "Guide to procedures" : "Guia de procedimentos")}</h2>
            {
                data.tramites.length > 0 && (<>
                    <Accordion defaultActiveKey={0}>
                        {
                            (data.tramites !== null && data.tramites !== "") && listItemsPanels(data.tramites.sort((a, b) => (a.dmOrdenPreg > b.dmOrdenPreg) ? 1 : -1))
                        }
                    </Accordion>
                </>)
            }
        </div>
    </>);

}