import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const AyudasEconomicas = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default AyudasEconomicas;

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
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}7c9933c5-2ac0-42d1-84df-0f4c46d35658`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            data8: resInfoPageWeb.data,
            option: 77,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            titlepage: (locale === "es" ? "Ayudas económicas" : (locale === "en" ? "Financial aid" : "Assistência financeira")),
            descpage: (locale === "es" ? "Sitio web de información de las ayudas económicas" : (locale === "en" ? "Financial aid information website" : "Site de informações sobre ajuda financeira")),
            urlpageweb: `${apiUrl}/${locale}/ubu/ayudas-economicas`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_ayudas_economicas_ubu_uteq_es.jpg":(locale==="en"?"imagen_ayudas_economicas_ubu_uteq_en.jpg":"imagen_ayudas_economicas_ubu_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '7c9933c5-2ac0-42d1-84df-0f4c46d35658',
            language: locale,
        }
    };
};
