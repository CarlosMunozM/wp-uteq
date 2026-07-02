import axios from 'axios';
import {
    WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1,
    WS_LIST_CAREERS_UNIVERSITY_BY_DEPART, WS_INFORMATION_CAREER_BY_PARCIAL_URL, WS_INFO_AUTH_BY_CAREER, apiUrl,
    FRONT_PG_IMGS_FOLDER, WS_LIST_URLS_CAREERS_UNIVERSITY_BY_DEPART, WS_LIST_ITEMS_MENU_LAT_BY_LANG
} from 'config';
import { LayoutSecond } from 'components/layouts';

const Maestria = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Maestria;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}25`);
    const resDataCareers = await make_request_ws(`${WS_LIST_CAREERS_UNIVERSITY_BY_DEPART}37823e40-8900-11ec-b5cf-244bfe557d55`);
    const resDataCareer = await make_request_ws(`${WS_INFORMATION_CAREER_BY_PARCIAL_URL}${params.crUrlParcial}`);
    const resDataAut = await make_request_ws(`${WS_INFO_AUTH_BY_CAREER}${resDataCareer.data.crCodigo}/140`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 18,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            authort: resDataAut.data,
            mscdegs: resDataCareers.data,
            infocar: resDataCareer.data,
            paramadc: params.crUrlParcial,
            titlepage: (resDataCareer.data !== null ? (locale==="es"?resDataCareer.data.crNombre.trim():(locale==="en"?resDataCareer.data.crNombreEn.trim():resDataCareer.data.crNombrePt.trim())) : (locale==="es"?"Programa de Maestría - UTEQ":(locale==="en"?"Master's Programme - UTEQ":"Programa de Mestrado - UTEQ"))),
            descpage: (resDataCareer.data !== null ? (locale==="es"?("Sitio web de programa de Maestría - "+resDataCareer.data.crNombre.trim()):(locale==="en"?("Master's programme website - "+resDataCareer.data.crNombreEn.trim()):"Sítio Web do programa de mestrado - "+resDataCareer.data.crNombrePt.trim())) : 'UTEQ'),
            urlpageweb: (resDataCareer.data !== null ? (`${apiUrl}/${locale}/posgrado/${resDataCareer.data.crUrlParcial.trim()}`) : apiUrl),
            urlimage: `${FRONT_PG_IMGS_FOLDER}${resDataCareer.data.crUrlImgRS}`,
            bannerimg: resDataCareer.data.crUrlImgBanner.trim(),
            codpage: '37823e40-8900-11ec-b5cf-244bfe557d55',
            language: locale
        }
    };
};

export async function getStaticPaths({ locales }) {
    const resDataCareers = await make_request_ws(`${WS_LIST_URLS_CAREERS_UNIVERSITY_BY_DEPART}37823e40-8900-11ec-b5cf-244bfe557d55`);
    let paths = [];

    resDataCareers.data.forEach((block) => {
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