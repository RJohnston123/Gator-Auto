import React, { useState } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppSettings from '../../AppSettings';

const CreateNewDealership = (props) => {
    const [phoneNumber, setPhoneNumber] = useState();
    const [dealershipName, setDealershipName] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipCode, setZipCode] = useState();

    const notifySuccess = () => toast.success('Dealership created successfully', {
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


    const dealershipNameChangeHandler = (event) => {
        if (event === null) { setDealershipName(dealershipName)}
        else {
            setDealershipName(event.target.value);
        }
    }

    const streetChangeHandler = (event) => {
        if (event === null) { setStreet(street)}
        else {
            setStreet(event.target.value);
        }
    }

    const cityChangeHandler = (event) => {
        if (event === null) { setCity(city)}
        else {
            setCity(event.target.value);
        }
    }

    const stateChangeHandler = (event) => {
        if (event === null) { setState(state)}
        else {
            setState(event.target.value);
        }
    }

    const zipCodeChangeHandler = (event) => {
        if (event === null) { setZipCode(zipCode)}
        else {
            setZipCode(event.target.value);
        }
    }

    const phoneNumberChangeHandler = (event) => {
        if (event === null) { setPhoneNumber(phoneNumber) }
        else {
            setPhoneNumber(event)
        }
    }

    const createDealershipHandler = () => {
        console.log(dealershipName);
        console.log(street + " " + city + ", " + state + " " + zipCode)
        console.log(phoneNumber);
        Axios.post(`${AppSettings.baseUrl}/api/Dealership`, { 
            "address": {
                "line1": street,
                "line2": street,
                "city": city,
                "state": state,
                "zipCode": zipCode
            },
            "salesPhoneNumber": phoneNumber,
            "storeName": dealershipName,
            "openHours": "NA"
         })
         .then((response) => {
            console.log(response);
            notifySuccess();
            setDealershipName("");
            setStreet("");
            setCity("");
            setState("");
            setZipCode("");
            setPhoneNumber("");
          }, (error) => {
            console.log(error);
            notifyFailure();
          });
    }

    return (

        <dif>
        <div style={{marginTop: "120px"}}>
            <h3 className="CreateTitle" >Add Dealership</h3>

            <div className="InputTitle">Dealership Name</div>
            <InputGroup className="InputField">
                <Input
                onInputCapture={dealershipNameChangeHandler.bind(this)}
                placeholder="Name" 
                value={dealershipName}/>
            </InputGroup>

            <div className="InputTitle">Address</div>
            <InputGroup className="InputField">
                <Input
                onInputCapture={streetChangeHandler}
                placeholder="Street Address"
                value={street}/>
            </InputGroup>  
            <InputGroup className="InputField">          
                <Input onInputCapture={cityChangeHandler} placeholder="City" value={city} />
                <Input onInputCapture={stateChangeHandler} placeholder="State" value={state}/>
                <Input onInputCapture={zipCodeChangeHandler} placeholder="Zip Code" value={zipCode}/>
            </InputGroup>    
            <div className="InputTitle">Phone Number</div>
            <PhoneInput
                placeholder="Enter phone number"
                country="US"
                value={ phoneNumber }
                onChange={phoneNumberChangeHandler} />
            <Button 
            onClick={createDealershipHandler}
            className="InvButton">
                Add Dealership
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
        </dif>



    );
}

export default CreateNewDealership;
