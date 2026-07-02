import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_FACULTY_BY_URL,
    WS_INFORMATION_PERSON_BY_FACULTY, WS_LIST_FILTER_NEWS_BY_PARAMETERS, WS_LIST_ACTIVE_CATEGORIES, WS_LIST_CAREERS_GRADE_UNIVERSITY_BY_FACULTY, 
    WS_LIST_DATA_URLS_FACULTIES_UTEQ, WS_LIST_ITEMS_MENU_LAT_BY_LANG
} from 'config';

const Facultad = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Facultad;

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
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}32`);
    const resInfoFacultad = await make_request_ws(`${WS_INFORMATION_FACULTY_BY_URL}${params.dpParcialUrl.trim()}`);
    const resInfoAuthority = await make_request_ws(`${WS_INFORMATION_PERSON_BY_FACULTY}${params.dpParcialUrl.trim()}/89`);
    const resListNewsUniv = await make_request_ws(`${WS_LIST_FILTER_NEWS_BY_PARAMETERS}${resInfoFacultad.data.dpCodigoUnc}/0`);
    const resActvCategrs = await make_request_ws(WS_LIST_ACTIVE_CATEGORIES);
    const resDataCareers = await make_request_ws(`${WS_LIST_CAREERS_GRADE_UNIVERSITY_BY_FACULTY}${resInfoFacultad.data.dpCodigo}`);


    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 69,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            actcategrs: resActvCategrs.data,
            careers: resDataCareers.data,
            faculty: resInfoFacultad.data,
            authort: resInfoAuthority.data,
            news: resListNewsUniv.data,
            urlparcial: params.dpParcialUrl.trim(),
            paramurlf: params.dpParcialUrl.trim(),
            titlepage: `${locale==="es"?resInfoFacultad.data.dpNombre.trim():(locale==="en"?resInfoFacultad.data.dpNombreEn.trim():resInfoFacultad.data.dpNombrePt.trim())} - UTEQ`,
            descpage: `${locale==="es"?"Página web de información sobre la":(locale==="en"?"Information website about the":"Sítio de informação sobre o")} ${locale==="es" ? resInfoFacultad.data.dpNombre.trim():(locale==="en"?resInfoFacultad.data.dpNombreEn.trim():resInfoFacultad.data.dpNombrePt.trim())}`,
            urlpageweb: `${apiUrl}/${locale}/grado/facultad/${params.dpParcialUrl.trim()}`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}img-frontpg-faculty.jpg`,
            bannerimg: resInfoFacultad.data.dpImgBanner.trim(),
            codpage: resInfoFacultad.data.dpCodigo,
            language: locale
        }
    };
};

export async function getStaticPaths({ locales }) {
    const resListFac = await make_request_ws(WS_LIST_DATA_URLS_FACULTIES_UTEQ);
    let paths = [];

    resListFac.data.forEach((block) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    dpParcialUrl: block.dpParcialUrl.trim(),
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



