import React, { useState } from 'react';
import { Navbar, NavbarBrand, Button, Modal, Input, Toast, ToastBody, ToastHeader } from 'reactstrap';
import {Link} from 'react-router-dom';
import "./Taskbar.css";
import Axios from 'axios';
import Authentication from '../Authentication/Authentication';
import AppSettings from '../AppSettings';
 

const Taskbar = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openLoginError, setOpenLoginError] = useState(false);
    const [openRegError, setOpenRegError] = useState(false);
    const [regErrorMsg, setRegErrorMsg] = useState("Please enter all fields correctly.");

    const [loginInputs] = useState({
        username: '',
        password: ''
    })

    const [registerInputs] = useState({
        username: '',
        password: '',
        email: '',
        name: '',
    })

    const [passReEnter] = useState({
        reEnterPassword: ''
    })

    const [creditScore] = useState({
        creditNumber: '',
        userId: ''
    });

    //~~~~~~~~LOGIN HANDLERS~~~~~~~\\\\\
    const usernameChangeHandler = (event) => {
        loginInputs.username = event.target.value;
        setOpenLoginError(false);
    }
    const passwordChangeHandler = (event) => {
        loginInputs.password = event.target.value;
        setOpenLoginError(false);
    }


    //~~~~~~~~REGISTER HANDLERS~~~~~~~\\\\\
    const regUsernameChangeHandler = (event) => {
        registerInputs.username = event.target.value;
        setOpenRegError(false);
    }
    const regPasswordChangeHandler = (event) => {
        registerInputs.password = event.target.value;
        setOpenRegError(false);
    }
    const regEmailChangeHandler = (event) => {
        registerInputs.email = event.target.value;
        setOpenRegError(false);
    }
    const regCreditChangeHandler = (event) => {
        creditScore.creditNumber = parseInt(event.target.value, 10);
        setOpenRegError(false);
    }
    const regNameChangeHandler = (event) => {
        registerInputs.name = event.target.value;
        setOpenRegError(false);
    }
    const regPassReEnterChangeHandler = (event) => {
        passReEnter.reEnterPassword = event.target.value;
        setOpenRegError(false);
    }


    //~~~~LOG IN~~~~\\
    const UserLogin = () => {
        Axios.post(`${AppSettings.baseUrl}/api/Authentication`, loginInputs)
            .then(function (response) {
                console.log(response)
                loginInputs.username = '';
                loginInputs.password = '';
                setOpenLoginError(false);
                setOpenLogin(false);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
                setOpenLoginError(true);
            })
        }

    //~~~~~REGISTER CUSTOMER~~~~~\\
    const CustomerRegistration = () => {
        if(registerInputs.password === passReEnter.reEnterPassword)
        {
            if((creditScore.creditNumber >= 1) && (creditScore.creditNumber <= 850))
            {
            Axios.post(`${AppSettings.baseUrl}/api/Customer`, registerInputs)
                .then(function (response) {
                    console.log(response)
                    creditScore.userId = response.data.id;
                    CreditPost();
                })
                .catch(function (error) {
                    console.log(error);
                    setRegErrorMsg("Please enter all fields correctly.")
                    setOpenRegError(true);
                })
            }
            else
            {
                setRegErrorMsg("Your credit score must be between 1-850.")
                setOpenRegError(true);
            }
        }
        else
        {
            setRegErrorMsg("Both password fields do not match.")
            setOpenRegError(true);
        }
    }

    const CreditPost = () => {
        Axios.post(`${AppSettings.baseUrl}/api/CreditScore`, creditScore)
            .then(function (response) {
                console.log("Credit score posted!");
                setOpenRegister(false)
            })
            .catch(function (error) {
                console.log(creditScore);
            })
    }


    const LoginCancelHandler = () => {
        loginInputs.username = '';
        loginInputs.password = '';
        setOpenLoginError(false);
        setOpenLogin(false);
    }

    const Logout = () => {
        Axios.post(`${AppSettings.baseUrl}/api/Logout`)
            .then(function(response) {
                console.log(response);
                window.location.reload();
            })
    }

    return (
        <div>
            
            <div className="Navbar">
                <Navbar>
                    <a href="/home">
                        <NavbarBrand>
                            <img 
                                className="Brand"
                                //style={{width: 102, height: 60}}
                                src={require('./GatorAutoLogo.png')} 
                                alt={"Gator Auto"}
                            />
                        </NavbarBrand>
                    </a>


                    {/*~~~~~~TASKBAR BUTTONS~~~~~~*/}
                    <div>
                        <Authentication>
                            <div className="Greeting">
                                Hello, <Authentication field="Name"/>!
                            </div>
                        </Authentication>
                        
                        <Authentication role="out">
                            <Button 
                                className="TaskbarButton"
                                onClick={() => setOpenRegister(true)}
                                >
                                    Register
                            </Button>
                            <Button 
                                className="TaskbarButton"
                                onClick={() => setOpenLogin(true)}
                                >
                                    Login
                            </Button>
                        </Authentication>

                        <Authentication role="Admin">
                            <Link to="/adminportal/CreateUser">
                                <Button 
                                    className="TaskbarButton"
                                    >
                                        Portal
                                </Button>
                            </Link>
                        </Authentication>

                        <Authentication>
                            <Link to="/home">
                                <Button 
                                    className="TaskbarButton"
                                    onClick={() => Logout()}
                                    >
                                        Logout
                                </Button>
                            </Link>
                        </Authentication>
                    </div>
                </Navbar>
            </div>


            {/*~~~~~~~~~~LOGIN~~~~~~~~~~~*/} 
            <div>
                <Modal isOpen={openLogin} className="Modal" contentClassName="ModalBG">
                    <div className="ModalContent">
                        <div className="Header">
                            Login
                        </div>

                        <div className="Input">
                            <div className="ModalInputTitle" require>User Name</div>
                            <Input onChange={usernameChangeHandler}/>
                        </div>

                        <div className="Input">
                            <div className="ModalInputTitle">Password</div>
                            <Input type="password" onChange={passwordChangeHandler}/>
                        </div>
                    </div>

                    <div className="ButtonContainer">
                        <Button 
                            className="Button"
                            onClick={LoginCancelHandler}>
                                Cancel
                        </Button>
                        <Button 
                            className="Button" 
                            color="success"
                            onClick={() => UserLogin()}>
                                Login
                        </Button>
                    </div>
                                            
                    <Toast isOpen={openLoginError} className="Toast">
                        <ToastBody>User name or password is incorrect.</ToastBody>
                    </Toast>
                </Modal>
            </div>


            {/*~~~~~~~~~~REGISTER~~~~~~~~~~~*/}
            <div>
                <Modal isOpen={openRegister} className="Modal" contentClassName="ModalBG">
                    <div className="ModalContent">
                        <div className="Header">
                            Register Account
                        </div>

                        <div className="Input">
                        <div className="ModalInputTitle">First & Last Name</div>
                            <Input onChange={regNameChangeHandler}/>
                        </div>

                        <div className="Input">
                            <div className="ModalInputTitle">User Name</div>
                            <Input onChange={regUsernameChangeHandler}/>
                        </div>

                        <div className="Input">
                            <div className="ModalInputTitle">Email</div>
                            <Input onChange={regEmailChangeHandler}/>
                        </div>

                        <div className="Input">
                            <div className="ModalInputTitle">Credit Score</div>
                            <Input onChange={regCreditChangeHandler}/>
                        </div>

                        <div className="Input">
                            <div className="ModalInputTitle">Password</div>
                            <Input onChange={regPasswordChangeHandler} type="password"/>
                        </div>
                        
                        <div className="Input">
                            <div className="ModalInputTitle">Re-Enter Password</div>
                            <Input onChange={regPassReEnterChangeHandler} type="password"/>
                        </div>

                    </div>

                    <div className="ButtonContainer">
                        <Button 
                            className="Button"
                            onClick={() => setOpenRegister(false)}>
                                Cancel
                        </Button>
                        <Button 
                            className="Button" 
                            color="success"
                            onClick={() => CustomerRegistration()}>
                                Create Account
                        </Button>
                    </div>

                    <Toast isOpen={openRegError} className="Toast">
                        <ToastBody>{regErrorMsg}</ToastBody>
                    </Toast>

                </Modal>
            </div>

        </div>
    )
};

export default Taskbar;