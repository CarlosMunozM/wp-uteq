import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import { WS_LIST_NEWSPAPERS_MONTH, WS_LIST_VIDEOS_BY_TYPE, FRONT_PG_IMGS_FOLDER, apiUrl, WS_INFORMATION_PAGE_WEB, WS_LIST_ITEMS_MENU_LAT_BY_LANG } from 'config';

const Informativos = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default Informativos;

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
    const resNewspapers = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}6`);
    const resVideosRS = await make_request_ws(`${WS_LIST_VIDEOS_BY_TYPE}6`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}df7e00b9-a758-4023-b01c-ea447d02dbd9`);

    return {
        props: {
            option: 23,
            sidemenu: resSideMenu.data,
            newspapers: resNewspapers.data,
            videos: resVideosRS.data,
            titlepage: (locale==="es"?"Informativos UTEQ":(locale==="en"?"UTEQ News":"Notícias da UTEQ")),
            descpage: (locale==="es"?"Sitio web de los canales informativos de la UTEQ":(locale==="en"?"UTEQ's information channels web site":"Sítio Web dos canais de informação da UTEQ")),
            urlpageweb: `${apiUrl}/${locale}/comunicacion/informativos`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}img-frontpg-com-2.jpg${locale==="es"?"":(locale==="en"?"":"")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            codpage: 'df7e00b9-a758-4023-b01c-ea447d02dbd9',
            language: locale,
        }
    };

};