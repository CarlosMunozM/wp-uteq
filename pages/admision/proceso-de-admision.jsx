import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    apiUrl, FRONT_PG_IMGS_FOLDER
} from 'config';

const ProcesoAdmision = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default ProcesoAdmision;

export const getStaticProps = async ({ locale }) => {

    return {
        props: {
            option: 81,
            titlepage: (locale === "es" ? "Proceso de admisión" : (locale === "en" ? "Admission process" : "Processo de admissão")),
            descpage: `${locale === "es" ? "Sitio web del proceso de admisión" : (locale === "en" ? "Admission Process Website" : "Site do Processo de Admissão")}`,
            urlpageweb: `${apiUrl}/${locale}/admision/proceso-de-admision`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_admision_proceso_uteq_es.jpg":(locale==="en"?"imagen_admision_proceso_uteq_en.jpg":"imagen_admision_proceso_uteq_pt.jpg")}`,
            language: locale,
        }
    };

};