import {
    apiUrl, WS_LIST_ALL_URLS_NEWS, WS_LIST_EVENTS_ORGZ_UNIVERSITY, WS_LIST_URLS_CAREERS_GRADE_BY_FACULTY, WS_LIST_DATA_URLS_FACULTIES_UTEQ, WS_CODS_LIST_ENTITY_RESEARCH_SGA,
    WS_LIST_URLS_RESEARCH_GROUP_BY_FACULTY, WS_LIST_URL_RESEARCH_PROJECTS, WS_LIST_URLS_CAREERS_UNIVERSITY_BY_DEPART, WS_LIST_URLS_WEB_PAGES_BY_ENTITY, WS_LIST_URLS_PROJECTS_LKG,
    WS_LIST_URL_PAGES_BY_ENTITY
} from 'config';
import * as fs from 'fs';
import axios from 'axios';



const Sitemap = () => {};

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

export const getServerSideProps = async ({ res }) => {
    let dynamicsPaths = [], allPaths = [], sitemap = '', languages = ['es', 'en', 'pt'];
    const pagesDir = "pages/**/*.jsx";
    const glob = require('glob');
    let staticPaths = await glob.sync(pagesDir);

    staticPaths = staticPaths
        .filter((path) => !path.includes("["))
        .filter((path) => !path.includes("/_"))
        .filter((path) => !path.includes("404"))
        .filter((path) => !path.includes("500"))
        .filter((path) => !path.includes("sitemap.xml")).map((staticPagePath) => {
            return `${apiUrl}/${staticPagePath.replace("pages/", "").replace(".jsx", "").replace("/index", "").replace("index", "")}`;
        });

    const rs_news = await make_request_ws(WS_LIST_ALL_URLS_NEWS);
    const rs_ev_int = await make_request_ws(`${WS_LIST_URL_PAGES_BY_ENTITY}f550ddfa-9b02-11ec-9f94-244bfe557d55`);
    const rs_ev_org = await make_request_ws(WS_LIST_EVENTS_ORGZ_UNIVERSITY);
    const rs_careers = await make_request_ws(WS_LIST_URLS_CAREERS_GRADE_BY_FACULTY);
    const rs_faculties = await make_request_ws(WS_LIST_DATA_URLS_FACULTIES_UTEQ);
    const rs_papers = await make_external_request_ws(`${WS_CODS_LIST_ENTITY_RESEARCH_SGA}3`);
    const rs_capts = await make_external_request_ws(`${WS_CODS_LIST_ENTITY_RESEARCH_SGA}2`);
    const rs_groups = await make_request_ws(WS_LIST_URLS_RESEARCH_GROUP_BY_FACULTY);
    const rs_books = await make_external_request_ws(`${WS_CODS_LIST_ENTITY_RESEARCH_SGA}1`);
    const rs_poncs = await make_external_request_ws(`${WS_CODS_LIST_ENTITY_RESEARCH_SGA}4`);
    const rs_projs = await make_request_ws(WS_LIST_URL_RESEARCH_PROJECTS);
    const rs_mscs = await make_request_ws(`${WS_LIST_URLS_CAREERS_UNIVERSITY_BY_DEPART}37823e40-8900-11ec-b5cf-244bfe557d55`);
    const rs_rd_ctas = await make_request_ws(`${WS_LIST_URLS_WEB_PAGES_BY_ENTITY}RCT`);
    const rs_projsv = await make_request_ws(WS_LIST_URLS_PROJECTS_LKG);

    const pgs_news = rs_news.data.map(news => {
        return `${apiUrl}/comunicacion/noticia/${news.ntUrlNoticia.trim()}`
    });
    const pgs_ev_int = rs_ev_int.data.map(ev_int => {
        return `${apiUrl}/evaluacion-interna/${ev_int.pwUrlPag.trim()}`
    });
    const pgs_ev_org = rs_ev_org.data.map(ev_org => {
        return `${apiUrl}/evento/${ev_org.eoUrlParcial.trim()}`
    });
    const pgs_cars = rs_careers.data.map(career => {
        return `${apiUrl}/grado/carrera/${career.crUrlParcial.trim()}`
    });
    const pgs_fcts = rs_faculties.data.map(faculty => {
        return `${apiUrl}/grado/facultad/${faculty.dpParcialUrl.trim()}`
    });
    const pgs_paps = rs_papers.data.map(paper => {
        return `${apiUrl}/investigacion/articulo/${paper.id.toString()}`
    });
    const pgs_capts = rs_capts.data.map(capt => {
        return `${apiUrl}/investigacion/capitulo/${capt.id.toString()}`
    });
    const pgs_groups = rs_groups.data.map(group => {
        return `${apiUrl}/investigacion/grupo/${group.giUrlParcial.trim()}`
    });
    const pgs_books = rs_books.data.map(book => {
        return `${apiUrl}/investigacion/libro/${book.id.toString()}`
    });
    const pgs_poncs = rs_poncs.data.map(ponc => {
        return `${apiUrl}/investigacion/ponencia/${ponc.id.toString()}`
    });
    const pgs_projs = rs_projs.data.map(proj => {
        return `${apiUrl}/investigacion/proyecto/${proj.ptUrlParcial.trim()}`
    });
    const pgs_mscs = rs_mscs.data.map(msc => {
        return `${apiUrl}/posgrado/${msc.crUrlParcial.trim()}`
    });
    const pgs_rd_ctas = rs_rd_ctas.data.map(rd_cta => {
        return `${apiUrl}/rendicion-cuentas/${rd_cta.pwUrlPag.trim()}`
    });
    const pgs_projsv = rs_projsv.data.map(projsv => {
        return `${apiUrl}/vinculacion/proyectos/${projsv.pvUrlParcial.trim()}`
    });

    if (pgs_news !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_news];
    }

    if (pgs_ev_int !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_ev_int];
    }

    if (pgs_ev_org !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_ev_org];
    }

    if (pgs_cars !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_cars];
    }

    if (pgs_fcts !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_fcts];
    }

    if (pgs_paps !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_paps];
    }

    if (pgs_capts !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_capts];
    }

    if (pgs_groups !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_groups];
    }

    if (pgs_books !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_books];
    }

    if (pgs_poncs !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_poncs];
    }

    if (pgs_projs !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_projs];
    }

    if (pgs_mscs !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_mscs];
    }

    if (pgs_rd_ctas !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_rd_ctas];
    }

    if (pgs_projsv !== null) {
        dynamicsPaths = [...dynamicsPaths, ...pgs_projsv];
    }

    allPaths = [...staticPaths, ...dynamicsPaths];
    sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
    http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${allPaths.map((url) => {
        return `<url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <xhtml:link rel="alternate" hreflang="en" href="${url.replace(apiUrl, apiUrl + "/en")}" />
              <xhtml:link rel="alternate" hreflang="pt" href="${url.replace(apiUrl, apiUrl + "/pt")}" />
              <xhtml:link rel="alternate" hreflang="es" href="${url.replace(apiUrl, apiUrl + "/es")}" />
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>`;
    }).join("")}
    </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    fs.writeFileSync('public/sitemap.xml', sitemap);

    return {
        props: {},
    };
};

export default Sitemap;