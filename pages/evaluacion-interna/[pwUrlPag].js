import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB_BY_URL, WS_LIST_URL_PAGES_BY_ENTITY, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const PagWebEvalIntn = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default PagWebEvalIntn;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB_BY_URL}${params.pwUrlPag}`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 68,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            data8: resInfoPageWeb.data,
            titlepage: (resInfoPageWeb.data !== null && resInfoPageWeb.data !== '' ? ((locale==="es"?resInfoPageWeb.data.pwNombre.trim():(locale==="en"?resInfoPageWeb.data.pwNombreEn.trim():resInfoPageWeb.data.pwNombrePt.trim())) + " - CGEIAC") : `${locale==="es"?"Proceso":(locale==="en"?"Process":"Processo")} - CGEIAC`),
            descpage: `Sitio web del proceso - ${(resInfoPageWeb.data !== null && resInfoPageWeb.data !== '' ? (locale==="es"?resInfoPageWeb.data.pwNombre.trim():(locale==="en"?resInfoPageWeb.data.pwNombreEn.trim():resInfoPageWeb.data.pwNombrePt.trim())): 'UTEQ')}`,
            urlpageweb: (resInfoPageWeb.data !== null && resInfoPageWeb.data !== '' ? (`${apiUrl}/${locale}/evaluacion-interna/${resInfoPageWeb.data.pwUrlPag.trim()}`) : `${apiUrl}/${locale}`),
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_evaluacion_interna_uteq_es.jpg":(locale==="en"?"imagen_evaluacion_interna_uteq_en.jpg":"imagen_evaluacion_interna_uteq_pt.jpg")}`,
            bannerimg: (resInfoPageWeb.data !== null && resInfoPageWeb.data !== '' ? resInfoPageWeb.data.pwImgBanner.trim() : 'img-uteq-banner-0000022.jpg'),
            codpage: 'f550ddfa-9b02-11ec-9f94-244bfe557d55',
            language: locale
        }
    };
};


export async function getStaticPaths({ locales }) {
    const resListWebPages = await make_request_ws(`${WS_LIST_URL_PAGES_BY_ENTITY}f550ddfa-9b02-11ec-9f94-244bfe557d55`);
    let paths = [];

    resListWebPages.data.forEach((block) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    pwUrlPag: block.pwUrlPag.trim().toLowerCase(),
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