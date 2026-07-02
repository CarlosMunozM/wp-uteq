import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Resoluciones = (props) => {

    return (
        LayoutSecond(props)
    );
};

export default Resoluciones;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}d7e06382-a617-4e66-8a84-ff3ffbcba3bf`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 44,
            sidemenu: resSideMenu.data,
            campus: resDataGeneral.data,
            titlepage: (locale === "es" ? 'Resoluciones - UTEQ' : (locale === "en" ? 'Resolutions - UTEQ' : 'Resoluções - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web de la información de resoluciones de la UTEQ' : (locale === "en" ? 'UTEQ resolution information website' : 'Sítio web de informação sobre a resolução da UTEQ')),
            urlpageweb: `${apiUrl}/${locale}/resoluciones`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_resoluciones_universitarias_uteq_es.jpg":(locale==="en"?"imagen_resoluciones_universitarias_uteq_en.jpg":"imagen_resoluciones_universitarias_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'd7e06382-a617-4e66-8a84-ff3ffbcba3bf',
            language: locale
        }
    };
}