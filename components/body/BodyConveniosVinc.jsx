import * as htmlToImage from 'html-to-image';
import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { WS_LIST_CAREERS_AGREEMENTS_SGA, WS_LIST_LOCATIONS_COMPANY_SGA, WS_LIST_TOTAL_CAREERS_AGREEMENTS_SGA, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_VALIDATE_FORM, WS_LIST_AGREEMENTS_BY_PARAMETERS } from 'config';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';


export { BodyConveniosVinc };

function getListCareersFromList(listCareers) {
    var strCareers = "";

    if (listCareers.length > 0) {
        listCareers.map(
            (item) => {
                strCareers += (strCareers, item.trim() + ", ")
            });

        strCareers = strCareers.trim().slice(0, -1);
    }

    return strCareers;
}

const handleDownloadClickImage = (event, param) => {
    var node = document.getElementById(param);

    htmlToImage.toBlob(node, { quality: 1, pixelRatio: 2 })
        .then(function (blob) {
            window.saveAs(blob, 'Información-de-convenio.png');
        });
};

function ItemAgreementLinkg(props) {
    return (
        <div className="col-md-6 pnl-box-info-link">
            <div className="pnl-box-agreem" id={`data-agreem-${props.index}`}>
                <div className="row">
                    <h2 className="pnl-box-sect-title">{props.language === "es" ? "Convenio UTEQ" : (props.language === "en" ? "UTEQ Agreement" : "Acordo UTEQ")} - {props.empresa.trim()}</h2>
                </div>
                <div className="row">
                    <p className="pnl-box-paramt-1"><span className="badge bg-success"><i className="fa fa-certificate" aria-hidden="true"></i>&nbsp;{props.tipoconvenio.trim() === "PPP" ?
                        (props.language === "es" ? "Práctica laboral" : (props.language === "en" ? "Work experience" : "Experiência profissional")) :
                        (props.language === "es" ? "Práctica de servicio comunitario" : (props.language === "en" ? "Community service practice" : "Prática de serviço comunitário"))}</span></p>
                </div>
                <div className="row">
                    <h3 className="pnl-box-sect-subtitle">{props.empresa.trim()}</h3>
                    <p className="pnl-box-paramt-1">
                        <span className="badge bg-secondary"><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;{props.provincia.trim()}</span>&nbsp;&nbsp;
                        <span className="badge" style={{ backgroundColor: "#6c5614" }}><i className="fa fa-building-o" aria-hidden="true"></i>&nbsp;{props.tipoinstitucion.trim() === "Publica" ?
                            (props.language === "en" ? "Public company" : "Empresa pública") : (props.language === "en" ? "Private company" : "Empresa privada")}</span>
                    </p>
                </div>
                <div className="row">
                    <p className="pnl-box-paramt-4">
                        <b>{props.language === "es" ? "Carrera/s:" : (props.language === "en" ? "Career/s:" : "Carreira/s:")}</b> {getListCareersFromList(props.carreras)}
                    </p>
                    <p className="pnl-box-paramt-2">
                        <b>{props.language === "es" ? "Responsable interno:" : (props.language === "en" ? "Internal manager:" : "Gestor interno:")}</b> {props.responsableinterno.trim()}
                    </p>
                    <p className="pnl-box-paramt-2">
                        <b>{props.language === "es" ? "Responsable externo:" : (props.language === "en" ? "External manager:" : "Gestor externo:")}</b> {props.responsableexterno.trim()}
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6"><p className="pnl-box-paramt-2"><i className="fa fa-calendar-check-o" aria-hidden="true"></i>&nbsp;<b>{props.language === "es" ? "Inicio:" : (props.language === "en" ? "Start:" : "Início:")}</b> {props.fechainicio.trim()}</p></div>
                    <div className="col-md-6"><p className="pnl-box-paramt-2"><i className="fa fa-calendar-times-o" aria-hidden="true"></i>&nbsp;<b>{props.language === "es" ? "Finalización:" : (props.language === "en" ? "End" : "Conclusão")}</b> {props.fechafin.trim()}</p></div>
                </div>
                <div className="row">
                    <p className="pnl-box-paramt-3 text-center"><span className="badge bg-success" onClick={event => handleDownloadClickImage(event, `data-agreem-${props.index}`)} data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? "Descargar información del convenio" : (props.language === "en" ? "Download agreement information" : "Descarregar informações sobre o acordo")}>
                        <i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i>&nbsp;{props.language === "es" ? "Descargar información" : (props.language === "en" ? "Download information" : "Descarregar informações")}</span></p>
                </div>
            </div>
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

function BodyConveniosVinc(data) {

    const itemsPerPage = 6;

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [endOffset, setEndOffset] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [listAgreemFilter, setListAgreemFilter] = useState([]);
    const [listLocations, setListLocations] = useState([]);
    const [listCareers, setListCareers] = useState([]);
    const [estdListAgree, setEstdListAgree] = useState(false);
    const formBusqueda = useRef();
    const formOptions = {};
    const { register, handleSubmit, reset, formState, control } = useForm(formOptions);
    const { errors } = formState;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesgForm, setMesgForm] = useState("");
    const [tpmsgForm, setTpmsgForm] = useState(0);
    const [estdInicial, setEstdInicial] = useState(true);
    const [fraseBusq, setFraseBusq] = useState("");
    const [disableCbx2, setDisableCbx2] = useState(true);
    const [disableCbx3, setDisableCbx3] = useState(true);
    const [valTypeComp, setValTypeComp] = useState("");
    const [valCareer, setValCareer] = useState("");

    useEffect(() => {
        setEndOffset(itemOffset + itemsPerPage);
        setCurrentItems(listAgreemFilter.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listAgreemFilter.length / itemsPerPage));
        setEstdListAgree(listAgreemFilter.length > 0);
    }, [itemOffset, itemsPerPage, listAgreemFilter, endOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listAgreemFilter.length;
        setItemOffset(newOffset);
    };

    const listItemsAgreements = (dataItems) => {
        return (<>{
            dataItems.map(
                (item, index) => {
                    return <ItemAgreementLinkg key={uuidv4()} index={index} empresa={item.empresa} tipoconvenio={item.tipoconvenio} provincia={item.provincia}
                        tipoinstitucion={item.tipoinstitucion} carreras={item.carreras} responsableinterno={item.responsableinterno} responsableexterno={item.responsableexterno}
                        fechainicio={item.fechainicio} fechafin={item.fechafin} language={data.language} />
                }
            )
        }</>)
    }

    function eventOnChangeTypeCompany(id_type_comp) {
        setDisableCbx2(id_type_comp === "");
        setValTypeComp(id_type_comp);
        getDataOfCareersByCompType(id_type_comp);
        setListLocations([]);
        setDisableCbx3(true);
        document.getElementById("slct-career").selectedIndex = 0;
        document.getElementById("slct-location").selectedIndex = 0;
    }

    async function getDataOfCareersByCompType(id_value) {
        var dataLst = [], dataCars = [], dataAux = [];

        setListCareers([]);

        if (id_value === "TOD") {
            dataAux = await make_external_request_ws(WS_LIST_TOTAL_CAREERS_AGREEMENTS_SGA);
        } else {
            dataAux = await make_external_request_ws(`${WS_LIST_CAREERS_AGREEMENTS_SGA}${id_value}`);
        }

        if (dataAux !== null && dataAux !== "") {
            if (dataAux.data.length > 0) {
                dataAux.data.map(
                    (item_carrera) => {
                        dataCars = {
                            id: item_carrera[0],
                            carrera: item_carrera[1]
                        }

                        dataLst = [dataCars, ...dataLst];
                    }
                )
                setListCareers(dataLst.sort((a, b) => (a.carrera > b.carrera) ? 1 : -1));
            }
        }

    }

    async function getDataOfLocationsByCareerID(id_career, id_type_comp) {
        var dataLst = [], pathWS = "";
        if (id_career !== "") {
            pathWS = id_type_comp !== "TOD" ? (WS_LIST_LOCATIONS_COMPANY_SGA + "idti=" + id_type_comp + "&idc=" + id_career) : (WS_LIST_LOCATIONS_COMPANY_SGA + "idc=" + id_career);
            dataLst = await make_external_request_ws(pathWS);
            setListLocations((dataLst.data !== null && dataLst.data !== "") ? dataLst.data : []);
        } else {
            setListLocations([]);
        }
    }

    function eventOnChangeCareer(id_career) {
        setDisableCbx3(id_career === "");
        setValCareer(id_career);
        getDataOfLocationsByCareerID(id_career, valTypeComp);
        document.getElementById("slct-location").selectedIndex = 0;
    }

    const handleChange = event => {
        setFraseBusq(event.target.value);
    };

    async function getDataFilterByParameters() {
        var valTypeInst = "", valCareer = "", valLocations = "", valTipoConv = "",
            selectTI = document.getElementById('slct-comp-type'), selectCR = document.getElementById('slct-career'),
            selectLC = document.getElementById('slct-location'), selectTC = document.getElementById('slct-tipo-conv'), parameters = '', valBsq = "", lstAgs = [];

        setListAgreemFilter([]);
        valTipoConv = selectTC.options[selectTC.selectedIndex].value;
        valTypeInst = selectTI.options[selectTI.selectedIndex].value;
        valCareer = selectCR.options[selectCR.selectedIndex].value;
        valLocations = selectLC.options[selectLC.selectedIndex].value;
        valBsq = document.getElementById('txtbusqueda').value.trim();

        parameters += ((valTypeInst !== "" && valTypeInst !== "TOD") ? ("&idti=" + valTypeInst) : "");
        parameters += (valCareer !== "" ? ("&idc=" + valCareer) : "");
        parameters += (valLocations !== "" ? ("&idp=" + valLocations) : "");
        parameters += (valBsq !== "" ? ("&busq=" + valBsq) : "");

        lstAgs = await make_external_request_ws(WS_LIST_AGREEMENTS_BY_PARAMETERS + parameters);

        if (lstAgs !== null && lstAgs !== "") {
            lstAgs = valTipoConv !== "TOD" ? (lstAgs.data.filter(agreem => agreem.tipoconvenio === valTipoConv)) : lstAgs.data;
            if (lstAgs.length > 0) {
                setListAgreemFilter(lstAgs);
                setItemOffset(0);
                setEndOffset(itemOffset + itemsPerPage);
                setCurrentItems(lstAgs.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(lstAgs.length / itemsPerPage));
                setEstdListAgree(lstAgs.length > 0);
            } else {
                setListAgreemFilter([]);
                setItemOffset(0);
                setEndOffset(0);
                setCurrentItems([]);
                setPageCount(0);
                setEstdListAgree(false);
            }
        } else {
            setListAgreemFilter([]);
            setItemOffset(0);
            setEndOffset(0);
            setCurrentItems([]);
            setPageCount(0);
            setEstdListAgree(false);
        }

        setMesgForm("");
        setTpmsgForm(0);
        setIsSubmitting(false);
    }

    const onSubmitFormBusqueda = async () => {
        var message = '', valTypeInst = "";

        setEstdInicial(false);
        setIsSubmitting(true);
        setTpmsgForm(0);

        try {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
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
                                    message = (data.language === "es" ? "La validación de la herramienta Recaptcha no se completó correctamente." :
                                        (data.language === "en" ? "The validation of the Recaptcha tool was not completed correctly." :
                                            "A validação da ferramenta Recaptcha não foi concluída correctamente."));
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

    return (<>
        <div className="row g-0">
            <h2 className="title-cont-page text-center">{data.language === "es" ? "Listado de convenios suscritos" : (data.language === "en" ? "List of agreements signed" : "Lista dos acordos assinados")}</h2>
            <div className="col-md-12 mt-3 pnl-form-filter-agreeg" ref={formBusqueda}>
                <form className="form-card-filter frm-filter" onSubmit={handleSubmit(onSubmitFormBusqueda)}>
                    <div className="row d-flex align-items-center text-left">
                        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-10 col-xl-10 col-xxl-10 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="txtbusqueda"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>.</label>
                            <input type="text" id="txtbusqueda" className="form-control mt-1" name="ftBusqueda" onChange={handleChange} placeholder={data.language === "es" ? "Búsqueda convenios de PPP y Vinculación..." :
                                (data.language === "en" ? "Search for PPP agreements and Linking..." : "Pesquisa de acordos de PPP e Ligação...")} maxLength={200} value={fraseBusq} />
                        </div>
                        <div className="form-group col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 col-xxl-2 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-tipo-conv">{data.language === "en" ? "Type" : "Tipo"}</label>
                            <select name="ftTipoConv" className="form-select form-select-lg" id="slct-tipo-conv">
                                <option value="PPP" >PPP</option>
                                <option value="Vinculación" >{data.language === "es" ? "Vinculación" : (data.language === "en" ? "Linking" : "Ligação")}</option>
                                <option value="TOD">{data.language === "en" ? "All" : "Todos"}</option>
                            </select>
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-6 col-lg-2 col-xl-2 col-xxl-2 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-comp-type">{data.language === "es" ? "Institución" : (data.language === "en" ? "Institution" : "Instituição")}</label>
                            <select name="ftTipoInst" className="form-select form-select-lg" id="slct-comp-type" onChange={e => eventOnChangeTypeCompany(e.target.value)}>
                                {data.listTC.map(
                                    (item, index) => {
                                        return (<option key={index} value={item[0]}>{data.language === "es" ? item[1].trim() : (data.language === "en" ? (item[1].trim() === "Privada" ? "Private" : "Public") :
                                            (item[1].trim() === "Privada" ? "Privado" : "Público"))}</option>);
                                    })
                                }
                                <option value="TOD">{data.language === "en" ? "All" : "Todas"}</option>
                            </select>
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-6 col-lg-4 col-xl-5 col-xxl-5 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-career">{data.language === "es" ? "Carrera" : (data.language === "en" ? "Career" : "Carreira")}</label>
                            <select name="ftCarrera" className="form-select form-select-lg" id="slct-career" disabled={disableCbx2} onChange={e => eventOnChangeCareer(e.target.value)}>
                                <option key={listCareers.length > 0 ? listCareers.length : 0} value="">{data.language === "es" ? "Selecciona" : (data.language === "en" ? "Choose" : "Seleccionar")}</option>
                                {listCareers.map(
                                    (item, index) => {
                                        return (<option key={index} value={item.id}>{item.carrera.trim()}</option>);
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-9 col-sm-9 col-md-10 col-lg-4 col-xl-4 col-xxl-4 flex-column d-flex">
                            <label className="form-control-label px-3" htmlFor="slct-location">{data.language === "es" ? "Ubicación" : (data.language === "en" ? "Location" : "Localização")}</label>
                            <select name="ftUbicacion" className="form-select form-select-lg" id="slct-location" disabled={disableCbx3}>
                                <option key={listLocations.length > 0 ? listLocations.length : 0} value="">{data.language === "es" ? "Selecciona" : (data.language === "en" ? "Choose" : "Seleccionar")}</option>
                                {listLocations.map(
                                    (item, index) => {
                                        return (<option key={index} value={item[0]}>{item[1].trim()}</option>);
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 flex-column d-flex mx-auto">
                            <button type="submit" className="btn-block-search-flt mx-auto" disabled={isSubmitting} style={{ height: "38px", marginTop: "27px" }} aria-label="boton filtrar convenios" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Búsqueda de datos" : (data.language === "en" ? "Search for data" : "Pesquisa de dados")}>
                                {isSubmitting ? (<span className="spinner-border spinner-border-sm mr-1"></span>) : (<i className="fa fa-search fa-1x" aria-hidden="true"></i>)}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-md-12 w-100 mt-2">
                <div className="row g-2">
                    {
                        estdListAgree ? (<>{currentItems && listItemsAgreements(currentItems)}</>) : (
                            isSubmitting ? (<div className="col-md-12 mt-3 pnl-form-filter-news">
                                <h2 className="title-cont-page text-center mt-2">
                                    <span className="spinner-border spinner-border-sm mr-1"></span>&nbsp;&nbsp;{data.language === "es" ? "Buscando información en la base de conocimientos..." : (data.language === "en" ? "Searching for information in the knowledge base..." : "Procurar informações na base de conhecimentos...")}
                                </h2>
                            </div>) : (!estdInicial ? (<div className="col-md-12 mt-3 pnl-form-filter-news">
                                <h2 className={`msg-pnl-search text-center mt-2${mesgForm !== "" && " text-danger"}`}><i className={`fa ${mesgForm !== "" ? "fa-exclamation-triangle" : "fa-inbox"}`} aria-hidden="true"></i>&nbsp;{mesgForm !== "" ? mesgForm : (data.language === "es" ? "No se encontraron resultados para tu búsqueda" : (data.language === "en" ? "No results were found for your search" : "Não foram encontrados resultados para a sua pesquisa"))}</h2>
                            </div>) : (<div className="col-md-12 mt-3 pnl-form-filter-news g-0">
                                <h2 className="msg-pnl-search text-center mt-2"><i className="fa fa-american-sign-language-interpreting" aria-hidden="true"></i> {data.language === "es" ? "Convenios de Prácticas Laborales y Prácticas de Servicios Comunitarios de la Universidad." : (data.language === "en" ? "University Work Experience and Community Service Internship Agreements." : "Acordos de estágios de trabalho universitário e de serviço comunitário.")}</h2>
                            </div>))
                        )
                    }
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 d-flex justify-content-center">
                        {(estdListAgree && listAgreemFilter.length > itemsPerPage) && <ReactPaginate
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