import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import GradientBG from '../GradientBG/GradientBG';
import Authentication from '../Authentication/Authentication';

const CustomDrawer = (props) => {

    const LogOut = () => {
        AsyncStorage.removeItem('UserInfo');
        props.navigation.navigate('Welcome');
    }

    return(
        <View style={{height: '100%'}}>
            <GradientBG/>

            <View style={styles.container}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greeting}>Hello,</Text>
                    <Authentication textStyle={styles.greeting} field="Name"/>
                </View>

                <DrawerNavigatorItems 
                inactiveLabelStyle={styles.item}
                activeLabelStyle={styles.activeItem}
                itemStyle ={styles.anyItem}
                {...props}/>
            </View>
            
            <Authentication role="out">
                <View style={styles.logIn}>
                    <TouchableOpacity 
                    onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.footerText}>Log In</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.register}>
                    <TouchableOpacity
                    onPress={() => props.navigation.navigate('Register')}>
                        <Text style={styles.footerText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </Authentication>

            <Authentication>
                <View style={styles.logIn}>
                    <TouchableOpacity 
                    onPress={() => LogOut()}>
                        <Text style={styles.footerText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </Authentication>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '20%',
        paddingBottom: '20%',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    greeting: {
        color: 'white',
        fontSize: 30,
        backgroundColor: 'transparent',
    },
    greetingContainer: {
        paddingBottom: '10%'
    },
    item: {
        color: 'white',
        fontSize: 25,
        backgroundColor: 'transparent',
    },
    activeItem: {
        color: 'white',
        fontSize: 25,
        backgroundColor: 'transparent',
    },
    anyItem: {
        borderRadius: 30
    },
    logIn: {
        position: 'absolute',
        bottom: 0,
        padding: 40,
    },
    register: {
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0,
        padding: 40,
    },
    footerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
})
export default CustomDrawer;