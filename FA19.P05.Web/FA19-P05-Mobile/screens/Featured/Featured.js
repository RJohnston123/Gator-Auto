import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import HamburgerHeader from '../../components/HamburgerHeader/HamburgerHeader';
import Vehicle from '../VehicleList/Vehicle';
import AppSettings from '../../constants/AppSettings';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const Featured = (props) => {
    const [vehicleState, setVehicleState] = useState([[]]);
    const [vehiclesLoaded, setVehiclesLoaded] = useState(false);

    useEffect(() => {
        Axios.get(`${AppSettings.baseUrl}/api/Featured`)
        .then((response) => {
            console.log(response);
            setVehicleState(response.data);
            setVehiclesLoaded(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])


    let vehicles = (
        <View>
            {(
                
                vehicleState.map((vh) => {
                    return<View>
                        <Vehicle
                            id  = {vh.id}
                            vin = {vh.VIN}
                            year={vh.year}
                            make={vh.make}
                            model={vh.model}
                            baseCost={vh.baseCost}
                            location={vh.dealershipName}
                            image={vh.image}
                            listProps={props}
                        />
                    </View>
                }))  }
        </View>
    );

    const FeaturedList = () => {
        if(vehiclesLoaded)
        {
            return(
            <ScrollView>
                {vehicles}
            </ScrollView>
            )
        }
        else
        return null;
    }
    

    return(
        <View style={styles.page}>
            <HamburgerHeader onPress={() => {props.navigation.toggleDrawer();}}/>
            <Text style={styles.title}>Featured Vehicles</Text>
            <FeaturedList/>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        textAlign: 'center',
        fontSize:25,
        color: '#76e364',
        fontWeight: 'bold',
        margin:'5%'
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize:30,
        textAlign: 'center'
    },
    picture: {
        width: 300,
        height: 300
    }
})

export default Featured;