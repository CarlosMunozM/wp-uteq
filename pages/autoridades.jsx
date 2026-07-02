import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_AUTHORITIES, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';


const Autoridades = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Autoridades;

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
    const resAuthorities = await make_request_ws(`${WS_LIST_DATA_AUTHORITIES}105`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}9da4f996-2269-4d43-8e38-cb6648d141f9`);
    
    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            data7: resAuthorities.data,
            option: 2,
            sidemenu: resSideMenu.data,
            campus: resDataGeneral.data,
            titlepage: (locale === "es" ? 'Autoridades - UTEQ' : (locale === "en" ? 'Authorities - UTEQ' : 'Autoridades - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web del organigrama institucional de autoridades' : (locale === "en" ? 'Website of the institutional organigramme of authorities' : 'Website do organigrama institucional das autoridades')),
            urlpageweb: `${apiUrl}/${locale}/autoridades`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_autoridades_uteq_es.jpg":(locale==="en"?"imagen_autoridades_uteq_en.jpg":"imagen_autoridades_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '9da4f996-2269-4d43-8e38-cb6648d141f9',
            language: locale
        }
    };
};