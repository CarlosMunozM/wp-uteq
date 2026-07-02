import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_ENTITY_CBX_SGA,
    WS_LIST_YEARS_BY_ENTITY_SGA, WS_LIST_BOOKS_SLIDER_SGA, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Libros = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Libros;

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

export const getStaticProps = async ({ locale }) => {

    const https = require('https');
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    const resVideoInv = await make_request_ws(`${WS_LIST_VIDEOS_UNIV_BY_TYPE}107/1`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}31`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}75d004d0-62e0-4d58-9846-849b7673a835`);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resListAreas = await make_external_request_ws(`${WS_LIST_ITEMS_ENTITY_CBX_SGA}`);
    const resYearsBooks = await make_external_request_ws(`${WS_LIST_YEARS_BY_ENTITY_SGA}1`);
    const resYearsChpts = await make_external_request_ws(`${WS_LIST_YEARS_BY_ENTITY_SGA}2`);
    const resBooksSld = await make_external_request_ws(`${WS_LIST_BOOKS_SLIDER_SGA}2`);

    function getListYearsOfInfo(resYearsBooks, resYearsChpts) {

        var listOut = [];

        if (resYearsBooks !== null && resYearsBooks !== "") {
            if (resYearsBooks.data.length > 0) {
                resYearsBooks.data.map((year) => {
                    listOut = [year, ...listOut];
                })
            }
        }

        if (resYearsChpts !== null && resYearsChpts !== "") {
            if (resYearsChpts.data.length > 0) {
                resYearsChpts.data.map((year) => {
                    listOut = [year, ...listOut];
                })
            }
        }

        if (listOut.length > 0) {
            listOut = [...new Set(listOut)];
            listOut = listOut.sort((a, b) => (a > b) ? 1 : -1);
        }

        return listOut;
    }


    return {
        props: {
            data5: resVideoInv.data,
            years: getListYearsOfInfo(resYearsBooks, resYearsChpts),
            booksld: resBooksSld.data,
            areaConocm: resListAreas.data,
            option: 63,
            sidemenu: resSideMenu.data,
            data8: resInfoPageWeb.data,
            datamagz: resMagazines.data,
            titlepage: (locale==="es"?resInfoPageWeb.data.pwNombre.trim():(locale==="en"?resInfoPageWeb.data.pwNombreEn.trim():resInfoPageWeb.data.pwNombrePt.trim())) + " - UTEQ",
            descpage: (locale==="es"?resInfoPageWeb.data.pwDescripcion.trim():(locale==="en"?resInfoPageWeb.data.pwDescripcionEn.trim():resInfoPageWeb.data.pwDescripcionPt.trim())),
            urlpageweb: `${apiUrl}/${locale}/investigacion/libros`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_libros_institucionales_uteq_es.jpg":(locale==="en"?"imagen_libros_institucionales_uteq_en.jpg":"imagen_libros_institucionales_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '75d004d0-62e0-4d58-9846-849b7673a835',
            language: locale,
        }
    };
};