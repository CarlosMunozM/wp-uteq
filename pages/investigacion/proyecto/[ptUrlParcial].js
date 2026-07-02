import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_LIST_DATA_GENERAL_NUM1,
    FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_RES_PROJECT, WS_IMAGES_OF_PROJECT_RES,
    WS_LIST_URL_RESEARCH_PROJECTS, WS_LIST_ITEMS_MENU_LAT_BY_LANG
} from 'config';


const ProyectoInvst = (props) => {
    return (
        LayoutSecond(props)
    );
}

export default ProyectoInvst;

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

    const resVideoInv = await make_request_ws(`${WS_LIST_VIDEOS_UNIV_BY_TYPE}107/3`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}31`);
    const resInfoResProj = await make_request_ws(`${WS_INFORMATION_RES_PROJECT}${params.ptUrlParcial.trim()}`);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resListImgs = await make_request_ws(`${WS_IMAGES_OF_PROJECT_RES}${params.ptUrlParcial.trim()}`);


    return {
        props: {
            data5: resVideoInv.data,
            inforesproj: resInfoResProj.data,
            imgproj: resListImgs.data,
            option: 59,
            sidemenu: resSideMenu.data,
            datamagz: resMagazines.data,
            titlepage: (resInfoResProj.data !== null && resInfoResProj.data !== '' ? (locale === "es" ? resInfoResProj.data.ptNombre.trim() : (locale === "en" ? resInfoResProj.data.ptNombreEn.trim() : resInfoResProj.data.ptNombrePt.trim())) : 'Proyecto de Investigación - UTEQ'),
            descpage: (`${locale === "es" ? "Sitio web del proyecto de investigación" : (locale === "en" ? "Research project website" : "Sítio Web do projecto de investigação")} - ` +
                (resInfoResProj.data !== null && resInfoResProj.data !== '' ? (locale === "es" ? resInfoResProj.data.ptNombre.trim() : (locale === "en" ? resInfoResProj.data.ptNombreEn.trim() : resInfoResProj.data.ptNombrePt.trim())) : 'UTEQ')),
            urlpageweb: (resInfoResProj.data !== null && resInfoResProj.data !== '' ? (`${apiUrl}/${locale}/investigacion/proyecto/${resInfoResProj.data.ptUrlParcial.trim()}`) : apiUrl),
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_informacion_proyecto_investigacion_uteq_es.jpg":(locale==="en"?"imagen_informacion_proyecto_investigacion_uteq_en.jpg":"imagen_informacion_proyecto_investigacion_uteq_pt.jpg")}`,
            bannerimg: 'img-uteq-banner-0000150.jpg',
            codpage: 'ee03827b-bfaf-4b33-ade2-df86196145c3',
            language: locale,
        }
    };
};


export async function getStaticPaths({ locales }) {
    const resListResProjects = await make_request_ws(WS_LIST_URL_RESEARCH_PROJECTS);
    let paths = [];

    resListResProjects.data.forEach((block) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    ptUrlParcial: block.ptUrlParcial.trim().toLowerCase(),
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