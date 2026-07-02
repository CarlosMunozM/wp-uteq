import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB
} from 'config';

const Busqueda = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Busqueda;

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

export const getStaticProps = async ({ locale }) => {

    const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}c066f985-c0db-4730-b134-92445f1c4fd1`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            option: 45,
            titlepage: (locale==="es"?"Búsqueda de información":(locale==="en"?"Search for information":"Procurar informações")),
            descpage: (locale==="es"?"Sitio web de búsqueda de recursos informativos":(locale==="en"?"Information resource search website":"Sítio Web de pesquisa de recursos de informação")),
            urlpageweb: `${apiUrl}/${locale}/busqueda`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_busqueda_de_informacion_uteq_es.jpg":(locale==="en"?"imagen_busqueda_de_informacion_uteq_en.jpg":"imagen_busqueda_de_informacion_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            data8: resInfoPageWeb.data,
            codpage: 'c066f985-c0db-4730-b134-92445f1c4fd1',
            language: locale,
        }
    };

}