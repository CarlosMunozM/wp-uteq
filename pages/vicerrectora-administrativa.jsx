import { LayoutSecond } from 'components/layouts';
import { FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';
const { makeRequestGETWS } = require('../utils/api');


const getLocalizedTitle = (locale) => {
    switch (locale) {
        case 'es':
            return 'Vicerrectora Administrativa - UTEQ';
        case 'en':
            return 'Administrative Vice-Chancellor - UTEQ';
        default:
            return 'Vice-Reitora Administrativa - UTEQ';
    }
};

const getLocalizedDescription = (locale) => {
    switch (locale) {
        case 'es':
            return 'Sitio web de la información académica y profesional de la Vicerrectora Administrativa de la UTEQ';
        case 'en':
            return 'Website for the academic and professional information of the Administrative Vice-Chancellor of UTEQ';
        default:
            return 'Site com informações acadêmicas e profissionais da Vice-Reitora Administrativa da UTEQ';
    }
};

const getPageUrl = (locale) => `${apiUrl}/${locale}/vicerrectora-administrativa`;
const VicerrectorAdministrativo = (props) => LayoutSecond(props);

export default VicerrectorAdministrativo;

export const getStaticProps = async ({ locale }) => {
    const makeRequest = async (url, useHttps = true) => await makeRequestGETWS(url, useHttps);

    const resSideMenu = await makeRequest(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`, false);

    return {
        props: {
            option: 76,
            sidemenu: resSideMenu,
            titlepage: getLocalizedTitle(locale),
            descpage: getLocalizedDescription(locale),
            urlpageweb: getPageUrl(locale),
            urlimage: `${FRONT_PG_IMGS_FOLDER}imagen_vicerrector_adm_uteq.webp`,
            bannerimg: "vicerrectora-administrativa-uteq.webp",
            language: locale
        }
    };
};