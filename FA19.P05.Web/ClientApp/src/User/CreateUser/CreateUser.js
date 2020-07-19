import React, {useState} from 'react';
import { InputGroup, Input, Button, Toast, ToastBody } from 'reactstrap';
import './CreateUser.css';
import Multi from 'react-select';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppSettings from '../../AppSettings';

const CreateUser = (props) => {
    const [openError, setOpenError] = useState(false);
    const [errorMsg, setErrorMsg]   = useState("");


    const notifySuccess = () => toast.success('User created successfully', {
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


    const [userInfo] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        roles:[]
    });

    const [passReEnter] = useState({
        pass: ""
    });

    const Roles = [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Customer' },
        { value: 3, label: 'GM' },
        { value: 4, label: 'Sales' },
      ];

    const nameChange = (event) => {userInfo.name = event.target.value; setOpenError(false);}
    const usernameChange = (event) => {userInfo.username = event.target.value; setOpenError(false);}
    const emailChange = (event) => {userInfo.email = event.target.value; setOpenError(false);}
    const passwordChange = (event) => {userInfo.password = event.target.value; setOpenError(false);}
    const reEnterPassChange = (event) => {passReEnter.pass = event.target.value; setOpenError(false);}

    const roleChangeHandler = (event) => {
        setOpenError(false);
        if (event === null) 
            {userInfo.roles = []}
        else
        {
            userInfo.roles = event.map(function(s) { return s.value; });
            console.log(userInfo);
        }
    }

    const Create = () => {
        if(userInfo.password === passReEnter.pass)
        {
            Axios.post(`${AppSettings.baseUrl}https://localhost:44356/api/User`, userInfo)
            .then(function (response) {
                console.log(response);
                notifySuccess();
            })
            .catch(function (error) {
                console.log(error)
                setOpenError(true);
                setErrorMsg("Please enter all fields correctly.")
                notifyFailure();
            })
        }
        else
        {
            setOpenError(true);
            setErrorMsg("Both password fields are not the same.")
        }
    }

    return(
        <div>
            <div className="Title">Create User</div>

            <div className="InContainer">
                <div className="InputName">First and Last Name</div>
                <Input 
                onChange={nameChange}
                className="InputBox"/>

                <div className="InputName">Username</div>
                <Input
                onChange={usernameChange} 
                className="InputBox"/>

                <div className="InputName">Email</div>
                <Input 
                onChange={emailChange}
                className="InputBox"/>

                <div className="InputName">Password</div>
                <Input 
                onChange={passwordChange}
                className="InputBox" type="password"/>

                <div className="InputName">Re-Enter Password</div>
                <Input 
                onChange={reEnterPassChange}
                className="InputBox"type="password"/>

                <div className="InputName">Roles</div>
                <Multi 
                className="InputBox" 
                options={Roles} 
                onChange={roleChangeHandler}
                isMulti="true"/>

                            
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                <Button className="Button" onClick={() => Create()}>Create User</Button>
            </div>
        </div>
    )
}

export default CreateUser;
