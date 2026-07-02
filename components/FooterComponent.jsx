import React, { useState, useEffect } from "react";
import { WS_LIST_ITEMS_MENU } from 'config';
import axios from 'axios';
import { useRouter } from 'next/router';


export { FooterComponent };


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

function FooterComponent(props) {
    const [itemsFooter, setItemsFooter] = useState([]);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_ITEMS_MENU}MN_PIEP`);

            if (result.data !== null && result.data !== "") {
                setItemsFooter(result.data);
            }

        })();
    }, []);

    const renderElementMenu = (subitem) => {
        switch (subitem.smTipoNodo) {
            case 1:
                return <li key={subitem.smCodigo}><h1>{router.locale === "es" ? subitem.smNombre : (router.locale === "en" ? subitem.smNombreEn : subitem.smNombrePt)}</h1></li>;
            case 2:
                return <li id="info" key={subitem.smCodigo}>{router.locale === "es" ? subitem.smNombre : (router.locale === "en" ? subitem.smNombreEn : subitem.smNombrePt)}</li>;
            default:
                if (subitem.smIcono === "") {
                    return <li key={subitem.smCodigo}><a href={subitem.smUrlAsoc} target="_blank" rel="noreferrer">{router.locale === "es" ? subitem.smNombre : (router.locale === "en" ? subitem.smNombreEn : subitem.smNombrePt)}</a></li>;
                } else {
                    if (subitem.smCodPadre === -1) {
                        return <li id="itm-list-small" key={subitem.smCodigo}><a href={subitem.smUrlAsoc} target="_blank" rel="noreferrer"><i className={subitem.smIcono}></i>{'\u00A0'}{'\u00A0'}{router.locale === "es" ? subitem.smNombre : (router.locale === "en" ? subitem.smNombreEn : subitem.smNombrePt)}</a></li>;
                    } else {
                        return <li className="list-inline-item" key={subitem.smCodigo}><a href={subitem.smUrlAsoc} target="_blank" data-toggle="tooltip" data-placement="bottom" title={router.locale === "es" ? subitem.smNombre : (router.locale === "en" ? subitem.smNombreEn : subitem.smNombrePt)} rel="noreferrer"><i className={subitem.smIcono}></i></a></li>;
                    }
                }
        }
    }

    return (<div className="footer">
        <div className="contain mb-5">
            {itemsFooter.map(
                (item) => (
                    <div className="col" key={item.mnCodigo}>
                        <h1>{router.locale === "es" ? item.mnNombre : (router.locale === "en" ? item.mnNombreEn : item.mnNombrePt)}</h1><hr className="rounded" /><ul id="link-items">
                            {item.mnListadoSubmenus.map(subitem => { return renderElementMenu(subitem) })}
                        </ul></div>
                )
            )}
            <div className="clearfix"></div>
        </div><hr className="rounded" />
        <p id="elm-copyright">© {new Date().getFullYear()} {router.locale === "es" ? "Universidad Técnica Estatal de Quevedo" : (router.locale === "en" ? "Quevedo State Technical University" : "Universidade Técnica Estatal de Quevedo")}</p>
    </div>)
};
