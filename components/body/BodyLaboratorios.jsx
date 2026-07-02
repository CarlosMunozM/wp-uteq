import { SliderImg } from 'components';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';

export { BodyLaboratorios };


const sanitizedData = (codeHTML) => ({
    __html: DOMPurify.sanitize(codeHTML)
})

function ItemLaboratoryInformation(props) {
    return (<>
        <div className="col-md-12 w-100 paragraph-cont"><h3 className="msg-pnl-search text-right">{props.descripcion.trim()}</h3><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(props.texto.trim())}></p></div>
        <div className="col-md-12 w-100 mb-2">
            {(props.gallery !== null && props.gallery !== "") && props.gallery.filter(imagen => imagen.glbCodigoLab === props.codlab).length > 0 && SliderImg(props.gallery.filter(imagen => imagen.glbCodigoLab === props.codlab).sort((a, b) => (a.glbOrden > b.glbOrden) ? 1 : -1), 84, 2500, 900)}
        </div><hr />
    </>)
}

function BodyLaboratorios(data) {

    const listLaboratoriesSection = (dataItems, dataGal) => {
        return (
            dataItems.map((item) => {
                return (<ItemLaboratoryInformation key={uuidv4()} descripcion={data.language === "es" ? ((item.dmDescripcion !== "" && item.dmDescripcion !== null) ? item.dmDescripcion : "") :
                    (data.language === "en" ? ((item.dmDescripcionEn !== "" && item.dmDescripcionEn !== null) ? item.dmDescripcionEn : "") : ((item.dmDescripcionPt !== "" && item.dmDescripcionPt !== null) ? item.dmDescripcionPt : ""))}
                    codlab={item.dmCodgDato} texto={data.language === "es" ? ((item.dmDescTramite !== "" && item.dmDescTramite !== null) ? item.dmDescTramite : "") :
                        (data.language === "en" ? ((item.dmDescTramiteEn !== "" && item.dmDescTramiteEn !== null) ? item.dmDescTramiteEn : "") :
                            ((item.dmDescTramitePt !== "" && item.dmDescTramitePt !== null) ? item.dmDescTramitePt : ""))} gallery={dataGal} />)
            })
        )
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())}</h2>
            {listLaboratoriesSection(data.labsinfo, data.galinfo)}
        </div>
    </>);

}