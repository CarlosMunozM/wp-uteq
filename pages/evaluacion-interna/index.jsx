import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_INFORMATION_DEPARTAMENT, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_IMAGES_SLIDER, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_DATA_AUTHORITIES,
    WS_LIST_FILTER_NEWS_BY_PARAMETERS, WS_LIST_ITEMS_MENU_LAT_BY_LANG
} from 'config';

const EvaluacionInterna = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default EvaluacionInterna;

async function make_request_ws(path_url) {
    var listTemp = null;
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
    const resInfoDepartm = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}f550ddfa-9b02-11ec-9f94-244bfe557d55`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/4`);
    const resAuthorities = await make_request_ws(`${WS_LIST_DATA_AUTHORITIES}296`);
    const resListNewsUniv = await make_request_ws(`${WS_LIST_FILTER_NEWS_BY_PARAMETERS}${resInfoDepartm.data.dpCodigoUnc}/0`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            data7: resAuthorities.data,
            listnews: resListNewsUniv.data,
            option: 12,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            data8: resInfoDepartm.data,
            slider1: resSlider.data,
            titlepage: (locale === "es" ? 'Comisión de evaluación interna y gestión de la calidad - UTEQ' : (locale === "en" ? 'Commission for internal evaluation and quality management - UTEQ' : 'Comissão de avaliação interna e gestão da qualidade - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web informativo de la Comisión de evaluación interna y gestión de la calidad de la UTEQ' : (locale === "en" ? 'Information website of the Internal Evaluation and Quality Management Commission of UTEQ' : 'Sítio Web informativo da Comissão de Avaliação Interna e Gestão da Qualidade da UTEQ')),
            urlpageweb: `${apiUrl}/${locale}/evaluacion-interna`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale === "es" ? "imagen_evaluacion_interna_uteq_es.jpg" : (locale === "en" ? "imagen_evaluacion_interna_uteq_en.jpg" : "imagen_evaluacion_interna_uteq_pt.jpg")}`,
            bannerimg: resInfoDepartm.data.dpImgBanner.trim(),
            codpage: 'f550ddfa-9b02-11ec-9f94-244bfe557d55',
            language: locale
        }
    };
};