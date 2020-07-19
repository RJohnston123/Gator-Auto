import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import HamburgerHeader from '../../components/HamburgerHeader/HamburgerHeader';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner'
import Axios from 'axios';
import AppSettings from '../../constants/AppSettings';
import Vehicle from '../VehicleList/Vehicle';
import { ScrollView } from 'react-native-gesture-handler';

const ScanCode = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scanValue, setScanValue] = useState();
    const [vehicle, setVehicle] = useState({});
    const [vehicleFound, setVehicleFound] = useState();

    useEffect(() => {
        getPermissionsAsync();
    }, [])

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setHasPermission(status);
        console.log(status);
    }

    scanHandler = (result) => {
        setScanValue(result.data);
        console.log("Scanned.");

        Axios.get(`${AppSettings.baseUrl}/api/InventoryItem/VIN`, {params: {VIN: result.data}})
        .then((response) => {
            setVehicle(response.data)
            setVehicleFound(true);
        })
        .catch(() => {
            setVehicleFound(false);
        })

        setScanned(true);
    }

    ReturnedCar = () => {
            if(vehicleFound)
            {
                return(
                    <Vehicle
                    id  = {vehicle.id}
                    vin = {vehicle.VIN}
                    year={vehicle.year}
                    make={vehicle.make}
                    model={vehicle.model}
                    baseCost={vehicle.baseCost}
                    location={vehicle.dealershipName}
                    image={vehicle.image}
                    listProps={props}
                    />
                )
            }
            else
            {
                return(
                    <View style={{alignItems: 'center', padding: 40}}>
                        <Text style={{fontSize: 30, textAlign: 'center'}}>The vehicle you scanned could not be found.</Text>
                    </View>
                )                
            }
        }

    return(
        <View style={styles.page}>
            <HamburgerHeader onPress={() => {props.navigation.toggleDrawer();}}/>
            {!scanned && (
                <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined : scanHandler}
                style={StyleSheet.absoluteFillObject}
                />
            )}

            {scanned && (
            <View style={{flex: 1}}>
                <Text style={styles.title}>Scanned Vehicle</Text>
                <ScrollView style={{marginTop:'20%'}}>
                    <ReturnedCar/>
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <ThemeProvider theme={scanButton}>
                        <Button title="New Scan" 
                        onPress={() => setScanned(false)}
                        />
                    </ThemeProvider>
                </View>
            </View>
            )}
        </View>
    )
}

const scanButton = {
    Button: {
        titleStyle: {
            color: 'white',
            fontSize: 25
        },
        buttonStyle: {
            backgroundColor: '#6EE45A',
            marginTop: 40,
            width: 150,
            height: 65,
            borderRadius: 30,
            marginBottom: 40
        }
    },
};

const permissionButton = {
    Button: {
        titleStyle: {
            color: 'white',
            fontSize: 25
        },
        buttonStyle: {
            backgroundColor: '#6EE45A',
            marginTop: 40,
            width: 200,
            height: 65,
            borderRadius: 30,
            marginBottom: 40
        }
    },
};


const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        textAlign: 'center',
        fontSize:25,
        color: '#76e364',
        fontWeight: 'bold',
        margin:'5%'
    },
    buttonContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    }
})

export default ScanCode;