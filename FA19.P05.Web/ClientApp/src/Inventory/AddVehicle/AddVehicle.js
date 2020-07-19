import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { InputGroup, Input, Button, Col, Form, Row, FormGroup, Label} from 'reactstrap';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Axios from 'axios';
import Loader from 'react-loader-spinner'
import './AddVehicle.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppSettings from '../../AppSettings';

const AddVehicle = (props) => {
    const [image, setImage] = useState();
    const [vin, setVin] = useState(); 
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [baseCost, setBaseCost] = useState();
    const [dealership, setDealership] = useState({value: 0});
    const [dealershipName, setDealershipName] = useState();
    const [dealershipList, setDealershipList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [disableMakeModelYear, setDisableMakeModelYear] = useState(true);

    const notifySuccess = () => toast.success('Vehicle created successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });

    const notifyFailure = () => toast.error("Please enter all fields correctly.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });
    useEffect(() => {
        populateDealershipList();
    }, []);

    const imageChangeHandler = (event) => {
        if (event === null) { setImage(image)}
        else {
            setImage(event.target.value);
        }
    }

    const vinChangeHandler = (event) => {
        if (event === null) { setVin(vin)}
        else {
            setVin(event.target.value);
        }
    }

    const searchVinHandler = () => {
        console.log(vin);
        if (vin !== undefined){
            setLoading(true)
            //1FMZU72X6YZC22785
            var nhtsaURL = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/' + vin + '?format=json'
            Axios.get(nhtsaURL)
            .then((response) => {
                console.log(response.data.Results[0]);
                var nhtsaresponse = response.data.Results[0];
                setMake(nhtsaresponse['Make'])
                setModel(nhtsaresponse['Model'])
                setYear(parseInt(nhtsaresponse['ModelYear']))
                setLoading(false)
                setDisableMakeModelYear(false);
            }, (error) => {
                console.log(error);
                setLoading(false)
            });
        }
    }

    const baseCostChangeHandler = (event) => {
        if (event === null) { setBaseCost(baseCost)}
        else {
            setBaseCost(parseInt(event.target.value));
        }
    }

    const dealershipChangeHandler = (event) => {
        if (event === null) { setDealership(dealership)}
        else {
            console.log(event)
            setDealership(event);
        }
    }
    const populateDealershipList = () => {
        Axios.get(`${AppSettings.baseUrl}/api/Dealership`)
            .then((response) => {
                var arr = [];
                for (var k = 0; k < response.data.length; k++) {
                    arr.push({ value: response.data[k].id, label: (response.data[k].storeName + ": " + response.data[k].address.city)});
                }
                setDealershipList(arr)
            })
    }

    const submitHandler = () => {
        var date = new Date();
        date = date.toJSON();
        console.log(image)
        console.log(vin)
        console.log(make)
        console.log(model)
        console.log(year)
        console.log(baseCost)
        console.log(date)
        console.log(dealership)
        Axios.post(`${AppSettings.baseUrl}/api/InventoryItem`, { 
            "vin": vin,
            "make": make,
            "model": model,
            "year": year,
            "baseCost": baseCost,
            "image": image,
            "addedToStockUtc": date,
            "dealershipId": dealership.value
         })
         .then((response) => {
            console.log(response);
            notifySuccess();
            setImage("");
            setVin("");
            setMake("");
            setModel("");
            setYear("");
            setBaseCost("");
            setDealership("");
            addMake(make);
            addModel(make,model);
          }, (error) => {
            console.log(error);
            notifyFailure();
          });
    }

    const addMake = (make) => {
        Axios.post(`${AppSettings.baseUrl}/api/MakeList`, {"make": make})
        .then((response) => {
            console.log(response);
            console.log("Make has been created!")
        })
        .catch((error) => {
            console.log(error);
            console.log("Make has already been created.")
        })
    }

    const addModel = (make, model) => {
        Axios.post(`${AppSettings.baseUrl}/api/MakeModelOption`, {"make": make, "model": model})
        .then((response) => {
            console.log(response);
            console.log("Model has been created!")
        })
        .catch((error) => {
            console.log(error);
            console.log("Model has already been created.")
        })
    }


    return (
        <div style={{marginTop: '120px'}} >
            <h3 className="CreateTitle" >Add Vehicle</h3>
            <div className="InputTitle">Image</div>
            <InputGroup className="InputField">
                <Input
                onInputCapture={imageChangeHandler}
                value={image} />
            </InputGroup>
            <div className="InputTitle">VIN</div>
            <InputGroup className="InputField">
                <Input
                    className = "InputField"
                    onInputCapture={vinChangeHandler}
                    placeholder="VIN" 
                    value={vin} />
                <Button onClick={searchVinHandler}>{loading === false && "Search Vin"}<Loader visible={loading} type="ThreeDots" color="#6FDE5D" height={20} width={80} /></Button>
            </InputGroup>
            <InputGroup className="InputField">
                <Input
                onInputCapture={vinChangeHandler}
                placeholder="Make" 
                value={make}
                disabled={disableMakeModelYear}/>
                <Input
                placeholder="Model" 
                value={model}
                disabled={disableMakeModelYear}/>
                <Input
                placeholder="Year" 
                value={year}
                disabled={disableMakeModelYear}/>
            </InputGroup>

            <div className="InputTitle">Base Cost</div>
            <InputGroup className="InputField">          
                <Input 
                onInputCapture={baseCostChangeHandler} 
                value={baseCost} />
            </InputGroup>   
            <div className="InputTitle">Dealership</div>
            <Select
                    className="InputField"
                    options={dealershipList}
                    onChange={dealershipChangeHandler}
                    value={dealership}/>
            <Button 
            onClick={submitHandler}
            className="InvButton"
            >
                Add Vehicle
            </Button>
            <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
        </div>
    );
}

export default AddVehicle;
