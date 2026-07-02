import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_DATA_GENERAL_NUM1, WS_INFORMATION_DEPARTAMENT, WS_LIST_IMAGES_SLIDER, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Investigacion = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Investigacion;

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

    const resVideoInv = await make_request_ws(`${WS_LIST_VIDEOS_UNIV_BY_TYPE}107/8`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}31`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/7`);
    const resInfoDepartm = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}1cf13586-85d1-11ec-befe-244bfe557d55`);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resInfoAuthority = await make_request_ws(`${WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT}1cf13586-85d1-11ec-befe-244bfe557d55/116`);

    return {
        props: {
            data5: resVideoInv.data,
            option: 47,
            sidemenu: resSideMenu.data,
            slider1: resSlider.data,
            data8: resInfoDepartm.data,
            datamagz: resMagazines.data,
            authort: resInfoAuthority.data,
            titlepage: `${locale==="es"?resInfoDepartm.data.dpNombre.trim():(locale==="en"?resInfoDepartm.data.dpNombreEn.trim():resInfoDepartm.data.dpNombrePt.trim())} - UTEQ`,
            descpage: (locale==="es"?`Sitio web de ${resInfoDepartm.data.dpNombre.trim()}`:(locale==="en"?`Website of ${resInfoDepartm.data.dpNombreEn.trim()}`:`Sítio Web de ${resInfoDepartm.data.dpNombrePt.trim()}`)),
            urlpageweb: `${apiUrl}/${locale}/investigacion`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_investigacion_uteq_es.jpg":(locale==="en"?"imagen_investigacion_uteq_en.jpg":"imagen_investigacion_uteq_pt.jpg")}`,
            bannerimg: resInfoDepartm.data.dpImgBanner.trim(),
            codpage: '1cf13586-85d1-11ec-befe-244bfe557d55',
            language: locale,
        }
    };
};