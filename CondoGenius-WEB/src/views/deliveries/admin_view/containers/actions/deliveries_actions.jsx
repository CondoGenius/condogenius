import React from "react";
import { Button } from "react-materialize";

const renderFieldResidence = () => (
    <select class="browser-default">
        <option value="" disabled selected hidden>Selecione a residência</option>
        <option value="1">Residência 23</option>
        <option value="2">Residência 8</option>
        <option value="3">Residência 4</option>
    </select>
);

const DeliveriesActions = () => {
    return (
        <div className="filter_content">
            <div class="row">
                <form class="col s12">
                    <div class="input-field col s3">
                        {renderFieldResidence()}
                    </div>
                   
                    <div class="input-field col s3">
                       <Button>Cadastrar entrega recebida</Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default DeliveriesActions;