import { INV_DOCS_FOLDER, IMG_SLD_INVESTG_FOLDER } from 'config';
import { v4 as uuidv4 } from 'uuid';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export { BodyRedes };

const responsiveCust = () => {
    return {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 2000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 2000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
};

function ItemNetworkResearch(props) {

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="col-md-4">
            <div className="card h-100 pnl-netwk">
                <img src={`${IMG_SLD_INVESTG_FOLDER}${props.urlimgvid.trim()}`} className="card-img-top" alt="" />
                <div className="card-body">
                    <h3 className="card-title">{props.nombre.trim()}</h3>
                    <p className="card-text">{props.descripcion.trim()}</p>
                </div>
                <div className="card-footer">
                    <div className="btn-group w-100 text-center" role="group" aria-label="Buttons Actions">
                        <button type="button" className="btn button-web" onClick={() => openInNewTab(props.urlweb.trim())}
                            aria-label="link web red" data-toggle="tooltip" data-placement="bottom"
                            title={props.language === "es" ? "Ir a la página web de la Red de Investigación" : (props.language === "en" ? "Go to the Research Network website" : "Ir para o sítio Web da Rede de Investigação")}>
                            <i className="fa fa-globe" aria-hidden="true"></i>&nbsp;Web
                        </button>
                        <button type="button" className="btn button-doc" onClick={() => openInNewTab(`${INV_DOCS_FOLDER}${props.url.trim()}`)}
                            aria-label="link doc red" data-toggle="tooltip" data-placement="bottom"
                            title={props.language === "es" ? "Descarga documento de evidencia" : (props.language === "en" ? "Download evidence document" : "Descarregar documento comprovativo")}>
                            <i className="fa fa-download" aria-hidden="true"></i>&nbsp;{props.language === "en" ? "Document" : "Documento"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ItemSliderNetworkResearch(props) {
    return (<><div className="row gx-2 gy-2">{props.datasld.map((item) => {
        return (<ItemNetworkResearch key={uuidv4()} url={item.sldEnlace} nombre={props.language === "es" ? item.sldTitulo : (props.language === "en" ? item.sldTituloEn : item.sldTituloPt)} urlimgvid={item.sldUrlImgVid}
            descripcion={props.language === "es" ? ((item.sldDescripcion !== "" && item.sldDescripcion !== null) ? item.sldDescripcion : "") :
                (props.language === "en" ? ((item.sldDescripcionEn !== "" && item.sldDescripcionEn !== null) ? item.sldDescripcionEn : "") :
                    ((item.sldDescripcionPt !== "" && item.sldDescripcionPt !== null) ? item.sldDescripcionPt : ""))} urlweb={item.sldIdDepartamento} language={props.language} />)
    })
    }</div></>)
}

const listItemsNetworksResearch = (dataItems, divider, quotient, numelements, language) => {
    var valbegin = 0, valend = 0, datagal = [], elmts = [...Array(divider).keys()];

    if (quotient === 0) {
        return (elmts.map((counter) => {
            datagal = [];
            valbegin = counter * numelements;
            valend = valbegin + numelements;
            datagal = dataItems.slice(valbegin, valend);

            if (datagal.length > 0) {
                return (<ItemSliderNetworkResearch key={uuidv4()} datasld={datagal} language={language} />)
            }
        }))
    } else {
        return (elmts.map((counter) => {
            datagal = [];
            numelements = counter === (divider - 1) ? quotient : numelements;
            valbegin = counter > 0 ? valend : 0;
            valend = valbegin + numelements;
            datagal = dataItems.slice(valbegin, valend);

            if (datagal.length > 0) {
                return (<ItemSliderNetworkResearch key={uuidv4()} datasld={datagal} language={language} />)
            }
        }))
    }
}

const listItemsSliderImages = (dataItems, language) => {
    const numelements = 6;
    var divider = 0, quotient = 0;

    divider = Math.ceil(dataItems.length / numelements);
    quotient = dataItems.length % numelements;

    if (divider <= 1) {
        return (<div className="row gx-2 gy-2"><ItemSliderNetworkResearch key={uuidv4()} datasld={dataItems} language={language} /></div>)
    } else {
        return (listItemsNetworksResearch(dataItems, divider, quotient, numelements, language))
    }
}

const panelNetworksResearch = (dataItems, numelements, language) => {
    if (dataItems.length <= numelements) {
        return (<div className="row gx-2 gy-2"><ItemSliderNetworkResearch key={uuidv4()} datasld={dataItems} language={language} /></div>);
    } else {
        return (<Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            arrows={true}
            responsive={responsiveCust()}
            ssr={true}
            infinite={true}
            autoPlay={true}
            removeArrowOnDeviceType={["desktop", "tablet"]}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="transform 750ms ease-in-out 0s"
            transitionDuration={900}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="item">
            {listItemsSliderImages(dataItems, language)}
        </Carousel>);
    }
}

function BodyRedes(data) {

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())}</h2>
            <div className="col-md-12 w-100">
                <div className="ratio ratio-21x9">
                    <a href={`${INV_DOCS_FOLDER}docx-uteq-listado-redes-investg.pdf`} target="_blank" aria-label="link redes investigacion" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar Listado de Redes de Investigación que forma parte la UTEQ" : (data.language === "en" ? "Download List of Research Networks of which UTEQ is a member" : "Descarregar Lista de Redes de Investigação das quais a UTEQ é membro")}>
                        <img src={`/assets/img/${data.language === "es" ? "redes-de-las-que-forma-parte-la-institucion-uteq-es.jpg" : (data.language === "en" ? "redes-de-las-que-forma-parte-la-institucion-uteq-en.jpg" : "redes-de-las-que-forma-parte-la-institucion-uteq-pt.jpg")}`} className="img-fluid" alt={data.language === "es" ? "Descargar Listado de Redes de Investigación" : (data.language === "en" ? "Download List of Research Networks" : "Descarregar Lista de Redes de Investigação")} />
                    </a>
                </div>
            </div>
            <h2 className="title-cont-page text-rigth mt-3">{data.language === "es" ? "Evidencias" : (data.language === "en" ? "Evidences" : "Evidência")}</h2>
            <div className="col-md-12 mt-1">
                {(data.dataredes !== "" && data.dataredes !== null) && panelNetworksResearch(data.dataredes, 6, data.language)}
            </div>
        </div>
    </>);

}

