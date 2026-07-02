import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_INFORMATION_PAGE_WEB, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Transparencia = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Transparencia;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}21`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}fc285e43-dfc9-4bf6-9c7f-6f574a6bc645`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 9,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            data8: resInfoPageWeb.data,
            titlepage: (locale === "es" ? 'Transparencia' : (locale === "en" ? 'Transparency' : 'Transparência')),
            descpage: (locale === "es" ? 'Sitio web de la información detallada de Transparencia' : (locale === "en" ? 'Detailed information website of Transparency' : 'Sítio de informação detalhada da Transparência')),
            urlpageweb: `${apiUrl}/${locale}/transparencia`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_transparencia_uteq_es.jpg":(locale==="en"?"imagen_transparencia_uteq_en.jpg":"imagen_transparencia_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'fc285e43-dfc9-4bf6-9c7f-6f574a6bc645',
            language: locale
        }
    };
};