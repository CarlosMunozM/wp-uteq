import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_IMAGES_SLIDER, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const IdentidadCorp = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default IdentidadCorp;

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
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/2`);
    const resSliderIC = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/22`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}1035c1ed-fdc0-4b27-9566-b5a1aa5211f7`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 6,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            slider1: resSlider.data,
            slider2: resSliderIC.data,
            titlepage: (locale === "es" ? 'Identidad Corporativa - UTEQ' : (locale === "en" ? 'Corporate Identity - UTEQ' : 'Identidade corporativa - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web acerca de los elementos que componen la Identidad Corporativa de la UTEQ' : (locale === "en" ? 'Website about the elements that make up the Corporate Identity of the UTEQ' : 'Website sobre os elementos que compõem a Identidade Corporativa da UTEQ')),
            urlpageweb: `${apiUrl}/${locale}/identidad-corporativa`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_identidad_corporativa_uteq_es.jpg":(locale==="en"?"imagen_identidad_corporativa_uteq_en.jpg":"imagen_identidad_corporativa_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '1035c1ed-fdc0-4b27-9566-b5a1aa5211f7',
            language: locale
        }
    };
};


