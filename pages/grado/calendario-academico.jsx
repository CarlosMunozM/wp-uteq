import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_ACTIVITIES_BY_CALENDAR, FRONT_PG_IMGS_FOLDER, apiUrl,
    WS_INFORMATION_PAGE_WEB, WS_LIST_V3_DATA_URLS_FACULTIES_UTEQ, WS_LIST_ITEMS_MENU_LAT_BY_LANG
} from 'config';

const CalendarioAcad = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default CalendarioAcad;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}33`);
    const resListActvCald = await make_request_ws(`${WS_LIST_ACTIVITIES_BY_CALENDAR}GRADO`);
    const resDataFaculties = await make_request_ws(WS_LIST_V3_DATA_URLS_FACULTIES_UTEQ);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}45a667a3-f480-40cd-affc-7df37d7502f1`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 5,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            calendars: resListActvCald.data,
            faculties: resDataFaculties.data,
            titlepage: (locale === "es" ? "Calendarios académicos - UTEQ" : (locale === "en" ? "Academic calendars - UTEQ" : "Calendários académicos - UTEQ")),
            descpage: (locale === "es" ? "Sitio web de la información de los calendarios académicos de la UTEQ" : (locale === "en" ? "UTEQ's academic calendars information website" : "Calendários académicos da UTEQ")),
            urlpageweb: `${apiUrl}/${locale}/grado/calendario-academico`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale === "es" ? "imagen_calendario_academico_uteq_es.jpg" : (locale === "en" ? "imagen_calendario_academico_uteq_en.jpg" : "imagen_calendario_academico_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '45a667a3-f480-40cd-affc-7df37d7502f1',
            language: locale,
        }
    };
};