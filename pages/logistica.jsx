import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_INFORMATION_DEPARTAMENT, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_IMAGES_SLIDER, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT,
    WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Logistica = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Logistica;

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
    const resInfoUniversity = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}f5a21210-aae8-11ec-a826-244bfe557d55`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/6`);
    const resInfoAuthority = await make_request_ws(`${WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT}f5a21210-aae8-11ec-a826-244bfe557d55/116`);


    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 20,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            data8: resInfoUniversity.data,
            slider1: resSlider.data,
            authort: resInfoAuthority.data,
            titlepage: (locale === "es" ? 'Logística - UTEQ' : (locale === "en" ? 'Logistics - UTEQ' : 'Logística - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web de la información del Departamento de Logística de la UTEQ' : (locale === "en" ? 'UTEQ Logistics Department information web site' : 'Página web de informação do Departamento de Logística da UTEQ')),
            urlpageweb: `${apiUrl}/${locale}/logistica`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_logistica_uteq_es.jpg":(locale==="en"?"imagen_logistica_uteq_en.jpg":"imagen_logistica_uteq_pt.jpg")}`,
            bannerimg: resInfoUniversity.data.dpImgBanner.trim(),
            codpage: 'f5a21210-aae8-11ec-a826-244bfe557d55',
            language: locale
        }
    };
};
