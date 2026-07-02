import axios from 'axios';
import { WS_LIST_EVENTS_ORGZ_UNIVERSITY, WS_INFORMATION_EVENT_BY_URL, FRONT_PG_IMGS_FOLDER, apiUrl } from 'config';
import { LayoutSecond } from 'components/layouts';

const EventoOrgz = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default EventoOrgz;

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
    const resInfoEventOrgz = await make_request_ws(`${WS_INFORMATION_EVENT_BY_URL}${params.eoUrlParcial}`);

    return {
        props: {
            info_event: resInfoEventOrgz.data,
            option: 19,
            titlepage: `${locale==="es"?resInfoEventOrgz.data.eoTitulo.trim():(locale==="en"?resInfoEventOrgz.data.eoTituloEn.trim():resInfoEventOrgz.data.eoTituloPt.trim())} - UTEQ`,
            descpage: (locale==="es"?`Sitio web informativo de ${resInfoEventOrgz.data.eoTitulo.trim()}`:(locale==="en"?`Informative website of ${resInfoEventOrgz.data.eoTituloEn.trim()}`:
            `Sítio Web informativo de ${resInfoEventOrgz.data.eoTituloPt.trim()}`)),
            urlpageweb: `${apiUrl}/${locale}/evento/${params.eoUrlParcial.trim()}`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?resInfoEventOrgz.data.eoUrlImgRs.trim():(locale==="en"?resInfoEventOrgz.data.eoUrlImgRsEn.trim():resInfoEventOrgz.data.eoUrlImgRsPt.trim())}`,
            language: locale,
        }
    };

};

export async function getStaticPaths({ locales }) {
    const resDataEventsOrgz = await make_request_ws(WS_LIST_EVENTS_ORGZ_UNIVERSITY);
    let paths = [];

    resDataEventsOrgz.data.forEach((block) => {
        for (const locale of locales) {
            paths.push({
                params: {
                    eoUrlParcial: block.eoUrlParcial.trim().toLowerCase(),
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