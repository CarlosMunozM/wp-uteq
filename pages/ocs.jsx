import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_AUTHORITIES, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';


const OCS = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default OCS;

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
    const resAuthorities = await make_request_ws(`${WS_LIST_DATA_AUTHORITIES}104`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}a4afa729-ece5-4f43-91de-f8aed8c9db39`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            data7: resAuthorities.data,
            option: 3,
            sidemenu: resSideMenu.data,
            campus: resDataGeneral.data,
            titlepage: (locale === "es" ? 'Órgano Colegiado Superior' : (locale === "en" ? 'Higher Collegiate Body' : 'Órgão colegial superior')),
            descpage: (locale === "es" ? 'Sitio web del organigrama del OCS' : (locale === "en" ? 'OCS organigram website' : 'Sítio Web do OCS Organigrama')),
            urlpageweb: `${apiUrl}/${locale}/ocs`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_ocs_uteq_es.jpg":(locale==="en"?"imagen_ocs_uteq_en.jpg":"imagen_ocs_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'a4afa729-ece5-4f43-91de-f8aed8c9db39',
            language: locale
        }
    };
};