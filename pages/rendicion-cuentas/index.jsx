import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_INFORMATION_PAGE_WEB, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const RendicionCtas = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default RendicionCtas;

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

export const getStaticProps = async ({ locale }) => {

    const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}23`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}7167cd00-117a-432c-a503-c0f56e7c2304`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 16,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            data8: resInfoPageWeb.data,
            titlepage: (locale === "es" ? 'Rendición de Cuentas - UTEQ' : (locale === "en" ? 'Accountability - UTEQ' : 'Responsabilização - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web de la información relacionada a la Rendición de cuentas' : (locale === "en" ? 'Accountability-related information website' : 'Sítio Web de informação relativa à responsabilidade')),
            urlpageweb: `${apiUrl}/${locale}/rendicion-cuentas`,
            paramurlf: `${apiUrl}/${locale}/rendicion-cuentas`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_rendicion_cuentas_uteq_es.jpg":(locale==="en"?"imagen_rendicion_cuentas_uteq_en.jpg":"imagen_rendicion_cuentas_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '7167cd00-117a-432c-a503-c0f56e7c2304',
            language: locale
        }
    };
};