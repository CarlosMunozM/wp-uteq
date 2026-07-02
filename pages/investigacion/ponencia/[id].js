import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_CODS_LIST_ENTITY_RESEARCH_SGA, WS_INFORMATION_ENTITY_SGA, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Ponencia = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Ponencia;

async function make_request_ws(path_url) {
    var listTemp=null;
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

async function make_external_request_ws(path_url) {
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

/*export const getStaticProps = async ({ params, locale }) => {

    const resVideoInv = await make_request_ws(`${WS_LIST_VIDEOS_UNIV_BY_TYPE}107/1`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}31`);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resInfExps = await make_external_request_ws(WS_INFORMATION_ENTITY_SGA.replace('VAL1', '4').replace('VAL2', params.id));

    return {
        props: {
            data5: resVideoInv.data,
            dataexps: resInfExps.data,
            option: 67,
            sidemenu: resSideMenu.data,
            datamagz: resMagazines.data,
            titlepage: resInfExps.data[0].titulo.trim(),
            descpage: `${locale==="es"?"Página web de la ponencia":(locale==="en"?"Web page of the conference":"Página Web da conferência")} - ${resInfExps.data[0].titulo.trim()}`,
            urlpageweb: `${apiUrl}/${locale}/investigacion/ponencia/${params.id}`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_informacion_ponencia_uteq_es.jpg":(locale==="en"?"imagen_informacion_ponencia_uteq_en.jpg":"imagen_informacion_ponencia_uteq_pt.jpg")}`,
            bannerimg: "img-uteq-banner-0000127.jpg",
            codpage: '75d004d0-62e0-4d58-9846-849b7673a835',
            language: locale,
        }
    };

}

export async function getStaticPaths({ locales }) {
    const resListExps = await make_external_request_ws(`${WS_CODS_LIST_ENTITY_RESEARCH_SGA}4`);
    let paths = [];

    /*resListExps.data*//*[247].forEach((block) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    id: block./*id.*//*toString(),
                },
                locale,
            });
        }
    });

    return {
        paths,
        fallback: false
    }

}*/


async function safeRequest(promiseFactory, contextMsg = '') {
    try {
        return await promiseFactory();
    } catch (error) {
        console.error(`Error en petición: ${contextMsg}`, error);
        return null;
    }
}

export const getStaticProps = async ({ params, locale }) => {
    const { id } = params;

    const [
        resVideoInv,
        resSideMenu,
        resMagazines,
        resInfExps,
    ] = await Promise.all([
        safeRequest(
            () => make_request_ws(`${WS_LIST_VIDEOS_UNIV_BY_TYPE}107/1`),
            'WS_LIST_VIDEOS_UNIV_BY_TYPE'
        ),
        safeRequest(
            () => make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}31`),
            'WS_LIST_ITEMS_MENU_LAT_BY_LANG'
        ),
        safeRequest(
            () => make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`),
            'WS_LIST_DATA_GENERAL_NUM1'
        ),
        safeRequest(
            () =>
                make_external_request_ws(
                    WS_INFORMATION_ENTITY_SGA
                        .replace('VAL1', '4')
                        .replace('VAL2', id)
                ),
            `WS_INFORMATION_ENTITY_SGA ponencia id=${id}`
        ),
    ]);

    if (!resInfExps || !Array.isArray(resInfExps.data) || resInfExps.data.length === 0) {
        console.warn(`Sin datos válidos para la ponencia con id=${id}. Se marca como notFound.`);
        return {
            notFound: true,
        };
    }

    const exp = resInfExps.data[0] ?? {};
    const titulo = (exp.titulo || '').trim();

    const descBase =
        locale === 'es'
            ? 'Página web de la ponencia'
            : locale === 'en'
                ? 'Web page of the conference'
                : 'Página Web da conferência';

    return {
        props: {
            data5: resVideoInv?.data ?? [],
            dataexps: resInfExps.data,
            option: 67,
            sidemenu: resSideMenu?.data ?? [],
            datamagz: resMagazines?.data ?? [],
            titlepage: titulo || 'Ponencia',
            descpage: `${descBase} - ${titulo}`,
            urlpageweb: `${apiUrl}/${locale}/investigacion/ponencia/${id}`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale === 'es'
                    ? 'imagen_informacion_ponencia_uteq_es.jpg'
                    : locale === 'en'
                        ? 'imagen_informacion_ponencia_uteq_en.jpg'
                        : 'imagen_informacion_ponencia_uteq_pt.jpg'
                }`,
            bannerimg: 'img-uteq-banner-0000127.jpg',
            codpage: '75d004d0-62e0-4d58-9846-849b7673a835',
            language: locale,
        },
    };
};

export async function getStaticPaths({ locales }) {
    let resListExps;

    try {
        resListExps = await make_external_request_ws(`${WS_CODS_LIST_ENTITY_RESEARCH_SGA}4`);
    } catch (error) {
        console.error('Error al obtener la lista de ponencias:', error);
        return {
            paths: [],
            fallback: false,
        };
    }

    const paths = [];

    if (Array.isArray(resListExps?.data)) {
        resListExps.data.forEach((block, index) => {
            if (!block || block.id == null) {
                console.warn(`Ponencia sin id en posición ${index}, se ignora en getStaticPaths.`);
                return;
            }

            for (const locale of locales) {
                paths.push({
                    params: {
                        id: String(block.id),
                    },
                    locale,
                });
            }
        });
    } else {
        console.warn('resListExps.data no es un array, no se generan paths.');
    }

    return {
        paths,
        fallback: false,
    };
}