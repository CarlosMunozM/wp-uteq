import { PHOTOS_FOLDER } from 'config';
import { v4 as uuidv4 } from 'uuid';


export { BodyDirectorio };

function ItemInfoAuth(props) {
    return (<div className="col-md-12 col-lg-4 d-flex justify-content-center align-items-center">
        <div className="card-tp">
            <img style={{ borderRadius: "0px" }} src={(props.urlfoto !== null && props.urlfoto !== "" && props.urlfoto !== "#") ? (PHOTOS_FOLDER + props.urlfoto) : (props.genero === "M" ? (PHOTOS_FOLDER + "img-aut-masc-default-2.jpg") :
                (PHOTOS_FOLDER + "img-aut-fem-default-2.jpg"))} className="card-img-top" alt="" />
            <h3 className="card-subtitle-aut-1 mb-2 g-0">{(props.codcargo !== 89 && props.codcargo !== 93) ? (props.genero === "M" ? props.cargomasc.trim() : props.cargofem.trim()) : (
                `${props.genero === "M" ? props.cargomasc.trim() : props.cargofem.trim()} - ${props.departamento.trim()}`
            )}</h3>
            <div className="card-body-aut">
                <h3 className="card-title">{props.nombres.trim() + ' ' + props.apellidos.trim()}</h3>
                <p className="card-text">
                    {props.titulos.map(
                        (itemTit, index) => {
                            return ((index == props.titulos.length - 1) ? (props.language === "es" ? itemTit.taTituloRec.trim():(props.language === "en"?itemTit.taTituloRecEn.trim():itemTit.taTituloRecPt.trim())):"");
                        })}
                </p>
                <p className="card-text">{`Telf.: (+593) ${props.telefono.trim()} Ext. ${props.extension.trim()}`} <br />{`${props.language === "es" ? "Correo" : (props.language === "en" ? "E-mail" : "Email")}: ${props.correo}`}</p>
            </div>
        </div>
    </div>)
}

function BodyDirectorio(data) {

    const listAuthrts = data.data7;

    const listItemsAuthorities = (dataItems) => {
        return (<>{
            dataItems.map(
                (item) => {
                    return <ItemInfoAuth key={uuidv4()} urlfoto={item.orObjAutoridad.auUrlFoto} genero={item.orObjAutoridad.auGenero} nombres={item.orObjAutoridad.auNombres.trim()} apellidos={item.orObjAutoridad.auApellidos.trim()}
                        codcargo={item.orObjAutoridad.auObjCargo.dmCodgDato} cargomasc={data.language === "es" ? item.orObjAutoridad.auObjCargo.dmDescripcion.trim() : (data.language === "en" ? item.orObjAutoridad.auObjCargo.dmDescripcionEn.trim() : item.orObjAutoridad.auObjCargo.dmDescripcionPt.trim())}
                        cargofem={data.language === "es" ? item.orObjAutoridad.auObjCargo.dmRespuesta.trim() : (data.language === "en" ? item.orObjAutoridad.auObjCargo.dmRespuestaEn.trim() : item.orObjAutoridad.auObjCargo.dmRespuestaPt.trim())}
                        departamento={data.language === "es" ? item.orObjAutoridad.auObjEntDato.dpNombre.trim() : (data.language === "en" ? item.orObjAutoridad.auObjEntDato.dpNombreEn.trim() : item.orObjAutoridad.auObjEntDato.dpNombrePt.trim())}
                        titulos={item.orObjAutoridad.auListadoTitulosAcad} telefono={item.orObjAutoridad.auTelefono.trim()} extension={item.orObjAutoridad.auExtensTelf.trim()} correo={item.orObjAutoridad.auCorreoElect.trim()} language={data.language} />
                }
            )
        }</>)
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center">{data.language === "es" ? "Autoridades de la Universidad" : (data.language === "en" ? "University authorities" : "Autoridades universitárias")}</h2><br /><br />
            <div className="container mx-auto mt-4 g-0">
                <div className="row d-flex justify-content-center align-items-center">
                    {(listAuthrts !== null && listAuthrts !== "") && listItemsAuthorities(listAuthrts)}
                </div>
            </div>
        </div>
    </>);
}


