import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { NEWS_UNIV_IMGS_FOLDER, WS_LIST_FILTER_NEWS_DEP_BY_PARAMETERS, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_VALIDATE_FORM, WS_LIST_FILTER_NEWS_BY_PARAMETERS } from 'config';
import Link from 'next/link';
import axios from "axios";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';


export { PanelNews };


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

function NewsPanelForPage(props) {
    return (
        <>
            {props.currentItems ?
                props.currentItems.map((item, index) => (
                    <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center" key={index}>
                        <div className="card-only-news w-100 m-2">
                            <img src={`${NEWS_UNIV_IMGS_FOLDER}${item.ntUrlPortada.trim()}`} className="card-nw-image" alt="" />
                            <div className="card-nw-bdy">
                                <div className="pnl-franja g-0 w-100 mt-2"></div>
                                <h2 className="card-nw-type g-0">{props.language==="es"?item.ntTitular.trim():(props.language==="en"?item.ntTitularEn.trim():item.ntTitularPt.trim())}</h2>
                                <div className="card-nw-title g-0 mb-3"><i className="fa fa-history"></i>&nbsp;&nbsp;{`${changeFormatMonth(item.ntFecha.substr(5, 2),props.language)} ${item.ntFecha.substr(8, 2)}, ${item.ntFecha.substr(0, 4)}`}&nbsp;<span className="badge sticker-tipo-dept" style={{ backgroundColor: "#025a27" }}>{props.language==="es"?(item.objCategoriaNotc.gtTitular.trim() !== 'Universidad' ? item.objCategoriaNotc.gtTitular.trim() : 'Institucional'):
                                (props.language==="en"?(item.objCategoriaNotc.gtTitularEn.trim() !== 'University' ? item.objCategoriaNotc.gtTitularEn.trim() : 'Institutional'):
                                (item.objCategoriaNotc.gtTitularPt.trim() !== 'Universidade' ? item.objCategoriaNotc.gtTitularPt.trim() : 'Institucional'))}</span></div>
                                <div className="pnl-text-news">
                                    <p className="card-nw-text">{props.language==="es"?item.ntDescripMeta.trim():(props.language==="en"?item.ntDescripMetaEn.trim():item.ntDescripMetaPt.trim())}</p>
                                </div>
                                <div className="row justify-content-center p-3">
                                    <div className="col-sm-12 col-lg-12 text-center">
                                        <Link href={`/${props.language}/comunicacion/noticia/${item.ntUrlNoticia.trim()}`}>
                                            <a target="_blank" aria-label="link noticia" data-toggle="tooltip" data-placement="bottom" title={props.language==="es"?item.ntTitular.trim():(props.language==="en"?item.ntTitularEn.trim():item.ntTitularPt.trim())} 
                                            className="btn-tp"><i className="fa fa-bookmark"></i> {props.language==="es"?"Leer más":(props.language==="en"?"Read more":"Ler mais")}</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )):""}
        </>
    );
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

function PanelNews(data_news, list_ctgs, cod_dep) {

    const itemsPerPage = 4;

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [endOffset, setEndOffset] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [listNewsFilter, setListNewsFilter] = useState((data_news !== null && data_news !== "") ? data_news : []);
    const [estdListNews, setEstdListNews] = useState(false);
    const [listCatgSelc, setListCatgSelc] = useState([]);
    const [listAnioSelc, setListAnioSelc] = useState([]);
    const formFilterNews = useRef();
    const formOptions = { /*resolver: yupResolver(validationSchema)*/ };
    const { register, handleSubmit, reset, formState, control } = useForm(formOptions);
    const { errors } = formState;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesgForm, setMesgForm] = useState("");
    const [tpmsgForm, setTpmsgForm] = useState(0);
    const router = useRouter();



    useEffect(() => {
        setEndOffset(itemOffset + itemsPerPage);
        setCurrentItems(listNewsFilter.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listNewsFilter.length / itemsPerPage));
        setEstdListNews(listNewsFilter.length > 0);
    }, [itemOffset, itemsPerPage, listNewsFilter, endOffset]);



    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listNewsFilter.length;
        setItemOffset(newOffset);
    };

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

    const handleMultiChangeSelYears = (option, { action, removedValue }) => {
        switch (action) {
            case "remove-value":
            case "pop-value":
                const index = listAnioSelc.indexOf(removedValue);

                if (index > -1) {
                    listAnioSelc.splice(index, 1)
                }
                break;
            case "clear":
                setListAnioSelc([]);
                break;
            case "select-option":
                if (!listAnioSelc.includes(option)) {
                    setListAnioSelc(option);
                }
                break;
        }
    }

    function getListNewsYears() {
        const currentYear = new Date().getFullYear(), firstYear = 2015;
        var listYs = [];

        try {
            listYs = Array(currentYear - firstYear + 1).fill().map((_, idx) => firstYear + idx);
        } catch (error) {
            listYs = [];
            console.error(error);
        }

        return listYs;
    }

    const optionsCategrs = list_ctgs.map((item) => {
        return {
            value: item.gtCodigo,
            label: (router.locale === "es" ? item.gtTitular.trim() : (router.locale === "en" ? item.gtTitularEn.trim() : item.gtTitularPt.trim())),
            isFixed: false
        }
    });

    const optionsYears = getListNewsYears().map((item) => {
        return {
            value: item,
            label: item,
            isFixed: false
        }
    });

    function getStringListSelect(listSelctd) {
        let result_out = "";

        listSelctd.map((item) => {
            result_out = result_out + item.value + ",";
        })

        return result_out.replace(/,\s*$/, "");
    }

    const onSubmitFormFilterNews = async () => {

        setIsSubmitting(true);
        setMesgForm("");
        setTpmsgForm(0);
        setListNewsFilter([]);
        setEstdListNews(false);

        if ((listCatgSelc.length > 0 && listCatgSelc !== null) || (listAnioSelc.length > 0 && listAnioSelc !== null)) {

            try {
                window.grecaptcha.ready(() => {
                    window.grecaptcha
                        .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
                        .then(async (token) => {
                            try {
                                await axios.post(`${WS_VALIDATE_FORM}${token}`).then(async function (response) {
                                    if (response.data === "OK") {
                                        getNewsFilterByParameters();
                                    } else {
                                        setMesgForm(router.locale==="es"?"La validación de la herramienta Recaptcha no se completó correctamente.":(router.locale==="en"?"The validation of the Recaptcha tool was not completed correctly.":"A validação da ferramenta Recaptcha não foi concluída correctamente."));
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
            setMesgForm(router.locale==="es"?"Debe seleccionar al menos un parámetro para la búsqueda de noticias.":(router.locale==="en"?"You must select at least one parameter for the news search.":"É necessário seleccionar pelo menos um parâmetro para a pesquisa de notícias."));
            setTpmsgForm(1);
            setIsSubmitting(false);
        }

        return false;

    }

    async function getNewsFilterByParameters() {
        const resListFilterNewsDep = await make_request_ws(`${WS_LIST_FILTER_NEWS_DEP_BY_PARAMETERS}${cod_dep}/${(listCatgSelc.length > 0 ? getStringListSelect(listCatgSelc) : '0')}/${(listAnioSelc.length > 0 ? getStringListSelect(listAnioSelc) : '0')}`);

        if (resListFilterNewsDep.data !== null && resListFilterNewsDep.data !== "") {
            if (resListFilterNewsDep.data.length > 0) {
                setListNewsFilter(resListFilterNewsDep.data);
                setItemOffset(0);
                setEndOffset(itemOffset + itemsPerPage);
                setCurrentItems(resListFilterNewsDep.data.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(resListFilterNewsDep.data.length / itemsPerPage));
                setEstdListNews(true);
            } else {
                setListNewsFilter([]);
                setItemOffset(0);
                setEndOffset(0);
                setCurrentItems([]);
                setPageCount(0);
                setEstdListNews(false);
            }
        } else {
            setListNewsFilter([]);
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

    return (<>
        <div className="col-md-12 mt-3 pnl-form-filter-news-dep" ref={formFilterNews}>
            <form className="form-card-filter frm-filter" onSubmit={handleSubmit(onSubmitFormFilterNews)}>
                <div className="row justify-content-between text-left">
                    <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-5 flex-column d-flex">
                        <label className="form-control-label px-3" htmlFor="slct-categoria">{router.locale==="es"?"Categoría":(router.locale==="en"?"Category":"Categoria")}</label>
                        <Select
                            name="ftCategoria"
                            id="slct-categoria"
                            instanceId="slct-categoria"
                            inputId='slct-categoria'
                            placeholder={router.locale==="es"?"Búsqueda de categorías":(router.locale==="en"?"Search for categories":"Procurar por categorias")}
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
                    <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 flex-column d-flex">
                        <label className="form-control-label px-3" htmlFor="slct-anio">{router.locale==="es"?"Año":(router.locale==="en"?"Year":"Ano")}</label>
                        <Select
                            name="ftAnio"
                            id="slct-anio"
                            instanceId="slct-anio"
                            inputId='slct-anio'
                            placeholder={router.locale==="es"?"Búsqueda de años":(router.locale==="en"?"Search for years":"Procurar por anos")}
                            className={`form-select-1 form-select-lg`}
                            classNamePrefix="form-select-1"
                            components={makeAnimated()}
                            onChange={handleMultiChangeSelYears}
                            value={listAnioSelc}
                            isClearable={true}
                            closeMenuOnSelect={false}
                            isMulti
                            options={optionsYears}
                        />
                    </div>
                    <div className="form-group col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 flex-column d-flex">
                        <button type="submit" disabled={isSubmitting} className="btn-block-area" style={{ height: "38px", marginTop: "27px" }}>
                            {isSubmitting ? (<><span className="spinner-border spinner-border-sm mr-1"></span>&nbsp;{router.locale==="es"?"Espere":(router.locale==="en"?"Wait..":"Espe..")}</>) : (<><i className="fa fa-search fa-1x" aria-hidden="true"></i>&nbsp;{router.locale==="es"?"Buscar":(router.locale==="en"?"Search":"Pesq..")}</>)}
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
        <div className="col-md-12 g-0">
            <div className="row d-flex justify-content-center align-items-center g-0">
                {
                    estdListNews ? (<NewsPanelForPage currentItems={currentItems} language={router.locale} />) : (
                        isSubmitting ? (<div className="col-md-12 mt-3 pnl-form-filter-news">
                            <h2 className="title-cont-page text-center mt-2">
                                <span className="spinner-border spinner-border-sm mr-1"></span>&nbsp;&nbsp;{router.locale==="es"?"Buscando información en la base de conocimientos...":(router.locale==="en"?"Searching for information in the knowledge base...":"Procurar informações na base de conhecimentos...")}
                            </h2>
                        </div>) : (<div className="col-md-12 mt-3 pnl-form-filter-news">
                            <h2 className={`msg-pnl-search text-center mt-2${mesgForm !== "" && " text-danger"}`}><i className={`fa ${mesgForm !== "" ? "fa-exclamation-triangle" : "fa-inbox"}`} aria-hidden="true"></i>&nbsp;{mesgForm !== "" ? mesgForm : (router.locale==="es"?"No se encontraron resultados para tu búsqueda":(router.locale==="en"?"No results were found for your search":"Não foram encontrados resultados para a sua pesquisa"))}</h2>
                        </div>)
                    )
                }
            </div>
            <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-center">
                    {
                        (estdListNews && listNewsFilter.length > itemsPerPage) && <ReactPaginate
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
                    }
                </div>
            </div>
        </div>
    </>);

}


