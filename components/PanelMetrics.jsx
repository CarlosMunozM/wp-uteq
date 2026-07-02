import { Accordion } from "react-bootstrap";
import { BoxMetric } from 'components';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';


export { PanelMetrics };

function ItemStatics(props) {
    return (
        <Accordion.Item eventKey={props.year}>
            <Accordion.Header>{`${props.language === "en" ? "Period" : "Período"} ${props.year}`}</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12">
                    <div className="row">
                        {
                            props.metrics.filter(metrica => metrica.mcPeriodo === props.year).map((item, index) => {
                                return (BoxMetric(item.mcCantidad, (props.language === "es" ? item.mcNombre.trim() : (props.language === "en" ? item.mcNombreEn.trim() : item.mcNombrePt.trim())), item.mcUrlImagen.trim(), index, props.tipopanel, ""));
                            })
                        }
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

function PanelMetrics(dataMetrics, tipo, tipoPanel) {
    const listYears = [...new Set(dataMetrics.sort((a, b) => b.mcPeriodo - a.mcPeriodo).map(item => item.mcPeriodo))];
    const router = useRouter();

    function generatePanelAcumulativeValues(data) {
        const listMetrics = [...new Set(data.sort((a, b) => (a.mcNombre > b.mcNombre) ? 1 : -1).map(item => item.mcNombre.trim()))];

        listMetrics.map(function (name_met, index) {
            return (BoxMetric(data.filter(metrica => metrica.mcNombre === name_met).reduce((accumulator, current) => accumulator + current.mcCantidad, 0), name_met.trim(), data.filter(metrica => metrica.mcNombre === name_met)[0].mcUrlImagen.trim(), index, tipoPanel, ""));
        });
    }

    function generateBoxMetrics(data) {
        return (data.map(function (item, index) {
            return (BoxMetric(item.mcCantidad, (router.locale === "es" ? item.mcNombre.trim() : (router.locale === "en" ? item.mcNombreEn.trim() : item.mcNombrePt.trim())), item.mcUrlImagen.trim(), index, tipoPanel, ""));
        }))
    }

    const listItemsStatics = (dataItems, metricsubu, tipopnl) => {
        return (
            dataItems.map((item) => {
                return (<ItemStatics key={uuidv4()} year={item} metrics={metricsubu} tipopanel={tipopnl} language={router.locale} />)
            })
        )
    }

    return (<>
        {
            tipo === 1 ? (
                <Accordion>
                    {listItemsStatics(listYears, dataMetrics, tipoPanel)}
                </Accordion>
            ) : (tipo === 2 ? (<><div className="row">
                {generatePanelAcumulativeValues(dataMetrics)}
            </div></>) : (<div className="row">
                {generateBoxMetrics(dataMetrics)}
            </div>))
        }
    </>);
}