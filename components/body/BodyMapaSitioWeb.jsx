import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { WS_LIST_SM_PROJECTS_LKG, WS_LIST_URLS_WEB_PAGES_SM_BY_ENTITY, WS_LIST_ALL_ITEMS_MENU, WS_LIST_ALL_SM_NEWS } from 'config';

export { BodyMapaSitioWeb }

async function make_request_ws(path_url) {
    var listTemp=null;
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

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

function handleClick(language) {
    return function(e){
        e.preventDefault();
        openInNewTab("https://www.uteq.edu.ec/"+language);
    }
}

const regEx = /^http/;

function ElementLevel(props) {
    if (props.url !== null && props.url !== "" && props.url !== "#") {
        return (
            <li><h3 className={props.cssclass}><a href={!regEx.test(props.url.trim()) ? ("/"+props.language+"/"+props.url.trim()) : props.url.trim()} target="_blank" data-toggle="tooltip" data-placement="bottom"
                title={`${props.language==="es"?"Ir a la página web de":(props.language==="en"?"Go to the website of":"Aceder ao sítio Web de")} ${props.nombre.trim()}`}>{(props.icono !== null && props.icono !== "") ? (<><i className={props.icono} aria-hidden="true"></i>&nbsp;{props.nombre.trim()}</>) : props.nombre.trim()}
            </a></h3></li>
        )
    } else {
        if (props.icono !== null && props.icono !== "") {
            return (<><li><h3 className={props.cssclass}><i className={props.icono} aria-hidden="true"></i>&nbsp;{props.nombre.trim()}</h3></li></>)
        } else {
            return (<><li><h3 className={props.cssclass}>{props.nombre.trim()}</h3></li></>)
        }
    }
}

function ElementLevelSimple(props) {
    if (props.url !== null && props.url !== "" && props.url !== "#") {
        return (
            <a href={!regEx.test(props.url.trim()) ? ("/"+props.language+"/"+props.url.trim()) : props.url.trim()} target="_blank" data-toggle="tooltip" data-placement="bottom"
                title={`${props.language==="es"?"Ir a la página web de":(props.language==="en"?"Go to the website of":"Aceder ao sítio Web de")} ${props.nombre.trim()}`}>{(props.icono !== null && props.icono !== "") ? (<><i className={props.icono} aria-hidden="true"></i>&nbsp;{props.nombre.trim()}</>) : props.nombre.trim()}
            </a>
        )
    } else {
        if (props.icono !== null && props.icono !== "") {
            return (<><i className={props.icono} aria-hidden="true"></i>&nbsp;{props.nombre.trim()}</>)
        } else {
            return (props.nombre.trim())
        }
    }
}

function BodyMapaSitioWeb(data) {

    const [dataprv, setDataprv] = useState([]);
    const [datarcts, setDatarcts] = useState([]);
    const [datamns, setDatamns] = useState([]);
    const [datanews, setDatanews] = useState([]);

    useEffect(() => {
        (async () => {
            const smprv = await make_request_ws(WS_LIST_SM_PROJECTS_LKG);
            const smrcts = await make_request_ws(`${WS_LIST_URLS_WEB_PAGES_SM_BY_ENTITY}RCT`);
            const smnu = await make_request_ws(WS_LIST_ALL_ITEMS_MENU);
            const smnews = await make_request_ws(WS_LIST_ALL_SM_NEWS);
            setDataprv((smprv.data !== null && smprv.data !== "") ? smprv.data : []);
            setDatarcts((smrcts.data !== null && smrcts.data !== "") ? smrcts.data : []);
            setDatamns((smnu.data !== null && smnu.data !== "") ? smnu.data : []);
            setDatanews((smnews.data !== null && smnews.data !== "") ? smnews.data : []);
        })();
    }, []);

    const renderElementsFirstMenu = (dataFrst, language) => {
        return (<>{
            dataFrst.sort((a, b) => (a.mnOrden > b.mnOrden) ? 1 : -1).map((item) =>
                <ElementLevel key={uuidv4()} url={item.mnUrlAsoc} nombre={language==="es"?item.mnNombre:(language==="en"?item.mnNombreEn:item.mnNombrePt)} icono={item.mnIcono} cssclass="sm-lv-2" language={language} />
            )}</>)
    }

    const listNewsUniv = (lstnews, language) => {
        return (<>{
            lstnews.sort((a, b) => (a.ntTitular > b.ntTitular) ? 1 : -1).map(
                (news) => {
                    return <ElementLevel key={uuidv4()} url={`comunicacion/noticia/${news.ntUrlNoticia.trim()}`} nombre={language==="es"?news.ntTitular:(language==="en"?news.ntTitularEn:news.ntTitularPt)} icono="" cssclass="sm-lv-4" language={language} />
                }
            )
        }</>)
    }

    function ItemSecondMenu(props) {
        if (props.smCodigo === 99) {
            return (<>
                <li>
                    <details>
                        <summary className="sm-lv-3"><ElementLevelSimple url={props.smUrlAsoc} nombre={props.smNombre} icono="" language={props.language} /></summary>
                        <ul>
                            {listNewsUniv(props.news, props.language)}
                        </ul>
                    </details>
                </li>
            </>)
        } else {
            return <ElementLevel url={props.smUrlAsoc} nombre={props.smNombre} icono="" cssclass="sm-lv-3" language={props.language} />
        }
    }

    const listOptionsSM = (options, news, language) => {
        return (<>{
            options.mnListadoSubmenus.sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                (option) => {
                    return <ItemSecondMenu key={uuidv4()} smCodigo={option.smCodigo} smUrlAsoc={option.smUrlAsoc} smNombre={language==="es"?option.smNombre:(language==="en"?option.smNombreEn:option.smNombrePt)} news={news} language={language} />
                }
            )
        }</>)
    }

    function ItemSM(props) {
        if (props.mnCodigo === 26 || props.mnCodigo === 9 || props.mnCodigo === 15) {
            return (<><li>
                <details>
                    <summary className="sm-lv-2"><ElementLevelSimple url={(props.mnCodigo === 15) ? props.mnUrlAsoc : "#"} nombre={props.mnNombre} icono={props.mnIcono} language={props.language} /></summary>
                    <ul>
                        {(props.mnCodigo === 26) && (props.mncom[0].mnListadoSubmenus.length > 0 && listOptionsSM(props.mncom[0], datanews, props.language))}
                    </ul>
                </details>
            </li></>)
        } else {
            if (props.mnCodigo !== 3) {
                return <ElementLevel url={props.mnUrlAsoc} nombre={props.mnNombre} icono={props.mnIcono} cssclass="sm-lv-2" language={props.language} />
            }
        }
    }

    const renderElementsSecondMenu = (dataScnd, language) => {
        return (<>{
            dataScnd.sort((a, b) => (a.mnOrden > b.mnOrden) ? 1 : -1).map((item) => {
                return <ItemSM key={uuidv4()} mnCodigo={item.mnCodigo} mnUrlAsoc={item.mnUrlAsoc} mnNombre={language==="es"?item.mnNombre:(language==="en"?item.mnNombreEn:item.mnNombrePt)} mnIcono={item.mnIcono} mncom={data.mncom} language={language} />
            }
            )}</>)
    }

    function ItemForthLevel(props) {
        if (props.dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === props.item.smCodigo).length > 0) {
            return (<>
                <li>
                    <details>
                        <summary className="sm-lv-4"><ElementLevelSimple url={props.item.smUrlAsoc} nombre={props.language==="es"?props.item.smNombre:(props.language==="en"?props.item.smNombreEn:props.item.smNombrePt)} icono="" language={props.language} /></summary>
                        <ul>
                            {listItemsFifthLevel(props.dataItems, props.item.smCodigo, props.language)}
                        </ul>
                    </details>
                </li>
            </>)
        } else {
            return <ElementLevel url={props.item.smUrlAsoc} nombre={props.language==="es"?props.item.smNombre:(props.language==="en"?props.item.smNombreEn:props.item.smNombrePt)} icono="" cssclass="sm-lv-4" language={props.language} />
        }
    }

    const listItemsForthLevel = (dataItems, code, language) => {
        return (<>{
            dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === code).sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                (item) => {
                    return (<ItemForthLevel key={uuidv4()} dataItems={dataItems} item={item} language={language} />)
                })
        }</>);
    }

    const listItemsFifthLevel = (dataItems, code, language) => {
        return (<>{
            dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === code).sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                (item) => {
                    return <ElementLevel key={uuidv4()} url={item.smUrlAsoc} nombre={language==="es"?item.smNombre:(language==="en"?item.smNombreEn:item.smNombrePt)} icono="" cssclass="sm-lv-5" language={language} />
                })
        }</>);
    }

    const listItmsEvlInt = (datait, language) => {
        return (<>{
            datait.map(
                (item) => {
                    return <ElementLevel key={uuidv4()} url={`evaluacion-interna/${item.sldEnlace.trim()}`} nombre={language==="es"?item.sldTitulo:(language==="en"?item.sldTituloEn:item.sldTituloPt)} icono="" cssclass="sm-lv-4" language={language} />
                }
            )
        }</>)
    }

    const listItmsMsc = (datamsc, language) => {
        return (<>{
            datamsc.map(
                (item) => {
                    return <ElementLevel key={uuidv4()} url={`posgrado/${item.crUrlParcial.trim()}`} nombre={language==="es"?item.crNombre:(language==="en"?item.crNombreEn:item.crNombrePt)} icono="" cssclass="sm-lv-4" language={language} />
                }
            )
        }</>)
    }

    const listDataInvstg = (datainv, tipo, language) => {
        return (<>{
            datainv.sort((a, b) => (a.titulo > b.titulo) ? 1 : -1).map(
                (item) => {
                    return <ElementLevel key={uuidv4()} url={`${(tipo === 1) ? ("investigacion/libro/") : ((tipo === 2) ? ("investigacion/capitulo/") : ((tipo === 3) ? ("investigacion/articulo/") : ("investigacion/ponencia/")))}${item.id}`}
                        nombre={item.titulo} icono="" cssclass="sm-lv-5" language={language} />
                }
            )
        }</>)
    }

    const listItmsPryts = (dataprts, language) => {
        return (<>{
            dataprts.sort((a, b) => (a.ptNombre > b.ptNombre) ? 1 : -1).map(
                (item) => {
                    return <ElementLevel key={uuidv4()} url={`investigacion/proyecto/${item.ptUrlParcial.trim()}`}
                        nombre={language==="es"?item.ptNombre:(language==="en"?item.ptNombreEn:item.ptNombrePt)} icono="" cssclass="sm-lv-4" language={language} />
                }
            )
        }</>)
    }

    const listItmsPrtsVinc = (datavinc, language) => {
        return (<>{
            datavinc.sort((a, b) => (a.pvTitulo > b.pvTitulo) ? 1 : -1).map(
                (item) => {
                    return <ElementLevel key={uuidv4()} url={`vinculacion/proyectos/${item.pvUrlParcial.trim()}`}
                        nombre={language==="es"?item.pvTitulo:(language==="en"?item.pvTituloEn:item.pvTituloPt)} icono="" cssclass="sm-lv-5" language={language} />
                }
            )
        }</>)
    }

    const listItmsGrps = (datagrps, language) => {
        return (<>{
            datagrps.sort((a, b) => (a.giNombre > b.giNombre) ? 1 : -1).map(
                (item) => {
                    return <ElementLevel key={uuidv4()} url={`investigacion/grupo/${item.giUrlParcial.trim()}`}
                        nombre={language==="es"?item.giNombre:(language==="en"?item.giNombreEn:item.giNombrePt)} icono="" cssclass="sm-lv-4" language={language} />
                }
            )
        }</>)
    }

    function SubitemElmTM(props) {
        if (props.itemlvl1.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === props.item.smCodigo).length > 0) {
            return (<>
                <li>
                    <details>
                        <summary className="sm-lv-3"><ElementLevelSimple url={props.item.smUrlAsoc} nombre={props.language==="es"?props.item.smNombre:(props.language==="en"?props.item.smNombreEn:props.item.smNombrePt)} icono="" language={props.language} /></summary>
                        <ul>
                            {listItemsForthLevel(props.itemlvl1, props.item.smCodigo, props.language)}
                        </ul>
                    </details>
                </li>
            </>)
        } else {
            if (props.item.smCodigo === 7 || props.item.smCodigo === 16 || props.item.smCodigo === 134 || props.item.smCodigo === 20 || props.item.smCodigo === 19 || props.item.smCodigo === 23 || props.item.smCodigo === 26) {
                return (<>
                    <li>
                        <details>
                            <summary className="sm-lv-3"><ElementLevelSimple url={props.item.smUrlAsoc} nombre={props.language==="es"?props.item.smNombre:(props.language==="en"?props.item.smNombreEn:props.item.smNombrePt)} icono="" language={props.language} /></summary>
                            <ul>
                                {(props.item.smCodigo === 7) && listItmsEvlInt(data.mnevint, props.language)}
                                {(props.item.smCodigo === 16) && listItmsMsc(data.mncarrmsc, props.language)}
                                {
                                    (props.item.smCodigo === 19) && (<>
                                        <li>
                                            <details>
                                                <summary className="sm-lv-4"><ElementLevelSimple url="" nombre={props.language==="es"?"Artículos científicos":(props.language==="en"?"Scientific articles":"Artigos científicos")} icono="" language={props.language} /></summary>
                                                <ul>
                                                    {listDataInvstg(data.mnart, 3, props.language)}
                                                </ul>
                                            </details>
                                        </li>
                                        <li>
                                            <details>
                                                <summary className="sm-lv-4"><ElementLevelSimple url="" nombre={props.language==="es"?"Ponencias":(props.language==="en"?"Presentations":"Apresentações")} icono="" language={props.language} /></summary>
                                                <ul>
                                                    {listDataInvstg(data.mnpon, 4, props.language)}
                                                </ul>
                                            </details>
                                        </li>
                                    </>)
                                }
                                {(props.item.smCodigo === 20) && listItmsPryts(data.mnprs, props.language)}
                                {
                                    (props.item.smCodigo === 23) && (<>
                                        <li>
                                            <details>
                                                <summary className="sm-lv-4"><ElementLevelSimple url="" nombre={props.language==="es"?"Libros":(props.language==="en"?"Books":"Livros")} icono="" language={props.language} /></summary>
                                                <ul>
                                                    {listDataInvstg(data.mnlib, 1, props.language)}
                                                </ul>
                                            </details>
                                        </li>
                                        <li>
                                            <details>
                                                <summary className="sm-lv-4"><ElementLevelSimple url="" nombre={props.language==="es"?"Capítulos de libros":(props.language==="en"?"Book chapters":"Capítulos de livros")} icono="" language={props.language} /></summary>
                                                <ul>
                                                    {listDataInvstg(data.mnclb, 2, props.language)}
                                                </ul>
                                            </details>
                                        </li>
                                    </>)
                                }
                                {(props.item.smCodigo === 26) && (<>{listItmsPrtsVinc(dataprv, props.language)}</>)}
                                {(props.item.smCodigo === 134) && listItmsGrps(data.mngps, props.language)}
                            </ul>
                        </details>
                    </li>
                </>)
            } else {
                return <ElementLevel key={uuidv4()} url={props.item.smUrlAsoc} nombre={props.language==="es"?props.item.smNombre:(props.language==="en"?props.item.smNombreEn:props.item.smNombrePt)} icono="" cssclass="sm-lv-3" language={props.language} />
            }
        }
    }

    const ListSubitemsElmTM = (itemTM, language) => {
        return (<>{
            itemTM.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === -1).sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map((item) => {
                return <SubitemElmTM key={uuidv4()} itemlvl1={itemTM} item={item} language={language} />
            })
        }</>)
    }

    const listItemsRCts = (datapages, language) => {
        return (<>{
            datapages.sort((a, b) => (a.pwNombre > b.pwNombre) ? 1 : -1).map(
                (page) => {
                    return <ElementLevel key={uuidv4()} url={`rendicion-cuentas/${page.pwUrlPag.trim()}`}
                        nombre={language==="es"?page.pwNombre:(language==="en"?page.pwNombreEn:page.pwNombrePt)} icono="" cssclass="sm-lv-3" language={language} />
                }
            )
        }</>)
    }

    function ItemTM(props) {
        if (props.item.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === -1).length > 0) {
            return (<>
                <li><details>
                    <summary className="sm-lv-2">
                        {<ElementLevelSimple url={props.item.mnUrlAsoc} nombre={props.language==="es"?props.item.mnNombre:(props.language==="en"?props.item.mnNombreEn:props.item.mnNombrePt)} icono={props.item.mnIcono} language={props.language} />}
                    </summary>
                    <ul>
                        {ListSubitemsElmTM(props.item, props.language)}
                    </ul>
                </details>
                </li>
            </>)
        } else {
            if (props.item.mnCodigo === 26 || props.item.mnCodigo === 9 || props.item.mnCodigo === 15) {
                return (<>
                    <li><details>
                        <summary className="sm-lv-2">
                            {<ElementLevelSimple url={(props.item.mnUrlAsoc === 15) ? item.mnUrlAsoc : "#"} nombre={props.language==="es"?props.item.mnNombre:(props.language==="en"?props.item.mnNombreEn:props.item.mnNombrePt)} icono={props.item.mnIcono} language={props.language} />}
                        </summary>
                        <ul>
                            {(props.item.mnCodigo === 9) && (<><ElementLevel url="grado/calendario-academico" nombre={props.language==="es"?"Calendario Académico":(props.language==="en"?"Academic Calendar":"Calendário académico")} icono="" cssclass="sm-lv-4" language={props.language} />{listItmsFcts(data.mncrs, props.language)}</>)}
                            {(props.item.mnCodigo === 15) && (listItemsRCts(datarcts, props.language))}
                        </ul>
                    </details>
                    </li>
                </>)
            } else {
                return <ElementLevel url={props.item.mnUrlAsoc} nombre={props.language==="es"?props.item.mnNombre:(props.language==="en"?props.item.mnNombreEn:props.item.mnNombrePt)} icono={props.item.mnIcono} cssclass="sm-lv-2" language={props.language} />
            }
        }
    }

    const renderElementsThirdMenu = (dataThird, language) => {
        return (<>{
            dataThird.sort((a, b) => (a.mnOrden > b.mnOrden) ? 1 : -1).map((item) => {
                return <ItemTM key={uuidv4()} item={item} language={language} />
            })
        }</>)
    }

    function listItmsFcts(dataFaculty, language) {
        var listFaculty = dataFaculty.map(a => a.crDepartamento.dpCodigo.trim());
        listFaculty = [...new Set(listFaculty)];

        return (<>{
            listFaculty.length > 0 && (<>
                {listItemsFaculties(listFaculty, dataFaculty, language)}
            </>)
        }</>);
    }

    const ItemsCareers = (dataItems, language) => {
        return (<>{
            dataItems.sort((a, b) => (a.crNombre.trim() > b.crNombre.trim()) ? 1 : -1).map(
                (career) => {
                    return (<ElementLevel key={uuidv4()} url={`grado/carrera/${career.crUrlParcial}`} nombre={language==="es"?career.crNombre:(language==="en"?career.crNombreEn:career.crNombrePt)} icono="" cssclass="sm-lv-5" language={language} />)
                })
        }</>);
    }

    function ItemFaculty(props) {
        return (<>
            <li><details>
                <summary className="sm-lv-4"><ElementLevelSimple url={`grado/facultad/${props.listCrs[0].crDepartamento.dpParcialUrl.trim()}`} nombre={props.language==="es"?props.listCrs[0].crDepartamento.dpNombre:(props.language==="en"?props.listCrs[0].crDepartamento.dpNombreEn:props.listCrs[0].crDepartamento.dpNombrePt)} icono="" language={props.language} /></summary>
                <ul>
                    {ItemsCareers(props.listCrs, props.language)}
                </ul>
            </details></li>
        </>)
    }

    const listItemsFaculties = (dataItems, dataFct, language) => {
        return (<>{
            dataItems.sort((a, b) => (a.dpNombre > b.dpNombre) ? 1 : -1).map(
                (faculty) => {
                    var listCrs = dataFct.filter(item => item.crDepartamento.dpCodigo === faculty);
                    return (<ItemFaculty key={uuidv4()} listCrs={listCrs} language={language} />)
                })
        }</>)
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2"><i className="fa fa-sitemap" aria-hidden="true"></i>&nbsp;{data.language==="es"?"Mapa del sitio":(data.language==="en"?"Site map":"Mapa do sítio")}</h2>
            <div className="col-md-12 w-100 mt-2">
                <div className="row w-100">
                    <ul className="tree">
                        <li>
                            <details open>
                                <summary className="sm-lv-1" onClick={handleClick(data.language)} data-toggle="tooltip" data-placement="bottom" 
                                title={data.language==="es"?"Ir a la página web de la UTEQ":(data.language==="en"?"Go to the UTEQ website":"Aceder ao sítio Web da UTEQ")}>
                                    {data.language==="es"?"Sitio web de la Universidad Técnica Estatal de Quevedo":(data.language==="en"?"Quevedo State Technical University Website":"Site da Universidade Técnica Estadual de Quevedo")}</summary>
                                <ul>
                                    {
                                        (datamns !== null && datamns !== "") && (<>
                                            {renderElementsFirstMenu(datamns.filter(item => item.mnTpMenu === "MN_PRIM"), data.language)}
                                            {renderElementsSecondMenu(datamns.filter(item => item.mnTpMenu === "MN_SEGD"), data.language)}
                                            {renderElementsThirdMenu(datamns.filter(item => item.mnTpMenu === "MN_TERC"), data.language)}
                                        </>)
                                    }
                                    <li><h3 className="sm-lv-2">
                                        <a href={`/${data.language}/cidu`} target="_blank" data-toggle="tooltip" data-placement="bottom"
                                            title={data.language==="es"?"Ir a la página web de Congreso Internacional de Desarrollo Universitario - CIDU":(data.language==="en"?"Go to the International Congress on University Development - CIDU website":"Aceder ao sítio Web do Congresso Internacional de Desenvolvimento Universitário - CIDU")}>
                                            {data.language==="es"?"Congreso Internacional de Desarrollo Universitario - CIDU":(data.language==="en"?"International Congress on University Development - CIDU":"Congresso Internacional de Desenvolvimento Universitário - CIDU")}
                                        </a>
                                    </h3></li>
                                    <li><h3 className="sm-lv-2">
                                        <a href={`/${data.language}/busqueda`} target="_blank" data-toggle="tooltip" data-placement="bottom"
                                            title={data.language==="es"?"Ir a la página web de búsqueda de información":(data.language==="en"?"Go to the information search website":"Ir para o sítio Web de pesquisa de informações")}>
                                            {data.language==="es"?"Búsqueda de información":(data.language==="en"?"Search for information":"Procurar informações")}
                                        </a>
                                    </h3></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>)
}