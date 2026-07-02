import { SliderImg } from "components";

export { BodyMemorias };

function BodyMemorias(data) {

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{data.language==="es"?data.data8.pwNombre.trim():(data.language==="en"?data.data8.pwNombreEn.trim():data.data8.pwNombrePt.trim())}</h2>
            <div className="col-md-12 w-100 mt-3">
                {(data.datamem !== null && data.datamem !== "") && SliderImg(data.datamem, 50, 2000, 1000)}
            </div>
        </div>
    </>);
}