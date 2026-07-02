import DOMPurify from 'isomorphic-dompurify';
import { IMG_PROJECT_RES_FOLDER } from 'config';
import Carousel from "react-multi-carousel";
import { v4 as uuidv4 } from 'uuid';

export { BodyProyectoInvst };

const responsiveCust = () => {
    return {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 2000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 2000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
};

function ItemImageGallery(props) {
    return (
        <div className="row">
            <div className="ratio ratio-16x9">
                <img src={IMG_PROJECT_RES_FOLDER + props.urlimg.trim()} alt={props.language === "es" ? "Imagen de evidencia" : (props.language === "en" ? "Image evidence" : "Provas de imagem")} />
            </div>
        </div>
    )
}

function BodyProyectoInvst(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    function changeFormatMonth(mes, language) {
        switch (mes) {
            case "1":
            case "01":
                return (language === "es" ? "Enero" : (language === "en" ? "January" : "Janeiro"));
            case "2":
            case "02":
                return (language === "es" ? "Febrero" : (language === "en" ? "February" : "Fevereiro"));
            case "3":
            case "03":
                return (language === "es" ? "Marzo" : (language === "en" ? "March" : "Março"));
            case "4":
            case "04":
                return (language === "es" ? "Abril" : (language === "en" ? "April" : "Abril"));
            case "5":
            case "05":
                return (language === "es" ? "Mayo" : (language === "en" ? "May" : "Maio"));
            case "6":
            case "06":
                return (language === "es" ? "Junio" : (language === "en" ? "June" : "Junho"));
            case "7":
            case "07":
                return (language === "es" ? "Julio" : (language === "en" ? "July" : "Julho"));
            case "8":
            case "08":
                return (language === "es" ? "Agosto" : (language === "en" ? "August" : "Agosto"));
            case "9":
            case "09":
                return (language === "es" ? "Septiembre" : (language === "en" ? "September" : "Setembro"));
            case "10":
                return (language === "es" ? "Octubre" : (language === "en" ? "October" : "Outubro"));
            case "11":
                return (language === "es" ? "Noviembre" : (language === "en" ? "November" : "Novembro"));
            case "12":
                return (language === "es" ? "Diciembre" : (language === "en" ? "December" : "Dezembro"));
        }
    }

    function getFormatNumericOfValue(numberValue, decimal) {
        var value = (numberValue).toLocaleString(
            undefined,
            { minimumFractionDigits: decimal }
        );

        return value;
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center">{(data.inforesproj !== null && data.inforesproj !== '') ? (data.language === "es" ? data.inforesproj.ptNombre.trim() :
                (data.language === "en" ? data.inforesproj.ptNombreEn.trim() : data.inforesproj.ptNombrePt.trim())) : 'Proyecto de Investigación'}</h2>
            {
                (data.inforesproj !== null && data.inforesproj !== '') && (<>
                    {
                        (data.inforesproj.ptFechaInicio !== null && data.inforesproj.ptFechaInicio !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Inicio" : (data.language === "en" ? "Start" : "Início")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{`${changeFormatMonth(data.inforesproj.ptFechaInicio.substr(5, 2), data.language)}, ${data.inforesproj.ptFechaInicio.substr(0, 4)}`}</p></div>
                        </>) : ""
                    }
                    {
                        (data.inforesproj.ptFechaFinlz !== null && data.inforesproj.ptFechaFinlz !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Finalización" : (data.language === "en" ? "End" : "Conclusão")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{`${changeFormatMonth(data.inforesproj.ptFechaFinlz.substr(5, 2), data.language)}, ${data.inforesproj.ptFechaFinlz.substr(0, 4)}`}</p></div>
                        </>) : ""
                    }
                    {
                        (data.language === "es" ? (
                            (data.inforesproj.ptGrupoInv.giNombre !== null && data.inforesproj.ptGrupoInv.giNombre !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Grupo de Investigación</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.inforesproj.ptGrupoInv.giNombre.trim()}</p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.inforesproj.ptGrupoInv.giNombreEn !== null && data.inforesproj.ptGrupoInv.giNombreEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Research Group</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.inforesproj.ptGrupoInv.giNombreEn.trim()}</p></div>
                            </>) : ""
                        ) : (
                            (data.inforesproj.ptGrupoInv.giNombrePt !== null && data.inforesproj.ptGrupoInv.giNombrePt !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Grupo de Investigação</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.inforesproj.ptGrupoInv.giNombrePt.trim()}</p></div>
                            </>) : ""
                        )))
                    }
                    {
                        (data.language === "es" ? (
                            (data.inforesproj.ptCarrera.crNombre !== null && data.inforesproj.ptCarrera.crNombre !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Carrera</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.inforesproj.ptCarrera.crNombre.trim()}</p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.inforesproj.ptCarrera.crNombreEn !== null && data.inforesproj.ptCarrera.crNombreEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Career</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.inforesproj.ptCarrera.crNombreEn.trim()}</p></div>
                            </>) : ""
                        ) : (
                            (data.inforesproj.ptCarrera.crNombrePt !== null && data.inforesproj.ptCarrera.crNombrePt !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Profissão</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.inforesproj.ptCarrera.crNombrePt.trim()}</p></div>
                            </>) : ""
                        )))
                    }
                    {
                        (data.language === "es" ? (
                            (data.inforesproj.ptIntegrantes !== null && data.inforesproj.ptIntegrantes !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Integrantes</h2>
                                <div className="paragraph-cont"><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.inforesproj.ptIntegrantes.trim())}></p></div>
                            </>) : ""
                        ) : (data.language === "en" ? (
                            (data.inforesproj.ptIntegrantesEn !== null && data.inforesproj.ptIntegrantesEn !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Members</h2>
                                <div className="paragraph-cont"><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.inforesproj.ptIntegrantesEn.trim())}></p></div>
                            </>) : ""
                        ) : (
                            (data.inforesproj.ptIntegrantesPt !== null && data.inforesproj.ptIntegrantesPt !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">Membros</h2>
                                <div className="paragraph-cont"><p className="text-cont" dangerouslySetInnerHTML={sanitizedData(data.inforesproj.ptIntegrantesPt.trim())}></p></div>
                            </>) : ""
                        )))
                    }
                    {
                        (data.inforesproj.ptCorreoDir !== null && data.inforesproj.ptCorreoDir !== '') && (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Correo del Director del proyecto" : (data.language === "en" ? "Mail from the Project Manager" : "Correio do Gestor do Projecto")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.inforesproj.ptCorreoDir.trim()}</p></div>
                        </>)
                    }
                    {
                        (data.inforesproj.ptMonto !== null && data.inforesproj.ptMonto !== '') && (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Monto aprobado" : (data.language === "en" ? "Approved amount" : "Montante aprovado")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">$ {data.inforesproj.ptMonto}</p></div>
                        </>)
                    }
                    {
                        (data.inforesproj.ptAvance !== null && data.inforesproj.ptAvance !== '') && (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Avance" : (data.language === "en" ? "Progress" : "Avançar")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.language === "es" ? data.inforesproj.ptAvance.trim() : (data.language === "en" ? data.inforesproj.ptAvanceEn.trim() : data.inforesproj.ptAvancePt.trim())}</p></div>
                        </>)
                    }
                    {
                        (data.inforesproj.ptResumenSem !== null && data.inforesproj.ptResumenSem !== '') && (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Resumen" : (data.language === "en" ? "Summary" : "Resumo")}</h2>
                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(data.language === "es" ? data.inforesproj.ptResumenSem.trim() : (data.language === "en" ? data.inforesproj.ptResumenSemEn.trim() : data.inforesproj.ptResumenSemPt.trim()))}></div>
                        </>)
                    }
                    {
                        (data.imgproj !== null && data.imgproj !== "") && (
                            data.imgproj.length > 0 && (<>
                                <br /><Carousel
                                    swipeable={false}
                                    draggable={false}
                                    showDots={false}
                                    arrows={true}
                                    responsive={responsiveCust()}
                                    ssr={true}
                                    infinite={true}
                                    key="1"
                                    autoPlay={true}
                                    autoPlaySpeed={2000}
                                    keyBoardControl={true}
                                    customTransition="all .5"
                                    transitionDuration={900}
                                    containerClass="carousel-container bg-dark"
                                    dotListClass="custom-dot-list-style"
                                    itemClass="item">
                                    {
                                        data.imgproj.sort((a, b) => (a.gpiOrden > b.gpiOrden) ? 1 : -1).map((item) => {
                                            return <ItemImageGallery key={uuidv4()} urlimg={item.gpiUrlImagen} language={data.language} />
                                        })
                                    }
                                </Carousel>
                            </>)
                        )
                    }
                </>)
            }
        </div>
    </>);

}