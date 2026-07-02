import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_INFORMATION_DEPARTAMENT, WS_LIST_DATA_GENERAL_NUM1, WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const TalentoHumano = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default TalentoHumano;

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
    const resInfoDepartm = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}1a34421e-9c08-11ec-ba94-244bfe557d55`);
    const resDataWkExp = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}TIPO_EXPLAB`);
    const resDataVclTrain = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}FORM_PROFS`);
    const resInfoAuthority = await make_request_ws(`${WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT}1a34421e-9c08-11ec-ba94-244bfe557d55/116`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 15,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            data8: resInfoDepartm.data,
            data7: resDataWkExp.data,
            data9: resDataVclTrain.data,
            authort: resInfoAuthority.data,
            titlepage: (locale === "es" ? 'Unidad de Talento Humano - UTEQ' : (locale === "en" ? 'Human Talent Unit - UTEQ' : 'Unidade de Recursos Humanos - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web informativo de la Unidad de Talento Humano de la UTEQ' : (locale === "en" ? 'Informative website of the Human Resources Unit of UTEQ' : 'Sítio Web informativo da Unidade de Recursos Humanos da UTEQ')),
            urlpageweb: `${apiUrl}/${locale}/talento-humano`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_unidad_talento_humano_uteq_es.jpg":(locale==="en"?"imagen_unidad_talento_humano_uteq_en.jpg":"imagen_unidad_talento_humano_uteq_pt.jpg")}`,
            bannerimg: resInfoDepartm.data.dpImgBanner.trim(),
            codpage: '1a34421e-9c08-11ec-ba94-244bfe557d55',
            language: locale
        }
    };
};