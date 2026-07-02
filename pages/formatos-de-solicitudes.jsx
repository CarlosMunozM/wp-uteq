import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const FormatoSolc = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default FormatoSolc;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}3d33f3c7-ddb4-4ff1-8e64-b4a827603d5b`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 8,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            titlepage: (locale === "es" ? 'Formatos de solicitudes - UTEQ' : (locale === "en" ? 'Application forms - UTEQ' : 'Formulários de candidatura - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web de la información de formatos de solicitudes' : (locale === "en" ? 'Application Form Information website' : 'Sítio Web de informação sobre o formulário de candidatura')),
            urlpageweb: `${apiUrl}/${locale}/formatos-de-solicitudes`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_formato_de_solicitudes_uteq_es.jpg":(locale==="en"?"imagen_formato_de_solicitudes_uteq_en.jpg":"imagen_formato_de_solicitudes_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '3d33f3c7-ddb4-4ff1-8e64-b4a827603d5b',
            language: locale
        }
    };
};