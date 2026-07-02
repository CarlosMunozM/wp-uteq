import {
    WS_LIST_FILTER_DATA_MENU, WS_LIST_FILTER_DATA_SUBMENU, WS_LIST_FILTER_DATA_NEWS, WS_LIST_FILTER_DATA_VIDEO, WS_LIST_FILTER_DATA_NEWSPAPER, WS_LIST_FILTER_DATA_MAGAZINE, WS_LIST_FILTER_DATA_FILE, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_VALIDATE_FORM,
    LOGOS_FOLDER, FILES_UNIV_DOCS_FOLDER, FORMATS_DOCS_FOLDER, REND_CTAS_DOCS_FOLDER, LOTAIP_DOCS_FOLDER, COOP_INTERNC_DOCS_FOLDER, PLANF_UNIV_DOCS_FOLDER, RGL_NRM_DOCS_FOLDER, LOGST_DOCS_FOLDER, TRAB_SOC_UBU_DOCS_FOLDER, PSIC_UBU_DOCS_FOLDER,
    WS_LIST_ITEMS_FILTER_SGA, WS_LIST_CAREERS_BY_TEXT, WS_LIST_INFORMATION_AUT_BY_PARAM
} from 'config';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';

export { BodyBusq };

function PanelsResults(props) {
    return (<>
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 pnl-box-info-link">
            {
                (props.enlace === "" || props.enlace === null || props.enlace === "#") ? (<div className="p-3 pnl-box-information">
                    <div className="row">
                        <h3 className="pnl-box-sect-title">{props.titulo}</h3>
                    </div>
                    <div className="row pnl-box-body">
                        <p><span className="badge bg-success"><i className={props.icono} aria-hidden="true"></i>&nbsp;&nbsp;{props.descripcion}</span></p>
                    </div>
                </div>) : (<a href={props.enlace.trim()} target={"_blank"}>
                    <div className="p-3 pnl-box-information">
                        <div className="row">
                            <h3 className="pnl-box-sect-title">{props.titulo}</h3>
                        </div>
                        <div className="row pnl-box-body">
                            <p><span className="badge bg-success"><i className={props.icono} aria-hidden="true"></i>&nbsp;&nbsp;{props.descripcion}</span></p>
                        </div>
                    </div>
                </a>)
            }
        </div>
    </>);
}

