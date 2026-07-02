import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const GuiaTramites = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default GuiaTramites;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}30`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}7534c912-769d-4312-8e4b-fd8ead6259a4`);
    const resInfoTramites = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}TRAMITE_VINC`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 40,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            tramites: resInfoTramites.data,
            titlepage: (locale==="es"?"Guía de trámites":(locale==="en"?"Guide to procedures":"Guia de procedimentos")),
            descpage: (locale==="es"?"Sitio web de la información detallada de trámites en el Departamento de Vinculación":(locale==="en"?"Website with detailed information on procedures in the Liaison Department":"Website com informações detalhadas sobre os procedimentos no Departamento de Ligação")),
            urlpageweb: `${apiUrl}/${locale}/vinculacion/guia-de-tramites`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_guia_de_tramites_uteq_es.jpg":(locale==="en"?"imagen_guia_de_tramites_uteq_en.jpg":"imagen_guia_de_tramites_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '7534c912-769d-4312-8e4b-fd8ead6259a4',
            language: locale,
        }
    };
};