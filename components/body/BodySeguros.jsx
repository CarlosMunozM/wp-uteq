import DOMPurify from 'isomorphic-dompurify';
import { SliderImg } from "components";


export { BodySeguros };

function BodySeguros(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    return (<>
        <div className="row g-0">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())}</h2>
            {
                data.language === "es" ? ((data.data8.pwObjetivos !== null && data.data8.pwObjetivos !== '') ? (<><div dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivos.trim())}></div></>) : (<></>)) :
                    (data.language === "en" ? ((data.data8.pwObjetivosEn !== null && data.data8.pwObjetivosEn !== '') ? (<><div dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivosEn.trim())}></div></>) : (<></>)) :
                        ((data.data8.pwObjetivosPt !== null && data.data8.pwObjetivosPt !== '') ? (<><div dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivosPt.trim())}></div></>) : (<></>)))
            }
            <h2 className="msg-pnl-search text-right mt-2">{data.language === "es" ? "Formularios" : (data.language === "en" ? "Forms" : "Formulários")}</h2>
            <div className="col-md-12 w-100 mt-3">
                {(data.slider1 !== null && data.slider1 !== "") && SliderImg(data.slider1, 46, 2000, 1000)}
            </div><br />
        </div>
    </>);

}