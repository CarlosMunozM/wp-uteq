import { useRouter } from 'next/router';

export default function Custom404() {
    const router = useRouter();

    return (<div className="row g-0">
        <div className="col-md-12" style={{ padding: "10px" }}>
            <center><img className="img-lg-uteq mx-auto" alt="Imagen de logotipo" src="/assets/img/img-esc-uteq.png" style={{ width: "250px", height: "320px" }} /></center>
        </div>
        <div className="col-md-12 mt-3" style={{ padding: "10px" }}>
            <h1 className="text-error text-center" style={{ fontSize: "70px", color: "#025a27", fontWeight: "bold", fontFamily: "open-sans-light", marginTop: "15px" }}>{router.locale ==="pt"?"Erro 404":"Error 404"}</h1><br />
            <h1 className="text-error text-center" style={{ fontSize: "40px", color: "#2D2D2D", fontFamily: "open-sans-light" }}>{router.locale === "es" ? "La página web que usted busca no existe." : (router.locale === "en" ? "The website you are looking for does not exist." : "O website que procura não existe")}</h1>
        </div>
        <div className="col-md-12 mt-3" style={{ padding: "10px" }}>
            <center><a href="/" style={{ backgroundColor: "#025a27", color: "#FFF", fontWeight: "bold", fontFamily: "open-sans-light", fontSize: "20px", padding: "10px", textDecoration: "none", borderRadius: "5px" }}
                data-toggle="tooltip" data-placement="bottom" title={router.locale === "es" ? "Ir a la página de Inicio" : (router.locale === "en" ? "Go to the home page" : "Ir para a página inicial")}>{router.locale === "es" ? "Ir a la página principal" : (router.locale === "en" ? "Go to main page" : "Ir para a página principal")}</a></center>
        </div>
    </div>)
}