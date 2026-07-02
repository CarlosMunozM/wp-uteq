import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_IMAGES_SLIDER, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Servicios = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Servicios;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG }29`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/7`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}57582d82-4dc6-44e0-ba10-b2875ff732d1`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 28,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            slider1: resSlider.data,
            titlepage: (locale==="es"?"Servicios de la Unidad de Bienestar Universitario de la UTEQ":(locale==="en"?"Services of the University Welfare Unit of UTEQ":"Serviços da Unidade de Bem-Estar Universitário da UTEQ")),
            descpage: (locale==="es"?"Sitio web de la información detallada de los servicios de la Unidad de Bienestar Universitario de la UTEQ":(locale==="en"?"Website with detailed information about the services of the University Welfare Unit of the UTEQ.":"Website com informações detalhadas sobre os serviços da Unidade de Bem-Estar Universitário da UTEQ.")),
            urlpageweb: `${apiUrl}/${locale}/ubu/servicios`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_servicios_universitarios_ubu_uteq_es.jpg":(locale==="en"?"imagen_servicios_universitarios_ubu_uteq_en.jpg":"imagen_servicios_universitarios_ubu_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '57582d82-4dc6-44e0-ba10-b2875ff732d1',
            language: locale,
        }
    };
};