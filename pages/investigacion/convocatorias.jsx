import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, 
    WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_INFORMATION_PAGE_WEB, WS_LIST_IMAGES_SLIDER,
    WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';


const Convocatorias = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Convocatorias;

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

    const resVideoInv = await make_request_ws(`${WS_LIST_VIDEOS_UNIV_BY_TYPE}107/3`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}31`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}c977839e-b579-4764-a3ea-4ed49d1fd6d8`);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/14`);

    return {
        props: {
            data5: resVideoInv.data,
            option: 60,
            sidemenu: resSideMenu.data,
            data8: resInfoPageWeb.data,
            slider1: resSlider.data,
            datamagz: resMagazines.data,
            titlepage: (locale==="es"?resInfoPageWeb.data.pwNombre.trim():(locale==="en"?resInfoPageWeb.data.pwNombreEn.trim():resInfoPageWeb.data.pwNombrePt.trim())),
            descpage: (locale==="es"?resInfoPageWeb.data.pwDescripcion.trim():(locale==="en"?resInfoPageWeb.data.pwDescripcionEn.trim():resInfoPageWeb.data.pwDescripcionPt.trim())),
            urlpageweb: `${apiUrl}/${locale}/investigacion/convocatorias`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_convocatorias_uteq_es.jpg":(locale==="en"?"imagen_convocatorias_uteq_en.jpg":"imagen_convocatorias_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'c977839e-b579-4764-a3ea-4ed49d1fd6d8',
            language: locale,
        }
    };

}