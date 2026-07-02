import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_INFORMATION_WP_BY_URL, WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_URLS_WEB_PAGES_BY_ENTITY, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const InformeRC = (props) => {
    return (
        LayoutSecond(props)
    );
};

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


export default InformeRC;

export const getStaticProps = async ({ params, locale }) => {

    const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}23`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_WP_BY_URL}${params.pwFraseDesc.trim()}`);


    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 38,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            datainf: resInfoPageWeb.data,
            titlepage: (locale === "es" ? resInfoPageWeb.data.pwNombre.trim() : (locale === "en" ? resInfoPageWeb.data.pwNombreEn.trim() : resInfoPageWeb.data.pwNombrePt.trim())),
            descpage: (locale === "es" ? `Sitio web del ${resInfoPageWeb.data.pwNombre.trim()}` : (locale === "en" ? `Sitio web del ${resInfoPageWeb.data.pwNombreEn.trim()}` : `Sitio web del ${resInfoPageWeb.data.pwNombrePt.trim()}`)),
            urlpageweb: `${apiUrl}/${locale}/rendicion-cuentas/${params.pwFraseDesc.trim()}`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_rendicion_cuentas_uteq_es.jpg":(locale==="en"?"imagen_rendicion_cuentas_uteq_en.jpg":"")}`,
            codpage: '7167cd00-117a-432c-a503-c0f56e7c2304',
            language: locale
        }
    };
};

export async function getStaticPaths({ locales }) {
    const resDataWP = await make_request_ws(`${WS_LIST_URLS_WEB_PAGES_BY_ENTITY}RCT`);
    let paths = [];

    resDataWP.data.forEach((block) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    pwFraseDesc: block.pwUrlPag.trim(),
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