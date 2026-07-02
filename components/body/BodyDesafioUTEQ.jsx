import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FormDesafioUTEQ } from "components/forms/FormDesafioUTEQ";



export { BodyDesafioUTEQ };


function BodyDesafioUTEQ(data) {

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{data.titlepage}</h2>
            <div className="col-md-12 w-100 mt-2">
                {data.codigo ? FormDesafioUTEQ(data.language, data.codigo) : ""}
                <hr />
            </div>
        </div><br />
    </>);

}