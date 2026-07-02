import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_INFORMATION_DEPARTAMENT, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_IMAGES_SLIDER, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Historia = (props) => {
    return (
        LayoutSecond(props)
    );
};


export default Historia;

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
    const resInfoUniversity = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}18419656-891a-11ec-83c4-244bfe557d55`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/20`);


    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            slider1: resSlider.data,
            option: 4,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            data8: resInfoUniversity.data,
            titlepage: (locale === "es" ? 'Nosotros - UTEQ' : (locale === "en" ? 'About us - UTEQ' : 'Sobre nós - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web de información institucional de la UTEQ' : (locale === "en" ? 'UTEQ Institutional Information Website' : 'Sítio de informação institucional da UTEQ')),
            urlpageweb: `${apiUrl}/${locale}/nosotros`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_historia_uteq_es.jpg":(locale==="en"?"imagen_historia_uteq_en.jpg":"imagen_historia_uteq_pt.jpg")}`,
            bannerimg: resInfoUniversity.data.dpImgBanner.trim(),
            codpage: '18419656-891a-11ec-83c4-244bfe557d55',
            language: locale
        }
    };
};