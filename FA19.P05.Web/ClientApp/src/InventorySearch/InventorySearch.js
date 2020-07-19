import React, { useState, useEffect } from 'react';
import Multi from 'react-select';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import './InventorySearch.css'
import { Container, Row, Col, Button } from 'reactstrap';
import VehicleList from '../Vehicle_List/VehicleList'
import Axios from "axios"
import FeaturedVehicles from '../FeaturedVehicles/FeaturedVehicles';
import AppSettings from '../AppSettings';

const InventorySearch = () => {

    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    useEffect(() => {

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

        Axios.get(`${AppSettings.baseUrl}/api/Dealership`)
            .then(function (response) {
                // handle success
                setLocationState({ location: response.data.map(function (city) { return { value: city.address.city, label: city.address.city + ": " + city.storeName, key: city.id } }) });
                setsSelectedLocationState({ location: response.data.map(function (city) { return { value: city.address.city, label: city.address.city + ": " + city.storeName, key: city.id } }) });

            });
    }, []);

    const [dataFilteredState, setDataFilteredState] = useState({data:[{}]});

    // eslint-disable-next-line no-unused-vars
    const [locationState, setLocationState] = useState({
        location: []
    });

    const [selectedLocationState, setsSelectedLocationState] = useState({
        location: [{}]
    });

    const [makeState, setMakeState] = useState({ make: [] });

    const [modelState, setModelState] = useState({ model: [] });

    const [selectedMakeState, setSelectedMakeState] = useState({ make: [{}] });

    const [selectedModelState, setSelectedModelState] = useState({ model: [{}] });

    const [inputtedMinYearState, setInputtedMinYearState] = useState({minYear: 2000});

    const [inputtedMaxYearState, setInputtedMaxYearState] = useState({maxYear: 2020});

    const [inputtedVINState, setInputtedVINState] = useState({vin: "0"});

    const [inputtedMinState, setInputtedMinState] = useState({min: 0});

    const [inputtedMaxState, setInputtedMaxState] = useState({max: 1000000});

    const [hideFeatured, setHideFeatured] = useState(false);

    const locChangeHandler = (selectedLocations) => {
        if (selectedLocations === null) { setsSelectedLocationState({ location: locationState.location }) }

        else {
            setsSelectedLocationState({ location: selectedLocations })
        }
        console.log(selectedLocations)
        //location = selectedLocations
    };

    const makeChangeHandler = (selectedMake) => {
        if (selectedMake === null) { setSelectedMakeState({ make: makeState.make }) }
        else {
            setSelectedMakeState({ make: selectedMake })
        }
        console.log(selectedMakeState)
    };

    const modelChangeHandler = (selectedModel) => {
        if (selectedModel === null) { setSelectedModelState({ model: modelState.model }) }

        else {
            setSelectedModelState({ model: selectedModel })
        }
    };

    const minChangeHandler = (event) => {
        if (event.target.value === '') { setInputtedMinState({ min: 0 }) }

        else {
            setInputtedMinState({min: event.target.value})
        }
    };

    const vinChangeHandler = (event) => {
        if (event.target.value === '') { setInputtedVINState({ vin: "0"}) }

        else {
            setInputtedVINState({vin: event.target.value})
        }
    };

    const maxChangeHandler = (event) => {
        if (event.target.value === '') { setInputtedMaxState({ max: 1000000 }) }

        else {
            setInputtedMaxState({max: event.target.value})
        }
    };

    const minYearChangeHandler = (event) => {
        if (event.target.value === '') { setInputtedMinYearState({ minYear: 0 }) }
        else {
            setInputtedMinYearState({minYear: event.target.value})
        }
    };

    const maxYearChangeHandler = (event) => {
        if (event.target.value === '') { setInputtedMaxYearState({ maxYear: 0 }) }

        else{
            setInputtedMaxYearState({maxYear: event.target.value})
        }
    };

    let filterChange = modelState.model.filter(
        function (array_el) { 
            return !selectedMakeState.make.filter(
                function (anotherOne_el) { 
                    return anotherOne_el.label === array_el.link; }).length == 0 });


    const searchHandler = () => {
        setHideFeatured(true);
        Axios.get(`${AppSettings.baseUrl}/api/InventoryItem/search`, {params: { VIN: inputtedVINState.vin, minYear: inputtedMinYearState.minYear, maxYear: inputtedMaxYearState.maxYear, min: inputtedMinState.min, max: inputtedMaxState.max, dealershipName: "" }})
            .then(function (response) {
                console.log(response.data);
                dataFiltered = response.data.map(function (car) { return { VIN: car.vin, make: car.make, model: car.model, min: car.baseCost, year: car.year, dealershipId: car.dealershipId, image: car.image } });
                console.log(dataFilteredState);
                dataFiltered = (dataFiltered.filter(function (data) { return !selectedMakeState.make.filter(function (selectedMake) { return selectedMake.label === data.make }).length == 0 }));
                dataFiltered = (dataFiltered.filter(function (data) { return !selectedLocationState.location.filter(function (selectedLocation) {
                    if(selectedLocation.key === data.dealershipId){
                        data.dealershipName = selectedLocation.label;
                    }
                        return selectedLocation.key === data.dealershipId }).length == 0 }));
                dataFiltered = (dataFiltered.filter(function (data) { return !selectedModelState.model.filter(function (selectedModel) { return selectedModel.value === data.model }).length == 0 }));
                setDataFilteredState({data: dataFiltered});
                console.log(dataFilteredState)
            })
    };



    return (

        <div>
        <div className="InventorySearch" >
                <div className="SearchTitle" >Search Vehicles</div>

                <div className="InputTitle">VIN Search</div>
                <Input 
                className="InputField" 
                placeholder="VIN" 
                onInputCapture={vinChangeHandler.bind(this)} 
                type="string" />
                

                <div className="InputTitle">Dealership Location</div>
                <Multi
                    className="InputField"
                    options={locationState.location}
                    isMulti="true"
                    onChange={locChangeHandler}
                    placeholder="Any Dealership Location..." />

                <div className="InputTitle">Make</div>
                <Multi
                    className="InputField"
                    isMulti="true"
                    onChange={makeChangeHandler}
                    options={makeState.make}
                    placeholder="Any Make..." />

                <div className="InputTitle">Model</div>
                <Multi
                    className="InputField"
                    isMulti="true"
                    onChange={modelChangeHandler}
                    options={filterChange}
                    placeholder="Any Model..." />

                <Container>
                    <Row>
                        <Col>
                        <div className="InputTitle">Min. Year</div>
                            <InputGroup className="InputField">
                                <Input placeholder="Minimum Year" min={1970} max={2024} onInputCapture={minYearChangeHandler.bind(this)} type="number" step="1" defaultValue="2000" />
                            </InputGroup>
                        </Col>
                        <Col >
                        <div className="InputTitle">Max. Year</div>
                            <InputGroup className="InputField">
                                <Input placeholder="Maximum Year" min={1970} max={2024} onInputCapture={maxYearChangeHandler.bind(this)} type="number" step="1" defaultValue="2020" />
                            </InputGroup>
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                            <div className="InputTitle">Min. Price</div>
                            <InputGroup className="InputField">
                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                <Input placeholder="Minimum" min={0} max={3000000} onInputCapture={minChangeHandler.bind(this)} type="number" step="500" />
                            </InputGroup>
                        </Col>

                        <Col >
                            <div className="InputTitle">Max. Price</div>
                            <InputGroup className="InputField">
                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                <Input placeholder="Maximum" min={1000} max={6000000} onInputCapture={maxChangeHandler.bind(this)} type="number" step="500" />
                            </InputGroup>
                        </Col>

                    </Row>

                </Container>
                <Button 
                onClick={searchHandler}
                className="InvButton">
                    Search
                </Button>
            </div>
            <FeaturedVehicles hidden={hideFeatured}/>
            <VehicleList  search={dataFilteredState.data}/>
            </div>
    );
};


export default InventorySearch;
export let dataFiltered;
