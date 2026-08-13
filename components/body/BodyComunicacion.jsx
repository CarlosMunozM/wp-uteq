import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { NEWS_UNIV_IMGS_FOLDER, WS_LIST_FILTER_NEWS_BY_PARAMETERS } from 'config';
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { SliderImg } from "components";

export { BodyComunicacion };

function changeFormatMonth(mes, language) {
    const months = {
        "1": { es: "Ene", en: "Jan", pt: "Jan" },
        "01": { es: "Ene", en: "Jan", pt: "Jan" },
        "2": { es: "Feb", en: "Feb", pt: "Fev" },
        "02": { es: "Feb", en: "Feb", pt: "Fev" },
        "3": { es: "Mar", en: "Mar", pt: "Mar" },
        "03": { es: "Mar", en: "Mar", pt: "Mar" },
        "4": { es: "Abr", en: "Apr", pt: "Abr" },
        "04": { es: "Abr", en: "Apr", pt: "Abr" },
        "5": { es: "May", en: "May", pt: "Mai" },
        "05": { es: "May", en: "May", pt: "Mai" },
        "6": { es: "Jun", en: "Jun", pt: "Jun" },
        "06": { es: "Jun", en: "Jun", pt: "Jun" },
        "7": { es: "Jul", en: "Jul", pt: "Jul" },
        "07": { es: "Jul", en: "Jul", pt: "Jul" },
        "8": { es: "Ago", en: "Aug", pt: "Ago" },
        "08": { es: "Ago", en: "Aug", pt: "Ago" },
        "9": { es: "Sep", en: "Sep", pt: "Set" },
        "09": { es: "Sep", en: "Sep", pt: "Set" },
        "10": { es: "Oct", en: "Oct", pt: "Out" },
        "11": { es: "Nov", en: "Nov", pt: "Nov" },
        "12": { es: "Dic", en: "Dec", pt: "Dez" }
    };
    return months[mes]?.[language] || months[mes]?.["es"] || "";
}

// Función limpia para solicitudes HTTP en el cliente
async function make_request_ws(path_url) {
    try {
        const response = await axios.get(path_url);
        return response;
    } catch (error) {
        console.error("Error en petición WS:", error);
        return null;
    }
}

