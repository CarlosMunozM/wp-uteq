function Error({ statusCode }) {
    return (
        <div className="row g-0">
            <div className="col-md-12" style={{ padding: "10px" }}>
                <center><img className="img-lg-uteq mx-auto" alt="Imagen de logotipo" src="/assets/img/img-esc-uteq.png" style={{ width: "250px", height: "320px" }} /></center>
            </div>
            <div className="col-md-12 mt-3" style={{ padding: "10px" }}>
                <h1 className="text-error text-center" style={{ fontSize: "70px", color: "#025a27", fontWeight: "bold", fontFamily: "open-sans-light", marginTop: "15px" }}>Error</h1><br />
                <h1 className="text-error text-center" style={{ fontSize: "40px", color: "#2D2D2D", fontFamily: "open-sans-light" }}>
                    {statusCode
                        ? `Error ${statusCode} en el servidor`
                        : 'Ha ocurrido un error en el cliente'}
                </h1>
            </div>
            <div className="col-md-12 mt-3" style={{ padding: "10px" }}>
                <center><a href="/" style={{ backgroundColor: "#025a27", color: "#FFF", fontWeight: "bold", fontFamily: "open-sans-light", fontSize: "20px", padding: "10px", textDecoration: "none", borderRadius: "5px" }}
                    data-toggle="tooltip" data-placement="bottom" title="Ir a la página de Inicio">Ir a la página principal</a></center>
            </div>
        </div>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error;