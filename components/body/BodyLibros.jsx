import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { WS_LIST_ITEMS_ENTITY_CBX_BY_ID_SGA, WS_LIST_ITEMS_SA_CBX_BY_ID_SGA, WS_LIST_ITEMS_FILTER_SGA, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_VALIDATE_FORM } from 'config';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import "react-multi-carousel/lib/styles.css";
import { SliderImg } from 'components';


export { BodyLibros };

function ItemBookPanel(props) {
    const regEx = /^sga.uteq.edu.ec/;
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 pnl-box-info-link">
            <a href={`/${props.language}/investigacion/${props.tipo}/${props.id}`} aria-label="link ver capitulo" data-toggle="tooltip" data-placement="bottom" title={props.titulo.trim()}>
                <div className="pnl-box-book">
                    <img src={(props.urlportada !== null && props.urlportada !== '') ? (!regEx.test(props.urlportada) ? props.urlportada.trim() : `https://${props.urlportada.trim()}`) :
                        (props.tipo === "libro" ? `/assets/img/${props.language === "es" ? "img-port-def-libro.jpg" : (props.language === "en" ? "img-port-def-libro-en.jpg" : "img-port-def-libro-pt.jpg")}` :
                            `/assets/img/${props.language === "es" ? "img-port-def-cap-libro.jpg" : (props.language === "en" ? "img-port-def-cap-libro-en.jpg" : "img-port-def-cap-libro-pt.jpg")}`)}
                        className="img-book-portrait img-fluid rounded mx-auto d-block" alt={props.titulo.trim() + " - Libro UTEQ"} />
                    <div className="row">
                        <h2 className="pnl-box-sect-title">{props.titulo.trim()}</h2>
                        <h2 className="pnl-box-body"><span className="badge bg-secondary bg-year-b">{props.anio.trim()}</span>&nbsp;&nbsp;<span className="badge bg-success bg-type-b"><i className={props.tipo === "libro" ? "fa fa-book" : "fa fa-bookmark"} aria-hidden="true"></i>&nbsp;{props.tipo === "libro" ? "Libro" : "Capítulo de libro"}</span></h2>
                        <h2 className="pnl-box-body"><i className="fa fa-users" aria-hidden="true"></i>&nbsp;&nbsp;{props.autores.trim()}</h2>
                    </div>
                </div>
            </a>
        </div>
    )
}

