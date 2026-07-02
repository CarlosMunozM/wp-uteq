import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, 
    FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';


const Archivo = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Archivo;

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
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}641e9b85-177f-40ae-8749-49c9a363b31b`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 7,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            titlepage: (locale === "es" ? 'Archivos institucionales - UTEQ' : (locale === "en" ? 'Institutional files - UTEQ' : 'Arquivos institucionais - UTEQ')),
            descpage: (locale === "es" ? 'Sitio web del listado de archivos de la UTEQ' : (locale === "en" ? 'Website of UTEQ files' : 'Website de arquivos UTEQ')),
            urlpageweb: `${apiUrl}/${locale}/archivo`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_archivos_institucionales_uteq_es.jpg":(locale==="en"?"imagen_archivos_institucionales_uteq_en.jpg":"imagen_archivos_institucionales_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '641e9b85-177f-40ae-8749-49c9a363b31b',
            language: locale
        },
    };
};