// JavaScript source code
import React, {useState, useEffect} from 'react';
import { Container, Row, Col, ListGroupItem } from 'reactstrap';
import './Vehicle.css';
import {Button, Modal} from 'reactstrap';
import nl2br from 'react-newline-to-break';
import Axios from 'axios';
import AppSettings from '../AppSettings';


const style = {
    margin: '20px auto',
    height: '200px auto',
    width: '100%',
    borderRadius: '30px'
}

const Vehicle = (props) => {
    
    const [openModal, setOpenModal] = useState(false);
    const [inventoryOptions, setInventoryOptions] = useState([[]]);

    useEffect(() => {
        Axios.get(`${AppSettings.baseUrl}/api/InventoryOption`)
        .then((response) => {
            setInventoryOptions(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const OpenModal = () => {
        setOpenModal(true)
        console.log(inventoryOptions)
    }

    const Options = () => {
        var filteredOptions = inventoryOptions.filter((data) => {
            return data.make === props.make;
        })

        if(filteredOptions.length === 0)
            return (
                <div>
                    <div className="OptionsDescription" style={{textAlign: 'center'}}>
                        No options are available for this vehicle. :(
                    </div>
                </div>
            )
        else
        return filteredOptions.map((op) =>
                <div className="OptionsCell">
                    <div className="OptionsPrice">${op.price}</div>
                    <div className="OptionsDescription">{nl2br(op.optionDescription)}</div>
                </div>
            )
    }

    return (
        <ListGroupItem style={style} key={props.id}>
                <img className="Pic" src={props.image} />

                <div className="Info">
                    <div >{props.location}</div>
                    <div className="Price">${props.baseCost}</div>
                    <div className="YMM">{props.year} {props.make} {props.model}</div>
                    <div className="VIN">VIN:{props.vin}</div>
                    <Button 
                    className="VehicleButton"
                    onClick={() => OpenModal()}>
                        View Options
                    </Button>
                    {/*<Button className="VehicleButton">Favorite!</Button>*/}
                </div>

                <Modal isOpen={openModal} contentClassName="ModalBG">
                    <div className="OptionsTitle">{props.year} {props.make} {props.model} Options</div>
                    <Options/>
                    <Button 
                    className="Button" 
                    style={{alignSelf: 'center', marginBottom: '20px'}}
                    onClick={() => setOpenModal(false)}>
                        Close
                    </Button>
                </Modal>
        </ListGroupItem>
    )
};



export default Vehicle;