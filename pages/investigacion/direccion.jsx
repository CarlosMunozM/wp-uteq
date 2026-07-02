import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_DATA_GENERAL_NUM1, WS_LIST_IMAGES_SLIDER, FRONT_PG_IMGS_FOLDER, 
    apiUrl, WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_INFORMATION_PAGE_WEB, WS_LIST_DATA_AUTHORITIES,
    WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Direccion = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Direccion;

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

    const resVideoInv = await make_request_ws(`${WS_LIST_VIDEOS_UNIV_BY_TYPE}107/4`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}31`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/7`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}fdb2b263-7f8f-4471-bfee-efe24496b77b`);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resAuthorities = await make_request_ws(`${WS_LIST_DATA_AUTHORITIES}290`);

    return {
        props: {
            data5: resVideoInv.data,
            option: 52,
            sidemenu: resSideMenu.data,
            slider1: resSlider.data,
            data8: resInfoPageWeb.data,
            datamagz: resMagazines.data,
            data7: resAuthorities.data,
            titlepage: resInfoPageWeb.data.pwNombre.trim(),
            descpage: resInfoPageWeb.data.pwDescripcion.trim(),
            urlpageweb: `${apiUrl}/${locale}/investigacion/direccion`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_direccion_investigacion_uteq_es.jpg":(locale==="en"?"imagen_direccion_investigacion_uteq_en.jpg":"imagen_direccion_investigacion_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'fdb2b263-7f8f-4471-bfee-efe24496b77b',
            language: locale,
        }
    };
};