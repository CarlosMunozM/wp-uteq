import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    FRONT_PG_IMGS_FOLDER, apiUrl, WS_LIST_MEMBERS_COMMITTEES, WS_LIST_USER_BY_ROL, WS_LIST_DATA_BY_TYPE, WS_LIST_COUNTRIES,
    WS_LIST_SYMPOSIUMS_UNIVS, WS_INFORMATION_CONGRESS, WS_INFORMATION_PAGE_WEB, WS_LIST_IMAGES_SLIDER, WS_INFORMATION_CONGRESS_BY_CODE,
    WS_INFORMATION_LINKS_SYMPOSIUMS, WS_LIST_SYMPOSIUMS_BY_CONGRESS, WS_LIST_POSTER_DETAILS
} from 'config';
//const { makeRequestGETWS } = require('../utils/api');


/*const Cidu = (props) => {
    return (
        LayoutSecond(props)
    );
};*/

const getLocalizedTitle = (locale) => {
    switch (locale) {
        case 'es':
            return 'Congreso Internacional de Desarrollo Universitario - UTEQ';
        case 'en':
            return 'International Congress on University Development - UTEQ';
        default:
            return 'Congresso Internacional de Desenvolvimento Universitário - UTEQ';
    }
};

const getLocalizedDescription = (locale) => {
    switch (locale) {
        case 'es':
            return 'Página web del Congreso Internacional de Desarrollo Universitario';
        case 'en':
            return 'International University Development Congress website';
        default:
            return 'Sítio Web do Congresso Internacional de Desenvolvimento Universitário';
    }
};

const getPageUrl = (locale) => `${apiUrl}/${locale}/cidu`;
const Cidu = (props) => LayoutSecond(props);

export default Cidu;

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
    const resSlider1 = await make_request_ws(`${WS_LIST_DATA_BY_TYPE}EDC`);
    const resSlider2 = await make_request_ws(`${WS_LIST_DATA_BY_TYPE}DOC`);
    const resSlider3 = await make_request_ws(`${WS_LIST_DATA_BY_TYPE}FEC`);
    const resSlider4 = await make_request_ws(WS_LIST_MEMBERS_COMMITTEES);
    const numberPartc = await make_request_ws(`${WS_LIST_USER_BY_ROL}P`);
    const numberExps = await make_request_ws(`${WS_LIST_USER_BY_ROL}E`);
    const listCountries = await make_request_ws(WS_LIST_COUNTRIES);
    //const listSymps = await make_request_ws(WS_LIST_SYMPOSIUMS_UNIVS);
    const listSymps = await make_request_ws(`${WS_LIST_SYMPOSIUMS_BY_CONGRESS}4`);
    //const infoCongress=await make_request_ws(WS_INFORMATION_CONGRESS);
    const infoCongress=await make_request_ws(`${WS_INFORMATION_CONGRESS_BY_CODE}4`);
    const resInfoPageWeb = await make_request_ws(`${WS_INFORMATION_PAGE_WEB}0f2a5c48-d5ea-48cb-87ce-950d45ebfb11`);
    const resListMemorias = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/12`);
    const linksSymposiums=await make_request_ws(`${WS_INFORMATION_LINKS_SYMPOSIUMS}4`);
	const listPosters=await make_request_ws(WS_LIST_POSTER_DETAILS);


    return{
        props: {
            data8: resInfoPageWeb.data,
            slider1: resSlider1.data,
            slider2: resSlider2.data,
            slider3: resSlider3.data,
            committees: resSlider4.data,
            numPartcs: numberPartc.data,
            nmbexps: numberExps.data,
            countries: listCountries.data,
            symps: listSymps.data,
            congress: infoCongress.data,
            datamem: resListMemorias.data,
            linkSymps: linksSymposiums.data,
        	posters: listPosters.data,
            option: 71,
            titlepage: getLocalizedTitle(locale),
            descpage: getLocalizedDescription(locale),
            urlpageweb: getPageUrl(locale),
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_cidu_uteq_es.jpg":(locale==="en"?"imagen_cidu_uteq_en.jpg":"imagen_cidu_uteq_pt.jpg")}`,
            bannerimg: resInfoPageWeb.data.pwImgBanner.trim(),
            language: locale,
        },
        
        revalidate: 60, 
    };

};
