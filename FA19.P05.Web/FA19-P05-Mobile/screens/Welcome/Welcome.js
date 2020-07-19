import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import GradientBG from '../../components/GradientBG/GradientBG';
import Authentication from '../../components/Authentication/Authentication';

const Welcome = (props) => {

    const GoToDrawer = () => {
        return(
        props.navigation.push('DrawerNavigator')
        )
    }

    return(
        <View style={styles.container}>
            <GradientBG/>

            <Authentication>
                <GoToDrawer/>
            </Authentication>

            <View style={styles.logoContainer}>
                <Image 
                style={styles.logo}
                source={require('./GatorAutoLogo.png')}
                resizeMode="contain"/>
            </View>

            <View style={styles.buttons}>
                <ThemeProvider theme={loginButton}>
                    <Button 
                        title="Login" 
                        onPress={() => {props.navigation.navigate('Login');}}>
                    </Button>
                </ThemeProvider>

                <ThemeProvider theme={registerButton}>
                    <Button 
                        title="Register"
                        onPress={() => {props.navigation.navigate('Register');}}>
                    </Button>
                </ThemeProvider>

                <Button 
                    buttonStyle={{backgroundColor:'transparent'}}
                    titleStyle={{color: 'white'}}
                    title="Or continue as a guest!"
                    onPress={() => {props.navigation.navigate('DrawerNavigator');}}>
                </Button>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    buttons: {
        flex:3,
        justifyContent: 'center',
        alignItems: "center"
    },
    logo: {
        width: '80%',
        height: '50%'
    },
    logoContainer: {
        flex:4,
        justifyContent: 'center',
        alignItems: "center"
    }
  });
  

  const registerButton = {
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
            width: 150,
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
            width: 155,
            height: 65
        }
    },
};

export default Welcome;