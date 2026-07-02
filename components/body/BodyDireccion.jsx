import { Badge } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export { BodyDireccion };

function ItemMember(props) {
    if (props.codcargo === 286) {
        return (<div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center">
            <div className="pnl-members-res">
                <h2 className="pnl-mr-title-mod-2 mb-2 g-0">
                    {props.departamento.trim()}<br />{(props.genero === "M" ? props.cargomasc.trim() : props.cargofem.trim())}
                </h2>
                <div className="pnl-mr-data-member">
                    <h3 className="pnl-mr-text p-2">{props.nombres.trim() + ' ' + props.apellidos.trim()}</h3>
                    <h4 className="pnl-mr-text-1" style={{ textAlign: 'center' }}>
                        <a href={`mailto:${props.correoelect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={`Comunicarse con ${props.nombres.trim() + ' ' + props.apellidos.trim()}`} style={{ textDecoration: 'none' }}>
                            <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{props.correoelect.trim()}</Badge>
                        </a>
                    </h4>
                </div>
            </div>
        </div>)
    } else {
        return (<div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center">
            <div className="pnl-members-res">
                <h2 className="pnl-mr-title-mod-1 mb-2 g-0">
                    {(props.genero === "M" ? props.cargomasc.trim() : props.cargofem.trim())}
                </h2>
                <div className="pnl-mr-data-member">
                    <h3 className="pnl-mr-text p-2">{props.nombres.trim() + ' ' + props.apellidos.trim()}</h3>
                    <h4 className="pnl-mr-text-1" style={{ textAlign: 'center' }}>
                        <a href={`mailto:${props.correoelect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={`Comunicarse con ${props.nombres.trim() + ' ' + props.apellidos.trim()}`} style={{ textDecoration: 'none' }}>
                            <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{props.correoelect.trim()}</Badge>
                        </a>
                    </h4>
                </div>
            </div>
        </div>)
    }
}


function BodyDireccion(data) {

    const listMembers = (data.data7 !== null && data.data7 !== "") ? data.data7 : [];

    const listItemsMembers = (dataItems) => {
        return (
            dataItems.map((item) => {
                if (item.orObjAutoridad.auObjCargo.dmCodgDato !== 116) {
                    return (<ItemMember key={uuidv4()} codcargo={item.orObjAutoridad.auObjCargo.dmCodgDato} departamento={item.orObjAutoridad.auObjEntDato.dpNombre} genero={item.orObjAutoridad.auGenero}
                        cargomasc={item.orObjAutoridad.auObjCargo.dmDescripcion} cargofem={item.orObjAutoridad.auObjCargo.dmRespuesta} nombres={item.orObjAutoridad.auNombres} apellidos={item.orObjAutoridad.auApellidos} correoelect={item.orObjAutoridad.auCorreoElect} />);
                }
            })
        )
    }

    const renderPanelMembers = (dataMembers) => {
        if (dataMembers.length > 0) {
            return (<>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center">
                        <div className="pnl-members-res">
                            <h2 className="pnl-mr-title-mod-1 mb-2 g-0">
                                {(dataMembers[0].orObjAutoridad.auGenero === "M" ? dataMembers[0].orObjAutoridad.auObjCargo.dmDescripcion.trim() : dataMembers[0].orObjAutoridad.auObjCargo.dmRespuesta.trim())}
                            </h2>
                            <div className="pnl-mr-data-member">
                                <h3 className="pnl-mr-text p-2">{dataMembers[0].orObjAutoridad.auNombres.trim() + ' ' + dataMembers[0].orObjAutoridad.auApellidos.trim()}</h3>
                                <h4 className="pnl-mr-text-1" style={{ textAlign: 'center' }}>
                                    <a href={`mailto:${dataMembers[0].orObjAutoridad.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={`Comunicarse con ${dataMembers[0].orObjAutoridad.auNombres.trim() + ' ' + dataMembers[0].orObjAutoridad.auApellidos.trim()}`} style={{ textDecoration: 'none' }}>
                                        <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{dataMembers[0].orObjAutoridad.auCorreoElect.trim()}</Badge>
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    {listItemsMembers(dataMembers)}
                </div>
            </>);
        }
    }


    return (<>
        <div className="row d-flex justify-content-center align-items-center">
            <h2 className="title-cont-page text-center mb-4">{(data.data8 !== null && data.data8 !== "") ? (data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())) : "Dirección"}</h2>
            {renderPanelMembers(listMembers)}
        </div>

    </>);
}