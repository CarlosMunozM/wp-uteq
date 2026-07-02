import { PHOTOS_FOLDER } from 'config';
import { Badge } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';


export { BodyOCS };

function ItemInfoAuth(props) {
    return (<div className="col-md-12 col-lg-4 d-flex justify-content-center align-items-center">
        <div className="card-tp">
            <img style={{ borderRadius: "0px" }} src={(props.urlfoto !== null && props.urlfoto !== "" && props.urlfoto !== "#") ?
                (PHOTOS_FOLDER + props.urlfoto.trim()) : (props.genero === "M" ? (PHOTOS_FOLDER + "img-aut-masc-default-2.jpg") : (PHOTOS_FOLDER + "img-aut-fem-default-2.jpg"))}
                className="card-img-top" alt={props.nombres.trim() + ' ' + props.apellidos.trim()} />
            <h2 className="card-subtitle-aut-1 mb-2 g-0">
                {(props.genero === "M" ? props.cargomasc.trim() : props.cargofem.trim())}
            </h2>
            <div className="card-bdy-ocas">
                <h3 className="card-title" style={{ textAlign: 'center' }}> {props.voz == 'S' && <Badge bg="secondary" className='bg-voz'>{props.language === "en" ? "Voice" : "Voz"}</Badge>}  {props.voto == 'S' && <Badge bg="warning" className="bg-voto">{props.language === "es" ? "Voto" : (props.language === "en" ? "Vote" : "Votação")}</Badge>}</h3>
                <h3 className="card-title p-2">{props.nombres.trim() + ' ' + props.apellidos.trim()}</h3>
            </div>
        </div>
    </div>)
}

function BodyOCS(data) {

    const listAuthrts = data.data7;

    const listItemsAuthorities = (dataItems) => {
        return (<>{
            dataItems.map(
                (item, index) => {
                    return (index > 0 && <ItemInfoAuth key={uuidv4()} urlfoto={item.orObjAutoridad.auUrlFoto} genero={item.orObjAutoridad.auGenero} nombres={item.orObjAutoridad.auNombres} apellidos={item.orObjAutoridad.auApellidos}
                        cargomasc={data.language === "es" ? item.orObjAutoridad.auObjCargo.dmDescripcion : (data.language === "en" ? item.orObjAutoridad.auObjCargo.dmDescripcionEn.trim() : item.orObjAutoridad.auObjCargo.dmDescripcionPt.trim())}
                        cargofem={data.language === "es" ? item.orObjAutoridad.auObjCargo.dmRespuesta : (data.language === "en" ? item.orObjAutoridad.auObjCargo.dmRespuestaEn.trim() : item.orObjAutoridad.auObjCargo.dmRespuestaPt.trim())} 
                        voz={item.orVoz} voto={item.orVoto} language={data.language} />)
                }
            )
        }</>)
    }

    const renderPanelAuthorts = (datAuthrts) => {
        if (datAuthrts.length > 0) {
            return (<>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-12 col-lg-3 d-flex justify-content-center align-items-center">
                        <div className="card-tp">
                            <img style={{ borderRadius: "0px" }} src={(datAuthrts[0].orObjAutoridad.auUrlFoto !== null && datAuthrts[0].orObjAutoridad.auUrlFoto !== "" && datAuthrts[0].orObjAutoridad.auUrlFoto !== "#") ? (PHOTOS_FOLDER + datAuthrts[0].orObjAutoridad.auUrlFoto.trim()) : (item.auGenero === "M" ? (PHOTOS_FOLDER + "img-aut-masc-default-2.jpg") : (PHOTOS_FOLDER + "img-aut-fem-default-2.jpg"))} className="card-img-top" alt={datAuthrts[0].orObjAutoridad.auNombres.trim() + ' ' + datAuthrts[0].orObjAutoridad.auApellidos.trim()} />
                            <h2 className="card-subtitle-aut-1 mb-2 g-0">
                                {data.language === "es" ? "Rector de la UTEQ. Presidente del Organismo" : (data.language === "en" ? "Rector of UTEQ. President of the Agency" : "Reitor da UTEQ. Presidente da Agência")}
                            </h2>
                            <div className="card-bdy-ocas">
                                <h3 className="card-title" style={{ textAlign: 'center' }}><Badge bg="secondary" className='bg-voz'>{data.language === "en" ? "Voice" : "Voz"}</Badge>  <Badge bg="warning" className="bg-voto">{data.language === "es" ? "Voto" : (data.language === "en" ? "Vote" : "Votação")}</Badge></h3>
                                <h3 className="card-title p-2">{datAuthrts[0].orObjAutoridad.auNombres.trim() + ' ' + datAuthrts[0].orObjAutoridad.auApellidos.trim()}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    {listItemsAuthorities(datAuthrts)}
                </div>
            </>);
        }
    }

    return (<>
        <div className="row d-flex justify-content-center align-items-center">
            <h2 className="title-cont-page text-center mb-3">{data.titlepage}</h2><br />
            {(listAuthrts !== null && listAuthrts !== "") && renderPanelAuthorts(listAuthrts)}
        </div>
    </>);
}