import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    apiUrl, FRONT_PG_IMGS_FOLDER, WS_LIST_ALL_SM_NEWS, WS_LIST_IMAGES_SLIDER, WS_LIST_URLS_SM_CAREERS_UNIVERSITY_BY_DEPART,
    WS_LIST_IS_CAREERS_GRADE_BY_FACULTY, WS_LIST_SM_RESEARCH_GROUP_BY_FACULTY,
    WS_LIST_SM_RESEARCH_PROJECTS, WS_LIST_ITEMS_FILTER_SGA, WS_LIST_ITEMS_MENU_LAT_BY_LANG
} from 'config';

const MapaSitio = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default MapaSitio;

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
    const smcom = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}28`);
    const smnews = await make_request_ws(WS_LIST_ALL_SM_NEWS);
    const smei = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/4`);
    const smpsg = await make_request_ws(`${WS_LIST_URLS_SM_CAREERS_UNIVERSITY_BY_DEPART}37823e40-8900-11ec-b5cf-244bfe557d55`);
    const smcrs = await make_request_ws(WS_LIST_IS_CAREERS_GRADE_BY_FACULTY);
    const smgps = await make_request_ws(WS_LIST_SM_RESEARCH_GROUP_BY_FACULTY);
    const smprs = await make_request_ws(WS_LIST_SM_RESEARCH_PROJECTS);
    const smart = await make_external_request_ws(WS_LIST_ITEMS_FILTER_SGA + "tipo=3");
    const smpon = await make_external_request_ws(WS_LIST_ITEMS_FILTER_SGA + "tipo=4");
    const smlib = await make_external_request_ws(WS_LIST_ITEMS_FILTER_SGA + "tipo=1");
    const smclb = await make_external_request_ws(WS_LIST_ITEMS_FILTER_SGA + "tipo=2");

    return {

        props: {
            mncom: smcom.data,
            mnnews: smnews.data,
            mnevint: smei.data,
            mncarrmsc: smpsg.data,
            mncrs: smcrs.data,
            mngps: smgps.data,
            mnprs: smprs.data,
            mnart: smart.data,
            mnpon: smpon.data,
            mnlib: smlib.data,
            mnclb: smclb.data,
            option: 73,
            titlepage: (locale === "es" ? "Mapa del sitio - UTEQ" : (locale === "en" ? "Sitemap - UTEQ" : "Mapa do site - UTEQ")),
            descpage: (locale === "es" ? "Sitio web de información referencial acerca del listado de página web del sitio web de la UTEQ" : (locale === "en" ? "Website referential information about the webpage listing of the UTEQ website" : "Informação referencial do sítio Web sobre a listagem da página Web da UTEQ")),
            urlpageweb: `${apiUrl}/${locale}/mapa-del-sitio`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_mapa_del_sitio_web_uteq_es.jpg":(locale==="en"?"imagen_mapa_del_sitio_web_uteq_en.jpg":"imagen_mapa_del_sitio_web_uteq_pt.jpg")}`,
            bannerimg: '',
            codpage: '0b31955d-0b08-49a7-b031-f7c7407d913b',
            language: locale,
        }
    };

}