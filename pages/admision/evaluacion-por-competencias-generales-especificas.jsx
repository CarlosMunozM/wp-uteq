import { LayoutSecond } from 'components/layouts';
import axios from 'axios';
import {
    apiUrl, FRONT_PG_IMGS_FOLDER
} from 'config';

const PruebaDeIngreso = (props) => {
    return (
        LayoutSecond(props)
    );
};

export default PruebaDeIngreso;

export const getStaticProps = async ({ locale }) => {

    return {
        props: {
            option: 83,
            titlepage: (locale === "es" ? "Evaluación por competencias generales y específicas - Admisión" : (locale === "en" ? "Evaluation of General and Specific Competencies - Admission" : "Avaliação por Competências Gerais e Específicas - Admissão")),
            descpage: `${locale === "es" ? "Sitio web de información sobre la evaluación por competencias generales y específicas a la UTEQ" : (locale === "en" ? "Website with information on the evaluation of general and specific competencies at UTEQ" : "Site com informações sobre a avaliação por competências gerais e específicas na UTEQ")}`,
            urlpageweb: `${apiUrl}/${locale}/admision/evaluacion-por-competencias-generales-especificas`,
            urlimage: `${FRONT_PG_IMGS_FOLDER}${locale==="es"?"imagen_admision_prueba_ingreso_uteq_es.jpg":(locale==="en"?"imagen_admision_prueba_ingreso_uteq_en.jpg":"imagen_admision_prueba_ingreso_uteq_pt.jpg")}`,
            language: locale,
        }
    };

};