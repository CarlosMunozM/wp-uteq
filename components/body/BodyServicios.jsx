import { SliderImg } from "components";
import { v4 as uuidv4 } from 'uuid';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { UBU_SERVICIOS_IMGS_FOLDER } from 'config';


export { BodyServicios };

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

function ItemListServiceUBU(props) {
    return (
        <div className="col-md-4">
            <div className="item item-sld-mult">
                <div className="work">
                    <a href={props.url.trim()} target="_blank" aria-label="link ubu" data-toggle="tooltip" data-placement="bottom" title={`Ir a la página web de ${props.nombre.trim()}`} style={{ textDecoration: 'none' }}>
                        <div className="img-n10 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${UBU_SERVICIOS_IMGS_FOLDER}${props.urlimgvid.trim()})` }}></div>
                        <div className="text-pn text-center">{props.nombre.trim()}</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

function ItemSliderServicesUBU(props) {
    return (<><div className="row gx-2 gy-2">{props.datasld.map((item) => {
        return (<ItemListServiceUBU key={uuidv4()} url={"/"+props.language+item.sldEnlace} nombre={props.language === "es" ? item.sldTitulo : (props.language === "en" ? item.sldTituloEn : item.sldTituloPt)} urlimgvid={item.sldUrlImgVid} />)
    })
    }</div></>)
}

const listItemsServicesUBU = (dataItems, divider, quotient, numelements, language) => {
    var valbegin = 0, valend = 0, datagal = [], elmts = [...Array(divider).keys()];

    if (quotient === 0) {
        return (elmts.map((counter) => {
            datagal = [];
            valbegin = counter * numelements;
            valend = valbegin + numelements;
            datagal = dataItems.slice(valbegin, valend);

            if (datagal.length > 0) {
                return (<ItemSliderServicesUBU key={uuidv4()} datasld={datagal} language={language} />)
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
                return (<ItemSliderServicesUBU key={uuidv4()} datasld={datagal} language={language} />)
            }
        }))
    }
}

const listItemsSliderPages = (dataItems, language) => {
    const numelements = 6;
    var divider = 0, quotient = 0;

    divider = Math.ceil(dataItems.length / numelements);
    quotient = dataItems.length % numelements;

    if (divider <= 1) {
        return (<div className="row gx-2 gy-2"><ItemSliderServicesUBU key={uuidv4()} datasld={dataItems} language={language} /></div>)
    } else {
        return (listItemsServicesUBU(dataItems, divider, quotient, numelements, language))
    }
}

const panelServicesPages = (dataItems, numelements, language) => {
    if (dataItems.length <= numelements) {
        return (<div className="row gx-2 gy-2"><ItemSliderServicesUBU key={uuidv4()} datasld={dataItems} language={language} /></div>);
    } else {
        return (<Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            arrows={false}
            responsive={responsiveCust()}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            customTransition="transform 750ms ease-in-out 0s"
            transitionDuration={900}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="item">
            {listItemsSliderPages(dataItems, language)}
        </Carousel>);
    }
}

function ItemRowSlider(props) {
    return (
        <div className="col-md-12 w-100 mb-3">
            {SliderImg(props.serviciosubu.slice(props.begin, props.end), 28, 2000, 1000)}
        </div>
    )
}

function BodyServicios(data) {

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{data.language === "es" ? "Servicios universitarios" : (data.language === "en" ? "University services" : "Serviços universitários")}</h2>
            <div className="col-md-12 w-100">
                {(data.slider1 !== "" && data.slider1 !== null) ? panelServicesPages(data.slider1, 6, data.language) : ""}
            </div>
        	<div className="col-md-12 w-100 mt-3 mb-3">
                <a href="https://www.uteq.edu.ec/assets/docs/ubu/informe-de-satisfaccion-de-los-servicios-ubu-uteq-2023.pdf" target="_blank" className="link-text-local" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar Informe de satisfacción de los servicios prestados" : (data.language === "en" ? "Download satisfaction report of the services provided" : "Faça o download do relatório de satisfação dos serviços prestados")}>
                    <div className="card-header pnl-link-effect">
                        <i className="fa fa-arrow-circle-down" aria-hidden="true"></i> {data.language === "es" ? "Informe de satisfacción de los servicios prestados" : (data.language === "en" ? "Satisfaction report of the services provided" : "Relatório de satisfação dos serviços prestados")}
                    </div>
                </a>
            </div>
        </div>
    </>);

}