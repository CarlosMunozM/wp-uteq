import { Accordion } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { LOGOS_FOLDER, IMG_PORTRAIT_WEB_PAGE_CAREERS } from 'config';

export { BodyFacultades };


function ItemNameCareer(props) {
    return (<a href={`/${props.language}/grado/carrera/${props.urlparcial.trim()}`} className="link-fcts" data-toggle="tooltip" data-placement="bottom" title={props.language === "es" ? "Ir a la página web de la carrera" : (props.language === "en" ? "Go to the website of the university degree programme" : "Ir para o website do curso de licenciatura universitária")}>
        <div className="item-fctds">
            &nbsp;&nbsp;&nbsp;<i className="fa fa-chevron-right icon-item-car"></i>&nbsp;{props.carrera.trim()}
        </div>
    </a>)
}

const listItemsCareers = (dataItems, language) => {
    return (<>{
        dataItems.sort((a, b) => (language === "es" ? (a.crNombre.trim() > b.crNombre.trim()) : (language === "en" ? (a.crNombreEn.trim() > b.crNombreEn.trim()) : (a.crNombrePt.trim() > b.crNombrePt.trim()))) ? 1 : -1).map(
            (career) => {
                return <ItemNameCareer key={uuidv4()} urlparcial={career.crUrlParcial} carrera={language === "es" ? career.crNombre : (language === "en" ? career.crNombreEn : career.crNombrePt)} language={language} />
            })
    }</>)
}

function ItemCareer(props) {
    return (<div className="col-6 col-md-4 mb-2">
        <div className="pnl-career-box-group">
            <a href={`/${props.language}/grado/carrera/${props.urlparcial}`} data-toggle="tooltip" data-placement="bottom" title={props.titletaga}>
                <img src={IMG_PORTRAIT_WEB_PAGE_CAREERS + props.urlimage} className="card-img-top" alt={props.description} />
                <div className="box-title-career">
                    {props.namecareer}
                </div>
            </a>
        </div>
    </div>)
}

/*
function ItemFaculty(props) {
    return (<div className="col-md-6 mb-2">
        <div className="pnl-faculty-box">
            <a href={`/${props.language}/grado/facultad/${props.careers[0].crDepartamento.dpParcialUrl.trim()}`}>
                <img src={LOGOS_FOLDER + props.careers[0].crDepartamento.dpImgLogo.trim()} className="card-img-top" alt={`${props.language === "es" ? "Logo de la" : (props.language === "en" ? "Logo of the" : "Logotipo do")} ${props.language === "es" ? props.careers[0].crDepartamento.dpNombre.trim() : (props.language === "en" ? props.careers[0].crDepartamento.dpNombreEn.trim() : props.careers[0].crDepartamento.dpNombrePt.trim())}`} />
            </a>
            <Accordion>
                <Accordion.Item eventKey={props.index}>
                    <Accordion.Header>{props.language === "es" ? props.careers[0].crDepartamento.dpNombre.trim() : (props.language === "en" ? props.careers[0].crDepartamento.dpNombreEn.trim() : props.careers[0].crDepartamento.dpNombrePt.trim())}</Accordion.Header>
                    <Accordion.Body>
                        <div className="row justify-content-center">
                            {(props.careers !== null && props.careers !== "") && listItemsCareers(props.careers, props.language)}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    </div>)
}
*/

function BodyFacultades(data) {

    /*const listItemsFaculties = (dataItems, dataFct) => {
        return (<>{
            dataItems.sort((a, b) => (a.dpNombre > b.dpNombre) ? 1 : -1).map(
                (faculty, index) => {
                    var listCrs = dataFct.filter(item => item.crDepartamento.dpCodigo === faculty);
                    return (listCrs.length > 0 && <ItemFaculty key={uuidv4()} careers={listCrs} index={index} language={data.language} />)
                })
        }</>)
    }*/

    const listItemsImgCareers = (dataCareers) => {
        return (<>{
            dataCareers.map(
                (item, index) => {
                    return (<ItemCareer key={index} language={data.language} urlparcial={item.crUrlParcial.trim()}
                        description={`${data.language === "es" ? ("Imagen de la carrera: " + item.crNombre.trim()) : (data.language === "en" ? ("Image of the career: " + item.crNombreEn.trim()) : ("Imagem da carreira universitária: " + item.crNombrePt.trim()))}`}
                        titletaga={`${data.language === "es" ? ("Ir al sitio web de la carrera de grado: " + item.crNombre.trim()) : (data.language === "en" ? ("Go to the website of the degree course: " + item.crNombreEn.trim()) : ("Aceder ao sítio Web do curso: " + item.crNombrePt.trim()))}`}
                        namecareer={data.language === "es" ? item.crNombre.trim() : (data.language === "en" ? item.crNombreEn.trim() : item.crNombrePt.trim())}
                        urlimage={item.crUrlPageCareers.trim()} />);
                }
            )
        }</>)
    }

    /*function renderSectionDataFaculty(dataFaculty) {
        var listFaculty = dataFaculty.map(a => a.crDepartamento.dpCodigo.trim());
        listFaculty = [...new Set(listFaculty)];

        return (<>{
            listFaculty.length > 0 && (<>
                {renderCareerFinder(dataFaculty)}
                {listItemsFaculties(listFaculty, dataFaculty)}
            </>)
        }</>);
    }*/

    function renderSectionDataCareer(dataCareer) {
        var listFaculty = dataCareer.map(a => a.crDepartamento.dpCodigo.trim());
        listFaculty = [...new Set(listFaculty)];

        return (<>{
            dataCareer.length > 0 && (<>
                {renderCareerFinder(dataCareer)}
                {/*listItemsFaculties(listFaculty, dataFaculty)*/}
                {listItemsImgCareers(dataCareer)}
            </>)
        }</>);
    }

    const goWebPageCareer = (url) => {
        var newWindow = null;

        if (url !== null && url !== "") {
            newWindow = window.open(("/" + data.language + '/grado/carrera/' + url.trim()), '_self');
            if (newWindow) newWindow.opener = null;
        }
    }

    function renderCareerFinder(dataCareers) {
        return (<>
            <div className="col-md-8 mb-2"></div>
            <div className="col-md-4 mb-2">
                <select name="sgCareer" className="form-select form-select-lg" id="slct-career-flt" onChange={e => goWebPageCareer(e.target.value)}>
                    <option key="-1" value="">{data.language === "es" ? "Explora la oferta académica" : (data.language === "en" ? "Explore the academic offer" : "Explore a oferta académica")}</option>
                    {dataCareers.map(
                        (item, index) => {
                            return (<option key={index} value={item.crUrlParcial.trim()}>{data.language === "es" ? item.crNombre.trim() : (data.language === "en" ? item.crNombreEn.trim() : item.crNombrePt.trim())}</option>);
                        }
                    )}
                </select>
            </div>
        </>)
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Carreras Universitarias" : (data.language === "en" ? "University Degrees" : "Graus universitários")}</h2>
            <div className="col-md-12 w-100 mt-2">
                <div className="row gx-2">
                    {(data.careers !== null && data.careers !== "") && renderSectionDataCareer(data.careers)}
                </div>
            </div>
        </div>
    </>);

}
