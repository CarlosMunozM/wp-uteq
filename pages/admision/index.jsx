import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
/*import {
    WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, WS_INFORMATION_DEPARTAMENT, WS_LIST_IMAGES_SLIDER, WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT,
    WS_LIST_ACTIVITIES_BY_CALENDAR, apiUrl, FRONT_PG_IMGS_FOLDER, WS_LIST_CAREERS_UNIVS_UAN, WS_LIST_ITEMS_MENU_LAT_BY_LANG,

    WS_LIST_METRICS_SGA
} from 'config';*/

import {
    apiUrl, FRONT_PG_IMGS_FOLDER, WS_LIST_METRICS_SGA, WS_INFORMATION_DEPARTAMENT
} from 'config';

const Admision2 = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Admision2;

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

    /*const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}24`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/5`);*/
    const resInfoDepartm = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}fa1a2bdc-9fb9-11ec-bfdc-244bfe557d55`);
    /*const resInfoAuthority = await make_request_ws(`${WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT}fa1a2bdc-9fb9-11ec-bfdc-244bfe557d55/140`);
    const resListActvCald = await make_request_ws(`${WS_LIST_ACTIVITIES_BY_CALENDAR}ADMIS`);
    const resDataQuestions = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}PREG_FREC`);
    const resDataCars = await make_request_ws(WS_LIST_CAREERS_UNIVS_UAN);*/

    const resMetrics = await make_external_request_ws(WS_LIST_METRICS_SGA);

    return {
        props: {
            /*data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,*/
            option: 79,
            /*campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            slider1: resSlider.data,
            data8: resInfoDepartm.data,
            authort: resInfoAuthority.data,
            calendars: resListActvCald.data,
            question: resDataQuestions.data,
            dataform5: resDataCars.data,*/

            metrics: resMetrics.data,
            
            titlepage: (locale === "es" ? resInfoDepartm.data.dpNombre.trim() : (locale === "en" ? resInfoDepartm.data.dpNombreEn.trim() : resInfoDepartm.data.dpNombrePt.trim())),
            descpage: `${locale === "es" ? "Sitio web de la" : (locale === "en" ? "Website of the" : "Website do")} ${locale === "es" ? resInfoDepartm.data.dpNombre.trim() : (locale === "en" ? resInfoDepartm.data.dpNombreEn.trim() : resInfoDepartm.data.dpNombrePt.trim())}`,
            urlpageweb: `${apiUrl}/${locale}/admision`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_admision_uteq_es.jpg":(locale==="en"?"imagen_admision_uteq_en.jpg":"imagen_admision_uteq_pt.jpg")}`,
            /*bannerimg: resInfoDepartm.data.dpImgBanner.trim(),*/
            codpage: 'fa1a2bdc-9fb9-11ec-bfdc-244bfe557d55',
            language: locale,
        }
    };
};