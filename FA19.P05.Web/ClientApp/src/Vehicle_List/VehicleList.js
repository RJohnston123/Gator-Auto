import React, { useState, useEffect } from 'react';
import Vehicle from './Vehicle'
import './Vehicle.css'
import { ListGroup } from 'reactstrap';
import { Button } from 'reactstrap';
import { dataFiltered } from '../InventorySearch/InventorySearch'

let isNotVis = true;

const VehicleList = (props) => {

    const [vehicleState, setVehicleState] = useState({vehicles:[{}]});

    useEffect(() => {
        setVehicleState({vehicles: dataFiltered});
        console.log(vehicleState.vehicles)

    },[dataFiltered]);


    let vehicles = (

        <div className="Vehicle">
            {vehicleState.vehicles != null ?  (
                isNotVis = false,
            vehicleState.vehicles.map((vh) => {
                return <ListGroup>
                    <Vehicle
                        vin = {vh.VIN}
                        year={vh.year}
                        make={vh.make}
                        model={vh.model}
                        baseCost={vh.min}
                        location={vh.dealershipName}
                        image={vh.image}
                    />
                </ListGroup>
                })) : isNotVis = true  }
        </div>
    );

    return (
        <div hidden={isNotVis}>
            <div >{vehicles}</div>
        </div>
    );
};

export default VehicleList;