async function make_external_request_ws(path_url) {
    var listTemp = null;
    const https = require('https');
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        await axios.get(path_url, { httpsAgent: agent }).then(function (response) {
            listTemp = response;
        	// console.log(response);
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

function BodyLibros(data) {
    const itemsPerPage = 12;

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [endOffset, setEndOffset] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [listBooksFilter, setListBooksFilter] = useState([]);
    const [listSubAreas, setListSubAreas] = useState([]);
    const [listSubAreasEspcfs, setListSubAreasEspcfs] = useState([]);
    const [estdListBooks, setEstdListBooks] = useState(false);
    const [disableCbx2, setDisableCbx2] = useState(true);
    const [disableCbx3, setDisableCbx3] = useState(true);
    const formBusqueda = useRef();
    const formOptions = { /*resolver: yupResolver(validationSchema)*/ };
    const { register, handleSubmit, reset, formState, control } = useForm(formOptions);
    const { errors } = formState;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesgForm, setMesgForm] = useState("");
    const [tpmsgForm, setTpmsgForm] = useState(0);
    const [estdInicial, setEstdInicial] = useState(true);
    const [fraseBusq, setFraseBusq] = useState("");
    const regEx = /^http/;


    useEffect(() => {
        setEndOffset(itemOffset + itemsPerPage);
        setCurrentItems(listBooksFilter.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listBooksFilter.length / itemsPerPage));
        setEstdListBooks(listBooksFilter.length > 0);
    }, [itemOffset, itemsPerPage, listBooksFilter, endOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listBooksFilter.length;
        setItemOffset(newOffset);
    };

    async function getDataOfSubAreasById(id_value) {
        var dataLst = [];
        if (id_value !== "") {
            dataLst = await make_external_request_ws(`${WS_LIST_ITEMS_ENTITY_CBX_BY_ID_SGA}${id_value}`);
        	// console.log("Subáreas");
            // console.log(dataLst);
            setListSubAreas((dataLst.data !== null && dataLst.data !== "") ? dataLst.data : []);
        } else {
            setListSubAreas([]);
        }
    }

    async function getDataOfSubAreasSpecfById(id_value) {
        var dataLst = [];
        if (id_value !== "") {
            dataLst = await make_request_ws(`${WS_LIST_ITEMS_SA_CBX_BY_ID_SGA}${id_value}`);
            setListSubAreasEspcfs((dataLst.data !== null && dataLst.data !== "") ? dataLst.data : []);
        } else {
            setListSubAreasEspcfs([]);
        }
    }

    function eventOnChangeAreaConoc(id_area_conoc) {
        setDisableCbx2(id_area_conoc === "");
        getDataOfSubAreasById(id_area_conoc);
        setListSubAreasEspcfs([]);
        setDisableCbx3(true);
        document.getElementById("slct-subarea-conc").selectedIndex = 0;
        document.getElementById("slct-subarea-esp-conc").selectedIndex = 0;
    }

    function eventOnChangeSubAreaConoc(id_subarea_conoc) {
        setDisableCbx3(id_subarea_conoc === "");
        getDataOfSubAreasSpecfById(id_subarea_conoc);
        document.getElementById("slct-subarea-esp-conc").selectedIndex = 0;
    }

    function getAuthorsListBook(dataAuthors) {
        var authors = '';
        if (dataAuthors.length > 0) {
            dataAuthors.map((item) => (
                authors += (authors, item.participante.trim().split(" ")[0] + ", ")
            ));

            authors = authors.trim().slice(0, -1);
        }
        return authors;
    }

    function getDataChaptersAndBooks(data1, data2) {
        var listOut = [], dataTemp = [];
        if (data1 !== null && data1 !== "") {
            if (data1.length > 0) {
                data1.map((item) => {
                    dataTemp = {
                        id: item.id,
                        titulo: item.titulo.trim(),
                        autores: getAuthorsListBook(item.autores),
                        anio: item.anio.trim(),
                        urlportada: item.urlportada.trim(),
                        fechapublicacion: item.fechapublicacion,
                        tipo: 'libro'
                    }

                    listOut = [dataTemp, ...listOut];
                });
            }
        }

        if (data2 !== null && data2 !== "") {
            if (data2.length > 0) {
                data2.map((item) => {
                    dataTemp = {
                        id: item.id,
                        titulo: item.titulo.trim(),
                        autores: getAuthorsListBook(item.autores),
                        anio: item.anio.trim(),
                        urlportada: item.urlportada.trim(),
                        fechapublicacion: item.fechapublicacion,
                        tipo: 'capitulo'
                    }

                    listOut = [dataTemp, ...listOut];
                });
            }
        }

        if (listOut.length > 0) {
            listOut = listOut.sort((a, b) => (new Date(b.fechapublicacion) - new Date(a.fechapublicacion)));
        }

        return listOut;
    }

    const listBooksPanel = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (<ItemBookPanel key={uuidv4()} tipo={item.tipo} id={item.id} titulo={item.titulo} urlportada={item.urlportada} autores={item.autores} anio={item.anio} language={data.language} />);
            })
        )
    }

    async function getDataFilterByParameters() {
        var resCons = [], valArea = '', valSubArea = '', valSubAreaEspcf = '', lstBs = [], lstChptrs = [], valBsq = "", valYear = "";
        var selectRec = document.getElementById('slct-recurso'), selectArea = document.getElementById('slct-area-conc'),
            selectSubArea = document.getElementById('slct-subarea-conc'), selectSubAreaEspcf = document.getElementById('slct-subarea-esp-conc'),
            valueRec = selectRec.options[selectRec.selectedIndex].value, selectYear = document.getElementById('slct-anio'), parameters = '';

        valArea = selectArea.options[selectArea.selectedIndex].value;
        valSubArea = selectSubArea.options[selectSubArea.selectedIndex].value;
        valSubAreaEspcf = selectSubAreaEspcf.options[selectSubAreaEspcf.selectedIndex].value;
        valBsq = document.getElementById('txtbusqueda').value.trim();
        valYear = selectYear.options[selectYear.selectedIndex].value;

        parameters += (valArea !== "" ? ("&idarea=" + valArea) : "");
        parameters += (valSubArea !== "" ? ("&idsubarea=" + valSubArea) : "");
        parameters += (valSubAreaEspcf !== "" ? ("&idsubareaespecifica=" + valSubAreaEspcf) : "");
        parameters += (valBsq !== "" ? ("&busqueda=" + valBsq) : "");
        parameters += (valYear !== "TOD" ? ("&anio=" + valYear) : "");

        switch (valueRec) {
            case "TOD":
                lstBs = await make_external_request_ws(WS_LIST_ITEMS_FILTER_SGA + "tipo=1" + parameters);
                lstChptrs = await make_external_request_ws(WS_LIST_ITEMS_FILTER_SGA + "tipo=2" + parameters);
                resCons = getDataChaptersAndBooks(lstBs.data, lstChptrs.data);
                break;
            case "LIB":
                lstBs = await make_external_request_ws(WS_LIST_ITEMS_FILTER_SGA + "tipo=1" + parameters);
                resCons = getDataChaptersAndBooks(lstBs.data, null);
                break;
            case "CAP":
                lstChptrs = await make_external_request_ws(WS_LIST_ITEMS_FILTER_SGA + "tipo=2" + parameters);
                resCons = getDataChaptersAndBooks(null, lstChptrs.data);
                break;
        }
    
    	//console.log(resCons);

        if (resCons.length > 0) {
            setListBooksFilter(resCons);
            setItemOffset(0);
            setEndOffset(itemOffset + itemsPerPage);
            setCurrentItems(resCons.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(resCons.length / itemsPerPage));
            setEstdListBooks(resCons.length > 0);
        } else {
            setListBooksFilter([]);
            setItemOffset(0);
            setEndOffset(0);
            setCurrentItems([]);
            setPageCount(0);
            setEstdListBooks(false);
        }

        setMesgForm("");
        setTpmsgForm(0);
        setIsSubmitting(false);
    }

    const onSubmitFormBusqueda = async () => {
        var message = '';

        setEstdInicial(false);
        setIsSubmitting(true);
        setTpmsgForm(0);

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
                                    getDataFilterByParameters();
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
            })
        } catch (error) {
            setMesgForm(error.message);
            setTpmsgForm(1);
            setIsSubmitting(false);
        }

        return false;
    }

    const handleChange = event => {
        setFraseBusq(event.target.value);
    };


    return (<>
        <div className="row g-0">
            <h2 className="title-cont-page text-center mb-3">{(data.data8 !== null && data.data8 !== "") ? (data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())) :
                (data.language === "es" ? "Libros Institucionales" : (data.language === "en" ? "Institutional Books" : "Livros institucionais"))}</h2>
            {
                (data.booksld !== null && data.booksld !== "") && (<>
                    <div className="col-12 col-md-12 pnl-stock-books-v2">
                        {SliderImg(data.booksld, 80, 2500, 500)}
                    </div></>)
            }
            <div className="col-md-12 mt-2">
                <div className="alert alert-success message-lang" role="alert">
                    {data.language === "es" ? "El contenido de los libros y capítulos institucionales solo esta disponible en español" : (data.language === "en" ? "The content of the books and institutional chapters is only available in Spanish." :
                        "O conteúdo dos livros e dos capítulos institucionais está disponível apenas em espanhol.")}
                </div>
            </div>
            <div className="col-md-12 mt-1 pnl-form-filter-books" ref={formBusqueda}>
                <form className="form-card-filter frm-filter" onSubmit={handleSubmit(onSubmitFormBusqueda)}>
                    <div className="row d-flex align-items-center text-left">
                        <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 col-xxl-10 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="txtbusqueda"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>.</label>
                            <input type="text" id="txtbusqueda" className="form-control mt-1" name="ftBusqueda" onChange={handleChange} placeholder={data.language === "es" ? "Búsqueda de libros y capítulos..." : (data.language === "en" ? "Search for books and chapters..." : "Pesquisa de livros e capítulos...")} maxLength={200} value={fraseBusq} />
                        </div>
                        <div className="form-group col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="ftAnio">{data.language === "es" ? "Año" : (data.language === "en" ? "Year" : "Ano")}</label>
                            <select name="ftAnio" className="form-select form-select-lg" id="slct-anio">
                                {data.years.map(
                                    (year, index) => {
                                        return (<option key={index} value={year}>{year}</option>);
                                    })
                                }
                                <option value="TOD" >{data.language === "en" ? "All" : "Todos"}</option>
                            </select>
                        </div>
                        <div className="form-group col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-recurso">{data.language === "es" ? "Recurso" : (data.language === "en" ? "Resources" : "Recursos")}</label>
                            <select name="ftRecurso" className="form-select form-select-lg" id="slct-recurso">
                                <option value="LIB">{data.language === "es" ? "Libro" : (data.language === "en" ? "Book" : "Livro")}</option>
                                <option value="CAP">{data.language === "es" ? "Capítulo de libro" : (data.language === "en" ? "Book chapter" : "Capítulo de livro")}</option>
                                <option value="TOD">{data.language === "en" ? "All" : "Todos"}</option>
                            </select>
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-6 col-lg-8 col-xl-3 col-xxl-3 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-area-conc">{data.language === "es" ? "Área de conocimiento" : (data.language === "en" ? "Area of knowledge" : "Área de conhecimento")}</label>
                            <select name="ftAreaConc" className="form-select form-select-lg" onChange={e => eventOnChangeAreaConoc(e.target.value)}
                                id="slct-area-conc">
                                <option key={data.areaConocm.length > 0 ? data.areaConocm.length : 0} value="">{data.language === "es" ? "Selecciona una opción" : (data.language === "en" ? "Select an option" : "Seleccionar uma opção")}</option>
                                {data.areaConocm.map(
                                    (item, index) => {
                                    	if (item && item[0] !== null && item[1] !== null) {
                                        	return (<option key={index} value={item[0]}>{item[1].trim()}</option>);
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-5 col-lg-5 col-xl-3 col-xxl-3 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-subarea-conc">{data.language === "es" ? "Subárea conocimiento" : (data.language === "en" ? "Knowledge sub-area" : "Subárea do conhecimento")}</label>
                            <select name="ftSubAreaConc" className="form-select form-select-lg" disabled={disableCbx2} onChange={e => eventOnChangeSubAreaConoc(e.target.value)}
                                id="slct-subarea-conc">
                                <option key={listSubAreas.length > 0 ? listSubAreas.length : 0} value="">{data.language === "es" ? "Selecciona una opción" : (data.language === "en" ? "Select an option" : "Seleccionar uma opção")}</option>
                                {listSubAreas.map(
                                    (item, index) => {
                                    	if (item && item[0] !== null && item[1] !== null) {
                                        	return (<option key={index} value={item[0]}>{item[1].trim()}</option>);
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-8 col-sm-10 col-md-5 col-lg-5 col-xl-3 col-xxl-3 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-subarea-esp-conc">{data.language === "es" ? "Subárea específica" : (data.language === "en" ? "Specific sub-area" : "Subzona específica")}</label>
                            <select name="ftSubAreaEspcConc" className="form-select form-select-lg" disabled={disableCbx3}
                                id="slct-subarea-esp-conc">
                                <option key={listSubAreasEspcfs.length > 0 ? listSubAreasEspcfs.length : 0} value="">{data.language === "es" ? "Selecciona una opción" : (data.language === "en" ? "Select an option" : "Seleccionar uma opção")}</option>
                                {listSubAreasEspcfs.map(
                                    (item, index) => {
                                    	if (item && item[0] !== null && item[1] !== null) {
                                        	return (<option key={index} value={item[0]}>{item[1].trim()}</option>);
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 flex-column d-flex mx-auto">
                            <button type="submit" className="btn-block-search-flt mx-auto" disabled={isSubmitting} style={{ height: "38px", marginTop: "27px" }} aria-label="boton filtrar libros" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Búsqueda de datos" : (data.language === "en" ? "Search for data" : "Pesquisa de dados")}>
                                {isSubmitting ? (<span className="spinner-border spinner-border-sm mr-1"></span>) : (<i className="fa fa-search fa-1x" aria-hidden="true"></i>)}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-md-12 w-100 mt-2">
                <div className="row g-2">
                    {
                        estdListBooks ? (<>{currentItems && listBooksPanel(currentItems)}</>) : (
                            isSubmitting ? (<div className="col-md-12 mt-3 pnl-form-filter-news">
                                <h2 className="title-cont-page text-center mt-2">
                                    <span className="spinner-border spinner-border-sm mr-1"></span>&nbsp;&nbsp;{data.language === "es" ? "Buscando información en la base de conocimientos..." : (data.language === "en" ? "Searching for information in the knowledge base..." : "Procurar informações na base de conhecimentos...")}
                                </h2>
                            </div>) : (!estdInicial ? (<div className="col-md-12 mt-3 pnl-form-filter-news">
                                <h2 className={`msg-pnl-search text-center mt-2${mesgForm !== "" && " text-danger"}`}><i className={`fa ${mesgForm !== "" ? "fa-exclamation-triangle" : "fa-inbox"}`} aria-hidden="true"></i>&nbsp;{mesgForm !== "" ? mesgForm : (data.language === "es" ? "No se encontraron resultados para tu búsqueda" : (data.language === "en" ? "No results were found for your search" : "Não foram encontrados resultados para a sua pesquisa"))}</h2>
                            </div>) : (<div className="col-md-12 mt-3 pnl-form-filter-news g-0">
                                <h2 className="msg-pnl-search text-center mt-2"><i className="fa fa-book" aria-hidden="true"></i> {data.language === "es" ? "Libros de los docentes e investigadores de la universidad." : (data.language === "en" ? "Books by university teachers and researchers." : "Livros de professores universitários e investigadores.")}</h2>
                            </div>))
                        )
                    }
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 d-flex justify-content-center">
                        {(estdListBooks && listBooksFilter.length > itemsPerPage) && <ReactPaginate
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
                            renderOnZeroPageCount={null} />}
                    </div>
                </div>
            </div>
        </div>
    </>);

}