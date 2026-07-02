import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_POST_SOCIAL_NET_UNIVERSITY, WS_LIST_VIDEOS_WEEK, WS_LIST_NEWSPAPERS_MONTH, WS_LIST_ACTIVE_DEPARTAMENTS, WS_LIST_ACTIVE_CATEGORIES, 
    FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ALL_INFO_NEWS, WS_LIST_ITEMS_MENU_LAT_BY_LANG} from 'config';


const Comunicacion = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Comunicacion;

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
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}28`);
    const resListPostFb = await make_request_ws(`${WS_LIST_POST_SOCIAL_NET_UNIVERSITY}TWITT/20`);
    const resListNewsUniv = await make_request_ws(WS_LIST_ALL_INFO_NEWS);
    const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);
    const resActvDepartms = await make_request_ws(WS_LIST_ACTIVE_DEPARTAMENTS);
    const resActvCategrs = await make_request_ws(WS_LIST_ACTIVE_CATEGORIES);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}755bdb85-b1a3-4960-a38c-37f3fdee3273`);

    return {
        props: {
            option: 22,
            sidemenu: resSideMenu.data,
            listposts: resListPostFb.data,
            listnews: resListNewsUniv.data,
            data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,
            actdepartms: resActvDepartms.data,
            actcategrs: resActvCategrs.data,
            titlepage: (locale==="es"?"Noticias UTEQ":(locale==="en"?"UTEQ News":"Notícias da UTEQ")),
            descpage: (locale==="es"?"Sitio web de las noticias institucionales de la UTEQ":(locale==="en"?"UTEQ Institutional News Website":"Sítio institucional de notícias da UTEQ")),
            urlpageweb: `${apiUrl}/${locale}/comunicacion`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_noticias_uteq_es.jpg":(locale==="en"?"imagen_noticias_uteq_en.jpg":"imagen_noticias_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: '755bdb85-b1a3-4960-a38c-37f3fdee3273',
            language: locale,
        }
    };

};