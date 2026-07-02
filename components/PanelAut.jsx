import { PHOTOS_FOLDER } from 'config';
import { v4 as uuidv4 } from 'uuid';

export { PanelAut };

function ItemTitle(props) {
    return (<li>{props.titulo.trim()}</li>)
}

function PanelAut(data_aut, language) {

    const style_img = {
        width: "100%",
        height: "100%"
    };

    const listItemsTitles = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (
                    <ItemTitle key={uuidv4()} titulo={language === "es" ? item.taTituloRec.trim() : (language === "en" ? item.taTituloRecEn.trim() : item.taTituloRecPt.trim())} />
                )
            })
        )
    }

    return (
        data_aut !== "" && (<>
            <div className="col-md-12 w-100">
                <div className="row pn-aut-data mt-2 mx-auto">
                    <div className="col-md-12 bdr-pnlfat" style={{ border: "1px solid rgba(236,185,50,1)" }}>
                        <div className="row pn-bd-dean">
                            <div className="col-md-6 bdr-pnlchd g-0" style={{ borderRight: "1px solid rgba(236,185,50,1)", borderBottom: "1px solid rgba(236,185,50,1)" }}>
                                <img src={(data_aut.auUrlFotoAlt !== null && data_aut.auUrlFotoAlt !== "" && data_aut.auUrlFotoAlt !== "#") ? (PHOTOS_FOLDER + data_aut.auUrlFotoAlt.trim()) : (data_aut.auGenero === "M" ? (PHOTOS_FOLDER + "img-aut-masc-default.jpg") : (PHOTOS_FOLDER + "img-aut-fem-default.jpg"))} className="card-img-top" alt="Fotografía" style={style_img} />
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-12 w-100 text-center p-2 title-mn-third">{data_aut.auNombres.trim() + ' ' + data_aut.auApellidos.trim() + ' - ' +
                                        (data_aut.auGenero === "M" ? (language === "es" ? data_aut.auObjCargo.dmDescripcion.trim() : (language === "en" ? data_aut.auObjCargo.dmDescripcionEn.trim() : data_aut.auObjCargo.dmDescripcionPt.trim())) :
                                            (language === "es" ? data_aut.auObjCargo.dmRespuesta.trim() : (language === "en" ? data_aut.auObjCargo.dmRespuestaEn.trim() : data_aut.auObjCargo.dmRespuestaPt.trim())))}</div>
                                    {
                                        data_aut.auListadoTitulosAcad.length > 0 && (<><h3 className="shp-title mt-3">{language === "es" ? "Títulos académicos" : (language === "en" ? "Academic titles" : "Qualificações académicas")}</h3><div className="col-md-12 w-100"><ul className="list-unord-titles ml-5">
                                            {listItemsTitles(data_aut.auListadoTitulosAcad)}
                                        </ul></div></>)
                                    }
                                    <h3 className="shp-title mt-2">{language === "es" ? "Contacto" : (language === "en" ? "Contact" : "Contacto")}</h3>
                                    <p className="shp-content">{(data_aut.auTelefono !== null && data_aut.auTelefono !== '') && `Telf.: (+593) ${data_aut.auTelefono.trim()} Ext. ${data_aut.auExtensTelf.trim()}`}<br />{(data_aut.auCorreoElect !== null && data_aut.auCorreoElect !== '') && `${language === "es" ? "Correo:" : (language === "en" ? "E-mail:" : "Email:")} ${data_aut.auCorreoElect.trim()}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    );
}
