import { Navbar, Nav, NavDropdown, Container, SSRProvider, NavLink } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from "react";
import { Router, useRouter } from 'next/router';
import axios from 'axios';
import { WS_LIST_ALL_ITEMS_MENU_BY_LANG } from 'config';



export { TopMenu };

function ItemMenu(props) {
    const regEx = /^http/;

    switch (props.tipo) {
        case 1:
            return <a className="nav-link" target="_blank" href={!regEx.test(props.url) ? ("/" + props.url) : props.url} rel="noreferrer">
                <i className={props.icono}></i>&nbsp;&nbsp;{props.nombre}
            </a>
            break;
        case 2:
            return <a className="nav-link" href={!regEx.test(props.url) ? ("/" + props.url) : props.url} target="_blank" rel="noreferrer">{props.nombre}</a>;
            break;
        case 3:
            return <NavDropdown.Item href={!regEx.test(props.url) ? ("/" + props.url) : props.url}>{props.nombre}</NavDropdown.Item>
            break;
        case 4:
            return <li>
                <a className="dropdown-item" href={!regEx.test(props.url) ? ("/" + props.url) : props.url}>{props.nombre}</a>
            </li>
            break;
        case 5:
            return <NavDropdown.Item as="a" href={!regEx.test(props.url) ? ("/" + props.url) : props.url}>
                {props.nombre}
            </NavDropdown.Item>
            break;
        case 6:
            return <Nav.Item as="li">
                <a className="link-menu-tst" href={!regEx.test(props.url) ? ("/" + props.url) : props.url}>{'\u00A0'}{'\u00A0'}{props.nombre}</a>
            </Nav.Item>
            break;
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

function TopMenu() {

    const [itemsFirstMenu, setItemsFirstMenu] = useState([]);
    const [itemsSecondMenu, setItemsSecondMenu] = useState([]);
    const [itemsThirdMenu, setItemsThirdMenu] = useState([]);

    const [wordsUser, setWordsUser] = useState('');

    const router = useRouter();
    const regEx = /^http/;


    useEffect(() => {
        (async () => {
            const result = await make_request_ws(WS_LIST_ALL_ITEMS_MENU_BY_LANG);

            if (result.data !== null && result.data !== "") {
                setItemsFirstMenu(result.data.filter(item => item.mnTpMenu === "MN_PRIM").sort((a, b) => (a.mnOrden > b.mnOrden) ? 1 : -1));
                setItemsSecondMenu(result.data.filter(item => item.mnTpMenu === "MN_SEGD").sort((a, b) => (a.mnOrden > b.mnOrden) ? 1 : -1));
                setItemsThirdMenu(result.data.filter(item => item.mnTpMenu === "MN_TERC").sort((a, b) => (a.mnOrden > b.mnOrden) ? 1 : -1));
            }
        })();
    }, []);

    const linkSearch = () => {
        router.push({ pathname: '/' + router.locale + '/busqueda' });
    };

    const handleChange = event => {
        setWordsUser(event.target.value);
    };

    const eventKeyPress = event => {
        if (event.charCode === 13) {
            linkSearch();
        }
    };

    const handleLocaleChange = (language) => {
        router.push(router.route, router.asPath, {
            locale: language,
        });
    };

    const renderElementNavFirstMenu = (dataFrst) => {

        const listItemsFirstMenu = dataFrst.map((item) =>
            <ItemMenu key={uuidv4()} url={!regEx.test(item.mnUrlAsoc) ? (router.locale + "/" + item.mnUrlAsoc) : item.mnUrlAsoc} icono={item.mnIcono} nombre={router.locale === "es" ? item.mnNombre : (router.locale === "en" ? item.mnNombreEn : item.mnNombrePt)} tipo={1} />
        );

        return (<nav className="navbar navbar-expand-md menu-primary">
            <div className="container-fluid">
                <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-header1"
                    aria-controls="navbar-header1" aria-expanded="false" aria-label="Menú primario">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse sect-options" id="navbar-header1">
                    <ul className="navbar-nav ms-auto">
                    	{/*<li className="nav-item d-flex align-items-center justify-content-center">
                            <h6 className="msg-christmas" id="message-christmas"></h6>
                        </li>*/}
                        {listItemsFirstMenu}
                    	<div className="nav-item-language-group">
                        <li className="nav-item mx-auto">
                            <a className={`nav-link ${router.locale === "en" ? "language-selc" : ""}`} href="#" data-toggle="tooltip" data-placement="bottom"
                                title={router.locale === "es" ? "Idioma Inglés" : (router.locale === "en" ? "Language English" : "Língua Inglês")} onClick={() => handleLocaleChange("en")}>
                                EN
                            </a>
                        </li>
                        <li className="nav-item mx-auto">
                            <a className={`nav-link ${router.locale === "es" ? "language-selc" : ""}`} href="#" data-toggle="tooltip" data-placement="bottom"
                                title={router.locale === "es" ? "Idioma Español" : (router.locale === "en" ? "Language Spanish" : "Língua Inglês")} onClick={() => handleLocaleChange("es")}>
                                ES
                            </a>
                        </li>
                        <li className="nav-item mx-auto">
                            <a className={`nav-link ${router.locale === "pt" ? "language-selc" : ""}`} href="#" data-toggle="tooltip" data-placement="bottom"
                                title={router.locale === "es" ? "Idioma Portugués" : (router.locale === "en" ? "Language Portuguese" : "Língua portuguesa")} onClick={() => handleLocaleChange("pt")}>
                                PT
                            </a>
                        </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>);
    }

    const renderElementNavSecondMenu = (dataSecnd) => {

        const listItemsSecondMenu = dataSecnd.map((item) =>
            <ItemMenu key={uuidv4()} url={!regEx.test(item.mnUrlAsoc) ? (router.locale + "/" + item.mnUrlAsoc) : item.mnUrlAsoc} icono="" nombre={router.locale === "es" ? item.mnNombre : (router.locale === "en" ? item.mnNombreEn : item.mnNombrePt)} tipo={2} />
        );

        return (<nav className="navbar navbar-expand-lg menu-second">
            <div className="container-fluid">
                <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-header2" aria-controls="navbar-header2" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-header2">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="navbar-brand" href={`/${router.locale}`} data-toggle="tooltip" data-placement="bottom" title={router.locale === "es" ? "Ir a la página de Inicio" : (router.locale === "en" ? "Go to the home page" : "Ir para a página inicial")}>
                                <img src={`/assets/img/${router.locale === "es" ? "logo-grd_.webp" : (router.locale === "en" ? "logo-grd-en_.webp" : "logo-grd-pt_.webp")}`} alt="Inicio" className="img-fluid" width="350" height="60" />
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {listItemsSecondMenu}
                    </ul>
                    <div className="d-flex txt-frm">
                        <div className="input-group col-xs-3 mx-auto" onClick={linkSearch} data-toggle="tooltip" data-placement="bottom" title={router.locale === "es" ? "Búsqueda de información" : (router.locale === "en" ? "Search for information" : "Pesquisa de informação")}>
                            <input className="form-control border-end-0 border input-md" type="text" aria-labelledby="btn-search-wp" id="input-search-frm" disabled={true} />
                            <span className="input-group-append">
                                <button className="btn btn-outline-secondary border-start-0 border btn-search-frm" type="button" id="btn-search-wp" aria-label="Buscar">
                                    <i className="fa fa-search btn-srch"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>);
    }

    const listItemsFirstLevel = (dataItems) => {
        return (<>{
            dataItems.map(
                (item) => {
                    if (item.mnListadoSubmenus.length > 0) {
                        return <NavDropdown id="basic-nav-dropdown-lv1" as="li" key={uuidv4()} title={router.locale === "es" ? item.mnNombre.trim() : (router.locale === "en" ? item.mnNombreEn : item.mnNombrePt)} aria-expanded="false" className='link-dm-item link-menu-tst'>
                            {listItemsSecondLevel(item)}
                        </NavDropdown>
                    } else {
                        return <ItemMenu key={uuidv4()} url={!regEx.test(item.mnUrlAsoc) ? (router.locale + "/" + item.mnUrlAsoc.trim()) : item.mnUrlAsoc.trim()} icono="" nombre={router.locale === "es" ? item.mnNombre.trim() : (router.locale === "en" ? item.mnNombreEn : item.mnNombrePt)} tipo={6} />
                    }
                }
            )
        }</>)
    }

    const listItemsSecondLevel = (dataItems) => {
        return (<>{
            dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === -1).sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                (item) => {
                    if (dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === item.smCodigo).length > 0) {
                        return <NavDropdown id="basic-nav-dropdown-nst" as="ul" key={uuidv4()}
                            title={router.locale === "es" ? item.smNombre.trim() : (router.locale === "en" ? item.smNombreEn.trim() : item.smNombrePt.trim())} drop='end' aria-expanded="false">
                            {listItemsThirdLevel(dataItems, item.smCodigo)}
                        </NavDropdown>
                    } else {
                        return <ItemMenu key={uuidv4()} url={!regEx.test(item.smUrlAsoc) ? (router.locale + "/" + item.smUrlAsoc.trim()) : item.smUrlAsoc.trim()} icono="" nombre={router.locale === "es" ? item.smNombre.trim() : (router.locale === "en" ? item.smNombreEn.trim() : item.smNombrePt.trim())} tipo={5} />
                    }
                }
            )
        }</>)
    }

    const listItemsThirdLevel = (dataItems, codNvl2) => {
        return (<>{
            dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === codNvl2).sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                (item) => {
                    if (dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === item.smCodigo).length > 0) {
                        return <NavDropdown id="basic-nav-dropdown-nst" as="li" key={uuidv4()} title={router.locale === "es" ? item.smNombre.trim() : (router.locale === "en" ? item.smNombreEn.trim() : item.smNombrePt.trim())} drop='end' aria-expanded="false">
                            {listItemsFourthLevel(dataItems, item.smCodigo)}
                        </NavDropdown>
                    } else {
                        return <ItemMenu key={uuidv4()} url={/*!regEx.test(item.smUrlAsoc) ? (router.locale + "/" + item.smUrlAsoc.trim()) : item.smUrlAsoc.trim()*/
                        !regEx.test(item.smUrlAsoc) ? (router.locale + "/" + item.smUrlAsoc.trim()) :
                            (item.smUrlAsocEn.indexOf("revistas.uteq.edu.ec") ? (router.locale === "es" ? item.smUrlAsoc.trim() : (router.locale === "en" ? item.smUrlAsocEn.trim() : item.smUrlAsocPt.trim())) :
                                item.smUrlAsoc.trim())} icono="" nombre={router.locale === "es" ? item.smNombre.trim() : (router.locale === "en" ? item.smNombreEn.trim() : item.smNombrePt.trim())} tipo={4} />
                    }
                })
        }</>);
    }

    const listItemsFourthLevel = (dataItems, codNvl3) => {
        return (<>{
            dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === codNvl3).sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                (item) => {
                    return <ItemMenu key={uuidv4()} url={!regEx.test(item.smUrlAsoc) ? (router.locale + "/" + item.smUrlAsoc.trim()) : item.smUrlAsoc.trim()} icono="" nombre={router.locale === "es" ? item.smNombre.trim() : (router.locale === "en" ? item.smNombreEn.trim() : item.smNombrePt.trim())} tipo={3} />
                }
            )
        }</>)
    }

    const renderElementNavThirdMenu = (elementsMenu) => {

        return (
            <Navbar collapseOnSelect className="menu-third" sticky='top' expand="lg">
                <Container fluid>
                    <Navbar.Toggle className='custom-toggler-thr' type='button' aria-controls='navbar-header3' aria-expanded="false"
                        aria-label='Toggle navigation'><span className="navbar-toggler-icon"></span></Navbar.Toggle>
                    <Navbar.Collapse id="navbar-header3">
                        <Nav as="ul" className="mb-2 mb-lg-0 mx-auto">
                            {listItemsFirstLevel(elementsMenu)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );

    }

    return (<><SSRProvider>{renderElementNavFirstMenu(itemsFirstMenu)}{renderElementNavSecondMenu(itemsSecondMenu)}{renderElementNavThirdMenu(itemsThirdMenu)}</SSRProvider></>);
}