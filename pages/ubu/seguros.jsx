import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, WS_INFORMATION_PAGE_WEB, apiUrl, FRONT_PG_IMGS_FOLDER, WS_LIST_IMAGES_SLIDER, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Seguros = (props) => {
    return (
        LayoutSecond(props,"")
    );
};

export default Seguros;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}29`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}610e8257-d2f3-4779-9e7c-5304523a8d3b`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/10`);
    
    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            data8: resInfoPageWeb.data,
            option: 46,
            slider1: resSlider.data,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            titlepage: (locale === "es" ? "Seguro de vida y accidentes para estudiantes" : (locale === "en" ? "Life and accident insurance for students" : "Seguro de vida e de acidentes para estudantes")),
            descpage: (locale === "es" ? "Sitio web de la información del seguro de vida y accidentes para estudiantes" : (locale === "en" ? "Student Life and Accident Insurance Information Website" : "Website de informação sobre seguros de vida e de acidentes de estudantes")),
            urlpageweb: `${apiUrl}/${locale}/ubu/seguros`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_seguro_de_vida_ubu_uteq_es.jpg":(locale==="en"?"imagen_seguro_de_vida_ubu_uteq_en.jpg":"imagen_seguro_de_vida_ubu_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '610e8257-d2f3-4779-9e7c-5304523a8d3b',
            language: locale,
        }
    };




}

