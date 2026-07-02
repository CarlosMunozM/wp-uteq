import { SectionNews, SliderImg } from "components";
import DOMPurify from 'isomorphic-dompurify';
import { Tabs, Tab, SSRProvider } from "react-bootstrap";


export { BodyEvalIntrn };

function BodyEvalIntrn(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    const renderTextInfo = (dataInfoInst) => {
        return (<>
            <div className="col-md-12">
                <Tabs defaultActiveKey={0} id="tab-info">
                    <Tab eventKey={0} title={dataInfoInst.language === "es" ? "Quiénes somos" : (dataInfoInst.language === "en" ? "About us" : "Quem somos nós")}>
                        {
                            dataInfoInst.language === "es" ? ((dataInfoInst.data8.dpResponsabilidades !== null && dataInfoInst.data8.dpResponsabilidades !== '') && (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.data8.dpResponsabilidades.trim())}></div></>)) :
                                (dataInfoInst.language === "en" ? ((dataInfoInst.data8.dpResponsabilidadesEn !== null && dataInfoInst.data8.dpResponsabilidadesEn !== '') && (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.data8.dpResponsabilidadesEn.trim())}></div></>)) :
                                    ((dataInfoInst.data8.dpResponsabilidadesPt !== null && dataInfoInst.data8.dpResponsabilidadesPt !== '') && (<><div className="col-md-12 w-100" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.data8.dpResponsabilidadesPt.trim())}></div></>)))
                        }
                        <h2 className="msg-pnl-search text-rigth mb-2">{dataInfoInst.language === "es" ? "Nuestros procesos" : (dataInfoInst.language === "en" ? "Our processes" : "Os nossos processos")}</h2>
                        <div className="col-md-12 w-100">{(dataInfoInst.slider1 !== null && dataInfoInst.slider1 !== "") && SliderImg(dataInfoInst.slider1, 12, 2500, 1000)}</div>
                    </Tab>
                    <Tab eventKey={1} title={dataInfoInst.language === "es" ? "Noticias" : (dataInfoInst.language === "en" ? "News" : "Notícias")}>
                        {(dataInfoInst.listnews !== null && dataInfoInst.listnews !== "") ? SectionNews(dataInfoInst.listnews):""}
                    </Tab>
                </Tabs>
            </div>
        </>);
    }

    return (<><SSRProvider>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Comisión General de Evaluación Interna y Aseguramiento de la Calidad" : (data.language === "en" ? "General Commission for Internal Evaluation and Quality Assurance" : "Comissão Geral de Avaliação Interna e Garantia de Qualidade")}</h2>
            {renderTextInfo(data)}
        </div>
    </SSRProvider></>);
}