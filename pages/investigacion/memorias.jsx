import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_DATA_GENERAL_NUM1, WS_LIST_IMAGES_SLIDER, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Memorias = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Memorias;

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

    const resVideoInv = await make_request_ws(`${WS_LIST_VIDEOS_UNIV_BY_TYPE}107/1`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}31`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/7`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}add61f95-8c26-4272-b0cc-71104e0b2283`);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resListMemorias = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/12`);

    return {
        props: {
            data5: resVideoInv.data,
            option: 49,
            sidemenu: resSideMenu.data,
            slider1: resSlider.data,
            data8: resInfoPageWeb.data,
            datamagz: resMagazines.data,
            datamem: resListMemorias.data,
            titlepage: (locale==="es"?resInfoPageWeb.data.pwNombre.trim():(locale==="en"?resInfoPageWeb.data.pwNombreEn.trim():resInfoPageWeb.data.pwNombrePt.trim())),
            descpage: (locale==="es"?resInfoPageWeb.data.pwDescripcion.trim():(locale==="en"?resInfoPageWeb.data.pwDescripcionEn.trim():resInfoPageWeb.data.pwDescripcionPt.trim())),
            urlpageweb: `${apiUrl}/${locale}/investigacion/memorias`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_memorias_investigacion_uteq_es.jpg":(locale==="en"?"imagen_memorias_investigacion_uteq_en.jpg":"imagen_memorias_investigacion_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'add61f95-8c26-4272-b0cc-71104e0b2283',
            language: locale,
        }
    };
};