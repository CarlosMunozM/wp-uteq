import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, WS_INFORMATION_PAGE_WEB, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_METRICS_UNIVS_BY_AREA, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Psicologia = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Psicologia;

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
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}e20c3d1c-fb89-4b3f-9cae-1e6b1cdd3c02`);
    const resMetrics = await make_request_ws(`${WS_LIST_METRICS_UNIVS_BY_AREA}e20c3d1c-fb89-4b3f-9cae-1e6b1cdd3c02`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            datamtc: resMetrics.data,
            option: 32,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            data8: resInfoPageWeb.data,
            codarea: "e20c3d1c-fb89-4b3f-9cae-1e6b1cdd3c02",
            titlepage: `${locale==="es"?resInfoPageWeb.data.pwNombre.trim():(locale==="en"?resInfoPageWeb.data.pwNombreEn.trim():resInfoPageWeb.data.pwNombrePt.trim())}`,
            descpage: (locale==="es"?`Sitio web de ${resInfoPageWeb.data.pwNombre.trim()}`:(locale==="en"?`Website of ${resInfoPageWeb.data.pwNombreEn.trim()}`:`Website de ${resInfoPageWeb.data.pwNombrePt.trim()}`)),
            urlpageweb: `${apiUrl}/${locale}/ubu/servicios/psicologia`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_area_de_orientación_y_asesoria_psicologica_uteq_es.jpg":(locale==="en"?"imagen_area_de_orientación_y_asesoria_psicologica_uteq_en.jpg":"imagen_area_de_orientación_y_asesoria_psicologica_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'e20c3d1c-fb89-4b3f-9cae-1e6b1cdd3c02',
            language: locale,
        }
    };
};