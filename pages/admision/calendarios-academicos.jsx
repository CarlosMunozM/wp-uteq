import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    apiUrl, FRONT_PG_IMGS_FOLDER, WS_LIST_ACTIVITIES_BY_CALENDAR
} from 'config';


const CalendarioAcademicoNiv = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default CalendarioAcademicoNiv;


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


export const getStaticProps = async ({ locale }) => {
    const resListActvCald = await make_request_ws(`${WS_LIST_ACTIVITIES_BY_CALENDAR}ADMIS`);

    return {
        props: {
            /*data5: resVideoWeek.data,
            data6: resNewspapersWeek.data,*/
            option: 80,
            /*campus: resDataGeneral.data,
            sidemenu: resSideMenu.data,
            slider1: resSlider.data,
            data8: resInfoDepartm.data,
            authort: resInfoAuthority.data,*/
            calendars: resListActvCald.data,
            /*question: resDataQuestions.data,
            dataform5: resDataCars.data,*/

            /*metrics: resMetrics.data,*/
            
            titlepage: (locale === "es" ? "Calendarios académicos - Nivelación" : (locale === "en" ? "Academic calendars - University leveling" : "Calendários acadêmicos - Nivelamento universitário")),
            descpage: `${locale === "es" ? "Sitio web de los calendarios académicos - Nivelación" : (locale === "en" ? "Academic calendars website - Leveling up" : "Site de calendários acadêmicos - Subindo de nível")}`,
            urlpageweb: `${apiUrl}/${locale}/admision/calendarios-academicos`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_admision_calendarios_uteq_es.jpg":(locale==="en"?"imagen_admision_calendarios_uteq_en.jpg":"imagen_admision_calendarios_uteq_pt.jpg")}`,
            /*bannerimg: resInfoDepartm.data.dpImgBanner.trim(),*/
            /*codpage: 'fa1a2bdc-9fb9-11ec-bfdc-244bfe557d55',*/
            language: locale,
        }
    };

};