function BodyBusq(data) {

    const formBusqueda = useRef();
    const validationSchema = Yup.object().shape({
        scBusqueda: Yup.string().required(data.language === "es" ? "El campo es requerido" : (data.language === "en" ? "The field is required" : "O campo é obrigatório")).min(3, data.language === "es" ? "La longitud mínima de carácteres es 3" : (data.language === "en" ? "The minimum character length is 3" : "O comprimento mínimo dos caracteres é 3")).max(200, data.language === "es" ? "La longitud máxima de carácteres es 200" : (data.language === "en" ? "The maximum character length is 200" : "O comprimento máximo de caracteres é de 200"))
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesgForm, setMesgForm] = useState("");
    const [tpmsgForm, setTpmsgForm] = useState(0);
    const [fraseBusq, setFraseBusq] = useState("");
    const [listFinalSuggestion, setListFinalSuggestion] = useState([]);
    const itemsPerPage = 21;
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [endOffset, setEndOffset] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [estdListNews, setEstdListNews] = useState(false);
    const [estdInicial, setEstdInicial] = useState(true);


    useEffect(() => {
        setEndOffset(itemOffset + itemsPerPage);
        setCurrentItems(listFinalSuggestion.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listFinalSuggestion.length / itemsPerPage));
        setEstdListNews(listFinalSuggestion.length > 0);
    }, [itemOffset, itemsPerPage, endOffset, listFinalSuggestion]);

    const listItemsResult = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (<PanelsResults key={uuidv4()} enlace={item.enlace} titulo={item.titulo} icono={item.icono} descripcion={item.descripcion} />);
            })
        )
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listFinalSuggestion.length;
        setItemOffset(newOffset);
    };

    const handleChange = event => {
        setFraseBusq(event.target.value);
    };

    function changeFormatMonth(mes, language) {
        switch (mes) {
            case 1:
                return (language === "es" ? "Enero" : (language === "en" ? "January" : "Janeiro"));
            case 2:
                return (language === "es" ? "Febrero" : (language === "en" ? "February" : "Fevereiro"));
            case 3:
                return (language === "es" ? "Marzo" : (language === "en" ? "March" : "Março"));
            case 4:
                return (language === "es" ? "Abril" : (language === "en" ? "April" : "Abril"));
            case 5:
                return (language === "es" ? "Mayo" : (language === "en" ? "May" : "Maio"));
            case 6:
                return (language === "es" ? "Junio" : (language === "en" ? "June" : "Junho"));
            case 7:
                return (language === "es" ? "Julio" : (language === "en" ? "July" : "Julho"));
            case 8:
                return (language === "en" ? "August" : "Agosto");
            case 9:
                return (language === "es" ? "Septiembre" : (language === "en" ? "September" : "Setembro"));
            case 10:
                return (language === "es" ? "Octubre" : (language === "en" ? "October" : "Outubro"));
            case 11:
                return (language === "es" ? "Noviembre" : (language === "en" ? "November" : "Novembro"));
            case 12:
                return (language === "es" ? "Diciembre" : (language === "en" ? "December" : "Dezembro"));
        }
    }

    function getLinkNameFile(itemRs) {
        var output = "";

        switch (itemRs.arTipoImg.trim()) {
            case 'LOGOT':
                output = `${LOGOS_FOLDER}png/${itemRs.arUrlPNG.trim()}`;
                break;
            case 'ARCHV':
                output = `${FILES_UNIV_DOCS_FOLDER}${itemRs.arUrlDocumento.trim()}`;
                break;
            case 'FORSL':
                output = `${FORMATS_DOCS_FOLDER}${itemRs.arUrlDocumento.trim()}`;
                break;
            case 'RENCT':
                output = `${REND_CTAS_DOCS_FOLDER}${itemRs.arAnio}/${itemRs.arUrlDocumento.trim()}`;
                break;
            case 'TRSPR':
                output = `${LOTAIP_DOCS_FOLDER}${itemRs.arAnio}/${changeFormatMonth(itemRs.arMes, "es")}/${itemRs.arUrlDocumento.trim()}`;
                break;
            case 'COOPI':
                output = `${COOP_INTERNC_DOCS_FOLDER}${itemRs.arUrlDocumento.trim()}`;
                break;
            case 'PLNUN':
                output = `${PLANF_UNIV_DOCS_FOLDER}${itemRs.arUrlDocumento.trim()}`;
                break;
            case 'REGNM':
                output = `${RGL_NRM_DOCS_FOLDER}${itemRs.arUrlDocumento.trim()}`;
                break;
            case 'LOGST':
                output = `${LOGST_DOCS_FOLDER}${itemRs.arUrlDocumento.trim()}`;
                break;
            case 'TRBSC':
                output = `${TRAB_SOC_UBU_DOCS_FOLDER}${itemRs.arUrlDocumento.trim()}`;
                break;
            case 'PSICG':
                output = `${PSIC_UBU_DOCS_FOLDER}${itemRs.arUrlDocumento.trim()}`;
                break;
            case 'RESLS':
                output = `${FILES_UNIV_DOCS_FOLDER}${itemRs.arUrlDocumento.trim()}`;
                break;
        }

        return (output);
    }

    async function getDataSearchByType(pathWS, words) {
        var listTemp = [];

        try {
            await axios.get(`${pathWS}${words}`).then(function (response) {
                listTemp = response.data;
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
                listTemp = [];
            })
        } catch (error) {
            console.log(error.message);
            listTemp = [];
        }

        return (listTemp);
    }

    async function generateDataSetResult(fraseIng) {
        var cadenaBusq = "", listFlt5 = null, listFlt6 = null, dataIngs = [];
        var listAuxData = [];

        const listFlt1 = await getDataSearchByType(WS_LIST_ITEMS_FILTER_SGA, "tipo=1&busqueda=" + fraseIng);
        const listFlt2 = await getDataSearchByType(WS_LIST_FILTER_DATA_SUBMENU, fraseIng);
        const listFlt3 = await getDataSearchByType(WS_LIST_FILTER_DATA_NEWS, fraseIng);
        const listFlt4 = await getDataSearchByType(WS_LIST_FILTER_DATA_VIDEO, fraseIng);
        const listFlt7 = await getDataSearchByType(WS_LIST_FILTER_DATA_FILE, fraseIng);
        const listFlt8 = await getDataSearchByType(WS_LIST_ITEMS_FILTER_SGA, "tipo=2&busqueda=" + fraseIng);
        const listFlt9 = await getDataSearchByType(WS_LIST_ITEMS_FILTER_SGA, "tipo=3&busqueda=" + fraseIng);
        const listFlt10 = await getDataSearchByType(WS_LIST_ITEMS_FILTER_SGA, "tipo=4&busqueda=" + fraseIng);
        const listFlt11 = await getDataSearchByType(WS_LIST_FILTER_DATA_MENU, fraseIng);
        const listFlt12 = await getDataSearchByType(WS_LIST_CAREERS_BY_TEXT, fraseIng);
        //const listFlt13 = await getDataSearchByType(WS_LIST_INFORMATION_AUT_BY_PARAM, fraseIng);



        cadenaBusq = fraseIng.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

        if (cadenaBusq.includes("periodico") || cadenaBusq.includes("newspaper") || cadenaBusq.includes("jornal")) {
            listFlt5 = await getDataSearchByType(5, WS_LIST_FILTER_DATA_NEWSPAPER);

            if (listFlt5.length > 0) {
                listFlt5.map((item) => {
                    dataIngs = {
                        titulo: `${data.language === "es" ? "Periódico" : (data.language === "en" ? "Newspaper" : "Jornal")} ${changeFormatMonth(item.mes, data.language)}, ${item.anio}`,
                        descripcion: `${data.language === "es" ? "Edición de periódico" : (data.language === "en" ? "Newspaper edition" : "Edição de jornal")}`,
                        enlace: item.urlpw.trim()
                    }
                    listAuxData = [dataIngs, ...listAuxData];
                });
            }
        }

        if (cadenaBusq.includes("revista") || cadenaBusq.includes("magazine")) {
            listFlt6 = await getDataSearchByType(6, WS_LIST_FILTER_DATA_MAGAZINE);
            if (listFlt6.length > 0) {
                listFlt6.map((item) => {
                    dataIngs = {
                        titulo: item.dmDescripcion.trim(),
                        descripcion: (data.language === "es" ? "Revista científica" : (data.language === "en" ? "Scientific journal" : "Jornal científico")),
                        enlace: item.dmUrlPagWeb.trim(),
                        icono: 'fa fa-newspaper-o'
                    }
                    listAuxData = [dataIngs, ...listAuxData];
                });
            }
        }

        if (listFlt1.length > 0) {
            listFlt1.map((item) => {
                dataIngs = {
                    titulo: item.titulo.trim(),
                    descripcion: (data.language === "es" ? "Libro" : (data.language === "en" ? "Book" : "Livro")),
                    enlace: `/${data.language}/investigacion/libro/${item.id}`,
                    icono: 'fa fa-book'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });
        }

        if (listFlt2.length > 0) {
            listFlt2.map((item) => {
                dataIngs = {
                    titulo: (data.language === "es" ? item.smNombre.trim() : (data.language === "en" ? item.smNombreEn.trim() : item.smNombrePt.trim())),
                    descripcion: (data.language === "es" ? "Página web" : (data.language === "en" ? "Website" : "Sítio Web")),
                    enlace: item.smUrlAsoc.trim(), // falta incluir idioma 
                    icono: 'fa fa-globe'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });
        }

        if (listFlt3.length > 0) {
            listFlt3.map((item) => {
                dataIngs = {
                    titulo: (data.language === "es" ? item.ntTitular.trim() : (data.language === "en" ? item.ntTitularEn.trim() : item.ntTitularPt.trim())),
                    descripcion: (data.language === "es" ? "Noticia" : (data.language === "en" ? "News" : "Notícias")),
                    enlace: `/${data.language}/comunicacion/noticia/${item.ntUrlNoticia.trim()}`,
                    icono: 'fa fa-id-card-o'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });
        }

        if (listFlt4.length > 0) {
            listFlt4.map((item) => {
                dataIngs = {
                    titulo: (data.language === "es" ? item.titulo.trim() : (data.language === "en" ? item.tituloEn.trim() : item.tituloPt.trim())),
                    descripcion: (data.language === "es" ? "Video institucional" : (data.language === "en" ? "Institutional video" : "Vídeo institucional")),
                    enlace: item.urlvideo1.trim(),
                    icono: 'fa fa-video-camera'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });
        }

        if (listFlt7.length > 0) {
            listFlt7.map((item) => {
                dataIngs = {
                    titulo: (data.language==="es"?item.arDescripcion.trim():(data.language==="en"?item.arDescripcionEn.trim():item.arDescripcionPt.trim())),
                    descripcion: (data.language === "es" ? "Archivo institucional" : (data.language === "en" ? "Institutional archive" : "Arquivo institucional")),
                    enlace: getLinkNameFile(item),
                    icono: 'fa fa-file-text'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });
        }

        if (listFlt8.length > 0) {
            listFlt8.map((item) => {
                dataIngs = {
                    titulo: item.titulo.trim(),
                    descripcion: (data.language === "es" ? "Capítulo de libro" : (data.language === "en" ? "Book chapter" : "Capítulo de livro")),
                    enlace: `/${data.language}/investigacion/capitulo/${item.id}`,
                    icono: 'fa fa-microchip'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });
        }

        if (listFlt9.length > 0) {
            listFlt9.map((item) => {
                dataIngs = {
                    titulo: item.titulo.trim(),
                    descripcion: (data.language === "es" ? "Artículo científico" : (data.language === "en" ? "Scientific article" : "Artigo científico")),
                    enlace: `/${data.language}/investigacion/articulo/${item.id}`,
                    icono: 'fa fa-bookmark'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });
        }

        if (listFlt10.length > 0) {
            listFlt10.map((item) => {
                dataIngs = {
                    titulo: item.titulo.trim(),
                    descripcion: (data.language === "es" ? "Ponencia" : (data.language === "en" ? "Paper" : "Papel")),
                    enlace: `/${data.language}/investigacion/ponencia/${item.id}`,
                    icono: 'fa fa-users'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });
        }

        if (listFlt11.length > 0) {
            listFlt11.map((item) => {
                dataIngs = {
                    titulo: (data.language==="es"?item.mnNombre.trim():(data.language==="en"?item.mnNombreEn.trim():item.mnNombrePt.trim())),
                    descripcion: (data.language === "es" ? "Página web" : (data.language === "en" ? "Website" : "Sítio Web")),
                    enlace: item.mnUrlAsoc.trim(),
                    icono: 'fa fa-globe'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });
        }

        if (listFlt12.length > 0) {
            listFlt12.map((item) => {
                dataIngs = {
                    titulo: (data.language==="es"?item.crNombre.trim():(data.language==="en"?item.crNombreEn.trim():item.crNombrePt.trim())),
                    descripcion: (data.language === "es" ? "Página web" : (data.language === "en" ? "Website" : "Sítio Web")),
                    enlace: (item.crDepartamento.dpEsFacultad.trim() === "S" ? `/${data.language}/grado/carrera/${item.crUrlParcial.trim()}` : `/${data.language}/posgrado/${item.crUrlParcial.trim()}`),
                    icono: 'fa fa-globe'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });
        }

        /*if (listFlt13.length > 0) {

            const listFlt13Dist = [...new Map(listFlt13.map(item =>
                [item["auCorreoElect"], item])).values()];

            listFlt13Dist.map((item) => {
                dataIngs = {
                    titulo: item.auNombres.trim() + " " + item.auApellidos.trim(),
                    descripcion: item.auCorreoElect.trim(),
                    enlace: "#",
                    icono: 'fa fa-user-circle-o'
                }
                listAuxData = [dataIngs, ...listAuxData];
            });

        }*/

        if (listAuxData.length > 0) {
            setListFinalSuggestion(listAuxData.sort((a, b) => (a.titulo > b.titulo) ? 1 : -1));
            setItemOffset(0);
            setEndOffset(itemOffset + itemsPerPage);
            setCurrentItems(listAuxData.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listAuxData.length / itemsPerPage));
            setEstdListNews(true);
        } else {
            setListFinalSuggestion([]);
            setItemOffset(0);
            setEndOffset(0);
            setCurrentItems([]);
            setPageCount(0);
            setEstdListNews(false);
        }

        setMesgForm("");
        setTpmsgForm(0);
        setIsSubmitting(false);

    }

    const onSubmitFormBusqueda = async () => {
        var message = '';

        setEstdInicial(false);
        setIsSubmitting(true);
        setMesgForm("");
        setTpmsgForm(0);

        setListFinalSuggestion([]);
        setEstdListNews(false);

        try {
            window.grecaptcha.ready(() => {
                window.grecaptcha
                    .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
                    .then(async (token) => {
                        try {
                            const https = require('https');
                            const agent = new https.Agent({
                                rejectUnauthorized: false
                            });

                            await axios.post(`${WS_VALIDATE_FORM}${token}`, { httpsAgent: agent }).then(function (response) {
                                if (response.data === "OK") {
                                    generateDataSetResult(fraseBusq);
                                } else {
                                    message = (data.language === "es" ? "La validación de la herramienta Recaptcha no se completó correctamente." : (data.language === "en" ? "The validation of the Recaptcha tool was not completed correctly." : "A validação da ferramenta Recaptcha não foi concluída correctamente."));
                                    setMesgForm(message);
                                    setTpmsgForm(1);
                                    setIsSubmitting(false);
                                }
                            }).catch(function (error) {
                                setMesgForm(error);
                                setTpmsgForm(1);
                                setIsSubmitting(false);
                            })
                        } catch (error) {
                            setMesgForm(error.message);
                            setTpmsgForm(1);
                            setIsSubmitting(false);
                        }
                    }).catch((error) => {
                        setMesgForm(error.message);
                        setTpmsgForm(1);
                        setIsSubmitting(false);
                    });
            });
        } catch (error) {
            setMesgForm(error.message);
            setTpmsgForm(1);
            setIsSubmitting(false);
        }

        return false;
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())}</h2>
            <div className="col-md-12 w-100 mt-2" ref={formBusqueda}>
                <form className="form-card" onSubmit={handleSubmit(onSubmitFormBusqueda)}>
                    <div className="row d-flex align-items-center text-left">
                        <div className="form-group col-12 col-sm-12 col-md-8 col-lg-10 col-xl-10 col-xxl-10 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="txtbusqueda" style={{ display: "none" }}>.</label>
                            <input type="text" id="txtbusqueda" className={`form-control ${errors.scBusqueda ? 'is-invalid' : ''} mt-1`} name="scBusqueda" {...register('scBusqueda')} onChange={handleChange} placeholder={data.language === "es" ? "Páginas, noticias, resúmenes semanales, entre otros" : (data.language === "en" ? "Pages, news, weekly summaries, etc." : "Páginas, notícias, resumos semanais, etc.")} minLength={3} maxLength={200} value={fraseBusq} data-error={data.language === "es" ? "El campo es requerido" : (data.language === "en" ? "The field is required" : "O campo é obrigatório")} />
                            <div className="invalid-feedback">{errors.scBusqueda?.message}</div>
                        </div>
                        <div className="form-group col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 flex-column d-flex mx-auto">
                            <button type="submit" disabled={isSubmitting} className="btn-block-area mx-auto mt-1" style={{ height: "38px", width: "150px" }}>
                                {
                                    isSubmitting ? (<>
                                        <span className="spinner-border spinner-border-sm mr-1"></span>&nbsp;&nbsp;{data.language === "es" ? "Buscando" : (data.language === "en" ? "Searching" : "Procurar")}
                                    </>) : (<>
                                        <i className="fa fa-search" aria-hidden="true"></i>&nbsp;&nbsp;{data.language === "es" ? "Buscar" : (data.language === "en" ? "Search" : "Pesquisar")}
                                    </>)
                                }
                            </button>
                        </div>
                    </div>
                    {
                        mesgForm != "" && (
                            <div className="row justify-content-end g-0 mt-2">
                                <div className={`alert ${tpmsgForm == 1 ? 'alert-danger' : (tpmsgForm == 2 ? 'alert-success' : '')} alert-form`} role="alert">
                                    {mesgForm}
                                </div>
                            </div>
                        )
                    }
                </form>
            </div>
            <hr className="mt-2" />
            <div className="col-md-12 w-100 mt-2">
                <div className="row g-2">
                    {
                        estdListNews ? (
                            currentItems && listItemsResult(currentItems)
                        ) : (
                            isSubmitting ? (<div className="col-md-12 mt-3 pnl-form-filter-news">
                                <h2 className="title-cont-page text-center mt-2">
                                    <span className="spinner-border spinner-border-sm mr-1"></span>&nbsp;&nbsp;{data.language === "es" ? "Buscando información en la base de conocimientos..." : (data.language === "en" ? "Searching for information in the knowledge base..." : "Procurar informações na base de conhecimentos...")}
                                </h2>
                            </div>) : (<div className="row g-0">
                                {
                                    estdInicial ? (<div className="col-md-12 mt-3 pnl-form-filter-news"></div>) : (<div className="col-md-12 mt-3 pnl-form-filter-news">
                                        <h2 className={`msg-pnl-search text-center mt-2${mesgForm !== "" && " text-danger"}`}><i className={`fa ${mesgForm !== "" ? "fa-exclamation-triangle" : "fa-inbox"}`} aria-hidden="true"></i>&nbsp;{mesgForm !== "" ? mesgForm : (data.language === "es" ? "No se encontraron resultados para tu búsqueda" : (data.language === "en" ? "No results were found for your search" : "Não foram encontrados resultados para a sua pesquisa"))}</h2>
                                    </div>)
                                }
                            </div>)
                        )
                    }
                </div>
                {
                    (estdListNews && listFinalSuggestion.length > itemsPerPage) && (<div className="row mt-3">
                        <div className="col-md-12 d-flex justify-content-center">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="<"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null} />
                        </div>
                    </div>)
                }
            </div>
        </div>
    </>)

}