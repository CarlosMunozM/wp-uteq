import axios from 'axios';
import { LayoutFirst } from 'components/layouts';
import {
    WS_LIST_IMAGES_SLIDER, WS_LIST_METRICS_SGA, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_DATA_EVENTS, WS_LIST_DATA_NEWS_BY_DEPT,
    WS_LIST_DATA_NEWS_NOT_INCLUDE_ALL, FRONT_PG_IMGS_FOLDER, WS_LIST_IS_CAREERS_GRADE_BY_FACULTY, apiUrl
} from 'config';


const Index = (props) => {
    return (
        LayoutFirst(props)
    );
};

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

export default Index;

export const getStaticProps = async ({ locale }) => {
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}PRINC/1`);
    const resMetrics = await make_external_request_ws(WS_LIST_METRICS_SGA);
    const resMagazines = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}REVISTA`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resEvents = await make_request_ws(`${WS_LIST_DATA_EVENTS}6`);
    const resNewsReser = await make_request_ws(`${WS_LIST_DATA_NEWS_BY_DEPT}1cf13586-85d1-11ec-befe-244bfe557d55`);
    const resNewsLinkg = await make_request_ws(`${WS_LIST_DATA_NEWS_BY_DEPT}1cf1aa66-85d1-11ec-beff-244bfe557d55`);
    const resNewsNIncldAll = await make_request_ws(`${WS_LIST_DATA_NEWS_NOT_INCLUDE_ALL}`);
    const resSldEdCnt = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/21`);
    const resDataCareers = await make_request_ws(WS_LIST_IS_CAREERS_GRADE_BY_FACULTY);

    return {
        props: {
            slider: resSlider.data,
            metrics: resMetrics.data,
            magazines: resMagazines.data,
            events: resEvents.data,
            newsres: resNewsReser.data,
            newslkg: resNewsLinkg.data,
            newsAll: resNewsNIncldAll.data,
            campus: resDataGeneral.data,
            courses: resSldEdCnt.data,
            careers: resDataCareers.data,
            titlepage: (locale==="es"?"UTEQ - Universidad Técnica Estatal de Quevedo":(locale==="en"?"UTEQ - Quevedo State Technical University":"UTEQ - Universidade Técnica Estadual de Quevedo")),
            descpage: (locale==="es"?"Explora el sitio web oficial de la Universidad Técnica Estatal de Quevedo: Tu fuente confiable de información educativa, programas académicos, noticias y recursos. Descubre todo lo que nuestra institución líder tiene para ofrecer.":(locale==="en"?"Explore the official website of Quevedo State Technical University: Your trusted source for educational information, academic programmes, news and resources. Discover all that our leading institution has to offer.":"Explore o sítio Web oficial da Universidade Técnica Estatal de Quevedo: a sua fonte de confiança para informações educativas, programas académicos, notícias e recursos. Descubra tudo o que a nossa instituição líder tem para oferecer.")),
            urlpageweb: `${apiUrl}/${locale}`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}imagen_uteq_es.jpg`,
            bannerimg: '',
            codpage: '0b31955d-0b08-49a7-b031-f7c7407d913b',
            language: locale,
        },
    	revalidate: 60,
    };
};