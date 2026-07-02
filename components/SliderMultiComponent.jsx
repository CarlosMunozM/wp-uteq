import React, { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NEWS_SLIDER_FOLDER, IMG_VERTICAL_PRINCIPAL_CAREERS } from "config";
import { v4 as uuidv4 } from 'uuid';


export { SliderMultiComponent };


const responsiveCust = (optSld) => {
    return {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 2000 },
            items: (optSld == 1 ? 6 : 3)
        },
        desktop: {
            breakpoint: { max: 2000, min: 1024 },
            items: (optSld == 1 ? 4 : 2)
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: (optSld == 1 ? 4 : 2)
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
};

function changeFormatMonth(fecha) {
    switch (fecha) {
        case "01":
            return "ene";
        case "02":
            return "feb";
        case "03":
            return "mar";
        case "04":
            return "abr";
        case "05":
            return "may";
        case "06":
            return "jun";
        case "07":
            return "jul";
        case "08":
            return "ago";
        case "09":
            return "sep";
        case "10":
            return "oct";
        case "11":
            return "nov";
        case "12":
            return "dic";
    }
}

function ItemSliderNews(props) {
    return (
        <div className="item" key={props.key}>
            <a href={`/${props.language}/comunicacion/noticia/${props.urlnoticia.trim()}`} target="_blank" style={{ textDecoration: "none" }} data-toggle="tooltip" data-placement="bottom" title={props.titular.trim()}>
                <div className="work">
                    <div className="img-n1 d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${NEWS_SLIDER_FOLDER}${props.urlimg.trim()})` }}>
                        <div className="text w-100">
                            <h3 className="title-news-sld">{props.titular.trim()}</h3>
                            <h4 className="subtitle-news-sld">{props.fecha.substr(8, 2) + ' ' + changeFormatMonth(props.fecha.substr(5, 2)) + ', ' + props.fecha.substr(0, 4)}</h4>
                            <h4 className="subtitle-news-sld">{`Institucional, ${props.departamento.trim()}`}</h4>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

function ItemSliderCareer(props) {
    return (
        <div className="item" key={props.key}>
            <a href={`/${props.language}/grado/carrera/${props.urlpgw}`} target="_blank" style={{ textDecoration: "none" }} data-toggle="tooltip" data-placement="bottom" title={props.descriptionimg}>
                <div className="work">
                    <div className="img-n1 d-flex align-items-end justify-content-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(2, 90, 39, 0), rgba(2, 90, 39, 0.7)), url(${IMG_VERTICAL_PRINCIPAL_CAREERS}${props.urlimage.trim()/*"slider_prueba_v2.webp"*/})` }}>
                        <div className="text w-100">
                            <h3 className="title-news-sld">{props.namecrs}</h3>
                            <h4 className="subtitle-news-sld">{props.faculty}</h4>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

function SliderMultiComponent(datasld, option, language, sld_type) {

    const [autoPlay, setAutoPlay] = useState(true);
    const listItemSlider = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (sld_type === 1 ? (
                    <ItemSliderNews key={uuidv4()}
                        urlnoticia={item.ntUrlNoticia}
                        titular={language === "es" ? item.ntTitular : (language === "en" ? item.ntTitularEn : item.ntTitularPt)}
                        urlimg={item.ntUrlSlider}
                        fecha={item.ntFecha}
                        departamento={language === "es" ? item.objDepartamento.dpNombre : (language === "en" ? item.objDepartamento.dpNombreEn : item.objDepartamento.dpNombrePt)}
                        language={language}
                        option={option}
                        sld_type={sld_type} />
                ) : (<>
                    <ItemSliderCareer key={uuidv4()}
                        urlpgw={item.crUrlParcial}
                        descriptionimg={language === "es" ? ("Ir al sitio web de la carrera de grado: " + item.crNombre) : (language === "en" ? ("Go to the website of the degree course: " + item.crNombreEn) : ("Aceder ao sítio Web do curso: " + item.crNombrePt))}
                        namecrs={language === "es" ? item.crNombre : (language === "en" ? item.crNombreEn : item.crNombrePt)}
                        faculty={language === "es" ? item.crDepartamento.dpNombre : (language === "en" ? item.crDepartamento.dpNombreEn : item.crDepartamento.dpNombrePt)}
                        urlimage={item.crUrlSldPrinc}
                        language={language}
                        option={option}
                        sld_type={sld_type} />
                </>));
            })
        )
    }

    const handleMouseEnter = () => {
        setAutoPlay(false);
    };

    const handleMouseLeave = () => {
        setAutoPlay(true);
    };

    return (<Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        arrows={true}
        responsive={responsiveCust(option)}
        ssr={true}
        infinite={true}
        key={option}
        autoPlay={autoPlay}
        autoPlaySpeed={1900}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={900}
        containerClass="carousel-container bg-dark"
        dotListClass="custom-dot-list-style"
        itemClass="item"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {listItemSlider(datasld)}
    </Carousel>);
}