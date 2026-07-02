import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, 
    apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_V3_DATA_URLS_FACULTIES_UTEQ, WS_LIST_IS_CAREERS_GRADE_BY_FACULTY, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';


const Grado = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Grado;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}33`);
    const resDataCareers = await make_request_ws(WS_LIST_IS_CAREERS_GRADE_BY_FACULTY);
    const resDataFaculties = await make_request_ws(WS_LIST_V3_DATA_URLS_FACULTIES_UTEQ);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}863a2bf0-199a-4de3-a88d-c9b972680967`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            data8: resInfoPageWeb.data,
            option: 21,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            careers: resDataCareers.data,
            faculties: resDataFaculties.data,
            titlepage: (locale==="es"?"Carreras - UTEQ":(locale==="en"?"Careers - UTEQ":"Carreiras - UTEQ")),
            descpage: (locale==="es"?"Página web de información sobre las carreras de la Universidad":(locale==="en"?"University careers information website":"Sítio Web de informação sobre carreiras universitárias")),
            urlpageweb: `${apiUrl}/${locale}/grado/carreras`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_carreras_de_grado_uteq_es.jpg":(locale==="en"?"imagen_carreras_de_grado_uteq_en.jpg":"imagen_carreras_de_grado_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '863a2bf0-199a-4de3-a88d-c9b972680967',
            language: locale,
        }
    };
};