import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_INFORMATION_PAGE_WEB,
    WS_LIST_INFO_LABORATORIES, WS_LIST_GALLERY_LABORATORIES, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Lineas = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Lineas;

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
    const resInfoPagWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}492a15cb-ea18-4d95-aca6-2664ff8aace4`);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resInfoLabs = await make_request_ws(WS_LIST_INFO_LABORATORIES);
    const resGalLabs = await make_request_ws(WS_LIST_GALLERY_LABORATORIES);

    return {
        props: {
            data5: resVideoInv.data,
            option: 72,
            sidemenu: resSideMenu.data,
            data8: resInfoPagWeb.data,
            datamagz: resMagazines.data,
            labsinfo: resInfoLabs.data,
            galinfo: resGalLabs.data,
            titlepage: (locale==="es"?resInfoPagWeb.data.pwNombre.trim():(locale==="en"?resInfoPagWeb.data.pwNombreEn.trim():resInfoPagWeb.data.pwNombrePt.trim())),
            descpage: (locale==="es"?resInfoPagWeb.data.pwDescripcion.trim():(locale==="en"?resInfoPagWeb.data.pwDescripcionEn.trim():resInfoPagWeb.data.pwDescripcionPt.trim())),
            urlpageweb: `${apiUrl}/${locale}/investigacion/laboratorios`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_laboratorios_uteq_es.jpg":(locale==="en"?"imagen_laboratorios_uteq_en.jpg":"imagen_laboratorios_uteq_pt.jpg")}`, 
            bannerimg: resInfoPagWeb.data.pwImgBanner.trim(),
            codpage: 'a3734602-c116-4dad-8310-0a721fb81f9d',
            language: locale,
        }
    };
};