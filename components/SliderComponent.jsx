import { SLIDERS_PRINCIPAL_FOLDER } from "config";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';
import { v4 as uuidv4 } from 'uuid';


export { SliderComponent };

function ItemSlider(props) {
    const regEx = /^http/;

    switch (props.tipo) {
        case "IMG":
            return (<>
                {(props.url.trim() != '#' && props.url.trim() != '' && props.url != null) ? (
                    <a href={!regEx.test(props.url) ? `/${props.language}${props.url.trim()}` : props.url.trim()} target="_blank" data-toggle="tooltip" data-placement="bottom" title={props.titulo.trim()}>
                        <div>
                            <img src={SLIDERS_PRINCIPAL_FOLDER + props.urlimgvid.trim()} alt={props.titulo.trim() || ""} />
                        </div>
                    </a>
                ) : (
                    <div>
                        <img src={SLIDERS_PRINCIPAL_FOLDER + props.urlimgvid.trim()} alt={props.titulo.trim() || ""} />
                    </div>
                )}</>);
        case "VID":
            return (<>
                <div className="pnl-sld-vid">
                    <ReactPlayer width="100%" height="100%" controls={false}
                        config={{
                            youtube: {
                                playerVars: { showinfo: 0, autoplay: 1, fs: 0, modestbranding: 1, rel: 0 }
                            }
                        }} url={props.url.trim()} />
                </div>
            </>);
        case "PUB":
            return (<>
                <div>
                    <img src={SLIDERS_PRINCIPAL_FOLDER + props.urlimgvid.trim()} alt={props.titulo.trim() || ""} />
                </div>
            </>);
    }
}

function SliderComponent(props) {

    const listItemSlider = (dataItems, language) => {
        return (
            dataItems.map((item) => {
                return (<ItemSlider key={uuidv4()} tipo={item.sldTipo} url={item.sldEnlace}
                    titulo={language === "es" ? item.sldTitulo : (language === "en" ? item.sldTituloEn : item.sldTituloPt)}
                    urlimgvid={language === "es" ? item.sldUrlImgVid : (language === "en" ? item.sldUrlImgVidEn : item.sldUrlImgVidPt)}
                    language={language} />);
            })
        )
    }

    return (<Carousel
        showThumbs={false}
        autoPlay={true}
        swipeable={true}
        interval={3000}
        infiniteLoop={true}
        showStatus={false}
        axis={"horizontal"}
        autoFocus={true}
        useKeyboardArrows={true}>
        {listItemSlider(props.slider, props.language)}
    </Carousel>);
}