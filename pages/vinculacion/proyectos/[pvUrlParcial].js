import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1,
    FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PROJECT_LKG, WS_IMAGES_OF_PROJECT_LKG, WS_LIST_URLS_PROJECTS_LKG,
    WS_LIST_ITEMS_MENU_LAT_BY_LANG
} from 'config';

const ProyectoVinc = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default ProyectoVinc;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}30`);
    const resInfoProject = await make_request_ws(`${WS_INFORMATION_PROJECT_LKG}${params.pvUrlParcial.trim()}`);
    const resListImgs = await make_request_ws(`${WS_IMAGES_OF_PROJECT_LKG}${params.pvUrlParcial.trim()}`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            imgproj: resListImgs.data,
            option: 54,
            campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            infoproj: resInfoProject.data,
            titlepage: (resInfoProject.data !== null && resInfoProject.data !== '' ? (locale==="es"?resInfoProject.data.pvTitulo.trim():(locale==="en"?resInfoProject.data.pvTituloEn.trim():resInfoProject.data.pvTituloPt.trim())):"Proyecto de Vinculación con la sociedad - UTEQ"),
            descpage: ((locale==="es"?"Sitio web del proyecto de vinculación - ":(locale==="en"?"Linking project website - ":"Ligação do sítio Web do projecto - ")) + 
            (locale==="es"?resInfoProject.data.pvTitulo.trim():(locale==="en"?resInfoProject.data.pvTituloEn.trim():resInfoProject.data.pvTituloPt.trim()))),
            urlpageweb: (resInfoProject.data !== null && resInfoProject.data !== '' ? (`${apiUrl}/${locale}/vinculacion/proyectos/${resInfoProject.data.pvUrlParcial.trim()}`) : `${apiUrl}/${locale}`),
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_proyecto_vinculacion_uteq_es.jpg":(locale==="en"?"imagen_proyecto_vinculacion_uteq_en.jpg":"imagen_proyecto_vinculacion_uteq_pt.jpg")}`,
            bannerimg: 'img-uteq-banner-0000046.jpg',
            codpage: '880565dd-0610-416e-9dc1-cc4636f45cf7',
            language: locale,
        }
    };
};

export async function getStaticPaths({ locales }) {
    const resListProjects = await make_request_ws(WS_LIST_URLS_PROJECTS_LKG);
    let paths = [];

    resListProjects.data.forEach((block) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    pvUrlParcial: block.pvUrlParcial.trim().toLowerCase(),
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