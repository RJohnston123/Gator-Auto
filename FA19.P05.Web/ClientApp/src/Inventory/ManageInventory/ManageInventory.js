import React, {useState, useEffect} from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { ListGroup, ListGroupItem, Modal} from 'reactstrap';
import Multi from 'react-select';
import './ManageInventory.css';
import Axios from 'axios';
import AppSettings from '../../AppSettings';

const ManageInventory = (props) => {


    useEffect(() => {
        //Get Makes
        Axios.get(`${AppSettings.baseUrl}/api/MakeList`)
        .then(function (response) {
            // handle success
            setMakeState({ make: response.data.map(function (car) { return { value: car.make, label: car.make } }) });
            setSelectedMakeState({ make: response.data.map(function (car) { return { value: car.make, label: car.make } }) })
        });

        Axios.get(`${AppSettings.baseUrl}/api/MakeModelOption`)
        .then(function (response) {
            // handle success
            setModelState({ model: response.data.map(function (car) { return { value: car.model, label: car.make + ": " + car.model, link: car.make } }) });
            setSelectedModelState({ model: response.data.map(function (car) { return { value: car.model, label: car.model, link: car.make } }) })

        });

        //Get List of Dealerships
        Axios.get(`${AppSettings.baseUrl}/api/Dealership`)
            .then(function (response) {
                // handle success
                setLocationState({ location: response.data.map(function (city) { return { value: city.address.city, label: city.address.city + ": " + city.storeName, key: city.id } }) });
                setsSelectedLocationState({ location: response.data.map(function (city) { return { value: city.address.city, label: city.address.city + ": " + city.storeName, key: city.id } }) });
            });
    }, []);

    const [inputtedYearState, setInputtedYearState] = useState({year: 1337});
    const [makeState, setMakeState] = useState({ make: [] });
    const [modelState, setModelState] = useState({ model: [] });
    const [selectedMakeState, setSelectedMakeState] = useState({ make: "" });
    const [selectedModelState, setSelectedModelState] = useState({ model: "" });
    const [vehicles, setVehicles] = useState({car: []})
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [optionsModal, setOptionsModal] = useState(false);
    const [locationState, setLocationState] = useState({
        location: []
    });
    const [selectedLocationState, setsSelectedLocationState] = useState({location: 0 });
    const [inputtedVINState, setInputtedVINState] = useState({vin: "0"});
    const [carEdits, setCarEdits] = useState({
        id: "",
        vin: "",
        make: "",
        model: "",
        year: "",
        baseCost: "",
        image: "",
        addedToStockUtc: "",
        dealershipId: ""
    })
    const [selectedVH, setSelectedVH] = useState({
        id: "",
        vin: "",
        make: "",
        model: "",
        year: "",
        baseCost: "",
        image: "",
        addedToStockUtc: "",
        dealershipId: "",
    });

    //Input Registers\\
    const costChangeHandler       = (event) => {carEdits.baseCost = parseFloat(event.target.value);}
    const imageChangeHandler      = (event) => {carEdits.image = event.target.value;}
    const dealerhsipChangeHandler = (event) => {carEdits.dealershipId = event.key;}

    let dataFiltered;

    const SearchVehicles = () => {
        Axios.get(`${AppSettings.baseUrl}/api/InventoryItem/adminSearch`, {params: { VIN: inputtedVINState.vin, year: inputtedYearState.year, dealershipId: selectedLocationState.location, make: selectedMakeState.make, model: selectedModelState.model  }})
            .then(function(response) {
                console.log(response.data);
                setVehicles({ car: response.data.map(
                    function (car) {
                        return {
                            id: car.id,
                            vin: car.vin,
                            make: car.make,
                            model: car.model,
                            year: car.year,
                            baseCost: car.baseCost,
                            image: car.image,
                            addedToStockUtc: car.addedToStockUtc,
                            dealershipId: car.dealershipId
                        }
                    }
                )})
            })
        }

        const yearChangeHandler = (event) => {
            if (event.target.value === '') { setInputtedYearState({ year: 1337 }) }
            else {
                setInputtedYearState({year: event.target.value})
            }
        };

        const makeChangeHandler = (selectedMake) => {
         
                
                setSelectedMakeState({ make: selectedMake.value })
           
            console.log(selectedMakeState)
        };

        const modelChangeHandler = (selectedModel) => {
    
           
                
                setSelectedModelState({ model: selectedModel.value })
            
        };

        const locChangeHandler = (selectedLocations) => {
            if (selectedLocations === null) { setsSelectedLocationState({ location: locationState.location }) }
    
            else {
                console.log(selectedLocations.key)
                setsSelectedLocationState({ location: selectedLocations.key })
                console.log(selectedLocationState.location)
            }
            //location = selectedLocations
        };

        const vinChangeHandler = (event) => {
            if (event.target.value === '') { setInputtedVINState({ vin: "0"}) }
    
            else {
                setInputtedVINState({vin: event.target.value})
            }
        };

    let cars = (
        vehicles.car.map((vh) => {
            return <ListGroupItem className="ListItem">
                <div className="ItemContent">
                    <div className="PicContainer">
                        <img src={vh.image} className="Picture"/>
                    </div>
                    <div className="ItemText">
                        <div>VIN: {vh.vin}</div>
                        <div>Year: {vh.year}</div>
                        <div>Make: {vh.make}</div>
                        <div>Model: {vh.model}</div>
                        <div>Price: ${vh.baseCost}</div>
                        <div>Location: {(locationState.location.filter(function(data) {return data.key === vh.dealershipId}))[0].value}</div>
                    </div>
                    <div className="Buttons">
                        <div><Button className="ListButtons" onClick={() => editCarModal(vh)}>Edit</Button></div>
                        <div><Button className="ListButtons" onClick={() => deleteCarModal(vh)}>Delete</Button></div>
                    </div>
                </div>
            </ListGroupItem>})
        );

    const deleteCar = (id) => {
        Axios.delete(`${AppSettings.baseUrl}/api/InventoryItem`, {params: {id: id}})
        .then(function (response) {
            console.log(response);
            setDeleteModal(false);
            SearchVehicles();
        })
    }

    const editCar = () => {
        Axios.put(`${AppSettings.baseUrl}/api/InventoryItem`, carEdits)
        .then(function (response){
            console.log(response);
            console.log(carEdits);
            setEditModal(false);
            SearchVehicles();
        })
        .catch(function (error){
            console.log(carEdits);
            console.log(error);        
        })
    }  

    const deleteCarModal = (vh) => {
        setDeleteModal(true);
        setSelectedVH(vh);
    }

    const editCarModal =(vh) => {
        setEditModal(true);
        setCarEdits(vh);
        setSelectedVH(vh);
    }

    const vehicleOptionsModal = () => {
        setOptionsModal(true);
        setSelectedVH(true);
    }

    //let filterChange = modelState.model.filter(function (array_el) { return !selectedMakeState.make.filter(function (anotherOne_el) { return anotherOne_el.label === array_el.link; }).length == 0 });


    return(
        <div>
            <div className="InputContainer">
                <div className="InputGroup">
                    <div className="InputsTitle">Year</div>
                    <Input 
                        className="Inputs" 
                        onInputCapture={yearChangeHandler.bind(this)}
                        type="number"
                        step="1"
                        defaultValue="">
                    </Input>
                </div>

                <div className="InputGroup">
                    <div className="InputsTitle">Make</div>
                    <Multi 
                        className="Inputs"
                        onChange={makeChangeHandler}
                        options={makeState.make}
                        placeholder="">
                    </Multi>
                </div>

                <div className="InputGroup">
                    <div className="InputsTitle">Model</div>
                    <Multi 
                        className="Inputs" 
                        onChange={modelChangeHandler}
                        options={modelState.model}
                        placeholder="">
                    </Multi>
                </div>

                <div className="InputGroup">
                    <div className="InputsTitle">VIN</div>
                    <Input 
                        className="Inputs" 
                        onInputCapture={vinChangeHandler.bind(this)} 
                        type="string" >
                    </Input>
                </div>

                <div className="InputGroup">
                    <div className="InputsTitle">Dealership</div>
                    <Multi 
                        className="Inputs"
                        options={locationState.location}
                        onChange={locChangeHandler}
                        placeholder="">
                    </Multi>
                </div>
                
                <Button style={{height: '40px', marginTop: '21px'}}  onClick={() => SearchVehicles()}>Search</Button>

            </div>
            <div className="List">
                <ListGroup>
                    {cars}
                </ListGroup>
            </div>

            <Modal isOpen={deleteModal} className="DeleteModal">
                <div className="DeleteContent">
                    <div className="DeleteQuestion">Are you sure you want to delete this vehicle?</div>
                    <div className="ModalButtons">
                        <Button className="Button" onClick={() => deleteCar(selectedVH.id)}>Yes</Button>
                        <Button className="Button" onClick={() => setDeleteModal(false)}>No</Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={editModal}>
                <div className="DeleteQuestion">Edit Vehicle</div>

                <div className="EditInputContainer">
                    <div className="InputsTitle">Price</div>
                    <Input 
                    className="ModalInputs"
                    defaultValue={selectedVH.baseCost}
                    onChange={costChangeHandler}/>
                    <div className="InputsTitle">Image Link</div>
                    <Input 
                    className="ModalInputs"
                    defaultValue={selectedVH.image}
                    onChange={imageChangeHandler}/>
                    <div className="InputsTitle">Dealership</div>
                    <Multi 
                    className="ModalInputs"
                    options={locationState.location}
                    onChange={dealerhsipChangeHandler}/>
                    </div>

                <div className="ModalButtons">
                    <Button className="Button" onClick={() => editCar()}>Submit</Button>
                    <Button className="Button" onClick={() => setEditModal(false)}>Cancel</Button>
                </div>
            </Modal>
        </div>
    )
}

export default ManageInventory;