import { LayoutSecond } from 'components/layouts';
import { FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';
const { makeRequestGETWS } = require('../utils/api');

const getLocalizedTitle = (locale) => {
    switch (locale) {
        case 'es':
            return 'Vicerrector Académico - UTEQ';
        case 'en':
            return 'Academic Vice-Rector - UTEQ';
        default:
            return 'Vice-Reitor Acadêmico - UTEQ';
    }
};

const getLocalizedDescription = (locale) => {
    switch (locale) {
        case 'es':
            return 'Sitio web de la información académica y profesional de la Vicerrector Académico de la UTEQ';
        case 'en':
            return 'Academic and professional information website of the Academic Vice-Rector of UTEQ';
        default:
            return 'Site de informações acadêmicas e profissionais do Vice-Reitor Acadêmico da UTEQ';
    }
};

const getPageUrl = (locale) => `${apiUrl}/${locale}/vicerrector-academico`;
const VicerrectoraAcadPagWeb = (props) => LayoutSecond(props);

export default VicerrectoraAcadPagWeb;

export const getStaticProps = async ({ locale }) => {
    const makeRequest = async (url, useHttps = true) => await makeRequestGETWS(url, useHttps);

    const resSideMenu = await makeRequest(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`, false);

    return {
        props: {
            option: 75,
            sidemenu: resSideMenu,
            titlepage: getLocalizedTitle(locale),
            descpage: getLocalizedDescription(locale),
            urlpageweb: getPageUrl(locale),
            urlimage: `${FRONT_PG_IMGS_FOLDER}imagen_vicerrectora_acad_uteq.webp`,
            bannerimg: "vicerrectora-academica-uteq.webp",
            language: locale
        }
    };
};

