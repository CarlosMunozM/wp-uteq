import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { NEWS_UNIV_IMGS_FOLDER, WS_LIST_FILTER_NEWS_BY_PARAMETERS, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_VALIDATE_FORM } from 'config';
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { SliderImg } from "components";


export { BodyComunicacion };

function changeFormatMonth(mes, language) {
    switch (mes) {
        case "1":
        case "01":
            return (language === "es" ? "Ene" : (language === "en" ? "Jan" : "Jan"));
        case "2":
        case "02":
            return (language === "es" ? "Feb" : (language === "en" ? "Feb" : "Fev"));
        case "3":
        case "03":
            return (language === "es" ? "Mar" : (language === "en" ? "Mar" : "Mar"));
        case "4":
        case "04":
            return (language === "es" ? "Abr" : (language === "en" ? "Apr" : "Abr"));
        case "5":
        case "05":
            return (language === "es" ? "May" : (language === "en" ? "May" : "Mai"));
        case "6":
        case "06":
            return (language === "es" ? "Jun" : (language === "en" ? "Jun" : "Jun"));
        case "7":
        case "07":
            return (language === "es" ? "Jul" : (language === "en" ? "Jul" : "Jul"));
        case "8":
        case "08":
            return (language === "en" ? "Aug" : "Ago");
        case "9":
        case "09":
            return (language === "es" ? "Sep" : (language === "en" ? "Sep" : "Set"));
        case "10":
            return (language === "es" ? "Oct" : (language === "en" ? "Oct" : "Out"));
        case "11":
            return (language === "es" ? "Nov" : (language === "en" ? "Nov" : "Nov"));
        case "12":
            return (language === "es" ? "Dic" : (language === "en" ? "Dec" : "Dez"));
    }
}

async function make_request_ws(path_url) {
    var listTemp = null;
    const https = require('https');
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        await axios.get(path_url, { httpsAgent: agent }).then(function (response) {
            listTemp = response;
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log();
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            listTemp = null;
        })
    } catch (error) {
        console.log(error.message);
        listTemp = null;
    }

    return (listTemp);
}

