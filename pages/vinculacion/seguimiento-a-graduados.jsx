import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, 
    FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_DATA_AUTHORITIES_AREA_UBU, WS_LIST_TESTIMONIALS, 
    WS_LIST_DATA_AUTHORITIES, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const SegAGraduados = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default SegAGraduados;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}30`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}ac26415f-58d9-4cf4-a89d-29db499fb2a4`);
    const resInfoAuthority = await make_request_ws(`${WS_LIST_DATA_AUTHORITIES_AREA_UBU}ac26415f-58d9-4cf4-a89d-29db499fb2a4`);
    const resTestimonials = await make_request_ws(WS_LIST_TESTIMONIALS);
    const resAuthorities = await make_request_ws(`${WS_LIST_DATA_AUTHORITIES}318`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            data7: resAuthorities.data,
            data8: resInfoPageWeb.data,
            authort: resInfoAuthority.data,
            testimonials: resTestimonials.data,
            option: 43,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            titlepage: (locale==="es"?"Seguimiento a Graduados":(locale==="en"?"Graduate Follow-up":"Acompanhamento dos graduados")),
            descpage: (locale==="es"?"Sitio web de la información detallada del área de Seguimiento a Graduados":(locale==="en"?"Detailed information on the Graduate Follow-up website":"Informação detalhada sobre o sítio Web de Acompanhamento de Graduados")),
            urlpageweb: `${apiUrl}/${locale}/vinculacion/seguimiento-a-graduados`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_seguimiento_a_graduados_uteq_es.jpg":(locale==="en"?"imagen_seguimiento_a_graduados_uteq_en.jpg":"imagen_seguimiento_a_graduados_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'ac26415f-58d9-4cf4-a89d-29db499fb2a4',
            language: locale,
        }
    };
};