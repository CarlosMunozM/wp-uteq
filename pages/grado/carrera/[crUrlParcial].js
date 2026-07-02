import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl,
    WS_LIST_ACTIVE_CATEGORIES, WS_LIST_CAREERS_GRADE_UNIVERSITY_BY_FACULTY, WS_INFORMATION_CAREER_BY_PARCIAL_URL,
    WS_INFORMATION_PERSON_BY_CAREER, WS_LIST_URLS_CAREERS_GRADE_BY_FACULTY, WS_LIST_ITEMS_MENU_LAT_BY_LANG
} from 'config';


const Carrera = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Carrera;

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

export const getStaticProps = async ({ params, locale }) => {

    const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}32`);
    const resInfoAuthority = await make_request_ws(`${WS_INFORMATION_PERSON_BY_CAREER}${params.crUrlParcial}/140`);
    const resActvCategrs = await make_request_ws(WS_LIST_ACTIVE_CATEGORIES);
    const resDataCareer = await make_request_ws(`${WS_INFORMATION_CAREER_BY_PARCIAL_URL}${params.crUrlParcial}`);
    const resDataCareers = await make_request_ws(`${WS_LIST_CAREERS_GRADE_UNIVERSITY_BY_FACULTY}${resDataCareer.data.crDepartamento.dpCodigo}`);
    const resDataQuestions = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}PREG_FRECADM`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 70,
            sidemenu: resSideMenu.data,
            actcategrs: resActvCategrs.data,
            career: resDataCareer.data,
            codpage: resDataCareer.data.crCodigo,
            careers: resDataCareers.data,
            question: resDataQuestions.data,
            paramadc: params.crUrlParcial.trim(),
            paramurlf: resDataCareer.data.crDepartamento.dpParcialUrl.trim(),
            authort: resInfoAuthority.data,
            titlepage: `${locale==="es"?resDataCareer.data.crNombre.trim():(locale==="en"?resDataCareer.data.crNombreEn.trim():resDataCareer.data.crNombrePt.trim())} - UTEQ`,
            descpage: `${locale==="es"?"Página web de información sobre la":(locale==="en"?"Information website about the":"Sítio de informação sobre o")} ${locale==="es" ? resDataCareer.data.crNombre.trim():(locale==="en"?resDataCareer.data.crNombreEn.trim():resDataCareer.data.crNombrePt.trim())}`,
            urlpageweb: `${apiUrl}/${locale}/grado/carrera/${params.crUrlParcial.trim()}`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${resDataCareer.data.crUrlImgRS}`,
            bannerimg: resDataCareer.data.crUrlImgBanner,
            language: locale
        }
    };

}

export async function getStaticPaths({ locales }) {
    const resListCareers = await make_request_ws(WS_LIST_URLS_CAREERS_GRADE_BY_FACULTY);
    let paths = [];

    resListCareers.data.forEach((block) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    crUrlParcial: block.crUrlParcial.trim(),
                },
                locale,
            });
        }
    });

    return {
        paths,
        fallback: false
    }

}