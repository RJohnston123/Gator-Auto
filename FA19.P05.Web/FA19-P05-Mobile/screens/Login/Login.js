import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage, KeyboardAvoidingView, ToastAndroid  } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import MyInput from '../../components/MyInput/MyInput';
import GradientBG from '../../components/GradientBG/GradientBG';
import AppSettings from '../../constants/AppSettings';
import Axios from 'axios';

const Login = (props) => {
    const [loginInputs] = useState({
        username: '',
        password: ''
    });

    //~~~~~~~~LOGIN HANDLERS~~~~~~~\\\\\
    const usernameChangeHandler = (event) => {loginInputs.username = event;}
    const passwordChangeHandler = (event) => {loginInputs.password = event;}

    const UserLogin = () => {
        Axios.post(`${AppSettings.baseUrl}/api/Authentication`, loginInputs)
            .then(function (response) {
                console.log(response.data)
                SaveUserInfo(loginInputs);
                props.navigation.push('DrawerNavigator');
            })
            .catch(function (error) {
                ToastAndroid.show('Username or password is incorrect.', ToastAndroid.SHORT);
                console.log(error);
            })
        }

        
    const SaveUserInfo = async (user) => {
        try{
            await AsyncStorage.removeItem('UserInfo');
            await AsyncStorage.setItem('UserInfo', JSON.stringify(user));
            console.log(loginInputs);
            loginInputs.username = '';
            loginInputs.password = '';
        }
        catch{
            console.log("Couldn't save user info.");
        }
    }

    return (
        <KeyboardAvoidingView  
        style={styles.container}
        behavior={'padding'}>
            <GradientBG/>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Login
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <MyInput 
                placeholder="Username"
                fontSize={20}
                icon={require('../../icons/user.png')}
                placeholderTextColor={'#f2f2f2'}
                style={styles.inputBox}
                inputStyle={styles.input}
                onChangeText={usernameChangeHandler}/>

                <MyInput
                fontSize={20}
                placeholder="Password"
                icon={require('../../icons/lock.png')}
                placeholderTextColor={'#f2f2f2'}
                style={styles.inputBox}
                inputStyle={styles.input}
                secureTextEntry={true}
                onChangeText={passwordChangeHandler}/>

                <View style={styles.buttons}>
                    <ThemeProvider theme={loginButton}>
                        <Button 
                            title="Login"
                            onPress={() => UserLogin()}>
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
    title: {
        fontSize:50,
        color: 'white',
        fontWeight: 'bold',
        marginTop: '10%'
    },
    titleContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'blue'
    },
    inputContainer: {
        flex: 5,
        //backgroundColor: 'red',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '10%'
    },
    input: {
        color: 'white',
        fontSize: 25
    },
    inputBox: {
        marginBottom: '10%'
    },
    buttons: {
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: '10%'
    },
    underline: {
        height: 2,
        backgroundColor: 'white',
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

const loginButton = {
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

export default Login;