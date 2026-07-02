import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_ENTITY_CBX_SGA, WS_LIST_YEARS_BY_ENTITY_SGA, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const ProduccionCientifica = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default ProduccionCientifica;

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
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}198b2a34-5498-4aab-8029-ae54fa9bd4f9`);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resListAreas = await make_external_request_ws(`${WS_LIST_ITEMS_ENTITY_CBX_SGA}`);
    const resYearsPapers = await make_external_request_ws(`${WS_LIST_YEARS_BY_ENTITY_SGA}3`);
    const resYearSctfc = await make_external_request_ws(`${WS_LIST_YEARS_BY_ENTITY_SGA}4`);

    function getListYearsOfInfo(resYearsPapers, resYearSctf) {

        var listOut = [];

        if (resYearsPapers !== null && resYearsPapers !== "") {
            if (resYearsPapers.data.length > 0) {
                resYearsPapers.data.map((year) => {
                    listOut = [year, ...listOut];
                })
            }
        }

        if (resYearSctf !== null && resYearSctf !== "") {
            if (resYearSctf.data.length > 0) {
                resYearSctf.data.map((year) => {
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
            areaConocm: resListAreas.data,
            option: 62,
            years: getListYearsOfInfo(resYearsPapers,resYearSctfc),
            sidemenu: resSideMenu.data,
            data8: resInfoPageWeb.data,
            datamagz: resMagazines.data,
            titlepage: (locale==="es"?resInfoPageWeb.data.pwNombre.trim():(locale==="en"?resInfoPageWeb.data.pwNombreEn.trim():resInfoPageWeb.data.pwNombrePt.trim())),
            descpage: (locale==="es"?resInfoPageWeb.data.pwDescripcion.trim():(locale==="en"?resInfoPageWeb.data.pwDescripcionEn.trim():resInfoPageWeb.data.pwDescripcionPt.trim())),
            urlpageweb: `${apiUrl}/${locale}/investigacion/produccion-cientifica`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_produccion_cientifica_uteq_es.jpg":(locale==="en"?"imagen_produccion_cientifica_uteq_en.jpg":"imagen_produccion_cientifica_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '198b2a34-5498-4aab-8029-ae54fa9bd4f9',
            language: locale,
        }
    };
};