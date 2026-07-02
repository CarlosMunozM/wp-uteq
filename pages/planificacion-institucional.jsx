import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_INFORMATION_DEPARTAMENT, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_FILES_UNIV_BY_TYPE, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT,
    WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const PlanificacionUnivs = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default PlanificacionUnivs;

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
    const resInfoDepartm = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}e096ba76-9b0f-11ec-9f95-244bfe557d55`);
    const resDocumentos = await make_request_ws(`${WS_LIST_FILES_UNIV_BY_TYPE}PLNUN`);
    const resInfoAuthority = await make_request_ws(`${WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT}e096ba76-9b0f-11ec-9f95-244bfe557d55/116`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 13,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            data8: resInfoDepartm.data,
            docs: resDocumentos.data,
            authort: resInfoAuthority.data,
            titlepage: (locale === "es" ? 'Planificación Institucional - UTEQ' : (locale === "en" ? 'Institutional Planning - UTEQ' : 'Planeamento Institucional - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web de la planificación institucional de la UTEQ' : (locale === "en" ? 'UTEQ Institutional Planning Website' : 'Website de Planeamento Institucional da UTEQ')),
            urlpageweb: `${apiUrl}/${locale}/planificacion-institucional`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_planificacion_universitaria_uteq_es.jpg":(locale==="en"?"imagen_planificacion_universitaria_uteq_en.jpg":"imagen_planificacion_universitaria_uteq_pt.jpg")}`,
            bannerimg: resInfoDepartm.data.dpImgBanner.trim(),
            codpage: 'e096ba76-9b0f-11ec-9f95-244bfe557d55',
            language: locale
        }
    };
};