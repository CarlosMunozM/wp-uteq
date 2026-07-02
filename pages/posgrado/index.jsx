import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, 
    WS_INFORMATION_DEPARTAMENT, WS_INFORMATION_AUTHORITY_BY_DEPARTMENT, WS_LIST_CAREERS_MATC_UNIVERSITY_BY_DEPART, 
    FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_SHORT_URLS_CAREERS_UNIVERSITY_BY_DEPART, WS_LIST_FILTER_NEWS_BY_PARAMETERS, 
    WS_LIST_ACTIVE_CATEGORIES, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';


const Posgrado = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Posgrado;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}25`);
    const resInfoDepartment = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}37823e40-8900-11ec-b5cf-244bfe557d55`);
    const resInfoAuthority = await make_request_ws(`${WS_INFORMATION_AUTHORITY_BY_DEPARTMENT}37823e40-8900-11ec-b5cf-244bfe557d55`);
    const resDataCareers = await make_request_ws(`${WS_LIST_SHORT_URLS_CAREERS_UNIVERSITY_BY_DEPART}37823e40-8900-11ec-b5cf-244bfe557d55`);
    const resDataCarMatc = await make_request_ws(`${WS_LIST_CAREERS_MATC_UNIVERSITY_BY_DEPART}37823e40-8900-11ec-b5cf-244bfe557d55`);
    const resListNewsUniv = await make_request_ws(`${WS_LIST_FILTER_NEWS_BY_PARAMETERS}17/0`);
    const resActvCategrs = await make_request_ws(WS_LIST_ACTIVE_CATEGORIES);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 11,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            inform: resInfoDepartment.data,
            authort: resInfoAuthority.data,
            mscdegs: resDataCareers.data,
            mscdgmatc: resDataCarMatc.data,
            news: resListNewsUniv.data,
            actcategrs: resActvCategrs.data,
            titlepage: (locale === "es" ? 'Unidad de Posgrado - UTEQ' : (locale === "en" ? 'Postgraduate Unit - UTEQ' : 'Unidade de Pós-Graduação - UTEQ')),            
            descpage: (locale === "es" ? 'Sitio web de información general de la Unidad de Posgrado' : (locale === "en" ? 'Postgraduate Unit general information website' : 'Sítio Web de informação geral da Unidade de Pós-Graduação')),
            urlpageweb: `${apiUrl}/${locale}/posgrado`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_posgrado_uteq_es.jpg":(locale==="en"?"imagen_posgrado_uteq_en.jpg":"imagen_posgrado_uteq_pt.jpg")}`,
            bannerimg: resInfoDepartment.data.dpImgBanner.trim(),
            codpage: '37823e40-8900-11ec-b5cf-244bfe557d55',
            language: locale,
        }
    };
};