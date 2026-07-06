import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    WS_LIST_VIDEOS_WEEK,
    WS_LIST_NEWSPAPERS_MONTH,
    WS_INFORMATION_DEPARTAMENT,
    WS_LIST_DATA_GENERAL_NUM1,
    FRONT_PG_IMGS_FOLDER,
    apiUrl,
    WS_LIST_IMAGES_SLIDER,
    WS_LIST_ITEMS_MENU_LAT_BY_LANG
} from 'config';

const UsuariosPage = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default UsuariosPage;

// Función de la UTEQ para saltarse la restricción del certificado SSL local
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
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            listTemp = null;
        })
    } catch (error) {
        console.log(error.message);
        listTemp = null;
    }

    return (listTemp);
}

// Usamos getServerSideProps para que tu CRUD cargue dinámicamente
export const getServerSideProps = async ({ locale }) => {

    // Ejecutamos las llamadas exactas a los Web Services de la UTEQ
    const resVideoWeek = await make_request_ws(WS_LIST_VIDEOS_WEEK);
    const resNewspapersWeek = await make_request_ws(`${WS_LIST_NEWSPAPERS_MONTH}1`);
    const resDataGeneral = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CAMPUS`);
    const resSideMenu = await make_request_ws(`${WS_LIST_ITEMS_MENU_LAT_BY_LANG}20`);
    const resInfoUniversity = await make_request_ws(`${WS_INFORMATION_DEPARTAMENT}18419656-891a-11ec-83c4-244bfe557d55`);
    const resSlider = await make_request_ws(`${WS_LIST_IMAGES_SLIDER}SECUN/20`);

    return {
        props: {
            // Mapeo obligatorio usando Optional Chaining (?.) por si algún WS se cae
            data5: resVideoWeek?.data || [],
            data6: resNewspapersWeek?.data || [],
            dataNwsp: resNewspapersWeek?.data || [], // Evita el bug del SideMenu length
            slider1: resSlider?.data || [],
            campus: resDataGeneral?.data || [],
            sidemenu: resSideMenu?.data || [],
            data8: resInfoUniversity?.data || null,

            // Configuración propia de tu módulo
            option: 84, // Tu caso en el LayoutSecond
            titlepage: (locale === "es" ? 'Administración de Usuarios - UTEQ' : (locale === "en" ? 'User Management - UTEQ' : 'Administração de Usuários - UTEQ')),
            descpage: 'Módulo de desarrollo para la gestión interna de usuarios de la plataforma.',
            urlpageweb: `${apiUrl}/${locale}/administracion/usuarios`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}banner-default.jpg`,
            bannerimg: resInfoUniversity?.data?.dpImgBanner ? resInfoUniversity.data.dpImgBanner.trim() : 'banner-default.jpg',
            codpage: '18419656-891a-11ec-83c4-244bfe557d55',
            language: locale
        }
    };
};