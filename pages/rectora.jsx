import { LayoutSecond } from 'components/layouts';
import { 
    WS_LIST_VIDEOS_WEEK, 
    WS_LIST_NEWSPAPERS_MONTH, 
    WS_LIST_DATA_GENERAL_NUM1, 
    FRONT_PG_IMGS_FOLDER, 
    apiUrl, 
    WS_LIST_ITEMS_MENU_LAT_BY_LANG 
} from 'config';
const { makeRequestGETWS } = require('../utils/api');

const getLocalizedTitle = (locale) => {
    switch (locale) {
        case 'es':
            return 'Rectora - UTEQ';
        case 'en':
            return 'Rector - UTEQ';
        default:
            return 'Reitora - UTEQ';
    }
};

const getLocalizedDescription = (locale) => {
    switch (locale) {
        case 'es':
            return 'Sitio web de la información acádemica y profesional del Rectora de la UTEQ';
        case 'en':
            return 'UTEQ Rector academic and professional information website';
        default:
            return 'Sítio de informação académica e profissional do Reitora da UTEQ';
    }
};

const getPageUrl = (locale) => `${apiUrl}/${locale}/rectora`;
const RectorPagWeb = (props) => LayoutSecond(props);

export default RectorPagWeb;

export const getStaticProps = async ({ locale }) => {
    const makeRequest = async (url, useHttps = true) => await makeRequestGETWS(url, useHttps);

    const resVideoWeek = await makeRequest(WS_LIST_VIDEOS_WEEK, false);
    const resNewspapersWeek = await makeRequest(`${WS_LIST_NEWSPAPERS_MONTH}1`, false);
    const resDataGeneral = await makeRequest(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`, false);
    const resSideMenu = await makeRequest(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`, false);

    return {
        props: {
            data5: resVideoWeek,
            data6: resNewspapersWeek,
            option: 74,
            campus: resDataGeneral,
            sidemenu: resSideMenu,
            titlepage: getLocalizedTitle(locale),
            descpage: getLocalizedDescription(locale),
            urlpageweb: getPageUrl(locale),
            urlimage: `${FRONT_PG_IMGS_FOLDER}imagen_rector_uteq.webp`,
        	bannerimg: "vicerrectora-academica-uteq.webp",
            language: locale
        }
    };
};