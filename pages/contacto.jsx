import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_DATA_DEANS, WS_INFORMATION_PAGE_WEB, apiUrl, FRONT_PG_IMGS_FOLDER, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';


const Contact = (props) => {

    return (
        LayoutSecond(props)
    );
};

export default Contact;

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
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resDataAddresses = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}DESTINATARIO`);
    const resDeans = await make_request_ws(`${WS_LIST_DATA_DEANS}`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}19`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}d84962aa-7db1-49e9-9d69-3646103127ae`);

    return {
        props: {
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            campus: resDataGeneral.data,
            data7: resDataAddresses.data,
            data8: resDeans.data,
            option: 1,
            sidemenu: resSideMenu.data,
            titlepage: (locale==="es"?"Contáctenos - Universidad Técnica Estatal de Quevedo":(locale==="en"?"Contact us - Quevedo State Technical University":"Contacte-nos - Universidade Técnica do Estado de Quevedo")),
            descpage: (locale==="es"?"Sitio web de contactos de la Universidad Técnica Estatal de Quevedo":(locale==="en"?"Quevedo State Technical University contacts website":"Página de contactos da Universidade Técnica do Estado de Quevedo")),
            urlpageweb: `${apiUrl}/${locale}/contacto`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_contactos_uteq_es.jpg":(locale==="en"?"imagen_contactos_uteq_en.jpg":"imagen_contactos_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'd84962aa-7db1-49e9-9d69-3646103127ae',
            language: locale
        }
    };
};