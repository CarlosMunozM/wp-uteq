import { v4 as uuidv4 } from 'uuid';
import { UBU_SERVICIOS_IMGS_FOLDER, UBU_DOCS_FOLDER } from 'config';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export { BodyReglamentos };

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

function ItemRegulation(props) {
    return (<div className="col-md-4"><div className="item item-sld-mult">
        <div className="work">
            <a href={props.option === 'IMG' ? `${UBU_DOCS_FOLDER}${props.url.trim()}` : (props.option === 'VID' ? props.url.trim() : '#')} target="_blank" aria-label="link corpidt" style={{ textDecoration: "none" }}>
                <div className="img-n10 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${UBU_SERVICIOS_IMGS_FOLDER}${props.urlimgvid.trim()})` }}></div>
                <div className="text-pn text-center">{props.nombre.trim()}</div>
            </a>
        </div>
    </div></div>)
}

function ItemSliderRegulations(props) {
    return (<><div className="row gx-2 gy-2">{props.datasld.map((item) => {
        return (<ItemRegulation key={uuidv4()} url={item.sldEnlace} option={item.sldTipo} nombre={props.language === "es" ? item.sldTitulo : (props.language === "en" ? item.sldTituloEn : item.sldTituloPt)} urlimgvid={item.sldUrlImgVid} />)
    })}</div></>)
}

const listRegulations = (dataItems, divider, quotient, numelements, language) => {
    var valbegin = 0, valend = 0, datagal = [], elmts = [...Array(divider).keys()];

    if (quotient === 0) {
        return (elmts.map((counter) => {
            datagal = [];
            valbegin = counter * numelements;
            valend = valbegin + numelements;
            datagal = dataItems.slice(valbegin, valend);

            if (datagal.length > 0) {
                return (<ItemSliderRegulations key={uuidv4()} datasld={datagal} language={language} />)
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
                return (<ItemSliderRegulations key={uuidv4()} datasld={datagal} language={language} />)
            }
        }))
    }
}

const listItemsRegulationsDocs = (dataItems, language) => {
    const numelements = 6;
    var divider = 0, quotient = 0;

    divider = Math.ceil(dataItems.length / numelements);
    quotient = dataItems.length % numelements;

    if (divider <= 1) {
        return (<div className="row gx-2 gy-2"><ItemSliderRegulations key={uuidv4()} datasld={dataItems} language={language} /></div>)
    } else {
        return (listRegulations(dataItems, divider, quotient, numelements, language))
    }
}

const panelRegulationsDocs = (dataItems, numelements, language) => {
    if (dataItems.length <= numelements) {
        return (<div className="row gx-2 gy-2"><ItemSliderRegulations key={uuidv4()} datasld={dataItems} language={language} /></div>);
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
            {listItemsRegulationsDocs(dataItems, language)}
        </Carousel>);
    }
}

function BodyReglamentos(data) {

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{data.language === "es" ? "Reglamentos" : (data.language === "en" ? "Regulations" : "Regulamentos")}</h2>
            <div className="col-md-12 w-100">
                {(data.slider1 !== "" && data.slider1 !== null) ? panelRegulationsDocs(data.slider1, 6, data.language) : ""}
            </div>
        </div>
    </>);

}