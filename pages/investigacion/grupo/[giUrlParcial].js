import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_INFORMATION_OF_GROUP_BY_CODE, WS_LIST_URLS_RESEARCH_GROUP_BY_FACULTY, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const GrupoInvst = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default GrupoInvst;

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

export const getStaticProps = async ({params, locale}) => {

    const resVideoInv = await make_request_ws(`${WS_LIST_VIDEOS_UNIV_BY_TYPE}107/1`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}31`);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resInfoGrupo = await make_request_ws(`${WS_INFORMATION_OF_GROUP_BY_CODE}${params.giUrlParcial}`);

    return {
        props: {
            data5: resVideoInv.data,
            datagp: resInfoGrupo.data,
            option: 57,
            sidemenu: resSideMenu.data,
            datamagz: resMagazines.data,
            urlgroup: params.giUrlParcial,
            titlepage: (locale==="es"?resInfoGrupo.data[0].itGrupoInv.giNombre.trim():(locale==="en"?resInfoGrupo.data[0].itGrupoInv.giNombreEn.trim():resInfoGrupo.data[0].itGrupoInv.giNombrePt.trim())),
            descpage: (locale==="es"?`Página web del Grupo de Investigación - ${resInfoGrupo.data[0].itGrupoInv.giNombre.trim()}`:(locale==="en"?`Research Group website - ${resInfoGrupo.data[0].itGrupoInv.giNombreEn.trim()}`:
            `Sítio Web do Grupo de Investigação - ${resInfoGrupo.data[0].itGrupoInv.giNombrePt.trim()}`)),
            urlpageweb: `${apiUrl}/${locale}/investigacion/grupo/${resInfoGrupo.data[0].itGrupoInv.giUrlParcial.trim()}`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_informacion_grupo_investigacion_uteq_es.jpg":(locale==="en"?"imagen_informacion_grupo_investigacion_uteq_en.jpg":"imagen_informacion_grupo_investigacion_uteq_pt.jpg")}`,
            bannerimg: (resInfoGrupo.data[0].itGrupoInv.giUrlBanner!==null && resInfoGrupo.data[0].itGrupoInv.giUrlBanner!=="")? resInfoGrupo.data[0].itGrupoInv.giUrlBanner:"img-uteq-banner-0000058.jpg",
            codpage: '785bd070-c0f5-4db1-95b0-b936572df74f',
            language: locale,
        }
    };

}


export async function getStaticPaths({ locales }) {
    const resListGroups = await make_request_ws(WS_LIST_URLS_RESEARCH_GROUP_BY_FACULTY);
    let paths = [];

    resListGroups.data.forEach((block) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    giUrlParcial: block.giUrlParcial.trim().toLowerCase(),
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
