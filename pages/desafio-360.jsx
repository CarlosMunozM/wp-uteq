import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_IMAGES_SLIDER, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';


const DesafioUteq = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default DesafioUteq;


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

export const getServerSideProps = async ({ query, locale }) => {
    const codigoParam = query.codigo || null;

    if (!codigoParam) {
        return {
            redirect: {
                destination: 'https://tour-virtual.uteq.edu.ec/',
                permanent: false,
            },
        };
    }

    const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/2`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}2346f47b-4f55-49eb-94c0-442e59650c0e`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 78,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            slider1: resSlider.data,
            titlepage: locale === "es" ? 'Encuentra y descubre tu universidad - Desafío UTEQ' : (locale === "en" ? 'Find and discover your university - UTEQ Challenge' : 'Encontre e descubra sua universidade - Desafio UTEQ'),
            descpage: locale === "es" ? 'Sitio web acerca del juego Desafío UTEQ' : (locale === "en" ? 'Website about the Desafío UTEQ game' : 'Site sobre o jogo Desafío UTEQ'),
            urlpageweb: `${apiUrl}/${locale}/desafio-uteq`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale === "es" ? "imagen_desafio_uteq_es.jpg" : (locale === "en" ? "imagen_desafio_uteq_en.jpg" : "imagen_desafio_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '2346f47b-4f55-49eb-94c0-442e59650c0e',
            language: locale,
            codigo: codigoParam,
        },
    };
};