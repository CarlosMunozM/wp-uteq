import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, 
    FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_COMP_TYPES_AGREEMENTS_SGA,
    WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Convenios = (props) => {
    return (
        LayoutSecond(props)
    );
};

const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false
});

export default Convenios;

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

    const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}30`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}86545ad7-22e1-49fe-9dc7-aa748f045386`);
    const resListCompTypes = await make_external_request_ws(`${WS_LIST_COMP_TYPES_AGREEMENTS_SGA}`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            listTC: resListCompTypes.data,
            option: 42,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            titlepage: 'Convenios de prácticas laborales y prácticas de servicios comunitarios',
            descpage: 'Sitio web de la información detallada de convenios suscritos por el Departamento de Vinculación',
            urlpageweb: `${apiUrl}/${locale}/vinculacion/convenios`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_convenios_vinculacion_uteq_es.jpg":(locale==="en"?"imagen_convenios_vinculacion_uteq_en.jpg":"imagen_convenios_vinculacion_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '86545ad7-22e1-49fe-9dc7-aa748f045386',
            language: locale,
        }
    };
};