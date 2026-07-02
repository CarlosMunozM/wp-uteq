import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_IMAGES_SLIDER, WS_INFORMATION_DEPARTAMENT, FRONT_PG_IMGS_FOLDER, 
    apiUrl, WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT, WS_COUNT_AGREEMTS_4 ,WS_COUNT_AGREEMTS_5, WS_COUNT_AGREEMTS_6, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const CooperacionInternacional = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default CooperacionInternacional;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG }22`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/3`);
    const resInfoUniversity = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}06049e96-9678-11ec-9c80-244bfe557d55`);
    const resInfoAuthority = await make_request_ws(`${WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT}06049e96-9678-11ec-9c80-244bfe557d55/116`);
    const countAgM = await make_request_ws(`${WS_COUNT_AGREEMTS_4}NACIONAL`);
    const countAgS = await make_request_ws(`${WS_COUNT_AGREEMTS_4}INTERNACIONAL`);
    const countAgN = await make_request_ws(`${WS_COUNT_AGREEMTS_5}1`);
    const countAgI = await make_request_ws(`${WS_COUNT_AGREEMTS_5}2`);
    const countAgPB = await make_request_ws(`${WS_COUNT_AGREEMTS_6}NACIONAL`);
    const countAgPV = await make_request_ws(`${WS_COUNT_AGREEMTS_6}INTERNACIONAL`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            ctAgM: countAgM.data,
            ctAgS: countAgS.data,
            ctAgN: countAgN.data,
            ctAgI: countAgI.data,
            ctAgP: countAgPB.data,
            ctAgR: countAgPV.data,
            option: 10,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            slider1: resSlider.data,
            data8: resInfoUniversity.data,
            authort: resInfoAuthority.data,
            titlepage: (locale === "es" ? "Cooperación Internacional - UTEQ" : (locale === "en" ? 'International Cooperation - UTEQ' : 'Cooperação Internacional - UTEQ')),
            descpage: (locale === "es" ? "Sitio web de Cooperación Internacional de la UTEQ" : (locale === "en" ? 'UTEQ International Cooperation website' : 'Website de Cooperação Internacional da UTEQ')),
            urlpageweb: `${apiUrl}/${locale}/cooperacion-internacional`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_cooperacion_internacional_uteq_es.jpg":(locale==="en"?"imagen_cooperacion_internacional_uteq_en.jpg":"imagen_cooperacion_internacional_uteq_pt.jpg")}`,
            bannerimg: resInfoUniversity.data.dpImgBanner.trim(),
            codpage: '06049e96-9678-11ec-9c80-244bfe557d55',
            language: locale
        }
    };
};