function NewsPanelForPage({ currentItems, language }) {
    if (!currentItems || currentItems.length === 0) return null;

    return (
        <>
            {currentItems.map((item, index) => {
                const title = language === "es" ? item.ntTitular?.trim() : (language === "en" ? item.ntTitularEn?.trim() : item.ntTitularPt?.trim());
                const desc = language === "es" ? item.ntDescripMeta?.trim() : (language === "en" ? item.ntDescripMetaEn?.trim() : item.ntDescripMetaPt?.trim());
                /*
                const deptName = language === "es"
                    ? (item.objDepartamento?.dpNombre?.trim() !== 'Universidad' ? item.objDepartamento?.dpNombre?.trim() : 'Institucional')
                    : (language === "en" ? (item.objDepartamento?.dpNombreEn?.trim() !== 'University' ? item.objDepartamento?.dpNombreEn?.trim() : 'Institutional') : (item.objDepartamento?.dpNombrePt?.trim() !== 'Universidade' ? item.objDepartamento?.dpNombrePt?.trim() : 'Institucional'));

                const badgeBg = (item.objDepartamento?.dpColor && item.objDepartamento?.dpColor !== '') ? item.objDepartamento.dpColor : "#025a27";
                */

                <div className="flex flex-wrap gap-2">
                    {/* Badges de Departamentos */}
                    {item.listaDepartamentos?.map((dp) => (
                        <span
                            key={`dp-${dp.dpCodigo}`}
                            style={{ backgroundColor: dp.dpColor?.trim() || '#025a27' }}
                            className="badge"
                        >
                            {language === "es" ? dp.dpNombre : (language === "en" ? dp.dpNombreEn : dp.dpNombrePt)}
                        </span>
                    ))}

                    {/* Badges de Categorías */}
                    {item.listaCategoriasNotc?.map((cat) => (
                        <span
                            key={`cat-${cat.gtCodigo}`}
                            style={{ backgroundColor: cat.gtColorIdentf?.trim() || '#025a27' }}
                            className="badge"
                        >
                            {language === "es" ? cat.gtTitular : (language === "en" ? cat.gtTitularEn : cat.gtTitularPt)}
                        </span>
                    ))}
                </div>

                return (
                    <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center" key={index}>
                        <div className="card-only-news w-100 m-2">
                            <img src={`${NEWS_UNIV_IMGS_FOLDER}${item.ntUrlPortada?.trim()}`} className="card-nw-image" alt={title || "Noticia"} />
                            <div className="card-nw-bdy">
                                <div className="pnl-franja g-0 w-100 mt-2"></div>
                                <h2 className="card-nw-type g-0">{title}</h2>
                                <div className="card-nw-title g-0 mb-3">
                                    <i className="fa fa-history"></i>&nbsp;&nbsp;
                                    {`${changeFormatMonth(item.ntFecha?.substr(5, 2), language)} ${item.ntFecha?.substr(8, 2)}, ${item.ntFecha?.substr(0, 4)}`}
                                    &nbsp;
                                    {/*
                                    <span className="badge sticker-tipo-dept" style={{ backgroundColor: badgeBg }}>
                                        {deptName}
                                    </span>
                                    */}

                                    {/* Badges para Departamentos */}
                                    {item.listaDepartamentos?.map((dp) => {
                                        const dpName = language === "es" ? dp.dpNombre : (language === "en" ? dp.dpNombreEn : dp.dpNombrePt);
                                        const dpColor = dp.dpColor?.trim() || "#025a27";
                                        return (
                                            <span
                                                key={`dp-${dp.dpCodigo}`}
                                                className="badge sticker-tipo-dept"
                                                style={{ backgroundColor: dpColor }}
                                            >
                                                {dpName?.trim()}
                                            </span>
                                        );
                                    })}

                                </div>
                                <div className="pnl-text-news">
                                    <p className="card-nw-text">{desc}</p>
                                </div>
                                <div className="row justify-content-center p-3">
                                    <div className="col-sm-12 col-lg-12 text-center">
                                        <a href={`/${language}/comunicacion/noticia/${item.ntUrlNoticia?.trim()}`} target="_blank" rel="noopener noreferrer" aria-label="link noticia" className="btn-tp">
                                            <i className="fa fa-bookmark"></i> {language === "es" ? "Leer más" : (language === "en" ? "Read more" : "Ler mais")}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

function BodyComunicacion(data) {
    const itemsPerPage = 6;

    const [listNewsFilter, setListNewsFilter] = useState(data.listnews || []);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [listDepSelc, setListDepSelc] = useState([]);
    const [listCatgSelc, setListCatgSelc] = useState([]);

    const formFilterNews = useRef();

    const { handleSubmit } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesgForm, setMesgForm] = useState("");
    const [tpmsgForm, setTpmsgForm] = useState(0);

    // Sincronizar listNewsFilter si los props iniciales cambian
    useEffect(() => {
        setListNewsFilter(data.listnews || []);
    }, [data.listnews]);

    // Recalcular items actuales y total de páginas cuando cambie la lista o el offset
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(listNewsFilter.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listNewsFilter.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, listNewsFilter]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listNewsFilter.length;
        setItemOffset(newOffset);
    };

    const optionsDepartms = (data.actdepartms || []).map((item) => ({
        value: item.dpCodigoUnc,
        label: data.language === "es" ? item.dpNombre?.trim() : (data.language === "en" ? item.dpNombreEn?.trim() : item.dpNombrePt?.trim()),
        isFixed: false
    }));

    const optionsCategrs = (data.actcategrs || []).map((item) => ({
        value: item.gtCodigo,
        label: data.language === "es" ? item.gtTitular?.trim() : (data.language === "en" ? item.gtTitularEn?.trim() : item.gtTitularPt?.trim()),
        isFixed: false
    }));

    function getStringListSelect(listSelctd) {
        if (!listSelctd || !Array.isArray(listSelctd) || listSelctd.length === 0) return "0";
        return listSelctd.map(item => item.value).filter(Boolean).join(",");
    }

    const onSubmitFormFilterNews = async () => {
        setIsSubmitting(true);
        setMesgForm('');
        setTpmsgForm(0);

        const depParam = getStringListSelect(listDepSelc);
        const catParam = getStringListSelect(listCatgSelc);

        if (depParam !== "0" || catParam !== "0") {
            try {
                const endpoint = `${WS_LIST_FILTER_NEWS_BY_PARAMETERS}${depParam}/${catParam}`;
                const resListFilterNews = await make_request_ws(endpoint);
                const resultData = Array.isArray(resListFilterNews?.data) ? resListFilterNews.data : [];

                setItemOffset(0);
                setListNewsFilter(resultData);
            } catch (error) {
                console.error("Error al filtrar noticias:", error);
                setMesgForm(data.language === "es" ? "Ocurrió un error al realizar la búsqueda." : "An error occurred while searching.");
                setTpmsgForm(1);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setItemOffset(0);
            setListNewsFilter(data.listnews || []);
            setIsSubmitting(false);
        }
    };

    async function getCompleteListNews() {
        setIsSubmitting(true);
        try {
            const resListFilterNews = await make_request_ws(`${WS_LIST_FILTER_NEWS_BY_PARAMETERS}0/0`);
            const resultData = Array.isArray(resListFilterNews?.data) ? resListFilterNews.data : [];
            setItemOffset(0);
            setListNewsFilter(resultData);
            setListDepSelc([]);
            setListCatgSelc([]);
            setMesgForm('');
            setTpmsgForm(0);
        } catch (error) {
            console.error("Error al obtener noticias completas:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="row g-0">
            <h2 className="title-cont-page text-center mt-2">
                {data.language === "es" ? "Noticias UTEQ" : (data.language === "en" ? "UTEQ News" : "Notícias da UTEQ")}
            </h2>
            <div className="col-md-12 mt-3 pnl-form-filter-news" ref={formFilterNews}>
                <form className="form-card-filter frm-filter" onSubmit={handleSubmit(onSubmitFormFilterNews)}>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-12 flex-column d-flex">
                            <button type="button" disabled={isSubmitting} className="btn-all-data" onClick={getCompleteListNews}>
                                <i className="fa fa-table fa-1x" aria-hidden="true"></i>&nbsp;
                                {data.language === "es" ? "Ver listado completo" : (data.language === "en" ? "See complete list" : "Ver lista completa")}
                            </button>
                        </div>
                    </div>
                    <div className="row justify-content-between text-left mt-2">
                        <div className="form-group col-12 col-md-6 col-lg-7 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-departm">
                                {data.language === "en" ? "Department" : "Departamento"}
                            </label>
                            <Select
                                id="slct-departm"
                                instanceId="slct-departm"
                                placeholder={data.language === "es" ? "Búsqueda de Departamento" : (data.language === "en" ? "Department Search" : "Pesquisa de departamento")}
                                className="form-select-1 form-select-lg"
                                classNamePrefix="form-select-1"
                                components={makeAnimated()}
                                onChange={(selected) => setListDepSelc(selected || [])}
                                value={listDepSelc}
                                isClearable={true}
                                closeMenuOnSelect={false}
                                isMulti
                                options={optionsDepartms}
                            />
                        </div>
                        <div className="form-group col-12 col-md-4 col-lg-3 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-categoria">
                                {data.language === "es" ? "Categoría" : (data.language === "en" ? "Category" : "Categoria")}
                            </label>
                            <Select
                                id="slct-categoria"
                                instanceId="slct-categoria"
                                placeholder={data.language === "es" ? "Búsqueda de categorías" : (data.language === "en" ? "Search for categories" : "Procurar por categorias")}
                                className="form-select-1 form-select-lg"
                                classNamePrefix="form-select-1"
                                components={makeAnimated()}
                                onChange={(selected) => setListCatgSelc(selected || [])}
                                value={listCatgSelc}
                                isClearable={true}
                                closeMenuOnSelect={false}
                                isMulti
                                options={optionsCategrs}
                            />
                        </div>
                        <div className="form-group col-12 col-md-2 flex-column d-flex mx-auto">
                            <button type="submit" disabled={isSubmitting} className="btn-block-area" style={{ height: "38px", marginTop: "27px" }}>
                                {isSubmitting ? (
                                    <><span className="spinner-border spinner-border-sm mr-1"></span>&nbsp;{data.language === "es" ? "Espere" : "Wait"}</>
                                ) : (
                                    <><i className="fa fa-search fa-1x" aria-hidden="true"></i>&nbsp;{data.language === "es" ? "Buscar" : "Search"}</>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {mesgForm !== "" && (
                <div className="col-md-12 mt-3">
                    <div className="row justify-content-end g-0">
                        <div className={`alert ${tpmsgForm === 1 ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} role="alert">
                            {mesgForm}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            )}

            <div className="col-md-12 mt-3">
                <div className="row d-flex justify-content-center align-items-center g-0">
                    {listNewsFilter.length > 0 ? (
                        <NewsPanelForPage currentItems={currentItems} language={data.language} />
                    ) : (
                        <div className="ratio ratio-21x9">
                            <img
                                src={`/assets/img/${data.language === "es" ? "busqueda-de-noticias-uteq-es.webp" : (data.language === "en" ? "busqueda-de-noticias-uteq-en.webp" : "busqueda-de-noticias-uteq-pt.webp")}`}
                                className="d-block w-100"
                                alt="Noticias"
                            />
                        </div>
                    )}
                </div>
                {listNewsFilter.length > 0 && (
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
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="col-md-12">
                <h2 className="title-cont-page text-end mt-3">
                    {data.language === "es" ? "UTEQ en Twitter |" : "UTEQ Twitter |"}
                    <a className="twitter-follow-button" data-lang="es" data-show-count="false" href="https://twitter.com/utequevedo">
                        {data.language === "en" ? "Follow" : "Seguir"}
                    </a>
                </h2>
                <div className="row">
                    <div className="col-md-12">
                        {Boolean(data.listposts) && SliderImg(data.listposts, 22, 2000, 900)}
                    </div>
                </div>
            </div>
        </div>
    );
}