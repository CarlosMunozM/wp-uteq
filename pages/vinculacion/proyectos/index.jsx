import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, 
    FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Proyectos = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Proyectos;

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
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}880565dd-0610-416e-9dc1-cc4636f45cf7`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            data8: resInfoPageWeb.data,
            option: 41,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            titlepage: 'Proyectos de vinculación',
            descpage: 'Sitio web de la información detallada de proyectos de vinculación',
            urlpageweb: `${apiUrl}/${locale}/vinculacion/proyectos`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_proyectos_de_vinculacion_uteq_es.jpg":(locale==="en"?"imagen_proyectos_de_vinculacion_uteq_en.jpg":"imagen_proyectos_de_vinculacion_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '880565dd-0610-416e-9dc1-cc4636f45cf7',
            language: locale,
        }
    };
};