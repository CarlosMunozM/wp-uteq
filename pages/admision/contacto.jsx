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
            option: 82,
            titlepage: (locale === "es" ? "Contacto - Admisión" : (locale === "en" ? "Contact - Admission" : "Contato - Admissão")),
            descpage: `${locale === "es" ? "Sitio web acerca de contacto con la Unidad de Admisión y Nivelación" : (locale === "en" ? "Website about Contact with the Admission and Leveling Unit" : "Site sobre Contato com a Unidade de Admissão e Nivelamento")}`,
            urlpageweb: `${apiUrl}/${locale}/admision/contacto`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_admision_contacto_uteq_es.jpg":(locale==="en"?"imagen_admision_contacto_uteq_en.jpg":"imagen_admision_contacto_uteq_pt.jpg")}`,
            language: locale,
        }
    };

};