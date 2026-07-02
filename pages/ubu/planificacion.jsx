import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_DATA_ALL_EVENTS_BY_DEPARTAMENT, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Planificacion = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Planificacion;

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

export const getStaticProps = async ({ locale }) => {

    const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}29`);
    const resEvents = await make_request_ws(`${WS_LIST_DATA_ALL_EVENTS_BY_DEPARTAMENT}1f8dbd8f-85d1-11ec-bf03-244bfe557d55`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}50731aac-57fc-4ea2-a891-86fc673055de`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            data8: resInfoPageWeb.data,
            option: 29,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            activities: resEvents.data,
            titlepage: (locale === "es" ? "Calendario de actividades del UBU" : (locale === "en" ? "Calendar of UBU activities" : "Calendário de actividades da UBU")),
            descpage: (locale === "es" ? "Sitio web de la planificación de actividades del UBU" : (locale === "en" ? "UBU activity planning website" : "Sítio Web de planeamento de actividades da UBU")),
            urlpageweb: `${apiUrl}/${locale}/ubu/planificacion`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_planificacion_ubu_uteq_es.jpg":(locale==="en"?"imagen_planificacion_ubu_uteq_en.jpg":"imagen_planificacion_ubu_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '50731aac-57fc-4ea2-a891-86fc673055de',
            language: locale,
        }
    };
};