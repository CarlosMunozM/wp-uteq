import DOMPurify from 'isomorphic-dompurify';
import { SliderImg } from 'components';

export { BodyConvocatorias };

function BodyConvocatorias(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center">{data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())}</h2>
            <div className="col-md-12 w-100 mt-3">
                {
                    data.language === "es" ? (
                        (data.data8.pwObjetivos !== null && data.data8.pwObjetivos !== "") ? (<><div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivos.trim())}></div></>) : ""
                    ) : (data.language === "en" ? (
                        (data.data8.pwObjetivosEn !== null && data.data8.pwObjetivosEn !== "") ? (<><div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivosEn.trim())}></div></>) : ""
                    ) : (
                        (data.data8.pwObjetivosPt !== null && data.data8.pwObjetivosPt !== "") ? (<><div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.pwObjetivosPt.trim())}></div></>) : ""
                    ))
                }
            </div>
            <div className="col-md-12 w-100 mt-4">
                {(data.slider1 !== null && data.slider1 !== "") && SliderImg(data.slider1, 61, 2000, 1000)}
            </div>
        </div>
    </>);

}