import DOMPurify from 'isomorphic-dompurify';
import { apiUrl } from 'config';
import { SliderImg } from "components";
import ReactPlayer from "react-player";

export { BodyUbu };

function BodyUbu(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{(data.data8 !== null && data.data8 !== "") ? (data.language === "es" ? data.data8.dpNombre.trim() : (data.language === "en" ? data.data8.dpNombreEn.trim() : data.data8.dpNombrePt.trim())) : (data.language === "es" ? "Unidad de Bienestar Universitario" : (data.language === "en" ? "University Welfare Unit" : "Unidade de Bem-Estar Universitário"))}</h2>
            {
                data.language==="es"?(
                    (data.data8.dpVision !== null && data.data8.dpVision !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpVision.trim())}></div></>):(<></>)
                ):(data.language==="en"?(
                    (data.data8.dpVisionEn !== null && data.data8.dpVisionEn !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpVisionEn.trim())}></div></>):(<></>)
                ):(
                    (data.data8.dpVisionPt !== null && data.data8.dpVisionPt !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpVisionPt.trim())}></div></>):(<></>)
                ))
            }
            {
                data.language==="es"?(
                    (data.data8.dpMision !== null && data.data8.dpMision !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMision.trim())}></div></>):(<></>)
                ):(data.language==="en"?(
                    (data.data8.dpMisionEn !== null && data.data8.dpMisionEn !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMisionEn.trim())}></div></>):(<></>)
                ):(
                    (data.data8.dpMisionPt !== null && data.data8.dpMisionPt !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpMisionPt.trim())}></div></>):(<></>)
                ))
            }
            {
                data.language==="es"?(
                    (data.data8.dpObjetivos !== null && data.data8.dpObjetivos !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpObjetivos.trim())}></div></>):(<></>)
                ):(data.language==="en"?(
                    (data.data8.dpObjetivosEn !== null && data.data8.dpObjetivosEn !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpObjetivosEn.trim())}></div></>):(<></>)
                ):(
                    (data.data8.dpObjetivosPt !== null && data.data8.dpObjetivosPt !== '') ? (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.data8.dpObjetivosPt.trim())}></div></>):(<></>)
                ))
            }
            <h2 className="msg-pnl-search text-right">{data.language === "es" ? "Nuestros servicios universitarios" : (data.language === "en" ? "Our university services" : "Os nossos serviços universitários")}</h2>
            <div className="col-md-12 w-100 mt-2">
                {(data.slider1 !== null && data.slider1 !== "") && SliderImg(data.slider1, 26, 2000, 900)}
            </div>
            <h2 className="msg-pnl-search text-right mt-3">{data.language === "es" ? "Spot de ayudas económicas":(data.language === "en" ? "Financial aid spot":"Ajuda financeira no local")}</h2>
            {
                (data.data8.dpUrlVideo !== null && data.data8.dpUrlVideo !== '') && (<><div className="ratio ratio-16x9 mt-3">
                    <ReactPlayer
                        className="w-100 h-100"
                        playing={false}
                        playsinline={true}
                        muted={false}
                        url={`${data.data8.dpUrlVideo.trim()}?showinfo=0&enablejsapi=1&origin=${apiUrl}`}
                        controls={false} />
                </div></>)
            }
        </div>
    </>);
}