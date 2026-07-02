import { useRouter } from 'next/router';

export { BoxMetric };


function BoxMetric(metricNumber, metricLabel, urlImage, index, typeCard, urlPage) {
    const router = useRouter();

    if (typeCard === 1 || typeCard === 3 || typeCard === 4) {
        if (urlPage !== "" && urlPage !== "#" && urlPage !== null) {
            return (
                <div className="col-8 col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-2 mx-auto" key={index}>
                    <a href={urlPage} target="_blank" className="link-metric-univ" data-toggle="tooltip" data-placement="bottom" title={router.locale === "es" ? "Ir a la página web" : (router.locale === "en" ? "Go to the website" : "Ir para o sítio web")}>
                        <div className={typeCard === 1 ? "card panel-metcs-ind-bx" : (typeCard === 3 ? "card panel-metcs-ind-mdm-bx" : "card panel-metcs-ind-end-bx")}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                        <img className="img-fluid img-metcs-bx" src={`/assets/img/${urlImage}`} alt="" />
                                    </div>
                                    <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                        <h4 className="number-metcs-bx">{metricNumber}</h4>
                                        <div className="sect-title-metcs">
                                            <h5 className="title-metcs-bx">{metricLabel}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            )
        } else {
            return (
                <div className="col-8 col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-2 mx-auto" key={index}>
                    <div className={typeCard === 1 ? "card panel-metcs-ind-bx" : (typeCard === 3 ? "card panel-metcs-ind-mdm-bx" : "card panel-metcs-ind-end-bx")}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                    <img className="img-fluid img-metcs-bx" src={`/assets/img/${urlImage}`} alt="" />
                                </div>
                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                    <h4 className="number-metcs-bx">{metricNumber}</h4>
                                    <div className="sect-title-metcs">
                                        <h5 className="title-metcs-bx">{metricLabel}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        if (urlPage !== "" && urlPage !== "#" && urlPage !== null) {
            return (
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2" key={index}>
                    <a href={urlPage} target="_blank" className="link-metric-univ" data-toggle="tooltip" data-placement="bottom" title={router.locale === "es" ? "Ir a la página web" : (router.locale === "en" ? "Go to the website" : "Ir para o sítio web")}>
                        <div className="card panel-metcs-bx">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                        <img className="img-fluid img-metcs-bx" src={`/assets/img/${urlImage}`} alt="" />
                                    </div>
                                    <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                        <h4 className="number-metcs-bx">{metricNumber}</h4>
                                        <div className="sect-title-metcs">
                                            <h5 className="title-metcs-bx">{metricLabel}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            )
        } else {
            return (
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2" key={index}>
                    <div className="card panel-metcs-bx">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                    <img className="img-fluid img-metcs-bx" src={`/assets/img/${urlImage}`} alt="" />
                                </div>
                                <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                    <h3 className="number-metcs-bx">{metricNumber}</h3>
                                    <div className="sect-title-metcs">
                                        <h4 className="title-metcs-bx">{metricLabel}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}