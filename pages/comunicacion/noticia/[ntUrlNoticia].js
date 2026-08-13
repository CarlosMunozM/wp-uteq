import axios from 'axios';
import { LayoutSecond } from 'components/layouts';
import { WS_LIST_ITEMS_MENU_LAT_BY_LANG, WS_INFORMATION_NEWS_BY_URL, WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, apiUrl, WS_LIST_ALL_URLS_NEWS } from 'config';


const Noticia = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Noticia;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}28`);
    const resInfoNews = await make_request_ws(`${WS_INFORMATION_NEWS_BY_URL}${params.ntUrlNoticia}`);
    const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);

    // Si la noticia no existe en la BD, devolvemos 404
    if (!resInfoNews || !resInfoNews.data) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            option: 37,
            sidemenu: resSideMenu.data,
            paramadc: params.ntUrlNoticia,
            infonews: resInfoNews.data,
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            titlepage: (resInfoNews.data !== null ? (locale === "es" ? resInfoNews.data.ntTitular.trim() : (locale === "en" ? resInfoNews.data.ntTitularEn.trim() : resInfoNews.data.ntTitularPt.trim())) : 'UTEQ'),
            descpage: ((locale === "es" ? "Sitio web de noticia - " : (locale === "en" ? "News website - " : "Sítio Web de notícias - ")) + (resInfoNews.data !== null ? (locale === "es" ? resInfoNews.data.ntTitular.trim() : (locale === "en" ? resInfoNews.data.ntTitularEn.trim() : resInfoNews.data.ntTitularPt.trim())) : 'UTEQ')),
            urlpageweb: (resInfoNews.data !== null ? (`${apiUrl}/${locale}/comunicacion/noticia/${resInfoNews.data.ntUrlNoticia.trim()}`) : `${apiUrl}/${locale}`),
            urlimage: (resInfoNews.data !== null ? (`/assets/images/news/pagina/${resInfoNews.data.ntUrlPortada.trim()}`) : `/assets/img/${locale === "es" ? "imagen_noticias_uteq_es.jpg" : (locale === "en" ? "imagen_noticias_uteq_en.jpg" : "imagen_noticias_uteq_pt.jpg")}`),
            codpage: '755bdb85-b1a3-4960-a38c-37f3fdee3273',
            language: locale,
        },
        revalidate: 300 // Revalida en segundo plano cada 5 minutos (300 segundos)
    };

};

export async function getStaticPaths({ locales }) {

    const resListNewsUniv = await make_request_ws(WS_LIST_ALL_URLS_NEWS);
    let paths = [];

    // Validamos que exista resListNewsUniv y resListNewsUniv.data sea un arreglo
    if (resListNewsUniv && Array.isArray(resListNewsUniv.data)) {
        resListNewsUniv.data.forEach((block) => {
            // Detecta si 'block' es un string directo o un objeto con propiedad ntUrlNoticia
            const urlSlug = typeof block === 'string' ? block : block?.ntUrlNoticia;

            if (urlSlug) {
                for (const locale of locales) {
                    paths.push({
                        params: {
                            ntUrlNoticia: urlSlug.trim().toLowerCase(),
                        },
                        locale,
                    });
                }
            }
        });
    }

    return {
        paths,
        fallback: 'blocking' // false
    }

}

/*
export async function getStaticPaths({ locales }) {

    const resListNewsUniv = await make_request_ws(WS_LIST_ALL_URLS_NEWS);
    let paths = [];

    resListNewsUniv.data.forEach((block) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    ntUrlNoticia: block.ntUrlNoticia.trim().toLowerCase(),
                },
                locale,
            });
        }
    });

    return {
        paths,
        fallback: 'blocking'//false
    }

}*/