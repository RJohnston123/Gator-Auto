import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import HamburgerHeader from '../../components/HamburgerHeader/HamburgerHeader';
import Vehicle from "./Vehicle";
import {dataFiltered} from "../Search/Search";

const VehicleList = (props) => {
    const [vehicleState, setVehicleState] = useState({vehicles:dataFiltered});

    useEffect(() => {
        console.log("HERE IS VEHICLE LIST BRO!!");
        console.log(vehicleState.vehicles);
    },[dataFiltered]);

    let vehicles = (

        <View >
            {  (
                vehicleState.vehicles.map((vh) => {
                    return<View>
                        <Vehicle
                            id  = {vh.id}
                            vin = {vh.VIN}
                            year={vh.year}
                            make={vh.make}
                            model={vh.model}
                            baseCost={vh.min}
                            location={vh.dealershipName}
                            image={vh.image}
                            listProps={props}
                        />
                    </View>
                }))  }
        </View>
    );


    return(
        <View style={styles.page}>
            <HamburgerHeader onPress={() => {props.navigation.toggleDrawer();}}/>
            <Text style={styles.title}> User Vehicle Search</Text>
                <ScrollView>
                    {vehicles}
                </ScrollView>
        </View>
    )
};



const styles = StyleSheet.create({
    page: {
        flex: 1,
        borderRadius: 12,
        color: 'black',
        backgroundColor: 'white',
        shadowColor: 'black',
    },
    textStyle: {
        fontSize:30,
        textAlign: 'center'
    },
    picture: {
        width: 300,
        height: 300
    },
    title: {
        textAlign: 'center',
        fontSize:25,
        color: '#76e364',
        fontWeight: 'bold',
        margin:'5%'
    },
});

export default VehicleList;