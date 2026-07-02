import { HeadComponent, FooterComponent, SliderComponent, SliderMultiComponent, ModalPage, BoxMetric, TopMenu, SliderImg } from 'components';
import { VIDEOS_FOLDER } from 'config';


export { LayoutFirst };

function LayoutFirst(data) {

    const renderCoursesEdCntPanel = (dataSld, language) => {
        var dataIngs = [], listAuxData = [];

        // if (dataSld !== null && dataSld !== "") {
        if (dataSld && Array.isArray(dataSld) && dataSld.length > 0) {
            if (dataSld.length === 0) {
                dataIngs = {
                    sldEnlace: "https://educacioncontinua.uteq.edu.ec/",
                    sldTitulo: "Visitar el sitio web de Educación Continua - UTEQ",
                    sldUrlImgVid: "img-sld-21-00006.webp",
                    sldTituloEn: "Visit the website of Continuing Education - UTEQ",
                    sldTituloPt: "Visite o sítio Web da Formação Contínua - UTEQ",
                    sldUrlImgVidEn: "img-sld-21-00006-en.webp",
                    sldUrlImgVidPt: "img-sld-21-00006-pt.webp",
                }

                listAuxData = [dataIngs, ...listAuxData];

                dataIngs = {
                    sldEnlace: "https://educacioncontinua.uteq.edu.ec/",
                    sldTitulo: "Visitar el sitio web de Educación Continua - UTEQ",
                    sldUrlImgVid: "img-sld-21-00007.webp",
                    sldTituloEn: "Visit the website of Continuing Education - UTEQ",
                    sldTituloPt: "Visite o sítio Web da Formação Contínua - UTEQ",
                    sldUrlImgVidEn: "img-sld-21-00007-en.webp",
                    sldUrlImgVidPt: "img-sld-21-00007-pt.webp",
                }

                listAuxData = [dataIngs, ...listAuxData];

                return (SliderImg(listAuxData, 81, 2000, 1000))

            } else if (dataSld.length === 1) {

                dataIngs = {
                    sldEnlace: dataSld[0].sldEnlace.trim(),
                    sldTitulo: dataSld[0].sldTitulo.trim(),
                    sldUrlImgVid: dataSld[0].sldUrlImgVid.trim(),
                    sldTituloEn: dataSld[0].sldTituloEn.trim(),
                    sldTituloPt: dataSld[0].sldTituloPt.trim(),
                    sldUrlImgVidEn: dataSld[0].sldUrlImgVidEn.trim(),
                    sldUrlImgVidPt: dataSld[0].sldUrlImgVidPt.trim(),
                }

                listAuxData = [dataIngs, ...listAuxData];

                dataIngs = {
                    sldEnlace: "https://educacioncontinua.uteq.edu.ec/",
                    sldTitulo: "Visitar el sitio web de Educación Continua - UTEQ",
                    sldUrlImgVid: "img-sld-21-00008.webp",
                    sldTituloEn: "Visit the website of Continuing Education - UTEQ",
                    sldTituloPt: "Visite o sítio Web da Formação Contínua - UTEQ",
                    sldUrlImgVidEn: "img-sld-21-00008-en.webp",
                    sldUrlImgVidPt: "img-sld-21-00008-pt.webp",
                }

                listAuxData = [dataIngs, ...listAuxData];

                return (SliderImg(listAuxData, 81, 2000, 1000))

            } else {
                return (SliderImg(dataSld, 81, 2000, 1000))
            }
        } else {
            dataIngs = {
                sldEnlace: "https://educacioncontinua.uteq.edu.ec/",
                sldTitulo: "Visitar el sitio web de Educación Continua - UTEQ",
                sldUrlImgVid: "img-sld-21-00006.webp",
                sldTituloEn: "Visit the website of Continuing Education - UTEQ",
                sldTituloPt: "Visite o sítio Web da Formação Contínua - UTEQ",
                sldUrlImgVidEn: "img-sld-21-00006-en.webp",
                sldUrlImgVidPt: "img-sld-21-00006-pt.webp",
            }

            listAuxData = [dataIngs, ...listAuxData];

            dataIngs = {
                sldEnlace: "https://educacioncontinua.uteq.edu.ec/",
                sldTitulo: "Visitar el sitio web de Educación Continua - UTEQ",
                sldUrlImgVid: "img-sld-21-00007.webp",
                sldTituloEn: "Visit the website of Continuing Education - UTEQ",
                sldTituloPt: "Visite o sítio Web da Formação Contínua - UTEQ",
                sldUrlImgVidEn: "img-sld-21-00007-en.webp",
                sldUrlImgVidPt: "img-sld-21-00007-pt.webp",
            }

            listAuxData = [dataIngs, ...listAuxData];

            // Imagen nueva de Educación Continua - UTEQ
            dataIngs = {
                sldEnlace: "https://educacioncontinua.uteq.edu.ec/",
                sldTitulo: "Visitar el sitio web de Educación Continua - UTEQ",
                sldUrlImgVid: "img-sld-21-00024.webp",
                sldTituloEn: "Visit the website of Continuing Education - UTEQ",
                sldTituloPt: "Visite o sítio Web da Formação Contínua - UTEQ",
                sldUrlImgVidEn: "img-sld-21-00024-en.webp",
                sldUrlImgVidPt: "img-sld-21-00024-pt.webp",
            }

            listAuxData = [dataIngs, ...listAuxData];
            // Imagen nueva de Educación Continua - UTEQ
            
            return (SliderImg(listAuxData, 81, 2000, 1000))

        }
    }

    {/*const renderEventsUBUPanel = (dataSld, language) => {
        var dataIngs = [], listAuxData = [];

        if (dataSld !== null && dataSld !== "") {
            if (dataSld.length === 0) {
                dataIngs = {
                    evtEnlace: ("/" + language + "/ubu/planificacion"),
                    evDescripcion: (language === "es" ? "Visitar el sitio web del Calendarios de eventos (UBU) - UTEQ" : (language === "en" ? "Visit the Calendar of Events (UBU) - UTEQ website" : "Visite o Calendário de Eventos (UBU) - sítio Web da UTEQ")),
                    evtUrlAfiche: "img-uteq-sld-evt-default-1.webp"
                }

                listAuxData = [dataIngs, ...listAuxData];

                dataIngs = {
                    evtEnlace: ("/" + language + "/ubu/planificacion"),
                    evDescripcion: (language === "es" ? "Visitar el sitio web del Calendarios de eventos (UBU) - UTEQ" : (language === "en" ? "Visit the Calendar of Events (UBU) - UTEQ website" : "Visite o Calendário de Eventos (UBU) - sítio Web da UTEQ")),
                    evtUrlAfiche: "img-uteq-sld-evt-default-2.webp"
                }

                listAuxData = [dataIngs, ...listAuxData];

                return (SliderImg(listAuxData, 85, 2000, 1000))

            } else if (dataSld.length === 1) {

                dataIngs = {
                    evtEnlace: ("/" + language + "/ubu/planificacion"),
                    evDescripcion: (language === "es" ? dataSld[0].evDescripcion.trim() : (language === "en" ? dataSld[0].evDescripcionEn.trim() : dataSld[0].evDescripcionPt.trim())),
                    evtUrlAfiche: (language === "es" ? dataSld[0].evtUrlAfiche.trim() : (language === "en" ? dataSld[0].evtUrlAficheEn.trim() : dataSld[0].evtUrlAfichePt.trim()))
                }

                listAuxData = [dataIngs, ...listAuxData];

                dataIngs = {
                    evtEnlace: ("/" + language + "/ubu/planificacion"),
                    evDescripcion: (language === "es" ? "Visitar el sitio web del Calendarios de eventos (UBU) - UTEQ" : (language === "en" ? "Visit the Calendar of Events (UBU) - UTEQ website" : "Visite o Calendário de Eventos (UBU) - sítio Web da UTEQ")),
                    evtUrlAfiche: "img-uteq-sld-evt-default-1.webp"
                }

                listAuxData = [dataIngs, ...listAuxData];

                return (SliderImg(listAuxData, 85, 2000, 1000))
            } else {
                return (SliderImg(dataSld, 85, 2000, 1000))
            }
        } else {
            dataIngs = {
                evtEnlace: ("/" + language + "/ubu/planificacion"),
                evDescripcion: (language === "es" ? "Visitar el sitio web del Calendarios de eventos (UBU) - UTEQ" : (language === "en" ? "Visit the Calendar of Events (UBU) - UTEQ website" : "Visite o Calendário de Eventos (UBU) - sítio Web da UTEQ")),
                evtUrlAfiche: "img-uteq-sld-evt-default-1.webp"
            }

            listAuxData = [dataIngs, ...listAuxData];

            dataIngs = {
                evtEnlace: ("/" + language + "/ubu/planificacion"),
                evDescripcion: (language === "es" ? "Visitar el sitio web del Calendarios de eventos (UBU) - UTEQ" : (language === "en" ? "Visit the Calendar of Events (UBU) - UTEQ website" : "Visite o Calendário de Eventos (UBU) - sítio Web da UTEQ")),
                evtUrlAfiche: "img-uteq-sld-evt-default-2.webp"
            }

            listAuxData = [dataIngs, ...listAuxData];

            return (SliderImg(listAuxData, 85, 2000, 1000))
        }
    }*/}

    const renderEventsUBUPanel = (dataSld, language) => {
        var dataIngs = [], listAuxData = [];

        if (dataSld !== null && dataSld !== "") {
            if (dataSld.length === 0) {
                dataIngs = {
                    evtEnlace: ("/" + language + "/ubu/planificacion"),
                    evDescripcion: "Visitar el sitio web del Calendarios de eventos (UBU) - UTEQ",
                    evDescriptionEn: "Visit the Calendar of Events (UBU) - UTEQ website",
                    evDescriptionPt: "Visite o Calendário de Eventos (UBU) - sítio Web da UTEQ",
                    evtUrlAfiche: "img-uteq-sld-evt-default-1.webp",
                    evtUrlAficheEn: "img-uteq-sld-evt-default-1.webp",
                    evtUrlAfichePt: "img-uteq-sld-evt-default-1.webp"
                }

                listAuxData = [dataIngs, ...listAuxData];

                dataIngs = {
                    evtEnlace: ("/" + language + "/ubu/planificacion"),
                    evDescripcion: "Visitar el sitio web del Calendarios de eventos (UBU) - UTEQ",
                    evDescriptionEn: "Visit the Calendar of Events (UBU) - UTEQ website",
                    evDescriptionPt: "Visite o Calendário de Eventos (UBU) - sítio Web da UTEQ",
                    evtUrlAfiche: "img-uteq-sld-evt-default-2.webp",
                    evtUrlAficheEn: "img-uteq-sld-evt-default-2.webp",
                    evtUrlAfichePt: "img-uteq-sld-evt-default-2.webp"
                }

                listAuxData = [dataIngs, ...listAuxData];
                return (SliderImg(listAuxData, 85, 2000, 1000))

            } else if (dataSld.length === 1) {

                dataIngs = {
                    evtEnlace: ("/" + language + "/ubu/planificacion"),
                    evDescripcion: dataSld[0].evDescripcion.trim(),
                    evDescriptionEn: dataSld[0].evDescripcionEn.trim(),
                    evDescriptionPt: dataSld[0].evDescripcionPt.trim(),
                    evtUrlAfiche: dataSld[0].evtUrlAfiche.trim(),
                    evtUrlAficheEn: dataSld[0].evtUrlAficheEn.trim(),
                    evtUrlAfichePt: dataSld[0].evtUrlAfichePt.trim()
                }

                listAuxData = [dataIngs, ...listAuxData];

                dataIngs = {
                    evtEnlace: ("/" + language + "/ubu/planificacion"),
                    evDescripcion: "Visitar el sitio web del Calendarios de eventos (UBU) - UTEQ",
                    evDescriptionEn: "Visit the Calendar of Events (UBU) - UTEQ website",
                    evDescriptionPt: "Visite o Calendário de Eventos (UBU) - sítio Web da UTEQ",
                    evtUrlAfiche: "img-uteq-sld-evt-default-1.webp",
                    evtUrlAficheEn: "img-uteq-sld-evt-default-1.webp",
                    evtUrlAfichePt: "img-uteq-sld-evt-default-1.webp"
                }

                listAuxData = [dataIngs, ...listAuxData];

                return (SliderImg(listAuxData, 85, 2000, 1000))
            } else {
                return (SliderImg(dataSld, 85, 2000, 1000))
            }
        } else {
            dataIngs = {
                evtEnlace: ("/" + language + "/ubu/planificacion"),
                evDescripcion: "Visitar el sitio web del Calendarios de eventos (UBU) - UTEQ",
                evDescriptionEn: "Visit the Calendar of Events (UBU) - UTEQ website",
                evDescriptionPt: "Visite o Calendário de Eventos (UBU) - sítio Web da UTEQ",
                evtUrlAfiche: "img-uteq-sld-evt-default-1.webp",
                evtUrlAficheEn: "img-uteq-sld-evt-default-1.webp",
                evtUrlAfichePt: "img-uteq-sld-evt-default-1.webp"
            }

            listAuxData = [dataIngs, ...listAuxData];

            dataIngs = {
                evtEnlace: ("/" + language + "/ubu/planificacion"),
                evDescripcion: "Visitar el sitio web del Calendarios de eventos (UBU) - UTEQ",
                evDescriptionEn: "Visit the Calendar of Events (UBU) - UTEQ website",
                evDescriptionPt: "Visite o Calendário de Eventos (UBU) - sítio Web da UTEQ",
                evtUrlAfiche: "img-uteq-sld-evt-default-2.webp",
                evtUrlAficheEn: "img-uteq-sld-evt-default-2.webp",
                evtUrlAfichePt: "img-uteq-sld-evt-default-2.webp"
            }

            listAuxData = [dataIngs, ...listAuxData];

            return (SliderImg(listAuxData, 85, 2000, 1000))
        }
    }

    const renderElementSectionMain = (dataGnrl) => {
        return (
            <div className="container-fluid g-0">
                <div className="row g-0">
                    <div className="col-md-12 col-lg-6 g-0">
                        <div className="col-md-12 w-100 text-center p-3 title-section">{data.language === "en" ? "JOURNALS" : "REVISTAS"}</div>
                        <div className="col-md-12 w-100 pnl-sld-mgz-index">
                            {SliderImg(dataGnrl.magazines, 82, 2000, 1000)}
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-3 g-0">
                        <div className="col-md-12 w-100 text-center p-3 title-section">{data.language === "es" ? "AGENDA" : (data.language === "en" ? "CALENDAR" : "ACORDO")}</div>
                        <div className="col-md-12 w-100">
                            <a href={`/${data.language}/ubu/planificacion`}>
                                {renderEventsUBUPanel(dataGnrl.events, dataGnrl.language)}
                            </a>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-3 g-0">
                        <div className="col-md-12 w-100 text-center p-3 title-section">{data.language === "es" ? "EDUCACIÓN CONTINUA" : (data.language === "en" ? "CONTINUING EDUCATION" : "FORMAÇÃO CONTÍNUA")}</div>
                        <div className="col-md-12 w-100">
                            <a href="https://educacioncontinua.uteq.edu.ec/" target="_blank">
                                {renderCoursesEdCntPanel(data.courses, dataGnrl.language)}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderElementLastNewsResLink = (dataImg) => {
        return (
            <div className="container-fluid g-0">
                <div className="row g-0">
                    <div className="col-md-12 col-lg-6 g-0">
                        <a href={`/${data.language}/investigacion`} target="_blank" aria-label="link pagina investigacion" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Página web de Investigación" : (data.language === "en" ? "Research website" : "Sítio Web de investigação")} style={{ textDecoration: "none" }}>
                            <div className="col-md-12 w-100 text-center p-3 title-news">{data.language === "es" ? "INVESTIGACIÓN" : (data.language === "en" ? "RESEARCH" : "INVESTIGAÇÃO")}</div>
                        </a>
                        <div className="col-md-12 w-100">
                            {SliderMultiComponent(dataImg.newsres, 2, data.language, 1)}
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-6 g-0">
                        <a href={`/${data.language}/vinculacion`} target="_blank" aria-label="link pagina vinculacion" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Página web de Vinculación" : (data.language === "en" ? "Linking web page" : "Ligação à página web")} style={{ textDecoration: "none" }}>
                            <div className="col-md-12 w-100 text-center p-3 title-news">{data.language === "es" ? "VINCULACIÓN" : (data.language === "en" ? "LINKAGE" : "LIGAÇÃO")}</div>
                        </a>
                        <div className="col-md-12 w-100">
                            {SliderMultiComponent(dataImg.newslkg, 2, data.language, 1)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderElementLastNewsGeneral = (dataImg) => {
        return (
            <div className="container-fluid g-0">
                <div className="row g-0">
                    <div className="col-md-12 g-0">
                        <div className="col-md-12 w-100 text-center p-3 title-news">{data.language === "es" ? "ÚLTIMAS NOTICIAS" : (data.language === "en" ? "LATEST NEWS" : "ÚLTIMAS NOTÍCIAS")}</div>
                        <div className="col-md-12">
                            {SliderMultiComponent(dataImg.newsAll, 1, data.language, 1)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderElementListCareers = (dataImg) => {
        return (
            <div className="container-fluid g-0">
                <div className="row g-0">
                    <div className="col-md-12 g-0">
                        <div className="col-md-12 w-100 text-center p-3 title-news">{data.language === "es" ? "ESTUDIA CON NOSOTROS" : (data.language === "en" ? "STUDY WITH US" : "ESTUDE CONOSCO")}</div>
                        <div className="col-md-12">
                            {SliderMultiComponent(dataImg.careers, 1, data.language, 2)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderElementListCareersCase2 = (dataGnrl) => {
        return (
            <div className="container-fluid g-0">
                <div className="row g-0">
                    <div className="col-md-12 col-lg-12 g-0">
                        <div className="col-md-12 w-100 text-center p-3 title-section">{data.language === "es" ? "ESTUDIA CON NOSOTROS" : (data.language === "en" ? "STUDY WITH US" : "ESTUDE CONOSCO")}</div>
                        <div className="col-md-12 w-100 pnl-sld-mgz-index">
                            {SliderImg(dataGnrl, 100, 2000, 1000)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderElementAcademicSect = () => {
        return (<><div className="container-fluid g-0">
            <div className="row text-white g-0">
                <div className="col-md-6 col-lg-6 g-0"><a href={`/${data.language}/grado/carreras`} data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Enlace a la página de carreras universitarias" : (data.language === "en" ? "Link to the university careers page" : "Vinculação à página de cursos da universidade")}><img src={`/assets/img/${data.language === "es" ? "carreras-de-grado-uteq-es.webp" : (data.language === "en" ? "carreras-de-grado-uteq-en.webp" : "carreras-de-grado-uteq-pt.webp")}`} className="img-fluid" alt="Carreras" /></a></div>
                <div className="col-md-6 col-lg-6 g-0"><a href={`/${data.language}/posgrado`} data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Enlace a la página de programas de maestría" : (data.language === "en" ? "Link to the Master's programmes page" : "Vinculação à página dos programas de mestrado")}><img src={`/assets/img/${data.language === "es" ? "posgrado-uteq-es.webp" : (data.language === "en" ? "posgrado-uteq-en.webp" : "posgrado-uteq-pt.webp")}`} className="img-fluid" alt="Posgrado" /></a></div>
            </div>
        </div></>)
    }

    const renderElementUnivServices = () => {
        return (<><div className="ratio ratio-21x9">
            <a href={`/${data.language}/ubu/servicios`} target="_blank" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Enlace a la página de servicios universitarios" : (data.language === "en" ? "Link to the university services page" : "Vinculação à página dos serviços universitários")}>
                <img src={`/assets/img/${data.language === "es" ? "servicios-universitarios-uteq-es.webp" : (data.language === "en" ? "servicios-universitarios-uteq-en.webp" : "servicios-universitarios-uteq-pt.webp")}`} className="d-block w-100" alt="Servicios universitarios" />
            </a>
        </div><br /></>)
    }

    const renderElementMetrics = (data) => {
        const listMetrics = data.metrics;
        return (<><div className="container ctn-metrics">
            <div className="col-md-12 col-lg-12">
                <div className="row">
                    <div className="col-12 mt-3 mb-1">
                        <h4 id="title-met">{data.language === "es" ? "UTEQ en cifras" : (data.language === "en" ? "Metrics of the UTEQ" : "Métricas UTEQ")}</h4>
                    </div>
                </div>
                <div className="row mt-3">
                    {BoxMetric(listMetrics[0].total_estudiante_regular, (data.language === "es" ? "Estudiantes de grado" : (data.language === "en" ? "Undergraduate students" : "Estudantes de licenciatura")), "metrica-3.webp", 1, 3, "")}
                    {BoxMetric(listMetrics[0].total_estudiante_nivelacion, (data.language === "es" ? "Estudiantes de nivelación" : (data.language === "en" ? "Placement students" : "Estudantes de colocação")), "metrica-7.webp", 2, 3, "")}
                    {BoxMetric(listMetrics[0].total_distributivo_nivelacion + listMetrics[0].total_distributivo_regular, (data.language === "es" ? "Docentes" : (data.language === "en" ? "Teachers" : "Professores")), "metrica-2.webp", 3, 3, "")}
                    {BoxMetric(listMetrics[0].total_carrera, (data.language === "es" ? "Carreras" : (data.language === "en" ? "Careers" : "Cursos")), "metrica-5.webp", 4, 3, (`/${data.language}/grado/carreras`))}
                    {BoxMetric(listMetrics[0].total_articulos, (data.language === "es" ? "Artículos científicos" : (data.language === "en" ? "Scientific articles" : "Artigos científicos")), "metrica-4.webp", 5, 3, (`/${data.language}/investigacion/produccion-cientifica`))}
                    {BoxMetric(listMetrics[0].total_ponencias, (data.language === "es" ? "Ponencias" : (data.language === "en" ? "Presentations" : "Apresentações")), "metrica-6.webp", 6, 3, (`/${data.language}/investigacion/produccion-cientifica`))}
                    {BoxMetric(77, (data.language === "es" ? "Proyectos de Investigación" : (data.language === "en" ? "Research Projects" : "Projetos de pesquisa")), "metrica-15.webp", 7, 3, (`/${data.language}/investigacion/proyectos`))}
                    {BoxMetric(listMetrics[0].total_libros, (data.language === "es" ? "Libros publicados" : (data.language === "en" ? "Published books" : "Livros publicados")), "metrica-1.webp", 8, 3, (`/${data.language}/investigacion/libros`))}
                    {BoxMetric(listMetrics[0].total_convenios, (data.language === "es" ? "Convenios de Vinculación" : (data.language === "en" ? "Liaison Agreements" : "Convênios de Vinculação")), "metrica-8.webp", 9, 3, (`/${data.language}/vinculacion/convenios`))}
                </div>
            </div>
        </div></>)
    }

    const renderElementPresentationVideo = () => {
        return (<>
            <a href="https://tour-virtual.uteq.edu.ec/" target="_blank" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Enlace al Tour Virtual 360" : (data.language === "en" ? "Link to the 360° Virtual Tour" : "Ligação para a visita virtual de 360")}>
                <div className="ratio ratio-16x9 panel-vd">
                    <video className="bg-video" autoPlay loop muted>
                        <source src={VIDEOS_FOLDER + "tour-virtual-360.mp4"} type="video/mp4" />
                    </video>
                    <h1 className="text">{data.language === "es" ? "Tour virtual 360º - Explora y conoce la UTEQ" : (data.language === "en" ? "360º Virtual Tour - Explore and know UTEQ" : "Visita Virtual 360º - Explore e conheça a UTEQ")}
                        <img src="/assets/img/360.png" className="img-360" />
                    </h1>
                </div>
            </a>
        </>)
    }

    const renderElementPrincipalVideo = () => {
        return (<>
            <div className="ratio ratio-21x9 bg-principal-video">
                <video autoPlay loop muted>
                    <source src={VIDEOS_FOLDER + (data.language === "es" ? "video-institucional-uteq.mp4" : (data.language === "en" ? "video-institucional-uteq.mp4" : "video-institucional-uteq.mp4"))} type="video/mp4" />
                </video>
            </div>
        </>)
    }

    return (<>
        <HeadComponent
            title={data.titlepage}
            desc={data.descpage}
            url_page={data.urlpageweb}
            image={data.urlimage}
            vald_form={0}
            language={data.language} />
        {TopMenu()}
        {renderElementPrincipalVideo(data)}
        {/*SliderComponent(data)*/}
        {renderElementListCareers(data)}
        {/*renderElementListCareersCase2(data.magazines)*/}
        {renderElementSectionMain(data)}
        {renderElementLastNewsGeneral(data)}
        {renderElementAcademicSect()}
        {renderElementLastNewsResLink(data)}
        {renderElementMetrics(data)}
        {renderElementUnivServices()}
        {renderElementPresentationVideo()}
        {FooterComponent(data)}
        {(typeof data.codpage !== 'undefined') && ModalPage(data.codpage, data.language)}
    </>);

};