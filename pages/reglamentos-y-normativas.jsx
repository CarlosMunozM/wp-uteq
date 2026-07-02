import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_ITEMS_MENU_LAT, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';


const ReglamentosNormtvs = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default ReglamentosNormtvs;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}ff642269-fd47-4541-ac9c-9b6b8b7c524f`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 14,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            titlepage: (locale === "es" ? 'Reglamentos y normativas - UTEQ' : (locale === "en" ? 'Rules and regulations - UTEQ' : 'Regras e regulamentos - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web de la información de reglamentos y normativas de la Institución' : (locale === "en" ? 'Website with information on the Institution regulations and policies' : 'Website com informações sobre os regulamentos e políticas da Instituição')),
            urlpageweb: `${apiUrl}/${locale}/reglamentos-y-normativas`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_reglamentos_y_normativas_uteq_es.jpg":(locale==="en"?"imagen_reglamentos_y_normativas_uteq_en.jpg":"imagen_reglamentos_y_normativas_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'ff642269-fd47-4541-ac9c-9b6b8b7c524f',
            language: locale
        }
    };
};