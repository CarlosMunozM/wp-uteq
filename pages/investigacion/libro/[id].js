import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_DATA_GENERAL_NUM1, FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_VIDEOS_UNIV_BY_TYPE, WS_CODS_LIST_ENTITY_RESEARCH_SGA, WS_INFORMATION_ENTITY_SGA, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Libro = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Libro;

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
    const resInfBook = await make_external_request_ws(WS_INFORMATION_ENTITY_SGA.replace('VAL1', '1').replace('VAL2', params.id));

    return {
        props: {
            data5: resVideoInv.data,
            databook: resInfBook.data,
            option: 65,
            sidemenu: resSideMenu.data,
            datamagz: resMagazines.data,
            titlepage: resInfBook.data[0].titulo.trim(),
            descpage: `${locale==="es"?"Página web del capítulo de libro":(locale==="en"?"Book chapter website":"Sítio Web do capítulo do livro")} - ${resInfBook.data[0].titulo.trim()}`,
            urlpageweb: `${apiUrl}/${locale}/investigacion/libro/${params.id}`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_informacion_libro_uteq_es.jpg":(locale==="en"?"imagen_informacion_libro_uteq_en.jpg":"imagen_informacion_libro_uteq_pt.jpg")}`,
            bannerimg: "img-uteq-banner-0000125.jpg",
            codpage: '75d004d0-62e0-4d58-9846-849b7673a835',
            language: locale,
        }
    };

}

export async function getStaticPaths({ locales }) {
    const resListBks = await make_external_request_ws(`${WS_CODS_LIST_ENTITY_RESEARCH_SGA}1`);
    let paths = [];

    /*resListBks.data*//*[334].forEach((block) => {
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
        resInfBook
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
                        .replace('VAL1', '1')
                        .replace('VAL2', id)
                ),
            `WS_INFORMATION_ENTITY_SGA libro id=${id}`
        ),
    ]);

    if (!resInfBook || !Array.isArray(resInfBook.data) || resInfBook.data.length === 0) {
        console.warn(`Sin datos válidos para el libro con id=${id}. Se marca como notFound.`);
        return {
            notFound: true,
        };
    }

    const book = resInfBook.data[0] ?? {};
    const titulo = (book.titulo || '').trim();

    const descBase =
        locale === 'es'
            ? 'Página web del libro'
            : locale === 'en'
                ? 'Book website'
                : 'Sítio Web do livro';

    return {
        props: {
            data5: resVideoInv?.data ?? [],
            databook: resInfBook.data,
            option: 65,
            sidemenu: resSideMenu?.data ?? [],
            datamagz: resMagazines?.data ?? [],
            titlepage: titulo || 'Libro',
            descpage: `${descBase} - ${titulo}`,
            urlpageweb: `${apiUrl}/${locale}/investigacion/libro/${id}`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale === 'es'
                    ? 'imagen_informacion_libro_uteq_es.jpg'
                    : locale === 'en'
                        ? 'imagen_informacion_libro_uteq_en.jpg'
                        : 'imagen_informacion_libro_uteq_pt.jpg'
                }`,
            bannerimg: 'img-uteq-banner-0000125.jpg',
            codpage: '75d004d0-62e0-4d58-9846-849b7673a835',
            language: locale,
        },
    };
};

export async function getStaticPaths({ locales }) {
    let resListBks;

    try {
        resListBks = await make_external_request_ws(`${WS_CODS_LIST_ENTITY_RESEARCH_SGA}1`);
    } catch (error) {
        console.error('Error al obtener la lista de libros:', error);
        return {
            paths: [],
            fallback: false,
        };
    }

    const paths = [];

    if (Array.isArray(resListBks?.data)) {
        resListBks.data.forEach((block, index) => {
            if (!block || block.id == null) {
                console.warn(`Libro sin id en posición ${index}, se ignora en getStaticPaths.`);
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
        console.warn('resListBks.data no es un array, no se generan paths.');
    }

    return {
        paths,
        fallback: false,
    };
}





