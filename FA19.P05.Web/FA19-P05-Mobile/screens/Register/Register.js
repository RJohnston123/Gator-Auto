import React, {useState,} from 'react';
import { StyleSheet, Text, View, AsyncStorage, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import GradientBG from '../../components/GradientBG/GradientBG';
import MyInput from '../../components/MyInput/MyInput';
import AppSettings from '../../constants/AppSettings';
import Axios from 'axios';

const Register = (props) => {
    const [registerInputs] = useState({
        username: '',
        password: '',
        email: '',
        name: '',
    });

    const [passReEnter] = useState({
        reEnterPassword: ''
    })

    const [creditScore] = useState({
        creditNumber: '',
        userId: ''
    });

    //~~~~~~~~REGISTER HANDLERS~~~~~~~\\\\\
    const regNameChangeHandler = (event) => {registerInputs.name = event;}
    const regUsernameChangeHandler = (event) => {registerInputs.username = event;}
    const regEmailChangeHandler = (event) => {registerInputs.email = event;}
    const regCreditChangeHandler = (event) => {creditScore.creditNumber = parseInt(event, 10);}
    const regPasswordChangeHandler = (event) => {registerInputs.password = event;}
    const regPassReEnterChangeHandler = (event) => {passReEnter.reEnterPassword = event;}

    //~~~~~REGISTER CUSTOMER~~~~~\\
    const CustomerRegistration = () => {
        if(registerInputs.password === passReEnter.reEnterPassword)
        {
            if((creditScore.creditNumber >= 1) && (creditScore.creditNumber <= 850))
            {
            Axios.post(`${AppSettings.baseUrl}/api/Customer`, registerInputs)
                .then(function (response) {
                    console.log("Customer Created");
                    creditScore.userId = response.data.id;
                    CreditPost();
                })
                .catch(function (error) {
                    ToastAndroid.show('Please enter all fields correctly.', ToastAndroid.SHORT);
                    console.log(error);
                })
            }
            else
                ToastAndroid.show('Please enter all fields correctly.', ToastAndroid.SHORT);
        }
        else
            ToastAndroid.show('Please enter all fields correctly.', ToastAndroid.SHORT);
    }

    const CreditPost = () => {
        Axios.post(`${AppSettings.baseUrl}/api/CreditScore`, creditScore)
            .then(function (response) {
                console.log("Credit score posted!");
                AsyncStorage.setItem('UserInfo', JSON.stringify({
                    username: registerInputs.username,
                    password: registerInputs.password
                }));
                props.navigation.push('DrawerNavigator');
            })
            .catch(function (error) {
                console.log(creditScore);
            })
    }

    const resetFields = () => {
        registerInputs.username = '';
        registerInputs.password = '';
        registerInputs.email = '';
        registerInputs.name = '';
        passReEnter.reEnterPassword = '';
        creditScore.creditNumber = '';
        creditScore.userId = '';
    }

    return(
        <KeyboardAvoidingView 
        style={styles.container}
        behavior={'padding'}>
            <GradientBG/>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Register</Text>
            </View>

            <View style={styles.inputContainer}>
                <MyInput 
                placeholder="First and Last Name"
                fontSize={20}
                icon={require('../../icons/card.png')}
                placeholderTextColor={'#f2f2f2'}
                style={styles.inputBox}
                inputStyle={styles.input}
                onChangeText={regNameChangeHandler}
                />
                <MyInput 
                placeholder="Username"
                fontSize={20}
                icon={require('../../icons/user.png')}
                placeholderTextColor={'#f2f2f2'}
                style={styles.inputBox}
                inputStyle={styles.input}
                onChangeText={regUsernameChangeHandler}
                />
                <MyInput 
                placeholder="Email"
                fontSize={20}
                icon={require('../../icons/envelope.png')}
                placeholderTextColor={'#f2f2f2'}
                style={styles.inputBox}
                inputStyle={styles.input}
                onChangeText={regEmailChangeHandler}
                />
                <MyInput 
                placeholder="Credit Score"
                fontSize={20}
                icon={require('../../icons/credit.png')}
                placeholderTextColor={'#f2f2f2'}
                style={styles.inputBox}
                inputStyle={styles.input}
                keyboardType='number-pad'
                onChangeText={regCreditChangeHandler}
                />
                <MyInput 
                placeholder="Password"
                fontSize={20}
                icon={require('../../icons/lock.png')}
                placeholderTextColor={'#f2f2f2'}
                style={styles.inputBox}
                inputStyle={styles.input}
                secureTextEntry={true}
                onChangeText={regPasswordChangeHandler}
                />
                <MyInput 
                placeholder="Re-Enter Password"
                fontSize={20}
                icon={require('../../icons/lock.png')}
                placeholderTextColor={'#f2f2f2'}
                style={styles.inputBox}
                inputStyle={styles.input}
                secureTextEntry={true}
                onChangeText={regPassReEnterChangeHandler}
                />

                <View style={styles.buttons}>
                    <ThemeProvider theme={registerButton}>
                        <Button 
                            title="Register" 
                            onPress={() => CustomerRegistration()}>
                        </Button>
                    </ThemeProvider>
                        
                    <ThemeProvider theme={cancelButton}>
                        <Button 
                            title="Cancel"
                            onPress={() => {props.navigation.goBack();}}>
                        </Button>
                    </ThemeProvider>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'blue'
    },
    title: {
        fontSize:50,
        color: 'white',
        fontWeight: 'bold',
        marginTop: '5%'
    },
    inputContainer: {
        flex: 4,
        //backgroundColor: 'red',
        marginLeft: '10%',
        marginRight: '10%'
    },
    input: {
        color: 'white',
        fontSize: 25
    },
    inputBox: {
        marginBottom: '5%'
    },
    buttons: {
        justifyContent: 'center',
        alignItems: "center",
        marginTop: '5%'
    }
})


const cancelButton = {
    Button: {
        titleStyle: {
            color: 'white',
            fontSize: 25
        },
        buttonStyle: {
            backgroundColor: 'transparent',
            borderRadius: 30,
            borderColor: 'white',
            borderWidth: 5,
            marginTop: 20,
            width: 130,
            height: 60
        }
    },
};

const registerButton = {
    Button: {
        titleStyle: {
            color: '#42b52d',
            fontSize: 25
        },
        buttonStyle: {
            backgroundColor: 'white',
            borderRadius: 30,
            marginTop: 20,
            width: 135,
            height: 65
        }
    },
};
export default Register;