function NewsPanelForPage(props) {
    return (
        <>
            {props.currentItems &&
                props.currentItems.map((item, index) => (
                    <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center" key={index}>
                        <div className="card-only-news w-100 m-2">
                            <img src={`${NEWS_UNIV_IMGS_FOLDER}${item.ntUrlPortada.trim()}`} className="card-nw-image" alt="" />
                            <div className="card-nw-bdy">
                                <div className="pnl-franja g-0 w-100 mt-2"></div>
                                <h2 className="card-nw-type g-0">{props.language==="es"?item.ntTitular.trim():(props.language==="en"?item.ntTitularEn.trim():item.ntTitularPt.trim())}</h2>
                                <div className="card-nw-title g-0 mb-3"><i className="fa fa-history"></i>&nbsp;&nbsp;{`${changeFormatMonth(item.ntFecha.substr(5, 2), props.language)} ${item.ntFecha.substr(8, 2)}, ${item.ntFecha.substr(0, 4)}`}&nbsp;<span className="badge sticker-tipo-dept" style={{ backgroundColor: `${(item.objDepartamento.dpColor !== null | item.objDepartamento.dpColor !== '') ? item.objDepartamento.dpColor : "#025a27"}` }}>{props.language==="es"?(item.objDepartamento.dpNombre.trim() !== 'Universidad' ? item.objDepartamento.dpNombre.trim() : 'Institucional'):
                                (props.language==="en"?(item.objDepartamento.dpNombreEn.trim() !== 'University' ? item.objDepartamento.dpNombreEn.trim() : 'Institutional'):(item.objDepartamento.dpNombrePt.trim() !== 'Universidade' ? item.objDepartamento.dpNombrePt.trim() : 'Institucional'))}</span></div>
                                <div className="pnl-text-news">
                                    <p className="card-nw-text">{props.language==="es"?item.ntDescripMeta.trim():(props.language==="en"?item.ntDescripMetaEn.trim():item.ntDescripMetaPt.trim())}</p>
                                </div>
                                <div className="row justify-content-center p-3">
                                    <div className="col-sm-12 col-lg-12 text-center">
                                        <a href={`/${props.language}/comunicacion/noticia/${item.ntUrlNoticia.trim()}`} target="_blank" aria-label="link noticia" data-toggle="tooltip" data-placement="bottom" title={props.language==="es"?item.ntTitular.trim():(props.language==="en"?item.ntTitularEn.trim():item.ntTitularPt.trim())} className="btn-tp"><i className="fa fa-bookmark"></i> {props.language==="es"?"Leer más":(props.language==="en"?"Read more": "Ler mais")}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}

function BodyComunicacion(data) {
    const itemsPerPage = 6;

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [endOffset, setEndOffset] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [listDepSelc, setListDepSelc] = useState([]);
    const [listCatgSelc, setListCatgSelc] = useState([]);
    const formFilterNews = useRef();

    const formOptions = { /*resolver: yupResolver(validationSchema)*/ };
    const { register, handleSubmit, reset, formState, control } = useForm(formOptions);
    const { errors } = formState;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesgForm, setMesgForm] = useState("");
    const [tpmsgForm, setTpmsgForm] = useState(0);
    const [listNewsFilter, setListNewsFilter] = useState([]);
    const [estdListNews, setEstdListNews] = useState(false);


    useEffect(() => {
        setEndOffset(itemOffset + itemsPerPage);
        setListNewsFilter(data.listnews);
        setCurrentItems(listNewsFilter.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listNewsFilter.length / itemsPerPage));
        setEstdListNews(data.listnews.length > 0);
    }, [itemOffset, itemsPerPage, listNewsFilter, endOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listNewsFilter.length;
        setItemOffset(newOffset);
    };

    const optionsDepartms = data.actdepartms.map((item) => {
        return {
            value: item.dpCodigoUnc,
            label: (data.language === "es" ? item.dpNombre.trim() : (data.language === "en" ? item.dpNombreEn.trim() : item.dpNombrePt.trim())),
            isFixed: false
        }
    });

    const optionsCategrs = data.actcategrs.map((item) => {
        return {
            value: item.gtCodigo,
            label: (data.language==="es"?item.gtTitular.trim():(data.language==="en"?item.gtTitularEn.trim():item.gtTitularPt.trim())),
            isFixed: false
        }
    });

    const handleMultiChangeSelDepart = (option, { action, removedValue }) => {

        switch (action) {
            case "remove-value":
            case "pop-value":
                const index = listDepSelc.indexOf(removedValue);

                if (index > -1) {
                    listDepSelc.splice(index, 1)
                }
                break;
            case "clear":
                setListDepSelc([]);
                break;
            case "select-option":
                if (!listDepSelc.includes(option)) {
                    setListDepSelc(option);
                }
                break;
        }
    }

    const handleMultiChangeSelCatgs = (option, { action, removedValue }) => {

        switch (action) {
            case "remove-value":
            case "pop-value":
                const index = listCatgSelc.indexOf(removedValue);

                if (index > -1) {
                    listCatgSelc.splice(index, 1)
                }
                break;
            case "clear":
                setListCatgSelc([]);
                break;
            case "select-option":
                if (!listCatgSelc.includes(option)) {
                    setListCatgSelc(option);
                }
                break;
        }
    }

    function getStringListSelect(listSelctd) {
        let result_out = "";

        listSelctd.map((item) => {
            result_out = result_out + item.value + ",";
        })

        return result_out.replace(/,\s*$/, "");
    }

    const onSubmitFormFilterNews = async () => {

        setIsSubmitting(true);
        setMesgForm('');
        setTpmsgForm(0);

        if ((listDepSelc.length > 0 && listDepSelc !== null) || (listCatgSelc.length > 0 && listCatgSelc !== null)) {

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

                                await axios.post(`${WS_VALIDATE_FORM}${token}`, { httpsAgent: agent }).then(async function (response) {
                                    if (response.data === "OK") {
                                        const resListFilterNews = await make_request_ws(`${WS_LIST_FILTER_NEWS_BY_PARAMETERS}${(listDepSelc.length > 0 ? getStringListSelect(listDepSelc) : '0')}/${(listCatgSelc.length > 0 ? getStringListSelect(listCatgSelc) : '0')}`);
                                        setItemOffset(0);
                                        setEndOffset(itemOffset + itemsPerPage);
                                        setListNewsFilter(resListFilterNews.data);
                                        setCurrentItems(resListFilterNews.data.slice(itemOffset, endOffset));
                                        setPageCount(Math.ceil(resListFilterNews.data.length / itemsPerPage));
                                        setIsSubmitting(false);
                                        setEstdListNews(resListFilterNews.data.length > 0);
                                    } else {
                                        setMesgForm(data.language === "es" ? "La validación de la herramienta Recaptcha no se completó correctamente." : (data.language === "en" ? "The validation of the Recaptcha tool was not completed correctly." : "A validação da ferramenta Recaptcha não foi concluída correctamente."));
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

        } else {
            setMesgForm(data.language === "es" ? "Debe seleccionar al menos un parámetro para la búsqueda de noticias." : (data.language === "en" ? "You must select at least one parameter for the news search." : "É necessário seleccionar pelo menos um parâmetro para a pesquisa de notícias."));
            setTpmsgForm(1);
            setIsSubmitting(false);
        }

        return false;
    }

    async function getCompleteListNews() {
        const resListFilterNews = await make_request_ws(`${WS_LIST_FILTER_NEWS_BY_PARAMETERS}0/0`);
        setItemOffset(0);
        setEndOffset(itemOffset + itemsPerPage);
        setListNewsFilter(resListFilterNews.data);
        setCurrentItems(resListFilterNews.data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(resListFilterNews.data.length / itemsPerPage));
        setIsSubmitting(false);
        setMesgForm('');
        setTpmsgForm(0);
        setListDepSelc([]);
        setListCatgSelc([]);
        setEstdListNews(resListFilterNews.data.length > 0);
    }

    return (<>
        <div className="row g-0">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Noticias UTEQ" : (data.language === "en" ? "UTEQ News" : "Notícias da UTEQ")}</h2>
            <div className="col-md-12 mt-3 pnl-form-filter-news" ref={formFilterNews}>
                <form className="form-card-filter frm-filter" onSubmit={handleSubmit(onSubmitFormFilterNews)}>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-12 flex-column d-flex">
                            <button type="button" disabled={isSubmitting} className="btn-all-data" onClick={getCompleteListNews} data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ver listado completo" : (data.language === "en" ? "See complete list" : "Ver lista completa")}>
                                <i className="fa fa-table fa-1x" aria-hidden="true"></i>&nbsp;{data.language === "es" ? "Ver listado completo" : (data.language === "en" ? "See complete list" : "Ver lista completa")}
                            </button>
                        </div>
                    </div>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-7 col-xl-7 col-xxl-7 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-departm">{data.language === "en" ? "Department" : "Departamento"}</label>
                            <Select
                                name="ftDepartamento"
                                id="slct-departm"
                                inputId='slct-departm'
                                instanceId="slct-departm"
                                placeholder={data.language === "es" ? "Búsqueda de Departamento" : (data.language === "en" ? "Department Search" : "Pesquisa de departamento")}
                                className={`form-select-1 form-select-lg`}
                                classNamePrefix="form-select-1"
                                components={makeAnimated()}
                                onChange={handleMultiChangeSelDepart}
                                value={listDepSelc}
                                isClearable={true}
                                closeMenuOnSelect={false}
                                isMulti
                                options={optionsDepartms}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-categoria">{data.language === "es" ? "Categoría" : (data.language === "en" ? "Category" : "Categoria")}</label>
                            <Select
                                name="ftCategoria"
                                id="slct-categoria"
                                inputId='slct-categoria'
                                instanceId="slct-categoria"
                                placeholder={data.language === "es" ? "Búsqueda de categorías" : (data.language === "en" ? "Search for categories" : "Procurar por categorias")}
                                className={`form-select-1 form-select-lg`}
                                classNamePrefix="form-select-1"
                                components={makeAnimated()}
                                onChange={handleMultiChangeSelCatgs}
                                value={listCatgSelc}
                                isClearable={true}
                                closeMenuOnSelect={false}
                                isMulti
                                options={optionsCategrs}
                            />
                        </div>
                        <div className="form-group col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 flex-column d-flex mx-auto">
                            <button type="submit" disabled={isSubmitting} className="btn-block-area" style={{ height: "38px", marginTop: "27px" }}>
                                {isSubmitting ? (<><span className="spinner-border spinner-border-sm mr-1"></span>&nbsp;{data.language === "es" ? "Espere" : (data.language === "en" ? "Wait for" : "Esperar por")}</>) : (<><i className="fa fa-search fa-1x" aria-hidden="true"></i>&nbsp;{data.language === "es" ? "Buscar" : (data.language === "en" ? "Search" : "Pesq..")}</>)}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-md-12 mt-3">
                {
                    mesgForm != "" && (
                        <div className="row justify-content-end g-0 mt-2">
                            <div className={`alert ${tpmsgForm == 1 ? 'alert-danger' : (tpmsgForm == 2 ? 'alert-success' : '')} alert-form alert-dismissible fade show`} role="alert">
                                {mesgForm}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="col-md-12 mt-3">
                <div className="row d-flex justify-content-center align-items-center g-0">
                    {
                        estdListNews ? (<NewsPanelForPage currentItems={currentItems} language={data.language} />) : (<div className="ratio ratio-21x9">
                            <img src={`/assets/img/${data.language === "es" ? "busqueda-de-noticias-uteq-es.webp" : (data.language === "en" ? "busqueda-de-noticias-uteq-en.webp" : "busqueda-de-noticias-uteq-pt.webp")}`} className="d-block w-100" alt={data.language === "es" ? "Noticias" : (data.language === "en" ? "News" : "Notícias")} />
                        </div>)
                    }
                </div>
                <div className="row mt-3">
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
                </div>
            </div>
            <div className="col-md-12">
                <h2 className="title-cont-page text-rigth mt-3">{data.language === "es" ? "UTEQ en Twitter |" : (data.language === "en" ? "UTEQ Twitter |" : "UTEQ e Twitter |")}
                    <a className="twitter-follow-button" data-lang="es" data-show-count="false" data-show-screen-name="false"
                        href="https://twitter.com/utequevedo">
                        {data.language === "en" ? "Follow" : "Seguir"}</a>
                </h2>
                <div className="row">
                    <div className="col-md-12">
                        {(data.listposts !== null && data.listposts !== "") && SliderImg(data.listposts, 22, 2000, 900)}
                    </div>
                </div>
            </div>
        </div >
    </>);

}